import {$,el,fmt,fmtM,site,list,configured,chrome,lightbox,viewer,safe,embed,paras} from './lib.js';
const T=document.body.dataset.track,S=site[T],open=lightbox(),view=viewer();
chrome(T==='biology'?'Biology':'Engineering');
$('#ttl').textContent=S.title;$('#blurb').textContent=S.blurb;
if(!configured){$('#note').textContent='Content will appear here once the database is connected.';$('#note').hidden=false}
const names={models:'3D models',courses:'Courses',gallery:'Gallery',jobs:'Jobs'};
const order=T==='engineering'?['models','courses','gallery','jobs']:['courses','gallery','jobs'];
const pn=$('#panel'),tb=$('#tabs'),cache={};
const empty=t=>pn.append(el('p','empty',t));
const load=async k=>{try{
  if(k==='courses')return(await list('courses','code','asc')).filter(x=>x.track===T);
  if(k==='gallery')return(await list('posts','date','desc')).filter(x=>x.track===T);
  if(k==='jobs')return(await list('jobs','start','desc')).filter(x=>x.track===T);
  return await list('models','date','desc')}catch(e){return null}};

const R={
 courses(d){if(!d.length)return empty('No courses have been added yet.');
  let dep='',q='';const depts=[...new Set(d.map(c=>c.code.split(/\s+/)[0]))],chips=el('div','chips'),bar=el('div','bar'),s=el('input'),n=el('small'),out=el('div');
  s.type='search';s.placeholder='Search by course ID or title';s.setAttribute('aria-label','Search courses');bar.append(s,n);
  const draw=()=>{out.innerHTML='';const l=d.filter(c=>(!dep||c.code.split(/\s+/)[0]===dep)&&(c.code+' '+c.title+' '+(c.notes||'')).toLowerCase().includes(q));
   n.textContent=l.length+(l.length===1?' course':' courses');
   l.forEach(c=>{const r=el('div','course'),b=el('div');r.append(el('div','cid',c.code));b.append(el('h3','',c.title));if(c.term)b.append(el('small','',c.term));if(c.notes)b.append(el('p','',c.notes));r.append(b);out.append(r)})};
  ['',...depts].forEach(x=>{const b=el('button','chip',x||'All');b.type='button';b.setAttribute('aria-pressed',x===dep);b.onclick=()=>{dep=x;chips.querySelectorAll('button').forEach(y=>y.setAttribute('aria-pressed',y===b));draw()};chips.append(b)});
  s.oninput=()=>{q=s.value.toLowerCase();draw()};pn.append(bar,chips,out);draw()},
 gallery(d){const t=[];d.forEach(p=>(p.photos||[]).forEach(ph=>t.push({p,ph})));
  if(!t.length)return empty('No photos yet. Photos from my posts will appear here.');
  const g=el('div','gal');t.forEach(({p,ph})=>{const b=el('button','tile'),i=el('img'),cap=ph.c||p.title;i.src=ph.s;i.alt=cap;i.loading='lazy';
   b.append(i,el('span','',(ph.c?ph.c+'. ':'')+fmt(p.date)));b.onclick=()=>open(ph.s,cap,cap+' ('+fmt(p.date)+')',{text:'From the post: '+p.title,href:'index.html#posts'});g.append(b)});pn.append(g)},
 jobs(d){if(!d.length)return empty('No jobs have been added yet.');
  d.forEach(j=>{const c=el('article','job');c.append(el('h3','',j.title),el('small','',j.employer+(j.start?'  |  '+fmtM(j.start)+' to '+(j.end?fmtM(j.end):'Present'):'')));
   const l=(j.desc||'').split(/\n+/).filter(Boolean);if(l.length){const u=el('ul');l.forEach(x=>u.append(el('li','',x)));c.append(u)}pn.append(c)})},
 models(d){if(!d.length)return empty('No models have been added yet.');
  const g=el('div','models');d.forEach(m=>{const c=el('article','model');
   if(m.images?.length){const mi=el('div','mimgs');m.images.forEach(im=>{const b=el('button'),x=el('img');b.type='button';x.src=im.s;x.alt=im.c||m.title;x.loading='lazy';b.append(x);b.onclick=()=>open(im.s,x.alt,im.c||m.title);mi.append(b)});c.append(mi)}
   const b=el('div','mb');b.append(el('h3','',m.title),el('small','',fmt(m.date)));paras(m.desc,b);
   const a=el('div','acts');
   if(m.file&&safe(m.file)){const l=el('a','btn','Download model');l.href=m.file;l.target='_blank';l.rel='noopener';if(m.fileName)l.title=m.fileName;a.append(l)}
   if(m.drawing&&safe(m.drawing)){const v=el('button','btn ghost','View drawing (PDF)');v.type='button';v.onclick=()=>view(embed(m.drawing),m.title+' drawing',m.drawing);a.append(v)}
   b.append(a);c.append(b);g.append(c)});pn.append(g)}
};
async function show(k){
  history.replaceState(null,'','#'+k);tb.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k));
  pn.innerHTML='';pn.append(el('p','empty','Loading...'));
  const d=await(cache[k]??=load(k));pn.innerHTML='';
  if(d===null){pn.append(el('p','note','This section could not be loaded right now.'));cache[k]=null;return}
  R[k](d)}
order.forEach(k=>{const b=el('button','',names[k]);b.type='button';b.role='tab';b.dataset.k=k;b.onclick=()=>show(k);tb.append(b)});
show(order.includes(location.hash.slice(1))?location.hash.slice(1):order[0]);
