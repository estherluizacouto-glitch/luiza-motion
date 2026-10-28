/* ===================================================================
   A partir daqui não precisa mexer
   =================================================================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

// nome com entrada letra por letra
const sp=t=>[...t].map((c,i)=>`<span class="ch" style="--i:${i}">${c}</span>`).join('');
$('#name').innerHTML=`<span>${sp('Luiza')}</span> <span class="ser">${sp('Motion').replace(/--i:(\d)/g,(m,n)=>`--i:${+n+5}`)}</span>`;

// digitação
(function(){let i=0,j=0,del=false;const el=$('#typed');
 (function tick(){const w=ROLES[i];el.textContent=w.slice(0,j);
  if(!del&&j===w.length){del=true;return setTimeout(tick,1600)}
  if(del&&j===0){del=false;i=(i+1)%ROLES.length}
  j+=del?-1:1;setTimeout(tick,del?40:85)})()})();

// faixa em movimento
$('#mq').innerHTML=[...BAND,...BAND,...BAND,...BAND].map(w=>`<span>${w}</span><span>✦</span>`).join('');

// estrelas (canvas)
const cv=$('#stars'),cx=cv.getContext('2d');let W,H,S=[],mx=0,my=0,vis=true,sh=null,D=devicePixelRatio||1;
function rs(){D=devicePixelRatio||1;W=cv.width=cv.offsetWidth*D;H=cv.height=cv.offsetHeight*D;
 S=Array.from({length:Math.min(170,W/11)},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.4+.3)*D,z:Math.random()*.9+.1,p:Math.random()*6.28,c:Math.random()<.3}))}
addEventListener('resize',rs);rs();
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
function draw(t){cx.clearRect(0,0,W,H);
 for(const s of S){const a=.3+.7*Math.abs(Math.sin(t/1300*s.z+s.p)),x=(s.x-mx*50*s.z*D+W)%W,y=(s.y-my*50*s.z*D+H)%H;
  cx.globalAlpha=a;cx.fillStyle=s.c?'#35E0FF':'#d6ecff';cx.beginPath();cx.arc(x,y,s.r,0,6.283);cx.fill()}
 if(!RM){if(!sh&&Math.random()<.004)sh={x:Math.random()*W*.8,y:Math.random()*H*.4,l:0};
  if(sh){sh.l+=16*D;const px=sh.x+sh.l,py=sh.y+sh.l/2;cx.globalAlpha=Math.max(0,1-sh.l/(W*.5));cx.strokeStyle='#35E0FF';cx.lineWidth=1.6*D;cx.beginPath();cx.moveTo(px,py);cx.lineTo(px-110*D,py-55*D);cx.stroke();if(sh.l>W*.5)sh=null}}}
(function f(t){if(!RM)requestAnimationFrame(f);if(vis||RM)draw(t)})(0);

// brilho que segue o cursor
const cg=$('#cg');let gx=0,gy=0,tx=0,ty=0;
if(matchMedia('(hover:hover)').matches&&!RM){addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cg.style.opacity=1});
 (function l(){gx+=(tx-gx)*.1;gy+=(ty-gy)*.1;cg.style.transform=`translate(${gx}px,${gy}px)`;requestAnimationFrame(l)})()}

// inclinação 3D nos cards + botões magnéticos
$$('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{if(RM)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*9}deg) rotateX(${-y*9}deg) translateY(-4px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
$$('.mag').forEach(el=>{el.addEventListener('pointermove',e=>{if(RM)return;const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});el.addEventListener('pointerleave',()=>el.style.translate='')});

// carrossel de vídeos 9:16 (coverflow)
const cf=$('#cf'),dots=$('#dots');let cur=0,dx=0,sx=null;
cf.insertAdjacentHTML('afterbegin',VIDEOS.map(v=>`<div class="cd"><video src="${v.src}#t=0.1" loop playsinline preload="metadata"></video><button class="pb" aria-label="Play or pause"><svg class="pp" width="22" height="22" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#02121a"/></svg><svg class="ps" width="22" height="22" viewBox="0 0 24 24"><path d="M7 5h4v14H7zm6 0h4v14h-4z" fill="#02121a"/></svg></button><div class="pg"></div></div>`).join(''));
const cards=$$('.cd');
cards.forEach((c,i)=>{const v=c.querySelector('video'),pg=c.querySelector('.pg');
 v.onerror=()=>c.insertAdjacentHTML('beforeend','<div class="em">Can\'t load this video<br><b>'+VIDEOS[i].src+'</b><br>Check the file name and use H.264 .mp4</div>');
 c.onclick=()=>{if(Math.abs(dx)>50)return;if(i!==cur)return show(i);v.paused?v.play().catch(()=>{}):v.pause()};
 v.onplay=()=>c.classList.add('pl');v.onpause=()=>c.classList.remove('pl');
 v.ontimeupdate=()=>pg.style.width=(v.currentTime/v.duration*100||0)+'%'});
VIDEOS.forEach((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Video '+(n+1));b.onclick=()=>show(n);dots.appendChild(b)});
function show(n){const N=VIDEOS.length,cw=cards[0].offsetWidth;cur=(n+N)%N;
 cards.forEach((c,i)=>{let d=i-cur;if(d>N/2)d-=N;if(d<-N/2)d+=N;const a=Math.abs(d),s=Math.sign(d);
  c.style.transform=`translate(-50%,-50%) translateX(${a?s*cw*(a===1?.78:1.25):0}px) translateZ(${-a*140}px) rotateY(${-s*Math.min(a,1)*28}deg) scale(${a?.86:1})`;
  c.style.opacity=a>2?0:a===2?.55:1;c.style.zIndex=10-a;c.style.pointerEvents=a>2?'none':'auto';
  c.classList.toggle('act',a===0);if(a)c.querySelector('video').pause()});
 [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===cur))}
$('#prev').onclick=()=>show(cur-1);$('#next').onclick=()=>show(cur+1);
addEventListener('resize',()=>show(cur));
addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
cf.addEventListener('pointerdown',e=>{sx=e.clientX;dx=0});
cf.addEventListener('pointerup',e=>{if(sx===null)return;dx=e.clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));sx=null});
show(0);

// ferramentas (anéis animados)
const C=2*Math.PI*38;
$('#tools').innerHTML=TOOLS.map(t=>`<div class="tool rv"><div class="ringp"><svg viewBox="0 0 112 112"><circle cx="56" cy="56" r="38" fill="none" stroke="rgba(53,224,255,.14)" stroke-width="5"/><circle class="pr" cx="56" cy="56" r="38" fill="none" stroke="#35E0FF" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="${C}" style="--c0:${C};--o:${C*(1-t.pct/100)}"/></svg><img src="${t.icon}" alt="${t.name}"></div><b>${t.name}</b><em data-n="${t.pct}" data-s="%">0</em></div>`).join('');

// FAQ
$('#faq-list').innerHTML=FAQ.map((f,n)=>`<div class="q${n===0?' open':''}"><button><span>${f[0]}</span><i>+</i></button><div class="a"><p>${f[1]}</p></div></div>`).join('');
$$('.q').forEach(q=>{const a=q.querySelector('.a');
 if(q.classList.contains('open'))a.style.maxHeight=a.scrollHeight+'px';
 q.querySelector('button').onclick=()=>{const o=q.classList.toggle('open');a.style.maxHeight=o?a.scrollHeight+'px':0}});

// contagem de números
function count(el){const n=+el.dataset.n,s=el.dataset.s||'';if(RM){el.textContent=n+s;return}const t0=performance.now();
 (function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0)}

// aparecer ao rolar
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');
 if(t.id==='tools')t.classList.add('go');
 t.querySelectorAll('[data-n]').forEach(count);if(t.dataset.n)count(t);io.unobserve(t)}),{threshold:.2});
$$('.rv,#tools').forEach(el=>io.observe(el));
$$('.tool').forEach(el=>io.observe(el));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$('#tools').classList.add('go');$$('.tool [data-n]').forEach(count)}}),{threshold:.3}).observe($('#tools'));

// menu ativo + barra de progresso + parallax do topo
const links=$$('.pill a:not(.cta)'),hc=$('#hc'),bar=$('#bar');
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{threshold:.45}).observe&&['home','work','about','faq'].forEach(id=>{new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+id))}),{threshold:.45}).observe(document.getElementById(id))});
addEventListener('scroll',()=>{const y=scrollY;bar.style.transform=`scaleX(${y/(document.body.scrollHeight-innerHeight)})`;
 if(!RM&&y<innerHeight){hc.style.transform=`translateY(${y*.22}px)`;hc.style.opacity=1-y/(innerHeight*.9)}},{passive:true});
