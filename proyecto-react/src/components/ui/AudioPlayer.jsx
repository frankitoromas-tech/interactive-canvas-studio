import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sound, ROMANTIC_PLAYLIST } from '../../utils/soundEffects';
import { validateAudioFile } from '../../utils/security';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'custom', label: '⭐ Mis Canciones Subidas' },
  { id: 'piano', label: '🎹 Piano Romántico' },
  { id: 'acustico', label: '🕊️ Clásico & Acústico' },
  { id: 'procedural', label: '✨ Mágicas & Lofi' }
];

export default function AudioPlayer() {
  const [playerState, setPlayerState] = useState(() => ({
    isPlaying: sound.isPlaying,
    currentTrackId: sound.currentTrackId,
    volume: sound.volume,
    isMuted: sound.isMuted,
    isLooping: sound.isLooping || false,
    isShuffle: sound.isShuffle || false,
    currentTime: sound.currentTime,
    duration: sound.duration,
    currentTrack: sound.getCurrentTrackInfo(),
    customTracks: sound.customTracks || []
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('playlist'); // 'playlist' | 'upload'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = sound.subscribe((newState) => {
      setPlayerState({ ...newState });
    });
    return () => unsubscribe();
  }, []);

  const togglePlay = () => {
    sound.playPop();
    sound.toggleBGM();
  };

  const handleTrackSelect = (trackId) => {
    sound.playPop();
    sound.setTrack(trackId);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    sound.setVolume(val);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    sound.seekTo(val);
  };

  const processAudioFile = (file) => {
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Archivo no compatible. Por favor sube un MP3 o WAV.');
      sound.playDodge();
      setTimeout(() => setUploadError(''), 5000);
      return;
    }

    const success = sound.loadCustomAudioFile(file);
    if (success) {
      sound.playChime();
      setUploadError('');
      setUploadSuccessMsg(`¡"${file.name}" cargada y reproduciéndose con éxito! 🎶`);
      setTimeout(() => setUploadSuccessMsg(''), 5000);
    } else {
      setUploadError('No se pudo decodificar el archivo de audio.');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    processAudioFile(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    processAudioFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const allAvailableTracks = useMemo(() => {
    return sound.getAllTracks();
  }, [playerState.customTracks, playerState.currentTrackId]);

  const currentTrack = playerState.currentTrack || ROMANTIC_PLAYLIST[0];

  // Lista filtrada por búsqueda y categoría
  const filteredTracks = useMemo(() => {
    return allAvailableTracks.filter(track => {
      const matchesCat = selectedCategory === 'all' || 
        (selectedCategory === 'custom' ? track.isCustom : track.category === selectedCategory);
      
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query) ||
        (track.tag && track.tag.toLowerCase().includes(query));

      return matchesCat && matchesQuery;
    });
  }, [allAvailableTracks, searchQuery, selectedCategory]);

  return (
    <>
      {/* ========================================================= */}
      {/* 1. BARRA FLOTANTE COMPACTA Y MODERNA (MINI-PLAYER)       */}
      {/* ========================================================= */}
      <aside 
        aria-label="Reproductor de música flotante"
        className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40 flex items-center gap-2 select-none font-outfit"
      >
        <div className="glass-card-strong px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-rose-300/80 bg-white/95 backdrop-blur-xl">
          
          {/* Botón Play / Pausa */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md flex items-center justify-center text-sm hover:scale-105 active:scale-[0.94] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 cursor-pointer"
            title={playerState.isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {playerState.isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* Información y Título */}
          <div 
            onClick={() => {
              sound.playPop();
              setIsModalOpen(true);
            }}
            className="flex flex-col items-start text-left max-w-[120px] sm:max-w-[170px] cursor-pointer group"
            title="Abrir gestor de música"
          >
            <div className="flex items-center gap-1 w-full">
              <span className="text-[11px] font-bold text-rose-950 truncate group-hover:text-rose-600 transition-colors">
                {currentTrack.title}
              </span>
            </div>
            <span className="text-[9px] text-rose-600 truncate font-quicksand font-medium">
              {currentTrack.artist}
            </span>
          </div>

          {/* Ecualizador / Indicador reactivo */}
          {playerState.isPlaying && (
            <div className="flex items-end gap-0.5 h-3.5 px-0.5">
              <span className="w-1 bg-rose-500 rounded-full animate-bounce h-full" style={{ animationDuration: '0.45s' }} />
              <span className="w-1 bg-rose-600 rounded-full animate-bounce h-2" style={{ animationDuration: '0.3s' }} />
              <span className="w-1 bg-pink-500 rounded-full animate-bounce h-3" style={{ animationDuration: '0.6s' }} />
            </div>
          )}

          {/* Botón Siguiente Canción Rápido */}
          <button
            onClick={() => {
              sound.playPop();
              sound.nextTrack();
            }}
            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-100/80 transition-colors text-xs cursor-pointer"
            title="Siguiente pista"
          >
            ⏭️
          </button>

          {/* Botón Abrir Gestor / Subir MP3 */}
          <button
            onClick={() => {
              sound.playPop();
              setIsModalOpen(true);
            }}
            className="p-1.5 rounded-xl bg-pink-100/90 hover:bg-pink-200 text-pink-950 font-bold text-[11px] flex items-center gap-1 transition-all border border-pink-300/80 shadow-xs cursor-pointer"
            title="Gestionar lista de música y subir canciones originales"
          >
            <span>🎼</span>
            <span className="hidden md:inline">Música</span>
          </button>

        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MODAL CENTRADO: GESTOR DE MÚSICA & REPRODUCTOR PRO      */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-card-strong w-full max-w-lg rounded-3xl shadow-2xl border border-rose-300 bg-white/98 backdrop-blur-2xl flex flex-col max-h-[90vh] overflow-hidden animate-pop-in text-left"
          >
            
            {/* Header del Modal */}
            <div className="p-4 sm:p-5 border-b border-rose-200/80 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-2 bg-white rounded-2xl shadow-sm border border-rose-200">
                  💖
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-rose-950 font-cinzel">
                    Estudio de Música Romántica
                  </h3>
                  <p className="text-[11px] text-rose-600 font-medium font-quicksand">
                    Escucha melodías clásicas o sube tu propia canción original (MP3)
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  setIsModalOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold flex items-center justify-center text-sm transition-colors cursor-pointer"
                title="Cerrar reproductor"
              >
                ✕
              </button>
            </div>

            {/* Pestañas de Navegación */}
            <div className="flex border-b border-rose-200/80 bg-rose-50/50 px-4 pt-2 gap-2 flex-shrink-0">
              <button
                onClick={() => setActiveTab('playlist')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'playlist'
                    ? 'border-rose-500 text-rose-900'
                    : 'border-transparent text-rose-600 hover:text-rose-900'
                }`}
              >
                <span>🎶</span>
                <span>Playlist & Controles</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'border-rose-500 text-rose-900'
                    : 'border-transparent text-rose-600 hover:text-rose-900'
                }`}
              >
                <span>📂</span>
                <span>Subir Mi Canción (MP3)</span>
                {sound.customTracks.length > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded-full">
                    {sound.customTracks.length}
                  </span>
                )}
              </button>
            </div>

            {/* Contenido Principal con Scroll */}
            <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar flex-1 space-y-4">
              
              {/* TARJETA DE REPRODUCCIÓN ACTUAL (PRESENTE EN TODO MOMENTO) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-rose-200/20 border border-rose-200/90 shadow-sm flex flex-col gap-3">
                
                <div className="flex items-center gap-3">
                  {/* Carátula de disco giratorio */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0 border-2 border-rose-300 bg-black/10">
                    <img
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      className={`w-full h-full object-cover ${playerState.isPlaying ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '7s' }}
                    />
                    <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white border border-rose-400 flex items-center justify-center text-[8px]">
                      ❤️
                    </div>
                  </div>

                  {/* Datos de la pista */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 uppercase">
                      {currentTrack.tag || 'Canción Actual'}
                    </span>
                    <h4 className="text-sm font-bold text-rose-950 truncate mt-1" title={currentTrack.title}>
                      {currentTrack.title}
                    </h4>
                    <p className="text-xs text-rose-700 truncate font-quicksand font-semibold">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                {/* Barra de progreso de tiempo (Seeker) */}
                <div className="flex flex-col gap-1">
                  <input
                    type="range"
                    min="0"
                    max={playerState.duration || 100}
                    step="1"
                    value={playerState.currentTime || 0}
                    onChange={handleSeek}
                    className="w-full accent-rose-500 h-1.5 bg-rose-200 rounded-lg cursor-pointer transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-rose-700 font-bold">
                    <span>{formatTime(playerState.currentTime)}</span>
                    <span>{formatTime(playerState.duration)}</span>
                  </div>
                </div>

                {/* Controles de reproducción principales */}
                <div className="flex items-center justify-between pt-1">
                  
                  {/* Aleatorio */}
                  <button
                    onClick={() => {
                      sound.playPop();
                      sound.toggleShuffle();
                    }}
                    className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                      playerState.isShuffle ? 'bg-rose-500 text-white shadow-xs' : 'text-rose-600 hover:bg-rose-100'
                    }`}
                    title={playerState.isShuffle ? "Modo aleatorio activado" : "Activar modo aleatorio"}
                  >
                    🔀
                  </button>

                  <div className="flex items-center gap-3">
                    {/* Anterior */}
                    <button
                      onClick={() => {
                        sound.playPop();
                        sound.prevTrack();
                      }}
                      className="w-9 h-9 rounded-full bg-white text-rose-800 shadow-sm border border-rose-200 hover:bg-rose-50 flex items-center justify-center text-sm cursor-pointer transition-transform active:scale-95"
                      title="Canción anterior"
                    >
                      ⏮️
                    </button>

                    {/* Play / Pause Principal */}
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={playerState.isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {playerState.isPlaying ? '⏸️' : '▶️'}
                    </button>

                    {/* Siguiente */}
                    <button
                      onClick={() => {
                        sound.playPop();
                        sound.nextTrack();
                      }}
                      className="w-9 h-9 rounded-full bg-white text-rose-800 shadow-sm border border-rose-200 hover:bg-rose-50 flex items-center justify-center text-sm cursor-pointer transition-transform active:scale-95"
                      title="Siguiente canción"
                    >
                      ⏭️
                    </button>
                  </div>

                  {/* Repetir */}
                  <button
                    onClick={() => {
                      sound.playPop();
                      sound.toggleLoop();
                    }}
                    className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                      playerState.isLooping ? 'bg-rose-500 text-white shadow-xs' : 'text-rose-600 hover:bg-rose-100'
                    }`}
                    title={playerState.isLooping ? "Repetición activada" : "Activar repetición"}
                  >
                    🔂
                  </button>
                </div>

                {/* Control de Volumen */}
                <div className="flex items-center gap-2.5 pt-1 bg-white/70 p-2 rounded-xl border border-rose-200/60">
                  <button
                    onClick={() => sound.toggleMute()}
                    className="text-xs text-rose-800 hover:scale-110 cursor-pointer"
                    title={playerState.isMuted ? "Desilenciar" : "Silenciar"}
                  >
                    {playerState.isMuted || playerState.volume === 0 ? '🔇' : '🔊'}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={playerState.isMuted ? 0 : playerState.volume}
                    onChange={handleVolume}
                    className="w-full accent-rose-500 h-1.5 bg-rose-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-rose-800 w-8 text-right">
                    {Math.round((playerState.isMuted ? 0 : playerState.volume) * 100)}%
                  </span>
                </div>

              </div>

              {/* CONTENIDO SEGÚN PESTAÑA */}
              {activeTab === 'playlist' ? (
                <div className="space-y-3">
                  
                  {/* Buscador de Pistas */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="🔍 Buscar por título, compositor o género..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:border-rose-400 text-rose-950 placeholder:text-rose-300 shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2 text-xs text-rose-400 hover:text-rose-700 font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Filtros de Categoría */}
                  <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          sound.playPop();
                          setSelectedCategory(cat.id);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-rose-100/70 text-rose-900 hover:bg-rose-200/80'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Lista de Canciones */}
                  <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                    {filteredTracks.length === 0 ? (
                      <div className="text-center py-6 text-xs text-rose-400 font-semibold bg-rose-50/50 rounded-2xl border border-dashed border-rose-200">
                        No se encontraron canciones con ese filtro.
                      </div>
                    ) : (
                      filteredTracks.map(track => {
                        const isSelected = playerState.currentTrackId === track.id;
                        return (
                          <div
                            key={track.id}
                            onClick={() => handleTrackSelect(track.id)}
                            className={`p-2.5 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-sm border-rose-600 scale-101'
                                : 'bg-white text-rose-950 hover:bg-rose-50/80 border-rose-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate pr-2">
                              <span className="text-base flex-shrink-0">
                                {track.isCustom ? '⭐' : (isSelected && playerState.isPlaying ? '🎶' : '🎵')}
                              </span>
                              <div className="truncate">
                                <div className="text-xs font-bold truncate">
                                  {track.title}
                                </div>
                                <div className={`text-[10px] truncate ${isSelected ? 'text-rose-100' : 'text-gray-500'}`}>
                                  {track.artist}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {track.tag || 'Melodía'}
                              </span>

                              {track.isCustom && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sound.removeCustomTrack(track.id);
                                  }}
                                  className="text-xs p-1 text-rose-300 hover:text-white cursor-pointer"
                                  title="Eliminar de la lista"
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              ) : (
                /* PESTAÑA: SUBIR MP3 PROPIO */
                <div className="space-y-4">
                  
                  {/* Dropzone interactiva */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-6 sm:p-8 rounded-3xl border-2 border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                      isDraggingFile
                        ? 'border-rose-500 bg-rose-100/80 scale-102'
                        : 'border-rose-300 bg-rose-50/60 hover:bg-rose-100/50 hover:border-rose-400'
                    }`}
                  >
                    <span className="text-4xl animate-bounce">📁</span>
                    <div>
                      <h4 className="text-sm font-bold text-rose-950 font-cinzel">
                        Arrastra o haz clic para subir tu canción MP3
                      </h4>
                      <p className="text-xs text-rose-600 font-quicksand font-medium mt-1">
                        Sube tu versión original favorita (Rata Blanca, Lady Gaga, Bruno Mars, o su canción especial).
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-2 btn-primary text-xs px-4 py-2"
                    >
                      Seleccionar Archivo de Audio 🎵
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>

                  {uploadSuccessMsg && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center animate-fade-in">
                      {uploadSuccessMsg}
                    </div>
                  )}

                  {uploadError && (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold text-center animate-shake">
                      {uploadError}
                    </div>
                  )}

                  {/* Lista de Canciones Personalizadas Subidas */}
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-rose-200">
                    <h5 className="text-xs font-bold text-rose-900 mb-2 flex items-center justify-between">
                      <span>Tus Canciones Subidas ({sound.customTracks.length})</span>
                      <span className="text-[10px] text-rose-500 font-normal">Se guardan en tu sesión</span>
                    </h5>

                    {sound.customTracks.length === 0 ? (
                      <p className="text-xs text-rose-400 text-center py-3 font-medium">
                        Aún no has subido canciones. ¡Sube tu primer MP3 arriba!
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                        {sound.customTracks.map(track => (
                          <div
                            key={track.id}
                            className="p-2 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-between text-xs"
                          >
                            <div className="truncate pr-2">
                              <span className="font-bold text-rose-950 block truncate">{track.title}</span>
                              <span className="text-[10px] text-rose-600 font-quicksand">Archivo cargado en memoria</span>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleTrackSelect(track.id)}
                                className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Reproducir ▶
                              </button>
                              <button
                                onClick={() => sound.removeCustomTrack(track.id)}
                                className="p-1 text-rose-400 hover:text-rose-700 cursor-pointer"
                                title="Eliminar"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Footer Informativo */}
            <div className="p-3 bg-rose-50/80 border-t border-rose-200/80 text-center text-[10px] text-rose-700 font-quicksand font-semibold flex-shrink-0">
              💡 Consejo: Puedes minimizar el reproductor y la música seguirá sonando mientras navegas por la carta.
            </div>

          </div>
        </div>
      )}
    </>
  );
}
