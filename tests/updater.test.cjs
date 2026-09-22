const test = require('node:test');
const assert = require('node:assert/strict');
const {harness, deferred} = require('./helpers.cjs');

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

test('API 우선 요청과 캐시 회피 옵션을 보존', async t => {
    const h=harness(t); const p=h.plugin; const calls=[];
    h.api.Net.fetch=async(url,init)=>{calls.push({url,init});return {ok:true,text:async()=>h.versionedSource('2.17.4')};};
    const source=await p.fetchPluginSource(); assert(source.includes('2.17.4')); assert.equal(calls.length,1);
    assert.equal(new URL(calls[0].url).searchParams.get('ref'),'main'); assert(new URL(calls[0].url).searchParams.has('t'));
    assert.equal(calls[0].init.cache,'no-store'); assert.equal(calls[0].init.headers.Accept,'application/vnd.github.raw+json');
});

test('API 실패/형식 오류 시 raw 재시도, 두 요청 실패 시 오류 알림', async t => {
    for (const firstResponse of [{ok:false,status:403},{ok:true,text:async()=>'{}'}]) {
        const h=harness(t); const p=h.plugin; let calls=0;
        h.api.Net.fetch=async()=>++calls===1?firstResponse:{ok:true,text:async()=>h.versionedSource('2.17.4')};
        assert((await p.fetchPluginSource()).includes('2.17.4')); assert.equal(calls,2);
    }
    const h=harness(t); h.api.Net.fetch=async()=>{throw Error('offline')}; await h.plugin.checkPluginUpdate();
    assert.equal(h.toasts.at(-1).type,'error'); assert.equal(h.plugin.updateInFlight,false);
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
