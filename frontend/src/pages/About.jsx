/**
 * About Page: Detailed personal biography, background, languages, hobbies, and volunteering
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Loading } from '../components/Loading';
import { CheckCircle2, Globe, Heart, Shield, UserCheck } from 'lucide-react';
import API from '../services/api';

export const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/profile').then(res => {
      if (res.data.success) setProfile(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="section">
      <div className="container">
        <SectionTitle title="About Me" subtitle="Learn more about my background, academic journey, leadership, and personal interests." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Left Column: Profile Card */}
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <img
              src={profile?.profile_image || "/profile.jpg"}
              alt="Shazid Ahmed Bondhon"
              style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem auto', border: '4px solid var(--primary-light)' }}
            />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{profile?.name}</h3>
            <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>{profile?.title}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              📍 House 16, Road 2, Block F, Mirpur-1, 1216 Dhaka, Bangladesh<br />
              📧 ashazid5@gmail.com | 📞 (+880) 1790599662<br />
              🇧🇩 Nationality: Bangladeshi
            </p>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={18} color="var(--primary-color)" /> Language Proficiency
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li style={{ marginBottom: '0.4rem' }}>• <strong>Bengali:</strong> Native / Mother tongue</li>
                <li>• <strong>English:</strong> Professional Working Proficiency</li>
              </ul>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'left' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} color="var(--error-color)" /> Blood Donation & Social Aid
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                • Regular <strong>A(+ve)</strong> blood donor.<br />
                • Active Blood Drive Manager at <strong>Jagroto Bangla Foundation</strong> (organizing 21st February donation drives & donor registry).
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Biography & Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Professional & Academic Profile
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {profile?.bio}
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Core Competencies & Focus Areas
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {[
                  'Software Architecture & Clean Code',
                  'Full-Stack Web (React, Node, Express, MySQL)',
                  'Java & C Programming',
                  'Cross-Cultural Learning & Adaptability',
                  'Leadership & Team Management',
                  'Community Service & Tutoring'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <CheckCircle2 size={18} color="var(--primary-color)" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ISSB & Leadership Highlights */}
            <div className="card">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shield size={22} color="var(--primary-color)" /> ISSB Leadership & Management Experience
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Twice candidate at <strong>INTER SERVICE SELECTION BOARD (ISSB)</strong> monitored by senior officers of Bangladesh Army, Navy & Air Force. Successfully led 12-member groups under high-pressure tactical leadership tasks:
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                <li><strong>Progressive Group Task (PGT):</strong> Led a 12-member group navigating obstacle courses and material transport.</li>
                <li><strong>Command Task (CT):</strong> Appointed team Commander, giving logical instructions to solve complex physical obstacles.</li>
                <li><strong>Half Group Task (HGT) & Planning:</strong> Guided 6-member sub-teams in strategic problem solving and group discussions.</li>
              </ul>
            </div>

            {/* Hobbies & Personal Interests */}
            <div className="card">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <UserCheck size={22} color="var(--success-color)" /> Hobbies & Personal Interests
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>✈️ Traveling</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Curious about exploring world wonders and diverse cultures.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>💻 Technology</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Passionate about science and tech innovations since childhood.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>💼 Business</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Business enthusiastic with long-term entrepreneurship goals.</p>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>🏃 Distance Running</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Completed 7.5K & 3K marathons; builds focus and discipline.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
