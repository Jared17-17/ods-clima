document.addEventListener('DOMContentLoaded',()=>{
  const wrap=document.getElementById('ajustes-wrapper');
  const btn=document.getElementById('ajustesBtn');
  const panel=document.getElementById('aj-panel');
  const root=document.documentElement;
  let base=100;
  btn.onclick=()=>{panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',!panel.hidden)};
  panel.onclick=e=>{
    if(e.target.tagName!=='BUTTON')return;
    switch(e.target.dataset.action){
      case'dark':document.body.classList.toggle('dark-mode');break;
      case'dalton':document.body.classList.toggle('daltonico');break;
      case'inc':base=Math.min(base+10,140);root.style.fontSize=base+'%';break;
      case'dec':base=Math.max(base-10,80);root.style.fontSize=base+'%';break;
      case'reset':document.body.classList.remove('dark-mode','daltonico');base=100;root.style.fontSize='';break;
    }
  };
  document.addEventListener('click',e=>{if(!wrap.contains(e.target)&&!panel.hidden){panel.hidden=true;btn.setAttribute('aria-expanded','false')}})
});