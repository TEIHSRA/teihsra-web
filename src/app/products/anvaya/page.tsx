"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const principles = [
  {
    number: "01",
    title: "Capture where care happens",
    body: "Record at the bedside, type when you want, or upload audio later. Anvaya is designed around the clinician—not around a workstation.",
  },
  {
    number: "02",
    title: "Build the record continuously",
    body: "Every verified note strengthens a longitudinal clinical record that can be reused intelligently across the admission.",
  },
  {
    number: "03",
    title: "Keep humans in control",
    body: "AI structures, links and surfaces uncertainty. Clinicians review, verify, co-sign and remain accountable for the clinical record.",
  },
];

const timeline = [
  { time: "08:10", kind: "ROUND", title: "Morning review", meta: "Verified · Dr A. Mehta" },
  { time: "11:42", kind: "EVENT", title: "Transient seizure", meta: "Linked to CT Brain" },
  { time: "12:18", kind: "TASK", title: "Repeat CT tomorrow", meta: "Accepted · Resident team" },
  { time: "13:06", kind: "REVIEW", title: "Consultant co-sign", meta: "Agree with comments" },
];

const products = [
  {
    label: "Mobile-first capture",
    value: "One tap",
    detail: "Open a patient. Record instantly. Let Anvaya detect and format the note.",
  },
  {
    label: "Clinical provenance",
    value: "Always visible",
    detail: "Audio → transcript → AI draft → edited note → verification, with every stage attributable.",
  },
  {
    label: "Case Summary",
    value: "From day one",
    detail: "A continuously evolving master summary that can generate discharge, transfer, insurance and other outputs.",
  },
  {
    label: "Hospital fit",
    value: "Configurable",
    detail: "Sankalan Launchpad adapts Anvaya to local roles, rounds, co-sign rules, storage, QR/NFC and more.",
  },
];

const reviewCards = [
  { label: "Progress notes", count: 12, tone: "sage" },
  { label: "Operative notes", count: 2, tone: "amber" },
  { label: "Case summaries", count: 3, tone: "rose" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8c.8 4.2 2.9 6.3 7.1 7.1-4.2.8-6.3 2.9-7.1 7.1-.8-4.2-2.9-6.3-7.1-7.1 4.2-.8 6.3-2.9 7.1-7.1Z" fill="currentColor" />
      <path d="M18.2 15.5c.35 1.85 1.28 2.78 3.13 3.13-1.85.35-2.78 1.28-3.13 3.13-.35-1.85-1.28-2.78-3.13-3.13 1.85-.35 2.78-1.28 3.13-3.13Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export default function AnvayaPage() {
  const [activePatient, setActivePatient] = useState(0);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(38);
  const [activeTab, setActiveTab] = useState<"overview" | "timeline">("overview");
  const [cursor, setCursor] = useState({ x: 50, y: 20 });
  const pageRef = useRef<HTMLElement | null>(null);

  const patients = useMemo(
    () => [
      { name: "Rahul Patil", meta: "42 M · Bed 12", sub: "POD 2 · Craniotomy", status: "2 tasks" },
      { name: "Meena Shah", meta: "61 F · Bed 14", sub: "Day 4 · Neurosurgery", status: "Up to date" },
      { name: "Ajay More", meta: "35 M · NSICU 03", sub: "Day 1 · Observation", status: "1 review" },
    ],
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setCursor({ x, y });
      root.style.setProperty("--mx", `${x}%`);
      root.style.setProperty("--my", `${y}%`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <main ref={pageRef} className="anvaya-page">
      <div className="cursor-aura" aria-hidden="true" style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} />

      <nav className="nav-shell">
        <a className="brand" href="#top" aria-label="Anvaya home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-word">Anvaya</span>
        </a>

        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#record">Record</a>
          <a href="#hospital">For hospitals</a>
        </div>

        <a className="nav-cta" href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
          Request a private demo
          <ArrowIcon />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-copy" data-reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Clinical Documentation Intelligence by TEIHSRA
          </div>

          <h1>
            Clinical work,
            <br />
            <em>remembered beautifully.</em>
          </h1>

          <p className="hero-lede">
            Anvaya turns everyday clinical capture into a continuously evolving, verified patient record—designed for the way doctors actually work.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
              Request a private demo
              <span className="button-orb">
                <ArrowIcon />
              </span>
            </a>
            <a className="text-link" href="#experience">
              See how it feels
              <span>↘</span>
            </a>
          </div>

          <div className="hero-proof">
            <div>
              <strong>Mobile first</strong>
              <span>Capture where care happens</span>
            </div>
            <div>
              <strong>Human verified</strong>
              <span>AI assists. Clinicians decide.</span>
            </div>
            <div>
              <strong>Hospital configurable</strong>
              <span>Adapted, not imposed</span>
            </div>
          </div>
        </div>

        <div className="hero-stage" data-reveal>
          <div className="stage-card stage-card-main">
            <div className="stage-topline">
              <div>
                <span className="mini-label">PATIENT OVERVIEW</span>
                <h3>{patients[activePatient].name}</h3>
                <p>{patients[activePatient].meta} · {patients[activePatient].sub}</p>
              </div>
              <span className="status-pill">Verified record</span>
            </div>

            <button
              className={`record-button ${recording ? "is-recording" : ""}`}
              onClick={() => setRecording((value) => !value)}
              aria-label={recording ? "Stop demo recording" : "Start demo recording"}
            >
              <span className="record-disc">
                <span />
              </span>
              <span>
                <small>{recording ? "RECORDING" : "ONE TAP"}</small>
                <strong>{recording ? formattedTime : "Record note"}</strong>
              </span>
              <span className="record-wave" aria-hidden="true">
                {[5, 10, 17, 8, 14, 20, 11, 7, 16, 12, 6].map((h, i) => (
                  <i key={i} style={{ height: `${h}px`, animationDelay: `${i * 70}ms` }} />
                ))}
              </span>
            </button>

            <div className="attention-card">
              <div className="attention-head">
                <span>Needs attention</span>
                <span className="attention-count">3</span>
              </div>
              <div className="attention-row">
                <span className="tiny-dot rose" />
                1 note awaiting co-sign
                <span>›</span>
              </div>
              <div className="attention-row">
                <span className="tiny-dot amber" />
                2 tasks due today
                <span>›</span>
              </div>
            </div>

            <div className="latest-note">
              <div className="mini-label">LATEST NOTE · 08:10</div>
              <p>
                POD 2 following right frontal craniotomy. Conscious, oriented, no new focal deficit. Wound healthy. Continue current management.
              </p>
              <div className="note-meta">
                <span>Dr A. Mehta</span>
                <span>Verified</span>
                <span>Co-signed</span>
              </div>
            </div>
          </div>

          <div className="floating-card patient-stack">
            <span className="mini-label">MY ROUND</span>
            {patients.map((patient, index) => (
              <button
                key={patient.name}
                className={index === activePatient ? "patient-row active" : "patient-row"}
                onClick={() => setActivePatient(index)}
              >
                <span className="patient-index">0{index + 1}</span>
                <span className="patient-copy">
                  <strong>{patient.name}</strong>
                  <small>{patient.meta}</small>
                </span>
                <span className="patient-status">{patient.status}</span>
              </button>
            ))}
          </div>

          <div className="floating-card smart-note">
            <div className="spark-badge">
              <SparkIcon />
            </div>
            <div>
              <span className="mini-label">ANVAYA NOTICED</span>
              <strong>Frequency not documented</strong>
              <p>“Keppra 500” preserved exactly as spoken.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto" id="experience">
        <div className="manifesto-kicker" data-reveal>
          <span>THE IDEA</span>
          <div className="hairline" />
        </div>

        <div className="manifesto-grid">
          <h2 data-reveal>
            Stop writing the same patient
            <br />
            <span>again and again.</span>
          </h2>
          <div className="manifesto-body" data-reveal>
            <p>
              Most clinical software begins with fields. Anvaya begins with a moment: a doctor standing beside a patient, needing to document what just happened.
            </p>
            <p>
              Capture once. Verify it. Let that information strengthen the record, the timeline, the next round, and the eventual case summary.
            </p>
          </div>
        </div>

        <div className="principle-grid">
          {principles.map((item) => (
            <article className="principle-card" key={item.number} data-reveal>
              <span className="principle-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="principle-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="record-section" id="record">
        <div className="section-heading" data-reveal>
          <span className="section-index">01 / CAPTURE</span>
          <h2>
            One tap should be
            <br />
            <em>enough to begin.</em>
          </h2>
          <p>
            No pre-form. No mandatory note-type menu. No hunting through modules. Open the patient and record.
          </p>
        </div>

        <div className="capture-demo" data-reveal>
          <div className="phone-shell">
            <div className="phone-speaker" />
            <div className="phone-screen">
              <div className="mobile-top">
                <span>9:41</span>
                <span className="mobile-brand">anvaya</span>
                <span>•••</span>
              </div>
              <div className="mobile-patient">
                <small>RAHUL PATIL · 42 M</small>
                <strong>Bed 12 · POD 2 · Dr Rao</strong>
              </div>

              <div className="mobile-record-zone">
                <button
                  className={`mobile-record ${recording ? "is-recording" : ""}`}
                  onClick={() => setRecording((value) => !value)}
                >
                  <span className="mobile-record-ring">
                    <i />
                  </span>
                  <strong>{recording ? formattedTime : "Record note"}</strong>
                  <small>{recording ? "Tap to stop" : "Tap once to begin"}</small>
                </button>
              </div>

              <div className="mobile-bottom-sheet">
                <span className="sheet-handle" />
                <div className="sheet-label">RECENT</div>
                <div className="sheet-row">
                  <span className="sheet-icon">N</span>
                  <span>
                    <strong>Morning review</strong>
                    <small>08:10 · Verified</small>
                  </span>
                  <span>›</span>
                </div>
                <div className="sheet-row">
                  <span className="sheet-icon">CT</span>
                  <span>
                    <strong>CT Brain</strong>
                    <small>Yesterday · Linked report</small>
                  </span>
                  <span>›</span>
                </div>
              </div>
            </div>
          </div>

          <div className="capture-story">
            <div className="story-step active">
              <span>1</span>
              <div>
                <small>CAPTURE</small>
                <strong>Speak naturally.</strong>
                <p>English, Indian English, or mixed-language clinical speech as supported by the configured language layer.</p>
              </div>
            </div>
            <div className="story-connector" />
            <div className="story-step">
              <span>2</span>
              <div>
                <small>STRUCTURE</small>
                <strong>Anvaya understands the document.</strong>
                <p>One recording can become a progress note, event note and procedure note when appropriate.</p>
              </div>
            </div>
            <div className="story-connector" />
            <div className="story-step">
              <span>3</span>
              <div>
                <small>VERIFY</small>
                <strong>You remain the author.</strong>
                <p>Edit directly in the formatted note. Resolve uncertainties. Verify when the record says what you mean.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="record-intelligence">
        <div className="intelligence-header" data-reveal>
          <span className="section-index">02 / RECORD</span>
          <h2>A record that gets stronger with every verified note.</h2>
        </div>

        <div className="timeline-demo" data-reveal>
          <div className="timeline-toolbar">
            <div className="segmented">
              <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
                Overview
              </button>
              <button className={activeTab === "timeline" ? "active" : ""} onClick={() => setActiveTab("timeline")}>
                Timeline
              </button>
            </div>
            <button className="since-button">Since last seen · 6 updates</button>
          </div>

          {activeTab === "overview" ? (
            <div className="overview-grid">
              <div className="overview-main">
                <div className="overview-kicker">LATEST CLINICAL NOTE</div>
                <h3>Post-operative day 2 review</h3>
                <p>
                  Conscious, oriented and hemodynamically stable. No new focal neurological deficit. Wound healthy. Drain output documented. Continue current management.
                </p>
                <div className="record-signatures">
                  <span><b>Documented</b> Dr A. Mehta</span>
                  <span><b>Verified</b> 08:14</span>
                  <span><b>Co-signed</b> Dr Rao</span>
                </div>
              </div>
              <div className="overview-side">
                <div className="side-label">NEEDS ATTENTION</div>
                <div className="side-item">
                  <span className="tiny-dot amber" />
                  Repeat CT tomorrow
                  <small>Accepted</small>
                </div>
                <div className="side-item">
                  <span className="tiny-dot rose" />
                  1 draft pending
                  <small>Review</small>
                </div>
                <div className="side-item">
                  <span className="tiny-dot sage" />
                  Drain removal
                  <small>Completed 07:40</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <div className="timeline-row" key={`${item.time}-${item.title}`}>
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-rail">
                    <span className={`timeline-node node-${index}`} />
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-kind">{item.kind}</span>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="case-summary-section">
        <div className="case-copy" data-reveal>
          <span className="section-index">03 / CASE SUMMARY</span>
          <h2>
            The summary is not written
            <br />
            <em>at the end.</em>
          </h2>
          <p>
            Anvaya begins assembling the master Case Summary from day one. At any point, verified information can be shaped into the output the situation requires.
          </p>

          <div className="summary-types">
            <span>Discharge</span>
            <span>Transfer</span>
            <span>Insurance</span>
            <span>Referral</span>
            <span>Custom</span>
          </div>
        </div>

        <div className="summary-paper-wrap" data-reveal>
          <div className="summary-paper">
            <div className="paper-head">
              <div>
                <span>CASE SUMMARY</span>
                <h3>Rahul Patil</h3>
              </div>
              <span className="paper-status">Live draft</span>
            </div>

            <div className="paper-rule" />

            <div className="paper-section">
              <span>FINAL DIAGNOSIS</span>
              <p>Right frontal space-occupying lesion — post-operative status.</p>
              <button>3 sources</button>
            </div>

            <div className="paper-section">
              <span>HOSPITAL COURSE</span>
              <p>
                The patient underwent right frontal craniotomy and excision. Post-operatively, neurological status remained stable. A transient seizure event was documented and reviewed...
              </p>
              <button>8 sources</button>
            </div>

            <div className="paper-warning">
              <SparkIcon />
              <div>
                <strong>One conflict needs review</strong>
                <span>Follow-up interval differs between two verified notes.</span>
              </div>
              <button>Resolve</button>
            </div>

            <div className="paper-footer">
              <span>Source-backed</span>
              <span>Clinician reviewed</span>
              <span>Versioned</span>
            </div>
          </div>
        </div>
      </section>

      <section className="consultant-section">
        <div className="consultant-shell" data-reveal>
          <div className="consultant-copy">
            <span className="section-index">04 / REVIEW</span>
            <h2>Built for the consultant who will review later.</h2>
            <p>
              Residents can document at the bedside. Consultants can review efficiently when their workflow permits—individually or in batches, with formal co-sign outcomes and amendments.
            </p>
          </div>

          <div className="review-panel">
            <div className="review-panel-head">
              <div>
                <span className="mini-label">FOR MY REVIEW</span>
                <h3>Good evening, Dr Rao.</h3>
              </div>
              <span className="review-total">17</span>
            </div>

            <div className="review-card-row">
              {reviewCards.map((card) => (
                <button className={`review-card tone-${card.tone}`} key={card.label}>
                  <span>{card.count}</span>
                  <strong>{card.label}</strong>
                  <small>Tap to review</small>
                </button>
              ))}
            </div>

            <div className="review-action">
              <div>
                <span className="review-avatar">AM</span>
                <span>
                  <strong>Rahul Patil · Progress Note</strong>
                  <small>Dr A. Mehta · 08:10</small>
                </span>
              </div>
              <div className="review-buttons">
                <button>Agree</button>
                <button>Comment</button>
                <button className="dark">Review</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hospital-section" id="hospital">
        <div className="hospital-heading" data-reveal>
          <span className="section-index">05 / HOSPITAL FIT</span>
          <h2>
            Anvaya adapts to the hospital.
            <br />
            <em>Not the other way around.</em>
          </h2>
        </div>

        <div className="hospital-grid">
          <div className="scaffold-card" data-reveal>
            <div className="scaffold-top">
              <span className="mini-label">SANKALAN LAUNCHPAD</span>
              <span className="scaffold-state">Scaffold v1.3</span>
            </div>
            <h3>Neurosurgery</h3>
            <p>Configure the details that make the workflow yours.</p>

            <div className="scaffold-map">
              <button className="scaffold-node active">Documentation</button>
              <button className="scaffold-node">Rounds</button>
              <button className="scaffold-node">Co-sign</button>
              <button className="scaffold-node">Case Summary</button>
              <button className="scaffold-node">Tasks</button>
              <button className="scaffold-node">QR / NFC</button>
              <button className="scaffold-node">Storage</button>
              <button className="scaffold-node">Roles</button>
            </div>

            <div className="scaffold-footer">
              <span>Launch readiness</span>
              <div className="readiness-track"><i /></div>
              <strong>94%</strong>
            </div>
          </div>

          <div className="hospital-copy-card" data-reveal>
            <span className="quote-mark">“</span>
            <blockquote>
              Configure down to the smallest operational detail—while Anvaya protects the integrity of the clinical record underneath.
            </blockquote>

            <div className="hospital-features">
              <div>
                <strong>Start simple</strong>
                <span>Quick Launch with sensible defaults.</span>
              </div>
              <div>
                <strong>Customize later</strong>
                <span>The same Scaffold can evolve progressively.</span>
              </div>
              <div>
                <strong>Remote-first</strong>
                <span>Launch Partners can configure hospitals without being on-site.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-grid-section">
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-value-card" key={product.label} data-reveal>
              <span>{product.label}</span>
              <h3>{product.value}</h3>
              <p>{product.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pilot-section">
        <div className="pilot-orbit orbit-a" aria-hidden="true" />
        <div className="pilot-orbit orbit-b" aria-hidden="true" />
        <div className="pilot-inner" data-reveal>
          <span className="pilot-kicker">PRIVATE HOSPITAL PILOTS</span>
          <h2>
            Bring better documentation
            <br />
            <em>into the clinical day.</em>
          </h2>
          <p>
            Anvaya is being prepared for private hospital pilots. We are speaking with clinical teams who want documentation to feel lighter, safer and more continuous.
          </p>
          <a className="pilot-button" href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
            Request a conversation
            <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <div>
            <strong>Anvaya</strong>
            <span>by TEIHSRA</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="https://teihsra.com">TEIHSRA</a>
          <a href="mailto:hello@teihsra.com">Contact</a>
          <a href="https://teihsra.com/privacy">Privacy</a>
          <a href="https://teihsra.com/terms">Terms</a>
        </div>

        <div className="footer-note">
          <span>Clinical Documentation Intelligence</span>
          <span>Private pilot development</span>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --paper: #f5f1e9;
          --paper-2: #fbf8f2;
          --ink: #1b201d;
          --muted: #69706a;
          --line: rgba(27, 32, 29, 0.13);
          --sage: #9bad91;
          --sage-deep: #6e8268;
          --rose: #c97972;
          --rose-soft: #ead1cc;
          --amber: #c89b55;
          --amber-soft: #eadbbd;
          --plum: #6e596d;
          --cream: #efe6d8;
          --white: #fffdf9;
          --mx: 50%;
          --my: 30%;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          background: var(--paper);
        }

        body {
          margin: 0;
          background: var(--paper);
          color: var(--ink);
        }

        body,
        button,
        input,
        textarea {
          font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          color: inherit;
        }

        .anvaya-page {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at var(--mx) var(--my), rgba(201, 121, 114, 0.08), transparent 26rem),
            linear-gradient(180deg, #faf6ee 0%, var(--paper) 34%, #f2eee5 100%);
          color: var(--ink);
        }

        .cursor-aura {
          position: fixed;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(200, 155, 85, 0.085), transparent 68%);
          pointer-events: none;
          z-index: 0;
          transition: left 180ms linear, top 180ms linear;
          filter: blur(6px);
        }

        .nav-shell {
          width: min(1400px, calc(100% - 56px));
          margin: 0 auto;
          padding: 22px 0;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 26px;
          position: relative;
          z-index: 20;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          width: fit-content;
        }

        .brand-word {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
          letter-spacing: -0.03em;
        }

        .brand-mark {
          width: 27px;
          height: 27px;
          display: grid;
          place-items: center;
          position: relative;
        }

        .brand-mark span {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ink);
        }

        .brand-mark span:nth-child(1) {
          left: 2px;
          top: 10px;
          background: var(--rose);
        }

        .brand-mark span:nth-child(2) {
          top: 2px;
          right: 3px;
          background: var(--sage-deep);
        }

        .brand-mark span:nth-child(3) {
          bottom: 2px;
          right: 3px;
          background: var(--amber);
        }

        .brand-mark::before,
        .brand-mark::after {
          content: "";
          position: absolute;
          height: 1px;
          width: 18px;
          background: rgba(27, 32, 29, 0.45);
          transform-origin: center;
        }

        .brand-mark::before {
          transform: rotate(-32deg);
        }

        .brand-mark::after {
          transform: rotate(32deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
          font-size: 13px;
          color: #4b514c;
        }

        .nav-links a {
          position: relative;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          height: 1px;
          left: 0;
          right: 100%;
          bottom: -6px;
          background: var(--ink);
          transition: right 250ms ease;
        }

        .nav-links a:hover::after {
          right: 0;
        }

        .nav-cta {
          justify-self: end;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          padding: 10px 14px 10px 18px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 12px;
          background: rgba(255, 253, 249, 0.72);
          backdrop-filter: blur(12px);
          transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          border-color: rgba(27, 32, 29, 0.25);
          background: var(--white);
        }

        .nav-cta svg,
        .primary-button svg,
        .pilot-button svg {
          width: 17px;
          height: 17px;
        }

        .hero {
          width: min(1400px, calc(100% - 56px));
          min-height: 800px;
          margin: 0 auto;
          padding: 88px 0 100px;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(540px, 1.08fr);
          gap: 40px;
          position: relative;
          align-items: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 730px;
          height: 730px;
          right: -210px;
          top: -80px;
          border-radius: 50%;
          border: 1px solid rgba(27, 32, 29, 0.055);
          box-shadow:
            inset 0 0 0 92px rgba(255, 255, 255, 0.11),
            inset 0 0 0 184px rgba(155, 173, 145, 0.025);
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.19;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.11'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        .hero-copy {
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #5f655f;
          margin-bottom: 28px;
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--rose);
          box-shadow: 0 0 0 6px rgba(201, 121, 114, 0.11);
        }

        .hero h1,
        .manifesto h2,
        .section-heading h2,
        .intelligence-header h2,
        .case-copy h2,
        .hospital-heading h2,
        .pilot-inner h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          letter-spacing: -0.055em;
          margin: 0;
        }

        .hero h1 {
          font-size: clamp(64px, 6vw, 104px);
          line-height: 0.91;
          max-width: 870px;
        }

        em {
          color: var(--plum);
          font-weight: 400;
        }

        .hero-lede {
          max-width: 600px;
          font-size: 19px;
          line-height: 1.65;
          color: #555c56;
          margin: 38px 0 0;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-top: 36px;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 9px 9px 9px 22px;
          min-height: 54px;
          background: var(--ink);
          color: #fffaf3;
          border-radius: 999px;
          font-size: 13px;
          box-shadow: 0 15px 35px rgba(27, 32, 29, 0.16);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 46px rgba(27, 32, 29, 0.22);
        }

        .button-orb {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fffaf3;
          color: var(--ink);
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #4a504b;
        }

        .text-link span {
          display: inline-block;
          transition: transform 220ms ease;
        }

        .text-link:hover span {
          transform: translate(4px, 4px);
        }

        .hero-proof {
          margin-top: 58px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 680px;
        }

        .hero-proof div {
          display: grid;
          gap: 5px;
        }

        .hero-proof strong {
          font-size: 12px;
          font-weight: 650;
        }

        .hero-proof span {
          color: #777d77;
          font-size: 11px;
          line-height: 1.45;
        }

        .hero-stage {
          position: relative;
          min-height: 650px;
          z-index: 3;
        }

        .stage-card {
          border: 1px solid rgba(27, 32, 29, 0.095);
          background: rgba(255, 253, 249, 0.92);
          box-shadow: 0 28px 80px rgba(49, 43, 36, 0.12);
          backdrop-filter: blur(18px);
        }

        .stage-card-main {
          width: min(610px, 92%);
          margin: 74px 0 0 auto;
          min-height: 490px;
          border-radius: 28px;
          padding: 28px;
          position: relative;
          transform: rotate(0.5deg);
        }

        .stage-topline {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--line);
        }

        .stage-topline h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-size: 28px;
          margin: 4px 0 5px;
          letter-spacing: -0.035em;
        }

        .stage-topline p {
          margin: 0;
          color: #7a807a;
          font-size: 11px;
        }

        .mini-label {
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8b8f8a;
        }

        .status-pill {
          padding: 7px 10px;
          border-radius: 999px;
          background: #edf1e9;
          color: #63725d;
          font-size: 9px;
          white-space: nowrap;
        }

        .record-button {
          width: 100%;
          margin-top: 20px;
          min-height: 78px;
          padding: 12px 16px;
          border: 0;
          border-radius: 18px;
          background: #1f2421;
          color: #fffaf3;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 14px;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 14px 34px rgba(27, 32, 29, 0.12);
          transition: transform 220ms ease, background 220ms ease;
        }

        .record-button:hover {
          transform: translateY(-2px);
        }

        .record-button.is-recording {
          background: #8e4c48;
        }

        .record-disc {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .record-disc span {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #e2948d;
          transition: border-radius 200ms ease, transform 200ms ease;
        }

        .record-button.is-recording .record-disc span {
          border-radius: 4px;
          transform: scale(0.82);
          background: #fff3ee;
        }

        .record-button small,
        .record-button strong {
          display: block;
        }

        .record-button small {
          font-size: 8px;
          letter-spacing: 0.14em;
          opacity: 0.62;
          margin-bottom: 5px;
        }

        .record-button strong {
          font-size: 16px;
          font-weight: 560;
        }

        .record-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 30px;
        }

        .record-wave i {
          display: block;
          width: 2px;
          border-radius: 99px;
          background: rgba(255,255,255,.55);
        }

        .is-recording .record-wave i {
          animation: wave 700ms ease-in-out infinite alternate;
        }

        @keyframes wave {
          from { transform: scaleY(.55); opacity: .4; }
          to { transform: scaleY(1.25); opacity: .95; }
        }

        .attention-card {
          margin-top: 18px;
          border-radius: 18px;
          background: #f6f1e7;
          padding: 14px 16px 10px;
          border: 1px solid rgba(27,32,29,.06);
        }

        .attention-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 650;
          margin-bottom: 8px;
        }

        .attention-count {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--ink);
          color: #fff;
          font-size: 9px;
        }

        .attention-row {
          min-height: 34px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
          border-top: 1px solid rgba(27,32,29,.07);
          font-size: 10px;
          color: #5f655f;
        }

        .tiny-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        .tiny-dot.rose { background: var(--rose); }
        .tiny-dot.amber { background: var(--amber); }
        .tiny-dot.sage { background: var(--sage-deep); }

        .latest-note {
          margin-top: 18px;
          padding: 4px 4px 0;
        }

        .latest-note p {
          margin: 8px 0 13px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          line-height: 1.48;
          color: #373c38;
        }

        .note-meta {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .note-meta span {
          padding: 5px 8px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 8px;
          color: #686e68;
        }

        .floating-card {
          position: absolute;
          border-radius: 22px;
          background: rgba(255,253,249,.95);
          border: 1px solid rgba(27,32,29,.09);
          box-shadow: 0 20px 48px rgba(54,48,40,.12);
          backdrop-filter: blur(18px);
        }

        .patient-stack {
          width: 275px;
          left: -28px;
          top: 8px;
          padding: 16px;
          transform: rotate(-1.1deg);
        }

        .patient-row {
          border: 0;
          border-top: 1px solid rgba(27,32,29,.07);
          background: transparent;
          width: 100%;
          min-height: 56px;
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 8px;
          padding: 6px 3px;
          text-align: left;
          cursor: pointer;
          opacity: .63;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .patient-row:first-of-type {
          margin-top: 8px;
        }

        .patient-row:hover,
        .patient-row.active {
          opacity: 1;
          transform: translateX(3px);
        }

        .patient-index {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          color: #9a9f99;
        }

        .patient-copy {
          display: grid;
          gap: 3px;
        }

        .patient-copy strong {
          font-size: 10px;
          font-weight: 650;
        }

        .patient-copy small {
          font-size: 8px;
          color: #878c87;
        }

        .patient-status {
          font-size: 7px;
          padding: 5px 7px;
          border-radius: 999px;
          background: #f1ecdf;
          color: #79766d;
          white-space: nowrap;
        }

        .smart-note {
          width: 286px;
          right: -22px;
          bottom: 24px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          padding: 16px;
          transform: rotate(1.4deg);
        }

        .spark-badge {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: #efe2dd;
          color: #a35e58;
          display: grid;
          place-items: center;
        }

        .spark-badge svg {
          width: 17px;
          height: 17px;
        }

        .smart-note strong {
          font-size: 10px;
          display: block;
          margin: 4px 0 3px;
        }

        .smart-note p {
          margin: 0;
          font-size: 8px;
          line-height: 1.4;
          color: #7b807b;
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 800ms cubic-bezier(.2,.7,.2,1), transform 800ms cubic-bezier(.2,.7,.2,1);
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .manifesto {
          width: min(1400px, calc(100% - 56px));
          margin: 0 auto;
          padding: 120px 0 150px;
          border-top: 1px solid var(--line);
        }

        .manifesto-kicker {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 18px;
          color: #777d77;
          font-size: 9px;
          letter-spacing: .14em;
        }

        .hairline {
          height: 1px;
          background: var(--line);
        }

        .manifesto-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 80px;
          align-items: start;
          padding-top: 50px;
        }

        .manifesto h2 {
          font-size: clamp(50px, 5.4vw, 84px);
          line-height: .96;
        }

        .manifesto h2 span {
          color: #77736c;
        }

        .manifesto-body {
          padding-top: 12px;
        }

        .manifesto-body p {
          margin: 0 0 18px;
          color: #5e645f;
          font-size: 15px;
          line-height: 1.75;
        }

        .principle-grid {
          margin-top: 95px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .principle-card {
          min-height: 315px;
          padding: 28px 28px 24px;
          border-radius: 4px 28px 4px 28px;
          border: 1px solid var(--line);
          background: rgba(255,253,249,.48);
          position: relative;
          overflow: hidden;
          transition: transform 260ms ease, background 260ms ease, box-shadow 260ms ease;
        }

        .principle-card:hover {
          transform: translateY(-6px);
          background: rgba(255,253,249,.92);
          box-shadow: 0 22px 50px rgba(55,48,40,.08);
        }

        .principle-number {
          font-family: Georgia, "Times New Roman", serif;
          color: var(--rose);
          font-size: 15px;
        }

        .principle-card h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          font-weight: 400;
          letter-spacing: -0.035em;
          max-width: 280px;
          margin: 70px 0 16px;
        }

        .principle-card p {
          color: #737973;
          font-size: 12px;
          line-height: 1.65;
          max-width: 330px;
        }

        .principle-line {
          position: absolute;
          height: 4px;
          left: 28px;
          right: 28px;
          bottom: 0;
          border-radius: 999px 999px 0 0;
          background: linear-gradient(90deg, var(--sage), var(--amber), var(--rose));
          transform: scaleX(.18);
          transform-origin: left;
          transition: transform 320ms ease;
        }

        .principle-card:hover .principle-line {
          transform: scaleX(1);
        }

        .record-section {
          background: #ede5d8;
          padding: 150px max(28px, calc((100vw - 1400px) / 2));
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 70px;
          align-items: center;
          position: relative;
        }

        .record-section::after {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          right: 8%;
          top: 4%;
          background: radial-gradient(circle at 36% 30%, rgba(255,255,255,.48), transparent 68%);
          pointer-events: none;
        }

        .section-index {
          display: block;
          font-size: 9px;
          letter-spacing: .16em;
          color: #7d817c;
          margin-bottom: 24px;
        }

        .section-heading h2,
        .intelligence-header h2,
        .case-copy h2,
        .hospital-heading h2 {
          font-size: clamp(48px, 4.8vw, 76px);
          line-height: .98;
        }

        .section-heading p,
        .case-copy > p {
          color: #646a65;
          max-width: 510px;
          font-size: 14px;
          line-height: 1.72;
          margin: 28px 0 0;
        }

        .capture-demo {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 52px;
          align-items: center;
          justify-content: end;
          position: relative;
          z-index: 2;
        }

        .phone-shell {
          width: 330px;
          height: 680px;
          border-radius: 48px;
          padding: 10px;
          background: #202522;
          box-shadow: 0 38px 80px rgba(27,32,29,.2);
          position: relative;
        }

        .phone-speaker {
          position: absolute;
          width: 78px;
          height: 22px;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          border-radius: 999px;
          background: #171b18;
        }

        .phone-screen {
          height: 100%;
          border-radius: 39px;
          overflow: hidden;
          background: #fbf8f1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .mobile-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px 12px;
          font-size: 9px;
          color: #6e746f;
        }

        .mobile-brand {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 14px;
          color: var(--ink);
        }

        .mobile-patient {
          padding: 28px 22px 10px;
          display: grid;
          gap: 6px;
        }

        .mobile-patient small {
          font-size: 8px;
          letter-spacing: .12em;
          color: #8c908c;
        }

        .mobile-patient strong {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 400;
        }

        .mobile-record-zone {
          flex: 1;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .mobile-record {
          border: 0;
          background: transparent;
          cursor: pointer;
          display: grid;
          justify-items: center;
          gap: 7px;
        }

        .mobile-record-ring {
          width: 142px;
          height: 142px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(201,121,114,.08);
          border: 1px solid rgba(201,121,114,.2);
          box-shadow:
            0 0 0 12px rgba(201,121,114,.04),
            0 18px 42px rgba(103, 74, 68, .08);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .mobile-record:hover .mobile-record-ring {
          transform: scale(1.035);
          box-shadow:
            0 0 0 16px rgba(201,121,114,.05),
            0 24px 48px rgba(103,74,68,.12);
        }

        .mobile-record-ring i {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--rose);
          box-shadow: inset 0 -8px 18px rgba(108,58,55,.16);
          transition: border-radius 200ms ease, transform 200ms ease;
        }

        .mobile-record.is-recording .mobile-record-ring {
          animation: recordingPulse 1.6s ease-in-out infinite;
        }

        .mobile-record.is-recording .mobile-record-ring i {
          border-radius: 16px;
          transform: scale(.76);
        }

        @keyframes recordingPulse {
          50% { box-shadow: 0 0 0 24px rgba(201,121,114,.055), 0 24px 48px rgba(103,74,68,.12); }
        }

        .mobile-record strong {
          font-size: 14px;
          margin-top: 14px;
        }

        .mobile-record small {
          font-size: 9px;
          color: #999d99;
        }

        .mobile-bottom-sheet {
          border-radius: 28px 28px 0 0;
          background: #fffdf9;
          border-top: 1px solid rgba(27,32,29,.08);
          padding: 9px 18px 18px;
          box-shadow: 0 -12px 32px rgba(65,56,45,.06);
        }

        .sheet-handle {
          display: block;
          width: 38px;
          height: 4px;
          border-radius: 99px;
          background: #ded9cf;
          margin: 0 auto 13px;
        }

        .sheet-label {
          font-size: 7px;
          letter-spacing: .14em;
          color: #949894;
          margin-bottom: 5px;
        }

        .sheet-row {
          min-height: 50px;
          display: grid;
          grid-template-columns: 31px 1fr auto;
          gap: 8px;
          align-items: center;
          border-top: 1px solid rgba(27,32,29,.06);
        }

        .sheet-icon {
          width: 25px;
          height: 25px;
          border-radius: 9px;
          background: #eff1ea;
          display: grid;
          place-items: center;
          font-size: 8px;
          color: #687465;
        }

        .sheet-row span:nth-child(2) {
          display: grid;
          gap: 3px;
        }

        .sheet-row strong {
          font-size: 9px;
        }

        .sheet-row small {
          font-size: 7px;
          color: #999d99;
        }

        .capture-story {
          display: grid;
          gap: 0;
        }

        .story-step {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 17px;
          align-items: start;
          opacity: .58;
          transition: opacity 240ms ease, transform 240ms ease;
        }

        .story-step:hover,
        .story-step.active {
          opacity: 1;
          transform: translateX(5px);
        }

        .story-step > span {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid rgba(27,32,29,.16);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 14px;
        }

        .story-step small {
          display: block;
          font-size: 7px;
          letter-spacing: .14em;
          color: #959a95;
          margin-bottom: 7px;
        }

        .story-step strong {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 400;
          letter-spacing: -.03em;
        }

        .story-step p {
          margin: 8px 0 0;
          font-size: 11px;
          line-height: 1.58;
          color: #757a75;
        }

        .story-connector {
          width: 1px;
          height: 58px;
          background: rgba(27,32,29,.14);
          margin-left: 21px;
        }

        .record-intelligence {
          padding: 150px max(28px, calc((100vw - 1400px) / 2));
          background: #f8f4ec;
        }

        .intelligence-header {
          display: grid;
          grid-template-columns: 0.42fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .intelligence-header h2 {
          max-width: 900px;
        }

        .timeline-demo {
          margin-top: 70px;
          border: 1px solid var(--line);
          border-radius: 30px;
          background: #fffdf9;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(64,55,46,.08);
        }

        .timeline-toolbar {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--line);
        }

        .segmented {
          display: flex;
          gap: 3px;
          padding: 4px;
          border-radius: 999px;
          background: #f0ece4;
        }

        .segmented button {
          border: 0;
          background: transparent;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 10px;
          cursor: pointer;
          color: #747a74;
        }

        .segmented button.active {
          background: #fffdf9;
          color: var(--ink);
          box-shadow: 0 3px 12px rgba(45,39,34,.06);
        }

        .since-button {
          border: 1px solid rgba(27,32,29,.12);
          background: transparent;
          border-radius: 999px;
          padding: 9px 12px;
          font-size: 9px;
          color: #6e746f;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 1.3fr .7fr;
          min-height: 360px;
        }

        .overview-main {
          padding: 40px 42px;
          border-right: 1px solid var(--line);
        }

        .overview-kicker,
        .side-label {
          font-size: 8px;
          letter-spacing: .14em;
          color: #929792;
        }

        .overview-main h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: -.04em;
          margin: 20px 0 16px;
        }

        .overview-main > p {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.62;
          color: #484e49;
          max-width: 740px;
        }

        .record-signatures {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 30px;
        }

        .record-signatures span {
          padding: 8px 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 9px;
          color: #747a75;
        }

        .record-signatures b {
          color: #414642;
          font-weight: 600;
        }

        .overview-side {
          padding: 40px 32px;
        }

        .side-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 9px;
          align-items: center;
          min-height: 62px;
          border-bottom: 1px solid rgba(27,32,29,.08);
          font-size: 11px;
        }

        .side-item small {
          color: #999d99;
          font-size: 8px;
        }

        .timeline-list {
          padding: 28px 42px 42px;
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 58px 28px 1fr;
          min-height: 77px;
        }

        .timeline-time {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          padding-top: 17px;
          color: #8a8f8a;
        }

        .timeline-rail {
          position: relative;
        }

        .timeline-rail::after {
          content: "";
          position: absolute;
          left: 50%;
          width: 1px;
          top: 0;
          bottom: 0;
          background: rgba(27,32,29,.11);
        }

        .timeline-node {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: 19px;
          transform: translateX(-50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--sage);
          box-shadow: 0 0 0 5px #fffdf9;
        }

        .node-1 { background: var(--rose); }
        .node-2 { background: var(--amber); }
        .node-3 { background: var(--plum); }

        .timeline-card {
          margin: 5px 0 8px 16px;
          padding: 13px 16px;
          border: 1px solid rgba(27,32,29,.08);
          border-radius: 14px;
          display: grid;
          grid-template-columns: 75px 1fr auto;
          gap: 10px;
          align-items: center;
          background: #fbf8f1;
        }

        .timeline-kind {
          font-size: 7px;
          letter-spacing: .13em;
          color: #909590;
        }

        .timeline-card strong {
          font-size: 11px;
        }

        .timeline-card small {
          font-size: 8px;
          color: #969b96;
        }

        .case-summary-section {
          padding: 160px max(28px, calc((100vw - 1400px) / 2));
          display: grid;
          grid-template-columns: .78fr 1.22fr;
          gap: 80px;
          align-items: center;
          background:
            linear-gradient(120deg, rgba(155,173,145,.12), transparent 38%),
            #f1eee6;
        }

        .summary-types {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 34px;
        }

        .summary-types span {
          padding: 8px 11px;
          border: 1px solid rgba(27,32,29,.12);
          border-radius: 999px;
          font-size: 9px;
          color: #6d736d;
          background: rgba(255,253,249,.45);
        }

        .summary-paper-wrap {
          perspective: 1600px;
        }

        .summary-paper {
          width: min(700px, 100%);
          margin-left: auto;
          background: #fffefb;
          border-radius: 4px;
          padding: 46px 48px 34px;
          box-shadow:
            0 45px 90px rgba(58,50,40,.13),
            18px 18px 0 rgba(255,255,255,.38);
          border: 1px solid rgba(27,32,29,.08);
          transform: rotateY(-3deg) rotateZ(.4deg);
          transition: transform 420ms cubic-bezier(.2,.7,.2,1);
        }

        .summary-paper:hover {
          transform: rotateY(0) rotateZ(0) translateY(-5px);
        }

        .paper-head {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 18px;
        }

        .paper-head > div span,
        .paper-section > span {
          font-size: 7px;
          letter-spacing: .15em;
          color: #989c98;
        }

        .paper-head h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          font-weight: 400;
          margin: 7px 0 0;
          letter-spacing: -.04em;
        }

        .paper-status {
          padding: 7px 9px;
          border-radius: 999px;
          background: #f0eee8;
          font-size: 8px;
          color: #7c817c;
        }

        .paper-rule {
          height: 1px;
          background: rgba(27,32,29,.12);
          margin: 25px 0 2px;
        }

        .paper-section {
          padding: 23px 0;
          border-bottom: 1px solid rgba(27,32,29,.09);
        }

        .paper-section p {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          line-height: 1.55;
          margin: 9px 0 11px;
          color: #404641;
        }

        .paper-section button {
          border: 0;
          background: #eff1eb;
          color: #687064;
          border-radius: 999px;
          font-size: 7px;
          padding: 5px 7px;
        }

        .paper-warning {
          margin-top: 24px;
          padding: 14px;
          border-radius: 14px;
          background: #f7eee9;
          display: grid;
          grid-template-columns: 28px 1fr auto;
          gap: 10px;
          align-items: center;
        }

        .paper-warning svg {
          width: 16px;
          height: 16px;
          color: var(--rose);
        }

        .paper-warning div {
          display: grid;
          gap: 3px;
        }

        .paper-warning strong {
          font-size: 9px;
        }

        .paper-warning span {
          font-size: 7px;
          color: #8b817d;
        }

        .paper-warning button {
          border: 1px solid rgba(27,32,29,.11);
          background: transparent;
          padding: 7px 9px;
          border-radius: 999px;
          font-size: 7px;
        }

        .paper-footer {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .paper-footer span {
          font-size: 7px;
          color: #858a85;
        }

        .paper-footer span:not(:last-child)::after {
          content: "·";
          margin-left: 8px;
        }

        .consultant-section {
          padding: 150px max(28px, calc((100vw - 1400px) / 2));
          background: #e6ddd0;
        }

        .consultant-shell {
          display: grid;
          grid-template-columns: .62fr 1.38fr;
          gap: 70px;
          align-items: center;
        }

        .consultant-copy h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 4vw, 66px);
          line-height: 1;
          font-weight: 400;
          letter-spacing: -.05em;
          margin: 0;
        }

        .consultant-copy p {
          margin: 25px 0 0;
          color: #666c66;
          font-size: 13px;
          line-height: 1.7;
        }

        .review-panel {
          background: #fbf9f4;
          border: 1px solid rgba(27,32,29,.1);
          border-radius: 26px;
          padding: 24px;
          box-shadow: 0 30px 70px rgba(60,51,41,.12);
        }

        .review-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .review-panel-head h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          font-weight: 400;
          margin: 5px 0 0;
          letter-spacing: -.035em;
        }

        .review-total {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--ink);
          color: #fffaf3;
          font-family: Georgia, "Times New Roman", serif;
        }

        .review-card-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 11px;
          margin-top: 24px;
        }

        .review-card {
          min-height: 130px;
          border: 0;
          border-radius: 18px;
          padding: 16px;
          text-align: left;
          display: grid;
          align-content: end;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 24px rgba(50,44,38,.09);
        }

        .tone-sage { background: #e5eadf; }
        .tone-amber { background: #eee0c5; }
        .tone-rose { background: #ead2cd; }

        .review-card span {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 35px;
          line-height: 1;
        }

        .review-card strong {
          font-size: 10px;
          margin-top: 12px;
        }

        .review-card small {
          font-size: 7px;
          color: #7f847f;
          margin-top: 4px;
        }

        .review-action {
          margin-top: 16px;
          padding: 14px 4px 0;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .review-action > div:first-child {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .review-avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #eee8de;
          font-size: 8px;
        }

        .review-action strong,
        .review-action small {
          display: block;
        }

        .review-action strong {
          font-size: 9px;
        }

        .review-action small {
          font-size: 7px;
          color: #929792;
          margin-top: 3px;
        }

        .review-buttons {
          display: flex;
          gap: 6px;
        }

        .review-buttons button {
          border: 1px solid rgba(27,32,29,.11);
          background: transparent;
          border-radius: 999px;
          padding: 8px 10px;
          font-size: 7px;
        }

        .review-buttons .dark {
          background: var(--ink);
          color: #fff;
        }

        .hospital-section {
          padding: 160px max(28px, calc((100vw - 1400px) / 2));
          background: #f7f3eb;
        }

        .hospital-heading {
          max-width: 1050px;
        }

        .hospital-grid {
          margin-top: 75px;
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          gap: 22px;
        }

        .scaffold-card,
        .hospital-copy-card {
          min-height: 520px;
          border-radius: 28px;
          border: 1px solid var(--line);
          padding: 30px;
        }

        .scaffold-card {
          background: #fffdf9;
          box-shadow: 0 25px 60px rgba(60,52,43,.07);
        }

        .scaffold-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .scaffold-state {
          font-size: 8px;
          padding: 7px 9px;
          border-radius: 999px;
          background: #f0eee7;
          color: #777c77;
        }

        .scaffold-card h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          font-weight: 400;
          margin: 35px 0 6px;
          letter-spacing: -.04em;
        }

        .scaffold-card > p {
          margin: 0;
          color: #858a85;
          font-size: 10px;
        }

        .scaffold-map {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 42px;
        }

        .scaffold-node {
          min-height: 84px;
          border: 1px solid rgba(27,32,29,.1);
          background: #faf7f0;
          border-radius: 16px;
          font-size: 9px;
          cursor: pointer;
          transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
        }

        .scaffold-node:hover {
          transform: translateY(-3px);
          border-color: rgba(27,32,29,.22);
        }

        .scaffold-node.active {
          background: #e5eadf;
          border-color: rgba(110,130,104,.2);
        }

        .scaffold-footer {
          margin-top: 42px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          font-size: 9px;
        }

        .readiness-track {
          height: 7px;
          background: #ede9e1;
          border-radius: 99px;
          overflow: hidden;
        }

        .readiness-track i {
          display: block;
          width: 94%;
          height: 100%;
          background: linear-gradient(90deg, var(--sage-deep), var(--amber));
          border-radius: inherit;
        }

        .hospital-copy-card {
          background: #202521;
          color: #fffaf3;
          position: relative;
          overflow: hidden;
        }

        .hospital-copy-card::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          right: -180px;
          top: -190px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,121,114,.18), transparent 64%);
        }

        .quote-mark {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 72px;
          line-height: .8;
          color: var(--amber);
        }

        .hospital-copy-card blockquote {
          margin: 35px 0 70px;
          max-width: 550px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 29px;
          line-height: 1.25;
          letter-spacing: -.025em;
        }

        .hospital-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,.14);
        }

        .hospital-features div {
          display: grid;
          gap: 7px;
        }

        .hospital-features strong {
          font-size: 9px;
        }

        .hospital-features span {
          color: rgba(255,255,255,.58);
          font-size: 8px;
          line-height: 1.5;
        }

        .product-grid-section {
          padding: 0 max(28px, calc((100vw - 1400px) / 2)) 150px;
          background: #f7f3eb;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .product-value-card {
          min-height: 230px;
          padding: 25px;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: rgba(255,253,249,.6);
          transition: transform 220ms ease, background 220ms ease;
        }

        .product-value-card:hover {
          transform: translateY(-5px);
          background: #fffdf9;
        }

        .product-value-card > span {
          font-size: 8px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #8c918c;
        }

        .product-value-card h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          font-weight: 400;
          margin: 68px 0 10px;
          letter-spacing: -.035em;
        }

        .product-value-card p {
          font-size: 10px;
          line-height: 1.6;
          color: #777d77;
        }

        .pilot-section {
          margin: 0;
          min-height: 620px;
          background: #efe4d8;
          position: relative;
          overflow: hidden;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 110px 28px;
        }

        .pilot-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(27,32,29,.09);
        }

        .orbit-a {
          width: 760px;
          height: 760px;
        }

        .orbit-b {
          width: 1020px;
          height: 1020px;
          border-style: dashed;
          border-color: rgba(27,32,29,.055);
          animation: rotateSlow 70s linear infinite;
        }

        @keyframes rotateSlow {
          to { transform: rotate(360deg); }
        }

        .pilot-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        .pilot-kicker {
          font-size: 9px;
          letter-spacing: .18em;
          color: #817e77;
        }

        .pilot-inner h2 {
          font-size: clamp(56px, 6vw, 92px);
          line-height: .94;
          margin-top: 24px;
        }

        .pilot-inner p {
          max-width: 650px;
          margin: 30px auto 0;
          color: #64645f;
          line-height: 1.68;
          font-size: 14px;
        }

        .pilot-button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-top: 38px;
          padding: 15px 20px;
          border-radius: 999px;
          background: var(--ink);
          color: #fffaf3;
          font-size: 11px;
          box-shadow: 0 18px 40px rgba(27,32,29,.15);
          transition: transform 220ms ease;
        }

        .pilot-button:hover {
          transform: translateY(-3px);
        }

        .footer {
          padding: 38px max(28px, calc((100vw - 1400px) / 2));
          background: #202521;
          color: rgba(255,255,255,.82);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          align-items: center;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer .brand-mark span:nth-child(1) { background: var(--rose); }
        .footer .brand-mark span:nth-child(2) { background: #b7c2ad; }
        .footer .brand-mark span:nth-child(3) { background: var(--amber); }
        .footer .brand-mark::before,
        .footer .brand-mark::after { background: rgba(255,255,255,.35); }

        .footer-brand > div {
          display: grid;
          gap: 2px;
        }

        .footer-brand strong {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          font-weight: 400;
        }

        .footer-brand span {
          font-size: 8px;
          color: rgba(255,255,255,.45);
        }

        .footer-links {
          display: flex;
          gap: 22px;
          font-size: 9px;
        }

        .footer-links a {
          color: rgba(255,255,255,.55);
          transition: color 180ms ease;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-note {
          justify-self: end;
          display: grid;
          text-align: right;
          gap: 4px;
          font-size: 8px;
          color: rgba(255,255,255,.45);
        }

        @media (max-width: 1120px) {
          .nav-shell {
            grid-template-columns: 1fr auto;
          }

          .nav-links {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            padding-top: 60px;
          }

          .hero-stage {
            min-height: 680px;
            width: min(760px, 100%);
            margin: 0 auto;
          }

          .manifesto-grid,
          .record-section,
          .case-summary-section,
          .consultant-shell,
          .hospital-grid {
            grid-template-columns: 1fr;
          }

          .record-section {
            gap: 70px;
          }

          .capture-demo {
            justify-content: start;
          }

          .intelligence-header {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .summary-paper {
            margin: 10px auto 0;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .consultant-copy {
            max-width: 720px;
          }
        }

        @media (max-width: 760px) {
          .cursor-aura {
            display: none;
          }

          .nav-shell,
          .hero,
          .manifesto {
            width: min(100% - 32px, 1400px);
          }

          .nav-shell {
            padding-top: 16px;
          }

          .nav-cta {
            padding: 9px 11px;
          }

          .nav-cta svg {
            display: none;
          }

          .hero {
            min-height: auto;
            padding: 72px 0 80px;
          }

          .hero h1 {
            font-size: clamp(54px, 15vw, 78px);
          }

          .hero-lede {
            font-size: 16px;
          }

          .hero-actions {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
          }

          .hero-proof {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hero-stage {
            min-height: 610px;
            margin-top: 20px;
          }

          .stage-card-main {
            width: 100%;
            margin: 100px 0 0;
            padding: 20px;
            border-radius: 22px;
            transform: none;
          }

          .patient-stack {
            width: 245px;
            left: 5px;
          }

          .smart-note {
            width: 245px;
            right: 6px;
            bottom: -10px;
          }

          .manifesto {
            padding: 90px 0 100px;
          }

          .manifesto-grid {
            gap: 40px;
          }

          .manifesto h2 {
            font-size: 48px;
          }

          .principle-grid {
            grid-template-columns: 1fr;
            margin-top: 55px;
          }

          .principle-card {
            min-height: 250px;
          }

          .principle-card h3 {
            margin-top: 44px;
          }

          .record-section,
          .record-intelligence,
          .case-summary-section,
          .consultant-section,
          .hospital-section {
            padding-top: 100px;
            padding-bottom: 100px;
          }

          .capture-demo {
            grid-template-columns: 1fr;
            justify-items: center;
          }

          .capture-story {
            width: 100%;
          }

          .phone-shell {
            width: min(330px, 100%);
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .overview-main {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .timeline-toolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .timeline-card {
            grid-template-columns: 1fr;
          }

          .summary-paper {
            padding: 30px 24px;
            transform: none;
          }

          .review-card-row {
            grid-template-columns: 1fr;
          }

          .review-card {
            min-height: 110px;
          }

          .review-action {
            align-items: flex-start;
            flex-direction: column;
          }

          .scaffold-map {
            grid-template-columns: repeat(2, 1fr);
          }

          .hospital-features {
            grid-template-columns: 1fr;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .footer {
            grid-template-columns: 1fr;
            text-align: left;
          }

          .footer-links {
            flex-wrap: wrap;
          }

          .footer-note {
            justify-self: start;
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}
