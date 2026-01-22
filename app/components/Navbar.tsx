'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className={styles.navFixed}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.logoIcon}>D</span>
                DREADMO
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className={styles.desktopNav}>
              <Link href="/recherche" className={styles.navLink}>
                Explorer
              </Link>
              <Link href="/pro" className={`${styles.navLink} ${styles.navLinkPro} group`}>
                <Sparkles size={14} className={styles.sparkleIcon} />
                Pro
              </Link>

              <div className={styles.divider}></div>

              <div className={styles.demoContainer}>
                <Link
                  href="/pro/dashboard"
                  className={styles.demoLink}
                >
                  Démo Salon
                </Link>
                <Link
                  href="/client/dashboard"
                  className={styles.demoLink}
                >
                  Démo Client
                </Link>
              </div>

              <Link
                href="/connexion"
                className={styles.btnConnexion}
              >
                Connexion
              </Link>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className={styles.mobileMenuBtnContainer}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.menuBtn}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : styles.overlayClosed}`}
      >
        <div className={styles.overlayContent}>
          {/* Main Links */}
          <div className={styles.overlayLinksContainer}>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/recherche', label: 'Explorer' },
              { href: '/recherche?type=all', label: 'Styles' },
              { href: '/pro', label: 'Espace Pro', special: true },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.overlayLink} ${link.special ? styles.overlayLinkSpecial : ''} group`}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.special && <Sparkles className="text-amber-400" size={24} />}
                </span>
                <ArrowRight className={`${styles.arrowIcon}`} size={24} />
              </Link>
            ))}
          </div>

          <div className={styles.overlayDivider}></div>

          {/* Secondary Links */}
          <div className={styles.secondaryLinks}>
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className={styles.secondaryLinkTitle}
            >
              Connexion / Inscription
            </Link>
            <div className={styles.demoButtonsMobile}>
              <Link
                href="/pro/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={styles.demoBtnSalon}
              >
                Démo Salon
              </Link>
              <Link
                href="/client/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={styles.demoBtnClient}
              >
                Démo Client
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className={styles.footerInfo}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Dreadmo MTL<br />
              Beauté Afro & Expertise
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
