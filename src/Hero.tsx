import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { X } from 'lucide-react'

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

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const portraitScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.08, 0.94])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0vh', '-6vh'])
  const portraitRotateX = useTransform(scrollYProgress, [0, 1], [0, 5])
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.7, 0.3])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const chromeOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.4])

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
      className="relative h-[150vh] w-full bg-[#0a0a0a]"
    >
      {/* Sticky full-viewport composition */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* BG z-0 */}
        <motion.div
          className="anim-fade-in absolute inset-0 z-0 bg-[#0a0a0a]"
          style={scrollMotion ? { y: bgY } : undefined}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(181,147,90,0.14)_0%,transparent_70%)]" />
        </motion.div>

        {/* Marquee z-10 */}
        <motion.div
          className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]"
          style={{
            animationDelay: '500ms',
            ...(scrollMotion ? { opacity: marqueeOpacity } : {}),
          }}
        >
          <div className="dh-marquee-track flex w-max whitespace-nowrap font-cinzel text-[16vh] font-bold leading-none text-cream sm:text-[26vh]">
            <span className="pr-[6vw]">Chelsea&nbsp;&mdash;&nbsp;Dazet&nbsp;</span>
            <span className="pr-[6vw]">Chelsea&nbsp;&mdash;&nbsp;Dazet&nbsp;</span>
          </div>
        </motion.div>

        {/* Cream rule z-10 */}
        <div
          className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 origin-left bg-cream sm:inset-x-10 sm:bottom-28"
          aria-hidden
        />

        {/* Desktop footer z-10 (behind portrait) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between px-6 pb-5 font-lora text-xs leading-relaxed text-cream sm:flex sm:px-10 sm:pb-8 sm:text-sm"
          style={scrollMotion ? { opacity: chromeOpacity } : undefined}
        >
          <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
            <p>Personal counsel.</p>
            <p>Real protection.</p>
            <p>10+ years · Louisiana courts</p>
          </div>
          <div
            className="anim-fade-up text-right"
            style={{ animationDelay: '1550ms' }}
          >
            <p>Covington &amp; Mandeville</p>
            <p>
              <a href="#contact" className="text-cream transition-opacity duration-300 hover:opacity-60">
                Free Consultation
              </a>
              {' · '}
              <a href="tel:985-249-6475" className="text-cream transition-opacity duration-300 hover:opacity-60">
                985-249-6475
              </a>
            </p>
          </div>
        </motion.div>

        {/* Portrait z-20 — centered, scroll-scrubbed */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center"
          style={{ perspective: 1200 }}
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
              className="h-full max-h-[100dvh] w-auto max-w-[min(90vw,680px)] object-contain object-[center_20%] drop-shadow-[0_28px_40px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </div>

        {/* Header chrome z-30 */}
        <motion.header
          className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8"
          style={scrollMotion ? { opacity: chromeOpacity } : undefined}
        >
          <a
            href="#home"
            className="anim-fade-up font-cinzel text-lg font-bold tracking-wide text-cream"
            style={{ animationDelay: '800ms' }}
          >
            Dazet Law
          </a>

          <div className="hidden items-start gap-16 sm:flex lg:gap-24">
            <span
              className="anim-fade-up font-cinzel text-sm text-cream"
              style={{ animationDelay: '900ms' }}
            >
              2026
            </span>

            <nav className="flex flex-col gap-0.5 text-sm font-lora" aria-label="Primary">
              {NAV.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
                  style={{ animationDelay: `${1000 + i * 80}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-0.5 text-sm font-lora" aria-label="Connect">
              {CONNECT.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="anim-fade-up text-cream transition-opacity duration-300 hover:opacity-60"
                  style={{ animationDelay: `${1150 + i * 80}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.header>

        {/* Mobile footer z-30 */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-lora text-xs leading-relaxed text-cream sm:hidden"
          style={scrollMotion ? { opacity: chromeOpacity } : undefined}
        >
          <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
            <p>Personal counsel.</p>
            <p>Real protection.</p>
            <p>10+ years · Louisiana courts</p>
          </div>
          <div
            className="anim-fade-up text-right"
            style={{ animationDelay: '1550ms' }}
          >
            <p>Covington &amp; Mandeville</p>
            <p>
              <a href="tel:985-249-6475" className="text-cream">
                985-249-6475
              </a>
            </p>
          </div>
        </motion.div>

        {/* Hamburger z-50 */}
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
              className="absolute left-0 top-0 h-px w-full bg-cream transition-all duration-500"
              style={{
                transitionTimingFunction: drawerEase,
                transform: menuOpen
                  ? 'translateY(7.5px) rotate(45deg)'
                  : 'translateY(0) rotate(0deg)',
              }}
            />
            <span
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cream transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="absolute bottom-0 left-0 h-px w-full bg-cream transition-all duration-500"
              style={{
                transitionTimingFunction: drawerEase,
                transform: menuOpen
                  ? 'translateY(-7.5px) rotate(-45deg)'
                  : 'translateY(0) rotate(0deg)',
              }}
            />
          </span>
        </button>

        {/* Mobile drawer z-40 */}
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
                      className="font-cinzel text-3xl text-cream transition-all duration-500 sm:text-4xl"
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

        {/* SEO headline */}
        <h1 className="sr-only">
          Personal Injury? Personal Problem? Get Personal Representation. —
          Chelsea Dazet, Attorney at Law in Covington &amp; Mandeville, LA
        </h1>
      </div>
    </section>
  )
}
