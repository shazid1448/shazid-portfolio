/**
 * Contact Page: Interactive contact form sending messages directly to database
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { ContactForm } from '../components/ContactForm';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import API from '../services/api';

export const Contact = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/profile').then(res => {
      if (res.data.success) setProfile(res.data.data);
    });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Have a project in mind, job opportunity, or technical question? Send me a message!" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>EMAIL</div>
                  <a href={`mailto:${profile?.email || 'shazid.ahmed@example.com'}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile?.email || 'shazid.ahmed@example.com'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOCATION</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile?.location || 'Dhaka, Bangladesh'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
                  <Github size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>GITHUB</div>
                  <a href={profile?.github || "https://github.com/shazidahmed"} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                    github.com/shazidahmed
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
                  <Linkedin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>LINKEDIN</div>
                  <a href={profile?.linkedin || "https://linkedin.com/in/shazidahmed"} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                    linkedin.com/in/shazidahmed
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
