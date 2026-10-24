const $=selector=>document.querySelector(selector);
const home=$('#home'),workspace=$('#workspace'),frameHost=$('#workspace-host');
const panel=$('#launcher'),results=$('#launcher-results'),search=$('#launcher-search');
const iconPaths={
 home:'M3 11 12 3l9 8v10h-6v-7H9v7H3z',
 games:'M6 7h12a4 4 0 0 1 4 4v7a2 2 0 0 1-3.4 1.4L16 17H8l-2.6 2.4A2 2 0 0 1 2 18v-7a4 4 0 0 1 4-4ZM7 10v6M4 13h6M16 11h.01M19 14h.01',
 apps:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
 search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
 browser:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18',
 files:'M3 6V4h6l2 3h10v13H3z',
 notes:'M5 3h14v18H5zM8 8h8M8 12h8M8 16h5',
 emulator:'M6 3h12v18H6zM9 6h6v5H9zM9 15h3M10.5 13.5v3M15 16h.01',
 terminal:'m5 7 5 5-5 5M13 17h6',
 settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
 external:'M14 3h7v7M21 3 10 14M10 3H3v18h18v-7',
 arrow:'M5 12h14m-5-5 5 5-5 5',
 fullscreen:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',
 close:'m6 6 12 12M18 6 6 18',
 sun:'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 1.4 1.4M17 17l1.4 1.4M5.6 18.4 1.4-1.4M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0'
};
const svg=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name]||iconPaths.apps}"/></svg>`;
document.querySelectorAll('[data-icon]').forEach(node=>node.innerHTML=svg(node.dataset.icon));
const apps=[
 {id:'steamApp',title:'Game Library',subtitle:'Your full Yuki game collection',icon:'games',color:'blue'},
 {id:'emulatorApp',title:'Emulators',subtitle:'Yuki’s console and retro tools',icon:'emulator',color:'pink'},
 {id:'notepadApp',title:'Notes',subtitle:'Write something down',icon:'notes',color:'amber'},
 {id:'explorerApp',title:'Files',subtitle:'Your workspace files',icon:'files',color:'mint'},
 {id:'terminalApp',title:'Terminal',subtitle:'Commands, code, and experiments',icon:'terminal',color:'violet'},
 {id:'jsDosApp',title:'DOS Player',subtitle:'Launch the existing DOS workspace',icon:'emulator',color:'blue'},
 {id:'settingsApp',title:'Workspace Settings',subtitle:'Personalize the Yuki environment',icon:'settings',color:'mint'},
 {id:'room3dApp',title:'3D Room',subtitle:'Explore Yuki’s interactive room',icon:'apps',color:'pink'}
];
let catalog=[],catalogPromise=null,tab='apps',frame=null,ready=false,pending=null,requestNumber=0;
let lastFocused=null;
function load(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{}}
let recent=load('hybrid-recent-v1',[]).filter(item=>item&&typeof item.id==='string'&&!item.id.startsWith('discovery')).slice(0,4);
function updateClock(){
 const now=new Date();
 $('#big-clock').textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
 $('#small-clock').textContent=new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(now);
 $('#today').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(now);
 $('#date-number').textContent=new Intl.DateTimeFormat('en-US',{day:'numeric'}).format(now);
 $('#date-month').textContent=new Intl.DateTimeFormat('en-US',{month:'short'}).format(now);
 const hour=now.getHours();$('#greeting').textContent=hour<12?'Good morning.':hour<18?'Good afternoon.':'Good evening.';
}
updateClock();setInterval(updateClock,15000);
const themes=['aurora','midnight','ember'];let theme=load('hybrid-theme-v1','aurora');if(!themes.includes(theme))theme='aurora';
function applyTheme(){document.body.dataset.theme=theme;$('#wallpaper-name').textContent=theme.charAt(0).toUpperCase()+theme.slice(1);}
applyTheme();$('#wallpaper-button').addEventListener('click',()=>{theme=themes[(themes.indexOf(theme)+1)%themes.length];save('hybrid-theme-v1',theme);applyTheme();});
function status(text){$('#workspace-status').textContent=text;}
function showHome(){home.hidden=false;workspace.hidden=true;document.body.classList.remove('in-workspace');$('#home-nav').classList.add('selected');$('#desktop-nav').classList.remove('selected');}
function showWorkspace(){home.hidden=true;workspace.hidden=false;document.body.classList.add('in-workspace');$('#home-nav').classList.remove('selected');$('#desktop-nav').classList.add('selected');}
function sendPending(){
 if(!ready||!frame||!pending)return;
 frame.contentWindow.postMessage({channel:'hybrid-desktop-v1',type:'launch',appId:pending.id,requestId:++requestNumber},location.origin);
 status('Opening '+pending.title+'…');pending=null;
}
function openWorkspace(app=null){
 if(app)pending=app;
 showWorkspace();
 if(!frame){
  ready=false;status('Starting workspace · choose Guest to continue');
  frame=document.createElement('iframe');frame.id='yuki-workspace';frame.title='Yuki desktop workspace';frame.allow='fullscreen; gamepad; autoplay';
  frame.src=new URL('./desktop.html',location.href).href;frameHost.replaceChildren(frame);
  frame.addEventListener('load',()=>frame.contentWindow.postMessage({channel:'hybrid-desktop-v1',type:'status'},location.origin));
 }
 sendPending();
}
function remember(app){recent=[{id:app.id,title:app.title,icon:app.icon||'games'},...recent.filter(item=>item.id!==app.id)].slice(0,4);save('hybrid-recent-v1',recent);renderRecent();}
function launch(app){remember(app);if(panel.open)panel.close();openWorkspace(app);}
window.addEventListener('message',event=>{
 if(!frame||event.source!==frame.contentWindow||event.origin!==location.origin||event.data?.channel!=='hybrid-desktop-v1')return;
 const message=event.data;
 if(message.type==='ready'){ready=true;status('Workspace ready');sendPending();}
 if(message.type==='loading')status('Choose Guest in the workspace to continue');
 if(message.type==='launch-result')status(message.ok?'Workspace ready':message.error||'The app could not open.');
});
function renderRecent(){
 const list=$('#recent-list');list.replaceChildren();
 if(!recent.length){const text=document.createElement('p');text.className='empty-recent';text.textContent='Your next session starts here. Open an app and it will appear in this space.';list.append(text);return;}
 recent.forEach(item=>{const button=document.createElement('button');button.className='recent-item';button.innerHTML=svg(item.icon in iconPaths?item.icon:'games');const text=document.createElement('span');text.textContent=item.title;button.append(text);button.addEventListener('click',()=>launch(item));list.append(button);});
}
renderRecent();
async function fetchCatalog(){
 if(!catalogPromise)catalogPromise=fetch(new URL('./library-index.json',import.meta.url)).then(response=>{if(!response.ok)throw Error('Catalog unavailable');return response.json();}).then(data=>{catalog=data;return catalog;}).catch(()=>{catalogPromise=null;throw Error('The catalog is unavailable. Open the full game library instead.');});
 return catalogPromise;
}
function appButton(app,isGame=false){
 const button=document.createElement('button');button.className='launch-item';
 const image=document.createElement('span');image.className='app-icon '+(app.color||'blue');
 if(isGame&&app.icon?.startsWith('https://')){const img=document.createElement('img');img.alt='';img.loading='lazy';img.src=app.icon;img.addEventListener('error',()=>{image.innerHTML=svg('games');},{once:true});image.append(img);}else image.innerHTML=svg(app.icon);
  const text=document.createElement('span');const title=document.createElement('strong');title.textContent=app.title;const subtitle=document.createElement('small');subtitle.textContent=isGame?'Launch in Yuki Workspace':app.subtitle;text.append(title,subtitle);button.append(image,text);button.addEventListener('click',()=>launch({...app,icon:isGame?'games':app.icon}));return button;
}
function renderLauncher(){
 const query=search.value.trim().toLowerCase();
 const entries=(tab==='games'?catalog:apps).filter(item=>[item.title,item.subtitle].join(' ').toLowerCase().includes(query));
 results.replaceChildren(...entries.slice(0,80).map(item=>appButton(item,tab==='games')));
 $('#launcher-count').textContent=entries.length?(tab==='games'?`${entries.length} matches · Showing ${Math.min(entries.length,80)} · Full collection in Yuki Library`:`${entries.length} apps`):'No matches. Try another name or open the full library.';
 $('#web-search').hidden=!query;$('#web-search').href='https://duckduckgo.com/?q='+encodeURIComponent(search.value.trim());$('#web-search-label').textContent='Search the web for “'+search.value.trim()+'”';
}
async function openLauncher(mode='apps'){
 lastFocused=document.activeElement;tab=mode;search.value='';
 document.querySelectorAll('[data-launcher-tab]').forEach(button=>{const selected=button.dataset.launcherTab===mode;button.classList.toggle('selected',selected);button.setAttribute('aria-selected',String(selected));});
 $('#launcher-title').textContent=mode==='games'?'Find your next game':'Make yourself at home';
 if(!panel.open)panel.showModal();search.focus();renderLauncher();
 if(mode==='games'&&!catalog.length){$('#launcher-count').textContent='Loading your Yuki catalog…';try{await fetchCatalog();}catch(error){$('#launcher-count').textContent=error.message;return;}if(tab==='games')renderLauncher();}
}
document.querySelectorAll('[data-open-launcher]').forEach(button=>button.addEventListener('click',()=>openLauncher(button.dataset.openLauncher)));
document.querySelectorAll('[data-launcher-tab]').forEach(button=>button.addEventListener('click',()=>openLauncher(button.dataset.launcherTab)));
document.querySelectorAll('[data-launch-app]').forEach(button=>button.addEventListener('click',()=>{const app=apps.find(item=>item.id===button.dataset.launchApp);if(app)launch(app);}));
document.querySelectorAll('[data-open-workspace]').forEach(button=>button.addEventListener('click',()=>openWorkspace()));
document.querySelectorAll('[data-home]').forEach(button=>button.addEventListener('click',showHome));
$('#close-launcher').addEventListener('click',()=>panel.close());panel.addEventListener('close',()=>lastFocused?.focus());
search.addEventListener('input',renderLauncher);
$('#full-library').addEventListener('click',()=>launch(apps[0]));
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openLauncher('apps');}});
$('#fullscreen-button').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}});
$('#workspace-direct').href=new URL('./desktop.html',location.href).href;
showHome();
