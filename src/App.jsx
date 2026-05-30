import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Image,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { siteConfig, whatsAppUrl } from './config/site';
import {
  aboutSection,
  contactSection,
  footerContent,
  gallerySection,
  heroContent,
  introSection,
  locationsSection,
  navItems,
  packagesSection,
  photoVideoSection,
  photoshootSection,
} from './data/siteContent';

const iconRegistry = {
  heart: Heart,
  mapPin: MapPin,
  sparkles: Sparkles,
  video: Video,
};

const resolveLink = (href) => (href === 'whatsapp' ? whatsAppUrl : href);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ButtonLink({ href, children, variant = 'dark', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-4';
  const styles =
    variant === 'light'
      ? 'bg-white/88 text-[#222222] shadow-[0_16px_48px_rgba(0,0,0,0.16)] hover:bg-white focus-visible:ring-[#B89B64]/30'
      : variant === 'whatsapp'
        ? 'border border-[#25D366]/24 bg-white/86 text-[#244632] shadow-[0_14px_40px_rgba(74,81,64,0.12)] backdrop-blur-xl hover:border-[#25D366]/60 hover:bg-[#25D366] hover:text-white focus-visible:ring-[#25D366]/30'
      : variant === 'outline'
        ? 'border border-white/38 bg-white/12 text-white backdrop-blur-xl hover:bg-white/20 focus-visible:ring-white/24'
        : 'bg-[#222222] text-white shadow-[0_18px_50px_rgba(34,34,34,0.24)] hover:bg-[#4A5140] focus-visible:ring-[#B89B64]/30';

  return (
    <a className={`${base} ${styles} ${className}`} href={href}>
      {children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, children, light = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto max-w-3xl text-center"
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${light ? 'text-[#E8DCC8]' : 'text-[#B89B64]'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`section-heading text-balance ${
          light ? 'text-white' : 'text-[#222222]'
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`section-copy mt-6 ${light ? 'text-white/76' : 'text-[#4A5140]'}`}>
          {children}
        </p>
      )}
    </motion.div>
  );
}

function MobileExpandable({
  children,
  collapsedHeight = 320,
  label = 'Explore',
  tone = 'light',
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`mobile-expand ${isExpanded ? 'is-expanded' : ''} ${
        tone === 'dark' ? 'mobile-expand-dark' : ''
      }`}
      style={{ '--collapsed-height': `${collapsedHeight}px` }}
    >
      <div className="mobile-expand-content">{children}</div>
      <button
        type="button"
        className="mobile-expand-toggle"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span>{isExpanded ? 'Close' : label}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

function LogoMark({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 7.6c8.9 0 16.1 7.2 16.1 16.1 0 8.7-7.1 15.8-15.8 15.8-5 0-9.5-2.3-12.4-6"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M11.3 25.6c3.4-5.2 7.8-7.8 13.1-7.8 5.1 0 9.2 2.3 12.4 6.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14.6 30.7h18.8"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M31.8 9.9c-4.9 2.3-7.3 6.2-7.3 11.7 0 3.1.9 5.8 2.8 8.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.64"
      />
      <path
        d="M20.9 16.1c1.3-1.5 2.7-2.7 4.2-3.6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function BrandLogo({ className = '', markClassName = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <LogoMark className={`logo-mark ${markClassName}`} />
      <span className="brand-copy">
        <span className="brand-wordmark">{siteConfig.brandName}</span>
        <span className="brand-subtitle">{siteConfig.brandSubtitle}</span>
      </span>
    </span>
  );
}

function shouldShowBrandIntro() {
  if (!siteConfig.intro.enabled || typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('intro') === '1') {
    return true;
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  try {
    return window.localStorage.getItem(siteConfig.intro.storageKey) !== 'true';
  } catch {
    return true;
  }
}

function BrandIntro({ onComplete }) {
  useEffect(() => {
    document.body.classList.add('intro-lock');

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(siteConfig.intro.storageKey, 'true');
      } catch {
        // Ignore storage failures; the intro can simply play again.
      }
      onComplete();
    }, siteConfig.intro.durationMs);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('intro-lock');
    };
  }, [onComplete]);

  const skipIntro = () => {
    try {
      window.localStorage.setItem(siteConfig.intro.storageKey, 'true');
    } catch {
      // Ignore storage failures; this is only a preference.
    }
    onComplete();
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const parallaxX = Math.max(-1, Math.min(1, x)) * 18;
    const parallaxY = Math.max(-1, Math.min(1, y)) * 12;

    event.currentTarget.style.setProperty('--intro-parallax-x', `${parallaxX}px`);
    event.currentTarget.style.setProperty('--intro-parallax-y', `${parallaxY}px`);
    event.currentTarget.style.setProperty('--intro-parallax-x-reverse', `${-parallaxX}px`);
    event.currentTarget.style.setProperty('--intro-parallax-y-reverse', `${-parallaxY}px`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--intro-parallax-x', '0px');
    event.currentTarget.style.setProperty('--intro-parallax-y', '0px');
    event.currentTarget.style.setProperty('--intro-parallax-x-reverse', '0px');
    event.currentTarget.style.setProperty('--intro-parallax-y-reverse', '0px');
  };

  return (
    <motion.div
      className="brand-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
      aria-label={`${siteConfig.brandName} intro`}
    >
      <div
        className="brand-intro-scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <div className="intro-sun" />
        <div className="intro-shadow intro-shadow-one" />
        <div className="intro-shadow intro-shadow-two" />
        <div className="intro-shadow intro-shadow-three" />

        <motion.div
          className="brand-intro-lockup"
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoMark className="intro-logo-mark" />
          <h1>{siteConfig.brandName}</h1>
          <span className="intro-divider" aria-hidden="true" />
          <p>{siteConfig.brandSubtitle}</p>
        </motion.div>

        <button type="button" className="intro-skip" onClick={skipIntro}>
          Skip
        </button>
      </div>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header-bar fixed inset-x-0 top-0 z-50">
      <div className="site-header-shell mx-auto grid min-h-[74px] max-w-[1280px] grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 sm:px-6 lg:min-h-[80px] lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a
          href="#top"
          className="brand-anchor text-white"
          aria-label={`${siteConfig.brandName} home`}
        >
          <BrandLogo />
        </a>

        <nav className="hidden items-center justify-center gap-10 text-[13px] font-normal text-white/72 lg:flex xl:gap-12">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="header-nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end lg:flex">
          <a
            href={whatsAppUrl}
            className="whatsapp-header-link rounded-full border border-white/16 bg-white/12 px-5 py-3 text-sm font-medium text-white backdrop-blur-2xl transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/22"
          >
            {siteConfig.whatsappLabel}
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/12 text-white backdrop-blur-2xl transition hover:bg-white/20 lg:hidden"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="site-mobile-menu mx-auto max-w-[1280px] px-4 pb-4 sm:px-6 lg:hidden"
          >
            <nav className="grid gap-1 text-sm font-normal text-white/78">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-1 py-3 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={whatsAppUrl}
                className="whatsapp-header-link mt-1 inline-flex items-center justify-center rounded-full border border-white/16 bg-white/12 px-4 py-3 text-white transition"
              >
                {siteConfig.whatsappLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = heroContent.slides;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((value) => (value + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#222222] text-white">
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          loading={activeSlide === 0 ? 'eager' : 'lazy'}
          fetchPriority={activeSlide === 0 ? 'high' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: slide.position }}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1.055 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.45, ease: 'easeInOut' },
            scale: { duration: 7.4, ease: 'easeOut' },
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,14,12,0.76),rgba(38,29,20,0.44)_48%,rgba(20,18,16,0.34)),linear-gradient(180deg,rgba(8,8,8,0.2),rgba(8,8,8,0.48))]" />

      <div className="section-shell relative z-10 flex min-h-screen items-end pb-24 pt-36 sm:items-center sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="hero-copy max-w-4xl"
        >
          <div className="hero-brand-lockup mb-5">
            <LogoMark className="hero-logo-mark" />
            <p className="hero-brand-display">{heroContent.brandDisplay}</p>
          </div>
          <h1 className="hero-headline text-balance max-w-4xl">
            {heroContent.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            {heroContent.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" variant="light">
              <CalendarIcon />
              {heroContent.primaryCta}
            </ButtonLink>
            <ButtonLink href={whatsAppUrl} variant="outline">
              <MessageCircle size={18} aria-hidden="true" />
              {heroContent.secondaryCta}
            </ButtonLink>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="section-shell flex gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.label} slide`}
              onClick={() => setActiveSlide(index)}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/26"
            >
              <span
                className={`block h-full rounded-full bg-white transition-all duration-700 ${
                  activeSlide === index ? 'w-full opacity-100' : 'w-0 opacity-60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return <ArrowRight size={18} aria-hidden="true" />;
}

function Intro() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="section-shell">
        <SectionIntro title={introSection.title}>{introSection.text}</SectionIntro>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="photoshoots" className="bg-[#E8DCC8]/44 px-4 py-24 sm:py-32">
      <div className="section-shell">
        <SectionIntro eyebrow={photoshootSection.eyebrow} title={photoshootSection.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {photoshootSection.categories.map((category, index) => (
            <motion.article
              key={category.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(74,81,64,0.10)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.alt}
                  loading="lazy"
                  style={{ objectPosition: category.position ?? 'center' }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/46 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-medium text-[#222222]">{category.title}</h3>
                <p className="mt-3 leading-7 text-[#4A5140]">{category.description}</p>
                <p className="mt-5 text-sm leading-6 text-[#222222]/68">{category.includes}</p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F8F5EF] px-4 py-2.5 text-sm font-semibold text-[#222222] transition hover:bg-[#222222] hover:text-white"
                >
                  {category.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoVideo() {
  return (
    <section
      id="photo-video"
      className="px-4 py-24 text-white sm:py-32"
      style={{
        background:
          'radial-gradient(ellipse at 16% 8%, rgba(103, 91, 150, 0.42), transparent 42%), linear-gradient(135deg, #101827 0%, #18304b 42%, #342846 100%)',
      }}
    >
      <div className="section-shell">
        <SectionIntro eyebrow={photoVideoSection.eyebrow} title={photoVideoSection.title} light>
          {photoVideoSection.text}
        </SectionIntro>

        <MobileExpandable collapsedHeight={230} tone="dark">
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photoVideoSection.features.map((card, index) => {
              const Icon = iconRegistry[card.icon] ?? Sparkles;
              return (
                <motion.article
                key={card.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="rounded-[28px] border border-white/14 bg-white/9 p-6 backdrop-blur-md"
                >
                  <div className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-white/14">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-medium">{card.title}</h3>
                  <p className="mt-4 leading-7 text-white/72">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </MobileExpandable>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="px-4 py-24 sm:py-32">
      <div className="section-shell">
        <SectionIntro title={locationsSection.title}>{locationsSection.text}</SectionIntro>

        <MobileExpandable collapsedHeight={190}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3"
          >
            {locationsSection.chips.map((location) => (
              <span
                key={location}
                className="rounded-full border border-[#4A5140]/10 bg-white/70 px-5 py-3 text-sm font-semibold text-[#4A5140] shadow-[0_12px_38px_rgba(74,81,64,0.08)]"
              >
                {location}
              </span>
            ))}
          </motion.div>
        </MobileExpandable>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-white px-4 py-24 sm:py-32">
      <div className="section-shell">
        <SectionIntro eyebrow={gallerySection.eyebrow} title={gallerySection.title} />
        <div className="masonry mt-14">
          {gallerySection.items.map((item, index) => (
            <motion.figure
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.62, delay: (index % 3) * 0.05 }}
              className="masonry-item group mb-4 overflow-hidden rounded-[30px] bg-[#F8F5EF]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/78 px-4 py-2 text-xs font-semibold text-[#222222] opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100">
                  {item.label}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Options() {
  return (
    <section className="bg-[#F8F5EF] px-4 py-24 sm:py-32">
      <div className="section-shell">
        <SectionIntro title={packagesSection.title} />
        <MobileExpandable collapsedHeight={520}>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {packagesSection.packages.map((option, index) => (
              <motion.article
                key={option.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.62, delay: index * 0.06 }}
                className="rounded-[28px] border border-[#4A5140]/10 bg-white/76 p-6 shadow-[0_18px_58px_rgba(74,81,64,0.08)]"
              >
                <div className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-[#E8DCC8] text-[#4A5140]">
                  <Image size={20} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-[#222222]">{option.title}</h3>
                <p className="mt-3 min-h-20 leading-7 text-[#4A5140]">{option.text}</p>
                <ul className="mt-6 space-y-3">
                  {option.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#222222]/72">
                      <Check className="mt-0.5 shrink-0 text-[#B89B64]" size={17} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </MobileExpandable>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="aspect-[1.02/1] overflow-hidden rounded-[34px]"
        >
          <img
            src={aboutSection.image}
            alt={aboutSection.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, delay: 0.08 }}
          className="max-w-2xl lg:pl-8"
        >
          <p className="eyebrow mb-4 text-[#B89B64]">{aboutSection.eyebrow}</p>
          <h2 className="section-heading text-[#222222]">
            {aboutSection.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4A5140]">{aboutSection.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact">
              <Sparkles size={18} aria-hidden="true" />
              {aboutSection.cta}
            </ButtonLink>
            <ButtonLink href={whatsAppUrl} variant="whatsapp">
              <MessageCircle size={18} aria-hidden="true" />
              {aboutSection.secondaryCta}
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#E8DCC8]/54 px-4 py-24 sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="eyebrow mb-4 text-[#B89B64]">{contactSection.eyebrow}</p>
          <h2 className="section-heading text-balance text-[#222222]">
            {contactSection.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4A5140]">{contactSection.text}</p>
          <a
            href={whatsAppUrl}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#4A5140] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222222]"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {contactSection.whatsappCta}
          </a>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, delay: 0.08 }}
          name={siteConfig.formName}
          method="POST"
          action={siteConfig.successPath}
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="rounded-[34px] bg-white/82 p-5 shadow-[0_28px_90px_rgba(74,81,64,0.14)] sm:p-8"
        >
          <input type="hidden" name="form-name" value={siteConfig.formName} />
          <input type="hidden" name="subject" value={siteConfig.formSubject} />
          <p className="hidden">
            <label>
              Do not fill this out if you are human: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Label text={contactSection.fields.name}>
              <input className="field" type="text" name="name" autoComplete="name" required />
            </Label>
            <Label text={contactSection.fields.email}>
              <input className="field" type="email" name="email" autoComplete="email" required />
            </Label>
            <Label text={contactSection.fields.whatsapp}>
              <input className="field" type="tel" name="whatsapp" autoComplete="tel" />
            </Label>
            <Label text={contactSection.fields.preferredDate}>
              <input className="field" type="date" name="preferredDate" />
            </Label>
            <Label text={contactSection.fields.photoshootType}>
              <select className="field" name="photoshootType" defaultValue="" required>
                <option value="" disabled>
                  {contactSection.fields.photoshootTypePlaceholder}
                </option>
                {contactSection.photoshootTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Label>
            <Label text={contactSection.fields.service}>
              <select className="field" name="service" defaultValue="" required>
                <option value="" disabled>
                  {contactSection.fields.servicePlaceholder}
                </option>
                {contactSection.services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </Label>
            <Label text={contactSection.fields.location}>
              <input
                className="field"
                type="text"
                name="location"
                placeholder={contactSection.fields.locationPlaceholder}
              />
            </Label>
            <Label text={contactSection.fields.people}>
              <input
                className="field"
                type="number"
                min="1"
                name="people"
                placeholder={contactSection.fields.peoplePlaceholder}
              />
            </Label>
            <Label text={contactSection.fields.message} className="sm:col-span-2">
              <textarea
                className="field min-h-36 resize-y"
                name="message"
                placeholder={contactSection.fields.messagePlaceholder}
                required
              />
            </Label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#222222] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#4A5140] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B89B64]/30"
          >
            <Send size={18} aria-hidden="true" />
            {contactSection.submitLabel}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Label({ text, children, className = '' }) {
  return (
    <label className={`grid gap-2 text-sm font-semibold text-[#4A5140] ${className}`}>
      <span>{text}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-[#222222] px-4 py-12 text-white">
      <div className="section-shell flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xl font-medium">{footerContent.text}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/62">{footerContent.subtext}</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-semibold text-white/72">
          {footerContent.links.map((link) => (
            <a key={link.id} href={resolveLink(link.href)} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowBrandIntro);

  return (
    <>
      <AnimatePresence>
        {showIntro && <BrandIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Categories />
        <PhotoVideo />
        <Locations />
        <Gallery />
        <Options />
        <About />
        <Contact />
      </main>
      <Footer />
      <a
        href={whatsAppUrl}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_50px_rgba(37,211,102,0.34)] transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30"
        aria-label={siteConfig.floatingWhatsappLabel}
      >
        <MessageCircle size={25} aria-hidden="true" />
      </a>
    </>
  );
}
