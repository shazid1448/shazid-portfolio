/**
 * Footer Component: Site footer with quick links and copyright notice
 */

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', padding: '3rem 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Shazid Ahmed</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Software Engineering Student & Full-Stack Developer</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <a href="https://github.com/shazidahmed" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} aria-label="GitHub"><Github size={22} /></a>
          <a href="https://linkedin.com/in/shazidahmed" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} aria-label="LinkedIn"><Linkedin size={22} /></a>
          <a href="mailto:shazid.ahmed@example.com" style={{ color: 'var(--text-secondary)' }} aria-label="Email"><Mail size={22} /></a>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Shazid Ahmed. All rights reserved.</p>
      </div>
    </footer>
  );
};
