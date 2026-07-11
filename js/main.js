document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     BOOT SCREEN
  ========================================================= */
  const bootScreen = document.getElementById('bootScreen');
  const bootLine2 = document.getElementById('bootLine2');
  const bootLine3 = document.getElementById('bootLine3');
  const bootFill = document.getElementById('bootFill');
  const bootPct = document.getElementById('bootPct');

  const bootSteps = [
    'loading interface modules...',
    'mounting projects & experience...'
  ];

  setTimeout(() => { bootLine2.innerHTML = '&gt; ' + bootSteps[0]; }, 250);
  setTimeout(() => { bootLine3.innerHTML = '&gt; ' + bootSteps[1]; }, 550);

  let pct = 0;
  const bootInterval = setInterval(() => {
    pct += Math.random() * 18 + 8;
    if (pct >= 100) {
      pct = 100;
      clearInterval(bootInterval);
      bootPct.textContent = 'ready.';
      setTimeout(() => bootScreen.classList.add('hidden'), 350);
    } else {
      bootPct.textContent = Math.floor(pct) + '%';
    }
    bootFill.style.width = pct + '%';
  }, 140);

  // Safety fallback in case something stalls
  setTimeout(() => bootScreen.classList.add('hidden'), 2600);

  /* =========================================================
     CUSTOM CURSOR + MAGNETIC ELEMENTS + SPOTLIGHT
  ========================================================= */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const spotlight = document.getElementById('spotlight');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      spotlight.style.left = mouseX + 'px';
      spotlight.style.top = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .skill-pill, input').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
    });

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.22}px, ${relY * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
      });
    });
  } else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    spotlight.style.display = 'none';
  }

  /* =========================================================
     AMBIENT BACKGROUND — network grid + drifting nodes
  ========================================================= */
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const NODE_COUNT = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 26000));
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(255,45,85,${0.09 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion) requestAnimationFrame(drawFrame);
  }
  drawFrame();

  /* =========================================================
     NAV: scroll shrink + active link highlight
  ========================================================= */
  const navbar = document.getElementById('navbar');
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  navBurger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => highlightObserver.observe(s));

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */
  const revealTargets = document.querySelectorAll('.reveal');
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
  const statNums = document.querySelectorAll('.stat-num[data-target], .stat-num span[data-target]');
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
     HERO TAGLINE — TYPING ANIMATION
  ========================================================= */
  const taglines = [
    'Building scalable web systems.',
    'Shipping AI-integrated products.',
    'Learning, always in production.'
  ];
  const typingEl = document.getElementById('heroTyping');
  const caret = typingEl.querySelector('.cursor-caret');

  let taglineIndex = 0;
  function typeTagline() {
    const text = taglines[taglineIndex];
    let i = 0;
    const typeChar = () => {
      if (i <= text.length) {
        typingEl.textContent = text.slice(0, i);
        typingEl.appendChild(caret);
        i++;
        setTimeout(typeChar, 42);
      } else {
        setTimeout(eraseTagline, 1800);
      }
    };
    typeChar();
  }
  function eraseTagline() {
    const text = typingEl.textContent;
    let i = text.length;
    const eraseChar = () => {
      if (i >= 0) {
        typingEl.textContent = text.slice(0, i);
        typingEl.appendChild(caret);
        i--;
        setTimeout(eraseChar, 24);
      } else {
        taglineIndex = (taglineIndex + 1) % taglines.length;
        setTimeout(typeTagline, 300);
      }
    };
    eraseChar();
  }
  typeTagline();

  /* =========================================================
     CONTACT CONSOLE — interactive commands
  ========================================================= */
  const consoleBody = document.getElementById('consoleBody');
  const consoleInput = document.getElementById('consoleInput');

  const contactData = {
    phone: '+91 9043764123',
    email: 'abijerey@gmail.com',
    github: 'github.com/abijerey',
    linkedin: 'linkedin.com/in/abishek-jeremiah-k-298a47291',
    location: 'Chennai, Tamil Nadu, India'
  };

  function printLine(html, delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        const row = document.createElement('div');
        row.className = 'console-line';
        row.innerHTML = html;
        row.style.opacity = '0';
        row.style.transition = 'opacity .3s ease';
        consoleBody.appendChild(row);
        requestAnimationFrame(() => { row.style.opacity = '1'; });
        consoleBody.scrollTop = consoleBody.scrollHeight;
        resolve();
      }, delay);
    });
  }

  const commands = {
    help: async () => {
      await printLine('Available commands:');
      await printLine('<span class="console-key">whoami</span> · <span class="console-key">projects</span> · <span class="console-key">skills</span> · <span class="console-key">resume</span> · <span class="console-key">github</span> · <span class="console-key">contact</span> · <span class="console-key">clear</span>', 60);
    },
    whoami: async () => {
      await printLine('Abishek K — Full Stack Developer, B.Tech (AI &amp; Data Science).');
      await printLine('Based in Chennai, India. Open to Full Stack roles and AI/ML collaboration.', 60);
    },
    projects: async () => {
      await printLine('Envirosense — IoT pollution dashboard (Award Winner)');
      await printLine('Real-Time Object Detection Web — TensorFlow + OpenCV, 87% accuracy', 60);
      await printLine('Quiz Platform — MongoDB + React, 50+ concurrent users', 120);
      await printLine('Real-Time Chat Application — WebSockets, Next.js', 180);
    },
    skills: async () => {
      await printLine('Frontend: React.js · JavaScript (ES6+) · Responsive UI');
      await printLine('Backend: Node.js · Express · Flask · REST APIs', 60);
      await printLine('AI/ML: TensorFlow · OpenCV', 120);
      await printLine('Data: MongoDB · Firebase · MySQL', 180);
    },
    resume: async () => {
      await printLine('Opening resume — <a href="Abishek_K_Resume.pdf" download style="color:var(--signal)">Abishek_K_Resume.pdf</a>');
      window.open('Abishek_K_Resume.pdf', '_blank');
    },
    github: async () => {
      await printLine(`Fetching github.com/abijerey ...`);
      try {
        const res = await fetch('https://api.github.com/users/abijerey');
        if (!res.ok) throw new Error('unreachable');
        const data = await res.json();
        await printLine(`Public repos: ${data.public_repos} · Followers: ${data.followers}`, 100);
      } catch (err) {
        await printLine('Could not reach GitHub API from here — visit github.com/abijerey directly.', 100);
      }
    },
    contact: async () => {
      await printLine(`Phone&nbsp;&nbsp;&nbsp;&nbsp;: ${contactData.phone}`);
      await printLine(`Email&nbsp;&nbsp;&nbsp;&nbsp;: ${contactData.email}`, 60);
      await printLine(`GitHub&nbsp;&nbsp;&nbsp;: ${contactData.github}`, 120);
      await printLine(`LinkedIn: ${contactData.linkedin}`, 180);
      await printLine(`Location: ${contactData.location}`, 240);
    },
    clear: async () => {
      consoleBody.innerHTML = '';
    }
  };

  async function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    await printLine(`<span class="console-key">$</span> ${raw}`);
    if (!cmd) return;
    if (commands[cmd]) {
      await commands[cmd]();
    } else {
      await printLine(`command not found: ${cmd} — type <span class="console-key">help</span>`, 40);
    }
  }

  consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && consoleInput.value.trim() !== '') {
      const val = consoleInput.value;
      consoleInput.value = '';
      runCommand(val);
    }
  });

  let consoleStarted = false;
  const consoleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !consoleStarted) {
        consoleStarted = true;
        (async () => {
          await printLine('abishek@portfolio ~ % <span class="console-key">boot</span>');
          await printLine('type <span class="console-key">help</span> to see available commands.', 200);
        })();
        consoleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  consoleObserver.observe(document.getElementById('contact'));

});
