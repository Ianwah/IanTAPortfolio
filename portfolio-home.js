const header=document.querySelector("[data-header]");
const menu=document.querySelector("[data-menu]");
const nav=document.querySelector("[data-nav]");
const updateHeader=()=>header?.classList.toggle("scrolled",window.scrollY>10);
updateHeader();
window.addEventListener("scroll",updateHeader,{passive:true});
menu?.addEventListener("click",()=>{const open=nav?.classList.toggle("open")??false;menu.setAttribute("aria-expanded",String(open));});
nav?.addEventListener("click",event=>{if(!event.target.closest("a"))return;nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add("visible");observer.unobserve(entry.target);});},{threshold:.08,rootMargin:"0px 0px -25px"});
document.querySelectorAll(".reveal").forEach(item=>observer.observe(item));

const projectItems=[...document.querySelectorAll("[data-project-index]")];
const projectVisuals=[...document.querySelectorAll("[data-project-visual]")];
let activeProject=0;

const showProject=(index)=>{
  if(!projectItems.length||index===activeProject&&projectVisuals[index]?.classList.contains("is-active"))return;
  activeProject=index;
  projectItems.forEach((item,itemIndex)=>item.classList.toggle("is-active",itemIndex===index));
  projectVisuals.forEach((visual,visualIndex)=>{
    const active=visualIndex===index;
    visual.classList.toggle("is-active",active);
    visual.classList.remove("is-switching");
    if(active){
      void visual.offsetWidth;
      visual.classList.add("is-switching");
    }
  });
};

if(projectItems.length){
  projectItems.forEach((item,index)=>{
    item.addEventListener("mouseenter",()=>showProject(index));
    item.addEventListener("focus",()=>showProject(index));
  });
  const projectObserver=new IntersectionObserver((entries)=>{
    const candidate=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(candidate)showProject(Number(candidate.target.dataset.projectIndex));
  },{rootMargin:"-32% 0px -42% 0px",threshold:[0,.2,.45,.7]});
  projectItems.forEach(item=>projectObserver.observe(item));

  let projectTicking=false;
  const updateProjectFromScroll=()=>{
    projectTicking=false;
    const showcase=document.querySelector(".projects-showcase");
    const bounds=showcase?.getBoundingClientRect();
    if(!bounds||bounds.bottom<0||bounds.top>window.innerHeight)return;
    const viewportFocus=window.innerHeight*.48;
    const nearest=projectItems.map((item,index)=>{
      const rect=item.getBoundingClientRect();
      return{index,distance:Math.abs(rect.top+rect.height/2-viewportFocus)};
    }).sort((a,b)=>a.distance-b.distance)[0];
    if(nearest)showProject(nearest.index);
  };
  window.addEventListener("scroll",()=>{
    if(projectTicking)return;
    projectTicking=true;
    requestAnimationFrame(updateProjectFromScroll);
  },{passive:true});
  updateProjectFromScroll();
}
