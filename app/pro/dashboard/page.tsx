'use client';

import { useState, useEffect } from 'react';
import {
    BarChart3,
    Settings,
    Calendar as CalendarIcon,
    Image as ImageIcon,
    Users,
    Plus,
    Trash2,
    CheckCircle2,
    Clock,
    TrendingUp,
    Camera,
    X
} from 'lucide-react';

const ProDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [salon, setSalon] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);

    const [appointments, setAppointments] = useState([
        { id: 1, client: "Marie L.", service: "Coupe + Styling Bouclés", date: "20 Janv", time: "10:00", status: "Confirmé", price: "75$" },
        { id: 2, client: "Jasmine K.", service: "Tresses (Box Braids)", date: "20 Janv", time: "14:30", status: "En attente", price: "150$" },
        { id: 3, client: "David M.", service: "Locs Maintenance", date: "21 Janv", time: "09:00", status: "Confirmé", price: "95$" },
    ]);

    const [showAptModal, setShowAptModal] = useState(false);
    const [isEditingHours, setIsEditingHours] = useState(false);
    const [openingHours, setOpeningHours] = useState([
        { day: 'Lundi', hours: 'Fermé', closed: true },
        { day: 'Mardi', hours: '10:00 - 19:00', closed: false },
        { day: 'Mercredi', hours: '10:00 - 19:00', closed: false },
        { day: 'Jeudi', hours: '10:00 - 20:00', closed: false },
        { day: 'Vendredi', hours: '10:00 - 20:00', closed: false },
        { day: 'Samedi', hours: '09:00 - 18:00', closed: false },
        { day: 'Dimanche', hours: 'Fermé', closed: true },
    ]);

    const [newApt, setNewApt] = useState({ client: '', service: 'Coupe + Styling', date: '21 Janv', time: '12:00' });

    const [services, setServices] = useState<any[]>([]);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // For now use hardcoded ownerId since auth is not yet implemented
                const salonRes = await fetch('/api/salons?ownerId=user-1');
                const salonData = await salonRes.json();
                setSalon(salonData);
                if (salonData.gallery) setPhotos(salonData.gallery);

                const servicesRes = await fetch(`/api/services?salonId=${salonData.id}`);
                const servicesData = await servicesRes.json();
                setServices(servicesData);

                const aptRes = await fetch('/api/appointments');
                const aptData = await aptRes.json();
                const mappedApts = aptData.map((a: any) => ({
                    id: a.id,
                    client: a.clientName || "Client invité",
                    service: servicesData.find((s: any) => s.id === a.serviceId)?.name || "Service",
                    date: a.date,
                    time: a.time,
                    status: a.status === 'CONFIRMED' ? 'Confirmé' : a.status === 'PENDING' ? 'En attente' : a.status,
                    price: servicesData.find((s: any) => s.id === a.serviceId)?.price + "$" || "0$"
                }));
                setAppointments(mappedApts);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCreateApt = (e: React.FormEvent) => {
        e.preventDefault();
        const id = appointments.length + 1;
        setAppointments([...appointments, { ...newApt, id, status: 'Confirmé', price: '75$' }]);
        setShowAptModal(false);
        showNotif("Rendez-vous ajouté manuellement !");
    };

    const handleSaveHours = () => {
        setIsEditingHours(false);
        showNotif("Horaires mis à jour !");
    };

    const handleAptStatus = (id: number, newStatus: string) => {
        setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
        showNotif(`Rendez-vous ${newStatus === 'Confirmé' ? 'accepté' : 'refusé'} avec succès`);
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const price = formData.get('price') as string;
        const duration = formData.get('duration') as string;

        const serviceData = { name, price, duration, salonId: salon.id };

        try {
            if (editingService) {
                const res = await fetch(`/api/services/${editingService.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(serviceData),
                });
                const updated = await res.json();
                setServices(services.map(s => s.id === updated.id ? updated : s));
                showNotif("Service mis à jour");
            } else {
                const res = await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(serviceData),
                });
                const added = await res.json();
                setServices([...services, added]);
                showNotif("Service ajouté");
            }
            setShowServiceModal(false);
            setEditingService(null);
        } catch (error) {
            showNotif("Erreur lors de l'enregistrement", "error");
        }
    };

    const handleDeleteService = async (id: string) => {
        if (!confirm("Supprimer ce service ?")) return;
        try {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
            setServices(services.filter(s => s.id !== id));
            showNotif("Service supprimé");
        } catch (error) {
            showNotif("Erreur lors de la suppression", "error");
        }
    };

    const handleAddService = () => {
        setEditingService(null);
        setShowServiceModal(true);
    };

    const handleEditService = (service: any) => {
        setEditingService(service);
        setShowServiceModal(true);
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const updatedSalon = {
            ...salon,
            name: formData.get('salonName'),
            description: formData.get('description'),
            address: formData.get('address'),
        };

        try {
            const res = await fetch('/api/salons', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSalon),
            });
            const data = await res.json();
            setSalon(data);
            showNotif("Paramètres du salon mis à jour !");
        } catch (error) {
            showNotif("Erreur de sauvegarde", "error");
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (photos.length >= 10) {
            showNotif("Limite de 10 photos atteinte", "error");
            return;
        }

        // Simulating upload to a cloud service
        const demoPhotos = [
            "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80"
        ];
        const newPhoto = demoPhotos[Math.floor(Math.random() * demoPhotos.length)];
        const updatedPhotos = [...photos, newPhoto];

        try {
            const res = await fetch('/api/salons', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...salon, gallery: updatedPhotos }),
            });
            const data = await res.json();
            setSalon(data);
            setPhotos(data.gallery);
            showNotif("Photo ajoutée !");
        } catch (error) {
            showNotif("Erreur lors de l'upload", "error");
        }
    };

    const handleDeletePhoto = async (idx: number) => {
        const updatedPhotos = photos.filter((_, i) => i !== idx);
        try {
            const res = await fetch('/api/salons', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...salon, gallery: updatedPhotos }),
            });
            const data = await res.json();
            setSalon(data);
            setPhotos(data.gallery);
            showNotif("Photo supprimée");
        } catch (error) {
            showNotif("Erreur lors de la suppression", "error");
        }
    };

    const stats = [
        { label: "Vues du profil", value: "1,240", change: "+12%", icon: <Users className="text-blue-500" /> },
        { label: "Réservations", value: appointments.length.toString(), change: "+8%", icon: <CalendarIcon className="text-green-500" /> },
        { label: "Revenus (Janv)", value: "3,450$", change: "+15%", icon: <TrendingUp className="text-purple-500" /> },
        { label: "Note Client", value: "4.9/5", change: "Stable", icon: <BarChart3 className="text-yellow-500" /> },
    ];

    const sidebarItems = [
        { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart3 size={20} /> },
        { id: 'appointments', label: 'Rendez-vous', icon: <CalendarIcon size={20} /> },
        { id: 'gallery', label: 'Galerie Photos', icon: <ImageIcon size={20} /> },
        { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> },
    ];

    const renderContent = () => {
        if (isLoading) return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );

        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Main Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Appointments */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Prochains Rendez-vous</h2>
                                    <button onClick={() => setActiveTab('appointments')} className="text-sm text-black font-semibold hover:underline">Voir tout</button>
                                </div>
                                <div className="space-y-4">
                                    {appointments.slice(0, 3).map((apt) => (
                                        <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                                                    {apt.client[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{apt.client}</p>
                                                    <p className="text-sm text-gray-500">{apt.service}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">{apt.time}</p>
                                                <p className="text-xs text-gray-500">{apt.date}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {apt.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery Preview */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Galerie ({photos.length}/10)</h2>
                                    <button onClick={() => setActiveTab('gallery')} className="text-sm text-black font-semibold hover:underline">Gérer</button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {photos.slice(0, 4).map((photo, idx) => (
                                        <img key={idx} src={photo} alt="Work" className="w-full h-24 object-cover rounded-xl shadow-sm" />
                                    ))}
                                    {photos.length < 10 && (
                                        <button onClick={() => setActiveTab('gallery')} className="w-full h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all">
                                            <Plus size={24} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'gallery':
                return (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold">Ma Galerie</h2>
                                <p className="text-gray-500">Montrez votre meilleur travail. Maximum 10 photos.</p>
                            </div>
                            <div className="bg-gray-100 px-4 py-2 rounded-lg font-bold">
                                {photos.length}/10 photos
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {photos.map((photo, idx) => (
                                <div key={idx} className="relative group aspect-square overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                    <img src={photo} alt="Galerie" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                        <button className="bg-white p-2 rounded-full text-red-600 hover:bg-red-50 transition-all" onClick={() => handleDeletePhoto(idx)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {photos.length < 10 && (
                                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-black transition-all text-gray-400 hover:text-black group">
                                    <Camera size={32} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold">Ajouter une photo</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                </label>
                            )}
                        </div>

                        <div className="mt-12 p-6 bg-blue-50 rounded-2xl flex items-start gap-4">
                            <div className="p-2 bg-blue-600 rounded-lg text-white"><CheckCircle2 size={24} /></div>
                            <div>
                                <h4 className="font-bold text-blue-900">Astuce pour vos photos</h4>
                                <p className="text-blue-800 text-sm mt-1">Utilisez des photos lumineuses et nettes pour attirer plus de clients. Les profils avec 5 photos ou plus ont 3x plus de réservations.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'appointments':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6">Gestion des Rendez-vous</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-gray-100">
                                            <th className="pb-4 font-bold text-gray-500 text-sm">Client</th>
                                            <th className="pb-4 font-bold text-gray-500 text-sm">Service</th>
                                            <th className="pb-4 font-bold text-gray-500 text-sm">Date & Heure</th>
                                            <th className="pb-4 font-bold text-gray-500 text-sm">Prix</th>
                                            <th className="pb-4 font-bold text-gray-500 text-sm">Statut</th>
                                            <th className="pb-4 font-bold text-gray-500 text-sm text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {appointments.map((apt) => (
                                            <tr key={apt.id} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                            {apt.client[0]}
                                                        </div>
                                                        <span className="font-bold text-gray-900">{apt.client}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-gray-600">{apt.service}</td>
                                                <td className="py-4">
                                                    <div className="text-sm font-bold text-gray-900">{apt.time}</div>
                                                    <div className="text-xs text-gray-500">{apt.date}</div>
                                                </td>
                                                <td className="py-4 font-bold text-gray-900">{apt.price}</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {apt.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {apt.status === 'En attente' && (
                                                            <button
                                                                onClick={() => handleAptStatus(apt.id, 'Confirmé')}
                                                                className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors" title="Accepter">
                                                                <CheckCircle2 size={18} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setAppointments(appointments.filter(a => a.id !== apt.id));
                                                                showNotif("Rendez-vous annulé/supprimé");
                                                            }}
                                                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Supprimer">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
                        {/* Profile Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Informations du Salon</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nom du salon</label>
                                            <input name="salonName" type="text" defaultValue={salon?.name} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                                            <select className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none">
                                                <option>Salon Physique</option>
                                                <option>Freelance (Domicile)</option>
                                                <option>Freelance (Déplacement)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Bio / Description</label>
                                        <textarea name="description" rows={4} defaultValue={salon?.description} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Adresse complète</label>
                                        <input name="address" type="text" defaultValue={salon?.address} className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none border border-transparent focus:bg-white transition-all" />
                                    </div>
                                    <button type="submit" className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">Enregistrer les modifications</button>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Mes Services</h2>
                                    <button type="button" onClick={handleAddService} className="text-sm font-bold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2">
                                        <Plus size={16} /> Ajouter
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {services.map((srv) => (
                                        <div key={srv.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                                            <div>
                                                <p className="font-bold text-gray-900">{srv.name}</p>
                                                <p className="text-sm text-gray-500">{srv.duration}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-md mr-4">{srv.price}</span>
                                                <button type="button" onClick={() => handleEditService(srv)} className="p-2 text-gray-400 hover:text-black transition-colors" title="Modifier"><Settings size={18} /></button>
                                                <button type="button" onClick={() => handleDeleteService(srv.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Supprimer"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Settings (Hours, etc) */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold mb-4">Horaires d'ouverture</h3>
                                <div className="space-y-3">
                                    {openingHours.map((h, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">{h.day}</span>
                                            {isEditingHours ? (
                                                <input
                                                    type="text"
                                                    value={h.hours}
                                                    onChange={(e) => {
                                                        const newHours = [...openingHours];
                                                        newHours[idx].hours = e.target.value;
                                                        setOpeningHours(newHours);
                                                    }}
                                                    className="w-24 text-right font-bold border-b border-gray-200 outline-none focus:border-black"
                                                />
                                            ) : (
                                                <span className={`font-bold ${h.closed ? 'text-red-500' : 'text-gray-900'}`}>{h.hours}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {isEditingHours ? (
                                    <button type="button" onClick={handleSaveHours} className="w-full mt-6 py-2 bg-black text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all">
                                        Enregistrer
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => setIsEditingHours(true)} className="w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-bold hover:bg-black hover:text-white transition-all">
                                        Modifier les horaires
                                    </button>
                                )}
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl text-white shadow-lg">
                                <h3 className="font-bold mb-2 flex items-center gap-2"><TrendingUp size={18} className="text-green-400" /> Boostez votre visibilité</h3>
                                <p className="text-gray-400 text-sm mb-4">Passez au compte Premium pour apparaître en tête des recherches.</p>
                                <button type="button" onClick={() => showNotif("Module de paiement Premium en cours de développement")} className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                                    Voir les offres
                                </button>
                            </div>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
            {/* Modal Nouveau RDV */}
            {showAptModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Nouveau Rendez-vous</h2>
                            <button onClick={() => setShowAptModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateApt} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nom du client</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Ex: Clara D."
                                    onChange={(e) => setNewApt({ ...newApt, client: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                                        defaultValue="21 Janv"
                                        onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Heure</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                                        defaultValue="12:00"
                                        onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all mt-4">
                                Créer le rendez-vous
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Service */}
            {showServiceModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{editingService ? 'Modifier le Service' : 'Ajouter un Service'}</h2>
                            <button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveService} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nom du service</label>
                                <input
                                    name="name"
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black"
                                    defaultValue={editingService?.name || ''}
                                    placeholder="Ex: Tresses"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Prix ($)</label>
                                    <input
                                        name="price"
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                                        defaultValue={editingService?.price || ''}
                                        placeholder="Ex: 50$"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Durée</label>
                                    <input
                                        name="duration"
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none"
                                        defaultValue={editingService?.duration || ''}
                                        placeholder="Ex: 2h00"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all mt-4">
                                {editingService ? 'Mettre à jour' : 'Ajouter le service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sidebar Dashboard */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:h-screen sticky top-0 z-20">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold tracking-tighter">DREADMO <span className="text-xs bg-black text-white px-2 py-0.5 rounded">PRO</span></h1>
                </div>
                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id
                                ? 'bg-black text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t bg-white">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=3" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{salon?.name || 'Studio Texture'}</p>
                            <p className="text-xs text-gray-500 truncate">{salon?.city || 'Montréal'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 relative">
                {/* Notification Toast */}
                {notification && (
                    <div className={`fixed top-8 right-8 z-50 animate-fade-in px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${notification.type === 'success' ? 'bg-green-600 text-white border-green-500' : 'bg-red-600 text-white border-red-500'
                        }`}>
                        <CheckCircle2 size={20} />
                        <span className="font-bold">{notification.message}</span>
                    </div>
                )}

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Bonjour, {salon?.name || 'Studio Texture'} 👋</h1>
                        <p className="text-gray-500 mt-1">Voici ce qui se passe aujourd'hui.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            <img src="https://i.pravatar.cc/150?img=1" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="U1" />
                            <img src="https://i.pravatar.cc/150?img=2" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="U2" />
                            <img src="https://i.pravatar.cc/150?img=3" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="U3" />
                        </div>
                        <button
                            onClick={() => setShowAptModal(true)}
                            className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                            <Plus size={18} />
                            Nouveau RDV
                        </button>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

export default ProDashboard;
