export default function Home() {
  const pillars = [
    {
      number: "01",
      title: "Clinical Intelligence",
      text: "Intelligence designed around real clinical work.",
    },
    {
      number: "02",
      title: "Workflow Systems",
      text: "Technology that understands how healthcare actually moves.",
    },
    {
      number: "03",
      title: "Research & Data",
      text: "Structured information transformed into useful evidence.",
    },
    {
      number: "04",
      title: "Healthcare AI",
      text: "Augmenting human judgement with practical intelligence.",
    },
  ];

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav">
        <div className="brand">
          <div className="brand-name">TEIHSRA</div>
          <div className="brand-sub">HEALTH INTELLIGENCE</div>
        </div>

        <a href="mailto:connect@teihsra.com" className="nav-link">
          CONNECT
          <span>↗</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            TECHNOLOGY × HEALTHCARE × INTELLIGENCE
          </div>

          <h1>
            Intelligence,
            <br />
            <span>made clinical.</span>
          </h1>

          <p className="expansion">
            Technology-Empowered Intelligence for Healthcare Systems,
            Research and Advancement.
          </p>

          <p className="intro">
            TEIHSRA creates intelligent systems for healthcare — designed
            around clinical reality, human judgement and the way care
            actually happens.
          </p>

          <div className="hero-actions">
            <a href="#focus" className="primary-link">
              EXPLORE TEIHSRA
              <span>↓</span>
            </a>

            <a
              href="mailto:connect@teihsra.com"
              className="secondary-link"
            >
              connect@teihsra.com
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="halo halo-outer" />
          <div className="halo halo-middle" />
          <div className="halo halo-inner" />

          <div className="core">
            <div className="core-glow" />
            <span>T</span>
          </div>

          <div className="orbit-dot dot-one" />
          <div className="orbit-dot dot-two" />
          <div className="orbit-dot dot-three" />
        </div>
      </section>

      <section id="focus" className="focus">
        <div className="section-label">
          <span>01</span>
          FOCUS
        </div>

        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar" key={pillar.number}>
              <div className="pillar-number">{pillar.number}</div>

              <h2>{pillar.title}</h2>

              <p>{pillar.text}</p>

              <div className="pillar-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="section-label">
          <span>02</span>
          PRINCIPLE
        </div>

        <div className="statement-copy">
          <p>
            Healthcare does not need technology
            <br className="desktop-break" />
            for technology&apos;s sake.
          </p>

          <h2>
            It needs intelligence that
            <span> understands healthcare.</span>
          </h2>
        </div>
      </section>

      <section className="contact">
        <div>
          <div className="contact-kicker">TEIHSRA HEALTH INTELLIGENCE</div>

          <h2>
            Building what healthcare
            <br />
            should work like.
          </h2>
        </div>

        <a href="mailto:connect@teihsra.com" className="contact-link">
          CONNECT WITH TEIHSRA
          <span>↗</span>
        </a>
      </section>

      <footer>
  <div>© 2026 TEIHSRA Health Intelligence</div>

  <div className="footer-right">
    <span>Mumbai · India</span>

    <a href="mailto:connect@teihsra.com">
      connect@teihsra.com
    </a>

    <a href="/contact">
      Contact
    </a>

    <a href="/privacy">
      Privacy
    </a>

    <a href="/terms">
      Terms
    </a>
  </div>
</footer>
    </main>
  );
}