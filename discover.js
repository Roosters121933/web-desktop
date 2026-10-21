import {discoveries,gamePoster} from './extra-games.js';
const grid=document.querySelector('#games');
const search=document.querySelector('#search');
const dialog=document.querySelector('#player');
const host=document.querySelector('#game-host');
let filter='all';
function matchesFilter(game){
  if(filter==='all') return true;
  if(filter==='pc') return game.edition.startsWith('PC game');
  if(filter==='Strategy') return ['Strategy','Factory'].includes(game.genre);
  if(filter==='Action') return ['Action','Action RPG','Multiplayer'].includes(game.genre);
  if(filter==='other') return ['Racing','Sandbox'].includes(game.genre);
  return game.genre===filter;
}
function play(game){
  document.querySelector('#player-title').textContent=game.title;
  document.querySelector('#player-controls').textContent=game.controls;
  const frame=document.createElement('iframe');
  const url=new URL('./game-launcher.html',location.href);
  url.searchParams.set('target',game.url);
  frame.title=game.title;
  frame.allow='fullscreen; gamepad; autoplay';
  frame.src=url.href;
  host.replaceChildren(frame);
  dialog.showModal();
}
function render(){
  const query=search.value.trim().toLowerCase();
  const games=discoveries.filter(game=>matchesFilter(game)&&[game.title,game.genre,game.creator,game.edition].join(' ').toLowerCase().includes(query));
  grid.replaceChildren(...games.map(game=>{
    const card=document.createElement('article');card.className='card';
    const image=document.createElement('img');image.className='poster';image.src=gamePoster(game);image.alt='';image.loading='lazy';
    const title=document.createElement('h3');title.textContent=game.title;
    const edition=document.createElement('p');edition.className='edition';edition.textContent=game.edition;
    const description=document.createElement('p');description.className='description';description.textContent=game.description;
    const actions=document.createElement('div');actions.className='card-actions';
    const button=document.createElement('button');button.className='play';button.textContent='▶ Play';button.setAttribute('aria-label','Play '+game.title);button.addEventListener('click',()=>play(game));
    const source=document.createElement('a');source.className='creator-link';source.href=game.source;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Creator site ↗';source.title=game.creator;
    actions.append(button,source);card.append(image,title,edition,description,actions);return card;
  }));
  document.querySelector('#result-count').textContent=games.length+' '+(games.length===1?'game':'games');
  document.querySelector('#empty').hidden=games.length>0;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});
  render();
}));
search.addEventListener('input',render);
document.querySelector('#close-player').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>host.replaceChildren());
render();
