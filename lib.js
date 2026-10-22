import {firebaseConfig as cfg} from './firebase-config.js';
import {site} from './site-config.js';
export {site};
export const G='https://www.gstatic.com/firebasejs/10.12.2/';
export const $=(s,r=document)=>r.querySelector(s);
export const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
export const fmt=d=>d?new Date(d+'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):'';
export const fmtM=m=>m?new Date(m+'-15T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'short'}):'';
export const configured=!cfg.apiKey.startsWith('PASTE');
export const safe=u=>/^https?:\/\//i.test(u)||/^[\w][\w.\-\/]*$/.test(u);
export const embed=u=>{const m=u.match(/^(https:\/\/(?:drive|docs)\.google\.com\/(?:file|document|spreadsheets|presentation)\/d\/[^/?#]+)/);return m?m[1]+'/preview':u};
export const paras=(t,box)=>(t||'').split(/\n+/).filter(Boolean).forEach(s=>box.append(el('p','',s)));

let fb;
export async function fire(){
  if(!configured)return null;
  if(!fb){const [A,F]=await Promise.all([import(G+'firebase-app.js'),import(G+'firebase-firestore.js')]);const app=A.initializeApp(cfg);fb={app,F,db:F.getFirestore(app)}}
  return fb}
export async function list(name,field,dir='asc'){
  const f=await fire();if(!f)return[];
  const s=await f.F.getDocs(f.F.query(f.F.collection(f.db,name),f.F.orderBy(field,dir)));
  return s.docs.map(d=>({id:d.id,...d.data()}))}
// calls cb(true/false) whenever the owner signs in or out (used to show star buttons)
export async function onAuth(cb){const f=await fire();if(!f)return;const U=await import(G+'firebase-auth.js');U.onAuthStateChanged(U.getAuth(f.app),u=>cb(!!u))}

// ---- paper-cutout symbols (biology and engineering)
const D='stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke"';
const SPRITE=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<filter id="paperTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" result="n"/><feColorMatrix in="n" values="0 0 0 0 .4 0 0 0 0 .25 0 0 0 0 .1 0 0 0 .9 -.25" result="g"/><feComposite in="g" in2="SourceAlpha" operator="in" result="gi"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gi"/></feMerge></filter>
<symbol id="s-leaf" viewBox="0 0 100 100"><path d="M16 80C8 42 38 12 88 14 90 60 62 90 20 82Z" fill="#fff" ${D}/><path d="M20 80C40 58 58 40 80 20" fill="none" stroke="#F26A1B" stroke-width="4" stroke-linecap="round"/><path d="M16 82L6 94" stroke="#C94F0B" stroke-width="5" stroke-linecap="round"/></symbol>
<symbol id="s-dna" viewBox="0 0 100 100"><g fill="none" stroke-linecap="round"><path d="M30 6C84 26 84 42 50 50S16 74 70 94" stroke="#fff" stroke-width="16"/><path d="M70 6C16 26 16 42 50 50S84 74 30 94" stroke="#fff" stroke-width="16"/><path d="M30 6C84 26 84 42 50 50S16 74 70 94" stroke="#C94F0B" stroke-width="9"/><path d="M70 6C16 26 16 42 50 50S84 74 30 94" stroke="#FFC629" stroke-width="9"/><path d="M40 19H60M36 33H64M36 67H64M40 81H60" stroke="#fff" stroke-width="4"/></g></symbol>
<symbol id="s-paw" viewBox="0 0 100 100"><g fill="#fff" ${D}><ellipse cx="50" cy="66" rx="24" ry="19"/><ellipse cx="20" cy="46" rx="8" ry="12" transform="rotate(-25 20 46)" fill="#FFC629"/><ellipse cx="38" cy="26" rx="9" ry="13" fill="#FFC629"/><ellipse cx="62" cy="26" rx="9" ry="13" fill="#FFC629"/><ellipse cx="80" cy="46" rx="8" ry="12" transform="rotate(25 80 46)" fill="#FFC629"/></g></symbol>
<symbol id="s-flask" viewBox="0 0 100 100"><path d="M38 8H62V14H58V38L87 82Q93 94 80 94H20Q7 94 13 82L42 38V14H38Z" fill="#fff" ${D}/><path d="M26 66H74L85 84Q88 90 80 90H20Q12 90 15 84Z" fill="#FFC629"/><circle cx="44" cy="60" r="4" fill="#fff"/><circle cx="58" cy="52" r="3" fill="#fff"/></symbol>
<symbol id="s-cell" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="43" ry="36" fill="#FFE08A" ${D}/><circle cx="48" cy="48" r="17" fill="#C94F0B"/><circle cx="44" cy="44" r="6" fill="#7A3E12"/><ellipse cx="24" cy="62" rx="7" ry="4" fill="#FFC629"/><ellipse cx="76" cy="38" rx="7" ry="4" fill="#FFC629"/><ellipse cx="70" cy="68" rx="6" ry="3.5" fill="#FFC629"/></symbol>
<symbol id="s-sprout" viewBox="0 0 100 100"><path d="M50 94V46" stroke="#C94F0B" stroke-width="6" stroke-linecap="round"/><path d="M50 52C26 52 12 38 12 18 36 18 50 32 50 52Z" fill="#fff" ${D}/><path d="M50 60C72 60 88 48 88 28 64 28 50 42 50 60Z" fill="#FFC629" ${D}/></symbol>
<symbol id="s-gear" viewBox="0 0 100 100"><path d="M43.1 14.7L44.4 4.3L55.6 4.3L56.9 14.7L70.1 20.2L78.3 13.8L86.2 21.7L79.8 29.9L85.3 43.1L95.7 44.4L95.7 55.6L85.3 56.9L79.8 70.1L86.2 78.3L78.3 86.2L70.1 79.8L56.9 85.3L55.6 95.7L44.4 95.7L43.1 85.3L29.9 79.8L21.7 86.2L13.8 78.3L20.2 70.1L14.7 56.9L4.3 55.6L4.3 44.4L14.7 43.1L20.2 29.9L13.8 21.7L21.7 13.8L29.9 20.2Z" fill="#fff" ${D}/><circle cx="50" cy="50" r="22" fill="#FFC629"/><circle cx="50" cy="50" r="9" fill="#F26A1B"/></symbol>
<symbol id="s-nut" viewBox="0 0 100 100"><path d="M50 6L88 28V72L50 94L12 72V28Z" fill="#FFC629" ${D}/><circle cx="50" cy="50" r="22" fill="#F26A1B" stroke="#fff" stroke-width="6"/></symbol>
<symbol id="s-cube" viewBox="0 0 100 100"><path d="M50 8L90 30L50 52L10 30Z" fill="#fff" ${D}/><path d="M10 30L50 52V94L10 72Z" fill="#FFC629" ${D}/><path d="M50 52L90 30V72L50 94Z" fill="#E5A600" ${D}/></symbol>
<symbol id="s-ruler" viewBox="0 0 100 100"><g transform="rotate(-35 50 50)"><rect x="4" y="34" width="92" height="32" rx="4" fill="#fff" ${D}/><path d="M14 34V48M26 34V44M38 34V48M50 34V44M62 34V48M74 34V44M86 34V48" stroke="#C94F0B" stroke-width="3"/></g></symbol>
<symbol id="s-pencil" viewBox="0 0 100 100"><g transform="rotate(40 50 50)"><path d="M8 40H70L94 50L70 60H8Z" fill="#FFC629" ${D}/><path d="M70 40L94 50L70 60Z" fill="#FFE08A"/><path d="M85 46L94 50L85 54Z" fill="#3B2514"/><rect x="8" y="40" width="12" height="20" fill="#C94F0B"/></g></symbol>
</defs></svg>`;
export function sprite(){if(!$('#sprite')){const d=document.createElement('div');d.id='sprite';d.innerHTML=SPRITE;document.body.prepend(d)}}
export function deco(n,pos,w=80,r=0,hm=false){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');
  s.setAttribute('viewBox','0 0 100 100');s.setAttribute('aria-hidden','true');s.setAttribute('class','deco'+(hm?' hm':''));s.innerHTML=`<use href="#s-${n}"/>`;
  Object.assign(s.style,pos,{width:w+'px',transform:`rotate(${r}deg)`});return s}
export const decorate=(host,items)=>items.forEach(i=>host.append(deco(...i)));

export function chrome(active){
  sprite();
  const n=document.createElement('nav');n.className='band';const w=el('div','w'),b=el('a','brand',site.name);b.href='index.html';
  const l=el('span','links');[['index.html','Home'],['biology.html','Biology'],['engineering.html','Engineering'],['index.html#posts','Posts']].forEach(([h,t])=>{const a=el('a','',t);a.href=h;if(t===active)a.setAttribute('aria-current','page');l.append(a)});
  w.append(b,l);if(site.email){const m=el('a','mail','Email me');m.href='mailto:'+site.email;w.append(m)}n.append(w);document.body.prepend(n);
  const f=el('footer','foot'),fw=el('div','w');fw.append(el('span','',site.name+'   '));
  [[site.linkedin,'LinkedIn'],[site.email&&'mailto:'+site.email,'Email'],[site.resume,'Resume'],['admin.html','Owner login']].forEach(([h,t])=>{if(h){const a=el('a','',t);a.href=h;if(/^https/.test(h)){a.target='_blank';a.rel='noopener'}fw.append(a)}});
  f.append(fw);document.body.append(f)}

// ---- photo carousel: previous/next, thumbnails, swipe, arrow keys
export function carousel(items,start=0){
  const root=el('div','car');root.tabIndex=0;let i=0;
  const stage=el('div','stage'),img=el('img'),pv=el('button','cn l','\u2039'),nx=el('button','cn r','\u203A'),cap=el('p','cap'),info=el('p','cinfo'),th=el('div','thumbs');
  pv.type=nx.type='button';pv.setAttribute('aria-label','Previous photo');nx.setAttribute('aria-label','Next photo');stage.append(pv,img,nx);root.append(stage,cap,info,th);
  const many=items.length>1;if(!many)pv.hidden=nx.hidden=th.hidden=true;
  const ths=items.map((it,k)=>{const b=el('button','th'),x=el('img');b.type='button';b.setAttribute('aria-label','Photo '+(k+1));x.src=it.src;x.alt='';b.append(x);if(it.star&&it.starLabel)b.append(el('span','st','\u2605'));b.onclick=()=>go(k);th.append(b);return b});
  function go(n){i=(n+items.length)%items.length;const it=items[i];img.src=it.src;img.alt=it.alt||'';cap.textContent=it.cap||'';info.innerHTML='';
    info.append((many?(i+1)+' of '+items.length:'')+(it.star&&it.starLabel?(many?'  |  ':'')+'\u2605 '+it.starLabel:''));
    if(it.link){const a=el('a','',it.link.text);a.href=it.link.href;info.append(' ',a)}
    ths.forEach((b,k)=>b.setAttribute('aria-current',k===i));if(many)ths[i].scrollIntoView({block:'nearest',inline:'center'})}
  pv.onclick=()=>go(i-1);nx.onclick=()=>go(i+1);root.step=d=>go(i+d);
  let x0=null;stage.ontouchstart=e=>x0=e.touches[0].clientX;stage.ontouchend=e=>{if(x0!=null&&many){const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(i+(d<0?1:-1))}x0=null};
  go(start);return root}
export function lightbox(){
  const d=document.createElement('dialog');d.className='wide';d.innerHTML='<button class="btn x" type="button">Close</button><div class="host" style="clear:both"></div>';document.body.append(d);let c;
  d.querySelector('.x').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()};
  d.addEventListener('keydown',e=>{if(c&&e.key==='ArrowLeft')c.step(-1);if(c&&e.key==='ArrowRight')c.step(1)});
  return(items,start=0)=>{const h=d.querySelector('.host');h.innerHTML='';c=carousel(items,start);h.append(c);d.showModal()}}
export function animalBox(){
  const d=document.createElement('dialog');d.className='wide animal';d.innerHTML='<button class="btn x" type="button">Close</button><h2></h2><p class="meta"></p><div class="host"></div><h3>About me</h3><div class="about"></div>';document.body.append(d);let c;
  d.querySelector('.x').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()};
  d.addEventListener('keydown',e=>{if(c&&e.key==='ArrowLeft')c.step(-1);if(c&&e.key==='ArrowRight')c.step(1)});
  return a=>{d.querySelector('h2').textContent=a.name;
    d.querySelector('.meta').textContent=[a.kind,a.start?fmtM(a.start)+' to '+(a.end?fmtM(a.end):'Present'):'',a.outcome].filter(Boolean).join('  |  ');
    const h=d.querySelector('.host');h.innerHTML='';const ph=a.photos||[];
    if(ph.length){const s=Math.max(0,ph.findIndex(p=>p.star));c=carousel(ph.map(p=>({src:p.s,alt:p.c||a.name,cap:p.c||'',star:p.star,starLabel:'Primary photo'})),s);h.append(c)}else c=null;
    const ab=d.querySelector('.about');ab.innerHTML='';paras(a.about,ab);d.showModal()}}
export function viewer(){
  const d=document.createElement('dialog');d.className='wide';
  d.innerHTML='<div class="vh"><b></b><span><a target="_blank" rel="noopener">Open in a new tab</a> <button class="btn x" type="button">Close</button></span></div><iframe title="Document preview"></iframe>';document.body.append(d);
  d.querySelector('.x').onclick=()=>d.close();d.addEventListener('close',()=>{d.querySelector('iframe').src='about:blank'});
  return(url,title,open)=>{d.querySelector('b').textContent=title;d.querySelector('a').href=open||url;d.querySelector('iframe').src=url;d.showModal()}}
