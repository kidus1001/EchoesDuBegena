export interface Recording {
    id: string;
    title: string | "Untitled";
    artist: string | "Unknown Artist";
    album: string | "Untitled";
    duration: number; // Duration in seconds
    year: number | "Unknown";
    description: string | "No description available.";
    audioUrl?: string; // URL to the audio file
    imageUrl?: string; // URL to the album art or recording image
    rare?: boolean; // Indicates if the recording is rare or not
}

export interface Album {
    id: string;
    title: string | "Untitled";
    artist: string | "Unknown Artist";
    year: number | "Unknown";
    description: string | "No description available.";
    coverImage: string;
    tracks: Recording[]; // List of recordings in the album
    format: 'vinyl' | 'cd' | 'cassette' | 'digital'; // Format of the album
    rarity: 'rare' | 'limited' | 'common'; // Rarity of the album
}

export interface Artist {
    id: string;
    name: string | "Unknown Artist";
    biography: string | "No biography available.";
    imageUrl?: string; // URL to the artist's image
    albums: Album[]; // List of albums by the artist
}

export interface GalleryImage {
    id: string;
    title: string | "Untitled";
    description: string | "No description available.";
    imageUrl: string; // URL to the gallery image
    year?: number | "Unknown"; // Year the image was taken or is associated with
    category: "photograph" | 'cover' | 'instrument' | 'document' | 'vinyl'; // Category of the gallery image
    source: string; // Source of the image (e.g., photographer, archive)
    sourceUrl: string; // URL to the source of the image
    dateAdded: Date; // Date when the image was added to the gallery
}