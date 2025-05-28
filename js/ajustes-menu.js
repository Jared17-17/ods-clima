document.addEventListener('DOMContentLoaded',()=>{
  const btn   = document.getElementById('ajustesBtn');
  const menu  = document.getElementById('ajustes-menu');
  const root  = document.documentElement;
  let base=100;

  btn.onclick = () =>{
    const open = menu.hidden;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded',open);
    menu.classList.toggle('open',open);
  };

  menu.addEventListener('click',e=>{
    if(e.target.tagName!=='BUTTON')return;
    switch(e.target.dataset.ac){
      case'fontUp'      : base=Math.min(base+10,140);root.style.fontSize=base+'%';break;
      case'fontDown'    : base=Math.max(base-10,80);root.style.fontSize=base+'%';break;
      case'fontFamily'  : document.body.classList.toggle('alt-font');break;
      case'darkMode'    : document.body.classList.toggle('modo-oscuro');break;
      case'highContrast': document.body.classList.toggle('alto-contraste');break;
      case'daltonico'   : document.body.classList.toggle('daltonico');break;
      case'toggleCursor': document.body.classList.toggle('cursor-grande');break;
      case'removeImages': document.body.classList.toggle('sin-imagenes');break;
      case'toggleLinks' : document.body.classList.toggle('links-off');break;
      case'reset':
        document.body.classList.remove('modo-oscuro','alto-contraste','daltonico','alt-font','cursor-grande','sin-imagenes','links-off');
        base=100;root.style.fontSize='';
      break;
    }
  });

  document.addEventListener('click',e=>{
    if(!btn.contains(e.target)&&!menu.contains(e.target)&&!menu.hidden){
      menu.hidden=true;menu.classList.remove('open');btn.setAttribute('aria-expanded','false');
    }
  });
});
