'use client'
import { useEffect, useRef } from 'react'
import '../styles/Hero.css'

const glow = '/glow.png'

export default function Hero() {
  const particlesRef = useRef(null)

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      dx: (Math.random() - 0.5) * 0.2,
      dy: -Math.random() * 0.25 - 0.05,
      alpha: Math.random() * 0.15 + 0.03, // ძალიან subtle
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74,222,128,${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W }
        if (p.x < -5) p.x = W + 5
        if (p.x > W + 5) p.x = -5
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="hero-outer" id="home" aria-label="მთავარი სექცია">

      <canvas ref={particlesRef} className="hero-canvas" aria-hidden="true" />
      <img src={glow} alt="" className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-radial" aria-hidden="true" />

      {/* ── Badge LEFT ── */}
      <div className="hero-badge hero-badge--left" aria-hidden="true">
        <span className="hero-badge-icon">★</span>
        <div>
          <p className="hero-badge-val">5.0</p>
          <p className="hero-badge-lbl">შეფასება</p>
        </div>
      </div>

      {/* ── Badge RIGHT ── */}
      <div className="hero-badge hero-badge--right" aria-hidden="true">
        <span className="hero-badge-icon">✦</span>
        <div>
          <p className="hero-badge-val">200+</p>{/* შეცვალე */}
          <p className="hero-badge-lbl">კმაყოფილი კლიენტი</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="hero-content">

        <p className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          პროფესიონალური სერვისი{/* შეცვალე */}
          <span className="hero-eyebrow-line hero-eyebrow-line--r" />
        </p>

        <h1 className="hero-title">
          თქვენი ბიზნესი{/* შეცვალე */}
          <br />
          <span className="hero-title-grad">ახალ დონეზე</span>{/* შეცვალე */}
        </h1>

        <p className="hero-subtitle">
          {/* შეცვალე */}
          პროფესიონალური გადაწყვეტილებები თქვენი ბიზნესისთვის —
          სწრაფად, საიმედოდ, შედეგზე ორიენტირებულად.
        </p>

        <div className="hero-btns">
          {/* შეცვალე ტელეფონის ნომერი */}
          <a href="tel:+995500000000" className="hero-btn-primary">
            დაგვირეკეთ
          </a>
          {/* შეცვალე WhatsApp ნომერი */}
          <a
            href="https://wa.me/995500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-secondary"
          >
            მოგვწერეთ
          </a>
        </div>

      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <p className="hero-scroll-lbl">scroll</p>
      </div>

      <div className="hero-fade" aria-hidden="true" />

    </section>
  )
}