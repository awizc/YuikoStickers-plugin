const test = require('node:test');
const assert = require('node:assert/strict');
const {harness, flush, advertiseRefs} = require('./helpers.cjs');

test('실제 start → 버튼 → 패널 → 선택 → 전송 → stop → start 경로', async t => {
    const h=harness(t,{data:{enabledGroups:[1],groupOrder:[1],favorites:['https://example.test/1.png'],favoriteGesture:'shiftRightClick'}});
    const p=h.plugin; p.running=false;
    h.document.body.innerHTML='<div class="composer-container"><div data-slate-editor="true" contenteditable="true"></div><div class="buttons"></div></div>';
    const composer=h.document.querySelector('[contenteditable]');
    composer.getBoundingClientRect=()=>({left:200,top:600,width:500,height:50,bottom:650,right:700});
    const requests=[];
    h.api.Net.fetch=async url=>{
        requests.push(url);
        if(url.includes('/info/refs?')) return {ok:true,text:async()=>advertiseRefs('a'.repeat(40))};
        if(url.startsWith('https://raw.githubusercontent.com/')) return {ok:true,text:async()=>h.versionedSource('2.17.3')};
        const endpoint=new URL(url).pathname;
        if(endpoint.endsWith('/groups')) return {ok:true,json:async()=>[{id:1,name:'첫 그룹',count:2}]};
        if(endpoint.endsWith('/latest')) return {ok:true,json:async()=>({datetime:'test-date'})};
        if(endpoint.endsWith('/group/1')) return {ok:true,json:async()=>h.items.slice(0,2).map(item=>({url:item.url,word:item.name}))};
        throw Error('Unexpected test endpoint: '+url);
    };
    let command, sends=0;
    composer.addEventListener('beforeinput',event=>{command=event.data;event.preventDefault();});
    composer.addEventListener('keydown',event=>{if(event.key==='Enter')sends++;});
    p.start(); await flush();
    assert.equal(h.document.querySelectorAll('.yuiko-button').length,1);
    assert.equal(p.favoriteGesture,'shiftRightClick'); assert.equal(p.favorites.size,1);
    p.button.click(); await flush();
    assert.equal(p.panel.style.display,'flex');
    h.fire(h.itemNode(0),'contextmenu',{button:2}); h.fire(h.itemNode(1),'contextmenu',{button:2}); h.fire(h.itemNode(0),'click');
    await h.advance(0); assert.equal(command,'.하나.둘.하나'); assert.equal(sends,1); assert.equal(p.panel.style.display,'none');
    p.stop(); await flush();
    assert.equal(h.document.querySelectorAll('.yuiko-button, .yuiko-panel, .yuiko-preview, .yuiko-group-preview').length,0);
    assert.equal(h.timers.size,0);
    p.start(); await flush();
    assert.equal(h.document.querySelectorAll('.yuiko-button').length,1); assert.equal(p.favoriteGesture,'shiftRightClick'); assert.equal(p.favorites.size,1);
    assert.deepEqual(p.recent,[h.items[0].url,h.items[1].url]);
    assert.equal(requests.filter(url=>url.includes('/info/refs?')).length,2);
    p.stop(); await flush(); assert.equal(h.timers.size,0);
});

test('API 응답 순서가 달라도 전체 목록은 저장된 그룹 순서를 따름', async t => {
    const h=harness(t,{data:{groupOrder:[2,1],enabledGroups:[1,2]}}); const p=h.plugin;
    p.loadGroupSettings(); p.applyGroupOrder();
    p.fetchWithVersion=async url=>({ok:true,json:async()=>url.endsWith('/1')?[{url:'first.png',word:'첫째'}]:[{url:'second.png',word:'둘째'}]});
    await p.loadGroupItems(); h.mount();
    assert.deepEqual(p.items.map(item=>item.url),['second.png','first.png']);
    p.moveGroup(1,-1); assert.deepEqual(p.items.map(item=>item.url),['first.png','second.png']);
    assert.deepEqual(h.data.get('groupOrder'),[1,2]);
});
