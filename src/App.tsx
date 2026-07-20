/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Phone, 
  Settings as MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Menu,
  X,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Assets ---
import serviceBayBg from './assets/images/automotive_service_bay_1779120193079.png';
import importedPremiumTires from './assets/images/imported_premium_tires_1779207835806.png';
import remoldedEcoTires from './assets/images/remolded_eco_tires_1779207851063.png';
import halfLifeTire from './assets/images/half_life_tire_1779209424828.png';

// --- Constants & Types ---

const WHATSAPP_NUMBER = "5511987744567";
const PHONE_NUMBER = "11987744567";

interface BusinessHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

const HOURS: Record<number, BusinessHours> = {
  1: { open: "08:00", close: "18:30" }, // Seg
  2: { open: "08:00", close: "18:30" }, // Ter
  3: { open: "08:00", close: "18:30" }, // Qua
  4: { open: "08:00", close: "18:30" }, // Qui
  5: { open: "08:00", close: "17:30" }, // Sex
  6: { open: "08:00", close: "16:00" }, // Sab
  0: { open: "00:00", close: "00:00", isClosed: true }, // Dom
};

// --- Components ---

const StatusBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = HOURS[day];
      if (hours.isClosed) return setIsOpen(false);

      const time = now.getHours() * 100 + now.getMinutes();
      const openTime = parseInt(hours.open.replace(':', ''));
      const closeTime = parseInt(hours.close.replace(':', ''));
      
      setIsOpen(time >= openTime && time < closeTime);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-2 text-center text-xs font-semibold uppercase tracking-widest ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      <span className="flex items-center justify-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        {isOpen ? 'Aberto Agora - Visite-nos para montagem imediata' : 'Fechado Agora - Envie um WhatsApp para orçamento'}
      </span>
    </div>
  );
};

const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <a 
        href="#inicio"
        onClick={(e) => {
          // If the click is on the close button, don't trigger the main link
          if ((e.target as HTMLElement).closest('button')) {
            e.preventDefault();
            return;
          }
          setIsOpen(false);
        }}
        className="bg-asphalt-900 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl border border-white/10 block text-left cursor-pointer transition-transform hover:scale-[1.02]"
      >
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="absolute top-4 right-4 p-2.5 md:p-3 bg-asphalt-800 hover:bg-asphalt-700 text-white rounded-full transition-colors z-10 focus-visible:ring-2 focus-visible:ring-safety-orange outline-none"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 px-2 bg-safety-orange rounded text-white font-black italic tracking-tighter text-xs md:text-sm">BARBOSA</div>
          <div className="font-display font-extrabold text-xs md:text-sm tracking-tight text-white">PNEUS</div>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-safety-orange mb-3 md:mb-4 font-display uppercase tracking-tight text-center animate-pulse">
          Promoção!
        </h2>
        <div className="text-zinc-300 space-y-4 font-semibold text-base md:text-lg leading-relaxed">
          <p>
            Pneus <span className="font-black text-white">TCP ECO TYRE</span> - Aros 13, 14, 15 e 16 para carros de passeio.
          </p>
          <div className="bg-asphalt-800 p-4 md:p-5 rounded-xl border border-asphalt-700">
            <p className="font-black text-2xl md:text-3xl text-white mb-2">R$ 289,90</p>
            <p className="text-xs md:text-sm text-zinc-400 font-medium">Pagamento no Pix, débito ou dinheiro.</p>
          </div>
          <p className="flex items-center gap-2.5 text-safety-orange bg-safety-orange/10 p-3.5 rounded-lg border border-safety-orange/20 text-sm md:text-base font-bold">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <span>Montagem, balanceamento e bicos cortesia.</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default function App() {
  const [tireWidth, setTireWidth] = useState('');
  const [tireRatio, setTireRatio] = useState('');
  const [tireRim, setTireRim] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowMobileCTA(true);
        } else {
          setShowMobileCTA(false);
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById('localização');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const sendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`${tireWidth}/${tireRatio} R${tireRim}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const services = [
    { 
      title: "Montagem Profissional", 
      desc: "Instalação rápida com equipamentos de última geração.",
      icon: <CheckCircle2 className="w-5 h-5 text-safety-orange" />
    },
    { 
      title: "Balanceamento", 
      desc: "Evite trepidações e desgaste prematuro dos seus pneus.",
      icon: <CheckCircle2 className="w-5 h-5 text-safety-orange" />
    },
    { 
      title: "Reparo e Vulcanização", 
      desc: "Conserto especializado para segurança em qualquer estrada.",
      icon: <CheckCircle2 className="w-5 h-5 text-safety-orange" />
    },
    { 
      title: "Alinhamento com parceria", 
      desc: "Direção precisa através de nossos parceiros especializados.",
      icon: <CheckCircle2 className="w-5 h-5 text-safety-orange" />
    },
    { 
      title: "Entrega disponível sob consulta", 
      desc: "Conforto e agilidade: levamos os pneus até você.",
      icon: <CheckCircle2 className="w-5 h-5 text-safety-orange" />
    },
  ];

  const tiers = [
    {
      name: "Pneus Novos",
      badge: "Performance Premium",
      image: importedPremiumTires,
      features: ["Pneus Importados", "Maior Longevidade", "Aderência Máxima", "Garantia de Fábrica"],
      priceDesc: "Marcas consagradas no mercado.",
      color: "border-asphalt-200"
    },
    {
      name: "Pneus Ecológicos TCP",
      badge: "Custo-Benefício Real",
      image: remoldedEcoTires,
      popular: true,
      features: ["Remoldados de Alta Qualidade", "Sustentáveis", "Testados por Especialistas"],
      priceDesc: "Até 50% de economia.",
      color: "border-safety-orange ring-1 ring-safety-orange"
    },
    {
      name: "Pneus Meia-vida",
      badge: "Economia Inteligente",
      image: halfLifeTire,
      features: ["Rigorosamente Inspecionados", "Seleção de Marcas", "Pronta Entrega"],
      priceDesc: "Preços imbatíveis.",
      color: "border-asphalt-200"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      <PromoModal />
      {/* --- Header --- */}
      <nav id="navbar" className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2 md:py-3' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2 bg-safety-orange rounded text-white font-black italic tracking-tighter text-lg md:text-xl">BARBOSA</div>
            <div className={`font-display font-extrabold text-lg md:text-xl tracking-tight ${isScrolled ? 'text-asphalt-900' : 'text-white'}`}>PNEUS</div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-tight">
            {[
              { name: 'Início', id: 'inicio' },
              { name: 'Produtos', id: 'produtos' },
              { name: 'Serviços', id: 'serviços' },
              { name: 'Localização', id: 'localização' }
            ].map(item => (
              <a key={item.name} href={`#${item.id}`} className={`${isScrolled ? 'text-asphalt-700' : 'text-white'} hover:text-safety-orange transition-colors`}>{item.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-safety-orange font-bold">
              <Phone className="w-4 h-4" />
              <span>(11) 98774-4567</span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-safety-orange outline-none ${isScrolled ? 'text-asphalt-900 border border-asphalt-200' : 'text-white border border-white/30'}`}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-white p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between items-center shrink-0">
              <span className="font-display font-black text-2xl italic tracking-tighter text-asphalt-900">BARBOSA PNEUS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 -mr-3 text-asphalt-900 hover:text-safety-orange transition-colors focus-visible:ring-2 focus-visible:ring-safety-orange outline-none rounded-full"
                aria-label="Fechar Menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-xl font-bold pt-6">
              {[
                { name: 'Início', id: 'inicio' },
                { name: 'Produtos', id: 'produtos' },
                { name: 'Serviços', id: 'serviços' },
                { name: 'Localização', id: 'localização' }
              ].map(item => (
                <a key={item.name} href={`#${item.id}`} onClick={() => setMobileMenuOpen(false)} className="border-b border-asphalt-100 pb-4 block hover:text-safety-orange transition-colors">{item.name}</a>
              ))}
            </div>
            <div className="mt-auto space-y-4 pt-8">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-full min-h-[56px] flex items-center justify-center gap-3 bg-asphalt-900 text-white rounded-xl font-bold hover:bg-asphalt-800 transition-colors">
                <Phone className="w-5 h-5" /> Conversar no WhatsApp
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="w-full min-h-[56px] flex items-center justify-center gap-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" /> Enviar WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-0">
        {/* --- Hero Section --- */}
        <section id="inicio" className="relative h-[95vh] min-h-[650px] overflow-hidden bg-asphalt-900">
          <img 
            src={serviceBayBg} 
            alt="Service Bay" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient" />
          
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-20 md:mt-24">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>
                <div className="inline-block px-4 py-1.5 bg-safety-orange/20 border border-safety-orange/30 text-safety-orange text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full mb-4 md:mb-6 italic">
                  Segurança & Performance no Asfalto
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-4 md:mb-6">
                  Sua Jornada Começa com <span className="text-safety-orange italic">Pneus de Confiança.</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 max-w-xl mb-6 md:mb-8 leading-relaxed">
                  Novos, Ecológicos ou Usados. Seleção rigorosa para quem valoriza segurança, economia e velocidade na instalação.
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-asphalt-900 bg-asphalt-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold">USP</div>)}
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-safety-yellow">
                      {[1,2,3,4,5].map(i => <Award key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-white font-semibold">1.200+ avaliações positivas</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white/95 backdrop-blur shadow-2xl rounded-3xl p-6 lg:p-8 border border-white/20">
                <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
                  <div className="p-2 bg-asphalt-50 rounded-lg"><MessageCircle className="w-6 h-6 text-asphalt-900" /></div>
                  <div>
                    <h3 className="font-bold text-asphalt-900">Orçamento Instantâneo</h3>
                    <p className="text-xs text-zinc-500">Receba preços por WhatsApp em segundos</p>
                  </div>
                </div>

                <form onSubmit={sendWhatsAppQuote} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 ml-1">Largura</label>
                      <input 
                        required
                        type="text"
                        inputMode="numeric" 
                        placeholder="Ex: 205" 
                        className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-xl px-4 font-bold focus:ring-2 focus:ring-safety-orange outline-none transition-all placeholder:text-zinc-400"
                        value={tireWidth}
                        onChange={(e) => setTireWidth(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 ml-1">Perfil</label>
                      <input 
                        required
                        type="text"
                        inputMode="numeric" 
                        placeholder="Ex: 55" 
                        className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-xl px-4 font-bold focus:ring-2 focus:ring-safety-orange outline-none transition-all placeholder:text-zinc-400"
                        value={tireRatio}
                        onChange={(e) => setTireRatio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 ml-1">Aro</label>
                      <input 
                        required
                        type="text" 
                        inputMode="numeric"
                        placeholder="Ex: 16" 
                        className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-xl px-4 font-bold focus:ring-2 focus:ring-safety-orange outline-none transition-all placeholder:text-zinc-400"
                        value={tireRim}
                        onChange={(e) => setTireRim(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="group w-full h-16 bg-safety-orange hover:bg-orange-600 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-safety-orange/50 outline-none text-white rounded-xl font-display font-black text-lg tracking-tight flex items-center justify-center gap-3 shadow-xl shadow-safety-orange/30 transition-all">
                    SOLICITAR PREÇO <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-between gap-3 text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> Instal. Imediata</div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> Pronta Entrega</div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> Garantia</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <StatusBanner />

        {/* --- Product Tiers --- */}
        <section id="produtos" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-black text-asphalt-900 tracking-tight mb-4">Soluções para Todo Orçamento</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">Seja pelo desempenho premium ou pela economia extrema, temos o pneu certo para o seu veículo e para o seu bolso.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <div 
                  key={idx}
                  className={`relative flex flex-col p-8 rounded-3xl border transition-all hover:shadow-2xl hover:-translate-y-1 ${tier.color}`}>
                  {tier.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-safety-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      Mais Procurado
                    </div>
                  )}
                    <div className="mb-6">
                      {tier.image && (
                        <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100">
                          <img src={tier.image} alt={tier.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <span className="text-xs font-black text-safety-orange uppercase tracking-widest mb-1 block">{tier.badge}</span>
                      <h3 className="font-display text-2xl font-black text-asphalt-900 tracking-tight">{tier.name}</h3>
                    </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-semibold text-zinc-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-zinc-100">
                    <p className="text-xs font-bold text-zinc-400 uppercase mb-4 tracking-tighter">{tier.priceDesc}</p>
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá Barbosa Pneus! Gostaria de consultar o estoque para: ${tier.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all focus-visible:ring-4 focus-visible:ring-safety-orange/50 outline-none ${tier.popular ? 'bg-safety-orange text-white' : 'bg-asphalt-50 text-asphalt-900 hover:bg-asphalt-100'}`}>
                      Ver Estoque <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Services --- */}
        <section id="serviços" className="py-24 bg-asphalt-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="font-display text-4xl font-black text-asphalt-900 tracking-tight mb-6">Expertise em Pneus e Rodas</h2>
                <div className="grid gap-6">
                  {services.map((s, idx) => (
                    <div key={idx} className="flex gap-4 p-6 bg-white rounded-2xl border border-asphalt-100 shadow-sm transition-all hover:shadow-md">
                      <div className="shrink-0">{s.icon}</div>
                      <div>
                        <h4 className="font-bold text-asphalt-900">{s.title}</h4>
                        <p className="text-sm text-zinc-500">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-6 bg-safety-yellow/10 border border-safety-yellow/40 rounded-2xl">
                  <p className="text-sm font-bold text-asphalt-900">🎁 <span className="text-safety-orange">PROMOÇÃO LOCAL:</span> Compre 4 pneus novos ou TCP e ganhe a montagem e o balanceamento grátis!</p>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="aspect-square bg-asphalt-200 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={importedPremiumTires} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square bg-asphalt-100 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={remoldedEcoTires} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square bg-asphalt-100 rounded-3xl overflow-hidden shadow-2xl">
                  <img src={halfLifeTire} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Trust & Reviews --- */}
        <section className="py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl font-black text-asphalt-900 tracking-tight mb-4">Segurança Garantida</h2>
            <p className="text-zinc-500 mb-16 max-w-2xl mx-auto">Todos os nossos pneus passam por testes rigorosos de pressão e integridade estrutural antes de chegarem ao seu carro.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "João Silverio", comment: "Troca rápida e preço justo. Os pneus semi-novos estão ótimos, recomendo!", date: "2 semanas atrás" },
                { name: "Marcos L.", comment: "Pneu ecológico TCP me surpreendeu, rodei 10k km e estão perfeitos. Atendimento nota 10.", date: "1 mês atrás" },
                { name: "Ana Paula", comment: "Lugar de confiança. Montagem imediata, levei 20 minutos e já saí rodando.", date: "3 dias atrás" }
              ].map((rev, i) => (
                <div key={i} className="p-8 bg-zinc-50 rounded-3xl text-left border border-zinc-100">
                  <div className="flex gap-0.5 text-safety-yellow mb-4">
                    {[1,2,3,4,5].map(star => <Award key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-asphalt-900 font-medium italic mb-6">"{rev.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-asphalt-200 rounded-full flex items-center justify-center font-black text-asphalt-500 text-xs">{rev.name[0]}</div>
                    <div>
                      <p className="font-bold text-sm text-asphalt-900">{rev.name}</p>
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{rev.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Map & Contact --- */}
        <section id="localização" className="py-24 bg-asphalt-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl font-black tracking-tight mb-8">Onde Estamos</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl"><MapPin className="w-6 h-6 text-safety-orange" /></div>
                    <div>
                      <p className="font-bold text-xl mb-1">Rua Benedito da Fonseca, 693</p>
                      <p className="text-zinc-400">Jardim Santo Elias, São Paulo - SP</p>
                      <a href="https://www.google.com/maps/dir//Barbosa+pneus,+Rua+Benedito+da+Fonseca+Rondon,+693+-+Jardim+Santo+Elias,+S%C3%A3o+Paulo+-+SP,+05136-160/@-23.4981462,-46.7381793,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94cefecd2e9dcad3:0x41b545dd7b1a58d3!2m2!1d-46.7481966!2d-23.4996039?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-safety-orange font-bold mt-4 hover:underline">
                        <Navigation className="w-4 h-4" /> Abrir no Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl"><Clock className="w-6 h-6 text-safety-orange" /></div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm font-semibold">
                      <p className="text-zinc-400">Seg. a Qui.</p>
                      <p>08:00 - 18:30</p>
                      <p className="text-zinc-400">Sexta</p>
                      <p>08:00 - 17:30</p>
                      <p className="text-zinc-400">Sábado</p>
                      <p>08:00 - 16:00</p>
                      <p className="text-zinc-400">Domingo</p>
                      <p className="text-red-400">Fechado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl"><Phone className="w-6 h-6 text-safety-orange" /></div>
                    <div>
                      <p className="text-zinc-400 mb-1">Dúvidas? Chame no WhatsApp:</p>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-2xl font-black hover:text-safety-orange transition-colors">(11) 98774-4567</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video lg:aspect-square bg-zinc-800 rounded-[40px] overflow-hidden border border-white/10 group">
                 {/* Imagine a map here, using a placeholder image logic */}
                 <div className="absolute inset-0 bg-asphalt-800 flex flex-col items-center justify-center text-center p-10">
                    <MapPin className="w-16 h-16 text-safety-orange mb-6 animate-bounce" />
                    <h3 className="font-display text-2xl font-black mb-4">Veja Nossa Localização no Mapa</h3>
                    <p className="text-zinc-400 text-sm mb-8">Clique abaixo para navegar via Waze ou Google Maps até nossa loja.</p>
                    <a href="https://www.google.com/maps/dir//Barbosa+pneus,+Rua+Benedito+da+Fonseca+Rondon,+693+-+Jardim+Santo+Elias,+S%C3%A3o+Paulo+-+SP,+05136-160/@-23.4981462,-46.7381793,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94cefecd2e9dcad3:0x41b545dd7b1a58d3!2m2!1d-46.7481966!2d-23.4996039?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-asphalt-900 rounded-2xl font-black tracking-tight hover:bg-safety-orange hover:text-white transition-all">ABRIR ROTA AGORA</a>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-asphalt-900 border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-xs font-bold uppercase tracking-widest">
           <div className="flex items-center gap-2 grayscale brightness-200">
            <div className="p-1 px-2 bg-asphalt-700 rounded text-white font-black italic tracking-tighter text-sm">BARBOSA</div>
            <div className="font-display font-extrabold text-sm tracking-tight text-white">PNEUS</div>
          </div>
          <p>© 2026 Barbosa Pneus. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Políticas</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      {/* --- Sticky CTAs (Mobile Specific) --- */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] flex flex-row items-center gap-4"
          >
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-asphalt-900 text-white rounded-full border border-white/10 flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
              <Phone className="w-6 h-6" />
            </a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-transparent rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform overflow-hidden">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-[115%] h-[115%] max-w-none object-cover" referrerPolicy="no-referrer" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
