import { Search, Mail, Phone, MessageCircle, Book, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const HelpCenter = () => {
    const categories = [
        {
            icon: <Book size={32} />,
            title: "Guides & Tutoriels",
            description: "Apprenez à utiliser Dreadmo efficacement",
            articles: 12,
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: <HelpCircle size={32} />,
            title: "Questions fréquentes",
            description: "Réponses aux questions les plus courantes",
            articles: 24,
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: <MessageCircle size={32} />,
            title: "Réservations",
            description: "Aide pour gérer vos rendez-vous",
            articles: 8,
            color: "from-pink-500 to-pink-600"
        }
    ];

    const popularArticles = [
        "Comment créer un compte sur Dreadmo ?",
        "Comment réserver un rendez-vous ?",
        "Politique d'annulation et de remboursement",
        "Comment laisser un avis sur un coiffeur ?",
        "Que faire si j'ai un problème avec ma réservation ?",
        "Comment devenir coiffeur partenaire ?"
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-black text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Centre d'aide
                    </h1>
                    <p className="text-xl text-gray-300 mb-10">
                        Comment pouvons-nous vous aider aujourd'hui ?
                    </p>

                    {/* Barre de recherche */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                        <input
                            type="text"
                            placeholder="Rechercher dans l'aide..."
                            className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-20"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Parcourir par catégorie
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category, idx) => (
                            <Link
                                key={idx}
                                href={`/aide/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {category.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {category.articles} articles
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Articles */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Articles populaires
                    </h2>

                    <div className="space-y-4">
                        {popularArticles.map((article, idx) => (
                            <Link
                                key={idx}
                                href={`/aide/article/${idx}`}
                                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-gray-900 group-hover:text-black font-medium">
                                        {article}
                                    </span>
                                    <svg
                                        className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Besoin d'aide supplémentaire ?
                        </h2>
                        <p className="text-xl text-gray-300">
                            Notre équipe est là pour vous aider
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 text-center hover:bg-opacity-20 transition-all">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Email</h3>
                            <p className="text-gray-300 mb-4">
                                Réponse sous 24h
                            </p>
                            <a
                                href="mailto:support@dreadmo.ca"
                                className="text-white font-semibold underline underline-offset-4 hover:no-underline"
                            >
                                support@dreadmo.ca
                            </a>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 text-center hover:bg-opacity-20 transition-all">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Phone size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Téléphone</h3>
                            <p className="text-gray-300 mb-4">
                                Lun-Ven 9h-18h
                            </p>
                            <a
                                href="tel:+15141234567"
                                className="text-white font-semibold underline underline-offset-4 hover:no-underline"
                            >
                                +1 (514) 123-4567
                            </a>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 text-center hover:bg-opacity-20 transition-all">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Chat en direct</h3>
                            <p className="text-gray-300 mb-4">
                                Disponible maintenant
                            </p>
                            <button className="text-white font-semibold underline underline-offset-4 hover:no-underline">
                                Démarrer une conversation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;
