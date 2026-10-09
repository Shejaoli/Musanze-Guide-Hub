import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
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
import gorillaOne from '@assets/gorilla-user-1_1791550370191.jpg';

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

const sliderItems = [
  { eyebrow: '01 / THE VOLCANOES', title: 'Volcano country', text: 'Clouds gather around the Virunga peaks above Musanze.', image: volcano, href: links.things, alt: 'Clouds wrap the volcanic slopes above Musanze' },
  { eyebrow: '02 / A CITY IN MOTION', title: 'Musanze town', text: 'Markets, busy streets and a northern city with its own rhythm.', image: cityCenter, href: links.shopping, alt: 'Elevated view over the streets and rooftops of Musanze' },
  { eyebrow: '03 / A PLACE TO PAUSE', title: 'Eat & meet', text: 'Restaurants, cafés and evenings that stretch a little longer.', image: cafe, href: links.eat, alt: 'Migano café and the street outside in Musanze' },
  { eyebrow: '04 / THE GREEN EDGE', title: 'Forest encounters', text: 'Find local information for experiences in the wider region.', image: gorillaOne, href: links.things, alt: 'Mountain gorilla resting among forest leaves' },
  { eyebrow: '05 / AFTER SUNSET', title: 'Night view', text: 'City lights, familiar landmarks and volcano silhouettes.', image: nightClock, href: links.night, alt: 'Illuminated clock tower on a Musanze street at night' },
];

const storyPath = '/story/';
const stays = [
  { name: 'Fatima Hotel', image: `${storyPath}hotel-fatima.jpg`, alt: 'Fatima Hotel on a Musanze street' },
  { name: 'Home Inn', image: `${storyPath}hotel-home-in.jpg`, alt: 'Home Inn guesthouse in Musanze' },
  { name: 'Hotel Muhabura', image: `${storyPath}hotel-muhabura.jpg`, alt: 'Hotel Muhabura with its garden frontage' },
  { name: 'Virunga Hotel', image: `${storyPath}hotel-virunga.jpg`, alt: 'Virunga Hotel among the shops in central Musanze' },
];
const keepsakes = [
  { name: 'Woven baskets', image: `${storyPath}souvenir-baskets.jpg`, alt: 'Colorful woven baskets arranged on shelves' },
  { name: 'Small forms, careful hands', image: `${storyPath}souvenir-gourds.jpg`, alt: 'Handwoven lidded baskets in a range of sizes' },
  { name: 'Beads and color', image: `${storyPath}souvenir-jewelry.jpg`, alt: 'Rows of colorful beaded jewelry' },
  { name: 'A market-side shelf', image: `${storyPath}souvenir-shelf.jpg`, alt: 'A roadside stall with woven pieces, carvings and keepsakes' },
  { name: 'Textiles and prints', image: `${storyPath}souvenir-textiles.jpg`, alt: 'Textiles and printed shirts at a local craft shop' },
];

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = (n: number) => { const x = clamp(n); return x * x * (3 - 2 * x); };
const between = (value: number, start: number, end: number) => smooth((value - start) / (end - start));

function App() {
  const stageRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorLensRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSight, setActiveSight] = useState(0);
  const activeSightRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let smoothScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let lensX = 0;
    let lensY = 0;
    let targetLensX = 0;
    let targetLensY = 0;
    let hasPointer = false;
    const tick = () => {
      const distance = Math.max(0, stage.offsetHeight - window.innerHeight);
      const targetScroll = clamp(-stage.getBoundingClientRect().top, 0, distance);
      const scroll = reduce.matches ? targetScroll : (smoothScroll += (targetScroll - smoothScroll) * 0.13);
      if (reduce.matches) smoothScroll = targetScroll;
      if (reduce.matches) {
        mouseX = 0;
        mouseY = 0;
        targetMouseX = 0;
        targetMouseY = 0;
      } else {
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;
        lensX += (targetLensX - lensX) * 0.2;
        lensY += (targetLensY - lensY) * 0.2;
      }
      const progress = distance ? clamp(scroll / distance) : 0;
      const introExit = between(scroll, 80, 650);
      const cityReveal = between(scroll, 720, 1320);
      const nightReveal = between(scroll, 1840, 2400);
      const cultureReveal = between(scroll, 2860, 3410);
      const stayReveal = between(scroll, 3890, 4470);
      const makerReveal = between(scroll, 4900, 5480);
      const sliderReveal = between(scroll, 5900, 6500);
      const split = Math.pow(between(scroll, 1040, 1660), 1.35);
      const set = (name: string, value: string | number) => root.style.setProperty(name, String(value));
      set('--scroll', progress);
      set('--intro-exit', introExit);
      set('--city-reveal', cityReveal);
      set('--night-reveal', nightReveal);
      set('--culture-reveal', cultureReveal);
      set('--stay-reveal', stayReveal);
      set('--maker-reveal', makerReveal);
      set('--city-frame-opacity', cityReveal * (1 - nightReveal));
      set('--stay-inset-opacity', stayReveal * (1 - makerReveal));
      set('--slider-reveal', sliderReveal);
      set('--split', split);
      set('--hero-scale', 1 + progress * 0.22);
      set('--scene-y', `${progress * -72 + mouseY * 7}px`);
      set('--scene-x', `${mouseX * -14}px`);
      set('--perspective-x', `${50 + mouseX * 9}%`);
      set('--perspective-y', `${45 + mouseY * 7}%`);
      set('--cursor-x', `${lensX}px`);
      set('--cursor-y', `${lensY}px`);
      set('--parallax-city-x', `${mouseX * 7}px`);
      set('--parallax-city-y', `${mouseY * 3.5}px`);
      set('--city-base-opacity', cityReveal * (1 - split));
      set('--city-scale', 1.08 - cityReveal * 0.08 + progress * 0.06);
      set('--city-clip-top', `${split * 7}%`);
      set('--city-clip-side', `${split * 2}%`);
      set('--city-clip-bottom', `${split * 4}%`);
      set('--night-scale', 1.16 - nightReveal * 0.16 + progress * .04);
      set('--culture-scale', 1.18 - cultureReveal * 0.18);
      set('--stay-scale', 1.15 - stayReveal * .15);
      set('--maker-scale', 1.19 - makerReveal * .19);
      set('--title-y', `${introExit * -160}px`);
      set('--title-scale', 1 - introExit * 0.07);
      set('--intro-copy-y', `${introExit * 80}px`);
      set('--story-shift', `${(1 - cityReveal) * 42}px`);
      set('--city-story-opacity', cityReveal * (1 - nightReveal));
      set('--night-story-opacity', nightReveal * (1 - cultureReveal));
      set('--culture-story-opacity', cultureReveal * (1 - stayReveal));
      set('--stay-story-opacity', stayReveal * (1 - makerReveal));
      set('--maker-story-opacity', makerReveal * (1 - sliderReveal));
      set('--track-shift', `${(1 - sliderReveal) * 110}vw`);
      set('--ridge-back-y', `${progress * -5}vh`);
      set('--ridge-front-y', `${progress * -3}vh`);
      set('--frame-left-x', `${-split * 42}vw`);
      set('--frame-right-x', `${split * 42}vw`);
      set('--frame-y', `${split * -6}vh`);
      set('--frame-scale', 1 + split * 0.2);
      set('--slider-visibility', sliderReveal > 0.01 ? 'visible' : 'hidden');
      const scrollSettling = Math.abs(targetScroll - smoothScroll) > 0.6;
      const pointerSettling =
        Math.abs(targetMouseX - mouseX) > 0.001 ||
        Math.abs(targetMouseY - mouseY) > 0.001 ||
        (hasPointer && (Math.abs(targetLensX - lensX) > 0.35 || Math.abs(targetLensY - lensY) > 0.35));
      if ((scrollSettling || pointerSettling) && !reduce.matches) raf = requestAnimationFrame(tick);
    };
    const requestTick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const pointer = (event: PointerEvent) => {
      if (reduce.matches || event.pointerType === 'touch') return;
      targetMouseX = event.clientX / window.innerWidth - 0.5;
      targetMouseY = event.clientY / window.innerHeight - 0.5;
      targetLensX = event.clientX;
      targetLensY = event.clientY;
      if (!hasPointer) {
        hasPointer = true;
        lensX = event.clientX;
        lensY = event.clientY;
        root.style.setProperty('--cursor-lens-visible', '1');
      }
      requestTick();
    };
    const pointerExit = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        root.style.setProperty('--cursor-lens-visible', '0');
        root.style.setProperty('--cursor-lens-scale', '1');
      }
    };
    const pointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const target = event.target;
      const interactive = target instanceof Element && target.closest('a, button, input, select, textarea, [role="button"]');
      root.style.setProperty('--cursor-lens-scale', interactive ? '1.16' : '1');
    };
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerout', pointerExit);
    document.addEventListener('pointerover', pointerOver);
    requestTick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerout', pointerExit);
      document.removeEventListener('pointerover', pointerOver);
      root.style.removeProperty('--scroll');
      root.style.removeProperty('--cursor-x');
      root.style.removeProperty('--cursor-y');
      root.style.removeProperty('--cursor-lens-visible');
      root.style.removeProperty('--cursor-lens-scale');
    };
  }, []);

  const selectSight = (index: number) => {
    activeSightRef.current = index;
    setActiveSight(index);
  };
  const moveSlider = (direction: number) => {
    const next = (activeSightRef.current + direction + sliderItems.length) % sliderItems.length;
    selectSight(next);
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(`[data-sight="${next}"]`);
    if (track && card) {
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);
  const syncSliderToSwipe = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-sight]'));
    let nearest = activeSightRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < nearestDistance) { nearestDistance = distance; nearest = index; }
    });
    if (nearest !== activeSightRef.current) selectSight(nearest);
  };

  const mobileLinks = [
    ['Explore', links.things], ['Stay', links.stay], ['Eat & Drink', links.eat], ['Getting Around', links.move],
    ['Shopping', links.shopping], ['Souvenirs', links.souvenirs], ['History & Culture', links.culture],
    ['Musanze Night View', links.night], ['Education', links.education], ['Health', links.health], ['Property', links.property],
  ];
  const heroStyle = { '--hero-image': `url(${mountain})`, '--city-image': `url(${downtown})`, '--night-image': `url(${nightView})`, '--culture-image': `url(${downtownFour})` } as CSSProperties;

  return (
    <>
    <main className="site" style={heroStyle}>
      <section ref={stageRef} className="cinema-scroll" id="journey" aria-label="A moving journey through Musanze">
        <div className="stage">
          <div className="world" aria-hidden="true">
            <div className="scene sky" />
            <div className="scene city-scene" />
            <div className="scene night-scene" />
            <div className="scene culture-scene" />
            <div className="scene stay-scene" />
            <div className="scene maker-scene" />
            <div className="scene inset-scene" />
            <div className="horizon-glow" />
            <div className="ridge ridge-back" />
            <div className="ridge ridge-front" />
            <div className="scene-frame frame-left" />
            <div className="scene-frame frame-right" />
            <div className="grain" />
            <div className="shade" />
          </div>
          <header className="header">
            <a className="brand-link" href="/" aria-label="MusanzeGuide24/7 home" data-testid="link-home"><img src={logo} alt="MusanzeGuide24/7 — Explore, Stay, Discover, Connect" /></a>
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href={links.things} data-testid="link-explore">Explore</a><a href={links.stay} data-testid="link-stay">Stay</a><a href={links.eat} data-testid="link-eat-drink">Eat & Drink</a><a href="#local-guide" data-testid="link-local-guide">Local guide</a>
            </nav>
            <div className="header-actions"><a className="header-cta" href={links.stay} data-testid="link-plan-your-stay">Plan your stay <ArrowRight aria-hidden="true" size={15} /></a>
              <button ref={menuButtonRef} className="menu-btn" data-testid="button-toggle-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-sheet" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
            </div>
            <nav className={`mobile-sheet ${mobileOpen ? 'is-open' : ''}`} id="mobile-sheet" aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
              {mobileLinks.map(([label, href]) => <a key={label} href={href} data-testid={`link-mobile-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} onClick={() => setMobileOpen(false)}>{label}<ArrowRight size={15} aria-hidden="true" /></a>)}
            </nav>
          </header>
          <div className="scene-index"><span>RWANDA</span><i /> <span>NORTHERN PROVINCE</span></div>
          <div className="hero-title-wrap">
            <span className="hero-overline">A city at the foot of the Virungas</span>
            <h1 className="hero-title" data-testid="text-page-title">Musanze</h1>
            <p className="hero-subtitle">The city beyond the gorillas.</p>
          </div>
          <div className="hero-note"><span>01 — THE LANDSCAPE</span><span>Where the road meets the volcanoes</span></div>
          <div className="intro-copy">
            <p>A practical independent guide to a northern Rwandan city shaped by volcano country—and made vivid by the people who call it home.</p>
            <div className="hero-tags" aria-label="Musanze highlights"><span>Volcanoes</span><span>City life</span><span>Community</span></div>
          </div>
          <section className="story-panel city-story" aria-label="Musanze city life">
            <span className="story-number">02 / FIND YOUR BEARINGS</span>
            <h2>Beyond the mountain,<br /><em>the city moves.</em></h2>
            <p>Markets, shops, busy streets and everyday life unfold beneath the Virunga skyline.</p>
            <a href={links.shopping} className="light-link" data-testid="link-city-life">Discover the city <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="story-panel night-story" aria-label="Musanze after sunset">
            <span className="story-number">03 / AFTER SUNSET · 24/7</span>
            <h2>When the lights<br />come <em>on.</em></h2>
            <p>Night lights. City streets. Landmarks. Volcano silhouettes. Musanze has another story after dark.</p>
            <a href={links.night} className="light-link" data-testid="link-night-view">Explore Musanze Night View <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="story-panel culture-story" aria-label="Culture and local life">
            <span className="story-number">04 / LIVING HERITAGE</span>
            <h2>A city with<br /><em>its own rhythm.</em></h2>
            <p>Meet the living heritage of the north through local culture, dance and everyday life—not only the view from the road.</p>
            <a href={links.culture} className="light-link" data-testid="link-culture">History & Culture <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="story-panel stay-story" aria-label="Places to stay in Musanze">
            <span className="story-number">05 / MAKE A BASE</span>
            <h2>Wake up<br /><em>near the story.</em></h2>
            <p>From the town centre to a quieter garden, choose a stay that makes room for an early start and an unhurried evening.</p>
            <a href={links.stay} className="light-link" data-testid="link-stays-story">Browse places to stay <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="story-panel maker-story" aria-label="Local craft and keepsakes">
            <span className="story-number">06 / MADE TO BE KEPT</span>
            <h2>Carry a little<br /><em>of the north.</em></h2>
            <p>Woven forms, beads, textiles and keepsakes bring the textures of a visit back into view.</p>
            <a href={links.souvenirs} className="light-link" data-testid="link-keepsakes-story">Explore local souvenirs <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <div className="sights-area" aria-label="Explore the region">
            <div className="sights-heading"><span>07 / KEEP EXPLORING</span><span>SCROLL OR CHOOSE A PLACE</span></div>
            <div className="sights-track" ref={trackRef} onScroll={syncSliderToSwipe} role="region" aria-roledescription="carousel" aria-label="Musanze highlights carousel">
              {sliderItems.map((item, index) => <a href={item.href} className={`sight-card ${activeSight === index ? 'is-active' : ''}`} data-sight={index} data-testid={`slide-highlight-${index + 1}`} key={item.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${sliderItems.length}: ${item.title}. ${item.text}`} onFocus={() => selectSight(index)}>
                <img src={item.image} alt={item.alt} />
                <span className="sight-shade" />
                <span className="sight-kicker">{item.eyebrow}</span>
                <span className="sight-copy"><strong>{item.title}</strong><span>{item.text}</span></span>
                <span className="sight-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              </a>)}
            </div>
            <div className="sights-controls">
              <button aria-label="Previous highlight" data-testid="button-previous-highlight" onClick={() => moveSlider(-1)}><ArrowLeft size={17} aria-hidden="true" /></button>
              <span data-testid="text-highlight-counter">{String(activeSight + 1).padStart(2, '0')} <i /> {String(sliderItems.length).padStart(2, '0')}</span>
              <button aria-label="Next highlight" data-testid="button-next-highlight" onClick={() => moveSlider(1)}><ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
          <div className="scroll-progress" aria-hidden="true"><span /></div>
          <a href="#local-guide" className="scroll-indicator" data-testid="link-scroll-to-guide" aria-label="Continue to the local guide"><span>SCROLL TO TRAVEL THROUGH MUSANZE</span><ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="arrival-strip" aria-label="Musanze highlights">
        <span>YOUR GATEWAY TO MUSANZE AND BEYOND</span><strong>One place.<br />Many ways in.</strong>
        <p>Start with volcanoes and hikes. Stay for the streets, cafés, culture and useful local details.</p>
        <a href={links.things} data-testid="link-see-things-to-do">See things to do <ArrowRight size={16} aria-hidden="true" /></a>
      </section>

      <section className="local-section" id="local-guide">
        <div className="local-heading">
          <div><span className="eyebrow">THE CITY BEYOND THE GORILLAS</span><h2>Find your Musanze.</h2></div>
          <p>Volcanoes. City life. Food. Schools. Neighbourhoods. Local experiences. Start with what brought you here; find everything else along the way.</p>
        </div>
        <div className="destination-list">
          <a href={links.things} data-testid="link-destination-volcanoes"><span>01</span><div><small>OUTDOORS & EXPERIENCES</small><strong>Volcano country</strong><p>Volcanoes · hikes · caves</p></div><img src={volcano} alt="Green ridges beneath a cloud-wrapped volcano near Musanze" /><ArrowRight aria-hidden="true" /></a>
          <a href={links.shopping} data-testid="link-destination-city"><span>02</span><div><small>MARKETS & EVERYDAY LIFE</small><strong>City life</strong><p>Markets · shops · city streets</p></div><img src={centralMall} alt="Central shopping district and street life in Musanze" /><ArrowRight aria-hidden="true" /></a>
          <a href={links.eat} data-testid="link-destination-food"><span>03</span><div><small>RESTAURANTS & CAFÉS</small><strong>Eat & meet</strong><p>Restaurants · cafés · evenings</p></div><img src={cafe} alt="Migano café on a busy Musanze street" /><ArrowRight aria-hidden="true" /></a>
          <a href={links.stay} data-testid="link-destination-stays"><span>04</span><div><small>HOTELS & GUESTHOUSES</small><strong>Stay a while</strong><p>Places to stay in and around town</p></div><img src={homeProperty} alt="A quiet guesthouse set among greenery near Musanze" /><ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="stay-collection" aria-labelledby="stay-collection-title">
        <div className="stay-collection-heading">
          <div><span className="eyebrow">A PLACE TO LAND</span><h2 id="stay-collection-title">Stay close<br />to what moves you.</h2></div>
          <div><p>Start with a feel for the options around town. The accommodation guide has the practical details to help you choose.</p><a href={links.stay} data-testid="link-stays-collection">See all places to stay <ArrowRight size={16} aria-hidden="true" /></a></div>
        </div>
        <div className="stay-gallery">
          {stays.map((stay, index) => <a className={`stay-card stay-card-${index + 1}`} key={stay.name} href={links.stay} data-testid={`link-stay-photo-${index + 1}`}>
            <img src={stay.image} alt={stay.alt} loading="lazy" />
            <span className="stay-card-count">0{index + 1} / MUSANZE</span>
            <span className="stay-card-name">{stay.name}<ArrowRight size={17} aria-hidden="true" /></span>
          </a>)}
        </div>
      </section>

      <section className="culture-band">
        <div className="culture-band-image"><img src="/story/local-dance.jpg" alt="Rwandan dancers perform outdoors at a cultural site" loading="lazy" /></div>
        <div className="culture-band-copy"><span className="eyebrow">LIVING HERITAGE</span><h2>A place is more<br />than its view.</h2><p>Traditional architecture, dance, daily life and cultural experiences from Rwanda’s northern region. Discover the people and stories that give Musanze its character.</p><a href={links.culture} data-testid="link-discover-culture">Discover History & Culture <ArrowRight size={16} aria-hidden="true" /></a></div>
        <span className="culture-coordinate">1°29′ S &nbsp; 29°38′ E</span>
      </section>

      <section className="services-section">
        <div className="services-intro"><span className="eyebrow">USEFUL LOCAL GUIDE</span><h2>Live, learn<br />and get around.</h2><p>Useful local information for visitors, residents and anyone finding their bearings in Musanze.</p><a href={links.move} data-testid="link-getting-around">Getting around <ArrowRight size={16} aria-hidden="true" /></a></div>
        <div className="service-lines">
          {[
            ['01', 'Getting around', 'Transport · directions', tower, links.move, 'A landmark building and street scene in central Musanze'],
            ['02', 'Education', 'Primary · secondary · university', school, links.education, 'Campus buildings at a higher-learning institute in Musanze'],
            ['03', 'Health & services', 'Clinics · pharmacies · services', hospital, links.health, 'Ruhengeri Level Two Teaching Hospital in Musanze'],
            ['04', 'Property & neighbourhoods', 'Homes · rentals · neighbourhoods', homeProperty, links.property, 'A residential property in a leafy neighbourhood'],
          ].map(([number, title, summary, image, href, alt]) => <a href={href} className="service-line" data-testid={`link-service-${String(number).padStart(2, '0')}`} key={number}>
            <span>{number}</span><span className="service-thumb"><img src={image} alt={alt} /></span><span className="service-name"><strong>{title}</strong><small>{summary}</small></span><ArrowRight size={18} aria-hidden="true" />
          </a>)}
        </div>
      </section>

      <section className="souvenir-band">
        <div><span className="eyebrow">MUSANZEGUIDE24/7 SOUVENIRS</span><h2>Take Musanze<br />home.</h2><p>Explore our growing collection of Musanze-inspired keepsakes and branded items.</p><a href={links.souvenirs} data-testid="link-explore-souvenirs">Explore souvenirs <ArrowRight size={16} aria-hidden="true" /></a></div>
        <img src={logo} alt="MusanzeGuide24/7 official brand artwork" />
      </section>

      <section className="craft-notebook" aria-labelledby="craft-title">
        <div className="craft-heading"><div><span className="eyebrow">A CLOSER LOOK · LOCAL CRAFT</span><h2 id="craft-title">Color, weave<br />and memory.</h2></div><p>Small details reward a slower look: a basket’s changing pattern, beads catching the light, the busy rhythm of a shopfront. Explore the souvenirs guide for more.</p></div>
        <div className="craft-gallery">
          {keepsakes.map((item, index) => <a className={`craft-tile craft-tile-${index + 1}`} key={item.name} href={links.souvenirs} data-testid={`link-craft-detail-${index + 1}`}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span><i>0{index + 1}</i>{item.name}<ArrowRight size={16} aria-hidden="true" /></span>
          </a>)}
        </div>
        <a className="craft-more" href={links.souvenirs} data-testid="link-craft-guide">Find souvenirs in the local guide <ArrowRight size={16} aria-hidden="true" /></a>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="MusanzeGuide24/7 home" data-testid="link-footer-home"><img src={logo} alt="MusanzeGuide24/7" /></a>
            <span>EXPLORE · STAY · DISCOVER · CONNECT</span>
            <p>A practical independent guide to Musanze, Rwanda — places, people, businesses and visitor experiences.</p>
          </div>
          <div className="footer-links"><span>FIND YOUR WAY</span><div>{[['Things to do', links.things], ['Eat & Drink', links.eat], ['Places to stay', links.stay], ['Musanze Night View', links.night], ['Local life', links.shopping], ['Education', links.education], ['Souvenirs', links.souvenirs], ['Health', links.health], ['History & Culture', links.culture], ['Property', links.property], ['Getting Around', links.move]].map(([title, href]) => <a key={title} href={href} data-testid={`link-footer-${String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{title}</a>)}</div></div>
          <div className="qr-block"><img src={qrCode} alt="QR code linking to musanzeguide.com" /><span>SCAN TO EXPLORE</span><a href="https://musanzeguide.com/" data-testid="link-footer-site">musanzeguide.com</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 MusanzeGuide24/7 · Rwanda · All rights reserved.</span><span>Your Gateway to Musanze and Beyond</span><a href="#journey" data-testid="link-back-to-top">Back to the beginning ↑</a></div>
      </footer>
    </main>
    <div ref={cursorLensRef} className="cursor-lens" aria-hidden="true" />
    </>
  );
}

export default App;
