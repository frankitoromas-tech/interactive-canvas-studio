import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';
import { validateImageFile, safeStorage } from '../../utils/security';

const DEFAULT_CATS = [
  {
    id: 1,
    url: '/cats/cat1.png',
    caption: 'Tú eres mi flor más hermosa 🌹',
    date: 'Para Siempre',
    rotate: '-2deg'
  },
  {
    id: 2,
    url: '/cats/cat2.png',
    caption: 'Acurrucados en cada sueño 💕',
    date: 'Inseparables',
    rotate: '3deg'
  },
  {
    id: 3,
    url: '/cats/cat3.png',
    caption: 'El flechazo más tierno del mundo 💘',
    date: 'Destino',
    rotate: '-1.5deg'
  },
  {
    id: 4,
    url: '/cats/cat4.png',
    caption: 'Una cartita llena de ronroneos y amor 💌',
    date: 'Con Cariño',
    rotate: '2deg'
  }
];

export default function PolaroidGallery() {
  const [photos, setPhotos] = useState(() => {
    const saved = safeStorage.getItem('sv_custom_photos');
    return saved ? JSON.parse(saved) : DEFAULT_CATS;
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowIdx, setSlideshowIdx] = useState(0);
  const fileInputRef = useRef(null);

  // Slideshow automático
  useEffect(() => {
    let interval;
    if (isSlideshow) {
      interval = setInterval(() => {
        setSlideshowIdx(prev => (prev + 1) % photos.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, photos.length]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      sound.playPop();
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const newPhoto = {
        id: Date.now(),
        url: uploadEvent.target.result,
        caption: 'Nuestro momento especial ✨',
        date: 'Hoy',
        rotate: `${(Math.random() * 6 - 3).toFixed(1)}deg`
      };
      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      safeStorage.setItem('sv_custom_photos', JSON.stringify(updated));
      sound.playMatchSuccess();
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhotos = () => {
    sound.playPop();
    setPhotos(DEFAULT_CATS);
    safeStorage.setItem('sv_custom_photos', JSON.stringify(DEFAULT_CATS));
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-5xl flex flex-col items-center">
      
      {/* Distintivo Minimalista */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-3">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          🐱 Álbum de Gatitos & Recuerdos
        </span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-rose-950 font-pacifico mb-1">
        Mural de Momentos Inolvidables
      </h2>
      <p className="text-xs sm:text-base text-rose-700/90 font-quicksand mb-6 max-w-lg">
        Fotografías y gatitos que capturan la ternura de nuestro amor. Toca cualquier foto para ampliarla.
      </p>

      {/* Barra de Acciones Minimalista */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary text-xs py-2 px-4 shadow-sm"
        >
          📷 Añadir Nuestra Foto
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          onClick={() => {
            sound.playPop();
            setIsSlideshow(s => !s);
          }}
          className={`btn-secondary text-xs py-2 px-4 ${
            isSlideshow ? 'bg-rose-500 text-white border-rose-500 font-bold' : ''
          }`}
        >
          {isSlideshow ? '⏹️ Detener Pase' : '▶️ Pase de Fotos'}
        </button>

        {photos.length > DEFAULT_CATS.length && (
          <button
            onClick={handleResetPhotos}
            className="text-xs text-rose-600 hover:text-rose-800 py-1.5 px-3 rounded-full hover:bg-rose-50 cursor-pointer"
          >
            Restaurar Gatitos
          </button>
        )}
      </div>

      {uploadError && (
        <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 py-1.5 px-4 rounded-xl border border-red-200 animate-shake">
          {uploadError}
        </div>
      )}

      {/* Grid de Polaroids con 3D Tilt y Washi Tape */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sound.playPop();
              setSelectedPhoto(item);
            }}
            className="tilt-card relative bg-white p-3.5 pb-5 rounded-xl shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-103"
            style={{ transform: `rotate(${item.rotate})` }}
          >
            {/* Washi Tape decorativo en el borde superior */}
            <div className="washi-tape" />

            <div className="w-full aspect-square rounded-lg overflow-hidden bg-rose-50 mb-3 relative group">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <div className="shine-overlay" />
            </div>

            <p className="text-sm font-dancing text-rose-950 font-bold line-clamp-2 px-1 text-center">
              {item.caption}
            </p>
            <span className="text-[10px] text-gray-400 font-quicksand font-semibold block mt-1">
              {item.date}
            </span>
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
            className="relative max-w-lg w-full bg-white p-4 sm:p-6 rounded-3xl shadow-2xl animate-pop-in text-center"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full max-h-[65vh] object-cover rounded-2xl mb-4 shadow-sm"
            />
            <p className="text-xl font-bold font-dancing text-rose-900">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* Modal de Slideshow a Pantalla Completa */}
      {isSlideshow && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
          <button
            onClick={() => setIsSlideshow(false)}
            className="absolute top-6 right-6 text-white text-2xl font-bold p-2 cursor-pointer"
          >
            ✕
          </button>
          <div className="max-w-2xl w-full text-center">
            <img
              key={photos[slideshowIdx].id}
              src={photos[slideshowIdx].url}
              alt={photos[slideshowIdx].caption}
              className="w-full max-h-[70vh] object-contain rounded-2xl mx-auto shadow-2xl animate-fade-in"
            />
            <p className="text-2xl font-dancing text-rose-200 mt-4 font-bold">
              {photos[slideshowIdx].caption}
            </p>
            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === slideshowIdx ? 'bg-rose-500 w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
