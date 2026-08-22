"use client";

import { useEffect, useMemo, useState } from "react";

const CASES = [
  { id: "n1", date: "18 Aug", title: "Left MCA aneurysm clipping", role: "Primary surgeon", tag: "Vascular", pearl: "Sylvian fissure dissection felt cleaner with earlier distal control." },
  { id: "n2", date: "04 Aug", title: "Cervical intradural tumour", role: "First assistant", tag: "Spine", pearl: "Positioning and exposure determined the entire rhythm of the case." },
  { id: "n3", date: "21 Jul", title: "Acute SDH evacuation", role: "Primary surgeon", tag: "Trauma", pearl: "Time to decompression mattered more than elegance." },
];

const MILESTONES = [
  ["100th case", "Reached", "Operative exposure"],
  ["First independent EDH", "Verified", "Trauma"],
  ["First aneurysm clipping", "Verified", "Vascular"],
  ["Training year 6", "Current", "Programme"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8c.8 4.2 2.9 6.3 7.1 7.1-4.2.8-6.3 2.9-7.1 7.1-.8-4.2-2.9-6.3-7.1-7.1 4.2-.8 6.3-2.9 7.1-7.1Z" fill="currentColor" />
      <path d="M18.2 15.7c.35 1.8 1.25 2.7 3.05 3.05-1.8.35-2.7 1.25-3.05 3.05-.35-1.8-1.25-2.7-3.05-3.05 1.8-.35 2.7-1.25 3.05-3.05Z" fill="currentColor" opacity=".5" />
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5.5" y="10" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export default function NuktaPage() {
  const [activeCase, setActiveCase] = useState(CASES[0]);
  const [mode, setMode] = useState<"logbook" | "passport" | "khayaal">("logbook");
  const [remembered, setRemembered] = useState(false);
  const [passportOpen, setPassportOpen] = useState(false);

  const caseCount = useMemo(() => 284, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="nukta-site">
      <div className="paper-noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="brand" aria-label="Nukta home">
          <BrandMark />
          <span>
            <b>Nukta</b>
            <small>by TEIHSRA</small>
          </span>
        </a>

        <nav>
          <a href="#memory">Memory</a>
          <a href="#passport">Passport</a>
          <a href="#khayaal">Khayaal</a>
          <a href="#growth">Growth</a>
        </nav>

        <a className="quiet-cta" href="mailto:hello@teihsra.com?subject=Nukta%20Early%20Access">
          Early access
          <Arrow />
        </a>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">Personal Surgical Intelligence</span>
          <h1>
            Your cases should
            <br />
            <em>teach you twice.</em>
          </h1>
          <p className="lede">
            Nukta is a surgeon-owned record of cases, reflections, mentor pearls, milestones and operative growth—built to become more valuable with every year of practice.
          </p>

          <div className="hero-actions">
            <a className="main-cta" href="mailto:hello@teihsra.com?subject=Nukta%20Early%20Access">
              Join early access
              <span><Arrow /></span>
            </a>
            <a className="secondary-link" href="#memory">
              See how memory works
              <span>↓</span>
            </a>
          </div>

          <div className="hero-principles">
            <span>Surgeon-owned</span>
            <span>Private by design</span>
            <span>Career-long</span>
          </div>
        </div>

        <div className="hero-object" data-reveal>
          <div className="memory-card">
            <div className="memory-head">
              <div>
                <small>RESURFACED FROM YOUR OWN CASES</small>
                <h2>{activeCase.title}</h2>
                <p>{activeCase.date} · {activeCase.role} · {activeCase.tag}</p>
              </div>
              <span className="memory-pill">From your archive</span>
            </div>

            <div className="case-pearl">
              <span className="pearl-icon"><Spark /></span>
              <div>
                <small>YOU WROTE</small>
                <p>{activeCase.pearl}</p>
              </div>
            </div>

            <div className="memory-actions">
              <button onClick={() => setRemembered((v) => !v)} className={remembered ? "active" : ""}>
                {remembered ? "Recalled" : "Keep this in mind"}
              </button>
              <button>Open full case</button>
            </div>

            <div className="memory-footer">
              <span>{caseCount} cases in your Nukta</span>
              <span>Updated 2 days ago</span>
            </div>
          </div>

          <div className="floating-case-list">
            <small>RECENT CASES</small>
            {CASES.map((item) => (
              <button
                key={item.id}
                className={item.id === activeCase.id ? "active" : ""}
                onClick={() => setActiveCase(item)}
              >
                <span>{item.date}</span>
                <span>
                  <b>{item.title}</b>
                  <small>{item.role}</small>
                </span>
                <em>{item.tag}</em>
              </button>
            ))}
          </div>

          <div className="floating-private">
            <span className="lock-icon"><Lock /></span>
            <span>
              <small>KHAYAAL</small>
              <b>Your private reflection space</b>
              <p>Separate from Passport, mentors, exports and default analytics.</p>
            </span>
          </div>
        </div>
      </section>

      <section className="editorial-intro">
        <div className="editorial-label" data-reveal>
          <span>THE PREMISE</span>
          <i />
        </div>

        <div className="editorial-grid">
          <h2 data-reveal>
            A logbook records
            <br />
            <em>what you did.</em>
            <br />
            Nukta remembers what it meant.
          </h2>
          <div data-reveal>
            <p>
              Surgical experience is not just case count. It is judgement, repetition, hesitation, first attempts, mentor guidance, small technical discoveries and the gradual formation of your own operating style.
            </p>
            <p>
              Nukta brings those fragments together into one personal surgical memory.
            </p>
          </div>
        </div>
      </section>

      <section id="memory" className="memory-section">
        <div className="memory-copy" data-reveal>
          <span className="section-label">01 / SURGICAL MEMORY</span>
          <h2>
            The case you did three years ago
            <br />
            <em>should still be useful tomorrow.</em>
          </h2>
          <p>
            Before a similar operation, Nukta can bring back your own prior cases, reflections, outcomes, mentor pearls and technical notes—so your experience does not disappear into chronology.
          </p>
        </div>

        <div className="memory-browser" data-reveal>
          <div className="browser-head">
            <div>
              <small>PRE-OP RECALL</small>
              <h3>Tomorrow · MCA aneurysm clipping</h3>
            </div>
            <span>6 related cases</span>
          </div>

          <div className="recall-stack">
            <article>
              <small>YOUR CASE · 11 MONTHS AGO</small>
              <h4>Left MCA aneurysm clipping</h4>
              <p>Temporary clip placed early. Distal Sylvian dissection was easier than on previous case.</p>
              <span>Open case</span>
            </article>

            <article>
              <small>MENTOR PEARL</small>
              <h4>“Secure proximal control before the field feels urgent.”</h4>
              <p>Saved from Dr Rao · verified mentor note</p>
              <span>View context</span>
            </article>

            <article>
              <small>YOUR PATTERN</small>
              <h4>5 MCA aneurysm cases</h4>
              <p>3 primary · 2 assisted · most recent 4 months ago</p>
              <span>See curve</span>
            </article>
          </div>

          <div className="browser-footer">
            <span>Built only from your Nukta record</span>
            <button>Prepare for tomorrow <Arrow /></button>
          </div>
        </div>
      </section>

      <section id="passport" className="passport-section">
        <div className="passport-card-wrap" data-reveal>
          <div className={`passport-card ${passportOpen ? "open" : ""}`}>
            <div className="passport-cover">
              <small>NUKTA PASSPORT</small>
              <h3>Dr A. Dhamnaskar</h3>
              <p>Neurosurgery · Training record</p>

              <div className="passport-stat">
                <span><b>284</b><small>cases</small></span>
                <span><b>46</b><small>primary</small></span>
                <span><b>128</b><small>assisted</small></span>
              </div>

              <button onClick={() => setPassportOpen((v) => !v)}>
                {passportOpen ? "Close Passport" : "Open Passport"}
                <Arrow />
              </button>
            </div>

            <div className="passport-inside">
              <div>
                <small>VERIFIED EXPERIENCE</small>
                <h4>Operative record</h4>
                <p>Supervisor-verified case participation and milestones can form a portable professional record without exposing your private reflections.</p>
              </div>

              <div className="passport-lines">
                <span><b>Trauma</b><em>78 cases</em></span>
                <span><b>Spine</b><em>64 cases</em></span>
                <span><b>Vascular</b><em>31 cases</em></span>
                <span><b>CSF / Shunts</b><em>42 cases</em></span>
              </div>
            </div>
          </div>
        </div>

        <div className="passport-copy" data-reveal>
          <span className="section-label">02 / NUKTA PASSPORT</span>
          <h2>
            Your experience should travel
            <br />
            <em>with you.</em>
          </h2>
          <p>
            Nukta Passport turns verified operative experience into a portable record for training transitions, fellowships, credentialing and career milestones—while your private reflections stay private.
          </p>

          <div className="feature-lines">
            <div><b>Supervisor verification</b><span>Cases and milestones can carry evidence from the people who trained you.</span></div>
            <div><b>Exportable record</b><span>Create a structured professional logbook without exporting your personal reflections.</span></div>
            <div><b>Career continuity</b><span>Your surgical record does not end when residency does.</span></div>
          </div>
        </div>
      </section>

      <section id="khayaal" className="khayaal-section">
        <div className="khayaal-copy" data-reveal>
          <span className="section-label">03 / KHAYAAL</span>
          <h2>
            Some lessons are too honest
            <br />
            <em>for a formal logbook.</em>
          </h2>
          <p>
            Khayaal is Nukta’s ultra-private space for the thoughts surgeons rarely write elsewhere: uncertainty, regret, technical frustration, confidence, fear, instinct and the lesson you want your future self to remember.
          </p>
        </div>

        <div className="khayaal-note" data-reveal>
          <div className="khayaal-lock"><Lock /></div>
          <small>KHAYAAL · ONLY YOU</small>
          <blockquote>
            “I rushed the opening because the CT looked dramatic. The next time, I want to slow the first five minutes down.”
          </blockquote>
          <div className="khayaal-meta">
            <span>Linked to Acute SDH evacuation</span>
            <span>Not in Passport</span>
            <span>Not visible to mentor</span>
          </div>
          <button>Write a private reflection</button>
        </div>
      </section>

      <section id="growth" className="growth-section">
        <div className="growth-head" data-reveal>
          <span className="section-label">04 / GROWTH</span>
          <h2>
            Your learning curve
            <br />
            should belong to you.
          </h2>
        </div>

        <div className="growth-grid">
          <div className="curve-card" data-reveal>
            <div className="curve-head">
              <div>
                <small>OPERATIVE EXPOSURE</small>
                <h3>Craniotomy · 24 months</h3>
              </div>
              <span>Personal view</span>
            </div>

            <div className="curve-chart" aria-label="Illustrative operative growth chart">
              <div className="axis-y">
                <span>High</span>
                <span>Mid</span>
                <span>Early</span>
              </div>
              <div className="chart-area">
                <i className="grid g1" />
                <i className="grid g2" />
                <i className="grid g3" />
                <svg viewBox="0 0 600 230" preserveAspectRatio="none">
                  <path d="M0,195 C70,188 95,166 145,174 C220,186 245,126 315,128 C380,130 405,92 465,84 C520,76 555,48 600,38" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                  <path d="M0,195 C70,188 95,166 145,174 C220,186 245,126 315,128 C380,130 405,92 465,84 C520,76 555,48 600,38 L600,230 L0,230 Z" fill="currentColor" opacity=".08" />
                </svg>
                <div className="curve-dots">
                  <span style={{left:"13%", top:"72%"}} />
                  <span style={{left:"41%", top:"53%"}} />
                  <span style={{left:"69%", top:"35%"}} />
                  <span style={{left:"92%", top:"14%"}} />
                </div>
              </div>
            </div>

            <div className="curve-footer">
              <span>Primary participation increasing</span>
              <span>Based on your recorded cases</span>
            </div>
          </div>

          <div className="milestone-card" data-reveal>
            <small>MILESTONES</small>
            {MILESTONES.map(([title,status,type]) => (
              <div key={title}>
                <span className="milestone-dot" />
                <span><b>{title}</b><small>{type}</small></span>
                <em>{status}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transition-section">
        <div className="transition-copy" data-reveal>
          <span className="section-label">05 / TRANSITION</span>
          <h2>
            Training ends.
            <br />
            <em>Your surgical memory should not.</em>
          </h2>
          <p>
            As formal training approaches its end, Nukta can help surface unfinished exposure goals, missing verifications, important cases worth reflecting on and the record you will carry into your next role.
          </p>
        </div>

        <div className="transition-panel" data-reveal>
          <div className="transition-head">
            <div>
              <small>TRAINING TRANSITION</small>
              <h3>4 months remaining</h3>
            </div>
            <span>Year 6</span>
          </div>

          <div className="transition-items">
            <article>
              <span>01</span>
              <div><b>Close verification gaps</b><small>7 cases still need mentor verification</small></div>
            </article>
            <article>
              <span>02</span>
              <div><b>Review exposure gaps</b><small>2 areas below your programme target</small></div>
            </article>
            <article>
              <span>03</span>
              <div><b>Polish your Passport</b><small>Prepare a portable record before leaving</small></div>
            </article>
          </div>

          <button>View transition plan <Arrow /></button>
        </div>
      </section>

      <section className="principles-section">
        <div className="principles-grid">
          <article data-reveal>
            <span>01</span>
            <h3>Personal first</h3>
            <p>Nukta is built around the surgeon’s own growth, not around hospital ownership of the surgeon’s professional memory.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Private where it matters</h3>
            <p>Khayaal stays separate from Passport, mentor access, institutional exports and default AI surfaces.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Useful for years</h3>
            <p>The value of the record should increase as your cases, milestones, patterns and reflections accumulate.</p>
          </article>
        </div>
      </section>

      <section className="closing">
        <div className="closing-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div data-reveal>
          <span>EARLY ACCESS</span>
          <h2>
            Build the surgical record
            <br />
            <em>you will still want in ten years.</em>
          </h2>
          <p>
            Nukta is being developed for surgeons and trainees who want their operative experience to become something more than a case count.
          </p>
          <a href="mailto:hello@teihsra.com?subject=Nukta%20Early%20Access">
            Join the early access list
            <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <BrandMark />
          <span><b>Nukta</b><small>by TEIHSRA</small></span>
        </div>
        <div className="footer-links">
          <a href="https://teihsra.com">TEIHSRA</a>
          <a href="mailto:hello@teihsra.com">Contact</a>
          <a href="https://teihsra.com/privacy">Privacy</a>
          <a href="https://teihsra.com/terms">Terms</a>
        </div>
        <div className="footer-note">
          <span>Personal Surgical Intelligence</span>
          <span>Early access development</span>
        </div>
      </footer>

      <style jsx global>{`
        :root{
          --ivory:#f5f0e7;
          --ivory-2:#fbf8f2;
          --ink:#20231f;
          --muted:#72766f;
          --line:rgba(32,35,31,.12);
          --sage:#83907b;
          --sage-soft:#e1e5dc;
          --rose:#a8655e;
          --rose-soft:#ead5d0;
          --brass:#b28b4d;
          --brass-soft:#eadfc7;
          --plum:#665868;
          --plum-soft:#e4dce5;
          --stone:#e9e1d5;
        }

        *{box-sizing:border-box}
        html{scroll-behavior:smooth;background:var(--ivory)}
        body{margin:0;background:var(--ivory);color:var(--ink)}
        body,button,input,textarea{font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        a{color:inherit;text-decoration:none}
        button{font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}
        svg{display:block}

        .nukta-site{
          position:relative;
          overflow:hidden;
          background:
            radial-gradient(circle at 82% 8%, rgba(102,88,104,.07), transparent 28rem),
            radial-gradient(circle at 12% 28%, rgba(178,139,77,.06), transparent 30rem),
            var(--ivory);
        }

        .paper-noise{
          position:fixed;inset:0;pointer-events:none;z-index:50;opacity:.14;mix-blend-mode:multiply;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.10'/%3E%3C/svg%3E");
        }

        [data-reveal]{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
        [data-reveal].revealed{opacity:1;transform:none}

        .topbar{
          width:min(1420px,calc(100% - 56px));margin:0 auto;min-height:76px;
          display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px;position:relative;z-index:20;
        }
        .brand{display:inline-flex;align-items:center;gap:11px;width:max-content}
        .brand>span:last-child{display:grid;gap:1px}
        .brand b{font-family:Georgia,"Times New Roman",serif;font-size:23px;font-weight:400;letter-spacing:-.03em}
        .brand small{font-size:7px;letter-spacing:.12em;text-transform:uppercase;color:#8c918b}

        .brand-mark{position:relative;width:28px;height:28px;display:block}
        .brand-mark i{position:absolute;width:7px;height:7px;border-radius:50%}
        .brand-mark i:nth-child(1){left:1px;top:10px;background:var(--rose)}
        .brand-mark i:nth-child(2){right:2px;top:2px;background:var(--plum)}
        .brand-mark i:nth-child(3){right:2px;bottom:2px;background:var(--brass)}
        .brand-mark::before,.brand-mark::after{content:"";position:absolute;left:6px;top:13px;width:18px;height:1px;background:rgba(32,35,31,.35);transform-origin:left center}
        .brand-mark::before{transform:rotate(-31deg)}
        .brand-mark::after{transform:rotate(31deg)}

        .topbar nav{display:flex;gap:28px;font-size:11px;color:#5c625c}
        .topbar nav a{position:relative;padding:8px 0}
        .topbar nav a::after{content:"";position:absolute;left:0;right:100%;bottom:3px;height:1px;background:var(--ink);transition:right .25s ease}
        .topbar nav a:hover::after{right:0}

        .quiet-cta{
          justify-self:end;display:inline-flex;align-items:center;gap:11px;padding:10px 13px 10px 17px;
          border:1px solid var(--line);border-radius:999px;background:rgba(251,248,242,.65);backdrop-filter:blur(12px);
          font-size:10px;transition:transform .22s ease,background .22s ease;
        }
        .quiet-cta:hover{transform:translateY(-2px);background:#fffdf8}
        .quiet-cta svg{width:16px}

        .hero{
          width:min(1420px,calc(100% - 56px));margin:0 auto;min-height:850px;padding:96px 0 120px;
          display:grid;grid-template-columns:.92fr 1.08fr;gap:50px;align-items:center;position:relative;
        }
        .hero::after{
          content:"";position:absolute;width:690px;height:690px;border:1px solid rgba(32,35,31,.05);border-radius:50%;
          right:-170px;top:-60px;box-shadow:inset 0 0 0 90px rgba(255,255,255,.10),inset 0 0 0 180px rgba(102,88,104,.02);pointer-events:none;
        }

        .eyebrow,.section-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#7f847e}
        .hero h1,.editorial-grid h2,.memory-copy h2,.passport-copy h2,.khayaal-copy h2,.growth-head h2,.transition-copy h2,.closing h2{
          font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.055em;margin:0;
        }
        .hero h1{font-size:clamp(66px,6.4vw,108px);line-height:.91;margin-top:26px}
        em{color:var(--plum);font-weight:400}
        .lede{max-width:600px;margin:38px 0 0;color:#585f58;font-size:18px;line-height:1.65}

        .hero-actions{display:flex;align-items:center;gap:28px;margin-top:36px}
        .main-cta{
          min-height:54px;display:inline-flex;align-items:center;gap:15px;padding:8px 8px 8px 20px;border-radius:999px;
          background:var(--ink);color:#fffaf1;font-size:11px;box-shadow:0 18px 38px rgba(32,35,31,.15);transition:transform .22s ease;
        }
        .main-cta:hover{transform:translateY(-3px)}
        .main-cta>span{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#fffaf1;color:var(--ink)}
        .main-cta svg,.secondary-link svg{width:16px}
        .secondary-link{font-size:11px;display:inline-flex;gap:9px;align-items:center;color:#5e645e}
        .secondary-link span{transition:transform .2s ease}
        .secondary-link:hover span{transform:translateY(4px)}

        .hero-principles{display:flex;flex-wrap:wrap;gap:8px;margin-top:52px}
        .hero-principles span{padding:7px 10px;border:1px solid var(--line);border-radius:999px;font-size:8px;color:#737973;background:rgba(251,248,242,.55)}

        .hero-object{min-height:650px;position:relative;z-index:2}
        .memory-card{
          width:min(620px,90%);margin:78px 0 0 auto;padding:28px;border-radius:28px;
          border:1px solid rgba(32,35,31,.10);background:rgba(255,253,249,.92);backdrop-filter:blur(18px);
          box-shadow:0 32px 85px rgba(56,48,40,.13);transform:rotate(.35deg);
        }
        .memory-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding-bottom:22px;border-bottom:1px solid var(--line)}
        .memory-head small,.floating-case-list>small,.floating-private small,.browser-head small,.passport-cover small,.passport-inside small,.khayaal-note>small,.curve-head small,.milestone-card>small,.transition-head small{
          font-size:7px;letter-spacing:.15em;text-transform:uppercase;color:#92968f;
        }
        .memory-head h2{font-family:Georgia,"Times New Roman",serif;font-size:29px;font-weight:400;letter-spacing:-.04em;margin:5px 0 5px}
        .memory-head p{margin:0;font-size:9px;color:#888d87}
        .memory-pill{padding:7px 9px;border-radius:999px;background:var(--plum-soft);color:#6b5e6d;font-size:8px;white-space:nowrap}

        .case-pearl{margin-top:22px;padding:18px;border-radius:18px;background:#f6f0e8;display:grid;grid-template-columns:auto 1fr;gap:13px}
        .pearl-icon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--brass-soft);color:var(--brass)}
        .pearl-icon svg{width:17px}
        .case-pearl>div{display:grid;gap:6px}
        .case-pearl p{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:16px;line-height:1.5;color:#454944}

        .memory-actions{display:flex;gap:8px;margin-top:18px}
        .memory-actions button{border:1px solid var(--line);background:transparent;border-radius:999px;padding:9px 11px;font-size:7px;cursor:pointer}
        .memory-actions button.active{background:var(--sage-soft);border-color:rgba(131,144,123,.25)}
        .memory-footer{margin-top:18px;padding-top:15px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;font-size:7px;color:#868b85}

        .floating-case-list,.floating-private{
          position:absolute;border:1px solid rgba(32,35,31,.09);background:rgba(255,253,249,.96);backdrop-filter:blur(18px);box-shadow:0 20px 50px rgba(55,48,40,.12);
        }
        .floating-case-list{left:-22px;top:8px;width:290px;border-radius:22px;padding:15px;transform:rotate(-1.1deg)}
        .floating-case-list button{
          width:100%;min-height:60px;border:0;border-top:1px solid rgba(32,35,31,.07);background:transparent;
          display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:8px;text-align:left;cursor:pointer;opacity:.58;transition:.2s ease;
        }
        .floating-case-list button.active,.floating-case-list button:hover{opacity:1;transform:translateX(3px)}
        .floating-case-list button>span:first-child{font-family:Georgia,"Times New Roman",serif;color:#90958f;font-size:10px}
        .floating-case-list button>span:nth-child(2){display:grid;gap:2px}
        .floating-case-list button b{font-size:8px}
        .floating-case-list button small{font-size:6px;color:#969b95}
        .floating-case-list button em{font-family:Inter,sans-serif;font-style:normal;padding:5px 7px;border-radius:999px;background:#f0ebe1;color:#7b786f;font-size:6px;white-space:nowrap}

        .floating-private{right:-18px;bottom:28px;width:300px;border-radius:20px;padding:15px;display:grid;grid-template-columns:auto 1fr;gap:11px;transform:rotate(1.2deg)}
        .lock-icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--plum-soft);color:var(--plum)}
        .lock-icon svg{width:16px}
        .floating-private>span:last-child{display:grid;gap:4px}
        .floating-private b{font-size:9px}
        .floating-private p{margin:0;color:#858a84;font-size:7px;line-height:1.45}

        .editorial-intro{width:min(1420px,calc(100% - 56px));margin:0 auto;padding:120px 0 150px;border-top:1px solid var(--line)}
        .editorial-label{display:grid;grid-template-columns:auto 1fr;gap:17px;align-items:center}
        .editorial-label span{font-size:8px;letter-spacing:.16em;color:#838882}
        .editorial-label i{height:1px;background:var(--line)}
        .editorial-grid{margin-top:48px;display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:start}
        .editorial-grid h2{font-size:clamp(52px,5.2vw,85px);line-height:.95}
        .editorial-grid>div p{margin:0 0 18px;color:#606660;font-size:14px;line-height:1.75}

        .memory-section,.passport-section,.khayaal-section,.growth-section,.transition-section{
          padding:150px max(28px,calc((100vw - 1420px) / 2));
        }

        .memory-section{background:#ebe2d5;display:grid;grid-template-columns:.72fr 1.28fr;gap:75px;align-items:center}
        .memory-copy h2,.passport-copy h2,.khayaal-copy h2,.growth-head h2,.transition-copy h2{font-size:clamp(48px,4.7vw,76px);line-height:.98;margin-top:22px}
        .memory-copy p,.passport-copy p,.khayaal-copy p,.transition-copy p{margin:26px 0 0;max-width:540px;color:#626862;font-size:13px;line-height:1.72}

        .memory-browser{border:1px solid var(--line);border-radius:28px;background:#fffdf9;padding:24px;box-shadow:0 28px 70px rgba(61,52,43,.10)}
        .browser-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:18px;border-bottom:1px solid var(--line)}
        .browser-head h3{font-family:Georgia,"Times New Roman",serif;font-size:27px;font-weight:400;margin:5px 0 0}
        .browser-head>span{padding:7px 9px;border-radius:999px;background:var(--plum-soft);font-size:7px;color:#6c6070}
        .recall-stack{display:grid;gap:9px;margin-top:18px}
        .recall-stack article{padding:17px;border:1px solid rgba(32,35,31,.08);border-radius:16px;background:#faf7f0;transition:.2s ease}
        .recall-stack article:hover{transform:translateX(4px);background:#fffdf9}
        .recall-stack small{font-size:6px;letter-spacing:.14em;color:#999d98}
        .recall-stack h4{font-family:Georgia,"Times New Roman",serif;font-size:20px;font-weight:400;margin:8px 0 8px}
        .recall-stack p{margin:0;color:#777d77;font-size:8px;line-height:1.55}
        .recall-stack span{display:block;margin-top:10px;font-size:7px;color:#6c6470}
        .browser-footer{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:18px;padding-top:16px;border-top:1px solid var(--line)}
        .browser-footer>span{font-size:7px;color:#7f847e}
        .browser-footer button{border:0;border-radius:999px;background:var(--ink);color:#fffaf1;display:inline-flex;gap:8px;align-items:center;padding:10px 12px;font-size:7px}
        .browser-footer svg{width:13px}

        .passport-section{background:#f5f0e7;display:grid;grid-template-columns:1.15fr .85fr;gap:75px;align-items:center}
        .passport-card-wrap{perspective:1400px}
        .passport-card{position:relative;width:min(640px,100%);height:410px;margin:0 auto;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
        .passport-card.open{transform:rotateY(-18deg) translateX(-18px)}
        .passport-cover,.passport-inside{position:absolute;inset:0;border-radius:24px;padding:30px;backface-visibility:hidden}
        .passport-cover{
          background:linear-gradient(135deg,#2a2828,#3a3339 58%,#4d3e49);color:#fff9f0;
          box-shadow:0 34px 72px rgba(43,35,41,.22);border:1px solid rgba(255,255,255,.08);
        }
        .passport-cover::after{content:"";position:absolute;inset:16px;border:1px solid rgba(255,255,255,.09);border-radius:15px;pointer-events:none}
        .passport-cover h3{font-family:Georgia,"Times New Roman",serif;font-size:34px;font-weight:400;margin:80px 0 5px;letter-spacing:-.04em}
        .passport-cover p{margin:0;color:rgba(255,255,255,.56);font-size:9px}
        .passport-stat{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:44px}
        .passport-stat span{display:grid;gap:3px}
        .passport-stat b{font-family:Georgia,"Times New Roman",serif;font-size:28px;font-weight:400}
        .passport-stat small{color:rgba(255,255,255,.45);font-size:6px;text-transform:uppercase;letter-spacing:.12em}
        .passport-cover button{position:absolute;right:28px;bottom:26px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;border-radius:999px;padding:9px 11px;display:inline-flex;gap:8px;align-items:center;font-size:7px;z-index:2}
        .passport-cover svg{width:13px}

        .passport-inside{background:#fffdf9;border:1px solid var(--line);transform:rotateY(180deg);box-shadow:0 28px 60px rgba(55,48,40,.12)}
        .passport-card.open .passport-inside{transform:rotateY(180deg)}
        .passport-inside h4{font-family:Georgia,"Times New Roman",serif;font-size:29px;font-weight:400;margin:7px 0 8px}
        .passport-inside p{margin:0;color:#777d77;font-size:9px;line-height:1.6}
        .passport-lines{margin-top:42px;display:grid}
        .passport-lines span{min-height:48px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;font-size:8px}
        .passport-lines em{font-family:Inter,sans-serif;font-style:normal;color:#777d77}

        .feature-lines{margin-top:45px;display:grid;gap:22px}
        .feature-lines div{padding-top:17px;border-top:1px solid var(--line);display:grid;grid-template-columns:150px 1fr;gap:18px}
        .feature-lines b{font-size:9px}
        .feature-lines span{font-size:9px;color:#7a8079;line-height:1.55}

        .khayaal-section{background:#e8ded1;display:grid;grid-template-columns:.72fr 1.28fr;gap:75px;align-items:center}
        .khayaal-note{
          min-height:470px;border-radius:28px;padding:34px;background:#28272a;color:#fffaf3;box-shadow:0 30px 70px rgba(40,34,39,.18);position:relative;overflow:hidden;
        }
        .khayaal-note::before{content:"";position:absolute;width:360px;height:360px;border-radius:50%;right:-150px;top:-170px;background:radial-gradient(circle,rgba(168,101,94,.22),transparent 65%)}
        .khayaal-lock{width:42px;height:42px;border-radius:13px;background:rgba(255,255,255,.08);display:grid;place-items:center;color:#d3c6d3}
        .khayaal-lock svg{width:19px}
        .khayaal-note>small{display:block;margin-top:24px;color:rgba(255,255,255,.42)}
        .khayaal-note blockquote{margin:46px 0 52px;font-family:Georgia,"Times New Roman",serif;font-size:30px;line-height:1.28;letter-spacing:-.025em;max-width:650px}
        .khayaal-meta{display:flex;gap:8px;flex-wrap:wrap}
        .khayaal-meta span{padding:7px 9px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:6px;color:rgba(255,255,255,.5)}
        .khayaal-note button{margin-top:22px;border:1px solid rgba(255,255,255,.15);background:transparent;color:#fff;border-radius:999px;padding:9px 11px;font-size:7px}

        .growth-section{background:#fffaf2}
        .growth-head{display:grid;grid-template-columns:.42fr 1fr;gap:70px;align-items:start}
        .growth-grid{margin-top:75px;display:grid;grid-template-columns:1.3fr .7fr;gap:18px}
        .curve-card,.milestone-card{border:1px solid var(--line);border-radius:24px;background:#fbf8f2;padding:24px}
        .curve-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}
        .curve-head h3{font-family:Georgia,"Times New Roman",serif;font-size:26px;font-weight:400;margin:6px 0 0}
        .curve-head>span{padding:7px 9px;border-radius:999px;background:var(--plum-soft);font-size:7px;color:#6b5e6d}

        .curve-chart{height:300px;margin-top:30px;display:grid;grid-template-columns:42px 1fr;gap:8px}
        .axis-y{display:flex;flex-direction:column;justify-content:space-between;padding:10px 0 20px;font-size:6px;color:#a0a49f}
        .chart-area{position:relative;border-left:1px solid var(--line);border-bottom:1px solid var(--line)}
        .chart-area .grid{position:absolute;left:0;right:0;height:1px;background:rgba(32,35,31,.07)}
        .g1{top:25%}.g2{top:50%}.g3{top:75%}
        .chart-area svg{position:absolute;inset:0;width:100%;height:100%;color:var(--plum)}
        .curve-dots span{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--plum);box-shadow:0 0 0 5px #fbf8f2;transform:translate(-50%,-50%)}
        .curve-footer{margin-top:16px;display:flex;justify-content:space-between;gap:16px;font-size:7px;color:#818680}

        .milestone-card>small{display:block;margin-bottom:20px}
        .milestone-card>div{min-height:68px;border-top:1px solid rgba(32,35,31,.08);display:grid;grid-template-columns:14px 1fr auto;gap:10px;align-items:center}
        .milestone-dot{width:7px;height:7px;border-radius:50%;background:var(--brass)}
        .milestone-card>div>span:nth-child(2){display:grid;gap:3px}
        .milestone-card b{font-size:9px}
        .milestone-card div small{font-size:6px;color:#969b95}
        .milestone-card em{font-family:Inter,sans-serif;font-style:normal;padding:5px 7px;border-radius:999px;background:#f0ece3;color:#7a7f79;font-size:6px}

        .transition-section{background:#eee7dc;display:grid;grid-template-columns:.72fr 1.28fr;gap:75px;align-items:center}
        .transition-panel{border:1px solid var(--line);border-radius:27px;background:#fffdf9;padding:24px;box-shadow:0 28px 70px rgba(55,48,40,.09)}
        .transition-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}
        .transition-head h3{font-family:Georgia,"Times New Roman",serif;font-size:28px;font-weight:400;margin:6px 0 0}
        .transition-head>span{padding:7px 9px;border-radius:999px;background:var(--brass-soft);font-size:7px;color:#7b6a4e}
        .transition-items{display:grid;margin-top:24px}
        .transition-items article{min-height:76px;border-top:1px solid rgba(32,35,31,.08);display:grid;grid-template-columns:35px 1fr;gap:10px;align-items:center}
        .transition-items article>span{font-family:Georgia,"Times New Roman",serif;color:#9b9f9a;font-size:12px}
        .transition-items article>div{display:grid;gap:3px}
        .transition-items b{font-size:9px}
        .transition-items small{font-size:7px;color:#969b95}
        .transition-panel>button{margin-top:18px;border:0;border-radius:999px;background:var(--ink);color:#fffaf2;padding:10px 12px;display:inline-flex;align-items:center;gap:8px;font-size:7px}
        .transition-panel svg{width:13px}

        .principles-section{padding:0 max(28px,calc((100vw - 1420px) / 2)) 150px;background:#eee7dc}
        .principles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .principles-grid article{min-height:285px;border:1px solid var(--line);border-radius:20px;background:rgba(255,253,249,.6);padding:25px;transition:.2s ease}
        .principles-grid article:hover{transform:translateY(-5px);background:#fffdf9}
        .principles-grid article>span{font-family:Georgia,"Times New Roman",serif;color:var(--rose);font-size:13px}
        .principles-grid h3{font-family:Georgia,"Times New Roman",serif;font-size:28px;font-weight:400;margin:72px 0 10px;letter-spacing:-.035em}
        .principles-grid p{margin:0;color:#777d77;font-size:9px;line-height:1.65}

        .closing{
          min-height:660px;padding:120px 28px;background:#efe4d7;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;
        }
        .closing>div:not(.closing-lines){position:relative;z-index:2;max-width:920px}
        .closing>div>span{font-size:8px;letter-spacing:.17em;color:#7c7a73}
        .closing h2{font-size:clamp(58px,6.2vw,96px);line-height:.94;margin-top:23px}
        .closing p{max-width:650px;margin:29px auto 0;color:#62635e;font-size:13px;line-height:1.7}
        .closing a{display:inline-flex;align-items:center;gap:14px;margin-top:36px;border-radius:999px;background:var(--ink);color:#fffaf2;padding:14px 17px;font-size:9px;box-shadow:0 18px 40px rgba(32,35,31,.14);transition:.2s ease}
        .closing a:hover{transform:translateY(-3px)}
        .closing svg{width:15px}
        .closing-lines{position:absolute;inset:0;pointer-events:none}
        .closing-lines i{position:absolute;border:1px solid rgba(32,35,31,.08);border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}
        .closing-lines i:nth-child(1){width:720px;height:720px}
        .closing-lines i:nth-child(2){width:940px;height:940px}
        .closing-lines i:nth-child(3){width:1180px;height:1180px;border-style:dashed;opacity:.65}

        .footer{
          padding:34px max(28px,calc((100vw - 1420px) / 2));background:#20231f;color:rgba(255,255,255,.8);
          display:grid;grid-template-columns:1fr auto 1fr;gap:30px;align-items:center;
        }
        .footer-brand .brand-mark::before,.footer-brand .brand-mark::after{background:rgba(255,255,255,.35)}
        .footer-brand small{color:rgba(255,255,255,.4)}
        .footer-links{display:flex;gap:22px;font-size:8px;color:rgba(255,255,255,.5)}
        .footer-links a:hover{color:#fff}
        .footer-note{justify-self:end;text-align:right;display:grid;gap:3px;font-size:7px;color:rgba(255,255,255,.38)}

        @media(max-width:1120px){
          .topbar{grid-template-columns:1fr auto}
          .topbar nav{display:none}
          .hero,.memory-section,.passport-section,.khayaal-section,.transition-section{grid-template-columns:1fr}
          .hero{padding-top:70px}
          .hero-object{width:min(760px,100%);margin:0 auto}
          .editorial-grid{grid-template-columns:1fr;gap:40px}
          .memory-section,.passport-section,.khayaal-section,.transition-section{gap:70px}
          .growth-head{grid-template-columns:1fr;gap:18px}
          .growth-grid{grid-template-columns:1fr}
          .principles-grid{grid-template-columns:1fr}
          .footer{grid-template-columns:1fr auto}
          .footer-note{display:none}
        }

        @media(max-width:760px){
          .topbar,.hero,.editorial-intro{width:min(100% - 32px,1420px)}
          .quiet-cta{padding:9px 11px}
          .quiet-cta svg{display:none}

          .hero{min-height:auto;padding:68px 0 90px}
          .hero h1{font-size:clamp(56px,15vw,80px)}
          .lede{font-size:16px}
          .hero-actions{flex-direction:column;align-items:flex-start;gap:18px}
          .hero-object{min-height:650px;margin-top:10px}
          .memory-card{width:100%;margin-top:112px;padding:20px;transform:none}
          .floating-case-list{left:3px;width:255px}
          .floating-private{right:4px;bottom:-4px;width:250px}

          .editorial-intro{padding:90px 0 100px}
          .editorial-grid h2{font-size:48px}

          .memory-section,.passport-section,.khayaal-section,.growth-section,.transition-section{padding-top:100px;padding-bottom:100px}
          .memory-copy h2,.passport-copy h2,.khayaal-copy h2,.growth-head h2,.transition-copy h2{font-size:48px}

          .passport-card{height:430px}
          .passport-cover h3{margin-top:68px}
          .passport-card.open{transform:none}
          .passport-inside{display:none}

          .khayaal-note blockquote{font-size:25px}
          .curve-footer{flex-direction:column}

          .principles-section{padding-bottom:100px}
          .principles-grid h3{margin-top:48px}

          .footer{grid-template-columns:1fr}
          .footer-links{flex-wrap:wrap}
        }

        @media(prefers-reduced-motion:reduce){
          *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
          [data-reveal]{opacity:1!important;transform:none!important}
        }
      `}</style>
    </main>
  );
}
