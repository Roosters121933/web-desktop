import{p as f,q as m,l as o,u as $,$ as u,h as g,v as h,w}from"./index.CJZ7dzK1.js";function b(i,e,l={}){if(!e)return;const n=f(l.onAppClick);if(!i){e.innerHTML='<div class="live-stats-message">Could not load live stats.</div>';return}const c=new Map;for(const[s,t]of Object.entries(m))c.set(s.toLowerCase(),{id:s,...t});const d=s=>{const a=c.get(s.toLowerCase())?.icon||h(s);return a?typeof a=="string"&&a.startsWith("fa")?`<span class="live-stats-icon"><i class="${a}"></i></span>`:`<span class="live-stats-icon"><img src="${w(a)}" alt="" /></span>`:'<span class="live-stats-icon"><i class="fas fa-gamepad"></i></span>'},v=(i.top_active_apps||[]).slice(0,5),p=v.length?v.map(({app:s,count:t})=>`
      <div class="live-stats-item${n?" live-stats-item--clickable":""}"${n?` data-app="${o(s)}"`:""}>
        ${d(s)}
        <span class="live-stats-name">${o($(s))}</span>
        <span class="live-stats-count">${t}</span>
      </div>`).join(""):'<div class="live-stats-message">No trending data right now</div>',r=l.showStats!==!1?`
    <div class="live-stats-stats">
      <div class="live-stats-stat">
        <div class="live-stats-stat-value">${i.active_users_5min}</div>
        <div class="live-stats-stat-label">Active Users</div>
      </div>
      <div class="live-stats-stat">
        <div class="live-stats-stat-value">${i.active_sessions}</div>
        <div class="live-stats-stat-label">Active Sessions</div>
      </div>
    </div>`:"";e.innerHTML=`
    ${r}
    <div class="live-stats-heading">Trending Now</div>
    <div class="live-stats-list">
      ${p}
    </div>
  `,n&&u(".live-stats-item--clickable",e).forEach(s=>{g(s,"click",()=>{const t=s.dataset.app;t&&l.onAppClick(t)})})}export{b as renderLiveStats};
