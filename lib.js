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
// Google Drive/Docs links become embeddable previews
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

export function chrome(active){
  const L=[['index.html','Home'],['biology.html','Biology'],['engineering.html','Engineering'],['index.html#posts','Posts']];
  const n=document.createElement('nav');
  n.innerHTML='<div class="w"><a class="brand" href="index.html"></a>'+L.map(([h,t])=>`<a href="${h}"${t===active?' aria-current="page"':''}>${t}</a>`).join('')+'</div>';
  n.querySelector('.brand').textContent=site.name;document.body.prepend(n);
  const f=document.createElement('footer'),w=el('div','w');
  w.append(el('span','',site.name+'  '));
  [[site.linkedin,'LinkedIn'],[site.email&&'mailto:'+site.email,'Email'],[site.resume,'Resume'],['admin.html','Owner login']].forEach(([h,t])=>{if(h){const a=el('a','',t);a.href=h;if(/^https/.test(h)){a.target='_blank';a.rel='noopener'}w.append(a)}});
  f.append(w);document.body.append(f)}

export function lightbox(){
  const d=document.createElement('dialog');d.innerHTML='<button class="btn x" type="button">Close</button><img alt=""><p class="cap"></p><p class="cl"></p>';document.body.append(d);
  d.querySelector('.x').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()};
  return (src,alt,cap,link)=>{const i=d.querySelector('img');i.src=src;i.alt=alt||'';d.querySelector('.cap').textContent=cap||'';
    const l=d.querySelector('.cl');l.innerHTML='';if(link){const a=el('a','',link.text);a.href=link.href;l.append(a)}d.showModal()}}

export function viewer(){
  const d=document.createElement('dialog');d.className='wide';
  d.innerHTML='<div class="vh"><b></b><span><a target="_blank" rel="noopener">Open in a new tab</a> <button class="btn x" type="button">Close</button></span></div><iframe title="Document preview"></iframe>';document.body.append(d);
  d.querySelector('.x').onclick=()=>d.close();d.addEventListener('close',()=>{d.querySelector('iframe').src='about:blank'});
  return (url,title,open)=>{d.querySelector('b').textContent=title;d.querySelector('a').href=open||url;d.querySelector('iframe').src=url;d.showModal()}}
