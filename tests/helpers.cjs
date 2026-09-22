const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');

function deferred() {
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    return {promise, resolve, reject};
}

async function flush() {
    for (let i = 0; i < 12; i++) await Promise.resolve();
}

function harness(t, options = {}) {
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {url:'https://discord.com/channels/test'});
    t.after(() => dom.window.close());
    const {window} = dom;
    let now = Date.UTC(2026, 8, 22, 3, 12), nextId = 0;
    const timers = new Map(), data = new Map(Object.entries(options.data || {}));
    const writes = [], toasts = [], logs = [], files = new Map();
    const installedPath = path.join('virtual-plugins', 'YuikoStickers.plugin.js');
    const versionedSource = version => `/**\n * @name YuikoStickers\n * @version ${version}\n */\nmodule.exports = class {};\n`;
    files.set(installedPath, versionedSource(options.installedVersion || '2.17.3'));
    const fakeFs = {
        readFileSync(file) { if (!files.has(file)) throw new Error('Unexpected file read: ' + file); return files.get(file); },
        writeFileSync(file, value) { if (file !== installedPath) throw new Error('Unexpected file write'); files.set(file, value); }
    };
    const api = {
        Plugins: {folder:'virtual-plugins', get:() => ({version:options.metadataVersion || '2.17.3'})},
        Data: {load:(_, key) => data.get(key), save:(_, key, value) => {writes.push({key, value:structuredClone(value)}); data.set(key, structuredClone(value));}},
        DOM: {addStyle:(_, css) => { let style = window.document.getElementById('test-plugin-style'); if (!style) {style = window.document.createElement('style'); style.id = 'test-plugin-style'; window.document.head.append(style);} style.textContent = css; }, removeStyle:() => window.document.getElementById('test-plugin-style')?.remove()},
        UI: {showToast:(message, settings) => toasts.push({message, ...settings})},
        Net: {fetch:async () => {throw new Error('Tests must stub network requests');}}
    };
    class ClockDate extends Date {
        constructor(...args) { super(...(args.length ? args : [now])); }
        static now() { return now; }
    }
    const timerSet = (fn, delay = 0) => { const id = ++nextId; timers.set(id, {fn, at:now + delay}); return id; };
    const timerClear = id => timers.delete(id);
    const mod = {exports:{}};
    const source = fs.readFileSync(options.source || process.env.YUIKO_TEST_SOURCE || path.join(__dirname, '..', 'YuikoStickers.plugin.js'), 'utf8');
    const compile = new Function('module', 'require', 'BdApi', 'window', 'document', 'MutationObserver', 'InputEvent', 'KeyboardEvent', 'innerWidth', 'innerHeight', 'setTimeout', 'clearTimeout', 'Date', 'console', source);
    compile(mod, name => {
        if (name === 'fs') return fakeFs;
        if (name === 'path') return path;
        throw new Error('Unexpected require: ' + name);
    }, api, window, window.document, window.MutationObserver, window.InputEvent, window.KeyboardEvent, 1280, 900, timerSet, timerClear, ClockDate, {info:(...args) => logs.push(args), warn:(...args) => logs.push(args), error:(...args) => logs.push(args)});
    const plugin = new mod.exports();
    plugin.running = true;
    const items = [
        {url:'https://example.test/1.png', name:'하나,별칭', groupId:1, groupName:'첫 그룹'},
        {url:'https://example.test/2.gif', name:'둘', groupId:1, groupName:'첫 그룹'},
        {url:'https://example.test/3.png', name:'셋', groupId:2, groupName:'둘째 그룹'}
    ];
    plugin.groups = [{id:1, name:'첫 그룹', count:2}, {id:2, name:'둘째 그룹', count:1}];
    plugin.enabledGroupIds = [1, 2]; plugin.groupOrder = [1, 2];
    plugin.items = items;
    plugin.itemByUrl = new Map(items.map(item => [item.url, item]));
    plugin.knownItems = new Map(plugin.itemByUrl);
    const advance = async ms => {
        const end = now + ms;
        let count = 0;
        while (true) {
            const next = [...timers].filter(([,timer]) => timer.at <= end).sort((a,b) => a[1].at-b[1].at)[0];
            if (!next) break;
            if (++count > 1000) throw new Error('Timer loop');
            now = next[1].at; timers.delete(next[0]); next[1].fn(); await flush();
        }
        now = end; await flush();
    };
    const fire = (element, type, init = {}) => {
        const event = new window.MouseEvent(type, {bubbles:true, cancelable:true, button:0, clientX:10, clientY:10, ...init});
        if (init.pointerId !== undefined) Object.defineProperty(event, 'pointerId', {value:init.pointerId});
        element.dispatchEvent(event); return event;
    };
    const mount = () => {plugin.addStyles(); plugin.createPanel(); plugin.panel.style.display='flex'; return plugin.panel;};
    const itemNode = (index, section = '') => plugin.grid.querySelector(`${section ? '[data-section="fav"]' : ':not([data-section="fav"])'}[data-url="${items[index].url}"]`);
    return {plugin, window, document:window.document, api, items, data, writes, toasts, logs, timers, files, installedPath, versionedSource, advance, fire, mount, itemNode, fakeFs, now:() => now};
}

function advertiseRefs(commit, extra = '') {
    const packet = text => (Buffer.byteLength(text) + 4).toString(16).padStart(4, '0') + text;
    return packet('# service=git-upload-pack\n') + '0000' + packet(`${commit} HEAD\0symref=HEAD:refs/heads/main\n`) + extra + packet(`${commit} refs/heads/main\n`) + '0000';
}

module.exports = {harness, deferred, flush, advertiseRefs};
