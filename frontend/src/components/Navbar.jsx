/**
 * Navbar Component: Responsive navigation header with active tab highlighting
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: '1px solid var(--border-color)',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
          <Code2 size={28} color="var(--primary-color)" />
          <span>SHAZID AHMED</span>
        </Link>
        <nav style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{ fontWeight: location.pathname === link.path ? 700 : 500, color: location.pathname === link.path ? 'var(--primary-color)' : 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {link.name}
            </Link>
          ))}
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation" className="mobile-toggle-btn" style={{ padding: '0.5rem', color: 'var(--text-primary)' }}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{ fontWeight: location.pathname === link.path ? 700 : 500, color: location.pathname === link.path ? 'var(--primary-color)' : 'var(--text-secondary)', fontSize: '1.05rem' }}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
      <style>{`@media (min-width: 769px) { .desktop-nav { display: flex !important; } .mobile-toggle-btn { display: none !important; } }`}</style>
    </header>
  );
};
