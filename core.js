/* Small shared rules, also tested outside the browser. */
(function (root) {
  'use strict';
  function webAddress(input) {
    var value = String(input || '').trim();
    if (!value) throw new Error('Enter a website address first.');
    if (/\s/.test(value)) throw new Error('Use a website address, such as example.com.');
    if (!/^[a-z][a-z\d+.-]*:/i.test(value)) value = 'https://' + value;
    var url;
    try { url = new URL(value); } catch (_) { throw new Error('That address does not look right.'); }
    if (url.protocol !== 'https:') throw new Error('Use a secure https:// website.');
    if (!url.hostname.includes('.') && url.hostname !== 'localhost') throw new Error('Enter a full website address.');
    if (url.username || url.password) throw new Error('Use an address without sign-in details.');
    return url.href;
  }
  function clamp(n, lo, hi) { return Math.min(Math.max(n, lo), Math.max(lo, hi)); }
  function snakeStep(body, direction, food, size) {
    var head = {x: body[0].x + direction.x, y: body[0].y + direction.y};
    var ate = head.x === food.x && head.y === food.y;
    var occupied = ate ? body : body.slice(0, -1);
    var hit = head.x < 0 || head.y < 0 || head.x >= size || head.y >= size || occupied.some(function (p) { return p.x === head.x && p.y === head.y; });
    return {body: hit ? body : [head].concat(ate ? body : body.slice(0, -1)), ate: ate, hit: hit};
  }
  function storage(storageObject, key, fallback) {
    try { var v = storageObject.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (_) { return fallback; }
  }
  var api = {webAddress: webAddress, clamp: clamp, snakeStep: snakeStep, storage: storage};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DeskCore = api;
})(typeof window !== 'undefined' ? window : this);
