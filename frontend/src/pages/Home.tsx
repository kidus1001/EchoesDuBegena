import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Zerfu from "/assets/BegenaPersonImages/Zerfu.png";
import Aleka from "/assets/BegenaPersonImages/AlekaTessema.jpg";
import Alemu from "/assets/BegenaAlbumPosters/AlemuAgaAlbum.png"; 
import ZerfuA from "/assets/BegenaAlbumPosters/ZerfuAlbum.png";
import Elders from "/assets/BegenaAlbumPosters/Elders.png";
import Alemayehu from "/assets/BegenaAlbumPosters/AlemayehuCassette.jpg";
import Sosena from "/assets/BegenaAlbumPosters/SosnaAlbum.png";

export default function Home() {
  // Add these states with your other useState declarations
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [lightboxArtist, setLightboxArtist] = useState<string>('');
  const [lightboxYear, setLightboxYear] = useState<string | number>('');

  // Add these handler functions
  const handleImageClick = (imageUrl: string, title: string, artist: string, year: string | number) => {
    setLightboxImage(imageUrl);
    setLightboxTitle(title);
    setLightboxArtist(artist);
    setLightboxYear(year);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle('');
    setLightboxArtist('');
    setLightboxYear('');
  };

  // Close lightbox with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navigate = useNavigate();
  const features = [
    {
        title: "Recordings",
        description: "Explore rare and historic begena recordings preserved from different generations.",
        buttonText: "Listen to Rare Recordings",
        buttonVariant: "outline",
        icon: 'recordings',
        navigate: 'recordings'
    },
    {
        title: "Albums",
        description: "Browse oldies vinyl projects and recordings documenting the legacy of the begena.",
        buttonText: "Browse Albums",
        buttonVariant: "outline",
        icon: 'albums',
        navigate: 'albums'
    },
    {
        title: "Gallery",
        description: "A collection of photographs, record covers, instruments, and moments from the world of the begena.",
        buttonText: "View Gallery",
        buttonVariant: "outline",
        icon: 'gallery',
        navigate: 'gallery'
    },
  ];

  const albums = [
    { id: 1, title: "Untitled", artist: "Aleka Tessema Woldeamanuel", year: 1960, imagePlaceholder: Aleka },
    { id: 2, title: "The Harp of King David", artist: "Alemu Aga", year: 1994, imagePlaceholder: Alemu },
    { id: 3, title: "Akotet", artist: "Zerfu Demissie", year: 2007, imagePlaceholder: ZerfuA },
    { id: 4, title: "Elders of the Begena: The Harp of David in Ethiopia", artist: "Tafesse Tesfaye, Admassu Fikre, Seyoum Mengistu, Alemu Aga", year: 2009, imagePlaceholder: Elders},
    { id: 5, title: "Begena - Medina - Zelesegna", artist: "Alemayehu Fanta", year: 1991, imagePlaceholder: Alemayehu },
    { id: 6, title: "Sosena Gebre Eyesus", artist: "Sosena Gebre Eyesus", year: 2018, imagePlaceholder: Sosena }
  ];

  return (
    <>
      {/* Hero Section - Mobile Responsive */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-12 items-center bg-black px-4 sm:px-8 md:px-16 lg:px-28 py-8 md:py-0">
        <div className="space-y-4 md:space-y-6 order-2 md:order-1">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Echoes of the
              <span className="text-amber-500 block sm:inline"> Begena</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
            A living library of begena albums and projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-2 md:pt-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => navigate('recordings')}>
              Recordings
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => navigate('albums')}>
              Albums
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src={Zerfu}
            alt="Begena"
            className="w-full h-full object-cover max-h-[300px] sm:max-h-[400px] md:max-h-full"
          />
        </div>
      </section>

      <div className="w-full h-0.5 bg-archive-gold/30"></div>

      {/* Features Section - Mobile Responsive */}
      <section className="py-10 sm:py-16 md:py-24 bg-archive-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4 sm:mb-6 text-archive-gold">
                  {feature.icon === 'recordings' && (
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  )}
                  {feature.icon === 'albums' && (
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                      <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                    </svg>
                  )}
                  {feature.icon === 'gallery' && (
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-archive-dark mb-3 sm:mb-4">
                  {feature.title}
                </h3>

                <p className="text-archive-brown/80 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {feature.description}
                </p>

                <Button 
                  variant="primary"
                  size="md"
                  className="mt-2 w-full sm:w-auto"
                  onClick={() => navigate(feature.navigate)}
                >
                  {feature.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-0.5 bg-archive-gold/30"></div>

      {/* Featured Albums Section - Mobile Responsive */}
      <section className="py-10 sm:py-16 md:py-24 bg-archive-grey/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-archive-dark">
              Featured
            </h2>
            <div className="w-12 sm:w-16 h-0.5 bg-archive-gold mt-2"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* YouTube Video - Mobile Responsive */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-archive-gold/20">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PLSjrPFyKwFpI5ZKfZJ8MF7op7ncq5JX9c&si=6cQTt2P2krfNOZHy"
                  title="Begena - The Harp of King David"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-xs text-archive-brown/60 text-center mt-2 truncate px-2">
                Éthiopiques - The Harp of King David
              </p>
            </div>

            {/* Scrollable Albums - Mobile Responsive */}
            <div className="flex-1 overflow-hidden w-full">
              <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
                {albums.map((album) => (
                  <div 
                    key={album.id} 
                    className="w-32 sm:w-36 md:w-40 flex-shrink-0 group snap-start"
                  >
                    {/* Album Cover - Click to open lightbox */}
                    <div 
                      className="aspect-square bg-gradient-to-br from-archive-brown/10 to-archive-gold/10 rounded-sm overflow-hidden border border-archive-gold/20 group-hover:border-archive-gold/50 transition-all shadow-sm group-hover:shadow-md brightness-75 hover:brightness-110 cursor-pointer"
                      onClick={() => handleImageClick(
                        album.imagePlaceholder || album.imagePlaceholder || Zerfu,
                        album.title,
                        album.artist,
                        album.year
                      )}
                    >
                      <img 
                        src={album.imagePlaceholder || album.imagePlaceholder || Zerfu} 
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                        onError={(e) => {
                          e.currentTarget.src = Zerfu;
                        }}
                      />
                    </div>

                    <div className="overflow-hidden group">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-archive-dark mt-2 truncate hover:animate-scroll">
                        {album.title}
                      </h4>
                      <p className="text-xs text-archive-brown/60 truncate hover:animate-scroll">
                        {album.artist} • {album.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Lightbox Modal - Improved Proportions */}
            {lightboxImage && (
              <div 
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in"
                onClick={closeLightbox}
              >
                <div 
                  className="relative w-full max-w-3xl max-h-[85vh] md:max-h-[80vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button - Better positioned */}
                  <button
                    onClick={closeLightbox}
                    className="absolute -top-10 right-0 md:-top-12 md:right-0 text-white/60 hover:text-white transition-colors z-10"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Image Container - Better proportions */}
                  <div className="relative w-full h-full bg-black/40 rounded-lg overflow-hidden">
                    <img 
                      src={lightboxImage} 
                      alt={lightboxTitle}
                      className="w-full h-full object-contain max-h-[70vh] md:max-h-[75vh]"
                      onError={(e) => {
                        e.currentTarget.src = Zerfu;
                      }}
                    />

                    {/* Album Info Overlay - Cleaner design */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6">
                      <p className="text-white text-center font-serif text-lg md:text-2xl font-semibold">
                        {lightboxTitle}
                      </p>
                      {lightboxArtist && (
                        <p className="text-white/60 text-center text-sm md:text-base mt-1">
                          {lightboxArtist} • {lightboxYear}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hint - More subtle */}
                  <p className="text-white/20 text-xs text-center mt-3 md:mt-4">
                    Click anywhere to close • ESC
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button variant="outline" size="md" className="w-full sm:w-auto" onClick={() => navigate('albums')}>
              Browse All Albums →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}