import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Phone, X } from 'lucide-react'

const PORTRAIT = '/assets/dazet-portrait-photo.png'

const NAV = [
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Meet Chelsea', href: '#attorney' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

const CONNECT = [
  { label: 'Call', href: 'tel:985-249-6475' },
  { label: 'Email', href: 'mailto:chelsea@dazetlaw.com' },
  { label: 'Consult', href: '#contact' },
] as const

const drawerEase = 'cubic-bezier(0.76, 0, 0.24, 1)'

/**
 * Editorial hero: one clear vertical story.
 * Header → marquee → Chelsea → centered caption + CTA.
 * Scroll softens the figure; nothing fights her for attention.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Restrained scroll motion — elegant, not flashy
  const portraitScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1.05, 0.96])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0vh', '-4vh'])
  const portraitRotateX = useTransform(scrollYProgress, [0, 1], [0, 3])
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.88, 0.65])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const captionOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.95, 0.8])
  const chromeOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.78])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollMotion = !reduceMotion

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[130vh] w-full bg-cream sm:h-[145vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-cream">
        {/* ——— Background ——— */}
        <motion.div
          className="anim-fade-in absolute inset-0 z-0 bg-cream"
          style={scrollMotion ? { y: bgY } : undefined}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_75%,rgba(181,147,90,0.11)_0%,transparent_68%)]" />
        </motion.div>

        {/* ——— Marquee (behind portrait) ——— */}
        <motion.div
          className="anim-fade-up absolute inset-x-0 top-[11vh] z-10 overflow-hidden sm:top-[12vh]"
          style={{
            animationDelay: '500ms',
            ...(scrollMotion ? { opacity: marqueeOpacity } : {}),
          }}
        >
          <div className="dh-marquee-track flex w-max whitespace-nowrap font-cinzel text-[12vh] font-bold leading-none sm:text-[22vh] lg:text-[24vh]">
            <span className="dh-marquee-cream pr-[6vw]">
              Chelsea&nbsp;&mdash;&nbsp;Dazet&nbsp;
            </span>
            <span className="dh-marquee-cream pr-[6vw]">
              Chelsea&nbsp;&mdash;&nbsp;Dazet&nbsp;
            </span>
          </div>
        </motion.div>

        {/* ——— Portrait (hero focus) — full original scale ——— */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-[11.5rem] sm:pb-0"
          style={{ perspective: 1400 }}
        >
          <motion.div
            className="anim-rise-in flex h-full w-full items-end justify-center"
            style={
              scrollMotion
                ? {
                    scale: portraitScale,
                    y: portraitY,
                    rotateX: portraitRotateX,
                    transformOrigin: 'center bottom',
                    transformStyle: 'preserve-3d',
                  }
                : { transformOrigin: 'center bottom' }
            }
          >
            <img
              src={PORTRAIT}
              alt="Chelsea Dazet, Attorney at Law"
              className="h-full max-h-[calc(100dvh-12rem)] w-auto max-w-[min(92vw,680px)] object-contain object-[center_14%] drop-shadow-[0_22px_36px_rgba(18,24,32,0.14)] sm:max-h-[100dvh] sm:max-w-[min(90vw,680px)] sm:object-[center_18%]"
            />
          </motion.div>
        </div>

        {/* ——— Header ——— */}
        <motion.header
          className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:gap-6 sm:px-10 sm:pt-6"
          style={scrollMotion ? { opacity: chromeOpacity } : undefined}
        >
          <div className="flex min-w-0 flex-1 items-center gap-5 lg:gap-7">
            <a
              href="#home"
              className="anim-fade-up flex shrink-0 items-center"
              style={{ animationDelay: '800ms' }}
              aria-label="Dazet Law"
            >
              <img
                src="/logo.png"
                alt="Dazet Law"
                className="h-11 w-auto object-contain sm:h-16 lg:h-[4.25rem]"
              />
            </a>

            <span
              className="anim-fade-up hidden h-7 w-px shrink-0 bg-[#B5935A]/40 sm:block"
              style={{ animationDelay: '900ms' }}
              aria-hidden
            />

            <nav
              className="anim-fade-up hidden min-w-0 items-center gap-5 font-lora text-[0.95rem] font-semibold text-[#1E2530] sm:flex lg:gap-7 lg:text-[1.05rem]"
              aria-label="Primary"
              style={{ animationDelay: '1000ms' }}
            >
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap transition-opacity duration-300 hover:opacity-60"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div
            className="anim-fade-up hidden shrink-0 items-center gap-5 sm:flex"
            style={{ animationDelay: '1150ms' }}
          >
            <a
              href="mailto:chelsea@dazetlaw.com"
              className="hidden font-lora text-[0.95rem] font-medium text-[#5A6270] transition-opacity duration-300 hover:opacity-60 lg:inline"
            >
              Email
            </a>
            <a
              href="tel:985-249-6475"
              className="inline-flex items-center gap-2 rounded-sm bg-[#B5935A] px-5 py-2.5 font-cinzel text-[0.8rem] font-bold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90"
            >
              Free Consultation
            </a>
          </div>
        </motion.header>

        {/*
          Previous balanced design — equal flanks, matching hierarchy.
          Left: Why Dazet · Right: Covington CTA
        */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden sm:block"
          style={scrollMotion ? { opacity: captionOpacity } : undefined}
        >
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(260px,400px)_minmax(0,1fr)] items-end gap-6 px-8 pb-[11vh] lg:gap-10 lg:px-12 lg:pb-[10vh]">
            {/* LEFT */}
            <div
              className="anim-fade-up pointer-events-auto w-full max-w-[300px] justify-self-end text-right"
              style={{ animationDelay: '1250ms' }}
            >
              <p className="font-cinzel text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#B5935A]">
                Why Dazet
              </p>
              <p className="mt-3 font-cinzel text-[1.7rem] font-bold leading-[1.2] text-[#121820] lg:text-[1.9rem]">
                Trial-tested counsel<br />
                you can reach.
              </p>
              <p className="mt-3 font-lora text-[1rem] leading-relaxed text-[#5A6270] lg:text-[1.05rem]">
                Injury · Estate · Business · Family ·
                Notary — no case managers, just
                Chelsea.
              </p>
              <div className="mt-5 ml-auto h-px w-14 bg-[#B5935A]/55" aria-hidden />
            </div>

            {/* CENTER gutter under portrait */}
            <div aria-hidden className="min-h-[1px]" />

            {/* RIGHT */}
            <div
              className="anim-fade-up pointer-events-auto w-full max-w-[300px] justify-self-start text-left"
              style={{ animationDelay: '1400ms' }}
            >
              <p className="font-cinzel text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#B5935A]">
                Covington &amp; Mandeville
              </p>
              <p className="mt-3 font-cinzel text-[1.7rem] font-bold leading-[1.2] text-[#121820] lg:text-[1.9rem]">
                Personal counsel.<br />
                Real protection.
              </p>
              <p className="mt-3 font-lora text-[1rem] leading-relaxed text-[#5A6270] lg:text-[1.05rem]">
                10+ years in Louisiana courts · direct
                1-on-1 representation.
              </p>
              <div className="mt-5 flex flex-col items-start gap-2.5">
                <a
                  href="#contact"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-sm bg-[#B5935A] px-6 py-3 font-cinzel text-[0.8rem] font-bold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90"
                >
                  Free Consultation
                </a>
                <a
                  href="tel:985-249-6475"
                  className="inline-flex items-center gap-2 font-cinzel text-[1rem] font-bold tracking-wide text-[#121820] transition-opacity duration-300 hover:opacity-60"
                >
                  <Phone className="text-[#B5935A]" size={17} strokeWidth={1.75} />
                  985-249-6475
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile caption under figure */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:hidden"
          style={scrollMotion ? { opacity: captionOpacity } : undefined}
        >
          <div
            className="anim-fade-up flex flex-col items-center gap-2.5 text-center"
            style={{ animationDelay: '1300ms' }}
          >
            <p className="font-cinzel text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#B5935A]">
              Covington &amp; Mandeville
            </p>
            <p className="font-cinzel text-[1.35rem] font-bold leading-snug text-[#121820] xs:text-2xl">
              Personal counsel.<br />Real protection.
            </p>
            <p className="max-w-[280px] font-lora text-[0.88rem] leading-snug text-[#5A6270]">
              10+ years · 1-on-1 with Chelsea
            </p>
            <div className="mt-1 flex w-full max-w-sm flex-col items-stretch gap-2.5 px-2">
              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-[#B5935A] px-6 py-3 font-cinzel text-[0.8rem] font-bold uppercase tracking-wide text-white"
              >
                Free Consultation
              </a>
              <a
                href="tel:985-249-6475"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 font-cinzel text-base font-bold text-[#121820]"
              >
                <Phone className="text-[#B5935A]" size={18} strokeWidth={1.75} />
                985-249-6475
              </a>
            </div>
          </div>
        </motion.div>

        {/* ——— Mobile menu control ——— */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="anim-fade-up absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex h-12 w-12 items-center justify-center sm:hidden"
          style={{ animationDelay: '900ms' }}
        >
          <span className="relative h-4 w-6">
            <span
              className="absolute left-0 top-0 h-px w-full bg-[#121820] transition-all duration-500"
              style={{
                transitionTimingFunction: drawerEase,
                transform: menuOpen
                  ? 'translateY(7.5px) rotate(45deg)'
                  : 'translateY(0) rotate(0deg)',
              }}
            />
            <span
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#121820] transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="absolute bottom-0 left-0 h-px w-full bg-[#121820] transition-all duration-500"
              style={{
                transitionTimingFunction: drawerEase,
                transform: menuOpen
                  ? 'translateY(-7.5px) rotate(-45deg)'
                  : 'translateY(0) rotate(0deg)',
              }}
            />
          </span>
        </button>

        {/* ——— Mobile drawer ——— */}
        <div className="sm:hidden" aria-hidden={!menuOpen}>
          <div
            className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
              menuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className={`fixed inset-y-0 right-0 z-40 w-[min(86vw,22rem)] bg-[#141414] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] transition-transform duration-[600ms] ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transitionTimingFunction: drawerEase }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center text-cream transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? '300ms' : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              }}
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <div className="mt-12 flex flex-col gap-10">
              <div>
                <p
                  className="mb-5 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '250ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  Site Index
                </p>
                <nav className="flex flex-col gap-1">
                  {NAV.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex min-h-[48px] items-center font-cinzel text-[1.75rem] text-cream transition-all duration-500"
                      style={{
                        transitionDelay: menuOpen ? `${300 + i * 80}ms` : '0ms',
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen
                          ? 'translateY(0)'
                          : 'translateY(1.5rem)',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p
                  className="mb-4 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '500ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  Find Me
                </p>
                <nav className="flex flex-col gap-1">
                  {CONNECT.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex min-h-[44px] items-center text-base text-cream transition-all duration-500"
                      style={{
                        transitionDelay: menuOpen ? `${550 + i * 60}ms` : '0ms',
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen
                          ? 'translateY(0)'
                          : 'translateY(1rem)',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <a
                  href="tel:985-249-6475"
                  className="mt-6 flex min-h-[48px] items-center justify-center rounded-sm bg-[#B5935A] px-4 font-cinzel text-sm font-bold uppercase tracking-wide text-white transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '700ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Free Consultation
                </a>
              </div>
            </div>
          </aside>
        </div>

        <h1 className="sr-only">
          Personal Injury? Personal Problem? Get Personal Representation. —
          Chelsea Dazet, Attorney at Law in Covington &amp; Mandeville, LA
        </h1>
      </div>
    </section>
  )
}
