/**
 * Settings Manager: Global site configuration and Admin Password Change manager
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Save, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

export const SettingsManager = () => {
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    contact_email: '',
    github_url: '',
    linkedin_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  // Password state
  const [passData, setPassData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passSaving, setPassSaving] = useState(false);
  const [passMsg, setPassMsg] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    API.get('/settings').then(res => {
      if (res.data.success) setSettings(prev => ({ ...prev, ...res.data.data }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await API.put('/settings', settings);
      setMsg('Global settings updated successfully!');
    } catch (err) {
      setMsg('Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');

    if (passData.newPassword !== passData.confirmPassword) {
      setPassError('New passwords do not match!');
      return;
    }

    if (passData.newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    setPassSaving(true);
    try {
      const res = await API.put('/auth/change-password', {
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword
      });
      if (res.data.success) {
        setPassMsg('Admin password changed successfully!');
        setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setPassError(err.response?.data?.message || 'Failed to change password. Please check your current password.');
    } finally {
      setPassSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Card 1: Global Settings */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Global Application Settings</h3>
        {msg && <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>{msg}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div><label>Website Title</label><input type="text" className="input-field" value={settings.site_title} onChange={e => setSettings({...settings, site_title: e.target.value})} required /></div>
          <div><label>Website Description (SEO)</label><textarea rows={3} className="input-field" value={settings.site_description} onChange={e => setSettings({...settings, site_description: e.target.value})} required /></div>
          <div><label>Primary Contact Email</label><input type="email" className="input-field" value={settings.contact_email} onChange={e => setSettings({...settings, contact_email: e.target.value})} required /></div>
          <div><label>GitHub Profile Link</label><input type="url" className="input-field" value={settings.github_url} onChange={e => setSettings({...settings, github_url: e.target.value})} /></div>
          <div><label>LinkedIn Profile Link</label><input type="url" className="input-field" value={settings.linkedin_url} onChange={e => setSettings({...settings, linkedin_url: e.target.value})} /></div>

          <button type="submit" disabled={saving} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            {saving ? 'Saving...' : <>Save Global Settings <Save size={18} /></>}
          </button>
        </form>
      </div>

      {/* Card 2: Change Admin Password */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={20} color="var(--primary-color)" /> Change Admin Password
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Update your secret credentials for logging into the admin panel dashboard.
        </p>

        {passMsg && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} /> {passMsg}
          </div>
        )}

        {passError && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fef2f2', color: 'var(--error-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {passError}
          </div>
        )}

        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '500px' }}>
          <div>
            <label>Current Admin Password</label>
            <input
              type="password"
              className="input-field"
              required
              value={passData.currentPassword}
              onChange={e => setPassData({...passData, currentPassword: e.target.value})}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              className="input-field"
              required
              value={passData.newPassword}
              onChange={e => setPassData({...passData, newPassword: e.target.value})}
              placeholder="Min 6 characters"
            />
          </div>

          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              required
              value={passData.confirmPassword}
              onChange={e => setPassData({...passData, confirmPassword: e.target.value})}
              placeholder="Re-enter new password"
            />
          </div>

          <button type="submit" disabled={passSaving} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            {passSaving ? 'Updating Password...' : <>Update Password <Lock size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};
