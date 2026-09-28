// v17 — statistics-only currency wrapping fix.
// Forces the amount and € symbol to stay on one line and shrinks only when needed.
(function(){
  function fitOne(el){
    if(!el)return;
    el.textContent=el.textContent.replace(/\s+€/g,'\u00A0€');
    el.style.setProperty('white-space','nowrap','important');
    el.style.setProperty('overflow','visible','important');
    el.style.setProperty('text-overflow','clip','important');

    const wrap=el.parentElement;
    if(!wrap)return;
    wrap.style.setProperty('min-width','0','important');

    // Reset to CSS size, then reduce only enough to fit the available text column.
    el.style.removeProperty('font-size');
    let size=parseFloat(getComputedStyle(el).fontSize)||16;
    const min=10.5;
    let guard=0;
    while(el.scrollWidth>wrap.clientWidth && size>min && guard<30){
      size-=0.35;
      el.style.setProperty('font-size',size+'px','important');
      guard++;
    }
  }

  function fixStatsCurrency(){
    document.querySelectorAll('.statsGrid .sm strong, .monthList .monthItem strong, .statsTop .metric strong')
      .forEach(fitOne);
  }

  const v=document.getElementById('v');
  if(v){
    new MutationObserver(function(){requestAnimationFrame(fixStatsCurrency)}).observe(v,{childList:true,subtree:true});
  }
  window.addEventListener('resize',function(){requestAnimationFrame(fixStatsCurrency)});
  requestAnimationFrame(fixStatsCurrency);
})();
