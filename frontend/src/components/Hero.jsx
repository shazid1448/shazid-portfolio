/**
 * Hero Component: Main introduction banner with call-to-action buttons
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Mail } from 'lucide-react';

export const Hero = ({ profile }) => {
  const defaultImage = "/profile.jpg";

  return (
    <section style={{ padding: '5rem 0 3rem 0', backgroundColor: '#ffffff' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div className="badge" style={{ marginBottom: '1rem' }}>Available for Internships & Projects</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Hi, I'm <span style={{ color: 'var(--primary-color)' }}>{profile?.name || 'Shazid Ahmed'}</span>
          </h1>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
            {profile?.title || 'Software Engineering Student & Full-Stack Developer'}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {profile?.bio || 'I build modern web applications and explore software engineering, robotics, artificial intelligence, and emerging technologies.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-primary">
              View My Projects <FolderKanban size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me <Mail size={18} />
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '280px', height: '280px', borderRadius: '50%', overflow: 'hidden',
            border: '4px solid var(--border-color)', boxShadow: 'var(--shadow-lg)'
          }}>
            <img
              src={profile?.profile_image || defaultImage}
              alt="Shazid Ahmed"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
