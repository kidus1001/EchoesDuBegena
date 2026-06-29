import meBegena from '/assets/aboutImage/meBegena.jpg';
import meCode from '/assets/aboutImage/meCode.jpg';

export const About = () => {
  return (
    <main className="min-h-screen bg-archive-paper">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 md:py-8 text-center">
        <div className="inline-block mb-4">
          <span className="text-archive-gold text-sm tracking-wider uppercase">Welcome to</span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
          Echoes of the Begena
        </h1>
      </div>
      <div className="w-48 h-0.5 bg-archive-gold/30 mx-auto"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8 py-12 md:py-20">
        {/* Story Section - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-archive-gold text-sm font-medium tracking-wider uppercase">My Story</span>
              <div className="w-12 h-0.5 bg-archive-gold mt-2"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-archive-dark leading-tight">
              From Code to <br />
              <span className="text-archive-gold">Sacred Strings</span>
            </h2>
            <div className="space-y-4 text-archive-brown/80 leading-relaxed">
              <p>
                I'm <span className="text-archive-gold font-medium">Kidus Yosef</span>, a software engineer 
                and a begena player. What started as simple curiosity turned into a quiet obsession, gathering 
                every "old" recordings and begena projects I could find and putting them all in one place.
              </p>
              <p>
                The begena, often called the "Harp of King David," has been a source of 
                meditation and prayer in Ethiopian Orthodox tradition for centuries. Yet many 
                of these historic recordings were scattered.
              </p>
              <p>
                That's why I created the <span className="text-archive-gold font-medium">Echoes of the Begena</span>.
                A digital sanctuary where these timeless melodies are preserved, celebrated, 
                and made accessible to everyone who seeks their peaceful embrace.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-archive-gold/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-archive-gold/10 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white to-archive-paper rounded-2xl overflow-hidden shadow-xl border border-archive-gold/20">
              <div className="aspect-square bg-gradient-to-br from-archive-brown/20 to-archive-gold/20 flex items-center justify-center">
                <div className="relative aspect-square bg-gradient-to-br from-archive-brown/20 to-archive-gold/20 rounded-2xl overflow-hidden shadow-xl border border-archive-gold/20 group">
                  {/* Default image - You playing begena */}
                  <img 
                    src={meBegena}  
                    alt="Kidus playing begena"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
                  />
                  
                  {/* Hover image - You coding */}
                  <img 
                    src={meCode} 
                    alt="Kidus coding"
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-archive-gold/30 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="w-full h-0.5 bg-archive-gold/30"></div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 mb-14">
          {[
            { number: "120+", label: "Rare Recordings", icon: "🎵" },
            { number: "15+", label: "Master Artists", icon: "👤" },
            { number: "1930s", label: "Earliest Recording", icon: "📅" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="font-serif text-3xl md:text-4xl font-bold text-archive-dark">{stat.number}</div>
              <div className="text-archive-brown/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="w-full h-0.5 bg-archive-gold/30"></div>
        
        {/* Contact Section - Telegram Focus */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-archive-gold text-sm font-medium tracking-wider uppercase">Get in Touch</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-archive-dark mt-2">Let's Connect</h2>
            <div className="w-16 h-0.5 bg-archive-gold mx-auto mt-4"></div>
            <p className="text-archive-brown/80 mt-6 max-w-2xl mx-auto">
              Whether you're a researcher, musician, or fellow enthusiast, I'd love to hear from you. 
              Have questions about the archive? Interested in collaborating? Want to contribute?
            </p>
          </div>

          {/* Telegram Contact Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-archive-gold/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Telegram Icon */}
              <div className="w-20 h-20 bg-archive-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-archive-gold/20 transition-all">
                <svg className="w-10 h-10 text-archive-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-archive-dark mb-2">Text me on Telegram</h3>
              
              <p className="text-archive-brown/70 text-sm mb-6 max-w-md">
                Quickest way to reach me.
              </p>
              
              {/* Telegram Link Button */}
              <a
                href="https://t.me/kidusyosef1001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-archive-dark to-archive-brown text-archive-paper px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Message me on Telegram
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              {/* Alternative Contact Options */}
              <div className="mt-6 pt-6 border-t border-archive-gold/10 w-full">
                <p className="text-xs text-archive-brown/50 mb-3">Or reach me via email</p>
                <a 
                  href="mailto:kidusyosef1001@gmail.com"
                  className="text-archive-gold hover:text-archive-brown transition-colors text-sm"
                >
                  kidusyosef1001@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
            {[
              { 
                name: "Telegram", 
                url: "https://t.me/Kidus_Begena",
                icon: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
              },
              { 
                name: "GitHub", 
                url: "https://github.com/kidus1001",
                icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              },
              { 
                name: "LinkedIn", 
                url: "https://www.linkedin.com/in/kidus-yosef-233948318/",
                icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-archive-brown/50 group-hover:text-archive-gold group-hover:shadow-md transition-all border border-archive-gold/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;