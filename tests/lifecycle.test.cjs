const test = require('node:test');
const assert = require('node:assert/strict');
const {harness, deferred, flush} = require('./helpers.cjs');

test('끄기 직전에 예약한 Enter는 비활성화 후 실행되지 않음', async t => {
    const h=harness(t); const p=h.plugin; const composer=h.document.createElement('div'); h.document.body.append(composer);
    let sends=0; composer.addEventListener('keydown',()=>sends++);
    p.sendMessage(composer); p.stop(); await h.advance(0);
    assert.equal(sends,0); assert.equal(p.pendingSendTimers.size,0);
});

test('정지한 버튼 생성 타이머가 재활성화 이후 재예약을 막지 않음', async t => {
    const h=harness(t); const p=h.plugin; let created=0; p.addButton=()=>created++;
    p.scheduleAddButton(); p.stop(); assert.equal(p.addButtonTimer,null);
    p.running=true; p.scheduleAddButton(); await h.advance(100); assert.equal(created,1);
});

test('반복 start는 중복 초기화하지 않고, stop/start는 새 세션으로 초기화', t => {
    const h=harness(t); const p=h.plugin; p.running=false;
    const calls=[];
    for (const name of ['checkPluginUpdate','scheduleHourlyUpdateCheck','addStyles','loadFavorites','loadRecent','loadSortSetting','loadFavoriteGesture','loadGroupSettings','loadGroupThumbs','loadCache','loadGroups','observeDiscord']) p[name]=()=>calls.push(name);
    p.start(); const first=p.sessionId; p.start(); assert.equal(calls.filter(n=>n==='observeDiscord').length,1);
    p.stop(); p.start(); assert(p.sessionId>first); assert.equal(calls.filter(n=>n==='observeDiscord').length,2);
});

test('업데이트 요청 중 껐다 켜도 이전 응답은 파일을 변경하지 않음', async t => {
    const h=harness(t); const p=h.plugin; const old=deferred(); p.fetchPluginSource=()=>old.promise;
    const request=p.checkPluginUpdate(); p.stop(); p.running=true;
    const fresh=deferred(); p.fetchPluginSource=()=>fresh.promise; const next=p.checkPluginUpdate();
    old.resolve(h.versionedSource('9.0.0')); await request;
    assert.equal(p.updateInFlight,true); assert(h.files.get(h.installedPath).includes('2.17.3')); assert.equal(h.toasts.length,0);
    fresh.resolve(h.versionedSource('2.17.4')); await next;
    assert.equal(p.updateInFlight,false); assert(h.files.get(h.installedPath).includes('2.17.4'));
});

test('이전 실행의 정시 확인이 끝나도 새 타이머를 덮어쓰지 않음', async t => {
    const h=harness(t); const p=h.plugin; const pending=deferred(); p.checkPluginUpdate=()=>pending.promise;
    p.scheduleHourlyUpdateCheck(); await h.advance(48*60*1000);
    p.stop(); p.running=true; p.scheduleHourlyUpdateCheck(); const nextTimer=p.updateTimer;
    pending.resolve(); await flush(); assert.equal(p.updateTimer,nextTimer); assert.equal(h.timers.size,1);
});

test('stop은 미리보기 참조·드래그 리스너·예약 작업을 모두 정리', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); p.favorites.add(h.items[0].url); p.rerender();
    h.document.elementFromPoint=()=>null;
    h.fire(h.itemNode(0,'fav'),'pointerdown'); h.fire(h.itemNode(0,'fav'),'pointermove',{clientX:30});
    assert(p.dragActive); p.stop();
    assert.equal(p.dragActive,false); assert.equal(p.dragCleanups.size,0); assert.equal(p.previewImage,null);
    assert.equal(h.document.querySelector('.yuiko-panel'),null);
    h.fire(h.document.body,'pointerup'); await h.advance(2000);
    assert.equal(h.timers.size,0); assert.equal(p.groupPreviewId,null);
});

test('창 포커스 상실 및 영역 밖 pointerup은 드래그 후보를 정리', async t => {
    const h=harness(t); const p=h.plugin; p.favorites.add(h.items[0].url); h.mount();
    const from=h.itemNode(0,'fav'); h.document.elementFromPoint=()=>null;
    h.fire(from,'pointerdown'); h.fire(h.document.body,'pointerup'); h.fire(from,'pointermove',{clientX:60}); assert.equal(p.dragActive,false);
    h.fire(from,'pointerdown'); h.fire(from,'pointermove',{clientX:60}); assert(p.dragActive);
    h.window.dispatchEvent(new h.window.Event('blur')); assert.equal(p.dragActive,false); assert(!from.classList.contains('is-dragging'));
    await h.advance(1000); assert.equal(p.favorites.size,1);
});

test('드래그 중 원본 DOM이 제거되어도 드래그 상태가 남지 않음', t => {
    const h=harness(t); const p=h.plugin; p.favorites.add(h.items[0].url); h.mount(); h.document.elementFromPoint=()=>null;
    const from=h.itemNode(0,'fav'); h.fire(from,'pointerdown'); h.fire(from,'pointermove',{clientX:60}); assert(p.dragActive);
    p.render(); h.fire(h.itemNode(0,'fav'),'pointermove',{clientX:70}); assert.equal(p.dragActive,false);
});

test('미리보기 다운로드 중 stop 이후 도착한 응답은 캐시나 DOM을 되살리지 않음', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); p.knownItems.clear();
    const pending=deferred(); p.fetchWithVersion=()=>pending.promise;
    const row=p.panel.querySelector('.yuiko-manage-row'); const request=p.showGroupPreview(1,row);
    p.stop(); pending.resolve({ok:true,json:async()=>[{id:1,ext:'png',word:'하나'}]}); await request;
    assert.equal(p.groupPreviewCache.size,0); assert.equal(p.groupPreview,null);
});

test('Discord가 상위 pointerup 전파를 막아도 컨테이너에서 드래그를 완료', t => {
    const h=harness(t); const p=h.plugin; p.favorites=new Set(h.items.slice(0,2).map(item=>item.url)); h.mount();
    const from=h.itemNode(0,'fav'), to=h.itemNode(1,'fav');
    h.document.elementFromPoint=()=>to; to.getBoundingClientRect=()=>({left:0,width:64,top:0,height:64});
    p.panel.addEventListener('pointerup',event=>event.stopPropagation());
    h.fire(from,'pointerdown',{clientX:0,clientY:0}); h.fire(from,'pointermove',{clientX:40,clientY:0});
    h.fire(from,'pointerup',{clientX:40,clientY:0});
    assert.equal(p.dragActive,false); assert.deepEqual([...p.favorites],[h.items[1].url,h.items[0].url]);
});

test('다른 pointerId의 이동/해제는 진행 중인 드래그를 종료하지 않음', t => {
    const h=harness(t); const p=h.plugin; p.favorites.add(h.items[0].url); h.mount(); h.document.elementFromPoint=()=>null;
    const from=h.itemNode(0,'fav');
    h.fire(from,'pointerdown',{pointerId:1}); h.fire(from,'pointermove',{clientX:40,pointerId:2}); assert.equal(p.dragActive,false);
    h.fire(from,'pointermove',{clientX:40,pointerId:1}); assert(p.dragActive);
    h.fire(from,'pointerup',{pointerId:2}); assert(p.dragActive);
    h.fire(from,'pointerup',{pointerId:1}); assert.equal(p.dragActive,false);
});

test('패널을 만들고 끄는 작업을 반복해도 document/window 리스너가 늘지 않음', t => {
    const h=harness(t); const p=h.plugin;
    // jsdom이 첫 DOM/CSS 사용 때 설치하는 자체 window 리스너는 측정 전에 초기화한다.
    h.mount(); p.stop();
    const tracked = new Map();
    for(const target of [h.document,h.window]) {
        const add=target.addEventListener.bind(target), remove=target.removeEventListener.bind(target);
        target.addEventListener=(name,fn,options)=>{if(['pointerup','pointercancel','blur','mousedown'].includes(name)) tracked.set(fn,(tracked.get(fn)||0)+1); return add(name,fn,options);};
        target.removeEventListener=(name,fn,options)=>{if(tracked.has(fn)) tracked.set(fn,tracked.get(fn)-1); return remove(name,fn,options);};
    }
    for(let i=0;i<20;i++) {
        p.running=true; h.mount(); p.bindOutsideClick(); p.stop();
        assert.equal([...tracked.values()].reduce((sum,n)=>sum+n,0),0);
        assert.equal(h.document.querySelectorAll('.yuiko-panel, .yuiko-preview, .yuiko-group-preview').length,0);
    }
});
