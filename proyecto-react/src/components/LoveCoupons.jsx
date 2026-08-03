import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { confetti } from '../utils/confettiEngine';
import { SafeStorage } from '../utils/security';

export default function LoveCoupons() {
  const initialCoupons = [
    { id: 1, title: "Un Abrazo Infinito 🤗", desc: "Válido por un abrazo apretado y cariñoso que dure todo lo que necesites.", icon: "💖", code: "HUG-999" },
    { id: 2, title: "Masaje Relajante 💆‍♀️", desc: "Válido por una sesión completa de masajes de hombros y espalda con música zen.", icon: "🕯️", code: "SPA-100" },
    { id: 3, title: "Tú Eliges la Peli 🎬", desc: "Válido para elegir qué película ver hoy, con palomitas y sin quejas.", icon: "🍿", code: "MOV-555" },
    { id: 4, title: "Postre / Antojo Libre 🍨", desc: "Válido por cualquier helado, dona, café o capricho dulce que se te antoje.", icon: "🍰", code: "SWT-777" },
    { id: 5, title: "Pase de Reina 👑", desc: "Válido para ganar una discusión tonta o recibir mimos incondicionales hoy.", icon: "🏆", code: "QUEEN-1" },
    { id: 6, title: "Comodín Mágico 🌟", desc: "Válido por un deseo a tu libre elección (¡lo que tú quieras que esté a mi alcance!).", icon: "🪄", code: "GOLD-VIP" }
  ];

  const [redeemed, setRedeemed] = useState(() => {
    return SafeStorage.get('love_coupons_redeemed', []);
  });

  const handleRedeem = (id, e) => {
    if (redeemed.includes(id)) return;
    sound.playStamp();
    const newRedeemed = [...redeemed, id];
    setRedeemed(newRedeemed);
    SafeStorage.set('love_coupons_redeemed', newRedeemed);

    confetti.burst({
      x: e.clientX || window.innerWidth / 2,
      y: e.clientY || window.innerHeight / 2,
      count: 40
    });
  };

  const handleReset = () => {
    sound.playPop();
    setRedeemed([]);
    SafeStorage.remove('love_coupons_redeemed');
  };

  return (
    <div className="glass-card-strong p-8 md:p-12 animate-slide-up">
      <div className="text-center mb-8">
        <span className="text-4xl mb-2 inline-block">🎟️</span>
        <h3 className="text-3xl md:text-5xl font-bold text-rose-900 font-pacifico mb-2">
          Talonario de Cupones de Amor
        </h3>
        <p className="text-rose-700 font-quicksand text-base max-w-lg mx-auto">
          Canjea estos tickets dorados cuando quieras. ¡Tienen validez oficial y garantía de cumplimiento!
        </p>
      </div>

      {/* Grid de Cupones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {initialCoupons.map((coupon) => {
          const isUsed = redeemed.includes(coupon.id);
          return (
            <div
              key={coupon.id}
              className={`coupon-ticket p-6 flex flex-col justify-between relative shadow-md transition-all ${
                isUsed ? 'opacity-75 bg-gray-50 border-gray-400' : 'hover:-translate-y-1'
              }`}
            >
              {/* Círculos recortados estilo ticket */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-200 border-r border-rose-300" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-200 border-l border-rose-300" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{coupon.icon}</span>
                  <span className="text-xs font-mono font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded">
                    {coupon.code}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-rose-900 font-quicksand mb-2">
                  {coupon.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-quicksand">
                  {coupon.desc}
                </p>
              </div>

              {/* Sello de Canjeado o Botón */}
              <div className="pt-2">
                {isUsed ? (
                  <div className="text-center py-2 px-4 bg-emerald-100 border-2 border-emerald-500 text-emerald-800 font-extrabold rounded-xl font-outfit uppercase tracking-wider text-xs animate-stamp">
                    ✅ ¡Cupón Canjeado!
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleRedeem(coupon.id, e)}
                    className="w-full btn-primary text-sm py-2.5 shadow-md"
                  >
                    💖 Canjear Ahora
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón de reiniciar cupones */}
      {redeemed.length > 0 && (
        <div className="text-center pt-4 border-t border-rose-200">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline transition-colors"
          >
            🔄 Restaurar todos los cupones para volver a usarlos
          </button>
        </div>
      )}
    </div>
  );
}
