import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { copyToClipboardSafe } from '../../utils/security';

export default function ShareModal({ recipientName = 'Luyuromo', senderName = 'Tu Amor', theme = 'romantic-pink', onClose }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(recipientName)}&sender=${encodeURIComponent(senderName)}&theme=${encodeURIComponent(theme)}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Dibujar un QR estilizado romántico con patrón de corazones
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);

    // Patrón pseudo-QR con acento romántico
    const size = 10;
    ctx.fillStyle = '#be123c';
    
    // Marcadores de esquina QR
    const drawCorner = (x, y) => {
      ctx.fillRect(x, y, 70, 70);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 10, 50, 50);
      ctx.fillStyle = '#be123c';
      ctx.fillRect(x + 20, y + 20, 30, 30);
    };

    drawCorner(15, 15);
    drawCorner(115, 15);
    drawCorner(15, 115);

    // Matriz de puntos aleatoria determinista
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 20; c++) {
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c > 11) ||
          (r > 11 && c < 8)
        ) continue;
        if ((r * 7 + c * 13 + 5) % 3 === 0) {
          ctx.fillRect(c * size, r * size, size - 2, size - 2);
        }
      }
    }

    // Corazón en el centro
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(100, 100, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', 100, 100);

  }, [shareUrl]);

  const handleCopyLink = async () => {
    sound.playPop();
    const success = await copyToClipboardSafe(shareUrl);
    if (success) {
      sound.playMatchSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    sound.playChime();
    const text = `¡Hola ${recipientName}! ❤️ Te he preparado una sorpresa mágica e interactiva de San Valentín con todo mi amor. Ábrela aquí: ${shareUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong max-w-md w-full p-6 md:p-8 text-center relative animate-pop-in flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-rose-600 text-xl font-bold cursor-pointer w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-gray-100"
        >
          ✕
        </button>

        <span className="text-3xl mb-1">📲</span>
        <h3 className="text-2xl md:text-3xl font-bold text-rose-900 font-pacifico mb-1 break-words max-w-full">
          Compartir con {recipientName}
        </h3>
        <p className="text-xs md:text-sm text-rose-700 font-quicksand mb-6">
          Escanea el código QR o envía el enlace directo para que abra la sorpresa en su móvil.
        </p>

        {/* QR Canvas */}
        <div className="p-3 bg-white rounded-2xl shadow-lg border border-rose-200 mb-6">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* Botones de Compartir */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3 px-4 rounded-full font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>💬</span> Enviar por WhatsApp
          </button>

          <button
            onClick={handleCopyLink}
            className="btn-secondary w-full py-2.5 text-sm"
          >
            {copied ? '✅ ¡Enlace Copiado al Portapapeles!' : '📋 Copiar Enlace Mágico'}
          </button>
        </div>

      </div>
    </div>
  );
}
