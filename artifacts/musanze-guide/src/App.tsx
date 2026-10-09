import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import logo from '@assets/musanzeguide24-brand-v152_1791550370194.png';
import qrCode from '@assets/musanzeguide24-qr_1791550370195.png';
import mountain from '@assets/01_HomePage__landscape1_1791550370183.jpg';
import volcano from '@assets/05_Gorillas_Volcanoes_Nature__Volcanoes_1791550370187.jpg';
import downtown from '@assets/02_Musanze_City__CityDownTown1_1791550370185.jpg';
import cityCenter from '@assets/01_HomePage__CityCenter_1791550370181.jpg';
import centralMall from '@assets/01_HomePage__CentralMall_1791550370195.jpg';
import tower from '@assets/01_HomePage__CiticenterTower_1791550370180.jpg';
import downtownFour from '@assets/01_HomePage__downtown4_1791550370182.jpg';
import cafe from '@assets/04_Restaurants_Cafes__Migano-Cafe_1791550370186.jpg';
import nightView from '@assets/home-night-24-7_1791550370192.jpg';
import nightClock from '@assets/home-night-clock_1791550370193.jpg';
import school from '@assets/06_Schools_Universities__IPRC0_1791550370189.jpg';
import hospital from '@assets/07_Hopitals_Clinics-Pharmacies__Musanze-Hosp1_1791550370189.jpg';
import homeProperty from '@assets/12_Houses_Rentals__HouseRent1_1791550370190.jpg';

const links = {
  things: 'https://musanzeguide.com/attractions.html',
  stay: 'https://musanzeguide.com/accommodation.html',
  eat: 'https://musanzeguide.com/restaurants.html',
  move: 'https://musanzeguide.com/transport.html',
  shopping: 'https://musanzeguide.com/shopping.html',
  night: 'https://musanzeguide.com/night-tour.html',
  culture: 'https://musanzeguide.com/history-culture.html',
  souvenirs: 'https://musanzeguide.com/souvenirs.html',
  education: 'https://musanzeguide.com/schools.html',
  health: 'https://musanzeguide.com/health.html',
  property: 'https://musanzeguide.com/property.html',
};

type MenuKey = 'explore' | 'stay' | 'local';
type PanelMotion = { menu: MenuKey; direction: 'left' | 'right' };

const menuPanels: Record<MenuKey, { width: number; height: number }> = {
  explore: { width: 664, height: 358 },
  stay: { width: 446, height: 308 },
  local: { width: 232, height: 218 },
};

function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`text-link ${className}`} href={href}>{children}<ArrowRight aria-hidden="true" /></a>;
}

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const [departingPanel, setDepartingPanel] = useState<PanelMotion | null>(null);
  const [incomingPanel, setIncomingPanel] = useState<PanelMotion | null>(null);
  const [firstOpen, setFirstOpen] = useState(false);
  const hasOpenedMenu = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({ explore: null, stay: null, local: null });
  const [panelStyle, setPanelStyle] = useState({ x: 0, width: 664, height: 358 });
  const menuOrder: MenuKey[] = ['explore', 'stay', 'local'];

  const placePanel = (menu: MenuKey) => {
    const button = triggerRefs.current[menu];
    const nav = navRef.current;
    if (!button || !nav) return;
    const panel = menuPanels[menu];
    const navRect = nav.getBoundingClientRect();
    const triggerRect = button.getBoundingClientRect();
    const x = Math.max(12, Math.min(triggerRect.left - navRect.left - 20, navRect.width - panel.width - 12));
    setPanelStyle({ x, width: panel.width, height: panel.height });
  };

  const openMenu = (menu: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    if (activeMenu === menu) return;
    if (activeMenu) {
      const direction = menuOrder.indexOf(menu) > menuOrder.indexOf(activeMenu) ? 'right' : 'left';
      setDepartingPanel({ menu: activeMenu, direction: direction === 'right' ? 'left' : 'right' });
      setIncomingPanel({ menu, direction });
      window.requestAnimationFrame(() => {
        setIncomingPanel((current) => current?.menu === menu ? null : current);
      });
    } else {
      setDepartingPanel(null);
      setIncomingPanel(null);
      if (!hasOpenedMenu.current) {
        hasOpenedMenu.current = true;
        setFirstOpen(true);
        window.requestAnimationFrame(() => setFirstOpen(false));
      }
    }
    placePanel(menu);
    setActiveMenu(menu);
  };
  const closeMenu = (delay = 140) => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveMenu(null);
      setDepartingPanel(null);
      setIncomingPanel(null);
      setFirstOpen(false);
    }, delay);
  };
  const panelState = (menu: MenuKey) => {
    if (activeMenu === menu) {
      if (firstOpen) return undefined;
      return incomingPanel?.menu === menu ? `enter-${incomingPanel.direction}` : 'active';
    }
    return departingPanel?.menu === menu ? `exit-${departingPanel.direction}` : undefined;
  };

  useEffect(() => {
    const onResize = () => { if (activeMenu) placePanel(activeMenu); };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setActiveMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false);
          document.getElementById('mobile-menu-button')?.focus();
        }
        if (activeMenu) {
          const previous = activeMenu;
          setActiveMenu(null);
          setDepartingPanel(null);
          setIncomingPanel(null);
          setFirstOpen(false);
          triggerRefs.current[previous]?.focus();
        }
      }
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(closeTimer.current);
    };
  }, [activeMenu, mobileOpen]);

  const setTrigger = (menu: MenuKey) => (element: HTMLButtonElement | null) => { triggerRefs.current[menu] = element; };
  const images = [volcano, downtown, centralMall, tower];

  return (
    <main className="site">
      <section className="hero" aria-label="Musanze, Rwanda">
        <div className="hero-bg" role="img" aria-label="Clouds drift across the green slopes of a volcano above Musanze" style={{ backgroundImage: `url(${mountain})` }} />
        <header className="header" id="header">
          <div className="bar">
            <a className="brand-link" href="/" aria-label="MusanzeGuide Rwanda home">
              <img src={logo} alt="MusanzeGuide 24/7 — Explore, Stay, Discover, Connect" />
            </a>
            <nav className="desktop-nav" ref={navRef} aria-label="Main navigation" onPointerEnter={() => window.clearTimeout(closeTimer.current)} onPointerLeave={(event) => { if (event.pointerType === 'mouse') closeMenu(); }} onFocusCapture={() => window.clearTimeout(closeTimer.current)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) closeMenu(0); }}>
              <ul className="nav-list">
                <li><button ref={setTrigger('explore')} className="trigger" aria-expanded={activeMenu === 'explore'} aria-controls="nav-dropdown" onPointerEnter={(event) => { if (event.pointerType === 'mouse') openMenu('explore'); }} onClick={() => activeMenu === 'explore' ? closeMenu(0) : openMenu('explore')}>Explore <ChevronDown className="chevron" /></button></li>
                <li><button ref={setTrigger('stay')} className="trigger" aria-expanded={activeMenu === 'stay'} aria-controls="nav-dropdown" onPointerEnter={(event) => { if (event.pointerType === 'mouse') openMenu('stay'); }} onClick={() => activeMenu === 'stay' ? closeMenu(0) : openMenu('stay')}>Stay & eat <ChevronDown className="chevron" /></button></li>
                <li><button ref={setTrigger('local')} className="trigger" aria-expanded={activeMenu === 'local'} aria-controls="nav-dropdown" onPointerEnter={(event) => { if (event.pointerType === 'mouse') openMenu('local'); }} onClick={() => activeMenu === 'local' ? closeMenu(0) : openMenu('local')}>Local guide <ChevronDown className="chevron" /></button></li>
                <li><a className="plain-link" href="#footer" onClick={() => closeMenu(0)}>Our story</a></li>
              </ul>
              <div ref={dropdownRef} id="nav-dropdown" className={`dd ${activeMenu ? 'open' : ''} ${firstOpen ? 'instant snap' : ''}`} aria-label="Navigation links" style={{ '--x': `${panelStyle.x}px`, '--w': `${panelStyle.width}px`, '--h': `${panelStyle.height}px` } as CSSProperties}>
                <div className={`menu-panel discover-panel ${firstOpen ? 'snap' : ''}`} data-state={panelState('explore')}>
                  <div className="d-list">
                    {[
                      ['Things to do', 'Volcanoes, hikes and caves.', links.things],
                      ['Musanze Night View', 'City lights after sunset.', links.night],
                      ['History & Culture', 'Heritage and daily life.', links.culture],
                      ['Souvenirs', 'Take a little Musanze home.', links.souvenirs],
                    ].map(([title, sub, href], index) => <a key={title} href={href} className={`d-item ${preview === index ? 'is-active' : ''}`} onPointerEnter={() => setPreview(index)} onFocus={() => setPreview(index)}><strong>{title}</strong><span>{sub}</span></a>)}
                  </div>
                  <div className="d-media" aria-hidden="true">{images.map((image, index) => <img key={image} className={preview === index ? 'is-active' : ''} src={image} alt="" />)}</div>
                </div>
                <div className={`menu-panel journeys-panel ${firstOpen ? 'snap' : ''}`} data-state={panelState('stay')}>
                  <a className="journey-card" href={links.stay}><img src={homeProperty} alt="" /><strong>Places to stay</strong><span>Hotels & guesthouses</span></a>
                  <a className="journey-card" href={links.eat}><img src={cafe} alt="" /><strong>Eat & drink</strong><span>Restaurants & cafés</span></a>
                </div>
                <div className={`menu-panel resource-panel ${firstOpen ? 'snap' : ''}`} data-state={panelState('local')}>
                  <a href={links.move}>Getting Around</a><a href={links.shopping}>Shopping & local life</a><a href={links.education}>Education</a><a href={links.health}>Health</a><a href={links.property}>Property & neighbourhoods</a>
                </div>
              </div>
            </nav>
            <div className="actions">
              <a href={links.stay} className="cta">Plan your stay</a>
              <button id="mobile-menu-button" className="menu-btn" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-sheet" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={17} /> : <Menu size={18} />}</button>
            </div>
          </div>
          <nav id="mobile-sheet" className={`sheet ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
            <h3>Explore</h3>
            <a href={links.things} onClick={() => setMobileOpen(false)}>Things to do</a><a href={links.night} onClick={() => setMobileOpen(false)}>Musanze Night View</a><a href={links.culture} onClick={() => setMobileOpen(false)}>History & Culture</a>
            <h3>Stay & eat</h3>
            <a href={links.stay} onClick={() => setMobileOpen(false)}>Stay · Hotels & guesthouses</a><a href={links.eat} onClick={() => setMobileOpen(false)}>Eat & Drink</a><a href={links.move} onClick={() => setMobileOpen(false)}>Getting Around</a>
            <h3>Local guide</h3>
            <a href={links.shopping} onClick={() => setMobileOpen(false)}>Shopping · Local life</a><a href={links.souvenirs} onClick={() => setMobileOpen(false)}>Souvenirs</a><a href={links.education} onClick={() => setMobileOpen(false)}>Education</a><a href={links.health} onClick={() => setMobileOpen(false)}>Health</a><a href={links.property} onClick={() => setMobileOpen(false)}>Property</a>
            <h3>MusanzeGuide</h3>
            <a href="#footer" onClick={() => setMobileOpen(false)}>Our story</a>
          </nav>
        </header>
        <div className="scroll-cue" aria-hidden="true"><span>(</span><span>scroll down</span><span>)</span></div>
      </section>

      <nav className="quick-links" aria-label="Popular destinations">
        <div className="quick-grid">
          {[
            ['Explore', 'Volcanoes & experiences', links.things],
            ['Stay', 'Hotels & guesthouses', links.stay],
            ['Eat', 'Restaurants & cafés', links.eat],
            ['Move', 'Transport & directions', links.move],
          ].map(([label, text, href]) => <a className="quick-item" href={href} key={label}><span className="quick-label">{label}</span><span className="quick-name">{text}<ArrowRight aria-hidden="true" /></span></a>)}
        </div>
      </nav>

      <section className="section" id="discover">
        <div className="section-inner">
          <div className="eyebrow">City · Volcanoes · Community</div>
          <div className="intro-grid">
            <h1 className="main-title">Discover Musanze.<br />Volcanoes. City life.<br />Culture. Food.</h1>
            <div className="intro-aside"><p>A practical guide to the places and everyday details that make this northern Rwandan city its own. Start with the landscape; stay for the life in town.</p><ArrowLink href={links.things}>Explore Musanze</ArrowLink></div>
          </div>
          <div className="city-layout">
            <a className="city-feature" href={links.things}>
              <img src={volcano} alt="Volcanic mountain rising above the green countryside near Musanze" />
              <div className="feature-caption"><span className="tag">The landscape around us</span><h3>Volcano country</h3><p>Volcanoes · hikes · caves</p></div>
            </a>
            <div className="city-secondary">
              <a className="small-city-card" href={links.shopping}><img src={cityCenter} alt="A busy street and shops at the heart of Musanze" /><div className="feature-caption"><span className="tag">Find your way around</span><h3>City life</h3><p>Markets · shops · city streets</p></div></a>
              <a className="small-city-card" href={links.eat}><img src={cafe} alt="Migano café and street life in Musanze" /><div className="feature-caption"><span className="tag">A seat at the table</span><h3>Eat & meet</h3><p>Restaurants · cafés · evenings</p></div></a>
            </div>
          </div>
        </div>
      </section>

      <section className="night-section" aria-labelledby="night-title" style={{ '--night-image': `url(${nightView})` } as CSSProperties}>
        <img className="night-detail" src={nightClock} alt="" aria-hidden="true" />
        <div className="night-content">
          <div className="eyebrow">After sunset · 24/7</div>
          <h2 className="night-title" id="night-title">MusanzeGuide<br />24/7</h2>
          <p className="night-copy">Night lights. City streets. Landmarks. Volcano silhouettes. Discover Musanze Night View.</p>
          <a className="button-link" href={links.night}>Explore Musanze Night View <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section culture-section">
        <div className="section-inner culture-grid">
          <div className="culture-image"><img src={downtownFour} alt="Local shops and daily street life in Musanze town" /></div>
          <div className="culture-copy"><div className="eyebrow">Living heritage</div><h2>History &<br />Culture</h2><p>Traditional architecture, dance, daily life and cultural experiences from Rwanda’s northern region.</p><ArrowLink href={links.culture}>Discover History & Culture</ArrowLink></div>
        </div>
      </section>

      <section className="section souvenir-section">
        <div className="section-inner souvenir-grid">
          <div className="souvenir-copy"><div className="eyebrow">MusanzeGuide24/7 Souvenirs</div><h2>Take Musanze<br />home.</h2><p>Explore our growing collection of Musanze-inspired keepsakes and branded items.</p><ArrowLink href={links.souvenirs}>Explore Souvenirs</ArrowLink></div>
          <div className="souvenir-mark"><img src={logo} alt="MusanzeGuide24/7 official brand artwork" /></div>
        </div>
      </section>

      <section className="section resources-section">
        <div className="section-inner">
          <div className="eyebrow">Useful local guide</div>
          <div className="resource-heading"><h2>Live, learn and<br />get around.</h2><p>Useful local information for visitors, residents and anyone finding their bearings in Musanze.</p></div>
          <div className="resource-cards">
            {[
              ['Education', 'Primary · secondary · university', school, links.education, 'Schools and learning'],
              ['Health & services', 'Clinics · pharmacies · services', hospital, links.health, 'Health and everyday services'],
              ['Property & neighbourhoods', 'Homes · rentals · neighbourhoods', homeProperty, links.property, 'Homes and neighbourhoods'],
            ].map(([name, description, image, href, alt]) => <a className="resource-card" href={href} key={name}>
              <div className="resource-photo"><img src={image} alt={`${alt} in Musanze`} /></div>
              <div className="resource-card-body"><span>Useful local guide</span><h3>{name}</h3><p>{description}</p><ArrowRight aria-hidden="true" /></div>
            </a>)}
          </div>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" aria-label="MusanzeGuide24/7 home"><img src={logo} alt="MusanzeGuide24/7" /></a>
              <div className="footer-kicker">EXPLORE • STAY • DISCOVER • CONNECT</div>
              <p>A practical independent guide to Musanze, Rwanda — places, people, businesses and visitor experiences.</p>
            </div>
            <div>
              <h2 className="footer-heading">Discover</h2>
              <div className="footer-links">
                <a href={links.things}>Things to do</a><a href={links.eat}>Eat & Drink</a>
                <a href={links.stay}>Places to stay</a><a href={links.night}>Musanze Night View</a>
                <a href={links.shopping}>Local life</a><a href={links.education}>Education</a>
                <a href={links.shopping}>Shopping</a><a href={links.souvenirs}>Souvenirs</a>
                <a href={links.health}>Health</a><a href={links.culture}>History & Culture</a>
                <a href={links.property}>Property</a><a href={links.move}>Getting Around</a>
              </div>
            </div>
            <div className="qr-side">
              <img src={qrCode} alt="QR code for musanzeguide.com" />
              <span>SCAN TO EXPLORE</span><p>QR code for musanzeguide.com</p><a href="https://musanzeguide.com/">musanzeguide.com</a>
            </div>
          </div>
          <div className="footer-bottom"><span>© 2026 MusanzeGuide24/7 · Rwanda · All rights reserved.</span><strong>Your Gateway to Musanze and Beyond</strong></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
