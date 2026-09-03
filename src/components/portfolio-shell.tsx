import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Download, Moon, X, Sun } from 'lucide-react';
import { AssetImage, AssetViewer } from './asset-viewer';
import { experience, exploring, identity, mediaPillars, portfolioAssets, skills, socialMedia, socials, type PortfolioAsset, youtubePipeline } from '../data/portfolio';

type PortfolioShellProps = { onThemeChange: () => void; isLight: boolean };

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add('is-visible');
        } else {
          target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    let x = -100;
    let y = -100;
    let ringX = x;
    let ringY = y;
    const move = (event: MouseEvent) => { x = event.clientX; y = event.clientY; };
    const render = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };
    window.addEventListener('mousemove', move, { passive: true });
    frame = requestAnimationFrame(render);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame); };
  }, []);
  return <><div ref={dotRef} className="pointer-dot" aria-hidden="true" /><div ref={ringRef} className="pointer-ring" aria-hidden="true" /></>;
}

function Header({ isLight, onThemeChange }: PortfolioShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['about', 'media', 'experience', 'recognition', 'contact'];
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <header className="topbar">
        <a href="#home" className="topbar__brand" data-testid="link-home">
          <span className="brand-mark">AD</span><span>ABHASH DEEP</span>
        </a>
        <div className="topbar__controls">
          <nav className="topbar__nav" aria-label="Primary navigation">
            {links.map((link) => <a key={link} href={`#${link}`} data-testid={`link-nav-${link}`}>{link}</a>)}
          </nav>
          <button className="theme-button" onClick={onThemeChange} aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'} data-testid="button-theme">
            {isLight ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-menu">
            {menuOpen ? <X size={17} strokeWidth={1.5} /> : <span style={{ fontSize: 10 }}>MENU</span>}
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        {links.map((link) => <a key={link} href={`#${link}`} onClick={closeMenu} data-testid={`link-mobile-${link}`}>{link}</a>)}
      </div>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 180]);
  const scale = useTransform(scrollY, [0, 700], [1, .88]);
  const opacity = useTransform(scrollY, [0, 500], [1, .18]);
  return (
    <motion.section id="home" className="hero" style={{ y, scale, opacity }} aria-labelledby="hero-title">
      <div className="hero__eyebrow reveal"><span /> Portfolio / 2026</div>
      <div className="hero__content">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">Creative</span>
            <span className="hero__title-line">social</span>
            <span className="hero__title-line">storyteller.</span>
          </h1>
          <div className="hero__aside">
            <p className="hero__lede reveal">{identity.summary}</p>
            <p className="hero__meta reveal"><b>{identity.name}</b>{identity.role}<br />{identity.descriptor}</p>
          </div>
        </div>
        <div className="hero__portrait reveal" aria-label="Portrait of Abhash Deep">
          <img src="/portfolio/hero-beach.jpg" alt="Abhash Deep at the beach" loading="eager" decoding="async" />
        </div>
      </div>
      <div className="hero__orb" aria-hidden="true"><span /></div>
      <a className="hero__scroll" href="#about" data-testid="link-scroll-about">Enter / scroll</a>
    </motion.section>
  );
}

function About() {
  return (
    <section id="about" className="section manifesto">
      <div className="manifesto__grid">
        <div className="section-label reveal">01 / Orientation</div>
        <div>
          <p className="manifesto__copy reveal">Creative + Social Media + Content + Design professional — with a <span className="accent">technical edge</span> that helps the work move from idea to execution with clarity.</p>
          <p className="manifesto__note reveal">I shape content, branding, and digital experiences with a strong eye for storytelling and a disciplined way of building around real outcomes.</p>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section capabilities" aria-labelledby="capabilities-title">
      <div className="capabilities__layout">
        <div>
          <div className="section-label reveal">02 / Range</div>
          <h2 id="capabilities-title" className="display-title reveal">Creative systems. <em>Real-world impact.</em></h2>
        </div>
        <div className="capability-list">
          {skills.map((skill, index) => (
            <div className="capability reveal" key={skill.name} data-testid={`skill-${index}`}>
              <span className="capability__number">0{index + 1}</span>
              <span className="capability__name">{skill.name}</span>
              <span className="capability__detail">{skill.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollMarquee() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, .8], ['0%', '-24%']);
  const words = ['creative technologist', 'social / content', 'graphic design', 'software engineering'];
  return (
    <section className="marquee" aria-label="Areas of practice">
      <motion.div className="marquee__track" style={reduceMotion ? undefined : { x }}>
        {[...words, ...words].map((word, index) => <span key={`${word}-${index}`}>{word} <i>×</i></span>)}
      </motion.div>
    </section>
  );
}

function SocialMediaMaster() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const assets = socialMedia.map(({ assetId }) => portfolioAssets[assetId]);
  return (
    <section id="media" className="section media-master" aria-labelledby="media-title">
      <div className="media-master__head">
        <div>
          <div className="section-label reveal">03 / Social / media &amp; content</div>
          <h2 id="media-title" className="display-title reveal">The feed is a <em>story.</em></h2>
          <p className="section-intro reveal">Content is where an idea finds its audience. These references show the work in motion: short-form storytelling, brand communication, and creative direction shaped for real platforms and real people.</p>
          <div className="media__jump reveal"><a href="#youtube" data-testid="link-jump-youtube">Explore YouTube pipeline <ArrowDownRight size={14} /></a></div>
        </div>
      </div>
      <div className="media-master__capabilities" aria-label="Social media and content capabilities">
        {mediaPillars.map((pillar, index) => <span className="media-master__capability reveal" key={pillar.name} data-testid={`media-pillar-${index}`}>{pillar.name}</span>)}
      </div>
      <div className="social-master__sequence" aria-label="Social media visual evidence">
        {socialMedia.map((item, index) => {
          const asset = portfolioAssets[item.assetId];
          return (
            <article className="social-story reveal" key={item.name} data-testid={`social-story-${item.name.toLowerCase()}`}>
              <div className="social-story__image">
                <AssetImage asset={asset} onOpen={() => setActiveIndex(index)} priority={index === 0} />
              </div>
              <div className="social-story__copy">
                <span className="social-story__number">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <small>{item.note}</small>
              </div>
            </article>
          );
        })}
      </div>
      {activeIndex !== null && <AssetViewer assets={assets} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />}
    </section>
  );
}

function YoutubePipeline() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const asset = portfolioAssets.youtubeChannel;
  return (
    <section id="youtube" className="section pipeline" aria-labelledby="youtube-title">
      <div className="pipeline__head pipeline__head--youtube">
        <div>
          <div className="section-label reveal">04 / YouTube</div>
          <h2 id="youtube-title" className="display-title reveal">From idea to <em>publish.</em></h2>
          <p className="youtube__handle reveal">NoobSuckk / @noobsuckk9677</p>
        </div>
        <div>
          <p className="pipeline__intro reveal">A repeatable creative loop for making a video: clear enough to move, flexible enough to stay human. No channel stats supplied; no numbers invented.</p>
          <a className="external-cta reveal" href={asset.externalUrl} target="_blank" rel="noreferrer noopener" data-testid="link-youtube-channel">Watch channel <ArrowDownRight size={14} /></a>
        </div>
      </div>
      <div className="youtube__browser reveal">
        <div className="youtube__browser-bar"><span /><span /><span /><b>youtube.com/@noobsuckk9677</b><i /></div>
        <AssetImage asset={asset} onOpen={() => setViewerOpen(true)} priority />
      </div>
      <ol className="pipeline__steps">
        {youtubePipeline.map((step, index) => (
          <li className="pipeline__step reveal" key={step} data-testid={`pipeline-step-${step.toLowerCase()}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            {index < youtubePipeline.length - 1 && <ArrowRight className="pipeline__step-arrow" size={17} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      {viewerOpen && <AssetViewer assets={[asset]} activeIndex={0} onClose={() => setViewerOpen(false)} onChange={() => undefined} />}
    </section>
  );
}

function MergeMoment() {
  const { scrollYProgress } = useScroll();
  const xCreative = useTransform(scrollYProgress, [0.25, .65], [-40, 20]);
  const xCode = useTransform(scrollYProgress, [0.25, .65], [40, -20]);
  return (
    <section className="section merge" aria-labelledby="merge-title">
      <div>
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>07 / The merge</div>
        <div className="merge__stage" aria-hidden="true">
          <motion.h2 id="merge-title" className="merge__word merge__word--creative" style={{ x: xCreative }}>creative</motion.h2>
          <motion.h2 className="merge__word merge__word--code" style={{ x: xCode }}>code</motion.h2>
          <div className="merge__cross">× / context</div>
        </div>
        <p className="merge__statement reveal">The interesting part is not choosing one lane. It is knowing what each lane makes possible for the others.</p>
      </div>
    </section>
  );
}

function Career() {
  const [viewerAssets, setViewerAssets] = useState<PortfolioAsset[] | null>(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const cannibals = experience.find((role) => role.company === 'Cannibals Media');
  const flipkart = experience.find((role) => role.company === 'Flipkart');
  const openEvidence = (assets: PortfolioAsset[], index = 0) => {
    setViewerAssets(assets);
    setViewerIndex(index);
  };
  return (
    <section id="experience" className="section career" aria-labelledby="career-title">
      <div className="career__layout">
        <div>
          <div className="section-label reveal">08 / Career story</div>
          <h2 id="career-title" className="display-title reveal">Different rooms. <em>One creative lens.</em></h2>
          <p className="section-intro reveal">From content and branding to on-site operations and engineering, the work stays connected by a simple question: how do we make ideas clearer, sharper, and more actionable?</p>
        </div>
        <div className="career__timeline">
          {experience.map((role, index) => (
            <article className="role reveal" key={role.company} data-testid={`experience-${role.company.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="role__dot" aria-hidden="true" />
              <div className="role__date">{role.period}</div>
              <div><span className="role__index">0{index + 1}</span><h3 className="role__company">{role.company}</h3><p className="role__title">{role.title}</p><div className="role__focus">{role.focus.map((item) => <span key={item}>{item}</span>)}</div></div>
            </article>
          ))}
        </div>
      </div>
      {cannibals && flipkart && (
        <div className="experience__evidence">
          <article className="experience-story experience-story--cannibals reveal">
            <div className="experience-story__copy">
              <span className="experience-story__eyebrow">Primary evidence / Cannibals Media</span>
              <h3>{cannibals.title}</h3>
              <p>{cannibals.period}</p>
              <a className="external-cta external-cta--dark" href={portfolioAssets.cannibalsWebsite.externalUrl} target="_blank" rel="noreferrer noopener" data-testid="link-cannibals-website">Visit Cannibals <ArrowDownRight size={14} /></a>
            </div>
            <AssetImage asset={portfolioAssets.cannibalsWebsite} onOpen={() => openEvidence([portfolioAssets.cannibalsWebsite, portfolioAssets.cannibalsOffer], 0)} priority />
            <div className="experience-story__support">
              <AssetImage asset={portfolioAssets.cannibalsOffer} onOpen={() => openEvidence([portfolioAssets.cannibalsWebsite, portfolioAssets.cannibalsOffer], 1)} />
              <div><span>Secondary / Documentation</span><p>Offer letter evidence</p></div>
            </div>
          </article>
          <article className="experience-story experience-story--flipkart reveal">
            <div className="experience-story__copy">
              <span className="experience-story__eyebrow">Editorial record / Flipkart</span>
              <h3>{flipkart.title}</h3>
              <p>{flipkart.period}</p>
              <small>Team image shown without identifying people.</small>
            </div>
            <AssetImage asset={portfolioAssets.flipkartTeam} onOpen={() => openEvidence([portfolioAssets.flipkartTeam])} />
          </article>
        </div>
      )}
      {viewerAssets && <AssetViewer assets={viewerAssets} activeIndex={viewerIndex} onClose={() => setViewerAssets(null)} onChange={setViewerIndex} />}
    </section>
  );
}

function Process() {
  const items = [
    ['01', 'Listen first.', 'Get close to the actual question before reaching for an answer.'],
    ['02', 'Make it clear.', 'Turn the messy middle into a visual or system people can use.'],
    ['03', 'Leave it stronger.', 'Build for the next handoff, conversation, and iteration.'],
  ];
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="section-label reveal">09 / Working principles</div>
      <h2 id="process-title" className="display-title reveal">Useful beats <em>impressive.</em></h2>
      <div className="process__grid">
        {items.map(([number, title, copy]) => <article className="process__item reveal" key={number} data-testid={`principle-${number}`}><span className="process__num">{number}</span><div><h3 className="process__title">{title}</h3><p className="process__copy">{copy}</p></div></article>)}
      </div>
    </section>
  );
}

function Exploring() {
  return (
    <section id="explore" className="section exploring" aria-labelledby="exploring-title">
      <div className="exploring__grid">
        <div>
          <div className="section-label reveal">11 / Currently</div>
          <h2 id="exploring-title" className="display-title reveal">Still <em>exploring.</em></h2>
        </div>
        <div className="exploring__list">
          {exploring.map((item, index) => <p className="exploring__item reveal" key={item} data-testid={`exploring-${index + 1}`}><span>0{index + 1}</span>{item}</p>)}
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const asset = portfolioAssets.aicteCertificate;
  return (
    <section id="recognition" className="section recognition" aria-labelledby="recognition-title">
      <div className="recognition__layout">
        <div>
          <div className="section-label reveal">10 / Recognition</div>
          <h2 id="recognition-title" className="display-title reveal">A mark of <em>making.</em></h2>
          <p className="section-intro reveal">One supplied piece of recognition, kept specific and easy to verify.</p>
          <div className="recognition__details reveal">
            <strong>FIRST PLACE</strong>
            <span>AICTE ICUBE Innovation Council Logo Design Competition</span>
            <small>24 April 2024</small>
          </div>
        </div>
        <div className="recognition__artifact reveal">
          <AssetImage asset={asset} onOpen={() => setViewerOpen(true)} priority />
        </div>
      </div>
      {viewerOpen && <AssetViewer assets={[asset]} activeIndex={0} onClose={() => setViewerOpen(false)} onChange={() => undefined} />}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section-label reveal">12 / Next conversation</div>
      <h2 id="contact-title" className="contact__title reveal">Let’s make <em>something real.</em></h2>
      <div className="contact__actions reveal">
        <a
          className="magnetic"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          data-testid="link-resume"
          onMouseMove={(event) => {
            const target = event.currentTarget;
            const rect = target.getBoundingClientRect();
            target.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .12 - 4}px)`;
          }}
          onMouseLeave={(event) => { event.currentTarget.style.transform = ''; }}
        >
          <Download size={15} /> View resume
        </a>
        <a className="text-link" href="mailto:abhashdeep11@gmail.com">abhashdeep11@gmail.com</a>
      </div>
      <p className="contact__small reveal">Creative direction, content, design, and digital execution — available for meaningful work across brands, channels, and creative teams.</p>
      <div className="contact__small reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {socials.map((social) => (
          <a key={social.label} href={social.url} target="_blank" rel="noreferrer noopener" className="text-link">{social.label}</a>
        ))}
      </div>
    </section>
  );
}

export function PortfolioShell({ isLight, onThemeChange }: PortfolioShellProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: .2 });
  useReveal();
  return (
    <div className="portfolio-page">
      <motion.div className="progress-line" style={{ scaleX: progress }} aria-hidden="true" />
      <CursorFollower />
      <Header isLight={isLight} onThemeChange={onThemeChange} />
      <Hero />
      <About />
      <Capabilities />
      <ScrollMarquee />
      <SocialMediaMaster />
      <YoutubePipeline />
      <MergeMoment />
      <Career />
      <Process />
      <Recognition />
      <Exploring />
      <Contact />
      <footer className="footer">
        <span>{identity.name} / {identity.role}</span>
        <span className="footer__status"><i className="status-dot" /> Portfolio in motion</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}