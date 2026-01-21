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
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-amber-50 rounded-full blur-[80px] md:blur-[120px] opacity-40"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full mb-6">
                        <Sparkles size={12} className="text-amber-500" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-black">Expérience Client</span>
                    </div>
                    <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter leading-none italic uppercase">
                        L'ÉVIDENCE <br />
                        <span className="text-gray-300">EST LÀ.</span>
                    </h2>
                </div>

                {/* Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="bg-black text-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-10 md:p-24 relative overflow-hidden group">
                        {/* Quote icon */}
                        <Quote className="absolute top-[-10px] left-[-10px] md:top-[-20px] md:left-[-20px] text-white/5 rotate-12" size={150} />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex gap-1.5 md:gap-2 mb-8 md:mb-12 justify-center">
                                {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <Star key={i} className="fill-amber-400 text-amber-400" size={16} />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-xl md:text-5xl text-white font-black text-center mb-10 md:mb-16 leading-snug md:leading-[1.1] tracking-tighter italic">
                                "{currentTestimonial.text}"
                            </p>

                            {/* Author info */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
                                    <img
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white/10 relative z-10"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="font-black text-white text-lg md:text-xl uppercase tracking-tighter italic">
                                        {currentTestimonial.name}
                                    </p>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                        {currentTestimonial.hairType}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-center gap-4 mt-12 md:absolute md:bottom-12 md:right-12 md:mt-0">
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-all shadow-xl shadow-amber-900/40"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex gap-2.5 justify-center mt-10 md:mt-12">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                                    ? 'w-10 md:w-12 bg-black'
                                    : 'w-3 md:w-4 bg-gray-200 hover:bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto border-t border-gray-100 pt-16 md:pt-20 text-center items-center">
                    {[
                        { val: "4.9/5", label: "Note Elite" },
                        { val: "10k+", label: "Avis" },
                        { val: "98%", label: "Satisfaction" },
                        { val: "150+", label: "Experts" }
                    ].map((s, i) => (
                        <div key={i} className="group">
                            <div className="text-2xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2 tracking-tighter group-hover:text-amber-500 transition-colors uppercase italic">{s.val}</div>
                            <div className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
