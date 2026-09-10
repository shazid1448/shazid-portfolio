/**
 * Profile Manager: Form for editing personal biography and summary statistics
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Save } from 'lucide-react';

export const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '', title: '', bio: '', email: '', location: '', github: '', linkedin: '', profile_image: '',
    projects_count: 0, technologies_count: 0, years_learning: 0, achievements_count: 0
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  /**
   * Fetches existing profile details and picture path from backend API upon mounting
   */
  useEffect(() => {
    API.get('/profile').then(res => {
      if (res.data.success) setProfile(res.data.data);
    });
  }, []);

  /**
   * Submits updated profile information including name, bio, profile_image URL, and stats to API
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const res = await API.put('/profile', profile);
      if (res.data.success) setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Edit Personal Profile & Stats</h3>
      {msg && <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>{msg}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        <div><label>Full Name</label><input type="text" className="input-field" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required /></div>
        <div><label>Professional Title</label><input type="text" className="input-field" value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} required /></div>
        <div><label>Email</label><input type="email" className="input-field" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} required /></div>
        <div><label>Location</label><input type="text" className="input-field" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} required /></div>
        <div><label>GitHub URL</label><input type="url" className="input-field" value={profile.github} onChange={e => setProfile({...profile, github: e.target.value})} /></div>
        <div><label>LinkedIn URL</label><input type="url" className="input-field" value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} /></div>
        <div style={{ gridColumn: '1 / -1' }}><label>Profile Image Path / URL</label><input type="text" className="input-field" value={profile.profile_image || ''} onChange={e => setProfile({...profile, profile_image: e.target.value})} placeholder="/profile.jpg" /></div>
        <div style={{ gridColumn: '1 / -1' }}><label>Bio Description</label><textarea rows={4} className="input-field" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} required /></div>

        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div><label>Projects Count</label><input type="number" className="input-field" value={profile.projects_count} onChange={e => setProfile({...profile, projects_count: parseInt(e.target.value) || 0})} /></div>
          <div><label>Technologies Count</label><input type="number" className="input-field" value={profile.technologies_count} onChange={e => setProfile({...profile, technologies_count: parseInt(e.target.value) || 0})} /></div>
          <div><label>Years Learning</label><input type="number" className="input-field" value={profile.years_learning} onChange={e => setProfile({...profile, years_learning: parseInt(e.target.value) || 0})} /></div>
          <div><label>Achievements Count</label><input type="number" className="input-field" value={profile.achievements_count} onChange={e => setProfile({...profile, achievements_count: parseInt(e.target.value) || 0})} /></div>
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : <>Save Changes <Save size={18} /></>}
          </button>
        </div>
      </form>
    </div>
  );
};
