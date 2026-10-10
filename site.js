'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);menuButton.textContent=open?'Close':'Menu';});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('header'))closeMenu();});
window.matchMedia('(min-width:1001px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

const filterButtons=[...document.querySelectorAll('.filter')];
const publications=[...document.querySelectorAll('.publication')];
const count=document.querySelector('#publication-count');
function filterPublications(filter){
  let visible=0;
  for(const publication of publications){const matches=filter==='all'||(filter==='selected'?publication.dataset.selected==='true':publication.dataset.status===filter);publication.hidden=!matches;if(matches)visible++;}
  for(const button of filterButtons)button.setAttribute('aria-pressed',String(button.dataset.filter===filter));
  const labels={selected:'selected works',published:'published or accepted works',review:'manuscripts under review',preparation:'manuscripts in preparation',preprint:'other preprint',all:'works'};
  count.textContent=`${visible} ${labels[filter]}`;
}
filterButtons.forEach(button=>button.addEventListener('click',()=>filterPublications(button.dataset.filter)));
filterButtons.forEach(button=>{const filter=button.dataset.filter;const count=publications.filter(p=>filter==='all'||(filter==='selected'?p.dataset.selected==='true':p.dataset.status===filter)).length;button.querySelector('.filter-count').textContent=String(count);});
filterPublications('selected');

// Research links reveal the relevant publication before scrolling to it.
document.querySelectorAll('[data-publication]').forEach(link=>link.addEventListener('click',()=>{const target=document.querySelector(link.hash);filterPublications(target?.dataset.selected==='true'?'selected':'all');}));
const navSections=[...document.querySelectorAll('main > section[id], footer[id]')];
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>{if(a.hash===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-20% 0px -60% 0px',threshold:0});
 navSections.forEach(section=>observer.observe(section));
}
