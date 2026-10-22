import {$,el,fmt,fmtM,site,list,fire,configured,chrome,lightbox,animalBox,viewer,safe,embed,paras,decorate,onAuth} from './lib.js';
const T=document.body.dataset.track,S=site[T],open=lightbox(),view=viewer(),showAnimal=animalBox();
chrome(T==='biology'?'Biology':'Engineering');
$('#ttl').textContent=S.title;$('#blurb').textContent=S.blurb;
decorate($('#hero'),T==='biology'
 ?[['leaf',{top:'8%',left:'4%'},96,-16],['dna',{top:'50%',left:'2%'},78,10,1],['paw',{top:'6%',right:'5%'},86,14],['flask',{top:'48%',right:'3%'},84,-12,1],['sprout',{bottom:'3%',left:'17%'},68,8,1],['cell',{bottom:'4%',right:'16%'},78,-8,1]]
 :[['gear',{top:'6%',left:'4%'},106,-12],['nut',{top:'52%',left:'3%'},72,14,1],['cube',{top:'6%',right:'5%'},88,10],['ruler',{top:'48%',right:'2%'},100,-6,1],['pencil',{bottom:'3%',left:'17%'},84,-10,1],['gear',{bottom:'4%',right:'16%'},66,18,1]]);
if(!configured){$('#note').textContent='Content will appear here once the database is connected.';$('#note').hidden=false}
const names={models:'3D models',courses:'Courses',animals:'Fostered animals',gallery:'Gallery',jobs:'Jobs'};
const order=T==='engineering'?['models','courses','gallery','jobs']:['courses','animals','gallery','jobs'];
const pn=$('#panel'),tb=$('#tabs'),cache={};let cur='',admin=false,galData=null;
const empty=t=>{if(configured)pn.append(el('p','note',t))};
const load=async k=>{try{
  if(k==='courses')return(await list('courses','code','asc')).filter(x=>x.track===T);
  if(k==='gallery')return(await list('posts','date','desc')).filter(x=>x.track===T);
  if(k==='jobs')return(await list('jobs','start','desc')).filter(x=>x.track===T);
  if(k==='animals')return await list('animals','created','desc');
  return await list('models','date','desc')}catch(e){return null}};

async function toggle(x){const f=await fire(),photos=x.p.photos.map(y=>({...y}));photos[x.i].star=!photos[x.i].star;
  try{await f.F.updateDoc(f.F.doc(f.db,'posts',x.p.id),{photos,hasStar:photos.some(y=>y.star)});x.p.photos=photos;drawGallery()}
  catch(e){alert('Could not save the star. Make sure you are signed in on the Owner login page with an account that is allowed to publish.')}}
function drawGallery(){pn.innerHTML='';const t=[];galData.forEach(p=>(p.photos||[]).forEach((ph,i)=>t.push({p,ph,i})));
  if(!t.length)return empty('No photos yet. Photos from my posts will appear here.');
  if(admin)pn.append(el('p','note','You are signed in. Click the star on a photo to feature it on the home page, and click it again to remove it.'));
  const items=t.map(({p,ph})=>({src:ph.s,alt:ph.c||p.title,cap:(ph.c?ph.c+'  |  ':'')+fmt(p.date),link:{text:'From the post: '+p.title,href:'index.html#posts'}})),g=el('div','gal');
  t.forEach((x,k)=>{const w=el('div','tw'),b=el('button','tile'),i=el('img');i.src=x.ph.s;i.alt=items[k].alt;i.loading='lazy';b.type='button';
    b.append(i,el('span','',(x.ph.c?x.ph.c+'. ':'')+fmt(x.p.date)));b.onclick=()=>open(items,k);w.append(b);
    if(admin){const s=el('button','star'+(x.ph.star?' on':''),x.ph.star?'\u2605':'\u2606');s.type='button';s.setAttribute('aria-pressed',!!x.ph.star);s.setAttribute('aria-label',x.ph.star?'Remove from home page':'Feature on home page');s.onclick=()=>toggle(x);w.append(s)}
    g.append(w)});pn.append(g)}
onAuth(a=>{admin=a;if(cur==='gallery'&&galData)drawGallery()});

const R={
 courses(d){if(!d.length)return empty('No courses have been added yet.');
  let dep='',q='';const depts=[...new Set(d.map(c=>c.code.split(/\s+/)[0]))],box=el('div','sheet graph'),chips=el('div','chips'),bar=el('div','bar'),s=el('input'),n=el('small'),out=el('div');
  s.type='search';s.placeholder='Search by course ID or title';s.setAttribute('aria-label','Search courses');bar.append(s,n);
  const draw=()=>{out.innerHTML='';const l=d.filter(c=>(!dep||c.code.split(/\s+/)[0]===dep)&&(c.code+' '+c.title+' '+(c.notes||'')).toLowerCase().includes(q));
   n.textContent=l.length+(l.length===1?' course':' courses');
   l.forEach(c=>{const r=el('div','course'),b=el('div');r.append(el('div','cid',c.code));b.append(el('h3','',c.title));if(c.term)b.append(el('small','',c.term));if(c.notes)b.append(el('p','',c.notes));r.append(b);out.append(r)})};
  ['',...depts].forEach(x=>{const b=el('button','chip',x||'All');b.type='button';b.setAttribute('aria-pressed',x===dep);b.onclick=()=>{dep=x;chips.querySelectorAll('button').forEach(y=>y.setAttribute('aria-pressed',y===b));draw()};chips.append(b)});
  s.oninput=()=>{q=s.value.toLowerCase();draw()};box.append(bar,chips,out);pn.append(box);draw()},
 animals(d){if(!d.length)return empty('No fostered animals have been added yet.');
  const g=el('div','animals');d.forEach(a=>{const ph=a.photos||[],c=ph.find(p=>p.star)||ph[0],b=el('button','pol');b.type='button';
   if(c){const i=el('img');i.src=c.s;i.alt='Photo of '+a.name;i.loading='lazy';b.append(i)}
   else{const z=el('div','ph0');z.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#s-paw"/></svg>';b.append(z)}
   b.append(el('span','',a.name));if(a.kind)b.append(el('small','',a.kind));b.onclick=()=>showAnimal(a);g.append(b)});pn.append(g)},
 gallery(d){galData=d;drawGallery()},
 jobs(d){if(!d.length)return empty('No jobs have been added yet.');
  d.forEach(j=>{const c=el('article','paper job');c.append(el('h3','',j.title),el('small','',j.employer+(j.start?'  |  '+fmtM(j.start)+' to '+(j.end?fmtM(j.end):'Present'):'')));
   const l=(j.desc||'').split(/\n+/).filter(Boolean);if(l.length){const u=el('ul');l.forEach(x=>u.append(el('li','',x)));c.append(u)}pn.append(c)})},
 models(d){if(!d.length)return empty('No models have been added yet.');
  const g=el('div','models');d.forEach(m=>{const c=el('article','paper model taped');
   if(m.images?.length){const mi=el('div','mimgs'),items=m.images.map(im=>({src:im.s,alt:im.c||m.title,cap:im.c||m.title}));
    m.images.forEach((im,k)=>{const b=el('button'),x=el('img');b.type='button';x.src=im.s;x.alt=items[k].alt;x.loading='lazy';b.append(x);b.onclick=()=>open(items,k);mi.append(b)});c.append(mi)}
   const b=el('div','mb');b.append(el('h3','',m.title),el('small','',fmt(m.date)));paras(m.desc,b);
   const a=el('div','acts');
   if(m.file&&safe(m.file)){const l=el('a','btn','Download model');l.href=m.file;l.target='_blank';l.rel='noopener';if(m.fileName)l.title=m.fileName;a.append(l)}
   if(m.drawing&&safe(m.drawing)){const v=el('button','btn ghost','View drawing (PDF)');v.type='button';v.onclick=()=>view(embed(m.drawing),m.title+' drawing',m.drawing);a.append(v)}
   b.append(a);c.append(b);g.append(c)});pn.append(g)}
};
async function show(k){
  cur=k;history.replaceState(null,'','#'+k);tb.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k));
  pn.innerHTML='';pn.append(el('p','empty','Loading...'));
  const d=await(cache[k]??=load(k));if(cur!==k)return;pn.innerHTML='';
  if(d===null){pn.append(el('p','note','This section could not be loaded right now.'));cache[k]=null;return}
  R[k](d)}
order.forEach(k=>{const b=el('button','',names[k]);b.type='button';b.role='tab';b.dataset.k=k;b.onclick=()=>show(k);tb.append(b)});
show(order.includes(location.hash.slice(1))?location.hash.slice(1):order[0]);
