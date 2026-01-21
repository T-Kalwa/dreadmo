'use client';

import { Search, ArrowRight, Clock, User, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const articles = [
    {
        id: 1,
        title: "Guide ultime : Identifier son type de cheveux (1 à 4C)",
        excerpt: "Comprendre sa texture est la première étape pour des cheveux en pleine santé. Découvrez notre guide détaillé...",
        category: "Conseils",
        author: "Elena Dreadmo",
        date: "15 Janv",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80",
        slug: "guide-type-cheveux"
    },
    {
        id: 2,
        title: "Comment entretenir ses tresses pour qu'elles durent plus longtemps",
        excerpt: "Nos experts partagent leurs secrets pour garder vos box braids ou tresses collées impeccables pendant des semaines...",
        category: "Entretien",
        author: "Marcus Style",
        date: "12 Janv",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
        slug: "entretien-tresses"
    },
    {
        id: 3,
        title: "Les 5 meilleurs salons pour cheveux crépus à Montréal en 2026",
        excerpt: "Nous avons testé et sélectionné les adresses incontournables pour vos soins texturés dans la métropole...",
        category: "Adresses",
        author: "Sonia Petit",
        date: "08 Janv",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        slug: "meilleurs-salons-montreal"
    },
    {
        id: 4,
        title: "Hydratation profonde : les produits naturels à privilégier",
        excerpt: "Beurre de karité, huile d'avocat ou aloe vera ? Apprenez à concocter vos propres soins naturels...",
        category: "Naturel",
        author: "Elena Dreadmo",
        date: "05 Janv",
        readTime: "10 min",
        image: "https://images.unsplash.com/photo-1608248547160-fbc763c011e4?auto=format&fit=crop&w=800&q=80",
        slug: "hydratation-profonde"
    }
];

const BlogPage = () => {
    const [filter, setFilter] = useState('Tous');
    const categories = ['Tous', 'Conseils', 'Entretien', 'Adresses', 'Naturel'];

    const filteredArticles = filter === 'Tous'
        ? articles
        : articles.filter(a => a.category === filter);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Header */}
            <section className="bg-gray-900 text-white py-24 px-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                        Blog & <span className="text-gray-400">Conseils</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        L'expertise capillaire de Montréal à portée de clic. Apprenez, découvrez et prenez soin de votre texture unique.
                    </p>

                    <div className="mt-12 relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un article ou un conseil..."
                            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/20 transition-all outline-none text-lg text-white"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Categories */}
            <section className="py-12 border-b sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredArticles.map((article, idx) => (
                                <Link
                                    key={article.id}
                                    href={`/blog/${article.slug}`}
                                    className="group flex flex-col h-full animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-3xl shadow-lg">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-wider">
                                            {article.category}
                                        </div>
                                        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-black hover:text-white transition-all">
                                            <Bookmark size={18} />
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">
                                            <div className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">{article.date}</div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-black transition-colors">
                                            {article.title}
                                        </h2>

                                        <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                                            {article.excerpt}
                                        </p>

                                        <div className="pt-6 border-t flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">
                                                    {article.author[0]}
                                                </div>
                                                <span className="text-sm font-bold">{article.author}</span>
                                            </div>
                                            <span className="text-black font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Lire l'article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-2xl font-bold text-gray-400">Aucun article trouvé dans cette catégorie.</h3>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Newsletter */}
            <section className="py-24 bg-gray-50 border-t">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                        Newsletter
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ne manquez aucun conseil</h2>
                    <p className="text-xl text-gray-600 mb-10">Recevez chaque semaine les meilleures astuces pour vos cheveux texturés.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            className="flex-1 px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                        <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all">
                            S'inscrire
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-500">Zéro spam. Uniquement de l'expertise capillaire.</p>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
