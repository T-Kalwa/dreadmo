import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-20 pb-40 md:py-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20 text-center md:text-left">
                    {/* Brand Info */}
                    <div className="md:col-span-4">
                        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-center justify-center md:justify-start gap-2 mb-6 md:mb-8 italic uppercase">
                            <span className="bg-white text-black px-2 py-0.5 rounded italic">D</span>
                            DREADMO
                        </Link>
                        <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10 max-w-sm mx-auto md:mx-0 italic">
                            Redéfinissons l'excellence capillaire à Montréal. Connectez-vous aux meilleurs experts, pour chaque texture.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500 mb-6 md:mb-8">Explorer</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {['Trouver un expert', 'Espace Pro', 'Blog & Style', 'Textures'].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors font-bold text-xs md:text-sm uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-500 mb-6 md:mb-8">L'Expérience</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {['Conditions', 'Privacy', 'Conciergerie', 'Presse'].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors font-bold text-xs md:text-sm uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="md:col-span-3">
                        <div className="p-6 md:p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center md:text-left">
                            <h4 className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-amber-400 mb-4 italic">
                                <Sparkles size={12} /> VIP Access
                            </h4>
                            <p className="text-xs text-gray-400 mb-6 font-medium italic">Rejoignez notre cercle privé pour des privilèges exclusifs.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:border-amber-400 outline-none transition-all"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-400 text-black px-4 rounded-lg font-black text-[9px] uppercase tracking-wider hover:bg-amber-300 transition-all">
                                    Rejoindre
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase text-center md:text-left">
                    <p>© {new Date().getFullYear()} DREADMO ELITE MONTREAL. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <span className="flex items-center gap-2 italic">DESIGNED BY <span className="text-gray-400">STUDIO ELITE</span></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
