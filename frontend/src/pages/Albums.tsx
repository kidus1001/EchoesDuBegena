// src/pages/Albums.tsx
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Type definitions matching your JSON structure
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
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

export const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Extract artistId from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const artistId = params.get('artist');
    if (artistId) {
      setSelectedArtistId(artistId);
    }
  }, [location]);

  // Fetch artists data
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/recordings.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: RecordingsData = await response.json();
        setArtists(data.artists || []);
        
        // Flatten all albums from all artists
        const allAlbumsData: Album[] = [];
        data.artists?.forEach(artist => {
          artist.albums?.forEach(album => {
            allAlbumsData.push({
              ...album,
              artist: album.artist || artist.name // Use album artist or fallback to artist name
            });
          });
        });
        setAllAlbums(allAlbumsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load albums data');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Filter albums by selected artist
  const filteredAlbums = selectedArtistId
    ? artists.find(a => a.id === selectedArtistId)?.albums || []
    : allAlbums;

  // Get artist name for display
  const getArtistName = (artistId: string | null) => {
    if (!artistId) return 'All Artists';
    const artist = artists.find(a => a.id === artistId);
    return artist?.name || 'All Artists';
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-archive-paper flex items-center justify-center">
        <div className="text-archive-brown">Loading albums...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-archive-paper flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-archive-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-archive-dark mb-3">
            Begena Albums and Projects
          </h1>
          <div className="w-20 h-0.5 bg-archive-gold mx-auto mb-4"></div>
          <p className="text-archive-brown/70 max-w-2xl mx-auto">
            A walking timeline through the rich history of begena recordings. 
            Click any album to explore its sacred melodies and discover hidden stories.
          </p>
          {selectedArtistId && (
            <p className="text-archive-gold mt-2 text-sm">
              Showing albums by: <span className="font-semibold">{getArtistName(selectedArtistId)}</span>
            </p>
          )}
        </div>

        {/* Artist Filter Buttons */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2 justify-center flex-wrap">
            <button
              onClick={() => setSelectedArtistId(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                !selectedArtistId
                  ? 'bg-archive-gold text-archive-dark font-semibold'
                  : 'bg-archive-gold/10 text-archive-brown hover:bg-archive-gold/20'
              }`}
            >
              All Artists
            </button>
            {artists.map(artist => (
              <button
                key={artist.id}
                onClick={() => setSelectedArtistId(artist.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedArtistId === artist.id
                    ? 'bg-archive-gold text-archive-dark font-semibold'
                    : 'bg-archive-gold/10 text-archive-brown hover:bg-archive-gold/20'
                }`}
              >
                {artist.name}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scrollable Albums */}
        {filteredAlbums.length === 0 ? (
          <div className="text-center text-archive-brown/60 py-12">
            <p>No albums found for this artist.</p>
          </div>
        ) : (
          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-archive-paper/90 hover:bg-archive-paper rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4"
            >
              <svg className="w-6 h-6 text-archive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 pt-2 px-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className="w-56 flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Album Cover */}
                  <div className="aspect-square bg-gradient-to-br from-archive-brown/10 to-archive-gold/10 rounded-lg overflow-hidden border-2 border-archive-gold/20 group-hover:border-archive-gold/50 transition-all shadow-md group-hover:shadow-xl">
                    {album.coverImage ? (
                      <img 
                        src={album.coverImage} 
                        alt={album.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${album.coverImage ? 'hidden' : ''} fallback-icon`}>
                      <svg className="w-12 h-12 text-archive-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Album Info */}
                  <div className="mt-3 text-center">
                    <h3 className="font-serif font-semibold text-archive-dark group-hover:text-archive-gold transition-colors text-sm line-clamp-1">
                      {album.title}
                    </h3>
                    <p className="text-xs text-archive-brown/60 line-clamp-1">{album.artist} • {album.year}</p>
                    {album.rarity && album.rarity !== 'common' && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-archive-gold/10 text-archive-gold rounded-full">
                        {album.rarity}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-archive-paper/90 hover:bg-archive-paper rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -mr-4"
            >
              <svg className="w-6 h-6 text-archive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Album Detail Modal */}
        {selectedAlbum && (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAlbum(null)}
          >
            <div 
              className="bg-archive-paper rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAlbum(null)}
                className="sticky top-4 float-right mr-4 mt-4 text-archive-brown/50 hover:text-archive-gold transition-colors z-10 bg-archive-paper/80 rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 md:p-8 pt-0">
                {/* Album Header */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-40 h-40 bg-gradient-to-br from-archive-brown/10 to-archive-gold/10 rounded-lg flex items-center justify-center border-2 border-archive-gold/20 flex-shrink-0 mx-auto md:mx-0 overflow-hidden">
                    {selectedAlbum.coverImage ? (
                      <img 
                        src={selectedAlbum.coverImage} 
                        alt={selectedAlbum.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.modal-fallback')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${selectedAlbum.coverImage ? 'hidden' : ''} modal-fallback`}>
                      <svg className="w-12 h-12 text-archive-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-archive-dark mb-2">
                      {selectedAlbum.title}
                    </h2>
                    <p className="text-archive-gold text-lg mb-2">{selectedAlbum.artist}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                      <span className="text-xs px-3 py-1 bg-archive-brown/10 text-archive-dark rounded-full">
                        {selectedAlbum.year}
                      </span>
                      <span className="text-xs px-3 py-1 bg-archive-brown/10 text-archive-dark rounded-full">
                        {selectedAlbum.format || 'Unknown Format'}
                      </span>
                      {selectedAlbum.rarity && selectedAlbum.rarity !== 'common' && (
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          selectedAlbum.rarity === 'Very Rare' 
                            ? 'bg-red-200 text-red-800' 
                            : 'bg-archive-gold/20 text-archive-gold'
                        }`}>
                          {selectedAlbum.rarity}
                        </span>
                      )}
                    </div>
                    <p className="text-archive-brown/80 text-sm leading-relaxed">
                      {selectedAlbum.description || 'No description available.'}
                    </p>
                  </div>
                </div>

                {/* Tracklist */}
                {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-serif text-lg font-semibold text-archive-dark mb-3 border-b border-archive-gold/30 pb-2">
                      🎵 Tracklist ({selectedAlbum.tracks.length} tracks)
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {selectedAlbum.tracks.map((track, index) => (
                        <div key={track.id} className="flex justify-between items-center p-2 hover:bg-archive-brown/5 rounded-lg transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-archive-brown/40 text-xs w-6 flex-shrink-0">{index + 1}</span>
                            <span className="text-archive-dark text-sm truncate">{track.title}</span>
                            {track.rare && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded flex-shrink-0">Rare</span>
                            )}
                          </div>
                          <span className="text-archive-brown/40 text-xs flex-shrink-0 ml-2">
                            {track.year || selectedAlbum.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-archive-gold/20">
                  <button 
                    onClick={() => {
                      // Navigate to recordings page with this album context
                      // You can implement this based on your routing
                      setSelectedAlbum(null);
                    }}
                    className="flex-1 bg-archive-dark text-archive-paper px-6 py-3 rounded-lg hover:bg-archive-brown transition-colors"
                  >
                    🎧 View Recordings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Albums;