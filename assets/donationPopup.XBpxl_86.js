import{c as u,e as n,h as a,o as e,S as d}from"./index.CJZ7dzK1.js";const r="4B5RKGR4C5WDkHGKVemU4rDcnKDG5NbwBLogE1tnxAWJAqbLPpNiDNaVZC1jrfwSdB7Sh1ALQNe3TMMvhdEJTPRcAUJhyVm";let o=null;function f(){return`
    <div class="donation-overlay" id="donation-overlay">
      <div class="donation-popup">
        <button class="donation-close" id="donation-close" title="Remind me later">
          <i class="fas fa-times"></i>
        </button>
        <div class="donation-heart">
          <i class="fas fa-heart"></i>
        </div>
        <div class="donation-title">Support YukiOS</div>
        <div class="donation-message">
          YukiOS is built and maintained by one person in their free time. It is 100% free with no locked features and no paid tiers, so this donation is purely optional.
          <br><br>
          Your support keeps development active and helps fund new features.
          <br><br>
          You can donate via Patreon or Monero. It takes less than a minute.
        </div>
        <div class="donation-buttons">
          <a href="https://www.patreon.com/Reeyuki" target="_blank" class="donation-btn donation-btn-patreon"><i class="fab fa-patreon"></i> Patreon</a>
          <button class="donation-btn donation-btn-monero" id="donation-show-monero">
            <i class="fab fa-monero"></i> Monero
          </button>
        </div>
        <div class="donation-monero-section" id="donation-monero-section" style="display:none;">
          <span class="donation-monero-address" id="donation-monero-address">${r}</span>
          <button class="donation-copy-btn" id="donation-copy-btn">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
        <div class="donation-footer">
          <button class="donation-footer-btn donation-footer-btn--danger" id="donation-never">
            <i class="fas fa-ban"></i> Never
          </button>
        </div>
      </div>
    </div>
  `}function c(){if(o)return;const t=u("div");t.innerHTML=f(),o=t.firstElementChild,(n("#session-overlay")||document.body).appendChild(o),requestAnimationFrame(()=>{o.classList.add("donation-overlay--show")}),a(n("#donation-close",o),"click",s),a(n("#donation-never",o),"click",b),a(n("#donation-show-monero",o),"click",()=>{const i=n("#donation-monero-section",o),p=n("#donation-show-monero",o);i.style.display==="none"&&(i.style.display="flex",p.style.display="none")}),a(n("#donation-copy-btn",o),"click",m),a(o,"click",i=>{i.target===o&&s()})}function l(t){o&&(o.classList.remove("donation-overlay--show"),o.classList.add("donation-overlay--hide"),setTimeout(()=>{o&&o.parentNode&&o.parentNode.removeChild(o),o=null},300))}function s(){e.storage.set(d.donationLastShown,Date.now().toString()),l()}function b(){e.storage.set(d.donationDismissed,"true"),l()}async function m(){try{await navigator.clipboard.writeText(r);const t=n("#donation-copy-btn",o);t&&(t.innerHTML='<i class="fas fa-check"></i> Copied!',setTimeout(()=>{t.innerHTML='<i class="fas fa-copy"></i> Copy'},2e3))}catch{e.dialog.alert("Copy Failed","Could not copy to clipboard. Select the address manually.")}}window.showDonationPopup=c;function h(){c()}export{h as showDonationPopup};
