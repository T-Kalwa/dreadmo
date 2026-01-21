'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, MapPin, ArrowRight, AlignJustify, Waves, Wind, Sparkles } from 'lucide-react';

const SalonsFeatured = () => {
  const [salons, setSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await fetch('/api/salons');
        const data = await res.json();
        setSalons(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching featured salons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  if (loading) return null; // Or a skeleton
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter leading-none italic uppercase">
              L'ÉLITE <br />
              <span className="text-gray-300">LOCALE.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium italic">Sélectionnés pour leur savoir-faire.</p>
          </div>
          <Link
            href="/recherche"
            className="flex items-center gap-3 text-black font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:gap-5 transition-all group"
          >
            Voir tout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop Container */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-12">
          {salons.map((salon, index) => (
            <SalonCard key={salon.id} salon={salon} index={index} />
          ))}
        </div>

        {/* Mobile Container - Horizontal Scroll */}
        <div className="flex md:hidden gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4">
          {salons.map((salon, index) => (
            <div key={salon.id} className="min-w-[280px] w-[80vw] snap-center">
              <SalonCard salon={salon} index={index} isMobile />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SalonCard = ({ salon, index, isMobile = false }: { salon: any, index: number, isMobile?: boolean }) => (
  <Link
    href={`/salon/${salon.id}`}
    className="group block"
    style={{
      animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.15}s forwards`,
      opacity: 0
    }}
  >
    <div className={`relative ${isMobile ? 'h-[350px]' : 'h-[450px]'} w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-xl md:shadow-2xl transition-all duration-700 hover:scale-[1.02] border border-gray-100`}>
      <img
        src={salon.image}
        alt={salon.name}
        className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
      />

      {/* Elite Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 transition-opacity duration-700"></div>

      {/* Rating Badge */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <div className="bg-amber-400 text-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-1.5 md:gap-2 shadow-xl">
          <Star className="fill-black" size={12} />
          <span className="font-black text-xs md:text-sm tracking-tighter italic">{salon.rating}</span>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-left">
        <div>
          <p className="text-[8px] md:text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1.5 flex items-center gap-1.5">
            <MapPin size={10} className="text-amber-400" />
            {salon.district}
          </p>
          <h3 className="text-xl md:text-3xl font-black text-white mb-4 leading-none tracking-tight italic uppercase">
            {salon.name}
          </h3>

          <div className="flex gap-2">
            {salon.specialties?.slice(0, 1).map((spec: string, idx: number) => (
              <span key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default SalonsFeatured;