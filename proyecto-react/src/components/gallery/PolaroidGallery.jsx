import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { validateImageFile } from '../../utils/security';

const DEFAULT_POLAROIDS = [
  {
    id: 1,
    url: '/cats/cat1.png',
    caption: 'Tú eres mi flor favorita 🌹🐾',
    rotation: '-3deg',
    date: '14 Feb'
  },
  {
    id: 2,
    url: '/cats/cat2.png',
    caption: 'Abrazaditos por siempre 💕✨',
    rotation: '4deg',
    date: 'Para Siempre'
  },
  {
    id: 3,
    url: '/cats/cat3.png',
    caption: 'Cupido gatito nos flechó 💘',
    rotation: '-2deg',
    date: 'Amor Eterno'
  },
  {
    id: 4,
    url: '/cats/cat4.png',
    caption: 'Una cartita especial para ti 💌',
    rotation: '3deg',
    date: 'San Valentín'
  }
];

export default function PolaroidGallery() {
  const [polaroids, setPolaroids] = useState(DEFAULT_POLAROIDS);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const handleAddPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación estricta con security.js
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      sound.playDodge();
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      const newPolaroid = {
        id: Date.now(),
        url: reader.result,
        caption: 'Nuestro momento mágico ✨',
        rotation: `${(Math.random() * 8 - 4).toFixed(1)}deg`,
        date: 'Hoy'
      };
      setPolaroids(prev => [newPolaroid, ...prev]);
      sound.playMatchSuccess();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full glass-card-strong p-6 md:p-10 text-center animate-slide-up mx-auto max-w-4xl flex flex-col items-center">
      
      {/* Encabezado */}
      <div className="inline-flex items-center gap-2 bg-rose-100/80 px-4 py-1.5 rounded-full mb-3 border border-rose-200">
        <span>📸</span>
        <span className="text-xs md:text-sm font-bold text-rose-800 font-outfit uppercase tracking-wider">
          Mural de Recuerdos & Gatitos
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        Nuestras Polaroids de Amor
      </h2>
      <p className="text-sm md:text-base text-rose-700 font-quicksand mb-6 max-w-md">
        Momentos tiernos que derriten el corazón. ¡Toca una foto para ampliarla o añade una vuestra!
      </p>

      {/* Botón de Añadir Foto Propia */}
      <div className="mb-8 flex flex-col items-center">
        <label className="btn-secondary text-xs sm:text-sm py-2 px-5 cursor-pointer shadow-md flex items-center gap-2">
          <span>📷</span> Añadir Foto Romántica
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleAddPhoto}
            style={{ display: 'none' }}
          />
        </label>
        {uploadError && (
          <p className="text-xs text-red-600 font-bold mt-2 bg-red-100 py-1 px-3 rounded-full border border-red-300 animate-slide-up">
            ⚠️ {uploadError}
          </p>
        )}
      </div>

      {/* Grid de Polaroids Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-4">
        {polaroids.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sound.playPop();
              setSelectedPhoto(item);
            }}
            className="polaroid-card cursor-pointer transform hover:scale-105 transition-all duration-300"
            style={{ transform: `rotate(${item.rotation})` }}
          >
            {/* Contenedor de Imagen */}
            <div className="w-full aspect-square overflow-hidden rounded-md bg-rose-50 mb-3 relative shadow-inner">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              <span className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-full font-mono">
                {item.date}
              </span>
            </div>

            {/* Pie de foto manuscrito */}
            <p className="text-rose-900 font-dancing text-xl font-bold truncate px-1">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Lightbox de Foto Ampliada */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 sm:p-6 rounded-2xl max-w-lg w-full text-center shadow-2xl animate-pop-in relative"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-rose-600 text-2xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
            >
              ✕
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full max-h-[65vh] object-contain rounded-xl mb-4 shadow-md mx-auto"
            />
            <p className="text-rose-900 font-dancing text-2xl md:text-3xl font-bold">
              {selectedPhoto.caption}
            </p>
            <span className="text-xs text-rose-500 font-quicksand block mt-1">
              {selectedPhoto.date} • Recuerdo Inolvidable 💕
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
