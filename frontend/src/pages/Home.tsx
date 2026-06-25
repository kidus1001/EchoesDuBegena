import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

import { useNavigate } from "react-router-dom";

import Zerfu from "../assets/BegenaPersonImages/Zerfu.png";
import Aleka from "../assets/BegenaPersonImages/AlekaTessema.jpg";
import Alemu from "../assets/BegenaAlbumPosters/AlemuAgaAlbum.png"; 
import ZerfuA from "../assets/BegenaAlbumPosters/ZerfuAlbum.png";
import Elders from "../assets/BegenaAlbumPosters/Elders.png";
import Alemayehu from "../assets/BegenaAlbumPosters/AlemayehuCassette.jpg";
import Sosena from "../assets/BegenaAlbumPosters/SosnaAlbum.png";


export default function Home() {
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
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center bg-black px-28">
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Echoes of the
              <span className="text-amber-500"> Begena</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            A living library of begena albums and projects.
          </p>
          <div className="flex gap-16 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('recordings')}>
              Recordings
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('albums')}>
              Albums
            </Button>
          </div>
        </div>

        <div>
          <img
            src={Zerfu}
            alt="Begena"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="w-full h-0.5 bg-archive-gold/30"></div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-archive-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-6 text-archive-gold">
                  {feature.icon === 'recordings' && (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  )}
                  {feature.icon === 'albums' && (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                      <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                    </svg>
                  )}
                  {feature.icon === 'gallery' && (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold text-archive-dark mb-4">
                  {feature.title}
                </h3>

                <p className="text-archive-brown/80 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <Button 
                  variant="primary"
                  size="md"
                  className="mt-2"
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

      {/* Featured Albums Section */}
      <section className="py-16 md:py-24 bg-archive-grey/15">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-archive-dark">
              Featured
            </h2>
            <div className="w-16 h-0.5 bg-archive-gold mt-2"></div>
          </div>

          <div className="flex gap-6 items-start">
            {/* YouTube Video */}
            <div className="w-64 flex-shrink-0">
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
              <p className="text-xs text-archive-brown/60 text-center mt-2">
                Éthiopiques - The Harp of King David
              </p>
            </div>

            {/* Scrollable Albums */}
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
                {albums.map((album) => (
                  <div 
                    key={album.id} 
                    className="w-40 flex-shrink-0 group cursor-pointer"
                  >
                    <div className="aspect-square bg-gradient-to-br from-archive-brown/10 to-archive-gold/10 rounded-sm overflow-hidden border border-archive-gold/20 group-hover:border-archive-gold/50 transition-all shadow-sm group-hover:shadow-md brightness-75 hover:brightness-110">
                      <img 
                        src={album.imagePlaceholder} 
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                      />
                    </div>

                    <div className="overflow-hidden group">
                      <h4 className="font-serif text-sm font-semibold text-archive-dark mt-2 whitespace-nowrap hover:animate-scroll">
                        {album.title}
                      </h4>
                      <p className="text-xs text-archive-brown/60 whitespace-nowrap hover:animate-scroll">
                        {album.artist} • {album.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="md" onClick={()=> navigate('albums')}>
              Browse All Albums →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}