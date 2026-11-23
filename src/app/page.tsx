import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";



const skills = ["Art direction", "Brand identity", "Web design", "Creative strategy"];

export default function Home() {
  return (
    <main>
      <Hero />

      <nav className="nav container" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Romeo home">
          R<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-availability" href="#contact">
          <span className="status-dot" />
          <span className="nav-availability-label">Available for select projects</span>
        </a>
      </nav>

      <section className="work-section container" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>A few frames<br /><em>worth keeping.</em></h2>
          </div>
          <p className="section-note">Portraits, places and special moments<br />seen through my lens.</p>
        </div>
        <Gallery />
      </section>

      <section className="about-section container" id="about">
        <div className="about-label">
          <p className="eyebrow">A little about me</p>
          <span className="about-stamp">R / 26</span>
        </div>
        <div className="about-content">
          <h2>Curious by nature.<br /><em>Serious about ideas.</em></h2>
          <div className="about-columns">
            <p>
              I believe the best work starts with a good question. 
            </p>
            <div>
              <p className="eyebrow">What I do</p>
              <ul className="skill-list">
                {skills.map((skill) => <li key={skill}>{skill}<span>↗</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-inner">
          <p className="eyebrow">Have a good one?</p>
          <h2>Let&apos;s make<br /><em>something</em> matter.</h2>
          <a className="contact-email" href="mailto:hello@romeo.studio">hello@romeo.studio <span>↗</span></a>
          <div className="contact-meta">
            <span>© 2026 Romeo Studio</span>
            <span>Made with intention</span>
            <span>Copenhagen, DK</span>
          </div>
        </div>
      </section>
    </main>
  );
}
