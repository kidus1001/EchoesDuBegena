import { type Artist, type Recording } from '../types/dataType';

// Simple data service that loads from recordings.json
export const loadArtists = async (): Promise<Artist[]> => {
  try {
    // Try to fetch from public folder first
    const response = await fetch('../data/recordings.json');
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();
    return data.artists || [];
  } catch (error) {
    console.error('Error loading data:', error);
    // Return mock data as fallback
    return getMockArtists();
  }
};

// Get all recordings from all artists
export const getAllRecordings = (artists: Artist[]): Recording[] => {
  return artists.flatMap(artist => 
    artist.albums.flatMap(album => album.tracks)
  );
};

// Get recordings for a specific artist
export const getArtistRecordings = (artist: Artist): Recording[] => {
  return artist.albums.flatMap(album => album.tracks);
};

// Format duration from seconds to MM:SS
export const formatDuration = (seconds: number): string => {
  if (!seconds || seconds === 0) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Mock data fallback
const getMockArtists = (): Artist[] => {
  return [
    {
      id: '1',
      name: 'Alemu Aga',
      biography: 'Begena Master',
      imageUrl: '',
      albums: [
        {
          id: 'album1',
          title: 'Sacred Harp',
          artist: 'Alemu Aga',
          year: 2019,
          description: 'Spiritual meditations',
          coverImage: '',
          format: 'vinyl',
          rarity: 'rare',
          tracks: [
            {
              id: 's1',
              title: 'The Harp of David',
              artist: 'Alemu Aga',
              album: 'Sacred Harp',
              duration: 272,
              year: 2019,
              description: 'Meditative piece',
              audioUrl: '/uploads/audio/AlemuAga/Abatachn.mp3',
              imageUrl: '',
              rare: true
            }
          ]
        }
      ]
    }
  ];
};