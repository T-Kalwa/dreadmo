import { Search, UserCheck, Calendar, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            icon: <Search size={32} />,
            title: "Recherchez votre expert",
            description: "Utilisez nos filtres pour trouver des coiffeurs spécialisés dans votre type de cheveux et votre quartier.",
            color: "from-blue-500 to-blue-600"
        },
        {
            number: "02",
            icon: <UserCheck size={32} />,
            title: "Consultez les profils",
            description: "Découvrez les portfolios, avis clients et spécialités de chaque professionnel.",
            color: "from-purple-500 to-purple-600"
        },
        {
            number: "03",
            icon: <Calendar size={32} />,
            title: "Réservez en ligne",
            description: "Choisissez votre créneau horaire et confirmez votre rendez-vous en quelques clics.",
            color: "from-pink-500 to-pink-600"
        },
        {
            number: "04",
            icon: <Star size={32} />,
            title: "Profitez & Partagez",
            description: "Vivez votre expérience et laissez un avis pour aider la communauté.",
            color: "from-yellow-500 to-yellow-600"
        }
    ];

    const faqs = [
        {
            question: "Comment Dreadmo vérifie-t-il les coiffeurs ?",
            answer: "Tous nos professionnels passent par un processus de vérification incluant la validation de leurs certifications, l'examen de leur portfolio et la vérification de leur expérience."
        },
        {
            question: "Est-ce que je peux annuler mon rendez-vous ?",
            answer: "Oui, vous pouvez annuler gratuitement jusqu'à 24h avant votre rendez-vous. Passé ce délai, des frais peuvent s'appliquer selon la politique du professionnel."
        },
        {
            question: "Quelle est la différence entre un salon et un freelance ?",
            answer: "Les salons sont des établissements fixes avec plusieurs coiffeurs, tandis que les freelances sont des professionnels indépendants qui peuvent travailler à domicile ou se déplacer."
        },
        {
            question: "Comment sont calculés les prix ?",
            answer: "Chaque professionnel fixe ses propres tarifs en fonction de son expertise, ses services et sa localisation. Les prix affichés sont toujours transparents et sans frais cachés."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-black text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Comment ça marche ?
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Trouvez et réservez votre coiffeur idéal en 4 étapes simples
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative group"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s forwards`,
                                    opacity: 0
                                }}
                            >
                                <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:border-transparent transition-all duration-300 h-full">
                                    {/* Numéro */}
                                    <div className="text-8xl font-bold text-gray-100 absolute top-4 right-8 group-hover:text-gray-200 transition-colors">
                                        {step.number}
                                    </div>

                                    {/* Icône */}
                                    <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                        {step.icon}
                                    </div>

                                    {/* Contenu */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed relative z-10">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Flèche de connexion (sauf pour le dernier) */}
                                {idx < steps.length - 1 && idx % 2 === 0 && (
                                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                                        <ArrowRight className="text-gray-300" size={32} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Prêt à trouver votre coiffeur idéal ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Rejoignez des milliers de personnes qui ont trouvé leur expert capillaire sur Dreadmo
                    </p>
                    <Link
                        href="/recherche"
                        className="inline-block bg-black text-white px-10 py-5 rounded-xl font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Commencer ma recherche
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                        Questions fréquentes
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 text-center">
                        Tout ce que vous devez savoir sur Dreadmo
                    </p>

                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-gray-300 transition-all"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
                        <Link
                            href="/aide"
                            className="text-black font-bold underline underline-offset-4 hover:no-underline"
                        >
                            Visitez notre centre d'aide
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
