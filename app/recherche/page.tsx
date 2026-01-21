'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Filter, Search as SearchIcon, Star, Briefcase, Home, X, ChevronDown, Loader2, AlignJustify, Waves, Wind, Sparkles, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salons, setSalons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    hairType: initialType !== 'all' ? [initialType] : [] as string[],
    priceRange: 'all',
    availability: 'all',
    type: 'all', // 'all', 'salon', 'freelance'
    district: 'all'
  });

  useEffect(() => {
    const fetchSalons = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/salons');
        const data = await res.json();
        // Since we only have one salon in db for now, we'll use a mocked list if empty
        // but let's try to handle at least 1 real salon.
        setSalons(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Failed to fetch salons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  const filteredSalons = salons.filter(salon => {
    const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filters.hairType.length === 0 ||
      filters.hairType.some(t => salon.category?.toLowerCase().includes(t.toLowerCase()));

    return matchesSearch && matchesType;
  });

  const districts = ["Plateau Mont-Royal", "Rosemont", "Vieux-Port", "Downtown", "Côte-des-Neiges", "Verdun", "Laval"];
  const hairTypes = [
    { name: "Lisses (Type 1)", icon: <AlignJustify className="rotate-90" size={16} /> },
    { name: "Ondulés (Type 2)", icon: <Waves size={16} /> },
    { name: "Bouclés (Type 3)", icon: <Wind size={16} /> },
    { name: "Crépus (Type 4)", icon: <Sparkles size={16} /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20">
      {/* Barre de recherche et filtres */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-[90] shadow-sm backdrop-blur-xl bg-white/70">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Barre de recherche principale */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par expert, salon ou texture..."
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:outline-none focus:border-amber-400 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-inner"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-[2rem] hover:bg-gray-800 transition-all font-black uppercase text-xs tracking-widest shadow-xl"
            >
              <Filter size={18} className="text-amber-400" />
              Filtres Elite
            </button>
          </div>

          {/* Filtres rapides */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['Tous', 'Salons', 'Freelances', 'Mieux notés', 'Disponibilités'].map((label, idx) => (
              <button
                key={idx}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${idx === 0
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Elite Advanced Filters */}
          {showFilters && (
            <div className="mt-8 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Filtres <span className="text-amber-500">Avancés</span></h3>
                <button onClick={() => setShowFilters(false)} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 underline decoration-amber-500/30 underline-offset-8">Texture Capillaire</label>
                  <div className="space-y-3">
                    {hairTypes.map((type) => (
                      <label key={type.name} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 transition-all checked:border-amber-500 checked:bg-amber-500"
                            checked={filters.hairType.includes(type.name)}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...filters.hairType, type.name]
                                : filters.hairType.filter(t => t !== type.name);
                              setFilters({ ...filters, hairType: newTypes });
                            }}
                          />
                          <Check size={14} className="absolute text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-gray-400 group-hover:text-black transition-colors font-bold text-sm tracking-tight">{type.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 underline decoration-amber-500/30 underline-offset-8">Quartier Montréal</label>
                  <div className="relative group">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500 font-bold text-sm tracking-tight shadow-sm cursor-pointer">
                      <option value="all">Tous les secteurs</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 underline decoration-amber-500/30 underline-offset-8">Budget Prestation</label>
                  <div className="relative group">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500 font-bold text-sm tracking-tight shadow-sm cursor-pointer">
                      <option value="all">Tous les prix</option>
                      <option value="0-50">Budget Access</option>
                      <option value="50-100">Premium</option>
                      <option value="100+">Exclusif</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4 pt-10 border-t border-gray-100">
                <button className="px-10 py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                  Appliquer la sélection
                </button>
                <button
                  onClick={() => setFilters({ ...filters, hairType: [], priceRange: 'all', type: 'all' })}
                  className="px-10 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-black hover:text-black transition-all"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic uppercase leading-none mb-4">
              {loading ? 'RECHERCHE...' : `${filteredSalons.length} EXPERTS`} <br />
              <span className="text-gray-300">À MONTRÉAL.</span>
            </h1>
            <p className="text-gray-400 font-medium italic">Sélectionnés pour leur excellence et leur savoir-faire unique.</p>
          </div>
          {!loading && (
            <div className="relative group">
              <select className="appearance-none bg-white border border-gray-100 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-black text-[10px] font-black uppercase tracking-widest cursor-pointer shadow-sm">
                <option>Trier par: Pertinence</option>
                <option>Mieux notés</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-amber-500 mb-6" size={60} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Initialisation de la sélection...</p>
          </div>
        ) : filteredSalons.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-gray-200">
            <SearchIcon className="mx-auto text-gray-200 mb-8" size={80} />
            <h3 className="text-3xl font-black mb-4 tracking-tighter italic uppercase">Aucun résultat trouvé</h3>
            <p className="text-gray-400 font-medium mb-10 max-w-sm mx-auto">Votre quête de perfection continue. Essayez de modifier vos critères.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilters({ ...filters, hairType: [] }) }}
              className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
              RAZ FILTRES
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalons.map((salon) => (
              <Link
                key={salon.id}
                href={`/salon/${salon.id}`}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
              >
                {/* Image Section */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={salon.image || salon.gallery?.[0] || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80'}
                    alt={salon.name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>

                  <div className="absolute top-4 right-4 bg-amber-400 text-black px-3 py-1.5 rounded-xl shadow-xl font-black text-xs flex items-center gap-1.5 italic">
                    <Star className="fill-black" size={12} />
                    {salon.rating || 'ELITE'}
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-black">
                      {salon.category || 'Maison de Style'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                      <MapPin size={10} />
                      {salon.district || salon.city}
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight italic uppercase leading-tight group-hover:text-black transition-colors">
                      {salon.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs font-medium mb-6 italic line-clamp-2">
                    {salon.description || "Expertise authentique et service sur-mesure au cœur de Montréal."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {salon.specialties?.slice(0, 3).map((spec: string, idx: number) => (
                      <span key={idx} className="bg-gray-50 text-gray-400 text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-gray-50 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-500">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">À partir de</span>
                      <span className="text-xl font-black text-gray-900 tracking-tighter italic leading-none">75$</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all duration-500 shadow-xl shadow-gray-100">
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-6">
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            Précédent
          </button>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-xl bg-black text-white font-black text-xs">1</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 font-black text-xs hover:border-black hover:text-black transition-all">2</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 font-black text-xs hover:border-black hover:text-black transition-all">3</button>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;