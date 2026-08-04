import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sound, ROMANTIC_PLAYLIST } from '../../utils/soundEffects';
import { validateAudioFile } from '../../utils/security';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'rock', label: '🎸 Rock Baladas' },
  { id: 'pop', label: '💖 Pop Romántico' },
  { id: 'acustico', label: '🕊️ Acústico' },
  { id: 'piano', label: '🎹 Piano & Lofi' }
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
    currentTrack: sound.getCurrentTrackInfo()
  }));

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadError, setUploadError] = useState('');
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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Archivo no válido.');
      sound.playDodge();
      setTimeout(() => setUploadError(''), 4000);
      return;
    }

    const success = sound.loadCustomAudioFile(file);
    if (success) {
      sound.playChime();
      setUploadError('');
    } else {
      setUploadError('No se pudo cargar el audio.');
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentTrack = playerState.currentTrack || ROMANTIC_PLAYLIST[0];

  // Lista filtrada por búsqueda y categoría
  const filteredPlaylist = useMemo(() => {
    return ROMANTIC_PLAYLIST.filter(track => {
      const matchesCat = selectedCategory === 'all' || track.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query) ||
        (track.tag && track.tag.toLowerCase().includes(query));
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 select-none font-outfit">
      
      {/* PANEL EXPANDIDO ESTILO MINI-SPOTIFY ROMÁNTICO */}
      {isExpanded && (
        <div className="glass-card-strong p-4 rounded-3xl shadow-2xl mb-2 w-80 sm:w-88 animate-pop-in border border-rose-300/80 backdrop-blur-xl bg-white/95 max-h-[85vh] flex flex-col">
          
          {/* Cabecera del Reproductor */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-200/60 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎵</span>
              <div>
                <span className="text-xs font-bold text-rose-950 uppercase tracking-wider font-cinzel block">
                  Serenata Romántica
                </span>
                <span className="text-[9px] text-rose-600 font-semibold">
                  {ROMANTIC_PLAYLIST.length} éxitos listos para sonar
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                setIsExpanded(false);
              }}
              className="text-xs text-rose-400 hover:text-rose-700 font-bold p-1 rounded-full hover:bg-rose-100 transition-colors"
              title="Minimizar reproductor"
            >
              ✕
            </button>
          </div>

          {/* Tarjeta de Canción Actual con Vinilo */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50/50 border border-rose-200/70 mb-2.5 shadow-inner flex-shrink-0">
            
            {/* Vinilo / Carátula Giratoria */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0 border-2 border-rose-300">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className={`w-full h-full object-cover ${playerState.isPlaying ? 'animate-spin' : ''}`}
                style={{ animationDuration: '8s' }}
              />
              <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white border border-rose-400 flex items-center justify-center text-[8px]">
                💖
              </div>
            </div>

            {/* Info de la Pista */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-200/80 text-rose-800">
                  {currentTrack.tag || 'Romance'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-rose-950 truncate mt-0.5" title={currentTrack.title}>
                {currentTrack.title}
              </h4>
              <p className="text-[11px] text-rose-700/80 truncate font-quicksand font-medium">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Barra de Progreso y Tiempo (Seeker) */}
          {playerState.duration > 0 && (
            <div className="mb-2 px-1 flex-shrink-0">
              <input
                type="range"
                min="0"
                max={playerState.duration || 100}
                step="1"
                value={playerState.currentTime || 0}
                onChange={handleSeek}
                className="w-full accent-rose-500 h-1.5 bg-rose-200 rounded-lg cursor-pointer transition-all"
              />
              <div className="flex justify-between text-[10px] text-rose-700/70 font-semibold mt-0.5">
                <span>{formatTime(playerState.currentTime)}</span>
                <span>{formatTime(playerState.duration)}</span>
              </div>
            </div>
          )}

          {/* Controles de Reproducción Principales + Loop & Shuffle */}
          <div className="flex items-center justify-between px-2 mb-2 flex-shrink-0">
            {/* Botón Aleatorio (Shuffle) */}
            <button
              onClick={() => {
                sound.playPop();
                sound.toggleShuffle();
              }}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                playerState.isShuffle ? 'bg-rose-500 text-white shadow-sm scale-105' : 'text-rose-400 hover:text-rose-700'
              }`}
              title={playerState.isShuffle ? "Modo aleatorio activado" : "Activar modo aleatorio"}
            >
              🔀
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playPop();
                  sound.prevTrack();
                }}
                className="p-2 rounded-full text-rose-700 hover:bg-rose-100/80 transition-transform active:scale-90"
                title="Canción anterior"
              >
                ⏮️
              </button>

              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all"
                title={playerState.isPlaying ? "Pausar" : "Reproducir"}
              >
                {playerState.isPlaying ? '⏸️' : '▶️'}
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  sound.nextTrack();
                }}
                className="p-2 rounded-full text-rose-700 hover:bg-rose-100/80 transition-transform active:scale-90"
                title="Siguiente canción"
              >
                ⏭️
              </button>
            </div>

            {/* Botón Repetir (Loop) */}
            <button
              onClick={() => {
                sound.playPop();
                sound.toggleLoop();
              }}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                playerState.isLooping ? 'bg-rose-500 text-white shadow-sm scale-105' : 'text-rose-400 hover:text-rose-700'
              }`}
              title={playerState.isLooping ? "Repetición activada" : "Repetir canción actual"}
            >
              🔂
            </button>
          </div>

          {/* Control de Volumen */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-rose-50/80 border border-rose-200/50 mb-2 flex-shrink-0">
            <button
              onClick={() => sound.toggleMute()}
              className="text-xs text-rose-700 hover:scale-110"
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
            <span className="text-[10px] font-bold text-rose-700 w-7 text-right">
              {Math.round((playerState.isMuted ? 0 : playerState.volume) * 100)}%
            </span>
          </div>

          {/* Buscador de Canciones */}
          <div className="mb-2 flex-shrink-0 relative">
            <input
              type="text"
              placeholder="🔍 Buscar canción o artista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[11px] px-2.5 py-1.5 rounded-xl border border-rose-200/80 bg-white focus:outline-none focus:border-rose-400 text-rose-900 placeholder:text-rose-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-xs text-rose-400 hover:text-rose-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros por Categoría */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1.5 mb-1.5 flex-shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat.id);
                }}
                className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-rose-100/70 text-rose-900 hover:bg-rose-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Playlist de Canciones con Scroll */}
          <div className="flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar mb-2 max-h-40 flex-1">
            {filteredPlaylist.length === 0 ? (
              <div className="text-center py-4 text-xs text-rose-400 font-medium">
                No se encontraron canciones con ese nombre.
              </div>
            ) : (
              filteredPlaylist.map(track => {
                const isSelected = playerState.currentTrackId === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(track.id)}
                    className={`text-left p-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-500 text-white font-bold shadow-sm'
                        : 'bg-white/80 text-rose-900 hover:bg-rose-100/70 border border-rose-100'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate text-[11px] font-semibold">{track.title}</div>
                      <div className={`text-[9px] truncate ${isSelected ? 'text-rose-100' : 'text-gray-500'}`}>
                        {track.artist}
                      </div>
                    </div>
                    {isSelected && playerState.isPlaying && (
                      <span className="text-xs animate-bounce">🎶</span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Subir MP3 Personalizado */}
          <div className="pt-2 border-t border-rose-200/60 flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => {
                sound.playPop();
                fileInputRef.current?.click();
              }}
              className="w-full py-1.5 px-2.5 rounded-xl bg-pink-100/80 hover:bg-pink-200 text-rose-900 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-pink-300/60 transition-colors shadow-sm cursor-pointer"
            >
              <span>📂</span>
              <span>Subir mi canción favorita (MP3)</span>
            </button>
            {uploadError && (
              <p className="text-[10px] text-rose-600 font-semibold text-center mt-1">
                {uploadError}
              </p>
            )}
          </div>

        </div>
      )}

      {/* BOTÓN FLOTANTE PRINCIPAL MINIMALISTA */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="glass-pill px-3.5 py-2 shadow-xl flex items-center gap-2 text-rose-900 font-bold text-xs hover:bg-white transition-all border border-rose-300/80 bg-white/90"
          title={playerState.isPlaying ? "Pausar serenata" : "Reproducir canción romántica"}
        >
          <span className="text-sm">{playerState.isPlaying ? '⏸️' : '🎵'}</span>
          
          <div className="flex flex-col items-start text-left max-w-[130px] sm:max-w-[160px]">
            <span className="text-[11px] font-bold truncate leading-tight">
              {currentTrack.title}
            </span>
            <span className="text-[9px] text-rose-600 truncate font-quicksand font-medium leading-tight">
              {playerState.isPlaying ? currentTrack.artist : 'Toca para escuchar'}
            </span>
          </div>
          
          {/* Ecualizador animado */}
          {playerState.isPlaying && (
            <div className="flex items-end gap-0.5 h-3.5 ml-1">
              <span className="w-1 bg-rose-500 rounded-full animate-bounce h-full" style={{ animationDuration: '0.5s' }} />
              <span className="w-1 bg-rose-600 rounded-full animate-bounce h-2.5" style={{ animationDuration: '0.35s' }} />
              <span className="w-1 bg-pink-500 rounded-full animate-bounce h-3" style={{ animationDuration: '0.6s' }} />
            </div>
          )}
        </button>

        {/* Botón Abrir Playlist / Ajustes */}
        <button
          onClick={() => {
            sound.playPop();
            setIsExpanded(e => !e);
          }}
          className="glass-pill p-2.5 shadow-xl text-rose-900 font-bold text-xs hover:bg-white transition-all border border-rose-300/80 bg-white/90 flex items-center justify-center"
          title="Ver playlist romántica y buscador"
        >
          <span>🎼</span>
        </button>
      </div>

    </div>
  );
}
