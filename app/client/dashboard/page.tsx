'use client';

import { useState } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    Star,
    ChevronRight,
    Heart,
    ShoppingBag,
    History,
    User,
    LogOut
} from 'lucide-react';
import Link from 'next/link';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const [upcomingBookings, setUpcomingBookings] = useState([
        {
            id: 1,
            salonName: "Studio Texture",
            service: "Coupe + Styling Bouclés",
            date: "25 Janv 2026",
            time: "10:00",
            price: "75$",
            status: "Confirmé",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"
        }
    ]);

    const [favoriteStylists, setFavoriteStylists] = useState([
        { id: 1, name: "Sophie Tremblay", district: "Rosemont", rating: 5.0, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80" },
        { id: 2, name: "Marcus Johnson", district: "Plateau", rating: 4.9, image: "https://images.unsplash.com/photo-1503951914165-c71b2bbf2f0f?auto=format&fit=crop&w=400&q=80" }
    ]);

    const pastBookings = [
        {
            id: 2,
            salonName: "Maison Afro-Chic",
            service: "Tresses (Box Braids)",
            date: "12 Déc 2025",
            time: "14:00",
            price: "150$",
            status: "Terminé",
            image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=400&q=80"
        }
    ];

    const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCancelBooking = (id: number) => {
        if (confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
            setUpcomingBookings(upcomingBookings.filter(b => b.id !== id));
            showNotif("Rendez-vous annulé avec succès");
        }
    };

    const handleRemoveFavorite = (id: number) => {
        setFavoriteStylists(favoriteStylists.filter(s => s.id !== id));
        showNotif("Retiré de vos favoris");
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        showNotif("Profil mis à jour avec succès !");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-8 right-8 z-50 animate-fade-in px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${notification.type === 'success' ? 'bg-green-600 text-white border-green-500' : 'bg-red-600 text-white border-red-500'
                    }`}>
                    <Star size={20} className="fill-current" />
                    <span className="font-bold">{notification.message}</span>
                </div>
            )}

            {/* Sidebar Sidebar */}
            <aside className="w-full md:w-72 bg-white border-r border-gray-200 md:h-screen sticky top-0 z-20">
                <div className="p-8 border-b">
                    <Link href="/" className="text-2xl font-bold tracking-tighter">DREADMO</Link>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
                            M
                        </div>
                        <div>
                            <p className="font-bold">Marie Laurent</p>
                            <p className="text-xs text-gray-500">Membre depuis 2024</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'bookings' ? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Calendar size={20} /> Mes Réservations
                        </button>
                        <button
                            onClick={() => setActiveTab('favorites')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'favorites' ? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Heart size={20} /> Favoris
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-black text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <User size={20} /> Profil
                        </button>
                        <div className="pt-10">
                            <button
                                onClick={() => showNotif("Déconnexion...")}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all">
                                <LogOut size={20} /> Déconnexion
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content Content */}
            <main className="flex-1 p-6 md:p-12 animate-fade-in-up">
                {activeTab === 'bookings' && (
                    <div className="max-w-4xl mx-auto space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-6">À venir</h2>
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map(booking => (
                                    <div key={booking.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 mb-6 hover:shadow-md transition-shadow">
                                        <img src={booking.image} alt={booking.salonName} className="w-full md:w-32 h-32 object-cover rounded-2xl" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold">{booking.salonName}</h3>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{booking.status}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{booking.service}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1"><Calendar size={16} /> {booking.date}</div>
                                                <div className="flex items-center gap-1"><Clock size={16} /> {booking.time}</div>
                                                <div className="flex items-center gap-1 font-bold text-gray-900">{booking.price}</div>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col justify-end gap-2">
                                            <button
                                                onClick={() => showNotif("Modification du RDV bientôt disponible")}
                                                className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg">Gérer</button>
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl text-sm font-bold">Annuler</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-12 text-center rounded-3xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-500">Aucun rendez-vous à venir.</p>
                                    <Link href="/recherche" className="inline-block mt-4 text-black font-bold underline">Trouver un coiffeur</Link>
                                </div>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Historique</h2>
                            <div className="space-y-4">
                                {pastBookings.map(booking => (
                                    <div key={booking.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <img src={booking.image} className="w-12 h-12 rounded-xl object-cover grayscale" alt="Salon" />
                                            <div>
                                                <h4 className="font-bold">{booking.salonName}</h4>
                                                <p className="text-xs text-gray-500">{booking.service} • {booking.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => showNotif("Redirection vers la page de réservation...")}
                                                className="text-sm font-bold text-black border-2 border-black px-4 py-1.5 rounded-lg hover:bg-black hover:text-white transition-all">Réserver à nouveau</button>
                                            <button
                                                onClick={() => showNotif("Merci pour votre avis !")}
                                                className="p-2 bg-gray-100 rounded-lg group-hover:bg-white text-yellow-500"><Star size={18} className="fill-current" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8">Mes Coiffeurs Favoris</h2>
                        {favoriteStylists.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {favoriteStylists.map(stylist => (
                                    <div key={stylist.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all group">
                                        <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-2xl object-cover" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{stylist.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                <MapPin size={14} /> {stylist.district}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm font-bold">
                                                <Star size={14} className="fill-yellow-400 text-yellow-400" /> {stylist.rating}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFavorite(stylist.id)}
                                            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                                            <Heart size={20} className="fill-current" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 text-center rounded-3xl border border-gray-100">
                                <p className="text-gray-500">Vous n'avez pas encore de favoris.</p>
                                <Link href="/recherche" className="inline-block mt-4 text-black font-bold underline">Explorer les coiffeurs</Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-8">Mon Profil</h2>
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                                    <input type="text" defaultValue="Marie" className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                                    <input type="text" defaultValue="Laurent" className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input type="email" defaultValue="marie.l@example.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                                <input type="tel" defaultValue="+1 514 000 0000" className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                            </div>
                            <button className="w-full bg-black text-white py-4 rounded-xl font-bold mt-10 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">Sauvegarder les modifications</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ClientDashboard;
