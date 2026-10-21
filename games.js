/* Three original games. Each instance owns and cleans up its input and animation. */
window.DesktopGames = (() => {
  'use strict';
  const C = DeskCore;
  function mount(id, root, services) {
    if (id === 'memory') return memory(root, services);
    const snake = id === 'snake';
    root.innerHTML=`<div class="game-shell"><div class="game-hud"><span>${snake?'NEON SNAKE':'STARFALL'}</span><div class="hud-stat"><span>Score <b class="score">0</b></span><span>${snake?'Best':'Hull'} <b class="secondary">${snake?'0':'♥ ♥ ♥'}</b></span></div></div><div class="game-stage"><canvas width="800" height="500" tabindex="0" aria-label="${snake?'Neon Snake game board':'Starfall space game'}"></canvas><div class="game-overlay"><span class="game-symbol">${snake?'⌁':'✦'}</span><h2>${snake?'Neon Snake':'Starfall'}</h2><p>${snake?'Collect the glow. Don’t hit a wall—or yourself.':'Dodge the asteroids. Blast a path. See how long you can hold the stars.'}</p><button class="primary start-game">Let’s play →</button></div></div>${snake?'<div class="dpad" aria-label="Direction controls"><button data-dir="left" aria-label="Move left">←</button><button data-dir="up" aria-label="Move up">↑</button><button data-dir="down" aria-label="Move down">↓</button><button data-dir="right" aria-label="Move right">→</button></div>':''}<div class="game-help"><span>${snake?'Arrow keys or WASD · Space to pause':'Mouse / WASD to move · Hold click or Space to fire'}</span><button class="quiet-btn pause-game" disabled>Pause</button></div></div>`;
    const canvas=root.querySelector('canvas'), ctx=canvas.getContext('2d');
    const overlay=root.querySelector('.game-overlay'), start=root.querySelector('.start-game'), pause=root.querySelector('.pause-game');
    const scoreNode=root.querySelector('.score'), secondary=root.querySelector('.secondary');
    let state='ready', visible=false, destroyed=false, frame=0, last=0, keys=new Set(), pointerDown=false, score=0;
    const bestKey=id+'.best';let best=Math.max(0,Number(services.read(bestKey,0))||0);
    let game;
    const showOverlay=(heading,description,label)=>{overlay.hidden=false;overlay.querySelector('h2').textContent=heading;overlay.querySelector('p').textContent=description;start.textContent=label;};
    function hud() { scoreNode.textContent=Math.floor(score);secondary.textContent=snake?best:'♥ '.repeat(Math.max(0,game.health)).trim()||'—'; }
    function finish(won=false) {
      state='over';pause.disabled=true;pointerDown=false;keys.clear();
      best=Math.max(best,Math.floor(score));services.save(bestKey,best);hud();
      showOverlay(won?'Perfect run!':snake?'End of the line.':'Back among the stars.',`Score: ${Math.floor(score)} · Personal best: ${best}`, 'Play again →');
    }
    const api={ctx,keys,get pointerDown(){return pointerDown;},getScore:()=>score,addScore:n=>{score+=n;hud();},finish,hud};
    game=snake?snakeGame(api):spaceGame(api);
    function draw() { game.draw(); }
    function tick(time) {
      frame=0;if(destroyed||!visible||state!=='playing')return;
      const dt=last?Math.min((time-last)/1000,.04):0;last=time;game.update(dt);draw();
      if(state==='playing')frame=requestAnimationFrame(tick);
    }
    function schedule() { if (!frame&&visible&&state==='playing'&&!destroyed) { last=0; frame=requestAnimationFrame(tick); } }
    function stop() { cancelAnimationFrame(frame);frame=0;last=0;keys.clear();pointerDown=false; }
    function togglePause() {
      if(state==='playing'){state='paused';stop();pause.textContent='Resume';showOverlay('Take a breath.','Your run is right here when you’re ready.','Resume →');}
      else if(state==='paused'){state='playing';pause.textContent='Pause';overlay.hidden=true;canvas.focus();schedule();}
    }
    start.addEventListener('click',()=>{
      if(state==='paused'){togglePause();return;}
      score=0;game.reset();hud();state='playing';overlay.hidden=true;pause.disabled=false;pause.textContent='Pause';canvas.focus();schedule();
    });
    pause.addEventListener('click',togglePause);
    function keydown(e) {
      if(!visible||destroyed||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
      if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','w','a','s','d','W','A','S','D','p','P'].includes(e.key))return;
      e.preventDefault();
      if((e.key==='p'||e.key==='P'||snake&&e.key===' ')&&!e.repeat){togglePause();return;}
      keys.add(e.key.toLowerCase());if(state==='playing')game.key?.(e.key.toLowerCase());
    }
    const keyup=e=>keys.delete(e.key.toLowerCase());
    document.addEventListener('keydown',keydown);document.addEventListener('keyup',keyup);
    const pointer=e=>{const r=canvas.getBoundingClientRect();game.pointer?.((e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*500);};
    canvas.addEventListener('pointermove',pointer);
    canvas.addEventListener('pointerdown',e=>{if(state!=='playing')return;pointerDown=true;canvas.setPointerCapture(e.pointerId);pointer(e);canvas.focus();});
    canvas.addEventListener('pointerup',()=>{pointerDown=false;});canvas.addEventListener('pointercancel',()=>{pointerDown=false;});
    const blur=()=>{if(state==='playing'&&visible)togglePause();};window.addEventListener('blur',blur);
    root.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>{if(state==='playing')game.key('arrow'+b.dataset.dir);canvas.focus();}));
    game.reset();hud();draw();
    return {
      setVisible(v){visible=v;if(!v)stop();else schedule();},
      destroy(){destroyed=true;stop();document.removeEventListener('keydown',keydown);document.removeEventListener('keyup',keyup);window.removeEventListener('blur',blur);}
    };
  }
  function spaceGame(api) {
    const {ctx:g,keys}=api;let ship,rocks,bullets,particles,stars,elapsed,spawnTimer,shotTimer,invulnerable;
    const rand=(a,b)=>a+Math.random()*(b-a);
    const game={health:3,
      reset(){game.health=3;ship={x:400,y:420};rocks=[];bullets=[];particles=[];elapsed=0;spawnTimer=.5;shotTimer=0;invulnerable=0;stars=Array.from({length:85},()=>({x:rand(0,800),y:rand(0,500),r:rand(.5,1.7),speed:rand(35,180)}));},
      pointer(x,y){ship.x=C.clamp(x,20,780);ship.y=C.clamp(y,40,475);},
      update(dt){
        elapsed+=dt;spawnTimer-=dt;shotTimer-=dt;invulnerable=Math.max(0,invulnerable-dt);
        if(keys.has('a')||keys.has('arrowleft'))ship.x-=350*dt;if(keys.has('d')||keys.has('arrowright'))ship.x+=350*dt;
        if(keys.has('w')||keys.has('arrowup'))ship.y-=350*dt;if(keys.has('s')||keys.has('arrowdown'))ship.y+=350*dt;
        ship.x=C.clamp(ship.x,20,780);ship.y=C.clamp(ship.y,30,475);
        stars.forEach(s=>{s.y+=s.speed*dt*(1+elapsed*.008);if(s.y>510){s.y=-5;s.x=rand(0,800);}});
        if((keys.has(' ')||api.pointerDown)&&shotTimer<=0){bullets.push({x:ship.x-7,y:ship.y-22},{x:ship.x+7,y:ship.y-22});shotTimer=.16;}
        if(spawnTimer<=0){const r=rand(18,38);rocks.push({x:rand(r,800-r),y:-r-5,r,speed:rand(80,135)+Math.min(elapsed*2,220),spin:rand(-.8,.8),angle:rand(0,6),hp:r>30?2:1,points:Array.from({length:9},()=>rand(.7,1.1))});spawnTimer=Math.max(.22,.85-elapsed*.007);}
        bullets.forEach(b=>b.y-=650*dt);
        for(const r of rocks){
          r.y+=r.speed*dt;r.angle+=r.spin*dt;
          for(const b of bullets){if(!b.dead&&Math.hypot(b.x-r.x,b.y-r.y)<r.r){b.dead=true;r.hp--;if(r.hp<=0){r.dead=true;api.addScore(20);burst(r.x,r.y,'#a1f0d1',15);break;}}}
          if(!r.dead&&invulnerable<=0&&Math.hypot(r.x-ship.x,r.y-ship.y)<r.r+12){r.dead=true;game.health--;invulnerable=1.3;burst(ship.x,ship.y,'#ffbb9c',24);api.hud();if(game.health<=0){api.finish();return;}}
          if(!r.dead&&r.y>500+r.r){r.dead=true;api.addScore(2);}
        }
        rocks=rocks.filter(r=>!r.dead);bullets=bullets.filter(b=>!b.dead&&b.y>-20);
        particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;});particles=particles.filter(p=>p.life>0);
      },
      draw(){
        g.fillStyle='#081420';g.fillRect(0,0,800,500);
        const glow=g.createRadialGradient(400,100,0,400,100,430);glow.addColorStop(0,'#163b493d');glow.addColorStop(1,'#08142000');g.fillStyle=glow;g.fillRect(0,0,800,500);
        stars.forEach(s=>{g.globalAlpha=.3+s.r/3;g.fillStyle='#accfd9';g.fillRect(s.x,s.y,s.r,s.r*2);});g.globalAlpha=1;
        rocks.forEach(r=>{g.save();g.translate(r.x,r.y);g.rotate(r.angle);g.beginPath();r.points.forEach((p,i)=>{const a=i/9*Math.PI*2;const x=Math.cos(a)*r.r*p,y=Math.sin(a)*r.r*p;i?g.lineTo(x,y):g.moveTo(x,y);});g.closePath();g.fillStyle='#304451';g.strokeStyle='#6e8a95';g.lineWidth=1.5;g.fill();g.stroke();g.beginPath();g.arc(-r.r*.25,-r.r*.15,r.r*.23,0,Math.PI*2);g.fillStyle='#1d303c';g.fill();g.restore();});
        g.fillStyle='#a1f0d1';g.shadowColor='#a1f0d1';g.shadowBlur=8;bullets.forEach(b=>g.fillRect(b.x-1.5,b.y,3,13));g.shadowBlur=0;
        particles.forEach(p=>{g.globalAlpha=Math.min(1,p.life*2);g.fillStyle=p.color;g.fillRect(p.x,p.y,3,3);});g.globalAlpha=1;
        if(invulnerable<=0||Math.floor(invulnerable*15)%2===0){g.save();g.translate(ship.x,ship.y);g.fillStyle='#5de1bf';g.beginPath();g.moveTo(-5,17);g.lineTo(0,28+Math.random()*11);g.lineTo(5,17);g.fill();g.beginPath();g.moveTo(0,-24);g.lineTo(19,18);g.lineTo(0,9);g.lineTo(-19,18);g.closePath();g.fillStyle='#b4f4e0';g.fill();g.strokeStyle='#fff';g.lineWidth=1;g.stroke();g.beginPath();g.moveTo(0,-13);g.lineTo(5,7);g.lineTo(-5,7);g.closePath();g.fillStyle='#1b535d';g.fill();g.restore();}
      }
    };
    function burst(x,y,color,n){for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),v=rand(30,170);particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rand(.25,.7),color});}}
    return game;
  }
  function snakeGame(api) {
    const {ctx:g}=api;let body,dir,next,food,acc,turnQueued;
    function newFood(){const cells=[];for(let y=0;y<20;y++)for(let x=0;x<20;x++)if(!body.some(p=>p.x===x&&p.y===y))cells.push({x,y});food=cells[Math.floor(Math.random()*cells.length)];if(!food)api.finish(true);}
    return {
      reset(){body=[{x:8,y:10},{x:7,y:10},{x:6,y:10}];dir={x:1,y:0};next={...dir};acc=0;turnQueued=false;newFood();},
      key(key){const dirs={arrowup:{x:0,y:-1},w:{x:0,y:-1},arrowdown:{x:0,y:1},s:{x:0,y:1},arrowleft:{x:-1,y:0},a:{x:-1,y:0},arrowright:{x:1,y:0},d:{x:1,y:0}};const d=dirs[key];if(d&&!turnQueued&&!(d.x===-dir.x&&d.y===-dir.y)){next=d;turnQueued=true;}},
      update(dt){acc+=dt;const speed=Math.max(.065,.15-api.getScore()*.0006);if(acc<speed)return;acc-=speed;dir=next;turnQueued=false;const step=C.snakeStep(body,dir,food,20);if(step.hit){api.finish();return;}body=step.body;if(step.ate){api.addScore(10);newFood();}},
      draw(){g.fillStyle='#081a1d';g.fillRect(0,0,800,500);const cell=22,ox=180,oy=30;g.strokeStyle='#a1f0d10c';g.lineWidth=1;for(let n=0;n<=20;n++){g.beginPath();g.moveTo(ox+n*cell,oy);g.lineTo(ox+n*cell,oy+440);g.stroke();g.beginPath();g.moveTo(ox,oy+n*cell);g.lineTo(ox+440,oy+n*cell);g.stroke();}g.strokeStyle='#a1f0d136';g.strokeRect(ox,oy,440,440);
        if(food){g.fillStyle='#ffc49f';g.shadowColor='#ffc49f';g.shadowBlur=13;g.beginPath();g.arc(ox+food.x*cell+11,oy+food.y*cell+11,6,0,Math.PI*2);g.fill();g.shadowBlur=0;}
        body.forEach((p,i)=>{g.fillStyle=i===0?'#d2ffed':'#77c9af';g.globalAlpha=Math.max(.4,1-i*.012);g.beginPath();g.roundRect(ox+p.x*cell+2,oy+p.y*cell+2,18,18,4);g.fill();});g.globalAlpha=1;
        const h=body[0];g.fillStyle='#123732';g.fillRect(ox+h.x*cell+8+dir.x*4,oy+h.y*cell+7+dir.y*4,3,3);g.fillRect(ox+h.x*cell+12+dir.x*4,oy+h.y*cell+12+dir.y*4,3,3);
      }
    };
  }
  function memory(root,services) {
    root.innerHTML=`<div class="game-shell"><div class="game-hud"><span>SIGNAL MATCH</span><div class="hud-stat"><span>Moves <b class="moves">0</b></span><span>Pairs <b class="pairs">0 / 6</b></span></div></div><div class="memory-container"><div class="memory-stage" aria-label="Memory cards"></div><div class="game-overlay"><span class="game-symbol">✧</span><h2>Signal Match</h2><p>12 cards. 6 pairs. Follow the signals and find their match.</p><button class="primary start-game">Let’s play →</button></div></div><div class="game-help"><span class="memory-best">Your next personal best is waiting.</span><button class="quiet-btn new-memory">New game</button></div></div>`;
    const grid=root.querySelector('.memory-stage'),overlay=root.querySelector('.game-overlay');let visible=false,destroyed=false,cards=[],open=[],pairs=0,moves=0,locked=false,timer=0;
    const symbols=['✦','☾','⚡','◈','✿','☀'];
    let best=Number(services.read('memory.best',0))||0;
    const bestText=()=>{root.querySelector('.memory-best').textContent=best?'Best: '+best+' moves · Take your time.':'Your next personal best is waiting.';};bestText();
    function draw(card){card.button.textContent=card.revealed||card.matched?card.symbol:'✧';card.button.classList.toggle('revealed',card.revealed);card.button.classList.toggle('matched',card.matched);card.button.disabled=card.matched;card.button.setAttribute('aria-label',card.matched?'Matched '+card.symbol:card.revealed?card.symbol:'Face-down card '+(cards.indexOf(card)+1));}
    function reset(){clearTimeout(timer);open=[];pairs=0;moves=0;locked=false;root.querySelector('.moves').textContent='0';root.querySelector('.pairs').textContent='0 / 6';overlay.hidden=true;grid.replaceChildren();const deck=symbols.concat(symbols);for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}cards=deck.map(symbol=>({symbol,revealed:false,matched:false,button:document.createElement('button')}));cards.forEach(card=>{card.button.className='memory-card';draw(card);card.button.addEventListener('click',()=>choose(card));grid.append(card.button);});}
    function choose(card){if(!visible||destroyed||locked||card.matched||card.revealed)return;card.revealed=true;open.push(card);draw(card);if(open.length!==2)return;moves++;root.querySelector('.moves').textContent=moves;
      if(open[0].symbol===open[1].symbol){open.forEach(c=>{c.matched=true;draw(c);});open=[];pairs++;root.querySelector('.pairs').textContent=pairs+' / 6';if(pairs===6){best=best?Math.min(best,moves):moves;services.save('memory.best',best);bestText();overlay.querySelector('h2').textContent='Perfect signal.';overlay.querySelector('p').textContent='All 6 pairs in '+moves+' moves. Personal best: '+best+'.';overlay.querySelector('button').textContent='Play again →';overlay.hidden=false;}}
      else {locked=true;timer=setTimeout(()=>{if(destroyed)return;open.forEach(c=>{c.revealed=false;draw(c);});open=[];locked=false;},850);}
    }
    root.querySelector('.start-game').addEventListener('click',reset);root.querySelector('.new-memory').addEventListener('click',reset);
    return {setVisible(v){visible=v;},destroy(){destroyed=true;clearTimeout(timer);}};
  }
  return {mount};
})();
