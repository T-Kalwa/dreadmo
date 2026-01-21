import { MapPin, Users, Award } from 'lucide-react';

const ConceptBanner = () => {
    return (
        <section className="py-20 bg-black text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-amber-500 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-white rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-400 mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-amber-400"></span> Notre Mission
                        </h2>
                        <p className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic mb-10">
                            DREADMO RÉUNIT L'ÉLITE DU STYLE : DES <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">SALONS DE PRESTIGE</span> ET DES <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">STYLISTES INDÉPENDANTS</span> VÉRIFIÉS.
                        </p>
                        <p className="text-xl text-gray-400 font-medium max-w-3xl leading-relaxed italic">
                            Notre objectif est simple : centraliser tout le savoir-faire montréalais sur une seule plateforme pour que chaque texture de cheveux trouve son maître. Que vous cherchiez le confort d'un grand salon ou l'intimité d'un expert freelance, l'excellence est notre seul critère.
                        </p>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                        {[
                            { icon: <MapPin size={20} />, title: "100% Montréal", desc: "Le meilleur de la métropole." },
                            { icon: <Users size={20} />, title: "Mixte Experts", desc: "Salons & Freelances." },
                            { icon: <Award size={20} />, title: "Qualité Certifiée", desc: "Vérifiés par nos soins." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">{item.title}</h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConceptBanner;
