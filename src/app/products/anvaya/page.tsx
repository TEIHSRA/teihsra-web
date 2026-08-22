"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StoryStage = "admission" | "round" | "event" | "review" | "summary";

const PATIENTS = [
  { id: "rahul", name: "Rahul Patil", meta: "42 M · Bed 12", context: "POD 2 · Craniotomy", flag: "2 tasks" },
  { id: "meena", name: "Meena Shah", meta: "61 F · Bed 14", context: "Day 4 · Observation", flag: "Up to date" },
  { id: "ajay", name: "Ajay More", meta: "35 M · NSICU 03", context: "Day 1 · Post-op", flag: "1 review" },
];

const STORY_EVENTS = [
  { time: "08:10", type: "ROUND", title: "Morning review", detail: "Verified · Dr A. Mehta" },
  { time: "11:42", type: "EVENT", title: "Transient seizure", detail: "Linked to CT Brain" },
  { time: "12:18", type: "TASK", title: "Repeat CT tomorrow", detail: "Accepted · Resident team" },
  { time: "13:06", type: "REVIEW", title: "Consultant co-sign", detail: "Agree with comments" },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export default function AnvayaPage() {
  const [activePatient, setActivePatient] = useState(PATIENTS[0]);
  const [roundOrder, setRoundOrder] = useState(PATIENTS);
  const [dragged, setDragged] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [storyStage, setStoryStage] = useState<StoryStage>("admission");
  const [summaryReady, setSummaryReady] = useState(false);
  const [summaryProgress, setSummaryProgress] = useState(0);
  const [showSources, setShowSources] = useState(false);

  const stageRefs = {
    admission: useRef<HTMLElement | null>(null),
    round: useRef<HTMLElement | null>(null),
    event: useRef<HTMLElement | null>(null),
    review: useRef<HTMLElement | null>(null),
    summary: useRef<HTMLElement | null>(null),
  };

  const formatted = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [seconds]);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const stage = visible.target.getAttribute("data-stage") as StoryStage | null;
        if (stage) setStoryStage(stage);
      },
      { threshold: [0.28, 0.45, 0.65] }
    );

    Object.values(stageRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!summaryReady) return;
    setSummaryProgress(0);
    const id = window.setInterval(() => {
      setSummaryProgress((p) => {
        if (p >= 100) {
          window.clearInterval(id);
          return 100;
        }
        return p + 4;
      });
    }, 45);
    return () => window.clearInterval(id);
  }, [summaryReady]);

  function reorder(targetId: string) {
    if (!dragged || dragged === targetId) return;
    setRoundOrder((items) => {
      const current = [...items];
      const from = current.findIndex((item) => item.id === dragged);
      const to = current.findIndex((item) => item.id === targetId);
      if (from < 0 || to < 0) return items;
      const [moved] = current.splice(from, 1);
      current.splice(to, 0, moved);
      return current;
    });
  }

  return (
    <main className="anvaya-site">
      <div className="paper-noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="brand" aria-label="Anvaya home">
          <BrandMark />
          <span>
            <b>Anvaya</b>
            <small>by TEIHSRA</small>
          </span>
        </a>

        <nav>
          <a href="#experience">Experience</a>
          <a href="#record">Record</a>
          <a href="#case-summary">Case Summary</a>
          <a href="#hospital">Hospitals</a>
        </nav>

        <a className="quiet-cta" href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
          Private pilot
          <Arrow />
        </a>
      </header>

      <aside className="story-thread" aria-label="Anvaya story progress">
        {[
          ["admission", "Open"],
          ["round", "Round"],
          ["event", "Record"],
          ["review", "Review"],
          ["summary", "Summary"],
        ].map(([id, label]) => (
          <a key={id} className={storyStage === id ? "active" : ""} href={`#${id}`}>
            <span />
            <small>{label}</small>
          </a>
        ))}
      </aside>

      <section id="top" className="hero" ref={stageRefs.admission} data-stage="admission">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">Clinical Documentation Intelligence</span>
          <h1>
            Say it once.
            <br />
            <em>Let the record remember.</em>
          </h1>
          <p className="lede">
            Anvaya turns the moments of clinical care into a record that keeps building itself—reviewed, attributable, and ready when you need it.
          </p>

          <div className="hero-actions">
            <a className="main-cta" href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
              Request a private demo
              <span><Arrow /></span>
            </a>
            <a className="secondary-link" href="#experience">
              Follow one patient
              <span>↓</span>
            </a>
          </div>

          <div className="hero-principles">
            <span>Mobile-first</span>
            <span>Clinician-authored</span>
            <span>Hospital-configurable</span>
          </div>
        </div>

        <div className="hero-object" data-reveal>
          <div className="patient-sheet">
            <div className="patient-sheet-head">
              <div>
                <small>PATIENT OVERVIEW</small>
                <h2>{activePatient.name}</h2>
                <p>{activePatient.meta} · {activePatient.context}</p>
              </div>
              <span className="verified-pill">Verified record</span>
            </div>

            <button
              className={`record-hero ${recording ? "recording" : ""}`}
              onClick={() => {
                setRecording((v) => !v);
                if (!recording && seconds === 0) setSeconds(1);
              }}
            >
              <span className="record-icon"><i /></span>
              <span className="record-copy">
                <small>{recording ? "RECORDING" : "ONE TAP"}</small>
                <b>{recording ? formatted : "Record note"}</b>
              </span>
              <span className="wave">
                {[9, 17, 12, 23, 15, 8, 19, 12, 22, 13, 7, 18].map((h, i) => (
                  <i key={i} style={{ height: h, animationDelay: `${i * 55}ms` }} />
                ))}
              </span>
            </button>

            <div className="latest">
              <small>LATEST NOTE · 08:10</small>
              <p>
                POD 2 following right frontal craniotomy. Conscious, oriented, no new focal deficit. Wound healthy. Continue current management.
              </p>
              <div className="chips">
                <span>Dr A. Mehta</span>
                <span>Verified</span>
                <span>Co-signed</span>
              </div>
            </div>

            <div className="attention-strip">
              <span className="dot rose" />
              <b>1 note awaiting co-sign</b>
              <span className="dot amber" />
              <b>2 tasks due today</b>
            </div>
          </div>

          <div className="floating-round">
            <small>MY ROUND</small>
            {PATIENTS.map((p, i) => (
              <button key={p.id} className={p.id === activePatient.id ? "active" : ""} onClick={() => setActivePatient(p)}>
                <span>0{i + 1}</span>
                <span>
                  <b>{p.name}</b>
                  <small>{p.meta}</small>
                </span>
                <em>{p.flag}</em>
              </button>
            ))}
          </div>

          <div className="floating-intelligence">
            <span className="spark"><Spark /></span>
            <span>
              <small>ANVAYA NOTICED</small>
              <b>Frequency not documented</b>
              <p>“Keppra 500” preserved exactly as spoken.</p>
            </span>
          </div>
        </div>
      </section>

      <section id="experience" className="editorial-intro">
        <div className="editorial-label" data-reveal>
          <span>THE PREMISE</span>
          <i />
        </div>
        <div className="editorial-grid">
          <h2 data-reveal>
            More notes should mean
            <br />
            <em>a stronger record.</em>
            <br />
            Not more work.
          </h2>
          <div data-reveal>
            <p>
              Most hospital software asks clinicians to repeatedly re-enter what the team already knows. Anvaya is designed around continuity.
            </p>
            <p>
              Every verified note becomes useful again—in the timeline, the next round, consultant review, task follow-up, and the evolving Case Summary.
            </p>
          </div>
        </div>
      </section>

      <section id="round" className="round-story" ref={stageRefs.round} data-stage="round">
        <div className="round-copy" data-reveal>
          <span className="section-label">01 / ROUNDS</span>
          <h2>
            Rounds should move forward.
            <br />
            <em>Documentation should follow.</em>
          </h2>
          <p>
            Build your round, change the order, open the next patient, and record in one tap. Anvaya can extract tasks and instructions while each note still belongs to the patient’s own record.
          </p>
        </div>

        <div className="round-board" data-reveal>
          <div className="round-board-head">
            <div>
              <small>MORNING NEUROSURGERY ROUND</small>
              <h3>3 patients · 08:00</h3>
            </div>
            <span>Drag to reorder</span>
          </div>

          <div className="round-list">
            {roundOrder.map((p, index) => (
              <div
                key={p.id}
                draggable
                onDragStart={() => setDragged(p.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => reorder(p.id)}
                onDragEnd={() => setDragged(null)}
                className={dragged === p.id ? "dragging" : ""}
              >
                <span className="grip">⋮⋮</span>
                <span className="round-index">0{index + 1}</span>
                <span className="round-patient">
                  <b>{p.name}</b>
                  <small>{p.meta} · {p.context}</small>
                </span>
                <span className="round-flag">{p.flag}</span>
                <button onClick={() => setActivePatient(p)}>Open</button>
              </div>
            ))}
          </div>

          <div className="round-footer">
            <span><i className="dot sage" />Auto-advance enabled</span>
            <span><i className="dot amber" />Task extraction enabled</span>
            <button>Start round <Arrow /></button>
          </div>
        </div>
      </section>

      <section id="record" className="record-story" ref={stageRefs.event} data-stage="event">
        <div className="record-phone-wrap" data-reveal>
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-top">
              <span>9:41</span>
              <b>anvaya</b>
              <span>•••</span>
            </div>
            <div className="phone-patient">
              <small>RAHUL PATIL · 42 M</small>
              <b>Bed 12 · POD 2 · Dr Rao</b>
            </div>
            <div className="phone-center">
              <button
                className={`phone-record ${recording ? "recording" : ""}`}
                onClick={() => {
                  setRecording((v) => !v);
                  if (!recording && seconds === 0) setSeconds(1);
                }}
              >
                <span><i /></span>
                <b>{recording ? formatted : "Record note"}</b>
                <small>{recording ? "Tap to stop" : "Tap once to begin"}</small>
              </button>
            </div>
            <div className="phone-sheet">
              <span className="handle" />
              <small>RECENT</small>
              <div>
                <span className="mini-icon">N</span>
                <span><b>Morning review</b><small>08:10 · Verified</small></span>
                <span>›</span>
              </div>
              <div>
                <span className="mini-icon">CT</span>
                <span><b>CT Brain</b><small>Yesterday · Linked report</small></span>
                <span>›</span>
              </div>
            </div>
          </div>
        </div>

        <div className="record-copy" data-reveal>
          <span className="section-label">02 / RECORD</span>
          <h2>
            One tap should be
            <br />
            <em>enough to begin.</em>
          </h2>
          <p>
            No pre-form. No mandatory note-type menu. No hunt through modules. Open the patient and record.
          </p>

          <div className="record-sequence">
            <div>
              <span>1</span>
              <section>
                <small>CAPTURE</small>
                <b>Speak naturally.</b>
                <p>Dictate clinical work as you actually say it, including natural corrections and structuring commands.</p>
              </section>
            </div>
            <i />
            <div>
              <span>2</span>
              <section>
                <small>STRUCTURE</small>
                <b>Anvaya prepares the note.</b>
                <p>One recording may become multiple linked clinical notes when the content requires it.</p>
              </section>
            </div>
            <i />
            <div>
              <span>3</span>
              <section>
                <small>VERIFY</small>
                <b>Your judgement, beautifully documented.</b>
                <p>Anvaya organises and prepares. Clinicians review, verify, co-sign and author the clinical record.</p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="record-build">
        <div className="record-build-head" data-reveal>
          <span className="section-label">03 / THE RECORD</span>
          <h2>A patient story that becomes more useful as it grows.</h2>
        </div>

        <div className="timeline" data-reveal>
          {STORY_EVENTS.map((event, index) => (
            <article key={event.time}>
              <time>{event.time}</time>
              <span className={`timeline-node node-${index}`} />
              <div>
                <small>{event.type}</small>
                <b>{event.title}</b>
                <span>{event.detail}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="since">
          <span>Since you last reviewed Rahul:</span>
          <b>6 notes</b>
          <b>1 procedure</b>
          <b>2 investigations</b>
          <b>3 completed tasks</b>
          <b>1 new event</b>
        </div>
      </section>

      <section id="review" className="review-story" ref={stageRefs.review} data-stage="review">
        <div className="review-copy" data-reveal>
          <span className="section-label">04 / CONSULTANT REVIEW</span>
          <h2>
            Review when you review.
            <br />
            <em>Not when the software demands it.</em>
          </h2>
          <p>
            Residents can document at the bedside. Consultants can review later—individually or in batches—with formal co-sign outcomes, comments, corrections and amendments.
          </p>
        </div>

        <div className="review-ui" data-reveal>
          <div className="review-head">
            <div>
              <small>FOR MY REVIEW</small>
              <h3>Good evening, Dr Rao.</h3>
            </div>
            <span>17</span>
          </div>

          <div className="review-counts">
            <button><b>12</b><span>Progress notes</span><small>Review</small></button>
            <button><b>2</b><span>Operative notes</span><small>Review</small></button>
            <button><b>3</b><span>Case summaries</span><small>Review</small></button>
          </div>

          <div className="review-item">
            <div>
              <span className="avatar">AM</span>
              <span><b>Rahul Patil · Progress Note</b><small>Dr A. Mehta · 08:10</small></span>
            </div>
            <div>
              <button>Agree</button>
              <button>Comment</button>
              <button className="primary">Review</button>
            </div>
          </div>
        </div>
      </section>

      <section className="wow-section" ref={stageRefs.summary} data-stage="summary">
        <div className="wow-copy" data-reveal>
          <span>Eight days of admission.</span>
          <h2>Already documented.</h2>
        </div>

        <div className="event-counters" data-reveal>
          {[
            ["18", "progress notes"],
            ["1", "operation"],
            ["2", "procedures"],
            ["3", "consultant reviews"],
            ["1", "seizure"],
            ["7", "completed instructions"],
          ].map(([n, label]) => (
            <div key={label}><b>{n}</b><span>{label}</span></div>
          ))}
        </div>

        <button
          className={`prepare-summary ${summaryReady ? "done" : ""}`}
          onClick={() => setSummaryReady(true)}
        >
          <span>{summaryReady ? "Case Summary prepared" : "Prepare Case Summary"}</span>
          <Arrow />
        </button>

        <div className={`summary-progress ${summaryReady ? "active" : ""}`}>
          <i style={{ width: `${summaryProgress}%` }} />
        </div>
      </section>

      <section id="case-summary" className={`case-summary ${summaryReady ? "assembled" : ""}`}>
        <div className="case-summary-copy" data-reveal>
          <span className="section-label">05 / CASE SUMMARY</span>
          <h2>
            The discharge summary should not begin
            <br />
            <em>on discharge day.</em>
          </h2>
          <p>
            Anvaya begins assembling the master Case Summary from day one. When the situation demands a discharge, transfer, insurance, referral or custom output, the record is already there.
          </p>

          <div className="summary-tags">
            <span>Discharge</span>
            <span>Transfer</span>
            <span>Insurance</span>
            <span>Referral</span>
            <span>Custom</span>
          </div>
        </div>

        <div className="document-stage" data-reveal>
          <div className="source-stack source-a">Progress Note · 08:10</div>
          <div className="source-stack source-b">Operative Note · Day 1</div>
          <div className="source-stack source-c">Consultant Review · 13:06</div>

          <article className="summary-document">
            <header>
              <div>
                <small>MASTER CASE SUMMARY</small>
                <h3>Rahul Patil</h3>
              </div>
              <span>Live draft</span>
            </header>

            <hr />

            <section>
              <small>FINAL DIAGNOSIS</small>
              <p>Right frontal space-occupying lesion — post-operative status.</p>
              <button onClick={() => setShowSources((v) => !v)}>3 sources</button>
            </section>

            <section>
              <small>HOSPITAL COURSE</small>
              <p>
                The patient underwent right frontal craniotomy and excision. Post-operatively, neurological status remained stable. A transient seizure event was documented and reviewed. Subsequent management and consultant recommendations are reflected in the verified record.
              </p>
              <button onClick={() => setShowSources((v) => !v)}>8 sources</button>
            </section>

            <div className="conflict">
              <Spark />
              <span>
                <b>One conflict needs review</b>
                <small>Follow-up interval differs between two verified notes.</small>
              </span>
              <button>Resolve</button>
            </div>

            <footer>
              <span>Source-backed</span>
              <span>Clinician reviewed</span>
              <span>Versioned</span>
            </footer>
          </article>

          {showSources && (
            <div className="source-fan">
              <article><small>08:10</small><b>Morning review</b><p>Neurologically stable. Continue current management.</p></article>
              <article><small>11:42</small><b>Seizure event</b><p>Transient event documented and linked to CT Brain.</p></article>
              <article><small>13:06</small><b>Consultant review</b><p>Agree with comments. Repeat CT tomorrow.</p></article>
            </div>
          )}
        </div>
      </section>

      <section id="hospital" className="hospital-fit">
        <div className="hospital-fit-copy" data-reveal>
          <span className="section-label">06 / HOSPITAL FIT</span>
          <h2>
            Anvaya adapts to the hospital.
            <br />
            <em>Not the other way around.</em>
          </h2>
          <p>
            Start with sensible defaults. Then configure down to the smallest operational detail—roles, co-sign rules, rounds, storage, Case Summary formats, QR, NFC and more.
          </p>
        </div>

        <div className="launchpad" data-reveal>
          <div className="launchpad-head">
            <div>
              <small>SANKALAN LAUNCHPAD</small>
              <h3>Neurosurgery Scaffold</h3>
            </div>
            <span>v1.3</span>
          </div>

          <div className="launchpad-grid">
            {["Documentation", "Rounds", "Co-sign", "Case Summary", "Tasks", "QR / NFC", "Storage", "Roles"].map((item, i) => (
              <button key={item} className={i === 0 ? "active" : ""}>{item}</button>
            ))}
          </div>

          <div className="readiness">
            <span>Launch readiness</span>
            <div><i /></div>
            <b>94%</b>
          </div>

          <div className="launchpad-note">
            <span><Spark /></span>
            <p><b>One decision remains.</b> No consultant verifier is assigned to Neurosurgery.</p>
            <button>Fix now</button>
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
            Clinical documentation,
            <br />
            <em>finally designed like clinical work.</em>
          </h2>
          <p>
            Anvaya is being prepared for private hospital pilots with teams who want documentation to feel lighter, safer and more continuous.
          </p>
          <a href="mailto:hello@teihsra.com?subject=Anvaya%20Private%20Pilot">
            Request a conversation
            <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <BrandMark />
          <span><b>Anvaya</b><small>by TEIHSRA</small></span>
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
          --ivory:#f5f0e7;
          --ivory-2:#fbf8f2;
          --ink:#20241f;
          --charcoal:#333832;
          --muted:#70766f;
          --line:rgba(32,36,31,.12);
          --moss:#809178;
          --moss-soft:#e2e8dc;
          --ox:#a75c54;
          --ox-soft:#ead2cd;
          --brass:#bc8e49;
          --brass-soft:#ecdec1;
          --plum:#6d5a6b;
          --stone:#ded6ca;
        }

        * { box-sizing:border-box; }
        html { scroll-behavior:smooth; background:var(--ivory); }
        body { margin:0; background:var(--ivory); color:var(--ink); }
        body, button, input, textarea { font-family:Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        a { color:inherit; text-decoration:none; }
        button { color:inherit; font:inherit; -webkit-tap-highlight-color:transparent; }

        .anvaya-site {
          position:relative;
          overflow:hidden;
          background:
            radial-gradient(circle at 76% 8%, rgba(188,142,73,.08), transparent 28rem),
            radial-gradient(circle at 18% 32%, rgba(128,145,120,.06), transparent 30rem),
            var(--ivory);
        }

        .paper-noise {
          position:fixed;
          inset:0;
          pointer-events:none;
          z-index:50;
          opacity:.14;
          mix-blend-mode:multiply;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.10'/%3E%3C/svg%3E");
        }

        [data-reveal] {
          opacity:0;
          transform:translateY(26px);
          transition:opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
        }
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

        .brand {
          display:inline-flex;
          align-items:center;
          gap:11px;
          width:max-content;
        }
        .brand > span:last-child { display:grid; gap:1px; }
        .brand b {
          font-family:Georgia, "Times New Roman", serif;
          font-size:23px;
          font-weight:400;
          letter-spacing:-.03em;
        }
        .brand small { font-size:7px; letter-spacing:.12em; text-transform:uppercase; color:#8c918b; }

        .brand-mark {
          position:relative;
          width:28px;
          height:28px;
          display:block;
        }
        .brand-mark i {
          position:absolute;
          width:7px;
          height:7px;
          border-radius:50%;
        }
        .brand-mark i:nth-child(1){ left:1px; top:10px; background:var(--ox); }
        .brand-mark i:nth-child(2){ right:2px; top:2px; background:var(--moss); }
        .brand-mark i:nth-child(3){ right:2px; bottom:2px; background:var(--brass); }
        .brand-mark::before,.brand-mark::after {
          content:"";
          position:absolute;
          left:6px;
          top:13px;
          width:18px;
          height:1px;
          background:rgba(32,36,31,.35);
          transform-origin:left center;
        }
        .brand-mark::before{ transform:rotate(-31deg); }
        .brand-mark::after{ transform:rotate(31deg); }

        .topbar nav { display:flex; gap:28px; font-size:11px; color:#5c625c; }
        .topbar nav a { position:relative; padding:8px 0; }
        .topbar nav a::after{
          content:""; position:absolute; left:0; right:100%; bottom:3px; height:1px; background:var(--ink); transition:right .25s ease;
        }
        .topbar nav a:hover::after{ right:0; }

        .quiet-cta {
          justify-self:end;
          display:inline-flex;
          align-items:center;
          gap:11px;
          padding:10px 13px 10px 17px;
          border:1px solid var(--line);
          border-radius:999px;
          background:rgba(251,248,242,.65);
          backdrop-filter:blur(12px);
          font-size:10px;
          transition:transform .22s ease, background .22s ease;
        }
        .quiet-cta:hover{ transform:translateY(-2px); background:#fffdf8; }
        .quiet-cta svg{ width:16px; }

        .story-thread {
          position:fixed;
          z-index:15;
          left:20px;
          top:50%;
          transform:translateY(-50%);
          display:grid;
          gap:15px;
        }
        .story-thread a {
          display:grid;
          grid-template-columns:10px auto;
          align-items:center;
          gap:8px;
          color:#a1a59f;
        }
        .story-thread a > span {
          width:6px; height:6px; border-radius:50%; background:#bbbeb9; transition:all .25s ease;
        }
        .story-thread small {
          font-size:7px;
          letter-spacing:.1em;
          text-transform:uppercase;
          opacity:0;
          transform:translateX(-6px);
          transition:all .25s ease;
        }
        .story-thread a.active { color:var(--ink); }
        .story-thread a.active > span { background:var(--ox); box-shadow:0 0 0 5px rgba(167,92,84,.1); }
        .story-thread a.active small { opacity:1; transform:none; }

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
        .hero::after{
          content:"";
          position:absolute;
          width:690px; height:690px;
          border:1px solid rgba(32,36,31,.055);
          border-radius:50%;
          right:-170px; top:-60px;
          box-shadow:inset 0 0 0 90px rgba(255,255,255,.10), inset 0 0 0 180px rgba(128,145,120,.025);
          pointer-events:none;
        }

        .eyebrow,.section-label {
          font-size:8px;
          letter-spacing:.18em;
          text-transform:uppercase;
          color:#7f847e;
        }

        .hero h1,.editorial-grid h2,.round-copy h2,.record-copy h2,.record-build-head h2,.review-copy h2,.case-summary-copy h2,.hospital-fit-copy h2,.closing h2 {
          font-family:Georgia, "Times New Roman", serif;
          font-weight:400;
          letter-spacing:-.055em;
          margin:0;
        }
        .hero h1 { font-size:clamp(66px, 6.4vw, 108px); line-height:.91; margin-top:26px; }
        em { color:var(--plum); font-weight:400; }

        .lede {
          max-width:590px;
          margin:38px 0 0;
          color:#585f58;
          font-size:18px;
          line-height:1.65;
        }

        .hero-actions {
          display:flex;
          align-items:center;
          gap:28px;
          margin-top:36px;
        }
        .main-cta {
          min-height:54px;
          display:inline-flex;
          align-items:center;
          gap:15px;
          padding:8px 8px 8px 20px;
          border-radius:999px;
          background:var(--ink);
          color:#fffaf1;
          font-size:11px;
          box-shadow:0 18px 38px rgba(32,36,31,.15);
          transition:transform .22s ease;
        }
        .main-cta:hover{ transform:translateY(-3px); }
        .main-cta > span {
          width:38px; height:38px; border-radius:50%; display:grid; place-items:center; background:#fffaf1; color:var(--ink);
        }
        .main-cta svg,.secondary-link svg{ width:16px; }

        .secondary-link { font-size:11px; display:inline-flex; gap:9px; align-items:center; color:#5e645e; }
        .secondary-link span{ transition:transform .2s ease; }
        .secondary-link:hover span{ transform:translateY(4px); }

        .hero-principles {
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:52px;
        }
        .hero-principles span {
          padding:7px 10px;
          border:1px solid var(--line);
          border-radius:999px;
          font-size:8px;
          color:#737973;
          background:rgba(251,248,242,.55);
        }

        .hero-object { min-height:650px; position:relative; z-index:2; }
        .patient-sheet {
          width:min(620px, 90%);
          margin:76px 0 0 auto;
          padding:28px;
          border-radius:28px;
          border:1px solid rgba(32,36,31,.10);
          background:rgba(255,253,249,.92);
          backdrop-filter:blur(18px);
          box-shadow:0 32px 85px rgba(56,48,40,.13);
          transform:rotate(.35deg);
        }
        .patient-sheet-head {
          display:flex;
          justify-content:space-between;
          gap:18px;
          align-items:flex-start;
          padding-bottom:22px;
          border-bottom:1px solid var(--line);
        }
        .patient-sheet-head small,.latest > small,.floating-round > small,.floating-intelligence small,.round-board-head small,.phone-patient small,.phone-sheet > small,.review-head small,.launchpad-head small,.summary-document small {
          font-size:7px;
          letter-spacing:.15em;
          text-transform:uppercase;
          color:#92968f;
        }
        .patient-sheet-head h2 {
          font-family:Georgia, "Times New Roman", serif;
          font-size:29px;
          font-weight:400;
          letter-spacing:-.04em;
          margin:5px 0 5px;
        }
        .patient-sheet-head p{ margin:0; font-size:9px; color:#888d87; }
        .verified-pill {
          padding:7px 9px; border-radius:999px; background:var(--moss-soft); color:#64725f; font-size:8px; white-space:nowrap;
        }

        .record-hero {
          width:100%;
          margin-top:18px;
          min-height:82px;
          border:0;
          border-radius:18px;
          background:#212621;
          color:#fffaf2;
          display:grid;
          grid-template-columns:auto 1fr auto;
          gap:14px;
          align-items:center;
          text-align:left;
          padding:13px 16px;
          cursor:pointer;
          transition:transform .2s ease, background .2s ease;
        }
        .record-hero:hover{ transform:translateY(-2px); }
        .record-hero.recording{ background:#8e4b45; }

        .record-icon {
          width:52px; height:52px; border-radius:50%; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.08); display:grid; place-items:center;
        }
        .record-icon i { width:18px; height:18px; border-radius:50%; background:#e99a92; transition:.2s ease; }
        .recording .record-icon i{ border-radius:4px; transform:scale(.8); background:#fff6ef; }

        .record-copy{ display:grid; gap:4px; }
        .record-copy small{ font-size:7px; letter-spacing:.15em; opacity:.58; }
        .record-copy b{ font-size:16px; font-weight:560; }

        .wave { height:30px; display:flex; align-items:center; gap:3px; }
        .wave i { width:2px; border-radius:99px; background:rgba(255,255,255,.5); }
        .recording .wave i { animation:wave .7s ease-in-out infinite alternate; }
        @keyframes wave{ from{ transform:scaleY(.5); opacity:.4 } to{ transform:scaleY(1.3); opacity:1 } }

        .latest { padding:19px 3px 0; }
        .latest p {
          font-family:Georgia, "Times New Roman", serif;
          font-size:16px;
          line-height:1.5;
          color:#3d433d;
          margin:9px 0 13px;
        }
        .chips { display:flex; gap:6px; flex-wrap:wrap; }
        .chips span{ border:1px solid var(--line); border-radius:999px; padding:5px 8px; font-size:7px; color:#747a73; }

        .attention-strip {
          margin-top:18px;
          padding-top:14px;
          border-top:1px solid var(--line);
          display:grid;
          grid-template-columns:auto 1fr auto 1fr;
          gap:8px;
          align-items:center;
          font-size:8px;
          color:#656b65;
        }
        .dot{ width:7px; height:7px; border-radius:50%; display:inline-block; }
        .rose{ background:var(--ox); }
        .amber{ background:var(--brass); }
        .sage{ background:var(--moss); }

        .floating-round,.floating-intelligence {
          position:absolute;
          border:1px solid rgba(32,36,31,.09);
          background:rgba(255,253,249,.96);
          backdrop-filter:blur(18px);
          box-shadow:0 20px 50px rgba(55,48,40,.12);
        }

        .floating-round {
          left:-22px; top:8px; width:270px; border-radius:22px; padding:15px; transform:rotate(-1.1deg);
        }
        .floating-round button {
          width:100%; min-height:55px; border:0; border-top:1px solid rgba(32,36,31,.07); background:transparent;
          display:grid; grid-template-columns:27px 1fr auto; align-items:center; gap:8px; text-align:left; cursor:pointer; opacity:.6; transition:.2s ease;
        }
        .floating-round button.active,.floating-round button:hover{ opacity:1; transform:translateX(3px); }
        .floating-round button > span:first-child{ font-family:Georgia, "Times New Roman", serif; color:#9ca09b; font-size:12px; }
        .floating-round button > span:nth-child(2){ display:grid; gap:2px; }
        .floating-round button b{ font-size:9px; }
        .floating-round button small{ font-size:7px; color:#979c96; }
        .floating-round button em {
          font-family:Inter, sans-serif;
          font-style:normal;
          padding:5px 7px;
          border-radius:999px;
          background:#f0ebe1;
          color:#7b786f;
          font-size:6px;
          white-space:nowrap;
        }

        .floating-intelligence {
          right:-18px; bottom:30px; width:285px; border-radius:20px; padding:15px;
          display:grid; grid-template-columns:auto 1fr; gap:11px; transform:rotate(1.2deg);
        }
        .spark {
          width:34px; height:34px; border-radius:11px; display:grid; place-items:center; background:var(--ox-soft); color:var(--ox);
        }
        .spark svg{ width:16px; }
        .floating-intelligence > span:last-child{ display:grid; gap:4px; }
        .floating-intelligence b{ font-size:9px; }
        .floating-intelligence p{ margin:0; color:#858a84; font-size:7px; line-height:1.45; }

        .editorial-intro {
          width:min(1420px, calc(100% - 56px));
          margin:0 auto;
          padding:120px 0 150px;
          border-top:1px solid var(--line);
        }
        .editorial-label { display:grid; grid-template-columns:auto 1fr; gap:17px; align-items:center; }
        .editorial-label span{ font-size:8px; letter-spacing:.16em; color:#838882; }
        .editorial-label i{ height:1px; background:var(--line); }
        .editorial-grid {
          margin-top:48px;
          display:grid;
          grid-template-columns:1.2fr .8fr;
          gap:80px;
          align-items:start;
        }
        .editorial-grid h2 { font-size:clamp(52px, 5.2vw, 85px); line-height:.95; }
        .editorial-grid > div p {
          margin:0 0 18px; color:#606660; font-size:14px; line-height:1.75;
        }

        .round-story {
          padding:150px max(28px, calc((100vw - 1420px) / 2));
          background:#ebe2d5;
          display:grid;
          grid-template-columns:.75fr 1.25fr;
          gap:75px;
          align-items:center;
        }
        .round-copy h2,.record-copy h2,.review-copy h2,.case-summary-copy h2,.hospital-fit-copy h2 {
          font-size:clamp(48px, 4.7vw, 76px);
          line-height:.98;
          margin-top:22px;
        }
        .round-copy p,.record-copy > p,.review-copy p,.case-summary-copy > p,.hospital-fit-copy > p{
          margin:26px 0 0; max-width:540px; color:#626862; font-size:13px; line-height:1.72;
        }

        .round-board {
          border:1px solid rgba(32,36,31,.10);
          border-radius:28px;
          background:#fffdf8;
          padding:24px;
          box-shadow:0 28px 70px rgba(61,52,43,.10);
        }
        .round-board-head { display:flex; justify-content:space-between; gap:20px; align-items:flex-start; padding-bottom:18px; border-bottom:1px solid var(--line); }
        .round-board-head h3{ font-family:Georgia, "Times New Roman", serif; font-size:27px; font-weight:400; margin:5px 0 0; }
        .round-board-head > span{ font-size:8px; color:#8a8f89; padding:7px 9px; border-radius:999px; background:#f1ede5; }

        .round-list{ display:grid; }
        .round-list > div {
          min-height:76px;
          display:grid;
          grid-template-columns:26px 30px 1fr auto auto;
          gap:10px;
          align-items:center;
          border-bottom:1px solid rgba(32,36,31,.07);
          cursor:grab;
          transition:transform .18s ease, opacity .18s ease, background .18s ease;
        }
        .round-list > div:hover{ background:#faf7f0; transform:translateX(3px); }
        .round-list > div.dragging{ opacity:.35; transform:scale(.985); }
        .grip{ color:#aaaDA8; font-size:13px; letter-spacing:-3px; }
        .round-index{ font-family:Georgia, "Times New Roman", serif; color:#9fa39e; font-size:12px; }
        .round-patient{ display:grid; gap:3px; }
        .round-patient b{ font-size:10px; }
        .round-patient small{ font-size:7px; color:#979c96; }
        .round-flag{ padding:6px 8px; border-radius:999px; background:#f0ece3; font-size:7px; color:#7b7f79; }
        .round-list button{ border:1px solid var(--line); background:transparent; border-radius:999px; padding:7px 10px; font-size:7px; cursor:pointer; }

        .round-footer {
          padding-top:18px;
          display:flex;
          align-items:center;
          gap:17px;
          flex-wrap:wrap;
        }
        .round-footer span{ font-size:7px; color:#777d76; display:inline-flex; gap:6px; align-items:center; }
        .round-footer button {
          margin-left:auto;
          border:0;
          border-radius:999px;
          background:var(--ink);
          color:#fffaf2;
          display:inline-flex;
          align-items:center;
          gap:9px;
          padding:10px 13px;
          font-size:8px;
        }
        .round-footer svg{ width:14px; }

        .record-story {
          padding:150px max(28px, calc((100vw - 1420px) / 2));
          background:#f4efe6;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:90px;
          align-items:center;
        }

        .record-phone-wrap { display:grid; place-items:center; }
        .phone {
          width:330px; height:680px;
          border-radius:48px; padding:10px; background:#20251f;
          box-shadow:0 38px 90px rgba(32,36,31,.20);
          position:relative;
        }
        .phone-notch{ position:absolute; z-index:2; width:78px; height:22px; border-radius:999px; background:#161a16; top:18px; left:50%; transform:translateX(-50%); }
        .phone > div:not(.phone-notch){ background:#fbf8f1; }
        .phone-top {
          height:46px;
          border-radius:39px 39px 0 0;
          display:flex; align-items:center; justify-content:space-between;
          padding:10px 20px 0;
          font-size:8px; color:#777d77;
        }
        .phone-top b{ font-family:Georgia, "Times New Roman", serif; font-size:13px; color:var(--ink); font-weight:400; }
        .phone-patient{ padding:28px 22px 8px; display:grid; gap:5px; }
        .phone-patient b{ font-family:Georgia, "Times New Roman", serif; font-size:20px; font-weight:400; }
        .phone-center{ height:355px; display:grid; place-items:center; }
        .phone-record{ border:0; background:transparent; display:grid; justify-items:center; gap:7px; cursor:pointer; }
        .phone-record > span{ width:144px; height:144px; border-radius:50%; display:grid; place-items:center; background:rgba(167,92,84,.07); border:1px solid rgba(167,92,84,.18); box-shadow:0 0 0 13px rgba(167,92,84,.035); transition:.22s ease; }
        .phone-record > span i{ width:58px; height:58px; border-radius:50%; background:var(--ox); box-shadow:inset 0 -8px 18px rgba(84,38,34,.16); transition:.2s ease; }
        .phone-record.recording > span{ animation:pulse 1.5s ease-in-out infinite; }
        .phone-record.recording > span i{ border-radius:15px; transform:scale(.78); background:#9b514b; }
        @keyframes pulse{ 50%{ box-shadow:0 0 0 25px rgba(167,92,84,.05); } }
        .phone-record b{ margin-top:13px; font-size:13px; }
        .phone-record small{ font-size:8px; color:#999d98; }

        .phone-sheet {
          height:201px;
          border-radius:28px 28px 39px 39px;
          box-shadow:0 -12px 30px rgba(55,48,40,.06);
          padding:8px 18px 16px;
        }
        .handle{ display:block; width:38px; height:4px; border-radius:99px; background:#ded8ce; margin:0 auto 13px; }
        .phone-sheet > div{
          min-height:53px; display:grid; grid-template-columns:30px 1fr auto; gap:8px; align-items:center; border-top:1px solid rgba(32,36,31,.06);
        }
        .mini-icon{ width:25px; height:25px; border-radius:8px; display:grid; place-items:center; background:var(--moss-soft); font-size:7px; color:#687563; }
        .phone-sheet > div > span:nth-child(2){ display:grid; gap:3px; }
        .phone-sheet b{ font-size:8px; }
        .phone-sheet small{ font-size:6px; color:#9a9e99; }

        .record-sequence{ margin-top:48px; }
        .record-sequence > div{ display:grid; grid-template-columns:42px 1fr; gap:17px; align-items:start; }
        .record-sequence > div > span{ width:42px; height:42px; border-radius:50%; border:1px solid rgba(32,36,31,.15); display:grid; place-items:center; font-family:Georgia, "Times New Roman", serif; font-size:13px; }
        .record-sequence section{ display:grid; gap:5px; }
        .record-sequence small{ font-size:7px; letter-spacing:.14em; color:#959a94; }
        .record-sequence b{ font-family:Georgia, "Times New Roman", serif; font-size:23px; font-weight:400; letter-spacing:-.03em; }
        .record-sequence p{ margin:2px 0 0; font-size:10px; line-height:1.6; color:#727872; }
        .record-sequence > i{ display:block; width:1px; height:52px; margin:0 0 0 21px; background:rgba(32,36,31,.14); }

        .record-build {
          padding:150px max(28px, calc((100vw - 1420px) / 2));
          background:#fffaf2;
        }
        .record-build-head { display:grid; grid-template-columns:.4fr 1fr; gap:70px; align-items:start; }
        .record-build-head h2 { font-size:clamp(48px, 4.9vw, 78px); line-height:.98; }

        .timeline{ margin-top:70px; border-top:1px solid var(--line); }
        .timeline article{
          min-height:94px;
          display:grid;
          grid-template-columns:70px 34px 1fr;
          align-items:stretch;
        }
        .timeline time{ padding-top:25px; font-family:Georgia, "Times New Roman", serif; color:#929792; font-size:12px; }
        .timeline-node{ position:relative; }
        .timeline-node::before{ content:""; position:absolute; width:9px; height:9px; border-radius:50%; left:50%; top:28px; transform:translateX(-50%); background:var(--moss); box-shadow:0 0 0 6px #fffaf2; z-index:2; }
        .timeline-node::after{ content:""; position:absolute; width:1px; top:0; bottom:0; left:50%; background:rgba(32,36,31,.12); }
        .node-1::before{ background:var(--ox); }
        .node-2::before{ background:var(--brass); }
        .node-3::before{ background:var(--plum); }
        .timeline article > div{
          margin:9px 0 9px 16px;
          border:1px solid rgba(32,36,31,.08);
          border-radius:15px;
          padding:15px 17px;
          display:grid;
          grid-template-columns:75px 1fr auto;
          gap:10px;
          align-items:center;
          background:#fbf8f2;
        }
        .timeline article small{ font-size:7px; letter-spacing:.13em; color:#939892; }
        .timeline article b{ font-size:10px; }
        .timeline article div > span{ font-size:7px; color:#969b95; }

        .since{
          margin-top:32px;
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          align-items:center;
        }
        .since > span{ font-size:9px; color:#6d736d; margin-right:5px; }
        .since b{ padding:7px 9px; border-radius:999px; border:1px solid var(--line); font-size:7px; font-weight:500; color:#747a74; }

        .review-story {
          padding:150px max(28px, calc((100vw - 1420px) / 2));
          background:#e6ddd0;
          display:grid;
          grid-template-columns:.65fr 1.35fr;
          gap:70px;
          align-items:center;
        }
        .review-ui{
          background:#fbf8f2;
          border:1px solid rgba(32,36,31,.10);
          border-radius:27px;
          padding:24px;
          box-shadow:0 30px 72px rgba(55,47,39,.12);
        }
        .review-head{ display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .review-head h3{ font-family:Georgia, "Times New Roman", serif; font-size:28px; font-weight:400; letter-spacing:-.035em; margin:5px 0 0; }
        .review-head > span{ width:50px; height:50px; border-radius:50%; display:grid; place-items:center; background:var(--ink); color:#fffaf2; font-family:Georgia, "Times New Roman", serif; }

        .review-counts{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:24px; }
        .review-counts button{
          min-height:135px; border:0; border-radius:18px; padding:16px; display:grid; align-content:end; text-align:left; cursor:pointer; transition:.2s ease;
        }
        .review-counts button:nth-child(1){ background:var(--moss-soft); }
        .review-counts button:nth-child(2){ background:var(--brass-soft); }
        .review-counts button:nth-child(3){ background:var(--ox-soft); }
        .review-counts button:hover{ transform:translateY(-4px); box-shadow:0 14px 25px rgba(55,48,40,.09); }
        .review-counts b{ font-family:Georgia, "Times New Roman", serif; font-size:36px; font-weight:400; line-height:1; }
        .review-counts span{ margin-top:12px; font-size:9px; font-weight:600; }
        .review-counts small{ margin-top:4px; font-size:7px; color:#7f847f; }

        .review-item{
          margin-top:16px; padding:15px 3px 0; border-top:1px solid var(--line);
          display:flex; justify-content:space-between; align-items:center; gap:16px;
        }
        .review-item > div:first-child{ display:flex; gap:10px; align-items:center; }
        .avatar{ width:35px; height:35px; border-radius:50%; display:grid; place-items:center; background:#eee8de; font-size:7px; }
        .review-item > div:first-child > span:last-child{ display:grid; gap:3px; }
        .review-item b{ font-size:9px; }
        .review-item small{ font-size:7px; color:#929792; }
        .review-item > div:last-child{ display:flex; gap:6px; }
        .review-item button{ border:1px solid var(--line); border-radius:999px; background:transparent; padding:8px 10px; font-size:7px; }
        .review-item button.primary{ background:var(--ink); color:#fff; border-color:var(--ink); }

        .wow-section {
          padding:170px max(28px, calc((100vw - 1420px) / 2));
          background:#20251f;
          color:#fffaf2;
          text-align:center;
          position:relative;
          overflow:hidden;
        }
        .wow-section::before{
          content:""; position:absolute; width:900px; height:900px; border-radius:50%; border:1px solid rgba(255,255,255,.07); left:50%; top:50%; transform:translate(-50%,-50%);
          box-shadow:inset 0 0 0 120px rgba(255,255,255,.015), inset 0 0 0 240px rgba(188,142,73,.012);
        }
        .wow-copy,.event-counters,.prepare-summary,.summary-progress{ position:relative; z-index:2; }
        .wow-copy span{ font-size:10px; letter-spacing:.16em; color:rgba(255,255,255,.46); }
        .wow-copy h2{ font-family:Georgia, "Times New Roman", serif; font-size:clamp(54px, 6vw, 92px); font-weight:400; letter-spacing:-.055em; margin:14px 0 0; }
        .event-counters{
          max-width:900px;
          margin:68px auto 0;
          display:grid;
          grid-template-columns:repeat(6,1fr);
          gap:12px;
        }
        .event-counters div{ display:grid; gap:7px; }
        .event-counters b{ font-family:Georgia, "Times New Roman", serif; font-size:36px; font-weight:400; }
        .event-counters span{ color:rgba(255,255,255,.48); font-size:8px; line-height:1.4; }

        .prepare-summary{
          margin-top:62px;
          border:1px solid rgba(255,255,255,.15);
          background:#fffaf2;
          color:var(--ink);
          border-radius:999px;
          padding:14px 18px;
          display:inline-flex;
          align-items:center;
          gap:15px;
          cursor:pointer;
          font-size:10px;
          box-shadow:0 18px 40px rgba(0,0,0,.16);
          transition:.22s ease;
        }
        .prepare-summary:hover{ transform:translateY(-3px); }
        .prepare-summary.done{ background:#dfe6d9; }
        .prepare-summary svg{ width:16px; }

        .summary-progress{
          width:min(420px, 80%);
          height:2px;
          margin:26px auto 0;
          background:rgba(255,255,255,.11);
          opacity:0;
          transition:opacity .2s ease;
        }
        .summary-progress.active{ opacity:1; }
        .summary-progress i{ display:block; height:100%; background:linear-gradient(90deg,var(--brass),#e6c482); transition:width .08s linear; }

        .case-summary{
          padding:160px max(28px, calc((100vw - 1420px) / 2));
          background:
            linear-gradient(120deg, rgba(128,145,120,.11), transparent 35%),
            #f1eee6;
          display:grid;
          grid-template-columns:.78fr 1.22fr;
          gap:80px;
          align-items:center;
        }
        .summary-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-top:32px; }
        .summary-tags span{ border:1px solid var(--line); border-radius:999px; padding:7px 10px; font-size:7px; color:#747a74; background:rgba(255,253,249,.5); }

        .document-stage{ position:relative; min-height:620px; perspective:1500px; }
        .summary-document{
          position:relative;
          z-index:5;
          width:min(700px, 100%);
          margin-left:auto;
          background:#fffefb;
          border:1px solid rgba(32,36,31,.08);
          padding:44px 46px 32px;
          box-shadow:0 46px 92px rgba(59,51,42,.14), 16px 16px 0 rgba(255,255,255,.35);
          transform:rotateY(-3deg) rotateZ(.3deg);
          transition:transform .45s cubic-bezier(.2,.7,.2,1);
        }
        .assembled .summary-document{ transform:rotateY(-1deg) rotateZ(.1deg); }
        .summary-document:hover{ transform:none; }
        .summary-document header{ display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .summary-document h3{ font-family:Georgia, "Times New Roman", serif; font-size:34px; font-weight:400; margin:6px 0 0; letter-spacing:-.04em; }
        .summary-document header > span{ padding:7px 9px; border-radius:999px; background:#f0eee8; font-size:7px; color:#7e837d; }
        .summary-document hr{ border:0; border-top:1px solid var(--line); margin:24px 0 0; }
        .summary-document section{ padding:22px 0; border-bottom:1px solid rgba(32,36,31,.08); }
        .summary-document section p{ font-family:Georgia, "Times New Roman", serif; font-size:16px; line-height:1.55; color:#424842; margin:8px 0 10px; }
        .summary-document section button{ border:0; border-radius:999px; background:var(--moss-soft); color:#697467; padding:5px 7px; font-size:6px; cursor:pointer; }

        .conflict{
          margin-top:24px; padding:14px; border-radius:14px; background:#f7eee9;
          display:grid; grid-template-columns:24px 1fr auto; gap:10px; align-items:center;
        }
        .conflict svg{ width:15px; color:var(--ox); }
        .conflict > span{ display:grid; gap:3px; }
        .conflict b{ font-size:8px; }
        .conflict small{ font-size:6px; color:#8b817c; }
        .conflict button{ border:1px solid var(--line); background:transparent; border-radius:999px; padding:7px 8px; font-size:6px; }
        .summary-document footer{ display:flex; gap:8px; flex-wrap:wrap; margin-top:22px; color:#858a84; font-size:6px; }
        .summary-document footer span:not(:last-child)::after{ content:"·"; margin-left:8px; }

        .source-stack{
          position:absolute;
          z-index:1;
          right:30px;
          width:72%;
          height:110px;
          padding:16px;
          border:1px solid rgba(32,36,31,.08);
          background:#f8f3ea;
          font-family:Georgia, "Times New Roman", serif;
          color:#706f69;
          font-size:10px;
          opacity:.72;
          transition:.5s cubic-bezier(.2,.7,.2,1);
        }
        .source-a{ top:28px; transform:translateX(-40px) rotate(-2deg); }
        .source-b{ top:88px; transform:translateX(-25px) rotate(1.5deg); }
        .source-c{ top:148px; transform:translateX(-12px) rotate(-.7deg); }
        .assembled .source-a{ transform:translateX(-90px) rotate(-5deg); }
        .assembled .source-b{ transform:translateX(-60px) rotate(3deg); }
        .assembled .source-c{ transform:translateX(-35px) rotate(-1.5deg); }

        .source-fan{
          position:absolute;
          z-index:9;
          right:20px;
          top:180px;
          width:min(620px, 92%);
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
        }
        .source-fan article{
          min-height:145px;
          border:1px solid var(--line);
          background:#fffaf2;
          box-shadow:0 16px 34px rgba(55,47,39,.12);
          padding:15px;
          animation:fan .35s ease both;
        }
        .source-fan article:nth-child(1){ transform:rotate(-4deg) translateY(-12px); }
        .source-fan article:nth-child(2){ transform:translateY(8px); }
        .source-fan article:nth-child(3){ transform:rotate(4deg) translateY(-4px); }
        .source-fan small{ font-size:6px; color:#999d98; }
        .source-fan b{ display:block; margin:8px 0; font-family:Georgia, "Times New Roman", serif; font-size:15px; font-weight:400; }
        .source-fan p{ margin:0; font-size:7px; line-height:1.5; color:#7d827c; }
        @keyframes fan{ from{ opacity:0; transform:translateY(20px) scale(.96); } to{ opacity:1; } }

        .hospital-fit{
          padding:160px max(28px, calc((100vw - 1420px) / 2));
          background:#f7f3eb;
          display:grid;
          grid-template-columns:.75fr 1.25fr;
          gap:75px;
          align-items:center;
        }
        .launchpad{
          border:1px solid var(--line);
          background:#fffdf9;
          border-radius:28px;
          padding:28px;
          box-shadow:0 28px 72px rgba(55,48,40,.08);
        }
        .launchpad-head{ display:flex; justify-content:space-between; gap:20px; align-items:flex-start; }
        .launchpad-head h3{ font-family:Georgia, "Times New Roman", serif; font-size:31px; font-weight:400; margin:5px 0 0; letter-spacing:-.04em; }
        .launchpad-head > span{ padding:7px 9px; border-radius:999px; background:#f0ede6; font-size:7px; color:#7b807a; }
        .launchpad-grid{ margin-top:40px; display:grid; grid-template-columns:repeat(4,1fr); gap:9px; }
        .launchpad-grid button{ min-height:82px; border:1px solid var(--line); border-radius:15px; background:#faf7f0; font-size:8px; cursor:pointer; transition:.2s ease; }
        .launchpad-grid button:hover{ transform:translateY(-3px); border-color:rgba(32,36,31,.25); }
        .launchpad-grid button.active{ background:var(--moss-soft); border-color:rgba(128,145,120,.24); }

        .readiness{
          margin-top:38px;
          display:grid;
          grid-template-columns:auto 1fr auto;
          gap:12px;
          align-items:center;
          font-size:8px;
        }
        .readiness > div{ height:7px; border-radius:99px; background:#ece8df; overflow:hidden; }
        .readiness i{ display:block; width:94%; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--moss),var(--brass)); }

        .launchpad-note{
          margin-top:20px;
          padding:13px;
          border-radius:14px;
          background:#f6efe5;
          display:grid;
          grid-template-columns:30px 1fr auto;
          gap:10px;
          align-items:center;
        }
        .launchpad-note > span{ width:30px; height:30px; border-radius:10px; display:grid; place-items:center; background:var(--brass-soft); color:var(--brass); }
        .launchpad-note svg{ width:14px; }
        .launchpad-note p{ margin:0; font-size:7px; color:#767b75; line-height:1.45; }
        .launchpad-note p b{ color:#4e544f; }
        .launchpad-note button{ border:1px solid var(--line); border-radius:999px; background:transparent; padding:7px 8px; font-size:6px; }

        .closing{
          min-height:660px;
          padding:120px 28px;
          background:#efe4d7;
          display:grid;
          place-items:center;
          text-align:center;
          position:relative;
          overflow:hidden;
        }
        .closing > div:not(.closing-lines){ position:relative; z-index:2; max-width:920px; }
        .closing > div > span{ font-size:8px; letter-spacing:.17em; color:#7c7a73; }
        .closing h2{ font-size:clamp(58px, 6.2vw, 96px); line-height:.94; margin-top:23px; }
        .closing p{ max-width:650px; margin:29px auto 0; color:#62635e; font-size:13px; line-height:1.7; }
        .closing a{
          display:inline-flex; align-items:center; gap:14px; margin-top:36px; border-radius:999px; background:var(--ink); color:#fffaf2; padding:14px 17px; font-size:9px; box-shadow:0 18px 40px rgba(32,36,31,.14); transition:.2s ease;
        }
        .closing a:hover{ transform:translateY(-3px); }
        .closing svg{ width:15px; }
        .closing-lines{ position:absolute; inset:0; pointer-events:none; }
        .closing-lines i{ position:absolute; border:1px solid rgba(32,36,31,.08); border-radius:50%; left:50%; top:50%; transform:translate(-50%,-50%); }
        .closing-lines i:nth-child(1){ width:720px; height:720px; }
        .closing-lines i:nth-child(2){ width:940px; height:940px; }
        .closing-lines i:nth-child(3){ width:1180px; height:1180px; border-style:dashed; opacity:.65; }

        .footer{
          padding:34px max(28px, calc((100vw - 1420px) / 2));
          background:#20251f;
          color:rgba(255,255,255,.8);
          display:grid;
          grid-template-columns:1fr auto 1fr;
          gap:30px;
          align-items:center;
        }
        .footer-brand .brand-mark::before,.footer-brand .brand-mark::after{ background:rgba(255,255,255,.35); }
        .footer-brand small{ color:rgba(255,255,255,.4); }
        .footer-links{ display:flex; gap:22px; font-size:8px; color:rgba(255,255,255,.5); }
        .footer-links a:hover{ color:#fff; }
        .footer-note{ justify-self:end; text-align:right; display:grid; gap:3px; font-size:7px; color:rgba(255,255,255,.38); }

        @media (max-width:1120px){
          .topbar{ grid-template-columns:1fr auto; }
          .topbar nav{ display:none; }
          .hero,.round-story,.record-story,.review-story,.case-summary,.hospital-fit{ grid-template-columns:1fr; }
          .hero{ padding-top:70px; }
          .hero-object{ width:min(760px,100%); margin:0 auto; }
          .editorial-grid{ grid-template-columns:1fr; gap:40px; }
          .round-story,.record-story,.review-story,.case-summary,.hospital-fit{ gap:70px; }
          .record-build-head{ grid-template-columns:1fr; gap:18px; }
          .event-counters{ grid-template-columns:repeat(3,1fr); gap:26px 12px; }
          .document-stage{ min-height:680px; }
          .footer{ grid-template-columns:1fr auto; }
          .footer-note{ display:none; }
        }

        @media (max-width:760px){
          .topbar,.hero,.editorial-intro{ width:min(100% - 32px,1420px); }
          .story-thread{ display:none; }
          .quiet-cta{ padding:9px 11px; }
          .quiet-cta svg{ display:none; }

          .hero{ min-height:auto; padding:68px 0 90px; }
          .hero h1{ font-size:clamp(56px,15vw,80px); }
          .lede{ font-size:16px; }
          .hero-actions{ flex-direction:column; align-items:flex-start; gap:18px; }
          .hero-object{ min-height:620px; margin-top:10px; }
          .patient-sheet{ width:100%; margin-top:110px; padding:20px; transform:none; }
          .floating-round{ left:3px; width:245px; }
          .floating-intelligence{ right:4px; bottom:-4px; width:245px; }
          .attention-strip{ grid-template-columns:auto 1fr; }

          .editorial-intro{ padding:90px 0 100px; }
          .editorial-grid h2{ font-size:48px; }

          .round-story,.record-story,.record-build,.review-story,.case-summary,.hospital-fit{ padding-top:100px; padding-bottom:100px; }
          .round-list > div{ grid-template-columns:24px 25px 1fr auto; }
          .round-flag{ display:none; }
          .round-footer button{ margin-left:0; }

          .phone{ width:min(330px,100%); }
          .record-build-head h2,.round-copy h2,.record-copy h2,.review-copy h2,.case-summary-copy h2,.hospital-fit-copy h2{ font-size:48px; }

          .timeline article > div{ grid-template-columns:1fr; }
          .timeline article div > span{ margin-top:2px; }

          .review-counts{ grid-template-columns:1fr; }
          .review-counts button{ min-height:110px; }
          .review-item{ flex-direction:column; align-items:flex-start; }

          .event-counters{ grid-template-columns:repeat(2,1fr); }
          .wow-section{ padding-top:120px; padding-bottom:120px; }

          .document-stage{ min-height:700px; }
          .summary-document{ padding:30px 24px; transform:none; }
          .source-stack{ width:82%; right:0; }
          .source-fan{ grid-template-columns:1fr; top:160px; right:8px; width:86%; }
          .source-fan article:nth-child(n){ transform:none; }

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
