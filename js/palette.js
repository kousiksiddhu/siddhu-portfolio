/**
 * ⌘K command palette — navigate, act, and reach out from anywhere.
 * Simple subsequence-fuzzy filter, full keyboard support.
 */

const ICONS = {
  section: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-2a2 2 0 0 0 1.3-1.2L12 3z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
};

function getCommands() {
  const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return [
    { group: 'Navigate', label: 'Go to About', hint: 'section', icon: ICONS.section, run: go('about') },
    { group: 'Navigate', label: 'Go to AI-Enabled Engineering', hint: 'section', icon: ICONS.section, run: go('ai') },
    { group: 'Navigate', label: 'Go to Experience', hint: 'section', icon: ICONS.section, run: go('experience') },
    { group: 'Navigate', label: 'Go to Work / Case Studies', hint: 'section', icon: ICONS.section, run: go('work') },
    { group: 'Navigate', label: 'Go to Contact', hint: 'section', icon: ICONS.section, run: go('contact') },
    {
      group: 'Actions', label: 'Ask the AI twin', hint: 'chat', icon: ICONS.spark,
      run: () => {
        document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => document.getElementById('chat-input')?.focus({ preventScroll: true }), 700);
      },
    },
    {
      group: 'Actions', label: 'Copy email address', hint: 'kousiksiddhu@gmail.com', icon: ICONS.mail,
      run: () => navigator.clipboard?.writeText('kousiksiddhu@gmail.com'),
    },
    {
      group: 'Actions', label: 'Download resume (PDF)', hint: 'ats-friendly', icon: ICONS.download,
      run: () => {
        const a = document.createElement('a');
        a.href = document.querySelector('.nav-cv')?.getAttribute('href') || '#';
        a.download = '';
        a.click();
      },
    },
    {
      group: 'Actions', label: 'Open LinkedIn profile', hint: 'new tab', icon: ICONS.link,
      run: () => window.open('https://linkedin.com/in/siddhu-nallasivam', '_blank', 'noopener'),
    },
  ];
}

/** True if all chars of `query` appear in order within `target`. */
function fuzzy(query, target) {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function initPalette() {
  const overlay = document.getElementById('palette');
  const input = document.getElementById('palette-input');
  const list = document.getElementById('palette-list');
  const openBtn = document.getElementById('palette-open');
  if (!overlay || !input || !list) return;

  const commands = getCommands();
  let filtered = commands;
  let selected = 0;
  let lastFocus = null;

  function render() {
    list.innerHTML = '';
    if (!filtered.length) {
      const empty = document.createElement('li');
      empty.className = 'palette-empty';
      empty.textContent = 'No matches. Try "contact" or "resume".';
      list.appendChild(empty);
      return;
    }
    let lastGroup = null;
    filtered.forEach((cmd, i) => {
      if (cmd.group !== lastGroup) {
        lastGroup = cmd.group;
        const g = document.createElement('li');
        g.className = 'palette-group';
        g.textContent = cmd.group;
        list.appendChild(g);
      }
      const li = document.createElement('li');
      li.className = 'palette-item' + (i === selected ? ' is-selected' : '');
      li.setAttribute('role', 'option');
      li.innerHTML = `${cmd.icon}<span>${cmd.label}</span><span class="palette-item-hint">${cmd.hint}</span>`;
      li.addEventListener('click', () => execute(cmd));
      li.addEventListener('pointerenter', () => {
        selected = i;
        render();
      });
      list.appendChild(li);
    });
  }

  function filter() {
    const q = input.value.trim();
    filtered = q ? commands.filter((c) => fuzzy(q, c.label + ' ' + c.hint)) : commands;
    selected = 0;
    render();
  }

  function open() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    input.value = '';
    filter();
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus?.focus) lastFocus.focus({ preventScroll: true });
  }

  function execute(cmd) {
    close();
    cmd.run();
  }

  openBtn?.addEventListener('click', open);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  input.addEventListener('input', filter);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.hidden ? open() : close();
      return;
    }
    if (overlay.hidden) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selected = Math.min(selected + 1, filtered.length - 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selected = Math.max(selected - 1, 0);
      render();
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      execute(filtered[selected]);
    }
  });
}
