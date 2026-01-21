import Link from 'next/link';
import { Sparkles, Search, User, Home, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      {/* Top Bar - Desktop & Mobile */}
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

            {/* Mobile Account Icon (Simplified) */}
            <div className="flex md:hidden">
              <Link href="/connexion" className="p-2 text-black">
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Home size={22} className="text-black" />
          <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
        </Link>
        <Link href="/recherche" className="flex flex-col items-center gap-1">
          <Search size={22} className="text-gray-400" />
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Search</span>
        </Link>
        <Link href="/pro" className="flex flex-col items-center gap-1 relative -top-4">
          <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-2xl rotate-45 border-4 border-white">
            <Sparkles size={24} className="text-amber-400 -rotate-45" />
          </div>
        </Link>
        <Link href="/recherche?type=all" className="flex flex-col items-center gap-1">
          <LayoutGrid size={22} className="text-gray-400" />
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Styles</span>
        </Link>
        <Link href="/connexion" className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
            <img src="https://i.pravatar.cc/100" alt="profile" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Moi</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
