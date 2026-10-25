import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';
import { validateImageFile, compressImageFile, safeStorage, sanitizeInput } from '../../utils/security';

const publicUrl = process.env.PUBLIC_URL || '';

const DEFAULT_CATS = [
  {
    id: 1,
    url: `${publicUrl}/cats/cat1.webp`,
    fallbackUrl: `${publicUrl}/cats/cat1.png`,
    caption: 'Tú eres mi flor más hermosa 🌹',
    date: 'Para Siempre',
    rotate: '-2deg',
    isDefault: true
  },
  {
    id: 2,
    url: `${publicUrl}/cats/cat2.webp`,
    fallbackUrl: `${publicUrl}/cats/cat2.png`,
    caption: 'Acurrucados en cada sueño 💕',
    date: 'Inseparables',
    rotate: '3deg',
    isDefault: true
  },
  {
    id: 3,
    url: `${publicUrl}/cats/cat3.webp`,
    fallbackUrl: `${publicUrl}/cats/cat3.png`,
    caption: 'El flechazo más tierno del mundo 💘',
    date: 'Destino',
    rotate: '-1.5deg',
    isDefault: true
  },
  {
    id: 4,
    url: `${publicUrl}/cats/cat4.webp`,
    fallbackUrl: `${publicUrl}/cats/cat4.png`,
    caption: 'Una cartita llena de ronroneos y amor 💌',
    date: 'Con Cariño',
    rotate: '2deg',
    isDefault: true
  }
];

export default function PolaroidGallery() {
  const [photos, setPhotos] = useState(() => {
    return safeStorage.getJSON('sv_custom_photos', DEFAULT_CATS);
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowIdx, setSlideshowIdx] = useState(0);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editCaptionText, setEditCaptionText] = useState('');
  const fileInputRef = useRef(null);

  // Slideshow automático
  useEffect(() => {
    let interval;
    if (isSlideshow && photos.length > 0) {
      interval = setInterval(() => {
        setSlideshowIdx(prev => (prev + 1) % photos.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, photos.length]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      sound.playPop();
      return;
    }

    try {
      setIsCompressing(true);
      // Compresión inteligente en Canvas: escala a máx 800px y genera JPEG de ~40KB
      const compressedDataUrl = await compressImageFile(file, 800, 800, 0.82);
      
      const newPhoto = {
        id: Date.now(),
        url: compressedDataUrl,
        caption: 'Nuestro momento especial ✨',
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        rotate: `${(Math.random() * 6 - 3).toFixed(1)}deg`,
        isDefault: false
      };

      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      safeStorage.setJSON('sv_custom_photos', updated);
      sound.playMatchSuccess();
    } catch (err) {
      setUploadError('Error al procesar la imagen. Intenta con otra foto.');
      sound.playPop();
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeletePhoto = (photoId, e) => {
    if (e) e.stopPropagation();
    sound.playPop();
    const updated = photos.filter(p => p.id !== photoId);
    setPhotos(updated);
    safeStorage.setJSON('sv_custom_photos', updated);
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const handleSaveCaption = () => {
    if (!selectedPhoto) return;
    sound.playMatchSuccess();
    const cleanCaption = sanitizeInput(editCaptionText, 80, selectedPhoto.caption);
    const updated = photos.map(p => p.id === selectedPhoto.id ? { ...p, caption: cleanCaption } : p);
    setPhotos(updated);
    safeStorage.setJSON('sv_custom_photos', updated);
    setSelectedPhoto({ ...selectedPhoto, caption: cleanCaption });
    setIsEditingCaption(false);
  };

  const handleResetPhotos = () => {
    sound.playPop();
    setPhotos(DEFAULT_CATS);
    safeStorage.setJSON('sv_custom_photos', DEFAULT_CATS);
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
        Fotografías y gatitos que capturan la ternura de nuestro amor. Sube tus fotos favoritas con optimización automática.
      </p>

      {/* Barra de Acciones Minimalista */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isCompressing}
          className="btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
        >
          {isCompressing ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Optimizando Foto...</span>
            </>
          ) : (
            <>
              <span>📷</span>
              <span>Añadir Nuestra Foto</span>
            </>
          )}
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
              setEditCaptionText(item.caption);
              setIsEditingCaption(false);
            }}
            className="tilt-card relative bg-white p-3.5 pb-5 rounded-xl shadow-md hover:shadow-2xl cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-103 active:scale-[0.97] group"
            style={{ transform: `rotate(${item.rotate})` }}
          >
            {/* Washi Tape decorativo en el borde superior */}
            <div className="washi-tape" />

            {/* Botón de eliminar foto personalizada */}
            {!item.isDefault && (
              <button
                onClick={(e) => handleDeletePhoto(item.id, e)}
                title="Eliminar foto"
                className="absolute top-2 right-2 z-20 bg-rose-600/90 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-rose-700 shadow-md"
              >
                ✕
              </button>
            )}

            <div className="w-full aspect-square rounded-lg overflow-hidden bg-rose-50 mb-3 relative">
              <picture>
                {item.url && item.url.endsWith('.webp') && (
                  <source srcSet={item.url} type="image/webp" />
                )}
                <img
                  src={item.url}
                  alt={item.caption}
                  width={400}
                  height={400}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackUrl && e.currentTarget.src !== item.fallbackUrl) {
                      e.currentTarget.src = item.fallbackUrl;
                    }
                  }}
                />
              </picture>
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
            className="relative max-w-lg w-full bg-white p-4 sm:p-6 rounded-3xl shadow-2xl animate-pop-in text-center flex flex-col items-center"
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
              className="w-full max-h-[60vh] object-cover rounded-2xl mb-4 shadow-sm"
            />

            {isEditingCaption ? (
              <div className="w-full flex flex-col gap-2 mt-1">
                <input
                  type="text"
                  value={editCaptionText}
                  maxLength={80}
                  onChange={(e) => setEditCaptionText(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-rose-300 rounded-xl font-quicksand focus:outline-rose-500 text-center"
                  placeholder="Escribe una dedicatoria..."
                  autoFocus
                />
                <div className="flex gap-2 justify-center">
                  <button onClick={handleSaveCaption} className="btn-primary text-xs py-1.5 px-4">
                    Guardar
                  </button>
                  <button onClick={() => setIsEditingCaption(false)} className="btn-secondary text-xs py-1.5 px-4">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 w-full">
                <p className="text-xl font-bold font-dancing text-rose-900">
                  {selectedPhoto.caption}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditCaptionText(selectedPhoto.caption);
                      setIsEditingCaption(true);
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold py-1 px-3 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors"
                  >
                    ✏️ Editar Dedicatoria
                  </button>
                  {!selectedPhoto.isDefault && (
                    <button
                      onClick={() => handleDeletePhoto(selectedPhoto.id)}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold py-1 px-3 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                    >
                      🗑️ Eliminar Foto
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Slideshow a Pantalla Completa */}
      {isSlideshow && photos.length > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
          <button
            onClick={() => setIsSlideshow(false)}
            className="absolute top-6 right-6 text-white text-2xl font-bold p-2 cursor-pointer hover:text-rose-400"
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
