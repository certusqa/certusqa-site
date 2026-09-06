const BEATS = [
  { t: 8, eng: 0, step: 'Intro: Nine engines', did: 'Closed-loop demo with on-screen voiceover for every engine.', value: 'Buyers can follow without reading code.' },
  { t: 13, eng: 1, step: 'Engine 01: Impact', did: 'Risk-ranked cart/checkout PR — must-run specs only.', value: 'Fewer CI minutes without revenue blind spots.' },
  { t: 18, eng: 2, step: 'Engine 02: Regression Memory', did: 'Prior pricing fingerprint matched; guard spec forced in.', value: 'Same defect cannot ship twice.' },
  { t: 21, eng: 0, step: 'Journey: Sign-up', did: 'Ephemeral practice account created.', value: 'Real SaaS onboarding coverage.' },
  { t: 33, eng: 3, step: 'Engine 03: Self-Healing', did: 'Stale search selector healed via semantic fallback.', value: 'Cuts locator maintenance toil.' },
  { t: 43, eng: 3, step: 'Engine 03: Self-Healing', did: 'Add to cart healed; bank promotes for next run.', value: 'Tier-0 flywheel · max 2 tries.' },
  { t: 54, eng: 4, step: 'Engine 04: Bug Hunter', did: 'Expected Rs. 500 vs observed Rs. 250 — DEFECT_CONFIRMED.', value: 'Exact math asserts catch revenue bugs.' },
  { t: 59, eng: 5, step: 'Engine 05: Proof Artifacts', did: 'Schema 1.0.0 evidence for heals + defect.', value: 'Jira-ready root cause, not stack-trace noise.' },
  { t: 64, eng: 6, step: 'Engine 06: Quality Gate', did: 'Aggregated verdict BLOCK_DEPLOY.', value: 'One proof-backed ship/block call.' },
  { t: 69, eng: 7, step: 'Engine 07: Ticket-to-Gate', did: 'Same loop as ticket → runnable spec → gate.', value: 'Design-partner demo under 30 minutes.' },
  { t: 74, eng: 8, step: 'Engine 08: Sprint Trend', did: 'Chronic heal flagged as advisory escalation.', value: 'Deferred locator debt becomes visible.' },
  { t: 80, eng: 9, step: 'Engine 09: Governance', did: 'Execution Judge + offline triage · scopes deny-by-default.', value: 'Agents cannot quietly weaken the suite.' },
  { t: 86, eng: 0, step: 'Outro', did: 'Closed loop complete · BLOCK_DEPLOY.', value: 'Certainty, verified.' },
];

const beatsEl = document.getElementById('beats');
const vid = document.getElementById('vid');
const rail = document.getElementById('rail');

BEATS.forEach((b, i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'beat';
  btn.dataset.i = String(i);
  btn.innerHTML = `<div class="t">${fmt(b.t)}</div><div class="s">${b.step}</div><div class="d">${b.did}</div><div class="v">${b.value}</div>`;
  btn.addEventListener('click', () => { vid.currentTime = b.t; vid.play(); });
  beatsEl.appendChild(btn);
});

function fmt(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function activeIndex(t) {
  let idx = 0;
  for (let i = 0; i < BEATS.length; i += 1) {
    if (t >= BEATS[i].t) idx = i;
  }
  return idx;
}

vid.addEventListener('timeupdate', () => {
  const i = activeIndex(vid.currentTime);
  [...beatsEl.children].forEach((el, j) => el.classList.toggle('active', j === i));
  const eng = BEATS[i].eng;
  [...rail.children].forEach((el) => {
    const n = Number(el.dataset.e);
    el.classList.toggle('on', eng > 0 && n === eng);
  });
});
