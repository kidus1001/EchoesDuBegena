import { useState } from 'react';

import meBegena from '/assets/aboutImage/meBegena.jpg'
import meCode from '/assets/aboutImage/meCode.jpg'

export const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-archive-paper">
      {/* Hero Section with Parallax Effect */}
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 md:py-8 text-center">
          <div className="inline-block mb-4">
            <span className="text-archive-gold text-sm tracking-wider uppercase">Welcome to</span>
          </div>
          <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
            Begena Archive
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
                every recording I could find and putting them all in one place.
              </p>
              <p>
                The begena, often called the "Harp of King David," has been a source of 
                meditation and prayer in Ethiopian Orthodox tradition for centuries. Yet many 
                of these historic recordings were scattered.
              </p>
              <p>
                That's why I created the <span className="text-archive-gold font-medium">Begena Archive</span>.
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
            { number: "50+", label: "Rare Recordings", icon: "🎵" },
            { number: "20+", label: "Master Artists", icon: "👤" },
            { number: "1930s", label: "Earliest Recording", icon: "📅" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              {/* <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div> */}
              <div className="font-serif text-3xl md:text-4xl font-bold text-archive-dark">{stat.number}</div>
              <div className="text-archive-brown/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="w-full h-0.5 bg-archive-gold/30"></div>
        
        {/* Contact Section - Split Layout */}
        <div className="grid md:grid-cols-2 mt-20 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="text-archive-gold text-sm font-medium tracking-wider uppercase">Get in Touch</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-archive-dark mt-2">Let's Connect</h2>
              <div className="w-16 h-0.5 bg-archive-gold mt-4"></div>
            </div>
            
            <p className="text-archive-brown/80 leading-relaxed">
              Whether you're a researcher, musician, or fellow enthusiast, I'd love to hear from you. 
              Have questions about the archive? Interested in collaborating? Want to contribute?
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-archive-gold/10">
                <div className="w-10 h-10 bg-archive-gold/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-archive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-archive-brown/50">Email</p>
                  <a href="mailto:kidus@begenaarchive.com" className="text-archive-dark hover:text-archive-gold transition-colors">
                    kidusyosef1001@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-archive-gold/10">
                <div className="w-10 h-10 bg-archive-gold/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-archive-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-archive-brown/50">Location</p>
                  <p className="text-archive-dark">Addis Ababa, Ethiopia / Remote</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              {[
                { name: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.642 2.24c9.18 0 14.2-7.6 14.2-14.2 0-.21-.005-.418-.015-.628A10.009 10.009 0 0024 4.555z" },
                { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
              ].map((social, idx) => (
                <a key={idx} href="#" className="group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-archive-brown/50 group-hover:text-archive-gold group-hover:shadow-md transition-all border border-archive-gold/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-archive-gold/10">
            <h3 className="font-serif text-2xl font-bold text-archive-dark mb-6">Send a Message</h3>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-archive-gold/20 rounded-xl focus:outline-none focus:border-archive-gold focus:ring-1 focus:ring-archive-gold bg-archive-paper/30 text-archive-dark transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-archive-gold/20 rounded-xl focus:outline-none focus:border-archive-gold focus:ring-1 focus:ring-archive-gold bg-archive-paper/30 text-archive-dark transition-all"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-archive-gold/20 rounded-xl focus:outline-none focus:border-archive-gold focus:ring-1 focus:ring-archive-gold bg-archive-paper/30 text-archive-dark resize-none transition-all"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-archive-dark to-archive-brown text-archive-paper py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;