'use client';

import { useRouter } from 'next/navigation';
import { AlignJustify, Waves, Wind, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Lisses',
    desc: 'Texture 1A - 1C',
    icon: <AlignJustify className="transform rotate-90" size={20} />,
    image: '/type-1.png',
    gradient: 'from-gray-900/40 to-black/60'
  },
  {
    id: '2',
    name: 'Ondulés',
    desc: 'Texture 2A - 2C',
    icon: <Waves size={20} />,
    image: '/type-2.png',
    gradient: 'from-gray-900/40 to-black/60'
  },
  {
    id: '3',
    name: 'Bouclés',
    desc: 'Texture 3A - 3C',
    icon: <Wind size={20} />,
    image: '/type-3.png',
    gradient: 'from-gray-900/40 to-black/60'
  },
  {
    id: '4',
    name: 'Crépus',
    desc: 'Texture 4A - 4C',
    icon: <Sparkles size={20} />,
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=800',
    gradient: 'from-amber-900/40 to-black/60'
  },
];

const HairCategories = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/recherche?type=${categoryName.toLowerCase()}`);
  };

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6 tracking-tighter leading-none italic uppercase">
              À CHAQUE TEXTURE <br />
              <span className="text-gray-400">SON EXPERTISE.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium italic">
              Trouvez des experts qui maîtrisent l'art de sublimer votre nature.
            </p>
          </div>
          <button
            onClick={() => router.push('/blog/types-de-cheveux')}
            className="group flex items-center gap-2 text-black font-black uppercase text-[10px] md:text-xs tracking-widest hover:gap-4 transition-all"
          >
            Guide des textures <ChevronRight size={18} />
          </button>
        </div>

        {/* Categories Grid - 2x2 on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="relative h-[280px] md:h-[500px] w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.15}s forwards`,
                opacity: 0
              }}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-left">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <p className="text-[8px] md:text-xs font-black text-white/50 uppercase tracking-[0.3em] mb-1.5 md:mb-2 italic">
                    {cat.desc}
                  </p>
                  <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Banner - Mobile Optimized */}
        <div className="mt-16 md:mt-24 p-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-[2.5rem] md:rounded-[3rem]">
          <div className="bg-black text-white rounded-[2.3rem] md:rounded-[2.8rem] p-8 md:p-20 relative overflow-hidden group">
            {/* Animated Circles */}
            <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] group-hover:bg-white/10 transition-colors duration-1000"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight italic uppercase tracking-tighter">
                  Le doute n'est plus <br className="hidden md:block" /> une option.
                </h3>
                <p className="text-gray-400 text-sm md:text-lg mb-8 font-medium max-w-lg mx-auto lg:mx-0 italic">
                  Identifier correctement votre type de cheveux est la première étape vers des soins d'exception.
                </p>
                <button className="w-full md:w-auto bg-white text-black px-8 md:px-10 py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                  Diagnostic Rapide
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 text-center">
                  <p className="text-2xl md:text-4xl font-black mb-1 italic">150+</p>
                  <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Experts</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 text-center">
                  <p className="text-2xl md:text-4xl font-black mb-1 italic">4.9/5</p>
                  <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Avis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairCategories;
