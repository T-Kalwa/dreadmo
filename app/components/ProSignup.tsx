import Link from 'next/link';
import { Check, TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';

const ProSignup = () => {
  const benefits = [
    { icon: <Users size={20} />, text: "Visibilité accrue auprès de votre clientèle cible" },
    { icon: <Calendar size={20} />, text: "Outils de gestion de calendrier simplifiés" },
    { icon: <TrendingUp size={20} />, text: "Paiements sécurisés et garantis" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black text-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative border border-white/5">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 px-8 py-20 md:px-20 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              {/* Left Column - Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-10 border border-white/10">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Rejoignez l'élite des salons</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">
                  DOMINEZ VOTRE<br />
                  <span className="text-amber-400 italic">CARTIER.</span>
                </h2>

                <p className="text-gray-400 text-xl font-medium mb-12 leading-relaxed max-w-xl italic">
                  Vous êtes un expert à Montréal ? Dreadmo est l'écosystème conçu pour transformer votre talent en véritable empire local. Automatisez tout, brillez plus fort.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mb-16">
                  <Link
                    href="/pro"
                    className="bg-amber-400 text-black px-12 py-6 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:bg-amber-300 hover:scale-105 transition-all text-center shadow-[0_20px_40px_rgba(251,191,36,0.2)]"
                  >
                    Inscrire mon salon
                  </Link>
                  <Link
                    href="/pro#tarifs"
                    className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all text-center"
                  >
                    Les plans
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
                  {[
                    { label: "Visibilité", val: "+60%" },
                    { label: "No-Shows", val: "-85%" },
                    { label: "Revenus", val: "+25%" }
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-2xl font-black text-white mb-1 tracking-tighter">{stat.val}</p>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Stats Card */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-white/10 to-transparent p-1 shadow-2xl rounded-[3rem]">
                  <div className="bg-black/40 backdrop-blur-2xl p-12 rounded-[2.9rem] space-y-12">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Satisfaction Pro</p>
                        <p className="text-2xl font-black text-amber-400 tracking-tighter italic">4.9/5</p>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[98%] h-full bg-gradient-to-r from-amber-600 to-amber-400"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Remplissage</p>
                        <p className="text-2xl font-black text-amber-400 tracking-tighter italic">95%</p>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[95%] h-full bg-gradient-to-r from-amber-600 to-amber-400"></div>
                      </div>
                    </div>
                    <div className="pt-8 flex items-center gap-4">
                      <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} className="w-10 h-10 rounded-full border-2 border-black" src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="" />
                        ))}
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plus de 150 salons nous font confiance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProSignup;