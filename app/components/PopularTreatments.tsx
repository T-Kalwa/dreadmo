'use client';

import { useRouter } from 'next/navigation';
import { Scissors, Zap, Heart, Star, Clock, ChevronRight } from 'lucide-react';

const treatments = [
    { id: 'srv-7', name: 'Knotless Braids', category: 'Tresses', price: '200$', duration: '6h', icon: <Scissors className="text-purple-500" /> },
    { id: 'srv-2', name: 'Box Braids', category: 'Tresses', price: '150$', duration: '4h', icon: <Zap className="text-blue-500" /> },
    { id: 'srv-1', name: 'Coupe + Styling', category: 'Coupe', price: '75$', duration: '1h30', icon: <Star className="text-yellow-500" /> },
    { id: 'srv-12', name: 'Starter Locs', category: 'Locs', price: '110$', duration: '2h30', icon: <Heart className="text-pink-500" /> },
    { id: 'srv-3', name: 'Soin Hydratant', category: 'Soin', price: '55$', duration: '1h', icon: <Scissors className="text-teal-500" /> },
    { id: 'srv-9', name: 'Coloration', category: 'Couleur', price: '120$', duration: '3h', icon: <Zap className="text-orange-500" /> },
    { id: 'srv-8', name: 'Twists / Vanilles', category: 'Coiffure', price: '85$', duration: '2h', icon: <Star className="text-indigo-500" /> },
    { id: 'srv-6', name: 'Tresses Fulani', category: 'Tresses', price: '180$', duration: '5h', icon: <Heart className="text-red-500" /> },
    { id: 'srv-4', name: 'Wash & Go', category: 'Soin', price: '45$', duration: '0h45', icon: <Scissors className="text-green-500" /> },
    { id: 'srv-10', name: 'Balayage', category: 'Couleur', price: '140$', duration: '3h30', icon: <Zap className="text-amber-500" /> },
];

const PopularTreatments = () => {
    const router = useRouter();

    const handleServiceClick = (name: string) => {
        router.push(`/recherche?q=${encodeURIComponent(name.toLowerCase())}`);
    };

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none italic uppercase">
                            RÉSERVEZ <br />
                            <span className="text-gray-300">L'INSTANT.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-medium italic">Les prestations signature les plus prisées par notre communauté.</p>
                    </div>
                    <button
                        onClick={() => router.push('/recherche')}
                        className="flex items-center gap-3 text-black font-black uppercase text-xs tracking-[0.2em] hover:gap-5 transition-all group"
                    >
                        Tous les services <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {treatments.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleServiceClick(item.name)}
                            className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 text-left flex flex-col h-full overflow-hidden relative"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-all duration-500 shadow-xl group-hover:bg-amber-400 group-hover:text-black">
                                {item.icon}
                            </div>

                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{item.category}</p>
                            <h3 className="text-xl font-black text-gray-900 mb-6 leading-none tracking-tight group-hover:text-black">{item.name}</h3>

                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-lg font-black text-black tracking-tighter italic">{item.price}</span>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                    <Clock size={12} className="text-amber-400" />
                                    {item.duration}
                                </div>
                            </div>

                            {/* Hover Accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTreatments;
