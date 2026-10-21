/* Original desktop shell. Change the name in Settings whenever inspiration hits. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const core = DeskCore;
  const read = (key, fallback) => { try { return core.storage(localStorage, 'yourdesk.' + key, fallback); } catch (_) { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem('yourdesk.' + key, JSON.stringify(value)); return true; } catch (_) { return false; } };
  const paths = {
    games: '<path d="M6 8h12l3 10c.5 2-2 3-3 1l-2-3H8l-2 3c-1 2-3.5 1-3-1L6 8Z"/><path d="M7 11v5m-2.5-2.5h5M16 11h.01M18 14h.01"/>',
    browser: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>',
    notes: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    settings: '<path d="m9 3-1 3-3 1-2 3 2 2-1 3 3 3 3-1 2 2 3-1 1-3 3-1 1-3-2-2 1-3-3-2-3 1-2-2Z"/><circle cx="11" cy="11" r="3"/>',
    starfall: '<path d="m12 2 8 18-8-4-8 4L12 2Z"/><path d="M12 8v8M9 21h6"/>',
    snake: '<path d="M4 6h11a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h11M4 3v6M18 19h3v3"/><circle cx="6" cy="6" r=".5"/>',
    memory: '<rect x="3" y="3" width="12" height="16" rx="2"/><path d="M18 6h3v15H9v-1M9 7l2 4-2 4-2-4 2-4Z"/>'
  };
  const icon = id => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id] || paths.games}</svg>`;
  const apps = [
    {id:'games', name:'Games', color:'#a1f0d1', description:'Your arcade, always open'},
    {id:'browser', name:'Web', color:'#a6c9ff', description:'A window to the web'},
    {id:'notes', name:'Notes', color:'#f1d69e', description:'Catch a little inspiration'},
    {id:'settings', name:'Settings', color:'#c9b6f0', description:'Make this space yours'}
  ];
  const games = [
    {id:'starfall', name:'Starfall', color:'#a1f0d1', description:'Pilot a tiny ship through a very big asteroid field.', genre:'SPACE / SURVIVAL'},
    {id:'snake', name:'Neon Snake', color:'#a1f0d1', description:'One more bite. One less place to hide.', genre:'ARCADE / CLASSIC'},
    {id:'memory', name:'Signal Match', color:'#c9b6f0', description:'Find the pairs. Tune in to a sharper memory.', genre:'PUZZLE / FOCUS'}
  ];
  const windows = new Map();
  let z = 10, activeId = null, toastTimer;
  const preferences = read('preferences', {});
  const prefs = Object.assign({name:'Your Desktop', wallpaper:'orbit', accent:'#a1f0d1', reduced:false}, preferences && typeof preferences === 'object' && !Array.isArray(preferences) ? preferences : {});
  // Only accept known appearance values from saved data.
  if (!['orbit','aurora','midnight'].includes(prefs.wallpaper)) prefs.wallpaper = 'orbit';
  if (!['#a1f0d1','#b6c5ff','#ffc49f','#f1b2db'].includes(prefs.accent)) prefs.accent = '#a1f0d1';
  function applyPreferences() {
    prefs.name = typeof prefs.name === 'string' && prefs.name.trim() ? prefs.name.trim().slice(0, 28) : 'Your Desktop';
    document.body.dataset.wallpaper = prefs.wallpaper;
    document.documentElement.style.setProperty('--accent', prefs.accent);
    document.body.classList.toggle('reduced-motion', !!prefs.reduced);
    $('#desktop-name').textContent = prefs.name.toUpperCase();
    document.title = prefs.name;
  }
  applyPreferences();
  function toast(message) {
    $('#toast').textContent = message; $('#toast').hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3000);
  }
  const appButton = app => `<span class="app-icon" style="--icon-color:${app.color}">${icon(app.id)}</span><span>${app.name}</span>`;
  apps.forEach(app => {
    const button = document.createElement('button'); button.className = 'shortcut'; button.innerHTML = appButton(app); button.title = app.description;
    button.addEventListener('click', () => openApp(app.id)); $('#shortcuts').append(button);
    const dockButton = document.createElement('button'); dockButton.innerHTML = icon(app.id); dockButton.title = app.name;
    dockButton.setAttribute('aria-label', app.name); dockButton.dataset.dock = app.id; dockButton.style.setProperty('--icon-color', app.color);
    dockButton.addEventListener('click', () => { const w = windows.get(app.id); if (w && !w.minimized && activeId === app.id) minimize(w); else openApp(app.id); });
    $('#dock').append(dockButton);
  });
  function launcher(show) {
    $('#launcher').hidden = !show; $('#launcher-button').setAttribute('aria-expanded', String(show));
    if (show) { $('#app-search').value = ''; renderLauncher(''); $('#app-search').focus(); }
  }
  function renderLauncher(query) {
    $('#launcher-grid').replaceChildren();
    const list = apps.concat(games).filter(app => `${app.name} ${app.description}`.toLowerCase().includes(query.toLowerCase()));
    list.forEach(app => {
      const b = document.createElement('button'); b.className = 'launcher-app'; b.innerHTML = appButton(app);
      b.addEventListener('click', () => openApp(app.id)); $('#launcher-grid').append(b);
    });
    $('#search-empty').hidden = list.length > 0;
  }
  $('#launcher-button').addEventListener('click', () => launcher($('#launcher').hidden));
  $('#brand').addEventListener('click', () => launcher($('#launcher').hidden));
  $('#close-launcher').addEventListener('click', () => launcher(false));
  $('#app-search').addEventListener('input', e => renderLauncher(e.target.value));
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#launcher,#launcher-button,#brand')) launcher(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') launcher(false); });
  document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openApp(b.dataset.open)));
  document.querySelectorAll('[data-game]').forEach(b => b.addEventListener('click', () => openApp(b.dataset.game)));
  function updateClock() { $('#clock').textContent = new Date().toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}); $('#clock').title = new Date().toLocaleDateString([], {weekday:'long',month:'long',day:'numeric'}); }
  updateClock(); setInterval(updateClock, 10000); $('#clock').addEventListener('click', () => openApp('settings'));
  function syncGames() { windows.forEach(w => w.game?.setVisible(!document.hidden && !w.minimized && activeId === w.id)); }
  document.addEventListener('visibilitychange', syncGames);
  function focusWindow(w) {
    if (w.minimized) { w.minimized = false; w.el.hidden = false; }
    activeId = w.id; w.el.style.zIndex = ++z;
    windows.forEach(v => v.el.classList.toggle('active', v.id === w.id)); syncGames();
  }
  function focusNext() { const next = [...windows.values()].filter(w => !w.minimized).sort((a,b) => Number(b.el.style.zIndex) - Number(a.el.style.zIndex))[0]; activeId = null; if (next) focusWindow(next); else syncGames(); }
  function minimize(w) { w.minimized = true; w.el.hidden = true; if (activeId === w.id) focusNext(); else syncGames(); }
  function closeWindow(w) {
    w.game?.destroy(); w.cleanup?.(); w.el.remove(); windows.delete(w.id);
    document.querySelector(`[data-dock="${w.id}"]`)?.classList.remove('running');
    if (w.temporaryDock) w.temporaryDock.remove();
    if (activeId === w.id) focusNext();
  }
  function positionWindow(w) {
    const layer = $('#window-layer'); const width = Math.min(w.id === 'games' ? 800 : w.game ? 720 : 720, layer.clientWidth - 24);
    const height = Math.min(560, layer.clientHeight - 115);
    w.el.style.width = width + 'px'; w.el.style.height = Math.max(290, height) + 'px';
    w.el.style.left = core.clamp((layer.clientWidth-width)/2 + ((windows.size-1)%4)*23,12,layer.clientWidth-width-12) + 'px';
    w.el.style.top = core.clamp(35 + ((windows.size-1)%4)*24, 8, layer.clientHeight-height-110) + 'px';
  }
  function openApp(id) {
    launcher(false);
    if (windows.has(id)) { focusWindow(windows.get(id)); return; }
    const app = apps.concat(games).find(a => a.id === id); if (!app) return;
    const el = document.createElement('section'); el.className = 'window'; el.setAttribute('aria-label', app.name + ' window');
    el.innerHTML = `<header class="window-titlebar"><span class="window-title">${icon(id)}${app.name}</span><div class="window-controls"><button data-control="minimize" aria-label="Minimize ${app.name}" title="Minimize">−</button><button data-control="maximize" aria-label="Maximize ${app.name}" title="Maximize">□</button><button data-control="close" class="close" aria-label="Close ${app.name}" title="Close">×</button></div></header><div class="window-body"></div>`;
    const w = {id, el, body:$('.window-body', el), minimized:false, game:null}; windows.set(id,w); $('#window-layer').append(el);
    if (games.some(g => g.id === id)) {
      w.game = DesktopGames.mount(id, w.body, {read, save, toast});
      const b = document.createElement('button'); b.innerHTML = icon(id); b.title = app.name; b.setAttribute('aria-label', app.name); b.className = 'running'; b.dataset.dock = id;
      b.addEventListener('click', () => w.minimized || activeId !== id ? focusWindow(w) : minimize(w)); $('#dock').append(b); w.temporaryDock = b;
    } else if (id === 'games') renderLibrary(w);
    else if (id === 'browser') renderBrowser(w);
    else if (id === 'notes') renderNotes(w);
    else if (id === 'settings') renderSettings(w);
    positionWindow(w); focusWindow(w); document.querySelector(`[data-dock="${id}"]`)?.classList.add('running');
    el.addEventListener('pointerdown', () => focusWindow(w));
    el.addEventListener('focusin', () => { if (activeId !== w.id) focusWindow(w); });
    $('[data-control="close"]',el).addEventListener('click', () => closeWindow(w));
    $('[data-control="minimize"]',el).addEventListener('click', () => minimize(w));
    const maximize = () => { el.classList.toggle('maximized'); $('[data-control="maximize"]',el).setAttribute('aria-label',(el.classList.contains('maximized')?'Restore ':'Maximize ')+app.name); };
    $('[data-control="maximize"]',el).addEventListener('click', maximize);
    const bar = $('.window-titlebar',el); bar.addEventListener('dblclick',e => { if (!e.target.closest('button')) maximize(); });
    let dragging = null;
    bar.addEventListener('pointerdown', e => {
      if (e.target.closest('button') || el.classList.contains('maximized') || e.button !== 0) return;
      dragging = {x:e.clientX,y:e.clientY,left:el.offsetLeft,top:el.offsetTop}; bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener('pointermove',e => {
      if (!dragging) return;
      el.style.left = core.clamp(dragging.left+e.clientX-dragging.x,0,$('#window-layer').clientWidth-el.offsetWidth)+'px';
      el.style.top = core.clamp(dragging.top+e.clientY-dragging.y,0,$('#window-layer').clientHeight-150)+'px';
    });
    bar.addEventListener('pointerup',() => { dragging=null; }); bar.addEventListener('lostpointercapture',() => { dragging=null; });
  }
  window.addEventListener('resize', () => windows.forEach(w => { if (!w.el.classList.contains('maximized')) { w.el.style.left = core.clamp(w.el.offsetLeft,0,$('#window-layer').clientWidth-w.el.offsetWidth)+'px'; w.el.style.top = core.clamp(w.el.offsetTop,0,$('#window-layer').clientHeight-150)+'px'; } }));
  function renderLibrary(w) {
    w.body.innerHTML = `<div class="app-padding"><p class="app-kicker">THE ARCADE</p><div class="app-row"><div><h2 class="app-heading">A good time starts here.</h2><p class="app-description">Pick a game. Chase a new best.</p></div><span class="small-tag">3 GAMES · ALL YOURS</span></div><div class="game-grid"></div><div class="library-foot"><span>Made for this desktop. Ready when you are.</span><span>NO DOWNLOAD NEEDED ↗</span></div></div>`;
    games.forEach(g => {
      const b = document.createElement('button'); b.className = 'game-card'; b.setAttribute('aria-label','Play '+g.name);
      const art = g.id === 'starfall' ? icon('starfall') : g.id === 'snake' ? '<div class="snake-art"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' : '<div class="memory-art"><i>✧</i><i>✧</i></div>';
      b.innerHTML = `<div class="game-art ${g.id}">${art}</div><div class="game-card-info"><p class="app-kicker">${g.genre}</p><h3>${g.name}</h3><p>${g.description}</p><span>Play now <b>↗</b></span></div>`;
      b.addEventListener('click', () => openApp(g.id)); $('.game-grid',w.body).append(b);
    });
  }
  function renderBrowser(w) {
    w.body.innerHTML = `<div class="browser-app"><div class="browser-toolbar"><button class="web-back" aria-label="Back" disabled>‹</button><button class="web-forward" aria-label="Forward" disabled>›</button><button class="web-home" aria-label="Web home">⌂</button><form class="address-form"><input aria-label="Website address" placeholder="Enter a website address…" autocomplete="off" spellcheck="false"><button aria-label="Go to website">→</button></form></div><div class="browser-content"></div></div>`;
    const content=$('.browser-content',w.body), field=$('input',w.body); let history=['home'], cursor=0;
    const sync = () => { $('.web-back',w.body).disabled=cursor===0; $('.web-forward',w.body).disabled=cursor===history.length-1; };
    function home() {
      field.value=''; content.innerHTML=`<div class="browser-home"><p class="app-kicker">A WINDOW TO THE WEB</p><h2 class="app-heading">Where to next?</h2><p class="app-description">Keep a little curiosity on your desktop.</p><div class="bookmark-grid"><button class="bookmark" data-url="https://en.wikipedia.org/"><b>W</b><span>Wikipedia</span><small>Learn something</small></button><button class="bookmark" data-url="https://scratch.mit.edu/"><b>✧</b><span>Scratch</span><small>Make something</small></button><button class="bookmark" data-url="https://www.nasa.gov/"><b>◌</b><span>NASA</span><small>Explore further</small></button></div><p class="embed-note">Some websites allow a preview here. Others need their own browser tab—use “Open in new tab” whenever a preview doesn’t load.</p><p class="browser-error" role="status"></p></div>`;
      content.querySelectorAll('[data-url]').forEach(b => b.addEventListener('click',()=>navigate(b.dataset.url)));
    }
    function render(url) {
      if (url==='home') home();
      else {
        field.value=url; content.replaceChildren();
        const bar=document.createElement('div'); bar.className='embed-bar';
        const text=document.createElement('span'); text.textContent='Preview blank or blocked? Open the website directly.';
        const link=document.createElement('a'); link.href=url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent='Open in new tab ↗';
        bar.append(text,link); const frame=document.createElement('iframe'); frame.className='web-frame'; frame.title='Website preview'; frame.referrerPolicy='no-referrer';
        frame.setAttribute('sandbox','allow-scripts allow-forms allow-same-origin allow-popups allow-pointer-lock'); frame.src=url; content.append(bar,frame);
      } sync();
    }
    function navigate(input) {
      let url;
      try { url=core.webAddress(input); }
      catch(e) { toast(e.message); return; }
      history=history.slice(0,cursor+1); history.push(url); cursor++; render(url);
    }
    $('.address-form',w.body).addEventListener('submit',e=>{e.preventDefault();navigate(field.value);});
    $('.web-back',w.body).addEventListener('click',()=>{if(cursor>0) render(history[--cursor]);});
    $('.web-forward',w.body).addEventListener('click',()=>{if(cursor<history.length-1) render(history[++cursor]);});
    $('.web-home',w.body).addEventListener('click',()=>{history=history.slice(0,cursor+1);history.push('home');cursor++;render('home');}); home();
    w.cleanup=()=>{const frame=$('iframe',content);if(frame) frame.src='about:blank';};
  }
  function renderNotes(w) {
    w.body.innerHTML=`<div class="notes-app"><div class="notes-toolbar"><span class="save-status">SAVED ON THIS DEVICE</span><button class="quiet-btn" id="export-note">Export .txt ↗</button></div><textarea class="notes-editor" aria-label="Your notes" placeholder="A game idea. A wild plan. Your next big thing.\n\nStart with a thought…"></textarea><div class="notes-footer">Your notes stay in this browser. Export a copy to keep them elsewhere.</div></div>`;
    const editor=$('textarea',w.body); const note=read('note','');editor.value=typeof note==='string'?note:'';
    editor.addEventListener('input',()=>{const ok=save('note',editor.value);$('.save-status',w.body).textContent=ok?'SAVED ON THIS DEVICE':'COULD NOT SAVE · EXPORT A COPY';});
    $('#export-note',w.body).addEventListener('click',()=>{
      const url=URL.createObjectURL(new Blob([editor.value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='my-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
  }
  function renderSettings(w) {
    w.body.innerHTML=`<div class="app-padding"><p class="app-kicker">PERSONALIZE</p><h2 class="app-heading">Make room for you.</h2><p class="app-description">A few small changes. A whole different feeling.</p><div class="settings-section"><h3>Desktop name</h3><form class="name-form"><input aria-label="Desktop name" maxlength="28" placeholder="Name it when you’re ready"><button class="primary">Save</button></form></div><div class="settings-section"><h3>Wallpaper</h3><div class="theme-grid"><button class="theme-option" data-theme="orbit">Quiet Orbit</button><button class="theme-option" data-theme="aurora">Northern Lights</button><button class="theme-option" data-theme="midnight">After Hours</button></div></div><div class="settings-section"><h3>Accent color</h3><div class="accent-row"></div></div><div class="settings-section"><label class="setting-label">Reduce interface motion <input type="checkbox" class="motion-toggle"></label></div><div class="about-card"><strong>A desktop with a future.</strong>This is your first version: games, notes, and space to experiment. Your preferences and game records save in this browser.</div></div>`;
    const name=$('.name-form input',w.body);name.value=prefs.name==='Your Desktop'?'':prefs.name;
    $('.name-form',w.body).addEventListener('submit',e=>{e.preventDefault();prefs.name=name.value;applyPreferences();save('preferences',prefs);toast('A new name. Same little universe.');});
    const sync=()=>{w.body.querySelectorAll('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===prefs.wallpaper)));w.body.querySelectorAll('[data-accent]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.accent===prefs.accent)));};
    w.body.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>{prefs.wallpaper=b.dataset.theme;applyPreferences();save('preferences',prefs);sync();}));
    [['#a1f0d1','Mint'],['#b6c5ff','Periwinkle'],['#ffc49f','Peach'],['#f1b2db','Rose']].forEach(([color,label])=>{const b=document.createElement('button');b.className='accent-btn';b.dataset.accent=color;b.style.setProperty('--swatch',color);b.setAttribute('aria-label',label+' accent');b.addEventListener('click',()=>{prefs.accent=color;applyPreferences();save('preferences',prefs);sync();});$('.accent-row',w.body).append(b);});
    const motion=$('.motion-toggle',w.body);motion.checked=!!prefs.reduced;motion.addEventListener('change',()=>{prefs.reduced=motion.checked;applyPreferences();save('preferences',prefs);});sync();
  }
})();
