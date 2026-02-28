'use client'
import { useEffect, useRef, useState } from 'react'
import '../styles/About.css'

const values = [
  {
    id: '01',
    icon: '◈',
    title: 'ხარისხი',                                                             /* შეცვალე */
    desc:  'ყოველ პროექტს ვუდგებით მაქსიმალური პასუხისმგებლობით და სიზუსტით.', /* შეცვალე */
  },
  {
    id: '02',
    icon: '◎',
    title: 'სისწრაფე',                                                            /* შეცვალე */
    desc:  'ვასრულებთ პროექტებს ვადებში - ყოველგვარი დაგვიანების გარეშე.',      /* შეცვალე */
  },
  {
    id: '03',
    icon: '◇',
    title: 'გამჭვირვალობა',                                                       /* შეცვალე */
    desc:  'კლიენტი ყოველ ეტაპზე ინფორმირებულია პროცესის შესახებ.',            /* შეცვალე */
  },
]

/* ── Counter config: end number + suffix ── */
const stats = [
  { end: 200, suffix: '+', label: 'კმაყოფილი კლიენტი' }, /* შეცვალე */
  { end: 5,   suffix: '+', label: 'წლიანი გამოცდილება' }, /* შეცვალე */
  { end: 98,  suffix: '%', label: 'დროული მიწოდება' },    /* შეცვალე */
]

/* ── Animated counter hook ── */
function useCounter(end, duration = 1800, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])
  return count
}

function StatItem({ stat, started }) {
  const count = useCounter(stat.end, 1800, started)
  return (
    <div className="abt-stat">
      <p className="abt-stat-val">
        {count}{stat.suffix}
      </p>
      <p className="abt-stat-lbl">{stat.label}</p>
    </div>
  )
}

function ValueCard({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('abt-card--visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="abt-card"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="abt-card-shine" />
      <div className="abt-card-top">
        <span className="abt-card-index">{item.id}</span>
        <span className="abt-card-icon">{item.icon}</span>
      </div>
      <h3 className="abt-card-title">{item.title}</h3>
      <p className="abt-card-desc">{item.desc}</p>
    </div>
  )
}

export default function About() {
  const headRef = useRef(null)
  const statsRef = useRef(null)
  const [counterStarted, setCounterStarted] = useState(false)

  /* head fade-up */
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('abt-head--visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* counter trigger — 600ms delay so it doesn't fire on page load */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    let timeout
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        timeout = setTimeout(() => {
          setCounterStarted(true)
          obs.disconnect()
        }, 600)
      } else {
        clearTimeout(timeout)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(timeout) }
  }, [])

  return (
    <section className="abt-outer" id="about" aria-label="ჩვენს შესახებ">

      {/* ── Header ── */}
      <div className="abt-head" ref={headRef}>
        <p className="abt-eyebrow">
          <span className="abt-eyebrow-line" />
          ჩვენს შესახებ{/* შეცვალე */}
          <span className="abt-eyebrow-line abt-eyebrow-line--r" />
        </p>

        <h2 className="abt-title">
          ვინ ვართ და{/* შეცვალე */}
          <br />
          <span className="abt-title-grad">რას ვაკეთებთ</span>{/* შეცვალე */}
        </h2>

        <p className="abt-desc">
          {/* შეცვალე */}
          ჩვენ ვართ პროფესიონალური გუნდი, რომელიც გთავაზობთ მაღალი
          ხარისხის სერვისებს. წლების გამოცდილებით ჩამოყალიბებული
          პრინციპები გვეხმარება კლიენტების მოლოდინების გადაჭარბებაში.
        </p>

        {/* Stats row — counter starts on scroll */}
        <div className="abt-stats" ref={statsRef}>
          {stats.map(s => (
            <StatItem key={s.label} stat={s} started={counterStarted} />
          ))}
        </div>
      </div>

      {/* ── Value cards ── */}
      <div className="abt-grid">
        {values.map((item, i) => (
          <ValueCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </section>
  )
}