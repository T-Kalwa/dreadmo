'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Sparkles, Wind, Waves, AlignJustify, Scissors, Heart, ArrowRight } from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const [hairType, setHairType] = useState('');
  const [location, setLocation] = useState('');
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (hairType) params.append('type', hairType);
    if (location) params.append('location', location);
    router.push(`/recherche?${params.toString()}`);
  };

  const popularSearches = [
    { label: "Cheveux Crépus 4C", type: "4C", icon: <Sparkles size={14} /> },
    { label: "Tresses", type: "tresses", icon: <Scissors size={14} /> },
    { label: "Locs", type: "locs", icon: <Heart size={14} /> },
    { label: "Bouclés 3A-3C", type: "3A", icon: <Wind size={14} /> }
  ];

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-24 pb-16 px-4 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-[-5%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-amber-200/40 rounded-full blur-[100px] md:blur-[120px]"
          style={{ transform: `translateY(${scrolled * 0.2}px)` }}
        ></div>
        <div
          className="absolute bottom-[-5%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gray-100 rounded-full blur-[80px] md:blur-[100px]"
          style={{ transform: `translateY(${scrolled * -0.1}px)` }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8 md:space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-md border border-black/5 px-4 py-2 rounded-full animate-fade-in mx-auto lg:mx-0">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black/60">
              L'excellence à Montréal
            </span>
          </div>

          <h1 className="text-5xl md:text-9xl font-black text-gray-900 leading-[0.9] md:leading-[0.85] tracking-tighter">
            SUBLIMEZ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-amber-600">
              VOTRE NATURE.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium italic">
            L'écosystème montréalais qui regroupe l'élite des salons et des stylistes freelances. Trouvez l'expert qui maîtrise enfin votre texture unique.
          </p>

          {/* Search Bar - Luxury Glass */}
          <div className="relative group max-w-2xl mx-auto lg:mx-0 w-full px-2 md:px-0">
            <form
              onSubmit={handleSearch}
              className="bg-white border border-gray-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-3xl md:rounded-[2.5rem] p-2 md:p-4 flex flex-col md:flex-row items-center gap-1 md:gap-2"
            >
              <div className="flex-1 w-full relative group/input p-3 md:p-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-black transition-colors" size={18} />
                <input
                  type="text"
                  value={hairType}
                  onChange={(e) => setHairType(e.target.value)}
                  placeholder="Style ou Texture..."
                  className="w-full pl-8 outline-none text-gray-900 font-bold bg-transparent placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-100"></div>
              <div className="flex-1 w-full relative group/input p-3 md:p-4 border-t md:border-t-0 border-gray-50">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-black transition-colors" size={18} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Localisation..."
                  className="w-full pl-8 outline-none text-gray-900 font-bold bg-transparent placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-black text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl active:scale-95 group/btn"
              >
                Chercher
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center lg:justify-start">
            <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest w-full md:w-auto mb-2 md:mb-0">Inspiration :</span>
            {popularSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setHairType(search.type);
                  router.push(`/recherche?type=${search.type}`);
                }}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all transform hover:-translate-y-1"
              >
                {search.icon}
                {search.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Image Composition - Simplified for tablet, hidden on mobile */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[650px] hidden md:block">
          {/* Main Image */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[550px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-20 border-8 border-white"
            style={{ transform: `translate(-50%, calc(-50% + ${scrolled * 0.05}px)) rotate(-1deg)` }}
          >
            <img
              src="/hero-1.png"
              alt="Hair texture"
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Floating Image 1 */}
          <div
            className="absolute top-[5%] left-[-10%] w-[220px] h-[280px] rounded-[3rem] overflow-hidden shadow-2xl z-30 border-4 border-white transform rotate-6 hover:translate-y-[-10px] transition-transform duration-700"
            style={{ transform: `translateY(${scrolled * -0.12}px) rotate(6deg)` }}
          >
            <img
              src="/hero-2.png"
              alt="Braid detail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Image 2 */}
          <div
            className="absolute bottom-[0%] right-[-10%] w-[280px] h-[340px] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-4 border-white transform -rotate-6 hover:translate-y-[-10px] transition-transform duration-700"
            style={{ transform: `translateY(${scrolled * 0.08}px) rotate(-6deg)` }}
          >
            <img
              src="/hero-3.png"
              alt="Salon ambiance"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Experience Badge */}
          <div
            className="absolute bottom-[15%] left-[-20%] bg-black p-8 rounded-[2.5rem] shadow-2xl z-40 border border-white/10 flex items-center gap-6 animate-bounce-slow"
          >
            <div className="flex -space-x-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-2xl font-black text-white tracking-tighter italic">4.9/5</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Avis Elite</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
