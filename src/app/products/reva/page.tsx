"use client";

import { useEffect, useMemo, useState } from "react";

const LANGUAGES = ["English", "हिन्दी", "मराठी"];

const MEDS = [
  { name: "Levetiracetam 500 mg", unit: "1 tablet", schedule: ["1", "0", "0", "1"], note: "Morning and night" },
  { name: "Pantoprazole 40 mg", unit: "1 tablet", schedule: ["1", "0", "0", "0"], note: "Before breakfast" },
  { name: "Paracetamol 650 mg", unit: "1 tablet", schedule: ["0", "0", "0", "1"], note: "At night if advised" },
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

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Bell() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10a5 5 0 0 1 10 0v4l2 2H5l2-2v-4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.1-7-9.3A4.2 4.2 0 0 1 12 7.5a4.2 4.2 0 0 1 7 3.2C19 15.9 12 20 12 20Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function RevaPage() {
  const [language, setLanguage] = useState("English");
  const [tab, setTab] = useState<"today" | "medicines" | "followup">("today");
  const [reminder, setReminder] = useState(false);
  const [expandedMed, setExpandedMed] = useState(0);

  const headings = useMemo(() => {
    if (language === "हिन्दी") return ["सुबह", "दोपहर", "शाम", "रात"];
    if (language === "मराठी") return ["सकाळ", "दुपार", "संध्याकाळ", "रात्र"];
    return ["Morning", "Afternoon", "Evening", "Night"];
  }, [language]);

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
    <main className="reva-site">
      <div className="paper-noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#top" className="brand" aria-label="Reva home">
          <BrandMark />
          <span>
            <b>Reva</b>
            <small>by TEIHSRA</small>
          </span>
        </a>

        <nav>
          <a href="#understand">Understand</a>
          <a href="#medicines">Medicines</a>
          <a href="#followup">Follow-up</a>
          <a href="#hospital">Hospitals</a>
        </nav>

        <a className="quiet-cta" href="mailto:hello@teihsra.com?subject=Reva%20Private%20Pilot">
          Private pilot
          <Arrow />
        </a>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">Patient Guidance & Care Continuity</span>
          <h1>
            Care should remain clear
            <br />
            <em>after you leave the hospital.</em>
          </h1>

          <p className="lede">
            Reva helps patients and families understand medicines, follow-up, precautions, warning signs and the next steps in care—in language that feels clear, calm and usable.
          </p>

          <div className="hero-actions">
            <a className="main-cta" href="mailto:hello@teihsra.com?subject=Reva%20Private%20Pilot">
              Request a private demo
              <span><Arrow /></span>
            </a>
            <a className="secondary-link" href="#understand">
              See the patient experience
              <span>↓</span>
            </a>
          </div>

          <div className="hero-principles">
            <span>Patient-first</span>
            <span>Multilingual</span>
            <span>Hospital-connected</span>
          </div>
        </div>

        <div className="hero-object" data-reveal>
          <div className="patient-app">
            <div className="app-top">
              <span className="app-brand">reva</span>
              <button className="language-chip">{language}</button>
            </div>

            <div className="app-welcome">
              <small>GOOD MORNING</small>
              <h2>Rahul, here’s what matters today.</h2>
              <p>Post-operative day 5 · Neurosurgery</p>
            </div>

            <div className="today-card">
              <div>
                <span className="icon-circle"><Check /></span>
                <span>
                  <small>TODAY</small>
                  <b>Take medicines as scheduled</b>
                  <p>Your next dose is due tonight.</p>
                </span>
              </div>
              <span>›</span>
            </div>

            <div className="today-card">
              <div>
                <span className="icon-circle warm"><Bell /></span>
                <span>
                  <small>FOLLOW-UP</small>
                  <b>Review in 7 days</b>
                  <p>Neurosurgery OPD · 10:30 AM</p>
                </span>
              </div>
              <span>›</span>
            </div>

            <div className="today-card">
              <div>
                <span className="icon-circle rose"><Heart /></span>
                <span>
                  <small>CALL THE HOSPITAL IF</small>
                  <b>Warning signs appear</b>
                  <p>Seizure, increasing drowsiness, repeated vomiting or wound discharge.</p>
                </span>
              </div>
              <span>›</span>
            </div>
          </div>

          <div className="floating-language">
            <small>LANGUAGE</small>
            {LANGUAGES.map((item) => (
              <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="floating-note">
            <span className="note-icon"><Heart /></span>
            <span>
              <small>PLAIN LANGUAGE</small>
              <b>Clinical meaning, not medical clutter</b>
              <p>Instructions stay accurate without sounding like a discharge form.</p>
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
            Discharge should not mean
            <br />
            <em>being left to remember everything.</em>
          </h2>

          <div data-reveal>
            <p>
              Patients leave with medicines, appointments, precautions, wound care, diet instructions and warning signs—often delivered all at once, at the most stressful point in the admission.
            </p>
            <p>
              Reva turns that information into a usable care companion the patient can return to at home.
            </p>
          </div>
        </div>
      </section>

      <section id="understand" className="understand-section">
        <div className="understand-copy" data-reveal>
          <span className="section-label">01 / UNDERSTAND</span>
          <h2>
            The patient should know
            <br />
            <em>what happens next.</em>
          </h2>
          <p>
            Reva brings discharge instructions into a simple daily view—what to take, what to do, what to avoid, what to watch for and when to come back.
          </p>
        </div>

        <div className="understand-ui" data-reveal>
          <div className="understand-tabs">
            <button className={tab === "today" ? "active" : ""} onClick={() => setTab("today")}>Today</button>
            <button className={tab === "medicines" ? "active" : ""} onClick={() => setTab("medicines")}>Medicines</button>
            <button className={tab === "followup" ? "active" : ""} onClick={() => setTab("followup")}>Follow-up</button>
          </div>

          {tab === "today" && (
            <div className="daily-list">
              <article>
                <span className="status-dot sage" />
                <div><small>08:00</small><b>Morning medicines</b><p>Completed</p></div>
                <span><Check /></span>
              </article>
              <article>
                <span className="status-dot brass" />
                <div><small>18:00</small><b>Evening walk</b><p>10–15 minutes, with assistance if needed</p></div>
                <span>›</span>
              </article>
              <article>
                <span className="status-dot rose" />
                <div><small>21:00</small><b>Night medicines</b><p>Next scheduled dose</p></div>
                <span>›</span>
              </article>
            </div>
          )}

          {tab === "medicines" && (
            <div className="mini-med-list">
              {MEDS.slice(0,2).map((med) => (
                <article key={med.name}>
                  <div><b>{med.name}</b><small>{med.unit}</small></div>
                  <span>{med.schedule.join(" · ")}</span>
                </article>
              ))}
            </div>
          )}

          {tab === "followup" && (
            <div className="followup-card">
              <small>NEXT APPOINTMENT</small>
              <h3>Neurosurgery OPD</h3>
              <p>29 August · 10:30 AM</p>
              <button onClick={() => setReminder((v) => !v)} className={reminder ? "active" : ""}>
                {reminder ? "Reminder set" : "Set reminder"}
                {reminder ? <Check /> : <Bell />}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="medicines" className="medicines-section">
        <div className="medicines-head" data-reveal>
          <span className="section-label">02 / MEDICINES</span>
          <h2>
            Medicines should be
            <br />
            <em>impossible to misunderstand.</em>
          </h2>
          <p>
            Reva can show the prescribed dose in a simple four-part daily schedule, with the column headings and instructions translated into the patient’s chosen language.
          </p>
        </div>

        <div className="med-grid" data-reveal>
          <div className="med-table">
            <div className="med-table-head">
              <div>
                <small>MEDICATION PLAN</small>
                <h3>At home</h3>
              </div>
              <div className="language-toggle">
                {LANGUAGES.map((item) => (
                  <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {MEDS.map((med, index) => (
              <article key={med.name} className={expandedMed === index ? "expanded" : ""}>
                <button className="med-main" onClick={() => setExpandedMed(index)}>
                  <span>
                    <b>{med.name}</b>
                    <small>{med.unit}</small>
                  </span>

                  <span className="schedule-row">
                    {med.schedule.map((v, i) => (
                      <span key={i}>
                        <small>{headings[i]}</small>
                        <b>{v}</b>
                      </span>
                    ))}
                  </span>

                  <span className="med-arrow">›</span>
                </button>

                {expandedMed === index && (
                  <div className="med-detail">
                    <span>{med.note}</span>
                    <span>Take only as prescribed by your treating team.</span>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="med-explainer">
            <span className="med-big">1 · 0 · 0 · 1</span>
            <h3>Readable at a glance.</h3>
            <p>
              The same schedule can be shown in English, Hindi, Marathi or another configured patient language—without changing the underlying prescription.
            </p>

            <div className="translation-sample">
              <small>EXAMPLE</small>
              <p>
                {language === "मराठी"
                  ? "सकाळी 1 गोळी आणि रात्री 1 गोळी घ्या."
                  : language === "हिन्दी"
                  ? "सुबह 1 गोली और रात में 1 गोली लें।"
                  : "Take 1 tablet in the morning and 1 tablet at night."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="warning-section">
        <div className="warning-copy" data-reveal>
          <span className="section-label">03 / SAFETY AT HOME</span>
          <h2>
            Important warnings should not
            <br />
            <em>hide inside a PDF.</em>
          </h2>
          <p>
            Reva can keep emergency and escalation instructions visible after discharge, using the hospital’s approved wording and patient language.
          </p>
        </div>

        <div className="warning-card" data-reveal>
          <small>SEEK URGENT MEDICAL HELP IF</small>
          <div className="warning-list">
            <article><span>01</span><b>Increasing drowsiness or difficulty waking</b></article>
            <article><span>02</span><b>New seizure or repeated seizure</b></article>
            <article><span>03</span><b>Repeated vomiting</b></article>
            <article><span>04</span><b>Wound discharge, swelling or fever</b></article>
          </div>
          <div className="warning-footer">
            <span>Hospital-approved instructions</span>
            <button>View emergency contact</button>
          </div>
        </div>
      </section>

      <section id="followup" className="followup-section">
        <div className="followup-panel" data-reveal>
          <div className="followup-head">
            <div>
              <small>FOLLOW-UP</small>
              <h3>Neurosurgery review</h3>
            </div>
            <span>In 7 days</span>
          </div>

          <div className="appointment-card">
            <div className="calendar-box">
              <small>AUG</small>
              <b>29</b>
            </div>
            <div>
              <small>10:30 AM</small>
              <h4>Neurosurgery OPD</h4>
              <p>Bring discharge papers and any new investigations.</p>
            </div>
          </div>

          <div className="followup-actions">
            <button className={reminder ? "active" : ""} onClick={() => setReminder((v) => !v)}>
              {reminder ? "Reminder set" : "Set reminder"}
              {reminder ? <Check /> : <Bell />}
            </button>
            <button>What should I bring?</button>
          </div>
        </div>

        <div className="followup-copy" data-reveal>
          <span className="section-label">04 / FOLLOW-UP</span>
          <h2>
            Care continues
            <br />
            <em>between appointments.</em>
          </h2>
          <p>
            Follow-up dates, reminders, preparation instructions and hospital-defined check-ins can stay connected to the same patient journey rather than disappearing after discharge.
          </p>

          <div className="feature-lines">
            <div><b>Clear next step</b><span>Patients always know when and where the next review is planned.</span></div>
            <div><b>Configurable reminders</b><span>Hospitals decide what patients are reminded about and when.</span></div>
            <div><b>Linked continuity</b><span>Reva can eventually connect with Anvaya and Shalya for verified patient-facing updates.</span></div>
          </div>
        </div>
      </section>

      <section className="family-section">
        <div className="family-head" data-reveal>
          <span className="section-label">05 / FOR FAMILIES</span>
          <h2>
            Good communication
            <br />
            <em>should survive the hospital corridor.</em>
          </h2>
        </div>

        <div className="family-grid">
          <article data-reveal>
            <span>01</span>
            <h3>One place to return to</h3>
            <p>Medicines, precautions, follow-up and warning signs remain together instead of being scattered across paper, WhatsApp and memory.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Language that belongs to the patient</h3>
            <p>Hospitals can configure patient-facing instructions and languages without changing the verified clinical record underneath.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Built from approved information</h3>
            <p>Reva is designed to present hospital-approved guidance, not generate casual medical advice detached from the treating team.</p>
          </article>
        </div>
      </section>

      <section id="hospital" className="hospital-fit">
        <div className="hospital-fit-copy" data-reveal>
          <span className="section-label">06 / HOSPITAL FIT</span>
          <h2>
            Patient communication,
            <br />
            <em>configured by the hospital.</em>
          </h2>
          <p>
            Reva can be configured through Sankalan Launchpad for languages, patient-visible information, discharge communication, follow-up, consent, branding and care instructions.
          </p>
        </div>

        <div className="launchpad" data-reveal>
          <div className="launchpad-head">
            <div>
              <small>SANKALAN LAUNCHPAD</small>
              <h3>Reva Scaffold</h3>
            </div>
            <span>v1.1</span>
          </div>

          <div className="launchpad-grid">
            {["Languages", "Medicines", "Follow-up", "Warnings", "Branding", "Consent", "Patient access", "Notifications"].map((item, i) => (
              <button key={item} className={i === 0 ? "active" : ""}>{item}</button>
            ))}
          </div>

          <div className="readiness">
            <span>Launch readiness</span>
            <div><i /></div>
            <b>96%</b>
          </div>

          <div className="launchpad-note">
            <span><Check /></span>
            <p><b>3 patient languages enabled.</b> English, Hindi and Marathi are ready for patient-facing instructions.</p>
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
            Better instructions.
            <br />
            <em>Better continuity at home.</em>
          </h2>
          <p>
            Reva is being developed for hospitals that want patient communication after discharge to feel clearer, calmer and more dependable.
          </p>
          <a href="mailto:hello@teihsra.com?subject=Reva%20Private%20Pilot">
            Request a conversation
            <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <BrandMark />
          <span><b>Reva</b><small>by TEIHSRA</small></span>
        </div>
        <div className="footer-links">
          <a href="https://teihsra.com">TEIHSRA</a>
          <a href="mailto:hello@teihsra.com">Contact</a>
          <a href="https://teihsra.com/privacy">Privacy</a>
          <a href="https://teihsra.com/terms">Terms</a>
        </div>
        <div className="footer-note">
          <span>Patient Guidance & Care Continuity</span>
          <span>Private pilot development</span>
        </div>
      </footer>

      <style jsx global>{`
        :root{
          --ivory:#f6f1e9;
          --ivory-2:#fbf8f2;
          --ink:#20241f;
          --muted:#737972;
          --line:rgba(32,36,31,.12);
          --sage:#7f947c;
          --sage-soft:#e2e9df;
          --rose:#b16e69;
          --rose-soft:#edd7d3;
          --brass:#b98e4f;
          --brass-soft:#eadfc5;
          --plum:#6d5c6f;
          --plum-soft:#e6dde7;
          --peach:#e7c6ae;
        }

        *{box-sizing:border-box}
        html{scroll-behavior:smooth;background:var(--ivory)}
        body{margin:0;background:var(--ivory);color:var(--ink)}
        body,button,input,textarea{font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        a{color:inherit;text-decoration:none}
        button{font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}
        svg{display:block}

        .reva-site{
          position:relative;
          overflow:hidden;
          background:
            radial-gradient(circle at 82% 8%, rgba(177,110,105,.07), transparent 28rem),
            radial-gradient(circle at 10% 28%, rgba(127,148,124,.06), transparent 30rem),
            var(--ivory);
        }

        .paper-noise{
          position:fixed;inset:0;pointer-events:none;z-index:50;opacity:.13;mix-blend-mode:multiply;
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
        .brand-mark i:nth-child(2){right:2px;top:2px;background:var(--sage)}
        .brand-mark i:nth-child(3){right:2px;bottom:2px;background:var(--brass)}
        .brand-mark::before,.brand-mark::after{content:"";position:absolute;left:6px;top:13px;width:18px;height:1px;background:rgba(32,36,31,.35);transform-origin:left center}
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
          content:"";position:absolute;width:690px;height:690px;border:1px solid rgba(32,36,31,.05);border-radius:50%;
          right:-170px;top:-60px;box-shadow:inset 0 0 0 90px rgba(255,255,255,.10),inset 0 0 0 180px rgba(177,110,105,.02);pointer-events:none;
        }

        .eyebrow,.section-label{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#7f847e}
        .hero h1,.editorial-grid h2,.understand-copy h2,.medicines-head h2,.warning-copy h2,.followup-copy h2,.family-head h2,.hospital-fit-copy h2,.closing h2{
          font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.055em;margin:0;
        }
        .hero h1{font-size:clamp(66px,6.4vw,108px);line-height:.91;margin-top:26px}
        em{color:var(--plum);font-weight:400}
        .lede{max-width:600px;margin:38px 0 0;color:#585f58;font-size:18px;line-height:1.65}

        .hero-actions{display:flex;align-items:center;gap:28px;margin-top:36px}
        .main-cta{
          min-height:54px;display:inline-flex;align-items:center;gap:15px;padding:8px 8px 8px 20px;border-radius:999px;
          background:var(--ink);color:#fffaf1;font-size:11px;box-shadow:0 18px 38px rgba(32,36,31,.15);transition:transform .22s ease;
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
        .patient-app{
          width:min(390px,78%);margin:35px 55px 0 auto;min-height:620px;padding:16px;border-radius:40px;
          background:#232823;box-shadow:0 38px 90px rgba(32,36,31,.21);
        }
        .patient-app>div{background:#fbf8f2}
        .app-top{height:50px;border-radius:30px 30px 0 0;padding:14px 18px 8px;display:flex;justify-content:space-between;align-items:center}
        .app-brand{font-family:Georgia,"Times New Roman",serif;font-size:16px}
        .language-chip{border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 8px;font-size:7px}
        .app-welcome{padding:28px 20px 18px}
        .app-welcome small,.today-card small,.med-table-head small,.warning-card>small,.followup-head small,.appointment-card small,.launchpad-head small{
          font-size:7px;letter-spacing:.14em;text-transform:uppercase;color:#989d97;
        }
        .app-welcome h2{font-family:Georgia,"Times New Roman",serif;font-size:28px;font-weight:400;line-height:1.08;letter-spacing:-.04em;margin:7px 0 8px}
        .app-welcome p{margin:0;font-size:8px;color:#8a8f89}

        .today-card{
          margin:0 14px 10px;padding:14px;border-radius:16px;background:#fffdf9!important;border:1px solid rgba(32,36,31,.07);
          display:flex;align-items:center;justify-content:space-between;gap:12px;
        }
        .today-card>div{display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:center}
        .today-card>div>span:last-child{display:grid;gap:3px}
        .today-card b{font-size:9px}
        .today-card p{margin:0;font-size:7px;line-height:1.4;color:#8a8f89}
        .icon-circle{width:32px;height:32px;border-radius:11px;background:var(--sage-soft);color:#62715f;display:grid;place-items:center}
        .icon-circle.warm{background:var(--brass-soft);color:#8a6b39}
        .icon-circle.rose{background:var(--rose-soft);color:#9d5a55}
        .icon-circle svg{width:15px}

        .floating-language,.floating-note{
          position:absolute;border:1px solid rgba(32,36,31,.09);background:rgba(255,253,249,.96);backdrop-filter:blur(18px);box-shadow:0 20px 50px rgba(55,48,40,.12);
        }
        .floating-language{left:4px;top:55px;width:155px;border-radius:20px;padding:14px;transform:rotate(-1deg)}
        .floating-language>small{font-size:6px;letter-spacing:.14em;color:#999d98}
        .floating-language button{width:100%;border:0;border-top:1px solid rgba(32,36,31,.07);background:transparent;padding:10px 3px;text-align:left;font-size:8px;cursor:pointer;opacity:.55}
        .floating-language button.active{opacity:1;color:var(--plum);font-weight:600}
        .floating-note{right:-10px;bottom:35px;width:285px;border-radius:20px;padding:15px;display:grid;grid-template-columns:auto 1fr;gap:11px;transform:rotate(1.2deg)}
        .note-icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--rose-soft);color:var(--rose)}
        .note-icon svg{width:16px}
        .floating-note>span:last-child{display:grid;gap:4px}
        .floating-note small{font-size:6px;letter-spacing:.14em;color:#969b95}
        .floating-note b{font-size:9px}
        .floating-note p{margin:0;color:#858a84;font-size:7px;line-height:1.45}

        .editorial-intro{width:min(1420px,calc(100% - 56px));margin:0 auto;padding:120px 0 150px;border-top:1px solid var(--line)}
        .editorial-label{display:grid;grid-template-columns:auto 1fr;gap:17px;align-items:center}
        .editorial-label span{font-size:8px;letter-spacing:.16em;color:#838882}
        .editorial-label i{height:1px;background:var(--line)}
        .editorial-grid{margin-top:48px;display:grid;grid-template-columns:1.2fr .8fr;gap:80px;align-items:start}
        .editorial-grid h2{font-size:clamp(52px,5.2vw,85px);line-height:.95}
        .editorial-grid>div p{margin:0 0 18px;color:#606660;font-size:14px;line-height:1.75}

        .understand-section,.medicines-section,.warning-section,.followup-section,.family-section,.hospital-fit{
          padding:150px max(28px,calc((100vw - 1420px) / 2));
        }

        .understand-section{background:#ebe2d5;display:grid;grid-template-columns:.72fr 1.28fr;gap:75px;align-items:center}
        .understand-copy h2,.medicines-head h2,.warning-copy h2,.followup-copy h2,.family-head h2,.hospital-fit-copy h2{
          font-size:clamp(48px,4.7vw,76px);line-height:.98;margin-top:22px;
        }
        .understand-copy p,.medicines-head p,.warning-copy p,.followup-copy p,.hospital-fit-copy p{
          margin:26px 0 0;max-width:560px;color:#626862;font-size:13px;line-height:1.72;
        }

        .understand-ui{border:1px solid var(--line);border-radius:28px;background:#fffdf9;padding:24px;box-shadow:0 28px 70px rgba(61,52,43,.10)}
        .understand-tabs{display:flex;gap:6px;padding-bottom:18px;border-bottom:1px solid var(--line)}
        .understand-tabs button{border:1px solid transparent;background:transparent;border-radius:999px;padding:8px 11px;font-size:7px;color:#7c817b;cursor:pointer}
        .understand-tabs button.active{background:#f0ece4;color:var(--ink);border-color:rgba(32,36,31,.06)}
        .daily-list article{
          min-height:76px;display:grid;grid-template-columns:14px 1fr auto;gap:12px;align-items:center;border-bottom:1px solid rgba(32,36,31,.07);
        }
        .status-dot{width:8px;height:8px;border-radius:50%}
        .status-dot.sage{background:var(--sage)}
        .status-dot.brass{background:var(--brass)}
        .status-dot.rose{background:var(--rose)}
        .daily-list article>div{display:grid;gap:3px}
        .daily-list b{font-size:9px}
        .daily-list p{margin:0;font-size:7px;color:#969b95}
        .daily-list article>span:last-child svg{width:14px;color:#677563}

        .mini-med-list{display:grid;padding-top:8px}
        .mini-med-list article{min-height:86px;border-bottom:1px solid rgba(32,36,31,.07);display:flex;justify-content:space-between;align-items:center;gap:18px}
        .mini-med-list article>div{display:grid;gap:4px}
        .mini-med-list b{font-size:10px}
        .mini-med-list small{font-size:7px;color:#969b95}
        .mini-med-list article>span{font-family:Georgia,"Times New Roman",serif;font-size:18px;color:var(--plum)}

        .followup-card{padding:34px 8px 10px}
        .followup-card h3{font-family:Georgia,"Times New Roman",serif;font-size:30px;font-weight:400;margin:8px 0 4px}
        .followup-card p{margin:0;color:#7c817b;font-size:9px}
        .followup-card button{margin-top:24px;border:1px solid var(--line);background:transparent;border-radius:999px;padding:9px 11px;display:inline-flex;gap:8px;align-items:center;font-size:7px}
        .followup-card button.active{background:var(--sage-soft)}
        .followup-card svg{width:13px}

        .medicines-section{background:#f7f3eb}
        .medicines-head{display:grid;grid-template-columns:.55fr 1fr;gap:70px;align-items:start}
        .medicines-head>p{margin-top:22px}
        .med-grid{margin-top:75px;display:grid;grid-template-columns:1.3fr .7fr;gap:18px}

        .med-table{border:1px solid var(--line);border-radius:26px;background:#fffdf9;overflow:hidden}
        .med-table-head{padding:24px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:1px solid var(--line)}
        .med-table-head h3{font-family:Georgia,"Times New Roman",serif;font-size:27px;font-weight:400;margin:5px 0 0}
        .language-toggle{display:flex;gap:4px;flex-wrap:wrap}
        .language-toggle button{border:1px solid var(--line);background:transparent;border-radius:999px;padding:7px 8px;font-size:6px;color:#777c76}
        .language-toggle button.active{background:var(--plum-soft);color:#655868}

        .med-table article{border-bottom:1px solid rgba(32,36,31,.07)}
        .med-main{
          width:100%;border:0;background:transparent;display:grid;grid-template-columns:1fr 1.3fr auto;gap:16px;align-items:center;text-align:left;padding:20px 24px;cursor:pointer;
        }
        .med-main>span:first-child{display:grid;gap:4px}
        .med-main>span:first-child b{font-size:9px}
        .med-main>span:first-child small{font-size:7px;color:#969b95}
        .schedule-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
        .schedule-row>span{display:grid;justify-items:center;gap:4px}
        .schedule-row small{font-size:6px;color:#999d98}
        .schedule-row b{font-family:Georgia,"Times New Roman",serif;font-size:20px;font-weight:400}
        .med-arrow{color:#969b95}
        .med-detail{padding:0 24px 18px;display:flex;justify-content:space-between;gap:18px;font-size:7px;color:#7d827c}
        .med-detail span:last-child{color:#9b817e}

        .med-explainer{border-radius:26px;background:#282b27;color:#fffaf2;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;min-height:430px;position:relative;overflow:hidden}
        .med-explainer::before{content:"";position:absolute;width:360px;height:360px;border-radius:50%;right:-170px;top:-170px;background:radial-gradient(circle,rgba(177,110,105,.2),transparent 65%)}
        .med-big{font-family:Georgia,"Times New Roman",serif;font-size:44px;letter-spacing:-.04em}
        .med-explainer h3{font-family:Georgia,"Times New Roman",serif;font-size:29px;font-weight:400;margin:18px 0 9px}
        .med-explainer>p{margin:0;color:rgba(255,255,255,.58);font-size:9px;line-height:1.6}
        .translation-sample{margin-top:26px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12)}
        .translation-sample small{font-size:6px;letter-spacing:.14em;color:rgba(255,255,255,.38)}
        .translation-sample p{font-family:Georgia,"Times New Roman",serif;font-size:16px;line-height:1.5;margin:8px 0 0}

        .warning-section{background:#e9ded1;display:grid;grid-template-columns:.72fr 1.28fr;gap:75px;align-items:center}
        .warning-card{border-radius:28px;background:#fffdf9;border:1px solid var(--line);padding:26px;box-shadow:0 28px 70px rgba(61,52,43,.10)}
        .warning-list{margin-top:20px;display:grid}
        .warning-list article{min-height:72px;border-top:1px solid rgba(32,36,31,.07);display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:center}
        .warning-list span{font-family:Georgia,"Times New Roman",serif;color:var(--rose);font-size:12px}
        .warning-list b{font-size:9px;font-weight:600}
        .warning-footer{padding-top:18px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:18px}
        .warning-footer span{font-size:7px;color:#7d827c}
        .warning-footer button{border:0;border-radius:999px;background:var(--ink);color:#fffaf2;padding:9px 11px;font-size:7px}

        .followup-section{background:#fffaf2;display:grid;grid-template-columns:1.2fr .8fr;gap:75px;align-items:center}
        .followup-panel{border:1px solid var(--line);border-radius:28px;background:#fffdf9;padding:24px;box-shadow:0 28px 70px rgba(61,52,43,.08)}
        .followup-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding-bottom:18px;border-bottom:1px solid var(--line)}
        .followup-head h3{font-family:Georgia,"Times New Roman",serif;font-size:27px;font-weight:400;margin:5px 0 0}
        .followup-head>span{padding:7px 9px;border-radius:999px;background:var(--sage-soft);color:#65725f;font-size:7px}
        .appointment-card{display:grid;grid-template-columns:90px 1fr;gap:18px;align-items:center;padding:28px 0}
        .calendar-box{width:78px;height:92px;border-radius:17px;background:var(--rose-soft);display:grid;place-items:center;align-content:center;gap:3px}
        .calendar-box b{font-family:Georgia,"Times New Roman",serif;font-size:34px;font-weight:400}
        .appointment-card h4{font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400;margin:7px 0 5px}
        .appointment-card p{margin:0;font-size:8px;color:#7e837d}
        .followup-actions{display:flex;gap:8px;flex-wrap:wrap;padding-top:17px;border-top:1px solid var(--line)}
        .followup-actions button{border:1px solid var(--line);background:transparent;border-radius:999px;padding:9px 11px;display:inline-flex;align-items:center;gap:8px;font-size:7px}
        .followup-actions button.active{background:var(--sage-soft)}
        .followup-actions svg{width:13px}

        .feature-lines{margin-top:45px;display:grid;gap:22px}
        .feature-lines div{padding-top:17px;border-top:1px solid var(--line);display:grid;grid-template-columns:150px 1fr;gap:18px}
        .feature-lines b{font-size:9px}
        .feature-lines span{font-size:9px;color:#7a8079;line-height:1.55}

        .family-section{background:#eee7dc}
        .family-head{display:grid;grid-template-columns:.42fr 1fr;gap:70px;align-items:start}
        .family-grid{margin-top:75px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .family-grid article{min-height:290px;border:1px solid var(--line);border-radius:20px;background:rgba(255,253,249,.65);padding:25px;transition:.2s ease}
        .family-grid article:hover{transform:translateY(-5px);background:#fffdf9}
        .family-grid article>span{font-family:Georgia,"Times New Roman",serif;color:var(--rose);font-size:13px}
        .family-grid h3{font-family:Georgia,"Times New Roman",serif;font-size:28px;font-weight:400;margin:74px 0 10px;letter-spacing:-.035em}
        .family-grid p{margin:0;color:#777d77;font-size:9px;line-height:1.65}

        .hospital-fit{background:#f7f3eb;display:grid;grid-template-columns:.75fr 1.25fr;gap:75px;align-items:center}
        .launchpad{border:1px solid var(--line);background:#fffdf9;border-radius:28px;padding:28px;box-shadow:0 28px 72px rgba(55,48,40,.08)}
        .launchpad-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}
        .launchpad-head h3{font-family:Georgia,"Times New Roman",serif;font-size:31px;font-weight:400;margin:5px 0 0;letter-spacing:-.04em}
        .launchpad-head>span{padding:7px 9px;border-radius:999px;background:#f0ede6;font-size:7px;color:#7b807a}
        .launchpad-grid{margin-top:40px;display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
        .launchpad-grid button{min-height:82px;border:1px solid var(--line);border-radius:15px;background:#faf7f0;font-size:8px;cursor:pointer;transition:.2s ease}
        .launchpad-grid button:hover{transform:translateY(-3px);border-color:rgba(32,36,31,.25)}
        .launchpad-grid button.active{background:var(--sage-soft);border-color:rgba(127,148,124,.24)}
        .readiness{margin-top:38px;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;font-size:8px}
        .readiness>div{height:7px;border-radius:99px;background:#ece8df;overflow:hidden}
        .readiness i{display:block;width:96%;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--sage),var(--brass))}
        .launchpad-note{margin-top:20px;padding:13px;border-radius:14px;background:#edf2eb;display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center}
        .launchpad-note>span{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:#dfe8db;color:#60705b}
        .launchpad-note svg{width:14px}
        .launchpad-note p{margin:0;font-size:7px;color:#747a74;line-height:1.45}
        .launchpad-note button{border:1px solid var(--line);border-radius:999px;background:transparent;padding:7px 8px;font-size:6px}

        .closing{
          min-height:660px;padding:120px 28px;background:#efe4d7;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;
        }
        .closing>div:not(.closing-lines){position:relative;z-index:2;max-width:920px}
        .closing>div>span{font-size:8px;letter-spacing:.17em;color:#7c7a73}
        .closing h2{font-size:clamp(58px,6.2vw,96px);line-height:.94;margin-top:23px}
        .closing p{max-width:650px;margin:29px auto 0;color:#62635e;font-size:13px;line-height:1.7}
        .closing a{display:inline-flex;align-items:center;gap:14px;margin-top:36px;border-radius:999px;background:var(--ink);color:#fffaf2;padding:14px 17px;font-size:9px;box-shadow:0 18px 40px rgba(32,36,31,.14);transition:.2s ease}
        .closing a:hover{transform:translateY(-3px)}
        .closing svg{width:15px}
        .closing-lines{position:absolute;inset:0;pointer-events:none}
        .closing-lines i{position:absolute;border:1px solid rgba(32,36,31,.08);border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}
        .closing-lines i:nth-child(1){width:720px;height:720px}
        .closing-lines i:nth-child(2){width:940px;height:940px}
        .closing-lines i:nth-child(3){width:1180px;height:1180px;border-style:dashed;opacity:.65}

        .footer{
          padding:34px max(28px,calc((100vw - 1420px) / 2));background:#20241f;color:rgba(255,255,255,.8);
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
          .hero,.understand-section,.warning-section,.followup-section,.hospital-fit{grid-template-columns:1fr}
          .hero{padding-top:70px}
          .hero-object{width:min(760px,100%);margin:0 auto}
          .editorial-grid{grid-template-columns:1fr;gap:40px}
          .understand-section,.warning-section,.followup-section,.hospital-fit{gap:70px}
          .medicines-head,.family-head{grid-template-columns:1fr;gap:18px}
          .med-grid{grid-template-columns:1fr}
          .family-grid{grid-template-columns:1fr}
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
          .hero-object{min-height:700px;margin-top:10px}
          .patient-app{width:100%;margin:105px 0 0;padding:12px}
          .floating-language{left:3px;top:5px}
          .floating-note{right:4px;bottom:-4px;width:250px}

          .editorial-intro{padding:90px 0 100px}
          .editorial-grid h2{font-size:48px}

          .understand-section,.medicines-section,.warning-section,.followup-section,.family-section,.hospital-fit{padding-top:100px;padding-bottom:100px}
          .understand-copy h2,.medicines-head h2,.warning-copy h2,.followup-copy h2,.family-head h2,.hospital-fit-copy h2{font-size:48px}

          .med-main{grid-template-columns:1fr}
          .schedule-row{margin-top:8px}
          .med-arrow{display:none}
          .med-detail{flex-direction:column}

          .warning-footer{flex-direction:column;align-items:flex-start}
          .appointment-card{grid-template-columns:80px 1fr}
          .feature-lines div{grid-template-columns:1fr}
          .family-grid h3{margin-top:48px}

          .launchpad-grid{grid-template-columns:repeat(2,1fr)}
          .launchpad-note{grid-template-columns:28px 1fr}
          .launchpad-note button{grid-column:2;justify-self:start}

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
