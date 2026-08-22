"use client";

import { useEffect, useMemo, useState } from "react";

const CASES = [
  { id: "c1", patient: "Aarav Kulkarni", meta: "54 M · OT 2", procedure: "Right frontal craniotomy", state: "Ready", time: "08:30" },
  { id: "c2", patient: "Sonal Patil", meta: "38 F · OT 1", procedure: "C5–C6 ACDF", state: "Pre-op", time: "10:15" },
  { id: "c3", patient: "Irfan Shaikh", meta: "61 M · OT 3", procedure: "VP shunt revision", state: "Review", time: "12:40" },
];

const MILESTONES = [
  ["08:12", "Patient IN", "Shift In complete"],
  ["08:26", "Induction", "Anaesthesia milestone"],
  ["08:41", "Time Out", "WHO checklist complete"],
  ["08:46", "Incision", "Surgery started"],
  ["11:18", "Closure", "Counts reconciled"],
  ["11:34", "Patient OUT", "Shift Out complete"],
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12h4l2.2-5 3.3 10 2.3-6H21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ShalyaPage() {
  const [activeCase, setActiveCase] = useState(CASES[0]);
  const [milestone, setMilestone] = useState(3);
  const [tab, setTab] = useState<"surgery" | "anaesthesia" | "nursing">("surgery");
  const [approved, setApproved] = useState(false);

  const stagePercent = useMemo(() => ((milestone + 1) / MILESTONES.length) * 100, [milestone]);

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
    <main className="shalya-site">
      <div className="paper-noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="brand" aria-label="Shalya home">
          <BrandMark />
          <span>
            <b>Shalya</b>
            <small>by TEIHSRA</small>
          </span>
        </a>

        <nav>
          <a href="#workflow">Workflow</a>
          <a href="#theatre">Theatre</a>
          <a href="#safety">Safety</a>
          <a href="#hospital">Hospitals</a>
        </nav>

        <a className="quiet-cta" href="mailto:hello@teihsra.com?subject=Shalya%20Private%20Pilot">
          Private pilot
          <Arrow />
        </a>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">Surgical Workflow Intelligence</span>
          <h1>
            The operating room,
            <br />
            <em>finally in one flow.</em>
          </h1>
          <p className="lede">
            Shalya brings the surgical day together—from readiness and safety checks to incision, closure, post-op handover and follow-up—without turning theatre work into a maze of forms.
          </p>

          <div className="hero-actions">
            <a className="main-cta" href="mailto:hello@teihsra.com?subject=Shalya%20Private%20Pilot">
              Request a private demo
              <span><Arrow /></span>
            </a>
            <a className="secondary-link" href="#workflow">
              Follow one case
              <span>↓</span>
            </a>
          </div>

          <div className="hero-principles">
            <span>Workflow-shaped</span>
            <span>Role-aware</span>
            <span>Built for theatre teams</span>
          </div>
        </div>

        <div className="hero-object" data-reveal>
          <div className="case-sheet">
            <div className="case-sheet-head">
              <div>
                <small>LIVE CASE</small>
                <h2>{activeCase.patient}</h2>
                <p>{activeCase.meta} · {activeCase.procedure}</p>
              </div>
              <span className="live-pill">{activeCase.state}</span>
            </div>

            <div className="milestone-strip">
              {MILESTONES.map((m, index) => (
                <button
                  key={m[1]}
                  className={index <= milestone ? "done" : ""}
                  onClick={() => setMilestone(index)}
                >
                  <span>{index < milestone ? <CheckIcon /> : index + 1}</span>
                  <small>{m[1]}</small>
                </button>
              ))}
            </div>

            <div className="progress-line"><i style={{ width: `${stagePercent}%` }} /></div>

            <div className="case-status-grid">
              <div>
                <small>PRIMARY CONSULTANT</small>
                <b>Dr Rao</b>
              </div>
              <div>
                <small>OPERATING SURGEON</small>
                <b>Dr Mehta</b>
              </div>
              <div>
                <small>ANAESTHETIST</small>
                <b>Dr Shah</b>
              </div>
            </div>

            <div className="latest-event">
              <small>LATEST MILESTONE · {MILESTONES[milestone][0]}</small>
              <h3>{MILESTONES[milestone][1]}</h3>
              <p>{MILESTONES[milestone][2]}</p>
            </div>
          </div>

          <div className="floating-board">
            <small>TODAY · OT BOARD</small>
            {CASES.map((item) => (
              <button
                key={item.id}
                className={item.id === activeCase.id ? "active" : ""}
                onClick={() => setActiveCase(item)}
              >
                <span>{item.time}</span>
                <span>
                  <b>{item.patient}</b>
                  <small>{item.procedure}</small>
                </span>
                <em>{item.state}</em>
              </button>
            ))}
          </div>

          <div className="floating-safety">
            <span className="safety-icon"><CheckIcon /></span>
            <span>
              <small>WHO SAFETY</small>
              <b>Time Out complete</b>
              <p>Team confirmation recorded before incision.</p>
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
            Surgery is a sequence.
            <br />
            <em>Software should understand that.</em>
          </h2>
          <div data-reveal>
            <p>
              Traditional theatre software often behaves like a database wearing a clinical skin. Shalya begins with the opposite assumption: the surgical day has rhythm, milestones, responsibilities and dependencies.
            </p>
            <p>
              The interface follows the case from pre-op readiness to post-op handover, while keeping each team’s work attributable and visible.
            </p>
          </div>
        </div>
      </section>

      <section id="workflow" className="workflow-section">
        <div className="workflow-copy" data-reveal>
          <span className="section-label">01 / CASE FLOW</span>
          <h2>
            One case.
            <br />
            <em>One continuous surgical flow.</em>
          </h2>
          <p>
            Pre-op, Shift In, Anaesthesia, Surgery, Shift Out, Immediate Post-op and Follow-up are not separate silos. They are connected stages in the same case.
          </p>
        </div>

        <div className="workflow-map" data-reveal>
          {[
            ["Pre-op", "Ready"],
            ["Shift In", "Patient IN"],
            ["Anaesthesia", "Induction"],
            ["Surgery", "Incision"],
            ["Shift Out", "Patient OUT"],
            ["Immediate Post-op", "Handover"],
            ["Follow-up", "Linked"],
          ].map(([stage, action], i) => (
            <article key={stage} className={i <= 3 ? "active" : ""}>
              <span>0{i + 1}</span>
              <div>
                <small>{action}</small>
                <h3>{stage}</h3>
              </div>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section id="theatre" className="theatre-section">
        <div className="theatre-board" data-reveal>
          <div className="board-head">
            <div>
              <small>OT BOARD · TODAY</small>
              <h3>Neurosurgery</h3>
            </div>
            <span>Live</span>
          </div>

          <div className="schedule">
            {CASES.map((c, index) => (
              <button key={c.id} className={index === 0 ? "selected" : ""}>
                <time>{c.time}</time>
                <span className="schedule-line"><i /></span>
                <span className="schedule-main">
                  <b>{c.patient}</b>
                  <small>{c.procedure}</small>
                </span>
                <span className="schedule-ot">{c.meta.split("·")[1]}</span>
                <em>{c.state}</em>
              </button>
            ))}
          </div>

          <div className="board-footer">
            <span><i className="dot sage" />2 ready</span>
            <span><i className="dot amber" />1 pending review</span>
            <button>Add case <Arrow /></button>
          </div>
        </div>

        <div className="theatre-copy" data-reveal>
          <span className="section-label">02 / THEATRE</span>
          <h2>
            A live board for the surgical day.
          </h2>
          <p>
            See the whole operating day, not just the current case. Cases, rooms, expected duration, turnover and status should be understandable at a glance.
          </p>

          <div className="feature-lines">
            <div><b>Schedule visually</b><span>Move cases, adjust order and reflect changes without rebuilding the day.</span></div>
            <div><b>Keep the team visible</b><span>Consultant, operating surgeon, anaesthetist and team remain connected to the case.</span></div>
            <div><b>Make delays legible</b><span>Readiness and pending actions surface before they become theatre surprises.</span></div>
          </div>
        </div>
      </section>

      <section id="safety" className="safety-section">
        <div className="safety-copy" data-reveal>
          <span className="section-label">03 / SAFETY</span>
          <h2>
            Safety checks should feel
            <br />
            <em>part of the operation.</em>
          </h2>
          <p>
            Shalya keeps WHO Sign In, Time Out and Sign Out within the case flow, while hospitals can add their own required checks without fragmenting the experience.
          </p>
        </div>

        <div className="safety-console" data-reveal>
          <div className="safety-tabs">
            <button className={tab === "surgery" ? "active" : ""} onClick={() => setTab("surgery")}>Surgery</button>
            <button className={tab === "anaesthesia" ? "active" : ""} onClick={() => setTab("anaesthesia")}>Anaesthesia</button>
            <button className={tab === "nursing" ? "active" : ""} onClick={() => setTab("nursing")}>Nursing</button>
          </div>

          <div className="checklist">
            {tab === "surgery" && (
              <>
                <div className="check-row complete"><span><CheckIcon /></span><b>Procedure and site confirmed</b><small>Verified</small></div>
                <div className="check-row complete"><span><CheckIcon /></span><b>Imaging available in theatre</b><small>Verified</small></div>
                <div className="check-row"><span>3</span><b>Implant availability</b><small>Required</small></div>
              </>
            )}
            {tab === "anaesthesia" && (
              <>
                <div className="check-row complete"><span><CheckIcon /></span><b>Airway plan documented</b><small>Verified</small></div>
                <div className="check-row complete"><span><CheckIcon /></span><b>Blood products reviewed</b><small>Verified</small></div>
                <div className="check-row"><span>3</span><b>Post-op ventilation plan</b><small>Recommended</small></div>
              </>
            )}
            {tab === "nursing" && (
              <>
                <div className="check-row complete"><span><CheckIcon /></span><b>Initial counts recorded</b><small>Verified</small></div>
                <div className="check-row complete"><span><CheckIcon /></span><b>Specimen labels prepared</b><small>Verified</small></div>
                <div className="check-row"><span>3</span><b>Closure count reconciliation</b><small>Pending</small></div>
              </>
            )}
          </div>

          <div className="safety-footer">
            <span>2 of 3 ready</span>
            <div><i style={{ width: "67%" }} /></div>
            <button>Review pending</button>
          </div>
        </div>
      </section>

      <section className="intraop-section">
        <div className="intraop-head" data-reveal>
          <span className="section-label">04 / INTRAOPERATIVE RECORD</span>
          <h2>
            The details that matter,
            <br />
            exactly where they happen.
          </h2>
        </div>

        <div className="intraop-grid">
          <article data-reveal>
            <span className="tile-icon"><PulseIcon /></span>
            <small>TIMING</small>
            <h3>Milestones</h3>
            <p>Patient IN, Induction, Incision, Closure, Extubation and Patient OUT become shared case events rather than duplicated timestamps.</p>
          </article>

          <article data-reveal>
            <span className="tile-icon">I</span>
            <small>IMPLANTS</small>
            <h3>Structured selection</h3>
            <p>Category → company → system/model → size/spec, so the record is useful beyond the operation note.</p>
          </article>

          <article data-reveal>
            <span className="tile-icon">S</span>
            <small>SPECIMENS</small>
            <h3>Linked to the case</h3>
            <p>Capture specimens intraoperatively or retrospectively, with labels and pathology results linked later.</p>
          </article>

          <article data-reveal>
            <span className="tile-icon">#</span>
            <small>COUNTS</small>
            <h3>Reconcile at closure</h3>
            <p>Baseline counts, additions and expected totals stay visible until the team closes the loop.</p>
          </article>
        </div>
      </section>

      <section className="handover-section">
        <div className="handover-copy" data-reveal>
          <span className="section-label">05 / HANDOVER</span>
          <h2>
            Closure is not the end of the case.
          </h2>
          <p>
            Immediate post-op information should arrive already connected to what happened in theatre—surgical, anaesthesia and nursing perspectives in one handover surface.
          </p>
        </div>

        <div className="handover-ui" data-reveal>
          <div className="handover-head">
            <div>
              <small>IMMEDIATE POST-OP</small>
              <h3>Aarav Kulkarni</h3>
            </div>
            <span>Ready for review</span>
          </div>

          <div className="handover-columns">
            <div>
              <span>SURGERY</span>
              <b>Procedure completed</b>
              <p>Right frontal craniotomy · haemostasis achieved · drain placed.</p>
            </div>
            <div>
              <span>ANAESTHESIA</span>
              <b>Extubated</b>
              <p>Awake, maintaining airway, stable transfer parameters recorded.</p>
            </div>
            <div>
              <span>NURSING</span>
              <b>Counts reconciled</b>
              <p>Final counts complete · specimen transfer documented.</p>
            </div>
          </div>

          <div className="handover-actions">
            <span>3 sections complete</span>
            <button className={approved ? "approved" : ""} onClick={() => setApproved((v) => !v)}>
              {approved ? "Approved" : "Approve handover"}
              {approved ? <CheckIcon /> : <Arrow />}
            </button>
          </div>
        </div>
      </section>

      <section id="hospital" className="hospital-fit">
        <div className="hospital-fit-copy" data-reveal>
          <span className="section-label">06 / HOSPITAL FIT</span>
          <h2>
            Your operating theatre.
            <br />
            <em>Your rules.</em>
          </h2>
          <p>
            Shalya can adapt to the hospital’s rooms, roles, approval rules, WHO customisations, equipment, implants, follow-up logic and scheduling model—without changing the integrity of the record underneath.
          </p>
        </div>

        <div className="launchpad" data-reveal>
          <div className="launchpad-head">
            <div>
              <small>SANKALAN LAUNCHPAD</small>
              <h3>Shalya Scaffold</h3>
            </div>
            <span>v1.2</span>
          </div>

          <div className="launchpad-grid">
            {["OT Rooms", "Case Flow", "WHO Safety", "Approvals", "Equipment", "Implants", "Scheduling", "Follow-up"].map((item, i) => (
              <button key={item} className={i === 2 ? "active" : ""}>{item}</button>
            ))}
          </div>

          <div className="readiness">
            <span>Launch readiness</span>
            <div><i /></div>
            <b>91%</b>
          </div>

          <div className="launchpad-note">
            <span><CheckIcon /></span>
            <p><b>WHO checklist mapped.</b> Sign In, Time Out and Sign Out are aligned to this hospital’s workflow.</p>
            <button>Preview</button>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div data-reveal>
          <span>PRIVATE HOSPITAL PILOTS</span>
          <h2>
            Surgical workflow,
            <br />
            <em>designed around the operation.</em>
          </h2>
          <p>
            Shalya is being developed for hospitals that want theatre workflow to feel coordinated, accountable and clinically natural.
          </p>
          <a href="mailto:hello@teihsra.com?subject=Shalya%20Private%20Pilot">
            Request a conversation
            <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <BrandMark />
          <span><b>Shalya</b><small>by TEIHSRA</small></span>
        </div>
        <div className="footer-links">
          <a href="https://teihsra.com">TEIHSRA</a>
          <a href="mailto:hello@teihsra.com">Contact</a>
          <a href="https://teihsra.com/privacy">Privacy</a>
          <a href="https://teihsra.com/terms">Terms</a>
        </div>
        <div className="footer-note">
          <span>Surgical Workflow Intelligence</span>
          <span>Private pilot development</span>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --ivory:#f5f0e7;
          --ivory-2:#fbf8f2;
          --ink:#20241f;
          --muted:#70766f;
          --line:rgba(32,36,31,.12);
          --sage:#7e9278;
          --sage-soft:#e2e8dc;
          --ox:#9f5c53;
          --ox-soft:#ead2cd;
          --brass:#b48c4f;
          --brass-soft:#eadcc0;
          --plum:#6b5968;
          --stone:#e8e0d4;
        }

        * { box-sizing:border-box; }
        html { scroll-behavior:smooth; background:var(--ivory); }
        body { margin:0; background:var(--ivory); color:var(--ink); }
        body,button,input,textarea { font-family:Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        a { color:inherit; text-decoration:none; }
        button { color:inherit; font:inherit; -webkit-tap-highlight-color:transparent; }
        svg { display:block; }

        .shalya-site {
          position:relative;
          overflow:hidden;
          background:
            radial-gradient(circle at 78% 8%, rgba(180,140,79,.08), transparent 28rem),
            radial-gradient(circle at 14% 30%, rgba(126,146,120,.06), transparent 30rem),
            var(--ivory);
        }

        .paper-noise {
          position:fixed; inset:0; pointer-events:none; z-index:50; opacity:.14; mix-blend-mode:multiply;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.10'/%3E%3C/svg%3E");
        }

        [data-reveal] { opacity:0; transform:translateY(26px); transition:opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].revealed { opacity:1; transform:none; }

        .topbar {
          width:min(1420px, calc(100% - 56px));
          margin:0 auto;
          min-height:76px;
          display:grid;
          grid-template-columns:1fr auto 1fr;
          align-items:center;
          gap:30px;
          position:relative;
          z-index:20;
        }

        .brand { display:inline-flex; align-items:center; gap:11px; width:max-content; }
        .brand > span:last-child { display:grid; gap:1px; }
        .brand b { font-family:Georgia,"Times New Roman",serif; font-size:23px; font-weight:400; letter-spacing:-.03em; }
        .brand small { font-size:7px; letter-spacing:.12em; text-transform:uppercase; color:#8c918b; }

        .brand-mark { position:relative; width:28px; height:28px; display:block; }
        .brand-mark i { position:absolute; width:7px; height:7px; border-radius:50%; }
        .brand-mark i:nth-child(1){ left:1px; top:10px; background:var(--ox); }
        .brand-mark i:nth-child(2){ right:2px; top:2px; background:var(--sage); }
        .brand-mark i:nth-child(3){ right:2px; bottom:2px; background:var(--brass); }
        .brand-mark::before,.brand-mark::after { content:""; position:absolute; left:6px; top:13px; width:18px; height:1px; background:rgba(32,36,31,.35); transform-origin:left center; }
        .brand-mark::before{ transform:rotate(-31deg); }
        .brand-mark::after{ transform:rotate(31deg); }

        .topbar nav { display:flex; gap:28px; font-size:11px; color:#5c625c; }
        .topbar nav a { position:relative; padding:8px 0; }
        .topbar nav a::after { content:""; position:absolute; left:0; right:100%; bottom:3px; height:1px; background:var(--ink); transition:right .25s ease; }
        .topbar nav a:hover::after{ right:0; }

        .quiet-cta {
          justify-self:end; display:inline-flex; align-items:center; gap:11px; padding:10px 13px 10px 17px;
          border:1px solid var(--line); border-radius:999px; background:rgba(251,248,242,.65); backdrop-filter:blur(12px); font-size:10px;
          transition:transform .22s ease, background .22s ease;
        }
        .quiet-cta:hover{ transform:translateY(-2px); background:#fffdf8; }
        .quiet-cta svg{ width:16px; }

        .hero {
          width:min(1420px, calc(100% - 56px));
          margin:0 auto;
          min-height:840px;
          padding:96px 0 120px;
          display:grid;
          grid-template-columns:.92fr 1.08fr;
          gap:50px;
          align-items:center;
          position:relative;
        }
        .hero::after {
          content:""; position:absolute; width:690px; height:690px; border:1px solid rgba(32,36,31,.055); border-radius:50%;
          right:-170px; top:-60px; box-shadow:inset 0 0 0 90px rgba(255,255,255,.10), inset 0 0 0 180px rgba(126,146,120,.025); pointer-events:none;
        }

        .eyebrow,.section-label { font-size:8px; letter-spacing:.18em; text-transform:uppercase; color:#7f847e; }

        .hero h1,.editorial-grid h2,.workflow-copy h2,.theatre-copy h2,.safety-copy h2,.intraop-head h2,.handover-copy h2,.hospital-fit-copy h2,.closing h2 {
          font-family:Georgia,"Times New Roman",serif; font-weight:400; letter-spacing:-.055em; margin:0;
        }
        .hero h1 { font-size:clamp(66px,6.4vw,108px); line-height:.91; margin-top:26px; }
        em { color:var(--plum); font-weight:400; }

        .lede { max-width:600px; margin:38px 0 0; color:#585f58; font-size:18px; line-height:1.65; }

        .hero-actions { display:flex; align-items:center; gap:28px; margin-top:36px; }
        .main-cta {
          min-height:54px; display:inline-flex; align-items:center; gap:15px; padding:8px 8px 8px 20px; border-radius:999px;
          background:var(--ink); color:#fffaf1; font-size:11px; box-shadow:0 18px 38px rgba(32,36,31,.15); transition:transform .22s ease;
        }
        .main-cta:hover{ transform:translateY(-3px); }
        .main-cta > span { width:38px; height:38px; border-radius:50%; display:grid; place-items:center; background:#fffaf1; color:var(--ink); }
        .main-cta svg,.secondary-link svg{ width:16px; }
        .secondary-link { font-size:11px; display:inline-flex; gap:9px; align-items:center; color:#5e645e; }
        .secondary-link span{ transition:transform .2s ease; }
        .secondary-link:hover span{ transform:translateY(4px); }

        .hero-principles { display:flex; flex-wrap:wrap; gap:8px; margin-top:52px; }
        .hero-principles span { padding:7px 10px; border:1px solid var(--line); border-radius:999px; font-size:8px; color:#737973; background:rgba(251,248,242,.55); }

        .hero-object { min-height:650px; position:relative; z-index:2; }
        .case-sheet {
          width:min(620px,90%); margin:76px 0 0 auto; padding:28px; border-radius:28px;
          border:1px solid rgba(32,36,31,.10); background:rgba(255,253,249,.92); backdrop-filter:blur(18px);
          box-shadow:0 32px 85px rgba(56,48,40,.13); transform:rotate(.35deg);
        }
        .case-sheet-head { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; padding-bottom:22px; border-bottom:1px solid var(--line); }
        .case-sheet-head small,.floating-board>small,.floating-safety small,.latest-event small,.board-head small,.safety-console small,.handover-head small,.launchpad-head small {
          font-size:7px; letter-spacing:.15em; text-transform:uppercase; color:#92968f;
        }
        .case-sheet-head h2 { font-family:Georgia,"Times New Roman",serif; font-size:29px; font-weight:400; letter-spacing:-.04em; margin:5px 0 5px; }
        .case-sheet-head p{ margin:0; font-size:9px; color:#888d87; }
        .live-pill { padding:7px 9px; border-radius:999px; background:var(--sage-soft); color:#64725f; font-size:8px; white-space:nowrap; }

        .milestone-strip {
          display:grid; grid-template-columns:repeat(6,1fr); gap:6px; margin-top:22px;
        }
        .milestone-strip button { border:0; background:transparent; display:grid; justify-items:center; gap:6px; cursor:pointer; opacity:.45; transition:.2s ease; }
        .milestone-strip button.done{ opacity:1; }
        .milestone-strip button > span {
          width:28px; height:28px; border-radius:50%; border:1px solid var(--line); display:grid; place-items:center; background:#f6f2e9; font-size:8px;
        }
        .milestone-strip button.done > span{ background:var(--sage-soft); border-color:rgba(126,146,120,.25); color:#61705c; }
        .milestone-strip svg{ width:13px; }
        .milestone-strip small{ font-size:6px; color:#777d76; }

        .progress-line { height:3px; background:#ece8df; border-radius:99px; overflow:hidden; margin-top:15px; }
        .progress-line i { display:block; height:100%; background:linear-gradient(90deg,var(--sage),var(--brass)); transition:width .35s ease; }

        .case-status-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:22px; }
        .case-status-grid div { padding:12px; border:1px solid rgba(32,36,31,.07); border-radius:12px; background:#faf7f0; display:grid; gap:5px; }
        .case-status-grid small{ font-size:6px; color:#999d98; letter-spacing:.12em; }
        .case-status-grid b{ font-size:9px; font-weight:600; }

        .latest-event { margin-top:18px; padding:18px 3px 0; border-top:1px solid var(--line); }
        .latest-event h3{ font-family:Georgia,"Times New Roman",serif; font-size:23px; font-weight:400; margin:6px 0 5px; }
        .latest-event p{ margin:0; color:#777c76; font-size:8px; }

        .floating-board,.floating-safety {
          position:absolute; border:1px solid rgba(32,36,31,.09); background:rgba(255,253,249,.96); backdrop-filter:blur(18px); box-shadow:0 20px 50px rgba(55,48,40,.12);
        }
        .floating-board { left:-22px; top:8px; width:280px; border-radius:22px; padding:15px; transform:rotate(-1.1deg); }
        .floating-board button {
          width:100%; min-height:58px; border:0; border-top:1px solid rgba(32,36,31,.07); background:transparent;
          display:grid; grid-template-columns:40px 1fr auto; align-items:center; gap:8px; text-align:left; cursor:pointer; opacity:.58; transition:.2s ease;
        }
        .floating-board button.active,.floating-board button:hover{ opacity:1; transform:translateX(3px); }
        .floating-board button > span:first-child{ font-family:Georgia,"Times New Roman",serif; color:#90958f; font-size:11px; }
        .floating-board button > span:nth-child(2){ display:grid; gap:2px; }
        .floating-board button b{ font-size:9px; }
        .floating-board button small{ font-size:6px; color:#969b95; }
        .floating-board button em{
          font-family:Inter,sans-serif; font-style:normal; padding:5px 7px; border-radius:999px; background:#f0ebe1; color:#7b786f; font-size:6px; white-space:nowrap;
        }

        .floating-safety {
          right:-18px; bottom:28px; width:285px; border-radius:20px; padding:15px; display:grid; grid-template-columns:auto 1fr; gap:11px; transform:rotate(1.2deg);
        }
        .safety-icon { width:34px; height:34px; border-radius:11px; display:grid; place-items:center; background:var(--sage-soft); color:#65735f; }
        .safety-icon svg{ width:16px; }
        .floating-safety > span:last-child{ display:grid; gap:4px; }
        .floating-safety b{ font-size:9px; }
        .floating-safety p{ margin:0; color:#858a84; font-size:7px; line-height:1.45; }

        .editorial-intro {
          width:min(1420px,calc(100% - 56px)); margin:0 auto; padding:120px 0 150px; border-top:1px solid var(--line);
        }
        .editorial-label { display:grid; grid-template-columns:auto 1fr; gap:17px; align-items:center; }
        .editorial-label span{ font-size:8px; letter-spacing:.16em; color:#838882; }
        .editorial-label i{ height:1px; background:var(--line); }
        .editorial-grid { margin-top:48px; display:grid; grid-template-columns:1.2fr .8fr; gap:80px; align-items:start; }
        .editorial-grid h2{ font-size:clamp(52px,5.2vw,85px); line-height:.95; }
        .editorial-grid > div p{ margin:0 0 18px; color:#606660; font-size:14px; line-height:1.75; }

        .workflow-section,.theatre-section,.safety-section,.handover-section,.hospital-fit {
          padding:150px max(28px,calc((100vw - 1420px) / 2));
        }
        .workflow-section { background:#ebe2d5; display:grid; grid-template-columns:.72fr 1.28fr; gap:75px; align-items:center; }
        .workflow-copy h2,.theatre-copy h2,.safety-copy h2,.handover-copy h2,.hospital-fit-copy h2 { font-size:clamp(48px,4.7vw,76px); line-height:.98; margin-top:22px; }
        .workflow-copy p,.theatre-copy p,.safety-copy p,.handover-copy p,.hospital-fit-copy p{ margin:26px 0 0; max-width:540px; color:#626862; font-size:13px; line-height:1.72; }

        .workflow-map { display:grid; gap:9px; }
        .workflow-map article {
          min-height:72px; display:grid; grid-template-columns:38px 1fr auto; align-items:center; gap:14px; padding:0 16px;
          border:1px solid rgba(32,36,31,.08); border-radius:15px; background:rgba(255,253,249,.58); opacity:.5; transition:.2s ease;
        }
        .workflow-map article.active{ opacity:1; background:#fffdf9; transform:translateX(4px); }
        .workflow-map article > span{ font-family:Georgia,"Times New Roman",serif; color:#999d98; font-size:12px; }
        .workflow-map article div{ display:grid; gap:3px; }
        .workflow-map article small{ font-size:6px; letter-spacing:.12em; color:#999d98; }
        .workflow-map article h3{ margin:0; font-family:Georgia,"Times New Roman",serif; font-size:19px; font-weight:400; }
        .workflow-map article > i{ width:8px; height:8px; border-radius:50%; background:#c8cbc6; }
        .workflow-map article.active > i{ background:var(--sage); box-shadow:0 0 0 5px rgba(126,146,120,.08); }

        .theatre-section { background:#f5f0e7; display:grid; grid-template-columns:1.2fr .8fr; gap:75px; align-items:center; }
        .theatre-board { background:#fffdf9; border:1px solid var(--line); border-radius:28px; padding:24px; box-shadow:0 28px 70px rgba(61,52,43,.09); }
        .board-head{ display:flex; justify-content:space-between; align-items:flex-start; gap:20px; padding-bottom:18px; border-bottom:1px solid var(--line); }
        .board-head h3{ font-family:Georgia,"Times New Roman",serif; font-size:28px; font-weight:400; margin:5px 0 0; }
        .board-head > span{ padding:7px 10px; border-radius:999px; background:var(--sage-soft); color:#64725f; font-size:7px; }

        .schedule button{
          width:100%; min-height:75px; border:0; border-bottom:1px solid rgba(32,36,31,.07); background:transparent;
          display:grid; grid-template-columns:55px 24px 1fr auto auto; gap:10px; align-items:center; text-align:left; cursor:pointer; opacity:.65; transition:.2s ease;
        }
        .schedule button.selected,.schedule button:hover{ opacity:1; background:#faf7f0; }
        .schedule time{ font-family:Georgia,"Times New Roman",serif; color:#8d928d; font-size:12px; }
        .schedule-line{ display:flex; justify-content:center; }
        .schedule-line i{ width:8px; height:8px; border-radius:50%; background:var(--sage); }
        .schedule-main{ display:grid; gap:3px; }
        .schedule-main b{ font-size:9px; }
        .schedule-main small{ font-size:7px; color:#969b95; }
        .schedule-ot{ font-size:7px; color:#7d827c; }
        .schedule button em{ font-family:Inter,sans-serif; font-style:normal; font-size:6px; padding:5px 7px; border-radius:999px; background:#f0ece3; color:#7b7f79; }

        .board-footer{ display:flex; gap:16px; align-items:center; flex-wrap:wrap; padding-top:17px; }
        .board-footer span{ display:inline-flex; gap:6px; align-items:center; font-size:7px; color:#777d76; }
        .dot{ width:7px; height:7px; border-radius:50%; display:inline-block; }
        .sage{ background:var(--sage); }
        .amber{ background:var(--brass); }
        .board-footer button{ margin-left:auto; border:0; border-radius:999px; background:var(--ink); color:#fffaf2; padding:10px 13px; display:inline-flex; gap:9px; align-items:center; font-size:7px; }
        .board-footer svg{ width:13px; }

        .feature-lines{ margin-top:45px; display:grid; gap:22px; }
        .feature-lines div{ padding-top:17px; border-top:1px solid var(--line); display:grid; grid-template-columns:150px 1fr; gap:18px; }
        .feature-lines b{ font-size:9px; }
        .feature-lines span{ font-size:9px; color:#7a8079; line-height:1.55; }

        .safety-section { background:#e8ded1; display:grid; grid-template-columns:.7fr 1.3fr; gap:75px; align-items:center; }
        .safety-console{ background:#fffdf9; border:1px solid var(--line); border-radius:28px; padding:24px; box-shadow:0 28px 70px rgba(61,52,43,.10); }
        .safety-tabs{ display:flex; gap:6px; padding-bottom:18px; border-bottom:1px solid var(--line); }
        .safety-tabs button{ border:1px solid transparent; background:transparent; border-radius:999px; padding:8px 11px; font-size:7px; color:#7c817b; cursor:pointer; }
        .safety-tabs button.active{ background:#f0ece4; color:var(--ink); border-color:rgba(32,36,31,.06); }

        .checklist{ display:grid; }
        .check-row{ min-height:72px; display:grid; grid-template-columns:32px 1fr auto; gap:11px; align-items:center; border-bottom:1px solid rgba(32,36,31,.07); }
        .check-row > span{ width:28px; height:28px; border-radius:50%; border:1px solid var(--line); display:grid; place-items:center; font-size:8px; color:#8c918c; }
        .check-row.complete > span{ background:var(--sage-soft); color:#60715c; border-color:rgba(126,146,120,.25); }
        .check-row svg{ width:13px; }
        .check-row b{ font-size:9px; }
        .check-row small{ font-size:6px; color:#969b95; }
        .safety-footer{ padding-top:18px; display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center; font-size:7px; color:#7b807a; }
        .safety-footer > div{ height:6px; border-radius:99px; background:#ece8df; overflow:hidden; }
        .safety-footer i{ display:block; height:100%; background:linear-gradient(90deg,var(--sage),var(--brass)); }
        .safety-footer button{ border:1px solid var(--line); background:transparent; border-radius:999px; padding:7px 9px; font-size:6px; }

        .intraop-section { padding:150px max(28px,calc((100vw - 1420px) / 2)); background:#fffaf2; }
        .intraop-head{ display:grid; grid-template-columns:.42fr 1fr; gap:70px; align-items:start; }
        .intraop-head h2{ font-size:clamp(48px,4.9vw,78px); line-height:.98; }

        .intraop-grid{ margin-top:75px; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .intraop-grid article{ min-height:300px; padding:25px; border:1px solid var(--line); border-radius:20px; background:#fbf8f2; transition:.22s ease; }
        .intraop-grid article:hover{ transform:translateY(-5px); box-shadow:0 18px 38px rgba(55,48,40,.07); }
        .tile-icon{ width:42px; height:42px; border-radius:13px; background:#ece6dc; display:grid; place-items:center; font-family:Georgia,"Times New Roman",serif; color:#6d736c; }
        .tile-icon svg{ width:18px; }
        .intraop-grid small{ display:block; margin-top:48px; font-size:7px; letter-spacing:.14em; color:#969b95; }
        .intraop-grid h3{ font-family:Georgia,"Times New Roman",serif; font-size:27px; font-weight:400; margin:8px 0 10px; letter-spacing:-.035em; }
        .intraop-grid p{ margin:0; color:#777d77; font-size:9px; line-height:1.65; }

        .handover-section{ background:#eee7dc; display:grid; grid-template-columns:.7fr 1.3fr; gap:75px; align-items:center; }
        .handover-ui{ background:#fffdf9; border:1px solid var(--line); border-radius:27px; padding:24px; box-shadow:0 28px 70px rgba(55,48,40,.09); }
        .handover-head{ display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .handover-head h3{ font-family:Georgia,"Times New Roman",serif; font-size:28px; font-weight:400; margin:5px 0 0; }
        .handover-head > span{ padding:7px 9px; border-radius:999px; background:var(--brass-soft); font-size:7px; color:#7c6c50; }

        .handover-columns{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:24px; }
        .handover-columns div{ min-height:175px; border-radius:17px; padding:16px; border:1px solid rgba(32,36,31,.07); background:#faf7f0; }
        .handover-columns span{ font-size:6px; letter-spacing:.14em; color:#969b95; }
        .handover-columns b{ display:block; margin:50px 0 7px; font-family:Georgia,"Times New Roman",serif; font-size:20px; font-weight:400; }
        .handover-columns p{ margin:0; font-size:8px; line-height:1.55; color:#7a807a; }

        .handover-actions{ margin-top:18px; padding-top:16px; border-top:1px solid var(--line); display:flex; justify-content:space-between; gap:20px; align-items:center; }
        .handover-actions > span{ font-size:7px; color:#7e837d; }
        .handover-actions button{ border:0; border-radius:999px; background:var(--ink); color:#fffaf2; padding:10px 12px; display:inline-flex; align-items:center; gap:8px; font-size:7px; cursor:pointer; }
        .handover-actions button.approved{ background:#60705a; }
        .handover-actions svg{ width:13px; }

        .hospital-fit{ background:#f7f3eb; display:grid; grid-template-columns:.75fr 1.25fr; gap:75px; align-items:center; }
        .launchpad{ border:1px solid var(--line); background:#fffdf9; border-radius:28px; padding:28px; box-shadow:0 28px 72px rgba(55,48,40,.08); }
        .launchpad-head{ display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .launchpad-head h3{ font-family:Georgia,"Times New Roman",serif; font-size:31px; font-weight:400; margin:5px 0 0; letter-spacing:-.04em; }
        .launchpad-head > span{ padding:7px 9px; border-radius:999px; background:#f0ede6; font-size:7px; color:#7b807a; }

        .launchpad-grid{ margin-top:40px; display:grid; grid-template-columns:repeat(4,1fr); gap:9px; }
        .launchpad-grid button{ min-height:82px; border:1px solid var(--line); border-radius:15px; background:#faf7f0; font-size:8px; cursor:pointer; transition:.2s ease; }
        .launchpad-grid button:hover{ transform:translateY(-3px); border-color:rgba(32,36,31,.25); }
        .launchpad-grid button.active{ background:var(--sage-soft); border-color:rgba(126,146,120,.24); }

        .readiness{ margin-top:38px; display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center; font-size:8px; }
        .readiness > div{ height:7px; border-radius:99px; background:#ece8df; overflow:hidden; }
        .readiness i{ display:block; width:91%; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--sage),var(--brass)); }

        .launchpad-note{ margin-top:20px; padding:13px; border-radius:14px; background:#edf1e9; display:grid; grid-template-columns:30px 1fr auto; gap:10px; align-items:center; }
        .launchpad-note > span{ width:30px; height:30px; border-radius:10px; display:grid; place-items:center; background:#dfe7da; color:#60705b; }
        .launchpad-note svg{ width:14px; }
        .launchpad-note p{ margin:0; font-size:7px; color:#747a74; line-height:1.45; }
        .launchpad-note button{ border:1px solid var(--line); border-radius:999px; background:transparent; padding:7px 8px; font-size:6px; }

        .closing {
          min-height:660px; padding:120px 28px; background:#efe4d7; display:grid; place-items:center; text-align:center; position:relative; overflow:hidden;
        }
        .closing > div:not(.closing-lines){ position:relative; z-index:2; max-width:920px; }
        .closing > div > span{ font-size:8px; letter-spacing:.17em; color:#7c7a73; }
        .closing h2{ font-size:clamp(58px,6.2vw,96px); line-height:.94; margin-top:23px; }
        .closing p{ max-width:650px; margin:29px auto 0; color:#62635e; font-size:13px; line-height:1.7; }
        .closing a{ display:inline-flex; align-items:center; gap:14px; margin-top:36px; border-radius:999px; background:var(--ink); color:#fffaf2; padding:14px 17px; font-size:9px; box-shadow:0 18px 40px rgba(32,36,31,.14); transition:.2s ease; }
        .closing a:hover{ transform:translateY(-3px); }
        .closing svg{ width:15px; }
        .closing-lines{ position:absolute; inset:0; pointer-events:none; }
        .closing-lines i{ position:absolute; border:1px solid rgba(32,36,31,.08); border-radius:50%; left:50%; top:50%; transform:translate(-50%,-50%); }
        .closing-lines i:nth-child(1){ width:720px; height:720px; }
        .closing-lines i:nth-child(2){ width:940px; height:940px; }
        .closing-lines i:nth-child(3){ width:1180px; height:1180px; border-style:dashed; opacity:.65; }

        .footer {
          padding:34px max(28px,calc((100vw - 1420px) / 2)); background:#20251f; color:rgba(255,255,255,.8);
          display:grid; grid-template-columns:1fr auto 1fr; gap:30px; align-items:center;
        }
        .footer-brand .brand-mark::before,.footer-brand .brand-mark::after{ background:rgba(255,255,255,.35); }
        .footer-brand small{ color:rgba(255,255,255,.4); }
        .footer-links{ display:flex; gap:22px; font-size:8px; color:rgba(255,255,255,.5); }
        .footer-links a:hover{ color:#fff; }
        .footer-note{ justify-self:end; text-align:right; display:grid; gap:3px; font-size:7px; color:rgba(255,255,255,.38); }

        @media (max-width:1120px){
          .topbar{ grid-template-columns:1fr auto; }
          .topbar nav{ display:none; }
          .hero,.workflow-section,.theatre-section,.safety-section,.handover-section,.hospital-fit{ grid-template-columns:1fr; }
          .hero{ padding-top:70px; }
          .hero-object{ width:min(760px,100%); margin:0 auto; }
          .editorial-grid{ grid-template-columns:1fr; gap:40px; }
          .workflow-section,.theatre-section,.safety-section,.handover-section,.hospital-fit{ gap:70px; }
          .intraop-head{ grid-template-columns:1fr; gap:18px; }
          .intraop-grid{ grid-template-columns:repeat(2,1fr); }
          .footer{ grid-template-columns:1fr auto; }
          .footer-note{ display:none; }
        }

        @media (max-width:760px){
          .topbar,.hero,.editorial-intro{ width:min(100% - 32px,1420px); }
          .quiet-cta{ padding:9px 11px; }
          .quiet-cta svg{ display:none; }

          .hero{ min-height:auto; padding:68px 0 90px; }
          .hero h1{ font-size:clamp(56px,15vw,80px); }
          .lede{ font-size:16px; }
          .hero-actions{ flex-direction:column; align-items:flex-start; gap:18px; }
          .hero-object{ min-height:640px; margin-top:10px; }
          .case-sheet{ width:100%; margin-top:110px; padding:20px; transform:none; }
          .floating-board{ left:3px; width:250px; }
          .floating-safety{ right:4px; bottom:-4px; width:245px; }

          .milestone-strip{ grid-template-columns:repeat(3,1fr); gap:12px 6px; }
          .case-status-grid{ grid-template-columns:1fr; }

          .editorial-intro{ padding:90px 0 100px; }
          .editorial-grid h2{ font-size:48px; }

          .workflow-section,.theatre-section,.safety-section,.intraop-section,.handover-section,.hospital-fit{ padding-top:100px; padding-bottom:100px; }
          .workflow-copy h2,.theatre-copy h2,.safety-copy h2,.handover-copy h2,.hospital-fit-copy h2,.intraop-head h2{ font-size:48px; }

          .schedule button{ grid-template-columns:48px 20px 1fr auto; }
          .schedule-ot{ display:none; }

          .safety-footer{ grid-template-columns:1fr; }
          .intraop-grid{ grid-template-columns:1fr; }
          .handover-columns{ grid-template-columns:1fr; }
          .handover-columns b{ margin-top:28px; }

          .launchpad-grid{ grid-template-columns:repeat(2,1fr); }
          .launchpad-note{ grid-template-columns:28px 1fr; }
          .launchpad-note button{ grid-column:2; justify-self:start; }

          .footer{ grid-template-columns:1fr; }
          .footer-links{ flex-wrap:wrap; }
        }

        @media (prefers-reduced-motion:reduce){
          *{ animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; scroll-behavior:auto !important; }
          [data-reveal]{ opacity:1 !important; transform:none !important; }
        }
      `}</style>
    </main>
  );
}
