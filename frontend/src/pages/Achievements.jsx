/**
 * Achievements Page: Showcase of awards, contest finishes, and certifications
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Loading } from '../components/Loading';
import { ExternalLink, Calendar } from 'lucide-react';
import API from '../services/api';

export const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/achievements').then(res => {
      if (res.data.success) setAchievements(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="section">
      <div className="container">
        <SectionTitle title="Achievements & Certifications" subtitle="Honors, competitive programming awards, and professional credentials." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {achievements.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              {item.image && (
                <div style={{ width: '100%', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> {item.achievement_date}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                {item.description}
              </p>
              {item.external_url && (
                <a href={item.external_url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  View Credential <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
