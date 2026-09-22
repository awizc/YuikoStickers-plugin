const test = require('node:test');
const assert = require('node:assert/strict');
const {harness, deferred, flush} = require('./helpers.cjs');
const response = value => ({ok:true,json:async()=>value});

test('겹친 그룹 선택 요청은 가장 최근 응답만 반영', async t => {
    const h=harness(t); const p=h.plugin; const first=deferred(), second=deferred();
    p.fetchWithVersion=url=>url.endsWith('/1')?first.promise:second.promise;
    p.selectedGroupId=1; const a=p.loadGroupItems(); p.selectedGroupId=2; const b=p.loadGroupItems();
    second.resolve(response([{url:'new.png',word:'새 그룹'}])); await b;
    first.resolve(response([{url:'old.png',word:'이전 그룹'}])); await a;
    assert.equal(p.items[0].url,'new.png'); assert.equal(p.items[0].groupId,2);
});

test('겹친 그룹 목록 갱신도 이전 응답이 최신 목록을 덮어쓰지 않음', async t => {
    const h=harness(t); const p=h.plugin; const first=deferred(), second=deferred(); let calls=0;
    p.fetchWithVersion=()=>++calls===1?first.promise:second.promise;
    p.loadGroupItems=async()=>true; p.loadGroupThumbsFromServer=async()=>{};
    const a=p.loadGroups(), b=p.loadGroups();
    second.resolve(response([{id:2,name:'최신 그룹'}])); await b;
    first.resolve(response([{id:1,name:'이전 그룹'}])); await a;
    assert.deepEqual(p.groups.map(group=>group.id),[2]);
});

test('stop 뒤에 도착한 그룹 응답은 저장과 목록 변경을 하지 않음', async t => {
    const h=harness(t); const p=h.plugin; const pending=deferred(); p.fetchWithVersion=()=>pending.promise;
    const original=p.items; p.selectedGroupId=1; const request=p.loadGroupItems(); p.stop();
    pending.resolve(response([{url:'late.png',word:'늦음'}])); await request;
    assert.equal(p.items,original); assert.equal(h.writes.length,0);
});

test('잘못된 groups 응답은 캐시와 즐겨찾기를 빈 목록으로 덮어쓰지 않음', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); p.favorites.add(h.items[0].url);
    p.fetchWithVersion=async()=>response({error:'temporary failure'});
    const result=await p.loadGroups(); assert.equal(result,false);
    assert.equal(p.groups.length,2); assert(p.knownItems.has(h.items[0].url)); assert(p.favorites.has(h.items[0].url));
    assert(p.status.classList.contains('is-error')); assert.equal(h.writes.length,0);
});

test('UI 그룹 요청 실패는 처리되고 이미 받은 이모지는 보존', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); const old=p.items;
    p.fetchWithVersion=async()=>{throw Error('offline')};
    await p.refreshSelectedGroup(p.searchInput);
    assert.equal(p.items,old); assert(p.status.classList.contains('is-error'));
});

test('이전 그룹 요청의 실패는 새 그룹 성공 화면에 오류를 띄우지 않음', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); const first=deferred();
    p.fetchWithVersion=url=>url.endsWith('/1')?first.promise:Promise.resolve(response([{url:'new.png',word:'새 그룹'}]));
    p.selectedGroupId=1; const a=p.refreshSelectedGroup(p.searchInput); p.selectedGroupId=2; await p.refreshSelectedGroup(p.searchInput);
    first.reject(Error('old request failed')); await a; assert(!p.status.classList.contains('is-error')); assert.equal(p.items[0].url,'new.png');
});

test('빈 이모지 응답과 다른 그룹 로딩은 기존 즐겨찾기를 유지', async t => {
    const h=harness(t); const p=h.plugin; p.favorites=new Set(h.items.map(item=>item.url)); p.selectedGroupId=1;
    p.fetchWithVersion=async()=>response([]); await p.loadGroupItems(); assert.equal(p.favorites.size,3);
    p.fetchWithVersion=async()=>response([{url:h.items[0].url,word:'하나'}]); await p.loadGroupItems();
    assert.deepEqual([...p.favorites],[h.items[0].url,h.items[2].url]);
});

test('그룹 목록과 썸네일의 늦은 응답은 정지된 실행을 변경하지 않음', async t => {
    for (const method of ['loadGroups','loadGroupThumbsFromServer','checkForUpdates']) {
        const h=harness(t); const p=h.plugin; const pending=deferred(); p.fetchWithVersion=()=>pending.promise;
        const oldGroups=p.groups; const request=p[method](true); p.stop();
        pending.resolve(response([{id:10,ext:'png',word:'늦음'}])); await request;
        assert.equal(p.groups,oldGroups); assert.equal(h.writes.length,0); assert.deepEqual(p.groupThumbs,{});
    }
});

test('저장된 즐겨찾기가 손상되어도 시작 시 예외가 나지 않음', t => {
    for (const saved of [null, 7, {}, 'not-an-array']) {
        const h=harness(t,{data:{favorites:saved}}); assert.doesNotThrow(()=>h.plugin.loadFavorites()); assert.equal(h.plugin.favorites.size,0);
    }
    const h=harness(t,{data:{favorites:['a',null,'b','a',3]}}); h.plugin.loadFavorites(); assert.deepEqual([...h.plugin.favorites],['a','b']);
});

test('최근 기록은 일괄 저장해도 기존 반복 추가와 같은 순서를 유지', t => {
    const h=harness(t); const p=h.plugin; p.recent=Array.from({length:50},(_,i)=>'old-'+i); p.sortByRecent=true;
    let renders=0; p.rerender=()=>renders++;
    const batch=[h.items[0],h.items[1],h.items[0],h.items[2]];
    let expected=p.recent; for(const item of batch) expected=[item.url,...expected.filter(url=>url!==item.url)].slice(0,50);
    p.addRecentItems(batch); assert.deepEqual(p.recent,expected); assert.equal(h.writes.filter(w=>w.key==='recent').length,1); assert.equal(renders,1);
});

test('변경 없는 즐겨찾기/최근 기록 정리는 디스크에 다시 저장하지 않음', t => {
    const h=harness(t); const p=h.plugin; p.favorites.add(h.items[0].url); p.recent=[h.items[1].url];
    p.pruneStoredUrls(); assert.equal(h.writes.length,0);
    p.favorites.add('missing'); p.pruneStoredUrls(); assert.deepEqual(h.writes.map(w=>w.key),['favorites']); assert.equal(p.favorites.size,1);
});

test('구버전 캐시와 현재 캐시를 같은 표시 목록으로 복구', t => {
    const items=[{url:'a',name:'A',groupId:1},{url:'b',name:'B',groupId:2}];
    const old=harness(t,{data:{cache:{datetime:'date',items}}}); old.plugin.loadCache();
    const current=harness(t,{data:{cache:{datetime:'date',known:items,shown:['a','b']}}}); current.plugin.loadCache();
    assert.deepEqual(old.plugin.items,current.plugin.items); assert.equal(current.plugin.lastDatetime,'date');
});

test('같은 이미지 위 mousemove는 src를 반복 변경하지 않음', async t => {
    const h=harness(t); const p=h.plugin; h.mount(); const changes=[];
    const observer=new h.window.MutationObserver(records=>changes.push(...records)); observer.observe(p.previewImage,{attributes:true,attributeFilter:['src']});
    for(let i=0;i<100;i++) p.showPreview(h.items[1],{clientX:20+i,clientY:20});
    await flush(); observer.disconnect(); assert.equal(changes.length,1); assert.equal(p.previewImage.src,h.items[1].url);
});

test('손상된 그룹 ID와 썸네일 값을 버리고 정상 설정 순서를 유지', t => {
    const h=harness(t,{data:{enabledGroups:['2',null,1,1,'bad',{},true,-1],groupOrder:[2,'1',2,Infinity],selectedGroup:'bad',groupThumbs:{1:'one.png',2:null,3:{url:'invalid'}}}});
    const p=h.plugin; p.loadGroupSettings(); p.loadGroupThumbs();
    assert.deepEqual(p.enabledGroupIds,[2,1]); assert.deepEqual(p.groupOrder,[2,1]); assert.equal(p.selectedGroupId,null); assert.deepEqual(p.groupThumbs,{1:'one.png'});
});

test('최근 기록의 손상·중복·초과분을 읽을 때 정리', t => {
    const recent=['a','a',null,4,...Array.from({length:60},(_,i)=>'url'+i)];
    const h=harness(t,{data:{recent}}); h.plugin.loadRecent();
    assert.equal(h.plugin.recent.length,50); assert.equal(h.plugin.recent[0],'a'); assert.equal(new Set(h.plugin.recent).size,50);
});

test('그룹 전환 실패 후 기존 재시도 버튼으로 목록을 복구', async t => {
    const h=harness(t); const p=h.plugin; h.mount();
    p.fetchWithVersion=async()=>{throw Error('offline')}; await p.refreshSelectedGroup(p.searchInput); assert(p.status.classList.contains('is-error'));
    p.fetchWithVersion=async url=>url.endsWith('groups')?response([{id:1,name:'첫 그룹',count:1}]):response([{url:h.items[0].url,word:'하나'}]);
    p.status.click(); await flush();
    assert(!p.status.classList.contains('is-error')); assert.equal(p.items.length,1); assert.equal(p.items[0].url,h.items[0].url);
});

test('대량 목록 렌더링의 DOM 추가는 한 번이고 항목 순서는 유지', async t => {
    const h=harness(t); const p=h.plugin; h.mount();
    p.items=Array.from({length:500},(_,i)=>({url:`https://example.test/${i}.png`,name:`항목 ${i}`,groupId:1}));
    p.itemByUrl=new Map(p.items.map(item=>[item.url,item])); p.knownItems=new Map(p.itemByUrl);
    const mutations=[]; const observer=new h.window.MutationObserver(records=>mutations.push(...records)); observer.observe(p.grid,{childList:true});
    p.render(); await flush(); observer.disconnect();
    assert.equal(mutations.filter(record=>record.addedNodes.length>0).length,1);
    assert.deepEqual([...p.grid.querySelectorAll('.yuiko-item')].map(node=>node.dataset.url),p.items.map(item=>item.url));
});
