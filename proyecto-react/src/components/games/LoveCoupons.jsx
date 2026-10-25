import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { safeStorage } from '../../utils/security';

const INITIAL_COUPONS = [
  { id: 1, title: '💆‍♀️ Vale por un Masaje Relajante', desc: 'Sin límite de tiempo con aceites aromáticos y mimos.', icon: '💆‍♀️' },
  { id: 2, title: '🍰 Vale por tu Postre Favorito', desc: 'Válido para pedir el helado o tarta que se te antoje hoy mismo.', icon: '🍰' },
  { id: 3, title: '🎬 Vale por Control Remoto Total', desc: 'Tú eliges las películas y series de la noche sin objeción.', icon: '🍿' },
  { id: 4, title: '🤗 Vale por un Abrazo Infinito', desc: 'Abrazo de oso cálido y reconfortante cuando más lo necesites.', icon: '🧸' },
  { id: 5, title: '🍳 Desayuno Romántico a la Cama', desc: 'Cafecito, fruta y tus panqueques preferidos servidos con amor.', icon: '☕' },
  { id: 6, title: '👑 Vale Comodín: Deseo Cumplido', desc: 'Válido para cualquier capricho o aventura que desees realizar.', icon: '✨' }
];

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState(() => {
    return safeStorage.getJSON('sv_redeemed_coupons', []);
  });

  const handleRedeem = (id) => {
    if (redeemed.includes(id)) return;
    sound.playMatchSuccess();
    const updated = [...redeemed, id];
    setRedeemed(updated);
    safeStorage.setJSON('sv_redeemed_coupons', updated);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-4xl flex flex-col items-center">
      
      {/* Distintivo */}
      <div className="inline-flex items-center gap-2 bg-rose-100/90 border border-rose-300 py-1.5 px-4 rounded-full mb-3">
        <span>🎟️</span>
        <span className="text-xs sm:text-sm font-bold text-rose-900 font-outfit uppercase tracking-wider">
          Talonario de Cupones de Amor
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        Cupones Válidos por Siempre
      </h2>
      <p className="text-sm sm:text-base text-rose-700 font-quicksand mb-8 max-w-md">
        Canjea estos vales cuando quieras. ¡Tienen garantía de cumplimiento del 100%!
      </p>

      {/* Grid de Cupones Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {INITIAL_COUPONS.map((coupon) => {
          const isUsed = redeemed.includes(coupon.id);
          return (
            <div
              key={coupon.id}
              onClick={() => !isUsed && handleRedeem(coupon.id)}
              role="button"
              tabIndex={isUsed ? -1 : 0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !isUsed && handleRedeem(coupon.id); } }}
              className={`p-5 rounded-2xl border-2 border-dashed relative overflow-hidden transition-all duration-300 text-left flex flex-col justify-between min-h-[44px] ${
                isUsed
                  ? 'bg-gray-100/80 border-gray-300 opacity-60 cursor-default'
                  : 'bg-white/95 border-rose-300 shadow-md hover:shadow-xl hover:scale-102 active:scale-[0.97] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer'
              }`}
            >
              {/* Estampa de Canjeado */}
              {isUsed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="text-red-600 font-extrabold text-2xl border-4 border-red-600 px-4 py-1 rounded-xl uppercase tracking-widest font-outfit animate-stamp select-none">
                    CANJEADO
                  </span>
                </div>
              )}

              <div>
                <span className="text-3xl mb-2 block">{coupon.icon}</span>
                <h3 className="text-lg font-bold text-rose-900 font-outfit mb-1 break-words">
                  {coupon.title}
                </h3>
                <p className="text-xs text-rose-700 font-quicksand leading-relaxed break-words">
                  {coupon.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono">Sin caducidad</span>
                <span className={`text-xs font-bold ${isUsed ? 'text-gray-400' : 'text-rose-600'}`}>
                  {isUsed ? 'Utilizado' : 'Tocar para Canjear 👉'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
