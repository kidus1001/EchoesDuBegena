import React, { useState, useEffect, useRef } from 'react';

// Type definitions
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  year: number;
  description: string;
  audioUrl: string;
  imageUrl: string;
  rare: boolean;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  description: string;
  coverImage: string;
  format: string;
  rarity: string;
  tracks: Track[];
}

interface Artist {
  id: string;
  name: string;
  biography: string;
  imageUrl: string | null;
  albums: Album[];
}

interface RecordingsData {
  artists: Artist[];
}

// Extended track type with album info
interface TrackWithAlbum extends Track {
  albumTitle: string;
  albumYear: number;
  albumFormat: string;
  albumRarity: string;
  albumCover: string;
}

const Recordings: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>('alemu-aga');
  const [selectedTrack, setSelectedTrack] = useState<TrackWithAlbum | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchArtists = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('/data/recordings.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: RecordingsData = await response.json();
        setArtists(data.artists || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load artists data');
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [selectedTrack]);

  // Load new track
  useEffect(() => {
    if (selectedTrack && audioRef.current) {
      const audio = audioRef.current;
      audio.src = selectedTrack.audioUrl;
      audio.load();
      
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [selectedTrack]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, selectedTrack]);

  // Calculate total recordings for an artist
  const getArtistRecordingCount = (artist: Artist): number => {
    return artist.albums.reduce((total, album) => total + album.tracks.length, 0);
  };

  // Get artist biography (shortened for display)
  const getShortBio = (biography: string): string => {
    return biography.length > 50 ? biography.substring(0, 50) + '...' : biography;
  };

  // Get selected artist
  const selectedArtist: Artist | undefined = artists.find(artist => artist.id === selectedArtistId);

  // Get all tracks from selected artist with album info
  const getAllTracks = (artist: Artist): TrackWithAlbum[] => {
    return artist?.albums.flatMap(album => 
      album.tracks.map(track => ({
        ...track,
        albumTitle: album.title,
        albumYear: album.year,
        albumFormat: album.format,
        albumRarity: album.rarity,
        albumCover: album.coverImage
      }))
    ) || [];
  };

  // Handle track selection
  const handleTrackClick = (track: TrackWithAlbum): void => {
    if (selectedTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedTrack(track);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Format duration
  const formatDuration = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get progress percentage
  const getProgressPercentage = (): number => {
    if (!duration || duration === 0) return 0;
    return (currentTime / duration) * 100;
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Skip forward/backward
  const skip = (seconds: number): void => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  if (loading) {
    return (
      <div className="bg-archive-paper flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#8b7355]">Loading artists...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-archive-paper flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      <div className="bg-archive-paper flex flex-col lg:flex-row">
        <aside className="bg-archive-grey/5 lg:w-72 flex-shrink-0 min-h-screen lg:h-full"> 
          <div className="sticky top-0 pt-8 pb-8 px-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold text-[#1a1410]">Featured Artists</h2>
              <span className="text-[#8b7355]/50 text-sm">{artists.length} artists</span>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-150px)] overflow-y-auto p-2 border-2 border-[#b89e69]/30 rounded-lg">
              {artists.length === 0 ? (
                <div className="text-center text-[#8b7355] py-4">No artists found</div>
              ) : (
                artists.map((artist: Artist) => (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtistId(artist.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedArtistId === artist.id
                        ? 'bg-[#b89e69]/15 border-l-4 border-[#b89e69]'
                        : 'hover:bg-[#8b7355]/10 border-l-4 border-transparent'
                    }`}
                  >
                    <h3 className="font-serif font-semibold text-[#1a1410] text-sm">
                      {artist.name}
                    </h3>
                    <p className="text-[#8b7355]/50 text-xs mt-1">
                      {getArtistRecordingCount(artist)} recordings
                    </p>
                    <p className="text-[#b89e69]/70 text-xs mt-1 italic line-clamp-1">
                      {getShortBio(artist.biography)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* <!-- ========== MAIN CONTENT ========== --> */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
            {/* <!-- ===== SONGS LIST ===== --> */}
            <div className="lg:col-span-2">
              {/* <!-- Artist Header --> */}
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-semibold text-[#1a1410]">
                  {selectedArtist?.name || 'Select an Artist'}
                </h2>
                <p className="text-[#b89e69] text-sm mt-1">
                  {selectedArtist ? `${getArtistRecordingCount(selectedArtist)} recordings` : ''}
                </p>
                <div className="w-12 h-0.5 bg-[#b89e69]/50 mt-2"></div>
              </div>

              {/* <!-- Song List --> */}
              <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {selectedArtist ? (
                  selectedArtist.albums.map((album: Album) => (
                    <div key={album.id}>
                      {/* <!-- Album Header --> */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="font-serif font-semibold text-[#1a1410] text-sm">{album.title}</h3>
                        <span className="text-xs text-[#8b7355]/50">{album.year} • {album.format}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          album.rarity === 'rare' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {album.rarity.charAt(0).toUpperCase() + album.rarity.slice(1)}
                        </span>
                      </div>

                      {/* <!-- Songs --> */}
                      <div className="space-y-2">
                        {album.tracks.map((track: Track) => {
                          const trackWithAlbum: TrackWithAlbum = {
                            ...track,
                            albumTitle: album.title,
                            albumYear: album.year,
                            albumFormat: album.format,
                            albumRarity: album.rarity,
                            albumCover: album.coverImage
                          };
                          const isTrackPlaying = selectedTrack?.id === track.id && isPlaying;
                          return (
                            <button
                              key={track.id}
                              onClick={() => handleTrackClick(trackWithAlbum)}
                              className={`w-full group flex items-center justify-between p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                                isTrackPlaying
                                  ? 'bg-[#b89e69] text-[#1a1410] border-2 border-[#b89e69] shadow-lg'
                                  : 'bg-[#b89e69]/5 border-2 border-[#b89e69]/20 hover:border-[#b89e69]/50 hover:shadow-md hover:bg-[#b89e69]/10'
                              }`}
                            >
                              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isTrackPlaying
                                    ? 'bg-[#1a1410] text-[#b89e69]'
                                    : 'bg-[#b89e69]/10 group-hover:bg-[#b89e69]'
                                } transition-all`}>
                                  {isTrackPlaying ? (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                                    </svg>
                                  ) : (
                                    <svg className="w-3 h-3 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  )}
                                </div>
                                <div className="text-left min-w-0">
                                  <h3 className="font-serif font-semibold text-sm truncate">{track.title}</h3>
                                  {isTrackPlaying && (
                                    <p className="text-xs text-[#1a1410]/60 mt-0.5 animate-pulse">Now Playing</p>
                                  )}
                                </div>
                                {track.rare && (
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded flex-shrink-0">Rare</span>
                                )}
                              </div>
                              <span className={`text-sm font-medium flex-shrink-0 ml-2 ${
                                isTrackPlaying ? 'text-[#1a1410]/60' : 'text-[#8b7355]/40'
                              }`}>
                                {formatDuration(track.duration)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-[#8b7355] py-8">Select an artist to view their recordings</div>
                )}
              </div>
            </div>

            {/* <!-- ===== NOW PLAYING PANEL ===== --> */}
            <div className="lg:col-span-1">
              <div className="bg-[#b89e69]/10 rounded-lg p-4 sm:p-5 border-2 border-[#b89e69]/30 shadow-xl sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto">
                <h3 className="font-serif text-lg font-semibold text-[#1a1410] mb-4">Now Playing</h3>
                
                {selectedTrack ? (
                  <>
                    {/* <!-- Album Art --> */}
                    <div className="aspect-square bg-gradient-to-br from-[#8b7355]/10 to-[#b89e69]/10 rounded-lg mb-4 flex items-center justify-center border-2 border-[#b89e69]/20">
                      {selectedTrack.albumCover ? (
                        <img 
                          src={selectedTrack.albumCover} 
                          alt={selectedTrack.albumTitle}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`text-center ${selectedTrack.albumCover ? 'hidden' : ''} fallback-icon`}>
                        <svg className="w-16 h-16 text-[#b89e69]/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                          <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3"/>
                        </svg>
                        <p className="text-xs text-[#8b7355]/50">No album art</p>
                      </div>
                    </div>

                    {/* <!-- Song Info --> */}
                    <div className="text-center mb-4">
                      <h4 className="font-serif text-xl font-bold text-[#1a1410]">{selectedTrack.title}</h4>
                      <p className="text-[#b89e69] text-sm mt-1">{selectedTrack.artist}</p>
                      <p className="text-[#8b7355]/50 text-xs mt-1">{selectedTrack.albumTitle}</p>
                    </div>

                    {/* <!-- Progress Bar --> */}
                    <div className="space-y-2 mb-4">
                      <div 
                        className="h-1 bg-[#8b7355]/10 rounded-full overflow-hidden cursor-pointer relative"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="h-full bg-[#b89e69] rounded-full transition-all duration-300" 
                          style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-[#8b7355]/50">
                        <span>{formatDuration(currentTime)}</span>
                        <span>{formatDuration(duration || selectedTrack.duration)}</span>
                      </div>
                    </div>

                    {/* <!-- Controls --> */}
                    <div className="flex justify-center items-center gap-4 sm:gap-6 mb-4">
                      <button 
                        onClick={() => skip(-10)}
                        className="text-[#8b7355]/60 hover:text-[#b89e69] transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-[#b89e69] text-[#1a1410] flex items-center justify-center hover:bg-[#b89e69]/80 transition-all hover:scale-110"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      
                      <button 
                        onClick={() => skip(10)}
                        className="text-[#8b7355]/60 hover:text-[#b89e69] transition-all hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>

                    {/* <!-- About Section --> */}
                    <div className="mt-6 pt-4 border-t border-[#b89e69]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-[#b89e69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <h5 className="font-serif text-sm font-semibold text-[#1a1410]">About</h5>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        <p className="text-xs text-[#8b7355]/70 leading-relaxed">
                          {selectedTrack.description || 'No description available.'}
                        </p>
                        <p className="text-xs text-[#8b7355]/50">
                          Year: {selectedTrack.year}
                        </p>
                      </div>
                    </div>

                    {/* <!-- Close Button --> */}
                    <button 
                      onClick={() => {
                        setSelectedTrack(null);
                        setIsPlaying(false);
                        setCurrentTime(0);
                        if (audioRef.current) {
                          audioRef.current.pause();
                          audioRef.current.src = '';
                        }
                      }}
                      className="w-full mt-4 text-xs text-[#8b7355]/50 hover:text-[#b89e69] transition-all"
                    >
                      Close Player
                    </button>
                  </>
                ) : (
                  <div className="text-center text-[#8b7355]/50 py-8">
                    <svg className="w-16 h-16 mx-auto mb-3 text-[#b89e69]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                    </svg>
                    <p>No track selected</p>
                    <p className="text-xs mt-1">Click a song to start playing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Recordings;