'use client';

import { useState, useEffect } from 'react';
import {
    Check, TrendingUp, Users, Calendar, CreditCard,
    BarChart3, Star, ArrowRight, Shield, Zap, Sparkles
} from 'lucide-react';

const ProPage = () => {
    const [formData, setFormData] = useState({
        salonName: '',
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        specialties: [] as string[],
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <Zap className="text-amber-400" size={32} />,
            title: "Visibilité Instantanée",
            description: "Votre salon mise en avant auprès de milliers de clients qualifiés à Montréal dès l'ouverture de votre compte.",
            color: "from-amber-500/10 to-transparent"
        },
        {
            icon: <Calendar className="text-blue-400" size={32} />,
            title: "Smart Booking",
            description: "Un assistant de réservation intelligent qui remplit votre agenda selon vos préférences réelles.",
            color: "from-blue-500/10 to-transparent"
        },
        {
            icon: <Shield className="text-emerald-400" size={32} />,
            title: "Paiements Garantie",
            description: "Finissez-en avec les no-shows. Notre système d'acompte protège votre temps et vos revenus.",
            color: "from-emerald-500/10 to-transparent"
        },
        {
            icon: <BarChart3 className="text-purple-400" size={32} />,
            title: "Data & Insights",
            description: "Comprenez votre clientèle comme jamais auparavant grâce à nos outils d'analyse avancés.",
            color: "from-purple-500/10 to-transparent"
        }
    ];

    const pricingPlans = [
        {
            name: "Lancement",
            price: "49",
            description: "Idéal pour les salons indépendants et auto-entrepreneurs.",
            features: [
                "Page de profil optimisée SEO",
                "Gestionnaire de réservations",
                "Notifications SMS & Emails",
                "Support communautaire",
                "Galerie 12 photos HD"
            ],
            highlighted: false
        },
        {
            name: "Expertise",
            price: "99",
            description: "La solution complète pour dominer votre quartier.",
            features: [
                "Tout du plan Lancement",
                "Réservations illimitées",
                "Système d'acomptes sécurisé",
                "Statistiques de performance",
                "Support VIP sous 2h",
                "Top classement local"
            ],
            highlighted: true
        },
        {
            name: "Elite",
            price: "189",
            description: "Pour les enseignes établies visant l'excellence.",
            features: [
                "Tout du plan Expertise",
                "Shooting photo professionnel offert",
                "Publicité Dreadmo incluse",
                "Gestionnaire de compte dédié",
                "Formation marketing digital",
                "Export comptable automatisé"
            ],
            highlighted: false
        }
    ];

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* ... rest of component ... */}
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/pro-hero.png"
                        alt="Salon Premium"
                        className="w-full h-full object-cover opacity-50 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                    <div className={`max-w-3xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8">
                            <Sparkles size={18} className="text-amber-400" />
                            <span className="text-sm font-bold tracking-wide uppercase text-white/90">Espace Professionnel Dreadmo</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                            VOTRE SALON,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">VERSION ELITE.</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl font-medium">
                            Rejoignez le premier écosystème montréalais dédié aux experts de la chevelure. Automatisez votre business, fidélisez vos clients et explosez votre chiffre d'affaires.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <a href="#inscription" className="group bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                Inscrire mon salon <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#tarifs" className="bg-white/5 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
                                Découvrir les plans
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition Grid */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${feature.color} border border-gray-100`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Banner */}
            <section className="bg-black py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                        {[
                            { val: "150+", label: "SALONS ACTIFS" },
                            { val: "10k+", label: "RENDEZ-VOUS / MOIS" },
                            { val: "4.9/5", label: "AVIS PROS" },
                            { val: "25%", label: "CROISSANCE MOYENNE" }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <p className="text-5xl lg:text-7xl font-black text-white mb-2 tracking-tighter group-hover:text-amber-400 transition-colors">
                                    {stat.val}
                                </p>
                                <p className="text-xs font-black tracking-widest text-gray-500 uppercase">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="tarifs" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter italic">L'INVESTISSEMENT QUI RAPPORTE.</h2>
                        <p className="text-xl text-gray-500 font-medium italic italic">Structurez votre croissance avec des outils pros, sans frais cachés.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col p-10 rounded-[3rem] transition-all duration-700 ${plan.highlighted
                                    ? 'bg-black text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] scale-105 z-10'
                                    : 'bg-gray-50 border border-gray-100 hover:border-black'
                                    }`}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
                                    <p className={`text-sm font-medium ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
                                </div>

                                <div className="flex items-baseline gap-1 mb-10">
                                    <span className="text-6xl font-black tracking-tighter">{plan.price}$</span>
                                    <span className={`text-sm font-bold uppercase ${plan.highlighted ? 'text-gray-500' : 'text-gray-400'}`}>/ mois</span>
                                </div>

                                <div className="space-y-4 mb-12 flex-1">
                                    {plan.features.map((feature, fidx) => (
                                        <div key={fidx} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-amber-400' : 'bg-black'}`}>
                                                <Check className={plan.highlighted ? 'text-black' : 'text-white'} size={12} strokeWidth={4} />
                                            </div>
                                            <span className="text-sm font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all ${plan.highlighted
                                    ? 'bg-amber-400 text-black hover:bg-amber-300 hover:scale-105 shadow-[0_15px_30px_rgba(251,191,36,0.3)]'
                                    : 'bg-black text-white hover:bg-gray-800'
                                    }`}>
                                    Souscrire au plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section id="inscription" className="py-32 bg-gray-50 relative overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className="text-5xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
                                    POSTULEZ<br />
                                    <span className="text-gray-300 italic">DÈS AUJOURD'HUI.</span>
                                </h2>
                                <p className="text-lg text-gray-600 font-medium mb-12 leading-relaxed italic italic">
                                    Nous sélectionnons nos partenaires avec soin pour garantir une qualité de service exceptionnelle sur Dreadmo. Votre salon mérite d'être dans l'élite.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white shrink-0">1</div>
                                        <p className="font-bold text-gray-900">Remplissez le formulaire en 2 minutes</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-900 shrink-0 italic">2</div>
                                        <p className="font-bold text-gray-500">Entretien téléphonique avec nos experts</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-900 shrink-0 italic">3</div>
                                        <p className="font-bold text-gray-500">Ouverture de votre salon sur la plateforme</p>
                                    </div>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                                    <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-8 shadow-[0_20px_40px_rgba(251,191,36,0.4)]">
                                        <Check className="text-black" size={48} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">DEMANDE REÇUE.</h3>
                                    <p className="text-lg text-gray-500 font-medium max-w-xs mx-auto italic">
                                        Votre salon est en cours d'examen. Un expert Dreadmo vous contactera par téléphone sous 24h.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-12 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                    >
                                        Soumettre une autre demande
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Nom du salon</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
                                            placeholder="Studio Texture..."
                                            onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email professionnel</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
                                                placeholder="pro@salon.ca"
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Téléphone</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all"
                                                placeholder="(514) 000-0000"
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Spécialité principale</label>
                                        <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-black transition-all appearance-none">
                                            <option>Cheveux Crépus / Texturés</option>
                                            <option>Tresses & Extensions</option>
                                            <option>Coupe & Coloration</option>
                                            <option>Barbologie Premium</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-black text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-800 hover:scale-[1.02] shadow-2xl transition-all mt-8">
                                        Envoyer mon application
                                    </button>
                                    <p className="text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest">
                                        Réponse garantie sous 24 heures ouvrables.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProPage;
