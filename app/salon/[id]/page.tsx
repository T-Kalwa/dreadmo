'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    MapPin, Star, Clock, Phone, Mail, Instagram as InstaIcon,
    Calendar, ChevronLeft, ChevronRight, CheckCircle2,
    Grid, List, MessageSquare, Info, Heart, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const SalonProfile = () => {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('gallery'); // gallery, services, reviews
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [salon, setSalon] = useState<any>(null);
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingStep, setBookingStep] = useState(1);
    const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const fetchSalonData = async () => {
            try {
                const id = params.id as string || 'salon-1';
                const salonRes = await fetch(`/api/salons?id=${id}`);
                const salonData = await salonRes.json();
                setSalon(salonData);

                const servicesRes = await fetch(`/api/services?salonId=${salonData.id}`);
                const servicesData = await servicesRes.json();
                setServices(servicesData);
            } catch (error) {
                console.error("Error fetching salon:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSalonData();
    }, [params.id]);

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !selectedService) {
            alert("Veuillez sélectionner un service, une date et une heure.");
            return;
        }
        if (bookingStep === 1) {
            setBookingStep(2);
            return;
        }
        setIsBooking(true);
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedDate,
                    time: selectedTime,
                    salonId: salon.id,
                    serviceId: selectedService.id,
                    clientName: guestInfo.name,
                    clientEmail: guestInfo.email,
                    clientPhone: guestInfo.phone,
                }),
            });
            if (res.ok) setBookingStep(3);
        } catch (error) {
            alert("Erreur lors de la réservation");
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
    );

    const availableTimes = ["10:00", "11:00", "13:00", "14:30", "16:00", "17:30"];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header / Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/recherche" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <h2 className="font-black text-lg tracking-tight">{salon?.instagram || salon?.name}</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <InstaIcon size={24} />
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Header Block */}
                <div className="flex flex-col md:flex-row gap-8 md:items-center mb-12">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                            <div className="p-1 bg-white rounded-full">
                                <img
                                    src={salon?.image}
                                    className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover border-2 border-white shadow-inner"
                                    alt={salon?.name}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                            <h1 className="text-3xl font-light text-gray-900">{salon?.name}</h1>
                            <div className="flex gap-2">
                                <button className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
                                    Suivre
                                </button>
                                <button className="bg-gray-100 text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mb-6 border-y md:border-none py-4 md:py-0">
                            <div className="flex flex-col md:flex-row md:gap-1 items-center">
                                <span className="font-black">{salon?.gallery?.length || 0}</span>
                                <span className="text-gray-500 text-sm">publications</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-1 items-center">
                                <span className="font-black">{salon?.reviewCount}</span>
                                <span className="text-gray-500 text-sm">avis</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-1 items-center">
                                <span className="font-black text-amber-500 flex items-center gap-0.5">
                                    <Star className="fill-amber-500" size={14} /> {salon?.rating}
                                </span>
                                <span className="text-gray-500 text-sm">moyenne</span>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-1">
                            <p className="font-bold">{salon?.category}</p>
                            <p className="text-gray-700 leading-relaxed text-sm max-w-xl">
                                {salon?.description}
                            </p>
                            <div className="flex items-center gap-1 text-blue-900 font-bold text-sm">
                                <MapPin size={14} /> <span>{salon?.district || salon?.city}</span>
                            </div>
                            <a href={`http://${salon?.instagram?.replace('@', '')}.com`} className="text-blue-900 font-medium text-sm block">
                                {salon?.instagram ? `linktr.ee/${salon.instagram.replace('@', '')}` : ''}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-100">
                    <div className="flex justify-center gap-12 -mt-[1px]">
                        {[
                            { id: 'gallery', label: 'PUBLICATIONS', icon: <Grid size={12} /> },
                            { id: 'services', label: 'SERVICES', icon: <List size={12} /> },
                            { id: 'reviews', label: 'AVIS', icon: <MessageSquare size={12} /> },
                            { id: 'info', label: 'INFOS', icon: <Info size={12} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 border-t transition-all ${activeTab === tab.id ? 'border-black text-black opacity-100' : 'border-transparent text-gray-400 opacity-60'}`}
                            >
                                {tab.icon}
                                <span className="text-[10px] font-black tracking-widest uppercase">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="pt-8 min-h-[400px]">
                    {activeTab === 'gallery' && (
                        <div className="grid grid-cols-3 gap-1 md:gap-6 animate-fade-in">
                            {salon?.gallery?.map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square relative group bg-gray-100 overflow-hidden cursor-pointer rounded-sm md:rounded-xl">
                                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${idx}`} />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex gap-4 text-white font-black text-sm">
                                            <span className="flex items-center gap-1"><Heart className="fill-white" size={16} /> {Math.floor(Math.random() * 100) + 20}</span>
                                            <span className="flex items-center gap-1"><MessageSquare className="fill-white" size={16} /> {Math.floor(Math.random() * 10) + 2}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
                            {services.map((service, idx) => (
                                <div key={idx}
                                    onClick={() => { setSelectedService(service); setBookingStep(1); }}
                                    className={`p-6 border rounded-2xl cursor-pointer transition-all flex justify-between items-center ${selectedService?.id === service.id ? 'border-black bg-black/5 ring-1 ring-black' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div>
                                        <h3 className="font-black text-gray-900">{service.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{service.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-lg">{service.price}$</p>
                                        <button className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Réserver</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
                            {salon?.reviews?.map((review: any) => (
                                <div key={review.id} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border">
                                        <img src={`https://i.pravatar.cc/100?u=${review.author}`} alt={review.author} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-black mr-2">{review.author.replace(' ', '').toLowerCase()}</span>
                                            {review.comment}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 font-bold">
                                            <span>{review.date}</span>
                                            <span className="flex items-center gap-0.5"><Star size={10} className="fill-amber-500 text-amber-500" /> {review.rating}</span>
                                            <button className="hover:text-black">Répondre</button>
                                        </div>
                                    </div>
                                    <button className="self-center p-2 text-gray-300 hover:text-red-500 transition-colors">
                                        <Heart size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
                            <div className="bg-gray-50 p-8 rounded-[2rem]">
                                <h3 className="font-black text-lg mb-6 tracking-tight">À propos de nous</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-gray-400 mt-1" size={20} />
                                        <div>
                                            <p className="font-bold">{salon?.address}</p>
                                            <p className="text-sm text-gray-500">{salon?.city}, QC</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="text-gray-400 mt-1" size={20} />
                                        <p className="font-bold">{salon?.phone}</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock className="text-gray-400 mt-1" size={20} />
                                        <div className="w-full">
                                            <p className="font-bold mb-4">Horaires d'ouverture</p>
                                            <div className="space-y-2">
                                                {salon?.hours && Object.entries(salon.hours).map(([day, hrs]: [string, any]) => (
                                                    <div key={day} className="flex justify-between text-sm">
                                                        <span className="capitalize text-gray-500 font-medium">{day}</span>
                                                        <span className="font-black">{hrs}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Sticky Booking CTA - Mobile & Overlay Desktop */}
            <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] bg-white/50 backdrop-blur-xl border-t border-gray-100 flex justify-center">
                <div className="max-w-lg w-full">
                    {selectedService ? (
                        <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 transition-all transform scale-100 animate-fade-in">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400">Réservation</h4>
                                    <p className="font-black text-xl">{selectedService.name}</p>
                                </div>
                                <button onClick={() => setSelectedService(null)} className="text-gray-400 hover:text-black">
                                    <ChevronRight className="rotate-90" />
                                </button>
                            </div>

                            {bookingStep === 1 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold text-sm border-none outline-none focus:ring-2 focus:ring-black"
                                        />
                                        <div className="relative">
                                            <select
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold text-sm border-none outline-none focus:ring-2 focus:ring-black appearance-none"
                                            >
                                                <option value="">Heure</option>
                                                {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleBooking}
                                        className="w-full bg-black text-white py-4 rounded-xl font-black shadow-xl hover:bg-gray-800 flex items-center justify-center gap-2"
                                    >
                                        Suivant <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div className="space-y-4">
                                    <input
                                        placeholder="Votre nom"
                                        value={guestInfo.name}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold text-sm border-none outline-none focus:ring-2 focus:ring-black"
                                    />
                                    <input
                                        placeholder="Votre email"
                                        value={guestInfo.email}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 font-bold text-sm border-none outline-none focus:ring-2 focus:ring-black"
                                    />
                                    <button
                                        onClick={handleBooking}
                                        disabled={isBooking}
                                        className="w-full bg-black text-white py-4 rounded-xl font-black shadow-xl hover:bg-gray-800 disabled:bg-gray-400"
                                    >
                                        {isBooking ? 'Confirmation...' : 'Confirmer la Réservation'}
                                    </button>
                                    <button onClick={() => setBookingStep(1)} className="w-full text-xs font-black text-gray-400 text-center uppercase tracking-widest">Retour</button>
                                </div>
                            )}

                            {bookingStep === 3 && (
                                <div className="py-6 text-center">
                                    <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                                    <p className="font-black text-xl mb-1">C'est réservé !</p>
                                    <p className="text-sm text-gray-500 mb-6 font-medium">Un email de confirmation vous sera envoyé.</p>
                                    <button
                                        onClick={() => { setSelectedService(null); setBookingStep(1); }}
                                        className="bg-black text-white px-8 py-3 rounded-full font-black text-sm"
                                    >
                                        Terminer
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center justify-between animate-fade-in-up">
                            <span className="font-black text-sm tracking-widest">SÉLECTIONNEZ UN SERVICE</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 capitalize">À partir de 45$</span>
                                <ArrowRight size={20} className="text-gray-400" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Added padding at bottom for sticky CTA */}
            <div className="h-32"></div>
        </div>
    );
};

export default SalonProfile;
