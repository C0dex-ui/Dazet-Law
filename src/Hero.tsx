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
      className="relative h-[145vh] w-full bg-cream"
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
          className="anim-fade-up absolute inset-x-0 top-[13vh] z-10 overflow-hidden sm:top-[12vh]"
          style={{
            animationDelay: '500ms',
            ...(scrollMotion ? { opacity: marqueeOpacity } : {}),
          }}
        >
          <div className="dh-marquee-track flex w-max whitespace-nowrap font-cinzel text-[15vh] font-bold leading-none sm:text-[22vh] lg:text-[24vh]">
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
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-20 sm:pb-24"
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
              className="h-full max-h-[calc(100dvh-6.5rem)] w-auto max-w-[min(90vw,680px)] object-contain object-[center_18%] drop-shadow-[0_22px_36px_rgba(18,24,32,0.14)]"
            />
          </motion.div>
        </div>

        {/* ——— Header ——— */}
        <motion.header
          className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-6 px-6 pt-5 sm:px-10 sm:pt-6"
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
                className="h-14 w-auto object-contain sm:h-16 lg:h-[4.25rem]"
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
          Soft caption under the figure — no card, no side panel.
          Reads as a photo credit line that completes the hero.
        */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 px-6 pb-6 sm:pb-8"
          style={scrollMotion ? { opacity: captionOpacity } : undefined}
        >
          <div
            className="anim-fade-up mx-auto flex max-w-2xl flex-col items-center gap-3 text-center sm:gap-3.5"
            style={{ animationDelay: '1300ms' }}
          >
            <p className="font-lora text-[0.9rem] leading-relaxed text-[#4a5260] sm:text-[0.98rem]">
              <span className="font-cinzel text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#B5935A]">
                Chelsea Dazet
              </span>
              <span className="mx-2 text-[#B5935A]/50">·</span>
              <span>Personal counsel for Covington &amp; Mandeville</span>
              <span className="hidden text-[#8a929c] sm:inline">
                {' '}
                · 10+ years · 1-on-1
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-sm bg-[#B5935A] px-6 py-2.5 font-cinzel text-[0.75rem] font-bold uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90"
              >
                Free Consultation
              </a>
              <a
                href="tel:985-249-6475"
                className="inline-flex items-center gap-1.5 font-cinzel text-[0.9rem] font-bold tracking-wide text-[#121820] transition-opacity duration-300 hover:opacity-60"
              >
                <Phone className="text-[#B5935A]" size={15} strokeWidth={1.75} />
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
          className="anim-fade-up absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center sm:hidden"
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
            className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-[600ms] ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transitionTimingFunction: drawerEase }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 text-cream transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? '300ms' : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              }}
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <div className="mt-10 flex flex-col gap-12">
              <div>
                <p
                  className="mb-6 text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? '250ms' : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  Site Index
                </p>
                <nav className="flex flex-col gap-2">
                  {NAV.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="font-cinzel text-3xl text-cream transition-all duration-500"
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
                <nav className="flex flex-wrap gap-x-5 gap-y-2">
                  {CONNECT.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm text-cream transition-all duration-500"
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
