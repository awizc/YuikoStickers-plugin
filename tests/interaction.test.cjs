const test = require('node:test');
const assert = require('node:assert/strict');
const {harness} = require('./helpers.cjs');

test('우클릭 순서와 중복 선택, 썸네일 삭제 및 재번호 부여', t => {
    const h = harness(t); const p = h.plugin; h.mount();
    assert(!p.queueStatus.classList.contains('has-items'));
    for (const i of [0, 1, 0]) h.fire(h.itemNode(i), 'contextmenu', {button:2});
    assert.deepEqual(p.queuedItems, [h.items[0], h.items[1], h.items[0]]);
    assert.equal(p.favorites.size, 0);
    assert.deepEqual([...p.queueStatus.querySelectorAll('img')].map(img => img.src), p.queuedItems.map(item => item.url));
    p.queueStatus.querySelectorAll('.yuiko-queue-remove')[1].click();
    assert.deepEqual(p.queuedItems, [h.items[0], h.items[0]]);
    assert.deepEqual([...p.queueStatus.querySelectorAll('.yuiko-queue-number')].map(n => n.textContent), ['1','2']);
    p.queueStatus.querySelector('.yuiko-queue-clear').click();
    assert.equal(p.queuedItems.length, 0);
    assert(!p.queueStatus.classList.contains('has-items'));
});

test('1초 임계값, 길게 누른 후 클릭 억제, 짧게 누르기 취소', async t => {
    const h = harness(t); const p = h.plugin; h.mount(); let sends = 0; p.useEmoji = () => sends++;
    h.fire(h.itemNode(0), 'pointerdown'); await h.advance(999); assert.equal(p.favorites.size, 0);
    await h.advance(1); assert(p.favorites.has(h.items[0].url));
    h.fire(h.itemNode(0), 'pointerup'); h.fire(h.itemNode(0), 'click'); assert.equal(sends, 0);
    h.fire(h.itemNode(0), 'pointerdown'); await h.advance(999); h.fire(h.itemNode(0), 'pointerup');
    await h.advance(1); h.fire(h.itemNode(0), 'click'); assert.equal(sends, 1);
    assert(p.favorites.has(h.items[0].url));
});

test('모드 버튼은 Shift+우클릭과 길게 누르기만 교대로 저장', async t => {
    const h = harness(t); const p = h.plugin; h.mount();
    p.grid.querySelector('.yuiko-favorite-gesture').click();
    assert.equal(h.data.get('favoriteGesture'), 'shiftRightClick');
    h.fire(h.itemNode(0), 'pointerdown'); await h.advance(1000); assert.equal(p.favorites.size, 0);
    h.fire(h.itemNode(0), 'contextmenu', {button:2, shiftKey:true}); assert.equal(p.favorites.size, 1); assert.equal(p.queuedItems.length, 0);
    h.fire(h.itemNode(0), 'contextmenu', {button:2, shiftKey:true}); assert.equal(p.favorites.size, 0);
    h.fire(h.itemNode(0), 'contextmenu', {button:2}); assert.equal(p.queuedItems.length, 1);
    p.grid.querySelector('.yuiko-favorite-gesture').click(); assert.equal(h.data.get('favoriteGesture'), 'longPress');
    assert.equal(p.queuedItems.length, 1);
});

test('패널 닫기는 검색어·대기 목록을 비우고 길게 누르기를 취소', async t => {
    const h = harness(t); const p = h.plugin; h.mount();
    p.searchInput.value = '하나'; h.fire(p.searchInput, 'input');
    h.fire(h.itemNode(0), 'contextmenu', {button:2}); h.fire(h.itemNode(0), 'pointerdown');
    p.closePanel(); await h.advance(1200);
    assert.equal(p.searchInput.value, ''); assert.equal(p.queuedItems.length, 0); assert.equal(p.favorites.size, 0);
    assert.equal(p.panel.style.display, 'none'); assert(!p.queueStatus.classList.contains('has-items'));
});

for (const handledBySlate of [true, false]) {
    test(`일괄 전송 형식과 Enter 1회 (Slate=${handledBySlate})`, async t => {
        const h = harness(t); const p = h.plugin; h.mount();
        const composer = h.document.createElement('div'); composer.contentEditable='true'; h.document.body.append(composer); p.composer=composer;
        let inserted, fallbackCalls=0; const keys=[];
        composer.addEventListener('beforeinput', event => {inserted=event.data; if (handledBySlate) event.preventDefault();});
        composer.addEventListener('keydown', event => keys.push(event.key));
        h.document.execCommand = (command, ui, value) => {fallbackCalls++; assert.equal(command, 'insertText'); assert.equal(value, inserted); return true;};
        p.queuedItems = [h.items[0], h.items[1], h.items[0]];
        p.useEmoji(h.items[2]); await h.advance(0);
        assert.equal(inserted, '.하나.둘.하나.셋'); assert.equal(fallbackCalls, handledBySlate ? 0 : 1);
        assert.deepEqual(keys, ['Enter']); assert.deepEqual(p.recent, [h.items[2].url, h.items[0].url, h.items[1].url]);
        assert.equal(p.queuedItems.length, 0);
    });
}

test('입력 실패 및 autoSend=false일 때 Enter를 전송하지 않음', async t => {
    const h=harness(t); const p=h.plugin; h.mount();
    const composer=h.document.createElement('div'); h.document.body.append(composer); p.composer=composer;
    let sends=0; composer.addEventListener('keydown',()=>sends++); h.document.execCommand=()=>false;
    p.useEmoji(h.items[0]); await h.advance(0); assert.equal(sends,0); assert.equal(p.recent.length,0); assert.equal(h.toasts.at(-1).type,'error');
    h.document.execCommand=()=>true; p.autoSend=false; p.useEmoji(h.items[0]); await h.advance(0); assert.equal(sends,0);
});

test('다른 그룹의 즐겨찾기도 선택 및 검색 가능하고 정렬은 원본 배열을 보존', t => {
    const h=harness(t); const p=h.plugin;
    p.items=h.items.slice(0,2); p.itemByUrl=new Map(p.items.map(item=>[item.url,item])); p.selectedGroupId=1;
    p.favorites.add(h.items[2].url); h.mount();
    h.fire(h.itemNode(2,'fav'),'contextmenu',{button:2}); assert.deepEqual(p.queuedItems,[h.items[2]]);
    p.render('셋'); assert.equal(p.grid.querySelectorAll('.yuiko-item').length,1);
    p.recent=[h.items[1].url]; p.sortByRecent=true;
    assert.deepEqual(p.sortItems(p.items),[h.items[1],h.items[0]]); assert.deepEqual(p.items,h.items.slice(0,2));
});

test('즐겨찾기 드래그는 5px 이후 시작하고 클릭 전송을 억제', async t => {
    const h=harness(t); const p=h.plugin; p.favorites=new Set(h.items.slice(0,2).map(item=>item.url)); h.mount();
    const from=h.itemNode(0,'fav'), to=h.itemNode(1,'fav'); let sends=0; p.useEmoji=()=>sends++;
    h.document.elementFromPoint=()=>to;
    to.getBoundingClientRect=()=>({left:0,width:64,top:0,height:64});
    h.fire(from,'pointerdown',{clientX:0,clientY:0}); h.fire(from,'pointermove',{clientX:4,clientY:0}); assert.equal(p.dragActive,false);
    h.fire(from,'pointermove',{clientX:40,clientY:0}); assert.equal(p.dragActive,true);
    await h.advance(1000); assert.equal(p.favorites.size,2);
    h.fire(from,'pointerup',{clientX:40,clientY:0}); h.fire(h.itemNode(1,'fav'),'click'); assert.equal(sends,0);
    assert.deepEqual([...p.favorites],[h.items[1].url,h.items[0].url]);
    await h.advance(0); assert.equal(p.suppressNextClick,false);
});

test('기존 GIF 숨김 선택자는 채팅 배지만 선택', t => {
    const h=harness(t); h.mount();
    h.document.body.insertAdjacentHTML('beforeend','<div id="chat-messages-1"><span class="gifTag_f60819">GIF</span><img alt="emoji"></div><div class="gifTag_f60819" id="picker">GIF</div>');
    assert.equal(h.window.getComputedStyle(h.document.querySelector('#chat-messages-1 span')).display,'none');
    assert.notEqual(h.window.getComputedStyle(h.document.querySelector('#picker')).display,'none');
    assert.notEqual(h.window.getComputedStyle(h.document.querySelector('#chat-messages-1 img')).display,'none');
});
