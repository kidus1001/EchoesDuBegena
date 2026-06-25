import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import "../../index.css"

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Recordings', href: '/recordings' },
        { name: 'Albums', href: '/albums' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About', href: '/about' },
    ]
    return (
        <header className='sticky top-0 z-50 bg-archive-paper/95 backdrop-blur-sm border-b-2 border-archive-gold mt-2'>
            <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-2">
                <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <Link to="/" className="group">
                    <h1 className="text-1xl md:text-2xl font-serif font-bold tracking-wide">
                        <div className="flex gap-4">
                            <img src="/VinylLogo.png" alt="Vinyl Logo" className="h-6 w-auto mt-1"  />
                            <span className="text-archive-dark">Echoes of the Begena</span>
                        </div>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 pb-1 border-b-2 ${
                        location.pathname === item.href
                            ? 'border-archive-gold text-archive-gold'
                            : 'border-transparent hover:border-archive-gold/50 text-archive-brown/70 hover:text-archive-dark'
                        }`}
                    >
                        {item.name}
                    </Link>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-md text-archive-brown hover:text-archive-gold transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                    </svg>
                </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                <nav className="md:hidden py-4 pb-6 space-y-3">
                    {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-sm font-medium tracking-wider uppercase py-2 transition-colors ${
                        location.pathname === item.href
                            ? 'text-archive-gold'
                            : 'text-archive-brown/70 hover:text-archive-dark'
                        }`}
                    >
                        {item.name}
                    </Link>
                    ))}
                </nav>
                )}
            </div>
        </header>
    );
};