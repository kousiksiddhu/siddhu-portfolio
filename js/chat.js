/**
 * "siddhu-gpt" — a zero-backend AI twin.
 * Keyword-scored retrieval over a curated knowledge base, with a
 * thinking indicator and typewriter rendering. All client-side.
 */

const KB = [
  {
    keywords: ['ai', 'artificial', 'intelligence', 'llm', 'gpt', 'agent', 'agents', 'prompt', 'sdlc', 'automation', 'ml', 'machine'],
    weight: { ai: 3, sdlc: 4, agent: 3, agents: 3, prompt: 3 },
    answer:
      "AI is Siddhu's biggest current focus. He defined and operationalized an **AI Development SDLC** — a structured lifecycle for planning, building, reviewing, and shipping with AI — now used across live client engagements.\n\nHe's built **AI agents and skills** for code review, compliance documentation, and regulatory mapping; created reusable **prompt libraries**; and runs AI adoption strategy sessions covering token optimization and responsible, human-in-the-loop usage. He's also shipped customer-facing AI: a conversational interface for a pharma company and an AWS Lex chatbot for a US bank.",
  },
  {
    keywords: ['lead', 'leader', 'leadership', 'manage', 'manager', 'management', 'team', 'teams', 'mentor', 'mentoring', 'coach', 'people', '1:1', 'style'],
    answer:
      "Siddhu leads squads of **5–15 engineers** with a structured cadence: weekly 1:1s for coaching and unblocking, quarterly skill-will matrices, and individual career plans covering both technical and soft skills.\n\nHis proudest wins are people wins — mentoring **50+ engineers**, several from early-career uncertainty to full end-to-end delivery ownership. The results show up in the numbers: **90%+ CSAT** and a **60% contract extension rate**.",
  },
  {
    keywords: ['project', 'projects', 'biggest', 'draftkings', 'igaming', 'betting', 'sports', 'case', 'study', 'proud', 'best', 'work'],
    answer:
      "The headline is the **Presidio × DraftKings partnership** — 2.5 years, a team scaled from 4 to 50+, and involvement in every major release. Key wins: the Pick6 launch, Project Flutie (a massive Xamarin-to-native iOS migration), and platform expansion across Sportsbook, Casino, Lottery and more.\n\nHe also led a **Global Compliance Engine** with AWS ProServe — GLI-19/33 certification enabling launches in Brazil, Spain, and Peru on a fully cloud-native AWS architecture.",
  },
  {
    keywords: ['experience', 'years', 'career', 'background', 'history', 'journey', 'long', 'trajectory'],
    answer:
      "**11+ years**, from Programmer Analyst Trainee to Technical Engineering Manager. The path: Changepond Technologies (2015–2017) → Sirius Computer Solutions (2017–2021) → Presidio (2021–present), where he's now Associate Delivery Manager / Associate Architect.\n\nAlong the way he's shipped across **six domains** — iGaming, healthcare, financial services, e-commerce, media, and transportation — for clients in 5+ countries.",
  },
  {
    keywords: ['stack', 'tech', 'technology', 'technologies', 'skills', 'tools', 'languages', 'framework', 'aws', 'cloud', 'react', 'swift', 'node'],
    answer:
      "Broad and T-shaped:\n\n**Cloud & backend** — AWS (Lambda, EKS, AppSync, Cognito, SageMaker), Node.js, Python, microservices, serverless\n**Frontend & mobile** — React, Vue, Swift/SwiftUI (TCA), Flutter, TypeScript\n**DevOps** — GitOps with ArgoCD, Terraform, Helm, CI/CD, DORA metrics\n**AI** — agent design, prompt engineering, AI Dev SDLC, token/cost optimization\n\nPlus the leadership layer: delivery management, architecture reviews, and client advisory.",
  },
  {
    keywords: ['open', 'opportunities', 'hire', 'hiring', 'available', 'availability', 'job', 'role', 'relocate', 'remote', 'join'],
    answer:
      "Yes — Siddhu is **open to new opportunities**, especially engineering leadership roles where AI-enabled delivery, team building, and architecture meet.\n\nFastest ways to reach him: email **kousiksiddhu@gmail.com**, or LinkedIn at **/in/siddhu-nallasivam**. There's also a contact form right below this section. He's based in Coimbatore, India (IST) and experienced with US/EU client time zones.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'call', 'connect', 'message'],
    answer:
      "Three ways in:\n\n**Email** — kousiksiddhu@gmail.com\n**LinkedIn** — linkedin.com/in/siddhu-nallasivam\n**Phone** — +91 93848 84604\n\nOr scroll down a touch — the contact form goes straight to his inbox.",
  },
  {
    keywords: ['compliance', 'gli', 'regulated', 'regulatory', 'hipaa', 'pci', 'audit', 'certification', 'brazil', 'spain', 'peru'],
    answer:
      "Regulated industries are Siddhu's home turf. He's currently spearheading **GLI-19 and GLI-33 certification** for iGaming expansion into Brazil, Peru, and Spain — including automated code signatures, image hashing, and audit trails that make regulator audits frictionless.\n\nPrior work includes **HIPAA-compliant** healthcare pipelines and **PCI-DSS** payment integrations. He even uses AI workflows to generate compliance documentation and regulatory mappings.",
  },
  {
    keywords: ['where', 'location', 'based', 'live', 'coimbatore', 'india', 'city', 'timezone'],
    answer:
      "Siddhu is based in **Coimbatore, India** (IST, UTC+5:30), working hybrid with Presidio. He's spent his career collaborating with US and European clients, so cross-time-zone delivery is second nature.",
  },
  {
    keywords: ['coffee', 'hobby', 'hobbies', 'fun', 'personal', 'outside', 'free', 'like', 'human', 'family', 'travel'],
    answer:
      "Off the clock, Siddhu is a **dark-roast coffee** enthusiast who takes weekend road trips around Tamil Nadu, and keeps a folder of side projects that may or may not ever ship. (Relatable.)\n\nHe'd tell you the coffee is a productivity tool. The road trips are where the architecture ideas come from.",
  },
  {
    keywords: ['ios', 'mobile', 'swift', 'swiftui', 'xamarin', 'flutter', 'app', 'native', 'tca'],
    answer:
      "Deep mobile chops: Siddhu led a full **Xamarin → native iOS migration** for a major US iGaming platform using Swift, SwiftUI, and the TCA pattern — 3 apps migrated, 2 new products shipped, with reusable component libraries shared across product lines.\n\nHe also architected a modular **Flutter framework** for a medical instruments company, and built B2B mobile apps with Ionic and Angular earlier in his career.",
  },
  {
    keywords: ['csat', 'client', 'clients', 'satisfaction', 'metric', 'metrics', 'results', 'numbers', 'impact'],
    answer:
      "The numbers Siddhu cares about:\n\n**90%+ CSAT** sustained across the majority of client engagements\n**60% contract extension rate** — the strongest trust signal there is\n**50+ engineers** mentored and developed\n**11+ years** of delivery across 6 domains\n\nHis approach: proactive risk communication, transparent trade-offs, and delivery-led growth.",
  },
  {
    keywords: ['who', 'about', 'siddhu', 'tell', 'introduce', 'summary', 'overview', 'yourself'],
    answer:
      "**Siddhu Nallasivam** is a Technical Engineering Manager at Presidio with 11+ years of experience — equal parts people leader, architect, and AI-enablement champion.\n\nHe leads teams of 5–15 building cloud-native platforms in regulated industries (iGaming, healthcare, finserv), sustains 90%+ CSAT, and is currently rolling out an AI Development SDLC across engagements. Ask me about his **AI work**, **leadership style**, or **biggest projects**.",
  },
  {
    keywords: ['site', 'website', 'portfolio', 'built', 'you', 'bot', 'chatbot', 'real', 'model', 'how do you work'],
    answer:
      "I'm a lightweight AI twin — a retrieval bot running **100% in your browser**. No API calls, no tokens, no data leaves this page. Fitting, since Siddhu's whole thing is knowing when AI needs a heavyweight model and when it doesn't.\n\nThe site itself is hand-built: vanilla JS, one canvas, zero frameworks. Ask me something real — like his **AI work** or **biggest project**.",
  },
];

const FALLBACK =
  "Hmm — that one's outside my context window. I'm best at questions about Siddhu's **experience**, **AI work**, **leadership style**, **projects**, or **how to reach him**.\n\nFor anything deeper, the real Siddhu responds fast: **kousiksiddhu@gmail.com**.";

const GREETING =
  "Hey! I'm **siddhu-gpt**, an AI twin trained on 11 years of Siddhu's shipping history. Ask me anything — his AI work, leadership style, the DraftKings story — or tap a suggestion below.";

function matchAnswer(query) {
  const words = query.toLowerCase().replace(/[^a-z0-9\s:]/g, ' ').split(/\s+/).filter(Boolean);
  let best = null;
  let bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const w of words) {
      if (entry.keywords.includes(w)) score += (entry.weight && entry.weight[w]) || 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best.answer : FALLBACK;
}

/** Minimal safe markdown: escape HTML, then **bold** and newlines. */
function renderMarkdown(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

export function initChat() {
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const chips = document.getElementById('chat-chips');
  if (!log || !form) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let busy = false;

  function scrollToEnd() {
    log.scrollTop = log.scrollHeight;
  }

  function addUser(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--user';
    el.textContent = text;
    log.appendChild(el);
    scrollToEnd();
  }

  function addThinking() {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-msg--thinking';
    el.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(el);
    scrollToEnd();
    return el;
  }

  function typeBot(answer, done) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot';
    log.appendChild(el);

    if (reducedMotion) {
      el.innerHTML = renderMarkdown(answer);
      scrollToEnd();
      if (done) done();
      return;
    }

    let i = 0;
    const CHUNK = 3;
    function tick() {
      i = Math.min(i + CHUNK, answer.length);
      el.innerHTML = renderMarkdown(answer.slice(0, i));
      scrollToEnd();
      if (i < answer.length) {
        setTimeout(tick, 14);
      } else if (done) {
        done();
      }
    }
    tick();
  }

  function ask(question) {
    if (busy || !question.trim()) return;
    busy = true;
    addUser(question.trim());
    const answer = matchAnswer(question);
    const thinking = addThinking();
    setTimeout(() => {
      thinking.remove();
      typeBot(answer, () => { busy = false; });
    }, 550 + Math.random() * 450);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
    input.value = '';
  });

  chips?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chat-chip');
    if (chip) ask(chip.dataset.q || chip.textContent);
  });

  // Greet once the chat scrolls into view
  const io = new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      obs.disconnect();
      setTimeout(() => typeBot(GREETING), 350);
    }
  }, { threshold: 0.3 });
  io.observe(log);

  // Hero CTA → scroll to chat and focus input
  document.getElementById('hero-ask-ai')?.addEventListener('click', () => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => input.focus({ preventScroll: true }), 700);
  });
}
