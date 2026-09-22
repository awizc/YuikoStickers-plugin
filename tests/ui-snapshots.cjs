const {createHash} = require('node:crypto');

function collectUi(h) {
    const p = h.plugin;
    h.mount();
    const html = () => p.panel.outerHTML.replace(/data:image\/png;base64,[^"]+/g, '[embedded-icon]');
    const snapshots = {stylesSha256:createHash('sha256').update(h.document.getElementById('test-plugin-style').textContent).digest('hex'), normal:html()};
    p.favorites.add(h.items[2].url); p.rerender(); snapshots.favorites = html();
    p.queuedItems = [h.items[0],h.items[1],h.items[0]]; p.updateQueueStatus(); snapshots.queue = html();
    p.searchInput.value = '둘'; p.render('둘'); snapshots.search = html();
    p.favoriteGesture = 'shiftRightClick'; p.sortByRecent = true; p.recent=[h.items[1].url]; p.render(); snapshots.alternateMode = html();
    return snapshots;
}

module.exports = {collectUi};
