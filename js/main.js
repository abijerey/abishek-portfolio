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
     HERO CODE EDITOR — TYPING ANIMATION
  ========================================================= */
  const codeLines = [
    { text: "// envirosense — pollution alert pipeline", cls: "tok-com" },
    { text: "const ", cls: "tok-key", inline: true },
    { text: "express ", cls: "tok-var", inline: true },
    { text: "= ", cls: "tok-punc", inline: true },
    { text: "require", cls: "tok-fn", inline: true },
    { text: "('express');\n", cls: "tok-str", inline: true },
    { text: "\n", cls: "tok-punc", inline: true },
    { text: "app.post", cls: "tok-fn", inline: true },
    { text: "(", cls: "tok-punc", inline: true },
    { text: "'/api/sensors'", cls: "tok-str", inline: true },
    { text: ", ", cls: "tok-punc", inline: true },
    { text: "async ", cls: "tok-key", inline: true },
    { text: "(req, res) => {\n", cls: "tok-var", inline: true },
    { text: "  const ", cls: "tok-key", inline: true },
    { text: "{ tds, turbidity, temp } ", cls: "tok-var", inline: true },
    { text: "= req.body;\n", cls: "tok-punc", inline: true },
    { text: "\n", cls: "tok-punc", inline: true },
    { text: "  if ", cls: "tok-key", inline: true },
    { text: "(tds > ", cls: "tok-punc", inline: true },
    { text: "THRESHOLD", cls: "tok-var", inline: true },
    { text: ") {\n", cls: "tok-punc", inline: true },
    { text: "    await ", cls: "tok-key", inline: true },
    { text: "sendSMSAlert", cls: "tok-fn", inline: true },
    { text: "(officer.phone);\n", cls: "tok-var", inline: true },
    { text: "  }\n", cls: "tok-punc", inline: true },
    { text: "\n", cls: "tok-punc", inline: true },
    { text: "  await ", cls: "tok-key", inline: true },
    { text: "Reading.create", cls: "tok-fn", inline: true },
    { text: "({ tds, turbidity, temp });\n", cls: "tok-var", inline: true },
    { text: "  res.status(", cls: "tok-var", inline: true },
    { text: "200", cls: "tok-str", inline: true },
    { text: ").json({ ok: ", cls: "tok-punc", inline: true },
    { text: "true", cls: "tok-key", inline: true },
    { text: " });\n", cls: "tok-punc", inline: true },
    { text: "});", cls: "tok-punc", inline: true }
  ];

  const typingEl = document.getElementById('typingCode');

  function typeCode() {
    typingEl.innerHTML = '';
    let i = 0;

    function typeNext() {
      if (i >= codeLines.length) {
        // add blinking cursor at end, then restart after pause
        const cursor = document.createElement('span');
        cursor.className = 'type-cursor';
        typingEl.appendChild(cursor);
        setTimeout(() => {
          typeCode();
        }, 3200);
        return;
      }
      const token = codeLines[i];
      const span = document.createElement('span');
      span.className = token.cls;
      span.textContent = token.text;
      typingEl.appendChild(span);
      i++;
      const delay = token.text.trim().length === 0 ? 20 : Math.min(28, 600 / token.text.length);
      setTimeout(typeNext, delay);
    }
    typeNext();
  }

  typeCode();

  /* =========================================================
     CONTACT TERMINAL — TYPING ANIMATION
  ========================================================= */
  const terminalBody = document.getElementById('terminalBody');
  const terminalOutput = [
    { type: 'prompt', text: 'contact' },
    { type: 'line', text: 'Phone     :  +91 9043764123' },
    { type: 'line', text: 'Email     :  abijerey@gmail.com' },
    { type: 'line', text: 'GitHub    :  github.com/abijerey' },
    { type: 'line', text: 'LinkedIn  :  linkedin.com/in/abishek-jeremiah-k-298a47291' },
    { type: 'line', text: 'Location  :  Chennai, Tamil Nadu, India' }
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
    let idx = 0;

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

});