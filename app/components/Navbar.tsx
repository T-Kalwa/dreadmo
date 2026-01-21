import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tighter text-black flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded italic">D</span>
              DREADMO
            </Link>
          </div>

          {/* Navigation Links */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;