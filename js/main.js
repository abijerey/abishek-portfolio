// ================= PROJECT / CASE FILE DATA =================
// NOTE: Envirosense, Real-Time Object Detection Web, Quiz Platform, and
// Real-Time Chat Application (RealtimeChatApp) use Abishek's real project
// details. The remaining 8 (GestureVerse, MediLedger, StudentManagementSystem,
// TicTacToeAI, SecureDocVerifier, ResumeAnalyzer, NewsChatBot, QuickLink) were
// only supplied as a repo name + language, so their descriptions below are
// inferred and should be reviewed/edited for accuracy before publishing.
const projectsData = {
  envirosense:{ title:'Envirosense', objective:'IoT Environmental Monitoring & Alert System',
    tech:['React.js','Node.js','Express','MongoDB','Arduino','GSM'],
    overview:'Full-stack IoT environmental dashboard visualizing real-time pollution data — TDS, turbidity, and temperature — across 3 industrial monitoring zones, with automated SMS alerts on threshold breach. Award-winning project.',
    features:['6 REST API endpoints ingesting Arduino sensor readings into MongoDB','Automated alert triggers on threshold breach','GSM-based SMS notifications to environmental officers within 5 seconds of a violation','Cloud-hosted analytics dashboard with historical trend graphs','Exportable compliance reports for regulatory review'],
    technical:['Arduino sensor nodes streaming TDS, turbidity, and temperature readings','Node.js / Express REST API layer for ingestion and alerting','MongoDB for time-series sensor storage','GSM module integration for SMS dispatch','React.js dashboard for real-time and historical visualization'],
    impact:[{value:'6',label:'API Endpoints'},{value:'<5 Sec',label:'Alert Dispatch Time'},{value:'3',label:'Monitoring Zones'},{value:'~40%',label:'Fewer Manual Inspections'}] },
  objectdetection:{ title:'Real-Time Object Detection Web', objective:'Browser-Based Object Detection Pipeline',
    tech:['React','Flask','TensorFlow','OpenCV'],
    overview:'React frontend streaming webcam frames to a Python Flask backend, where a custom-trained TensorFlow + OpenCV pipeline returns annotated detections in under 200ms.',
    features:['Live webcam frame streaming from browser to backend','Custom TensorFlow model trained on a 2,000-image dataset','Data augmentation used to push detection accuracy to 87%','Predictions exposed as a reusable JSON API'],
    technical:['TensorFlow model training with augmentation pipeline','TensorFlow Lite conversion for faster inference','OpenCV for frame preprocessing and annotation','Flask backend serving predictions as a microservice','React frontend for capture and live display'],
    impact:[{value:'87%',label:'Detection Accuracy'},{value:'<200ms',label:'Inference Latency'},{value:'35%',label:'Faster via TFLite'},{value:'2,000',label:'Image Training Set'}] },
  quizplatform:{ title:'Quiz Platform', objective:'Real-Time Quiz & Assessment Platform',
    tech:['React','Node.js','Express','MongoDB'],
    overview:'Interactive full-stack quiz application supporting 50+ concurrent users with real-time score tracking, dynamic question rendering, and an instructor admin panel.',
    features:['Real-time score tracking and leaderboard','Dynamic question rendering per session','Instructor admin panel for question management','Full CRUD endpoints for question banks and sessions'],
    technical:['MongoDB schema for question banks, sessions, and leaderboards','Event-driven UI with optimistic state updates','Express REST API for session and score management'],
    impact:[{value:'50+',label:'Concurrent Users'},{value:'40%',label:'Lower Perceived Latency'},{value:'60%',label:'Faster Instructor Setup'}] },
  realtimechat:{ title:'Real-Time Chat Application', objective:'Live Messaging Platform',
    tech:['JavaScript','Next.js','Node.js','WebSockets'],
    overview:'Live messaging platform with instant delivery, authentication, and dynamic UI updates powered by WebSockets.',
    features:['Real-time bidirectional messaging with persistent chat history','Authenticated sessions','Dynamic, reactive UI updates on new messages'],
    technical:['WebSocket-based real-time communication layer','Next.js frontend with component-based chat interface','Node.js backend handling connections and message routing'],
    impact:[{value:'<1s',label:'Message Latency'},{value:'Live',label:'Real-Time Sync'},{value:'100%',label:'Responsive UI'}] },
  gestureverse:{ title:'GestureVerse', objective:'Gesture-Driven Interaction Engine',
    tech:['Python','OpenCV','Computer Vision'],
    overview:'A hand-gesture recognition system that maps webcam-tracked gestures to real-time visual/interaction effects, built around a Python + OpenCV pipeline.',
    features:['Real-time hand tracking via webcam','Gesture-to-action mapping for on-screen effects','Lightweight, dependency-light Python runtime'],
    technical:['OpenCV-based frame capture and hand landmark detection','Gesture classification logic mapped to interaction events'],
    impact:[{value:'Real-Time',label:'Gesture Tracking'},{value:'Python',label:'CV Pipeline'}] },
  mediledger:{ title:'MediLedger', objective:'Pharma Supply Chain Ledger (Prototype)',
    tech:['JavaScript','Node.js','Solidity'],
    overview:'A prototype exploring blockchain-based tracking for pharmaceutical supply chains — logging custody transfers on-chain to make tampering and counterfeit insertion easier to detect.',
    features:['Ledger entries for each custody transfer in the supply chain','Smart-contract-based verification logic','Node.js service layer connecting the frontend to the chain'],
    technical:['Solidity smart contracts for on-chain record-keeping','Node.js backend for API and contract interaction'],
    impact:[{value:'On-Chain',label:'Custody Records'},{value:'Prototype',label:'Project Stage'}] },
  studentmanagement:{ title:'Student Management System', objective:'Student Records & Administration Portal',
    tech:['JavaScript','Node.js','MongoDB'],
    overview:'A CRUD-based portal for managing student records — enrollment details, academic data, and administrative workflows in one place.',
    features:['Add / edit / remove student records','Search and filter by student attributes','Role-based views for admin vs. staff'],
    technical:['MongoDB schema for student and course data','Express REST API for CRUD operations','React or vanilla JS frontend for record management'],
    impact:[{value:'CRUD',label:'Full Record Lifecycle'},{value:'Role-Based',label:'Access Views'}] },
  tictactoeai:{ title:'TicTacToeAI', objective:'Tic-Tac-Toe with Unbeatable AI',
    tech:['JavaScript','Minimax Algorithm'],
    overview:'A browser-based Tic-Tac-Toe game with an AI opponent driven by the minimax algorithm — built as a hands-on exercise in game-tree search.',
    features:['Player vs. AI gameplay','Minimax-based move evaluation for optimal play','Clean, responsive game board UI'],
    technical:['Minimax algorithm with game-tree traversal','Vanilla JavaScript game state management'],
    impact:[{value:'Unbeatable',label:'AI Opponent'},{value:'Minimax',label:'Core Algorithm'}] },
  securedocverifier:{ title:'SecureDocVerifier', objective:'AI-Assisted Document Authentication',
    tech:['Python','OCR','Tamper Detection'],
    overview:'A document verification tool that inspects uploaded documents for signs of tampering or forgery using OCR-based text extraction and image analysis.',
    features:['OCR-based text extraction from documents','Tamper/forgery artifact detection','Verification result reporting'],
    technical:['Python OCR pipeline for text extraction','Image analysis for tamper-artifact detection'],
    impact:[{value:'AI-Assisted',label:'Verification'},{value:'OCR',label:'Text Extraction'}] },
  resumeanalyzer:{ title:'ResumeAnalyzer', objective:'AI-Powered Resume Screening',
    tech:['Python','NLP','Machine Learning'],
    overview:'An NLP-driven tool that parses resumes and job descriptions to compute match scores and highlight skill gaps for faster candidate screening.',
    features:['Resume parsing and structured data extraction','Job description keyword and skill extraction','Match scoring between resume and job description'],
    technical:['NLP preprocessing pipeline for text cleaning','Keyword/semantic matching for scoring','Python backend for parsing and scoring logic'],
    impact:[{value:'NLP',label:'Resume Parsing'},{value:'Automated',label:'Match Scoring'}] },
  newschatbot:{ title:'NewsChatBot', objective:'Conversational News Aggregator',
    tech:['TypeScript','Chatbot','News APIs'],
    overview:'A conversational bot that retrieves and summarizes news on request, letting users ask for topics or categories instead of browsing manually.',
    features:['Conversational query interface for news topics','Aggregation from news sources/APIs','Basic summarization of retrieved articles'],
    technical:['TypeScript backend handling query intent and aggregation','Integration with a news data source/API'],
    impact:[{value:'Conversational',label:'News Retrieval'},{value:'TypeScript',label:'Backend'}] },
  quicklink:{ title:'QuickLink', objective:'Lightweight URL Shortening Service',
    tech:['Python','REST API'],
    overview:'A lightweight URL shortener that generates short, shareable links and redirects users to the original destination.',
    features:['Short URL generation with unique codes','Fast redirect handling','Simple REST API for link creation'],
    technical:['Python backend for URL generation and redirect logic','Lightweight storage for URL mappings'],
    impact:[{value:'Fast',label:'Redirects'},{value:'REST',label:'API-Driven'}] },
};
const orderedProjects = ['envirosense','objectdetection','quizplatform','realtimechat','gestureverse','mediledger','studentmanagement','tictactoeai','securedocverifier','resumeanalyzer','newschatbot','quicklink'];

document.addEventListener('DOMContentLoaded', () => {

  /* ================= RENDER PROJECT CARDS ================= */
  const expGrid = document.getElementById('expGrid');
  orderedProjects.forEach((key,i)=>{
    const p = projectsData[key]; if(!p) return;
    const card = document.createElement('div');
    card.className = 'exp-card';
    card.setAttribute('data-cur',''); card.setAttribute('data-cur-label','Open');
    card.onclick = ()=>openProjectModal(key);
    card.addEventListener('mousemove',(e)=>{ const r=card.getBoundingClientRect(); card.style.setProperty('--sx',(e.clientX-r.left)+'px'); card.style.setProperty('--sy',(e.clientY-r.top)+'px'); });
    card.innerHTML = `
      <div class="exp-num">EXP-${String(i+1).padStart(2,'0')}</div>
      <h3 class="exp-title">${p.title}</h3>
      <div class="exp-objective">${p.objective}</div>
      <p class="exp-problem">${p.overview.slice(0,120)}${p.overview.length>120?'…':''}</p>
      <div class="exp-tags">${p.tech.slice(0,5).map(t=>`<span class="exp-tag">${t}</span>`).join('')}</div>
      <button class="exp-open">Open case file →</button>`;
    expGrid.appendChild(card);
  });

  window.openProjectModal = function(key){
    const p = projectsData[key]; if(!p) return;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalSubtitle').textContent = 'Objective — ' + p.objective;
    document.getElementById('modalEyebrow').textContent = 'Case file';
    document.getElementById('modalTechStack').innerHTML = p.tech.map(t=>`<span class="modal-tag">${t}</span>`).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-sec"><div class="modal-sec-title">Problem &amp; Context</div><p class="modal-p">${p.overview}</p></div>
      <div class="modal-sec"><div class="modal-sec-title">Approach &amp; Features</div><ul class="modal-list">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul></div>
      <div class="modal-sec"><div class="modal-sec-title">Technology Stack &amp; Architecture</div><ul class="modal-list">${p.technical.map(t=>`<li>${t}</li>`).join('')}</ul></div>
      <div class="modal-sec"><div class="modal-sec-title">Results</div><div class="modal-stats">${p.impact.map(s=>`<div class="modal-stat"><b>${s.value}</b><span>${s.label}</span></div>`).join('')}</div></div>`;
    document.getElementById('projectModal').classList.add('active'); document.body.style.overflow='hidden';
  };
  window.closeProjectModal = function(){ document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow='auto'; };
  document.getElementById('projectModal').addEventListener('click', e=>{ if(e.target.id==='projectModal') closeProjectModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeProjectModal(); });

  /* ================= EXPERIENCE TIMELINE ================= */
  const timelineData = [
    { icon:'DEV', date:'Jun 2024 — Aug 2024', role:'Full Stack Developer Intern', company:'Internship',
      desc:'Developed and deployed 3+ responsive web modules using React.js and Node.js/Express, cutting page load time by ~30%. Designed 10+ REST API endpoints connecting to MongoDB for real-time dashboard sync. Implemented JWT-based auth for 200+ simulated users. Wrote unit tests and ran API validation in Postman, reducing production bugs by ~25%.' },
    { icon:'EDU', date:'2023 — 2027', role:'B.Tech — Artificial Intelligence & Data Science', company:'Sri Sairam Engineering College, Chennai',
      desc:'Coursework spanning Data Structures, DBMS, Machine Learning, Web Technologies, and Cloud Computing. Active participant in inter-college technical symposiums and project exhibitions.' },
  ];
  const tlList = document.getElementById('timelineList');
  timelineData.forEach((t,i)=>{
    const item = document.createElement('div');
    item.className = 'tl-item' + (i===0?' open':'');
    item.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-head" data-cur>
        <div class="tl-icon">${t.icon}</div>
        <div class="tl-titles"><div class="tl-role">${t.role}</div><div class="tl-company">${t.company}</div></div>
        <div class="tl-date">${t.date}</div>
        <div class="tl-chevron">▾</div>
      </div>
      <div class="tl-body"><p class="tl-desc">${t.desc}</p></div>`;
    item.querySelector('.tl-head').addEventListener('click', ()=> item.classList.toggle('open'));
    tlList.appendChild(item);
  });

  /* ================= LOADER ================= */
  (function(){
    const steps = ['Initializing workspace…','Loading projects…','Loading experience…','Preparing interface…','Ready.'];
    const statusEl = document.getElementById('loaderStatus');
    const fill = document.getElementById('loaderFill');
    const loader = document.getElementById('loader');
    let i=0;
    const iv = setInterval(()=>{
      i++;
      fill.style.width = (i/steps.length*100)+'%';
      if(i < steps.length){ statusEl.textContent = steps[i]; }
      else { clearInterval(iv); setTimeout(()=>loader.classList.add('done'), 350); }
    }, 380);
  })();

  /* ================= NAV: mobile + scroll spy + progress ================= */
  (function(){
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    function toggle(){ hamburger.classList.toggle('active'); mobileMenu.classList.toggle('active'); }
    hamburger.addEventListener('click', toggle);
    hamburger.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ hamburger.classList.remove('active'); mobileMenu.classList.remove('active'); }));

    const navLinks = document.querySelectorAll('#navLinks a, #mobileMenu a');
    const sections = ['home','profile','projects','experience','milestones','contact'];
    const navProgress = document.getElementById('navProgress');
    function onScroll(){
      let current='';
      sections.forEach(id=>{ const el=document.getElementById(id); if(el){ const r=el.getBoundingClientRect(); if(r.top<=110 && r.bottom>=110) current=id; } });
      navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+current));
      const h = document.documentElement;
      const pct = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
      navProgress.style.width = pct+'%';
    }
    window.addEventListener('scroll', onScroll);
    setTimeout(onScroll,150);
  })();

  /* ================= REVEAL + COUNTERS ================= */
  const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const cObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target; const target = parseFloat(el.getAttribute('data-target')); const isDecimal = target%1!==0;
        let current=0; const step = target/60;
        const tick=()=>{ current+=step; if(current<target){ el.textContent = isDecimal?current.toFixed(2):Math.ceil(current); requestAnimationFrame(tick); } else { el.textContent = isDecimal?target.toFixed(2):target; } };
        tick(); cObserver.unobserve(el);
      }
    });
  }, {threshold:.5});
  document.querySelectorAll('.counter').forEach(c=>cObserver.observe(c));

  /* ================= CURSOR + MAGNETIC + TILT + BG CANVAS ================= */
  (function(){
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if(!isTouch){
      document.body.classList.add('has-cursor');
      const dot=document.getElementById('curDot'), ring=document.getElementById('curRing'), label=document.getElementById('curLabel');
      let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
      document.addEventListener('mousemove',(e)=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px)`; });
      (function loop(){ rx+=(mx-rx)*0.16; ry+=(my-ry)*0.16; ring.style.transform=`translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
      document.querySelectorAll('a,button,[data-cur]').forEach(el=>{
        el.addEventListener('mouseenter',()=>{ const txt=el.getAttribute('data-cur-label'); if(txt){ ring.classList.add('grow'); label.textContent=txt; } else { ring.classList.add('pulse'); } });
        el.addEventListener('mouseleave',()=>{ ring.classList.remove('grow','pulse'); label.textContent=''; });
      });
      document.querySelectorAll('[data-magnetic]').forEach(btn=>{
        const inner = btn.querySelector('.btn-inner') || btn;
        btn.addEventListener('mousemove',(e)=>{ const r=btn.getBoundingClientRect(); const relX=e.clientX-(r.left+r.width/2); const relY=e.clientY-(r.top+r.height/2); btn.style.transform=`translate(${relX*0.16}px,${relY*0.3}px)`; inner.style.transform=`translate(${relX*0.1}px,${relY*0.22}px)`; });
        btn.addEventListener('mouseleave',()=>{ btn.style.transform='translate(0,0)'; inner.style.transform='translate(0,0)'; });
      });
      const frame=document.getElementById('portraitFrame');
      if(frame){ const wrap=frame.parentElement;
        wrap.addEventListener('mousemove',(e)=>{ const r=wrap.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-0.5; const py=(e.clientY-r.top)/r.height-0.5; frame.style.transform=`perspective(900px) rotateY(${px*7}deg) rotateX(${-py*7}deg)`; });
        wrap.addEventListener('mouseleave',()=>{ frame.style.transform='perspective(900px) rotateY(0deg) rotateX(0deg)'; });
      }
    }

    // subtle drifting-node background canvas
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let w,h,points=[];
    function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight;
      points = Array.from({length: Math.min(46, Math.floor(w*h/38000))}, ()=>({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.15, vy:(Math.random()-0.5)*0.15 }));
    }
    resize(); window.addEventListener('resize', resize);
    function draw(){
      ctx.clearRect(0,0,w,h);
      points.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; });
      for(let i=0;i<points.length;i++){
        for(let j=i+1;j<points.length;j++){
          const dx=points[i].x-points[j].x, dy=points[i].y-points[j].y, dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<140){ ctx.strokeStyle = `rgba(224,41,61,${(1-dist/140)*0.12})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(points[i].x,points[i].y); ctx.lineTo(points[j].x,points[j].y); ctx.stroke(); }
        }
        ctx.fillStyle='rgba(140,28,51,0.35)'; ctx.beginPath(); ctx.arc(points[i].x,points[i].y,1.4,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();
});
