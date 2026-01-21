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
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none italic">
              L'ÉLITE <br />
              <span className="text-gray-300">LOCALE.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium italic italic">Sélectionnés avec soin pour leur maîtrise technique et artistique.</p>
          </div>
          <Link
            href="/recherche"
            className="flex items-center gap-3 text-black font-black uppercase text-xs tracking-[0.2em] hover:gap-5 transition-all group"
          >
            Explorer tout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {salons.map((salon, index) => (
            <Link
              key={salon.id}
              href={`/salon/${salon.id}`}
              className="group"
              style={{
                animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.15}s forwards`,
                opacity: 0
              }}
            >
              <div className="relative h-[450px] w-full overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 border border-gray-100">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />

                {/* Elite Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>

                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-black/40 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      {salon.type === 'freelance' ? 'Elite Freelance' : 'Maison de Style'}
                    </span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-amber-400 text-black px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                    <Star className="fill-black" size={14} />
                    <span className="font-black text-sm tracking-tighter italic">{salon.rating}</span>
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                  <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                      <MapPin size={12} className="text-amber-400" />
                      {salon.district}
                    </p>
                    <h3 className="text-3xl font-black text-white mb-6 leading-none tracking-tight">
                      {salon.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                      {salon.specialties?.slice(0, 2).map((spec: string, idx: number) => (
                        <span key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalonsFeatured;