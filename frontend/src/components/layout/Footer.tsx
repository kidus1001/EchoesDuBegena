import Nosta from "../../assets/logo/nostalgic.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-archive-paper border-t border-archive-gold py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-archive-dark text-sm">
            © {currentYear} - Echoes of the Begena - All rights reserved
          </p>
          <a href="https://linktr.ee/kidus_begena" target="_blank">
            <div className="flex items-center gap-2">
              <img src={Nosta} alt="Nostalgic Logo" className="w-9 h-9 object-contain"/>
              <p className="text-archive-dark text-sm">
              Nostalgic Begena
              </p>    
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};