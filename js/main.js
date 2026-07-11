document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     NAV: scroll progress + mobile menu
  ========================================================= */
  const navProgress = document.getElementById('navProgress');
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    navProgress.style.width = pct + '%';
  });

  navBurger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* Active link highlight on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id ? 'var(--gold)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => highlightObserver.observe(s));

  /* =========================================================
     SCROLL REVEAL for cards/sections
  ========================================================= */
  const revealTargets = document.querySelectorAll(
    '.dash-card, .stack-cat, .repo-card, .commit-node, .award-card, .edu-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* =========================================================
     ANIMATED STAT COUNTERS
  ========================================================= */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* =========================================================
     PROJECT DATA — used to build cards + the case-file modal
  ========================================================= */
  const repoIconSvg = '<svg class="repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2H4.5a1 1 0 0 0-.98 1.19c.15.03.3.06.48.06H12a.75.75 0 0 1 0 1.5H4.5A2.5 2.5 0 0 1 2 11.5v-9Zm10.5-1H4.5a1 1 0 0 0-1 1V10a2.5 2.5 0 0 1 1-.208h8V1.5Z"/></svg>';

  const projectsData = {
    envirosense: {
      title: 'Envirosense', objective: 'IoT Environmental Pollution Monitoring & Alert System', award: true,
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Arduino', 'GSM'],
      overview: 'Full-stack IoT environmental dashboard visualizing real-time pollution data — TDS, turbidity, and temperature — across 3 industrial monitoring zones, with automated SMS alerts on threshold breach.',
      features: ['6 REST API endpoints ingesting Arduino sensor readings into MongoDB, triggering automated alerts on threshold breach', 'GSM-based notifications dispatching SMS alerts to environmental officers within 5 seconds of a violation', 'Cloud-hosted analytics dashboard with historical trend graphs and exportable compliance reports', 'Reduced manual inspection rounds by ~40% for monitoring officers'],
      technical: ['React.js frontend with real-time chart rendering', 'Node.js / Express REST API layer', 'MongoDB schema for sensor readings and alert logs', 'Arduino + GSM module integration for field sensors'],
      impact: [{ value: '6', label: 'API Endpoints' }, { value: '<5s', label: 'Alert Dispatch Time' }, { value: '40%', label: 'Fewer Manual Inspections' }, { value: '3', label: 'Monitoring Zones' }]
    },
    objectdetection: {
      title: 'Real-Time Object Detection Web', objective: 'Computer Vision Detection Pipeline',
      tech: ['React', 'Flask', 'TensorFlow', 'OpenCV'],
      overview: 'React frontend streaming webcam frames to a Python Flask backend, where a custom-trained TensorFlow + OpenCV pipeline returns annotated detections in under 200ms.',
      features: ['Custom TensorFlow model trained on a 2,000-image dataset, reaching 87% detection accuracy via data augmentation', 'TensorFlow Lite conversion + batch preprocessing cut inference time by 35%', 'Predictions exposed as a JSON API — reusable as a standalone microservice', 'Live bounding-box overlay rendered directly on the video stream'],
      technical: ['Flask REST endpoint serving model predictions', 'OpenCV frame capture and preprocessing pipeline', 'TensorFlow Lite optimization for faster inference', 'React frontend handling webcam capture and overlay rendering'],
      impact: [{ value: '87%', label: 'Detection Accuracy' }, { value: '<200ms', label: 'Inference Latency' }, { value: '35%', label: 'Faster Inference' }, { value: '2K', label: 'Training Images' }]
    },
    quizplatform: {
      title: 'Quiz Platform', objective: 'Real-Time Multiplayer Quiz Application',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      overview: 'Interactive full-stack quiz application supporting 50+ concurrent users with real-time score tracking, dynamic question rendering, and an instructor admin panel.',
      features: ['MongoDB schema for question banks, sessions, and leaderboard data with full CRUD endpoints', 'Event-driven UI + optimistic state updates cut perceived latency 40% vs. the original Tkinter prototype', 'Admin panel for question management, cutting instructor setup time by 60%', 'Live leaderboard with real-time score sync'],
      technical: ['React frontend with optimistic state updates', 'Node.js / Express backend with session management', 'MongoDB collections for questions, sessions, and scores'],
      impact: [{ value: '50+', label: 'Concurrent Users' }, { value: '40%', label: 'Lower Perceived Latency' }, { value: '60%', label: 'Faster Instructor Setup' }]
    },
    realtimechat: {
      title: 'Real-Time Chat Application', objective: 'Live Messaging Platform',
      tech: ['JavaScript', 'Next.js', 'Node.js', 'WebSockets'],
      overview: 'Live messaging platform with instant delivery, authentication, and dynamic UI updates powered by WebSockets.',
      features: ['Real-time bidirectional messaging with persistent chat history', 'Authenticated sessions with secure login flow', 'Dynamic, reactive UI updates on new messages', 'Instant message synchronization across clients'],
      technical: ['WebSocket-based real-time communication layer', 'Next.js App Router architecture', 'Event-driven message updates and state sync'],
      impact: [{ value: '<1s', label: 'Message Latency' }, { value: 'Live', label: 'Real-Time Sync' }, { value: '100%', label: 'Responsive UI' }]
    },
    gestureverse: {
      title: 'GestureVerse', objective: 'Gesture-Driven Interaction Engine',
      tech: ['Python', 'MediaPipe', 'OpenCV', 'Computer Vision'],
      overview: 'A real-time hand-gesture recognition system that translates webcam hand movements into interactive on-screen controls and visual effects, with no external hardware required.',
      features: ['Real-time hand landmark detection via webcam', 'Custom gesture-to-action mapping engine', 'Low-latency response for smooth interaction', 'Fully browser/webcam based — no extra sensors needed'],
      technical: ['MediaPipe hand landmark detection pipeline', 'OpenCV frame processing and normalization', 'Gesture classification and event dispatch logic'],
      impact: [{ value: 'Real-Time', label: 'Gesture Recognition' }, { value: '0', label: 'External Hardware' }, { value: 'Multi', label: 'Gesture Mappings' }]
    },
    mediledger: {
      title: 'MediLedger', objective: 'Blockchain-Based Pharma Supply Tracker',
      tech: ['Python', 'Flask', 'Node.js', 'Solidity', 'SQL'],
      overview: 'A blockchain-based pharmaceutical supply chain platform ensuring complete transparency and traceability from manufacturer to end consumer.',
      features: ['Decentralized ledger for immutable drug tracking records', 'QR code-based verification for instant authenticity checks', 'Smart contract automation for supply chain transactions', 'Comprehensive audit trail for regulatory compliance'],
      technical: ['Ethereum blockchain for decentralized data storage', 'Solidity smart contracts for automated verification', 'Flask backend API with Node.js microservices', 'SQL database for off-chain data management'],
      impact: [{ value: '99.9%', label: 'Traceability Accuracy' }, { value: '50%', label: 'Counterfeit Risk Cut' }, { value: '3 Sec', label: 'Verification Time' }]
    },
    studentmanagement: {
      title: 'Student Management System', objective: 'Academic Records & Attendance Platform',
      tech: ['JavaScript', 'Node.js', 'MongoDB'],
      overview: 'A web-based system for managing student records, attendance, and grades — built for academic institutions that need a lightweight, role-based administration tool.',
      features: ['Student and faculty CRUD operations', 'Attendance tracking with daily/monthly views', 'Grade management with report generation', 'Role-based dashboards for admins, faculty, and students'],
      technical: ['Node.js / Express REST API', 'MongoDB schema for students, courses, and grades', 'JWT-based authentication and role-based access control'],
      impact: [{ value: '100%', label: 'Digitized Records' }, { value: 'Role-Based', label: 'Access Control' }, { value: 'Automated', label: 'Grade Reports' }]
    },
    tictactoeai: {
      title: 'TicTacToe AI', objective: 'Unbeatable Minimax Game Engine',
      tech: ['JavaScript'],
      overview: 'A classic Tic-Tac-Toe game featuring an unbeatable AI opponent powered by the Minimax algorithm with alpha-beta pruning.',
      features: ['Minimax AI with alpha-beta pruning for optimal moves', 'Selectable difficulty levels', 'Responsive game board with win/draw detection', 'Instant move calculation with no perceptible delay'],
      technical: ['Pure JavaScript game logic, no external libraries', 'Recursive minimax scoring with alpha-beta pruning', 'DOM-based rendering and event handling'],
      impact: [{ value: '0', label: 'Losses at Hard Mode' }, { value: 'Instant', label: 'Move Calculation' }, { value: '3', label: 'Difficulty Levels' }]
    },
    securedocverifier: {
      title: 'SecureDoc Verifier', objective: 'AI-Powered Document Authentication',
      tech: ['Python', 'OpenCV', 'Tesseract OCR'],
      overview: 'A document authentication tool that detects tampered or forged documents using OCR-based text extraction and image-forensics techniques.',
      features: ['OCR-based text extraction and validation', 'Image tampering detection using OpenCV', 'Automated fraud risk scoring', 'Verification dashboard for reviewers'],
      technical: ['Tesseract OCR pipeline for text extraction', 'OpenCV-based image forensics for tamper detection', 'Python backend service exposing verification results'],
      impact: [{ value: '<2 sec', label: 'Analysis Time' }, { value: 'Automated', label: 'Tamper Flagging' }, { value: 'Reduced', label: 'Manual Review Load' }]
    },
    resumeanalyzer: {
      title: 'AI Resume Analyzer', objective: 'AI-Powered Resume Screening System',
      tech: ['Python', 'NLP', 'Machine Learning'],
      overview: 'An AI-driven resume analysis and job-matching tool that automates candidate screening by parsing resumes and job descriptions to compute match scores.',
      features: ['Resume parsing and structured data extraction', 'Job description analysis and skill extraction', 'AI-based resume-to-job matching and scoring', 'Automated candidate ranking and skill-gap identification'],
      technical: ['NLP-based text preprocessing and cleaning', 'Semantic and keyword matching algorithms', 'Modular Python ML pipeline design'],
      impact: [{ value: '70%', label: 'Screening Time Cut' }, { value: '90%', label: 'Match Accuracy' }, { value: '1K+', label: 'Resumes Analyzed' }]
    },
    newschatbot: {
      title: 'News ChatBot', objective: 'Conversational News Aggregator',
      tech: ['TypeScript', 'NLP'],
      overview: 'A conversational chatbot that aggregates, summarizes, and delivers trending news to users based on natural-language queries.',
      features: ['Real-time news aggregation from multiple sources', 'Conversational query handling', 'Automatic topic-based summarization', 'Category-based news delivery'],
      technical: ['TypeScript backend services', 'NLP-based summarization pipeline', 'News API integration for live articles'],
      impact: [{ value: 'Instant', label: 'News Summaries' }, { value: 'Conversational', label: 'Query Interface' }, { value: 'Multi', label: 'Topic Categories' }]
    },
    quicklink: {
      title: 'QuickLink', objective: 'Lightweight URL Shortening Service',
      tech: ['Python'],
      overview: 'A lightweight URL shortening service with custom aliases, fast redirects, and built-in click analytics.',
      features: ['Custom short-link generation with aliases', 'Fast redirect handling', 'Click analytics and access tracking', 'Simple REST API for integration'],
      technical: ['Python backend service', 'Database-backed link storage and lookups', 'Analytics tracking on every redirect'],
      impact: [{ value: 'Fast', label: 'Redirects' }, { value: 'Simple', label: 'REST API' }, { value: 'Tracked', label: 'Click Analytics' }]
    }
  };

  const orderedProjects = ['envirosense', 'objectdetection', 'quizplatform', 'realtimechat', 'gestureverse', 'mediledger', 'studentmanagement', 'tictactoeai', 'securedocverifier', 'resumeanalyzer', 'newschatbot', 'quicklink'];

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    orderedProjects.forEach((key) => {
      const p = projectsData[key];
      if (!p) return;
      const card = document.createElement('article');
      card.className = 'repo-card' + (p.award ? ' repo-featured' : '');
      card.setAttribute('data-cur', '');
      card.setAttribute('data-cur-label', 'Open');
      card.innerHTML = `
        <div class="repo-top">
          <div class="repo-name-row">
            ${repoIconSvg}
            <h3 class="repo-name">${p.title}</h3>
            <span class="repo-visibility mono">public</span>
          </div>
          ${p.award ? '<span class="status-tag status-tag-award">🏆 Award Winner</span>' : ''}
        </div>
        <p class="repo-desc">${p.overview}</p>
        <div class="repo-lang-row">${p.tech.map(t => `<span class="lang-dot" style="background:var(--gold)"></span>${t}`).join(' &nbsp; ')}</div>
        <div class="repo-actions">
          <button class="repo-btn repo-btn-primary case-btn" type="button" data-project="${key}" data-cur>Open file →</button>
        </div>`;
      card.addEventListener('click', () => openProjectModal(key));
      projectsGrid.appendChild(card);
      card.classList.add('reveal');
    });

    projectsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-project]');
      if (btn) openProjectModal(btn.getAttribute('data-project'));
    });

    // re-observe newly added cards for reveal animation
    const revealObserver2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    projectsGrid.querySelectorAll('.repo-card').forEach(el => revealObserver2.observe(el));
  }

  window.openProjectModal = function (key) {
    const p = projectsData[key];
    if (!p) return;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalSubtitle').textContent = 'Objective — ' + p.objective;
    document.getElementById('modalEyebrow').textContent = 'Case file';
    document.getElementById('modalTechStack').innerHTML = p.tech.map(t => `<span class="modal-tag">${t}</span>`).join('');
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-sec"><div class="modal-sec-title">Problem &amp; Context</div><p class="modal-p">${p.overview}</p></div>
      <div class="modal-sec"><div class="modal-sec-title">Approach &amp; Features</div><ul class="modal-list">${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
      <div class="modal-sec"><div class="modal-sec-title">Technology Stack &amp; Architecture</div><ul class="modal-list">${p.technical.map(t => `<li>${t}</li>`).join('')}</ul></div>
      <div class="modal-sec"><div class="modal-sec-title">Results</div><div class="modal-stats">${p.impact.map(s => `<div class="modal-stat"><b>${s.value}</b><span>${s.label}</span></div>`).join('')}</div></div>`;
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  window.closeProjectModal = function () {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  document.getElementById('projectModal').addEventListener('click', e => {
    if (e.target.id === 'projectModal') closeProjectModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });

  /* =========================================================
     CONTACT TERMINAL — TYPING ANIMATION (4 contact lines only)
  ========================================================= */
  const terminalBody = document.getElementById('terminalBody');
  const terminalOutput = [
    { type: 'prompt', text: 'contact' },
    { type: 'line', text: 'Email     :  abijerey@gmail.com' },
    { type: 'line', text: 'GitHub    :  github.com/abijerey' },
    { type: 'line', text: 'LinkedIn  :  linkedin.com/in/abishek-jeremiah-k-298a47291' },
    { type: 'line', text: 'Phone     :  +91-9043764123' }
  ];

  let termStarted = false;
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !termStarted) {
        termStarted = true;
        runTerminal();
        terminalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  if (terminalBody) terminalObserver.observe(document.getElementById('contact'));

  function runTerminal() {
    function typePromptLine() {
      const promptSpan = document.createElement('div');
      const promptLabel = document.createElement('span');
      promptLabel.className = 'term-prompt';
      promptLabel.textContent = 'abishek@portfolio ~ % ';
      promptSpan.appendChild(promptLabel);
      const typed = document.createElement('span');
      typed.className = 'term-key';
      promptSpan.appendChild(typed);
      terminalBody.appendChild(promptSpan);

      const word = terminalOutput[0].text;
      let c = 0;
      const typeChar = () => {
        if (c < word.length) {
          typed.textContent += word[c];
          c++;
          setTimeout(typeChar, 90);
        } else {
          setTimeout(printLines, 400);
        }
      };
      typeChar();
    }

    function printLines() {
      let i = 1;
      const printNext = () => {
        if (i >= terminalOutput.length) return;
        const line = document.createElement('div');
        line.textContent = terminalOutput[i].text;
        line.style.opacity = '0';
        line.style.transition = 'opacity .3s ease';
        terminalBody.appendChild(line);
        requestAnimationFrame(() => { line.style.opacity = '0.9'; });
        i++;
        setTimeout(printNext, 220);
      };
      printNext();
    }

    typePromptLine();
  }

  /* =========================================================
     ADVANCED CUSTOM CURSOR
     - dot follows the pointer exactly
     - ring trails smoothly behind it
     - any [data-cur] element grows the ring (and shows a label if
       data-cur-label is set); anything else makes it pulse softly
     - [data-magnetic] elements pull slightly toward the pointer
     - disabled automatically on touch/coarse-pointer devices
  ========================================================= */
  (function initCustomCursor() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('has-cursor');
    const dot = document.getElementById('curDot');
    const ring = document.getElementById('curRing');
    const label = document.getElementById('curLabel');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    (function ringLoop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(ringLoop);
    })();

    // Grow / label on any [data-cur] target. Re-scanned on a short
    // interval so dynamically-added cards (projects grid) get bound too.
    const bound = new WeakSet();
    function bindCursorTargets() {
      document.querySelectorAll('[data-cur]').forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        el.addEventListener('mouseenter', () => {
          const txt = el.getAttribute('data-cur-label');
          if (txt) {
            ring.classList.add('grow');
            label.textContent = txt;
          } else {
            ring.classList.add('pulse');
          }
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('grow', 'pulse');
          label.textContent = '';
        });
      });
    }
    bindCursorTargets();
    const cursorRescan = setInterval(bindCursorTargets, 800);
    setTimeout(() => clearInterval(cursorRescan), 8000);

    // Magnetic pull for [data-magnetic] buttons
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const inner = btn.querySelector('.btn-inner') || btn;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${relX * 0.16}px, ${relY * 0.3}px)`;
        inner.style.transform = `translate(${relX * 0.1}px, ${relY * 0.22}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
        inner.style.transform = 'translate(0,0)';
      });
    });
  })();

  /* =========================================================
     LOADER — cycles through boot steps then fades out
  ========================================================= */
  (function runLoader() {
    const steps = [
      'Booting developer console…',
      'Loading project archive…',
      'Compiling stack modules…',
      'Warming up the terminal…',
      'Ready.'
    ];
    const statusEl = document.getElementById('loaderStatus');
    const fill = document.getElementById('loaderFill');
    const loader = document.getElementById('loader');
    if (!loader) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      fill.style.width = (i / steps.length * 100) + '%';
      if (i < steps.length) {
        statusEl.textContent = steps[i];
      } else {
        clearInterval(iv);
        setTimeout(() => loader.classList.add('done'), 350);
      }
    }, 380);
  })();

  /* =========================================================
     HERO PHOTO — subtle 3D tilt that follows the pointer
     (skipped automatically on touch devices)
  ========================================================= */
  (function initPhotoTilt() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    const frame = document.getElementById('heroPhotoFrame');
    if (!frame) return;
    const wrap = frame.parentElement;
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
    });
    wrap.addEventListener('mouseleave', () => {
      frame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
  })();

});
