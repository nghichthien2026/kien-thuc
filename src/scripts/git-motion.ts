const poster=document.querySelector<HTMLElement>('.git-poster')!;
const control=document.querySelector<HTMLButtonElement>('#git-motion')!;
const note=document.querySelector<HTMLElement>('#git-motion-note')!;
const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
let playing=!preference.matches;
let visible=true;
function sync(){
 poster.dataset.paused=String(!playing||document.hidden||!visible);
 control.textContent=playing?'Pause animation':'Play animation';
 control.setAttribute('aria-pressed',String(playing));
 note.textContent=playing?'Follow the paths between Git’s four areas':'Animation paused · all commands stay readable';
}
control.hidden=false;
control.addEventListener('click',()=>{playing=!playing;sync();});
preference.addEventListener('change',()=>{playing=!preference.matches;sync();});
document.addEventListener('visibilitychange',sync);
const visibility=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();});
visibility.observe(poster);sync();

export {};
