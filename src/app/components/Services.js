'use client'
import { useEffect, useRef } from 'react'
import '../styles/Services.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   შეცვალე სერვისები აქ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const services = [
  {
    id: '01',
    icon: '◈',
    title: 'კონსულტაცია',
    desc: 'პროფესიონალური კონსულტაცია თქვენი ბიზნესის საჭიროებებზე - სწრაფად და ეფექტურად.',
    tags: ['ანალიზი', 'სტრატეგია', 'გეგმა'],
  },
  {
    id: '02',
    icon: '◎',
    title: 'დიზაინი',
    desc: 'თანამედროვე და მიმზიდველი ვიზუალური გადაწყვეტილებები თქვენი ბრენდისთვის.',
    tags: ['UI/UX', 'ბრენდინგი', 'გრაფიკა'],
  },
  {
    id: '03',
    icon: '◇',
    title: 'განვითარება',
    desc: 'სრულფასოვანი ტექნიკური განვითარება - სწრაფი, სტაბილური და მასშტაბური.',
    tags: ['Web', 'Mobile', 'API'],
  },
  {
    id: '04',
    icon: '○',
    title: 'მხარდაჭერა',
    desc: '24/7 ტექნიკური მხარდაჭერა და მოვლა - ყოველთვის მზად ვართ დასახმარებლად.',
    tags: ['24/7', 'მოვლა', 'განახლება'],
  },
]

function ServiceCard({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('srv-card--visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="srv-card"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="srv-card-shine" />

      {/* top row */}
      <div className="srv-card-top">
        <span className="srv-card-index">{item.id}</span>
        <span className="srv-card-icon">{item.icon}</span>
      </div>

      {/* content */}
      <h3 className="srv-card-title">{item.title}</h3>
      <p className="srv-card-desc">{item.desc}</p>

      {/* tags */}
      <div className="srv-card-tags">
        {item.tags.map(tag => (
          <span key={tag} className="srv-tag">{tag}</span>
        ))}
      </div>

      {/* hover arrow */}
      <div className="srv-card-arrow">→</div>
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('srv-head--visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="srv-outer" id="services" aria-label="სერვისები">

      {/* bg accent */}
      <div className="srv-bg-glow" aria-hidden="true" />

      {/* heading */}
      <div className="srv-head" ref={headRef}>
        <p className="srv-eyebrow">
          <span className="srv-eyebrow-line" />
          სერვისები{/* შეცვალე */}
          <span className="srv-eyebrow-line srv-eyebrow-line--r" />
        </p>
        <h2 className="srv-title">
          რას გთავაზობთ{/* შეცვალე */}
          <br />
          <span className="srv-title-grad">თქვენთვის</span>{/* შეცვალე */}
        </h2>
      </div>

      {/* cards */}
      <div className="srv-grid">
        {services.map((item, i) => (
          <ServiceCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </section>
  )
}