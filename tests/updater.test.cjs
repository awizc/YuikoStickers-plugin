const test = require('node:test');
const assert = require('node:assert/strict');
const {harness, deferred, advertiseRefs} = require('./helpers.cjs');

test('숫자 버전 비교는 동일 버전·다운그레이드를 거부', t => {
    const {plugin:p}=harness(t);
    assert.equal(p.isNewerVersion('2.17.10','2.17.9'),true);
    assert.equal(p.isNewerVersion('2.17.3','2.17.3'),false);
    assert.equal(p.isNewerVersion('2.17.2','2.17.3'),false);
    assert.equal(p.isNewerVersion('3.0.0','2.99.99'),true);
});

test('활성화하면 수동 확인 알림 요청과 정시 자동 확인을 모두 유지', t => {
    const h=harness(t); const p=h.plugin; p.running=false; const flags=[];
    p.checkPluginUpdate=flag=>flags.push(flag);
    for (const name of ['addStyles','loadFavorites','loadRecent','loadSortSetting','loadFavoriteGesture','loadGroupSettings','loadGroupThumbs','loadCache','loadGroups','observeDiscord']) p[name]=()=>{};
    p.start(); assert.deepEqual(flags,[true]); assert.notEqual(p.updateTimer,null);
});

test('자동 확인은 기존처럼 다음 정시에 실행하고 다음 정시를 예약', async t => {
    const h=harness(t); const p=h.plugin; let checks=0; p.checkPluginUpdate=async()=>checks++;
    p.scheduleHourlyUpdateCheck(); await h.advance(48*60*1000-1); assert.equal(checks,0);
    await h.advance(1); assert.equal(checks,1); await h.advance(60*60*1000); assert.equal(checks,2);
    p.stop(); await h.advance(60*60*1000); assert.equal(checks,2);
});

test('패널을 열 때의 플러그인 확인 간격은 그대로 5분', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); p.panel.style.display='none';
    const composer=h.document.createElement('div'); h.document.body.append(composer); p.composer=composer;
    const button=h.document.createElement('button'); h.document.body.append(button);
    let checks=0; p.checkForUpdates=()=>{}; p.checkPluginUpdate=()=>{checks++;p.lastPluginUpdateCheck=h.now();};
    p.togglePanel(button); assert.equal(checks,1); p.closePanel(); await h.advance(5*60*1000-1);
    p.togglePanel(button); assert.equal(checks,1); p.closePanel(); await h.advance(1); p.togglePanel(button); assert.equal(checks,2);
});

test('Git 참조를 재검증한 뒤 main 대신 해당 SHA의 파일을 다운로드', async t => {
    const h=harness(t); const p=h.plugin; const calls=[];
    const sha='a'.repeat(40);
    h.api.Net.fetch=async(url,init)=>{calls.push({url,init});return {ok:true,text:async()=>calls.length===1?advertiseRefs(sha):h.versionedSource('2.17.5')};};
    const source=await p.fetchPluginSource(); assert(source.includes('2.17.5')); assert.equal(calls.length,2);
    assert.equal(new URL(calls[0].url).search,'?service=git-upload-pack');
    assert.equal(calls[0].init.cache,'no-store'); assert.equal(calls[0].init.headers['Cache-Control'],'no-cache');
    assert.equal(calls[1].url,`https://raw.githubusercontent.com/awizc/YuikoStickers-plugin/${sha}/YuikoStickers.plugin.js`);
});

test('커밋 raw 실패/형식 오류 시 같은 커밋의 API로 재시도', async t => {
    for (const firstResponse of [{ok:false,status:403},{ok:true,text:async()=>'{}'}]) {
        const h=harness(t); const p=h.plugin; let calls=0;
        const sha='b'.repeat(40);
        h.api.Net.fetch=async url=>{
            calls++;
            if(calls===1)return {ok:true,text:async()=>advertiseRefs(sha)};
            if(calls===2)return firstResponse;
            assert.equal(new URL(url).searchParams.get('ref'),sha);
            return {ok:true,text:async()=>h.versionedSource('2.17.5')};
        };
        assert((await p.fetchPluginSource()).includes('2.17.5')); assert.equal(calls,3);
    }
    const h=harness(t); h.api.Net.fetch=async()=>{throw Error('offline')}; await h.plugin.checkPluginUpdate();
    assert.equal(h.toasts.at(-1).type,'error'); assert.equal(h.plugin.updateInFlight,false);
});

test('최신 참조 실패 시 main 캐시를 내려받거나 최신 버전이라고 알리지 않음', async t => {
    for(const failure of [{ok:false,status:503},{ok:true,text:async()=>'<html>error</html>'}]) {
        const h=harness(t); let calls=0; h.api.Net.fetch=async()=>{calls++;return failure;};
        await h.plugin.checkPluginUpdate(true);
        assert.equal(calls,1); assert.equal(h.toasts.at(-1).type,'error'); assert.equal(h.plugin.updated,false);
    }
});

test('pkt-line은 Unicode 브랜치를 건너뛰고 HEAD가 아닌 정확한 main을 선택', t => {
    const {plugin:p}=harness(t); const sha='c'.repeat(40);
    const line=`${'d'.repeat(40)} refs/heads/한글\n`;
    const extra=(Buffer.byteLength(line)+4).toString(16).padStart(4,'0')+line;
    const advertisement=advertiseRefs(sha,extra).replace(`${sha} HEAD`,`${'e'.repeat(40)} HEAD`);
    assert.equal(p.readUpdateCommit(advertisement),sha);
});

test('잘린 pkt-line, main 누락, 영 SHA, 다른 프로토콜 응답은 거부', t => {
    const {plugin:p}=harness(t); const valid=advertiseRefs('f'.repeat(40));
    for(const input of [valid.slice(0,-2),valid.replaceAll('refs/heads/main\n','refs/heads/mAin\n'),advertiseRefs('0'.repeat(40)),'0003','zzzz', '000eversion 2\n']) {
        assert.throws(()=>p.readUpdateCommit(input));
    }
});

test('같은 버전 확인 다음 재활성화 확인은 새 커밋을 다시 조회', async t => {
    const h=harness(t); const p=h.plugin; let head='1'.repeat(40); const rawCalls=[];
    h.api.Net.fetch=async url=>{
        if(url.includes('/info/refs?'))return {ok:true,text:async()=>advertiseRefs(head)};
        rawCalls.push(url);
        return {ok:true,text:async()=>h.versionedSource(head.startsWith('1')?'2.17.3':'2.17.5')};
    };
    await p.checkPluginUpdate(true); assert.equal(p.updated,false);
    head='2'.repeat(40); await p.checkPluginUpdate(true);
    assert.equal(p.updated,true); assert.equal(rawCalls.length,2); assert.notEqual(rawCalls[0],rawCalls[1]);
});

test('실제 파일 버전 기준으로 업데이트하고 성공 알림을 표시', async t => {
    const h=harness(t,{installedVersion:'2.17.2',metadataVersion:'99.0.0'}); const p=h.plugin;
    p.fetchPluginSource=async()=>h.versionedSource('2.17.3'); p.scheduleHourlyUpdateCheck(); await p.checkPluginUpdate();
    assert.equal(h.files.get(h.installedPath),h.versionedSource('2.17.3')); assert.equal(p.updated,true);
    assert.equal(p.updateTimer,null); assert.equal(h.toasts.at(-1).type,'success');
});

test('같거나 낮은 버전은 덮어쓰지 않고 활성화 확인일 때만 최신 알림', async t => {
    const h=harness(t); const p=h.plugin; const original=h.files.get(h.installedPath);
    p.fetchPluginSource=async()=>h.versionedSource('2.17.3'); await p.checkPluginUpdate(); assert.equal(h.toasts.length,0);
    await p.checkPluginUpdate(true); assert.equal(h.toasts.length,1); assert.equal(h.toasts[0].type,'info');
    p.fetchPluginSource=async()=>h.versionedSource('2.16.0'); await p.checkPluginUpdate(); assert.equal(h.files.get(h.installedPath),original);
});

test('잘못된 소스와 파일 쓰기 실패는 설치본을 유지하고 잠금을 해제', async t => {
    const h=harness(t); const p=h.plugin; const original=h.files.get(h.installedPath);
    p.fetchPluginSource=async()=>'<html>error</html>'; await p.checkPluginUpdate(); assert.equal(h.files.get(h.installedPath),original); assert.equal(p.updateInFlight,false);
    p.fetchPluginSource=async()=>h.versionedSource('2.17.4'); h.fakeFs.writeFileSync=()=>{throw Error('read-only')}; await p.checkPluginUpdate();
    assert.equal(p.updateInFlight,false); assert.equal(p.updated,false); assert.equal(h.files.get(h.installedPath),original); assert(h.toasts.at(-1).message.includes('read-only'));
});

test('동시 확인은 중복 다운로드하지 않음', async t => {
    const h=harness(t); const p=h.plugin; const pending=deferred(); let calls=0;
    p.fetchPluginSource=()=>{calls++;return pending.promise;}; const first=p.checkPluginUpdate(); await p.checkPluginUpdate(); assert.equal(calls,1);
    pending.resolve(h.versionedSource('2.17.3')); await first; assert.equal(p.updateInFlight,false);
});
