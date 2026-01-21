import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="md:col-span-4">
                        <Link href="/" className="text-3xl font-black tracking-tighter text-white flex items-center gap-2 mb-8">
                            <span className="bg-white text-black px-2 py-0.5 rounded italic">D</span>
                            DREADMO
                        </Link>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-sm italic">
                            Redéfinissons l'excellence capillaire à Montréal. Connectez-vous aux meilleurs experts, pour chaque texture.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-2">
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase text-gray-500 mb-8">Explorer</h4>
                        <ul className="space-y-4">
                            {['Trouver un expert', 'Espace Pro', 'Blog & Style', 'Nos types de cheveux'].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-black tracking-[0.2em] uppercase text-gray-500 mb-8">L'Expérience</h4>
                        <ul className="space-y-4">
                            {['Conditions d\'Elite', 'Données & Privacy', 'Centre de Conciergerie', 'Presse'].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors font-bold text-sm uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="md:col-span-3">
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                            <h4 className="flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-amber-400 mb-4">
                                <Sparkles size={14} /> VIP Access
                            </h4>
                            <p className="text-sm text-gray-400 mb-6 font-medium">Rejoignez notre cercle privé pour des conseils exclusifs et des offres premiums.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold focus:border-amber-400 outline-none transition-all"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-amber-400 text-black px-4 rounded-lg font-black text-[10px] uppercase tracking-wider hover:bg-amber-300 transition-all">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
                    <p>© {new Date().getFullYear()} DREADMO ELITE MONTREAL. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <span className="flex items-center gap-2">BY <span className="text-gray-400">DESIGN STUDIO</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
