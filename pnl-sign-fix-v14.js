// PnL sign fix v14: result decides the sign, so mobile keyboards do not need a minus key.
(function(){
  function numberFromInput(value){
    const n=Number(String(value??'').trim().replace(',','.'));
    return Number.isFinite(n)?n:0;
  }
  function applyResultSign(){
    const result=document.querySelector('#result');
    const pnl=document.querySelector('#pnl');
    if(!result||!pnl)return;
    let value=numberFromInput(pnl.value);
    if(result.value==='Loss') value=-Math.abs(value);
    else if(result.value==='Win') value=Math.abs(value);
    else if(result.value==='Break-even') value=0;
    pnl.value=String(value).replace('.',',');
  }
  // Run before app.js' form handler reads the PnL value.
  document.addEventListener('submit',function(e){
    if(e.target&&e.target.id==='f') applyResultSign();
  },true);
  // Also make the field immediately reflect the selected result.
  document.addEventListener('change',function(e){
    if(e.target&&e.target.id==='result') applyResultSign();
  },true);
})();
