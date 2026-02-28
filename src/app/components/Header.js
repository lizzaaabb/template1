'use client'
import React, { useState } from 'react'
import '../styles/Header.css'

const Logo = '/logo.png' /* შეცვალე */

const navLinks = [
  { label: 'მთავარი',      href: '#home' },
  { label: 'ჩვენს შესახებ', href: '#about' },
  { label: 'სერვისები',    href: '#services' },
  { label: 'კონტაქტი',    href: '#contact' },
]

const PHONE    = 'tel:+995500000000'     /* შეცვალე */
const PHONE_LBL = '+995 500 00 00 00'   /* შეცვალე */

function handleScroll(e, href) {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (e, href) => {
    handleScroll(e, href)
    setMenuOpen(false)
  }

  return (
    <header className="hdr-outer" role="banner">
      <nav className="hdr-inner" aria-label="მთავარი ნავიგაცია">

        {/* Logo */}
        <a
          href="#home"
          className="hdr-logo-wrap"
          onClick={e => handleScroll(e, '#home')}
          aria-label="მთავარ გვერდზე გადასვლა"
        >
          <img
            src={Logo}
            alt="ლოგო"
            className="hdr-logo"
            width="72"
            height="72"
            loading="eager"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hdr-nav" role="list">
          {navLinks.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="hdr-nav-link"
                onClick={e => handleScroll(e, link.href)}
              >
                {link.label}
              </a>
              {i < navLinks.length - 1 && (
                <span className="hdr-nav-divider" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href={PHONE} className="hdr-cta" aria-label={`დაგვიკავშირდი - ${PHONE_LBL}`}>
          დაგვიკავშირდი
        </a>

        {/* Hamburger */}
        <button
          className="hdr-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
          <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
          <span className={`hdr-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`hdr-mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="hdr-drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="მენიუს დახურვა"
        >
          ✕
        </button>

        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="hdr-mobile-link"
            onClick={e => handleNav(e, link.href)}
          >
            {link.label}
          </a>
        ))}

        <a
          href={PHONE}
          className="hdr-mobile-cta"
          onClick={() => setMenuOpen(false)}
          aria-label={`დაგვიკავშირდი - ${PHONE_LBL}`}
        >
          დაგვიკავშირდი
        </a>
      </div>
    </header>
  )
}