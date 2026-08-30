import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BurgerGlyph, ArrowUpIcon, CheckIcon } from '../icons/Icons';

export function RichFooter() {
  const { setLocationsOpen, setAboutOpen, showToast, scrollToSection } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Por favor introduce un correo electrónico válido');
      return;
    }
    setSubscribed(true);
    showToast('¡Cupón del 10% generado: CANGER10!');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="bg-[#1a110a] text-white pt-16 pb-12 border-t border-amber-900/30 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={scrollToTop}>
              <div className="size-11 rounded-2xl bg-[#ffd689] flex items-center justify-center text-black shadow-md">
                <BurgerGlyph className="w-7 h-7 text-black" />
              </div>
              <div>
                <span
                  className="text-2xl font-black tracking-tight uppercase block leading-none text-[#ffd689]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Canger
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/70">
                  Smash Burger Shop
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-6 max-w-sm leading-relaxed">
              Burgers made with passion, served with love. Crispy edges, melted cheese, and happiness in every single bite!
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-white">
              {['Facebook', 'Instagram', 'TikTok', 'X/Twitter', 'YouTube'].map((social, idx) => (
                <button
                  key={social}
                  onClick={() => showToast(`Visitando ${social}`)}
                  className="size-9 rounded-full bg-white/10 hover:bg-[#ffd689] hover:text-black flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                  title={social}
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              className="text-sm font-black uppercase tracking-wider text-[#ffd689] mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection('desktop-hero-top')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu-section')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Menu Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('combos-section')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Combos & Promos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('shakes-section')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Shakes & Postres
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLocationsOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Sucursales
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h4
              className="text-sm font-black uppercase tracking-wider text-[#ffd689] mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => showToast('Preguntas Frecuentes')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Política de Envíos Rápidos')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Garantía de Satisfacción 100%')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Garantía & Devoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Términos y Condiciones')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Política de Privacidad')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4
              className="text-sm font-black uppercase tracking-wider text-[#ffd689] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Newsletter
            </h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Subscribe and get <strong className="text-amber-300">10% OFF</strong> on your first order!
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¡Código activo: <strong>CANGER10</strong>!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ffd689]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#ffd689] hover:bg-[#ffe1a6] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} Canger Burger Shop. All Rights Reserved. Sabor inigualable.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
