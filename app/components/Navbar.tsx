'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Search, User, Menu, X, ArrowRight } from 'lucide-react';

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
      {/* Top Bar - Desktop & Mobile */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 relative z-[102]">
              <Link href="/" className="text-2xl font-black tracking-tighter text-black flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <span className="bg-black text-white px-2 py-0.5 rounded italic">D</span>
                DREADMO
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link href="/recherche" className="text-sm font-black tracking-widest uppercase text-gray-400 hover:text-black transition-all">
                Explorer
              </Link>
              <Link href="/pro" className="group text-sm font-black tracking-widest uppercase text-gray-400 hover:text-black transition-all flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
                Pro
              </Link>

              <div className="h-4 w-px bg-gray-200"></div>

              <div className="flex items-center gap-6">
                <Link
                  href="/pro/dashboard"
                  className="text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-black"
                >
                  Démo Salon
                </Link>
                <Link
                  href="/client/dashboard"
                  className="text-[10px] font-black tracking-widest uppercase text-gray-400 hover:text-black"
                >
                  Démo Client
                </Link>
              </div>

              <Link
                href="/connexion"
                className="bg-black text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 hover:scale-105 transition-all shadow-xl shadow-gray-200"
              >
                Connexion
              </Link>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className="flex md:hidden z-[102]">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
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
        className={`fixed inset-0 bg-white z-[101] md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-10">
          {/* Main Links */}
          <div className="flex flex-col gap-6">
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
                className={`text-4xl font-black tracking-tighter uppercase flex items-center justify-between group ${link.special ? 'text-black' : 'text-gray-900'
                  }`}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.special && <Sparkles className="text-amber-400" size={24} />}
                </span>
                <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={24} />
              </Link>
            ))}
          </div>

          <div className="h-px w-full bg-gray-100 my-8"></div>

          {/* Secondary Links */}
          <div className="flex flex-col gap-4">
            <Link
              href="/connexion"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold text-gray-500 hover:text-black transition-colors"
            >
              Connexion / Inscription
            </Link>
            <div className="flex gap-4 mt-2">
              <Link
                href="/pro/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-4 py-2 rounded-lg"
              >
                Démo Salon
              </Link>
              <Link
                href="/client/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-black uppercase tracking-widest text-gray-500 bg-gray-50 px-4 py-2 rounded-lg"
              >
                Démo Client
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-auto">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
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
