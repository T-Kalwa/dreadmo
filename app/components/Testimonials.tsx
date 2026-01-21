'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Marie-Claire Dubois",
        hairType: "Cheveux Crépus 4C",
        image: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        text: "Enfin une plateforme qui comprend vraiment les besoins des cheveux texturés ! J'ai trouvé ma coiffeuse en 5 minutes et le résultat est incroyable.",
        stylist: "Sophie Tremblay"
    },
    {
        id: 2,
        name: "David Laurent",
        hairType: "Locs",
        image: "https://i.pravatar.cc/150?img=3",
        rating: 5,
        text: "Service impeccable du début à la fin. La réservation était simple et mon coiffeur était exactement ce que je cherchais. Je recommande à 100% !",
        stylist: "Marcus Johnson"
    },
    {
        id: 3,
        name: "Jasmine Koné",
        hairType: "Cheveux Bouclés 3B",
        image: "https://i.pravatar.cc/150?img=5",
        rating: 5,
        text: "Dreadmo m'a permis de découvrir des coiffeurs spécialisés que je n'aurais jamais trouvés autrement. Mes boucles n'ont jamais été aussi belles !",
        stylist: "Studio Texture"
    },
    {
        id: 4,
        name: "Alexandre Martin",
        hairType: "Tresses",
        image: "https://i.pravatar.cc/150?img=7",
        rating: 5,
        text: "Interface intuitive, professionnels vérifiés, et résultats au top. C'est devenu mon réflexe pour tous mes rendez-vous capillaires.",
        stylist: "Maison Afro-Chic"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-50 rounded-full blur-[120px] opacity-40"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full mb-6">
                        <Sparkles size={14} className="text-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Expérience Client</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none italic">
                        L'ÉVIDENCE <br />
                        <span className="text-gray-300">EST LÀ.</span>
                    </h2>
                </div>

                {/* Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="bg-black text-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-12 md:p-24 relative overflow-hidden group">
                        {/* Quote icon */}
                        <Quote className="absolute top-[-20px] left-[-20px] text-white/5 rotate-12" size={300} />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex gap-2 mb-12 justify-center">
                                {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <Star key={i} className="fill-amber-400 text-amber-400" size={20} />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-3xl md:text-5xl text-white font-black text-center mb-16 leading-[1.1] tracking-tighter italic">
                                "{currentTestimonial.text}"
                            </p>

                            {/* Author info */}
                            <div className="flex items-center justify-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
                                    <img
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white/10 relative z-10"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-white text-xl uppercase tracking-tighter">
                                        {currentTestimonial.name}
                                    </p>
                                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
                                        {currentTestimonial.hairType}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation icons floating */}
                        <div className="absolute bottom-12 right-12 flex gap-4">
                            <button
                                onClick={prevTestimonial}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-all shadow-xl shadow-amber-900/40"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex gap-3 justify-center mt-12">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                                    ? 'w-12 bg-black'
                                    : 'w-4 bg-gray-200 hover:bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto border-t border-gray-100 pt-20">
                    {[
                        { val: "4.9/5", label: "Note Elite" },
                        { val: "10k+", label: "Avis Vérifiés" },
                        { val: "98%", label: "Taux de Ravis" },
                        { val: "150+", label: "Experts" }
                    ].map((s, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-4xl font-black text-gray-900 mb-2 tracking-tighter group-hover:text-amber-500 transition-colors uppercase italic">{s.val}</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
