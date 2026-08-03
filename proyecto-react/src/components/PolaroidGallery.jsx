import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { validateImageFile } from '../utils/security';

export default function PolaroidGallery() {
  const initialMemories = [
    {
      id: 1,
      title: "Nuestra Primera Sonrisa 🌸",
      date: "Momentos Mágicos",
      rotation: "-3deg",
      svgBg: "linear-gradient(135deg, #fbcfe8 0%, #fda4af 100%)",
      icon: "✨",
      quote: "El instante exacto en que todo cobró sentido."
    },
    {
      id: 2,
      title: "Paseo Bajo la Luna 🌙",
      date: "Noches Estrelladas",
      rotation: "2deg",
      svgBg: "linear-gradient(135deg, #fed7aa 0%, #fecdd3 100%)",
      icon: "🌌",
      quote: "Bajo el mismo cielo, soñando juntos."
    },
    {
      id: 3,
      title: "Risas Incontrolables 😂",
      date: "Cómplices de Vida",
      rotation: "-2deg",
      svgBg: "linear-gradient(135deg, #fecaca 0%, #e9d5ff 100%)",
      icon: "💖",
      quote: "Esas carcajadas que nos curan el alma."
    },
    {
      id: 4,
      title: "Nuestro Futuro Juntos 🏡",
      date: "Por Siempre",
      rotation: "3deg",
      svgBg: "linear-gradient(135deg, #fde68a 0%, #fed7aa 100%)",
      icon: "🥂",
      quote: "Lo mejor de nuestra historia aún está por escribirse."
    }
  ];

  const [memories, setMemories] = useState(initialMemories);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = (id, e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    // Validación estricta de seguridad
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Archivo no permitido');
      sound.playDodge();
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      sound.playPop();
      setMemories(prev =>
        prev.map(item =>
          item.id === id ? { ...item, customImage: uploadEvent.target.result } : item
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="glass-card-strong p-8 md:p-12 animate-slide-up">
      <div className="text-center mb-10">
        <span className="text-4xl mb-2 inline-block">📸</span>
        <h3 className="text-3xl md:text-5xl font-bold text-rose-900 font-pacifico mb-2">
          Galería de Recuerdos Polaroid
        </h3>
        <p className="text-rose-700 font-quicksand text-base max-w-lg mx-auto">
          Momentos congelados en el tiempo. ¡Puedes hacer clic en cualquier marco para subir tus fotos reales de forma segura!
        </p>

        {uploadError && (
          <div className="mt-3 inline-block bg-red-100 border border-red-300 text-red-700 text-xs px-4 py-1.5 rounded-full font-bold">
            ⚠️ {uploadError}
          </div>
        )}
      </div>

      {/* Grid de Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
        {memories.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              sound.playPop();
              setSelectedPhoto(photo);
            }}
            className="polaroid-card cursor-pointer group"
            style={{ transform: `rotate(${photo.rotation})` }}
          >
            {/* Cinta adhesiva decorativa */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/80 backdrop-blur-sm border border-rose-300/60 shadow-sm rotate-2 z-10" />

            {/* Espacio de la Fotografía */}
            <div
              className="w-full aspect-square rounded-sm overflow-hidden mb-4 relative flex items-center justify-center border border-gray-100 shadow-inner"
              style={{ background: photo.customImage ? 'transparent' : photo.svgBg }}
            >
              {photo.customImage ? (
                <img
                  src={photo.customImage}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <span className="text-5xl block mb-2 group-hover:scale-125 transition-transform duration-300">
                    {photo.icon}
                  </span>
                  <span className="text-xs text-rose-800 font-bold uppercase tracking-wider font-quicksand bg-white/70 px-2 py-1 rounded">
                    Toca para cambiar foto
                  </span>
                </div>
              )}

              {/* Botón flotante para subir foto */}
              <label
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-lg text-xs"
              >
                📷
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => handleFileUpload(photo.id, e)}
                  className="hidden"
                />
              </label>
            </div>

            {/* Pie de foto manuscrito */}
            <div className="text-center pt-1">
              <h4 className="text-lg font-bold text-gray-800 font-dancing">
                {photo.title}
              </h4>
              <p className="text-xs text-gray-500 font-quicksand mt-0.5">
                {photo.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Imagen Ampliada */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 md:p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl animate-pop-in"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 flex items-center justify-center"
                 style={{ background: selectedPhoto.customImage ? 'transparent' : selectedPhoto.svgBg }}>
              {selectedPhoto.customImage ? (
                <img
                  src={selectedPhoto.customImage}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <span className="text-7xl block mb-3">{selectedPhoto.icon}</span>
                  <p className="text-rose-800 font-bold font-quicksand">Recuerdo Inolvidable</p>
                </div>
              )}
            </div>
            
            <h4 className="text-3xl font-bold text-rose-900 font-dancing mb-2">
              {selectedPhoto.title}
            </h4>
            <p className="text-gray-700 italic font-playfair text-lg mb-6">
              "{selectedPhoto.quote}"
            </p>

            <button
              onClick={() => setSelectedPhoto(null)}
              className="btn-primary text-sm px-6 py-2"
            >
              Cerrar 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
