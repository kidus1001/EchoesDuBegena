import { useEffect, useState, useRef } from 'react';
import { type Artist, type Recording } from '../types/dataType';
import { loadArtists, getArtistRecordings, formatDuration } from '../services/dataService';

const Recordings = () => {
  // State
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [currentSong, setCurrentSong] = useState<Recording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadArtists();
        setArtists(data);
        if (data.length > 0) {
          setSelectedArtist(data[0]);
        }
      } catch (err) {
        setError('Failed to load recordings');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnd);
    };
  }, []);

  // Play a song
  const playSong = (song: Recording) => {
    if (!song.audioUrl) return;

    // If same song, toggle play/pause
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }

    // Create new audio or update existing
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      audioRef.current.play();
    } else {
      audioRef.current = new Audio(song.audioUrl);
      audioRef.current.play();
    }

    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Seek to position
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Get duration
  // const getDuration = () => {
  //   return audioRef.current?.duration || currentSong?.duration || 0;
  // };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recordings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Audio element (hidden) */}
      <audio ref={audioRef} preload="metadata" />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Ethiopian Music Archive</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Artist List */}
          <div className="md:col-span-1">
            <h2 className="font-semibold mb-3 text-gray-700">Artists</h2>
            <div className="space-y-2">
              {artists.map((artist) => {
                const songCount = getArtistRecordings(artist).length;
                return (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtist(artist)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedArtist?.id === artist.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{artist.name}</div>
                    <div className="text-sm text-gray-500">
                      {artist.albums.length} albums • {songCount} songs
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Songs List */}
          <div className="md:col-span-2">
            {selectedArtist && (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedArtist.name}
                  </h2>
                  {selectedArtist.biography && (
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedArtist.biography}
                    </p>
                  )}
                </div>

                {/* Group by album */}
                {selectedArtist.albums.map((album) => (
                  <div key={album.id} className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-700">{album.title}</h3>
                      <span className="text-xs text-gray-500">
                        {album.year} • {album.format}
                      </span>
                      {album.rarity === 'rare' && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                          Rare
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {album.tracks.map((song) => {
                        const isActive = currentSong?.id === song.id;
                        return (
                          <button
                            key={song.id}
                            onClick={() => playSong(song)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                              isActive
                                ? 'bg-blue-50 border-2 border-blue-500'
                                : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isActive && isPlaying ? (
                                <div className="w-4 h-4 text-blue-600">
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                  </svg>
                                </div>
                              ) : isActive ? (
                                <div className="w-4 h-4 text-blue-600">
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-4 h-4 text-gray-400">
                                  <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              )}
                              <span className="text-sm font-medium text-gray-800">
                                {song.title}
                              </span>
                              {song.rare && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                  Rare
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDuration(song.duration)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Now Playing */}
                {currentSong && (
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
                    <div className="max-w-6xl mx-auto">
                      <div className="flex items-center gap-4">
                        {/* Song Info */}
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{currentSong.title}</div>
                          <div className="text-sm text-gray-500">{selectedArtist?.name}</div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                          >
                            {isPlaying ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Progress */}
                        <div className="flex-1 flex items-center gap-3">
                          <span className="text-xs text-gray-500">
                            {formatDuration(currentTime)}
                          </span>
                          <input
                            type="range"
                            min="0"
                            // max={getDuration() || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                              // background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (getDuration() || 1)) * 100}%, #e5e7eb ${(currentTime / (getDuration() || 1)) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                          <span className="text-xs text-gray-500">
                            {/* {formatDuration(getDuration())} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for fixed player */}
      {currentSong && <div className="h-24"></div>}
    </div>
  );
};


export default Recordings;