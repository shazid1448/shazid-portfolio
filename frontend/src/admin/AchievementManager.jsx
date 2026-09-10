/**
 * Achievement Manager: Interface for editing awards and credentials
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Trash, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export const AchievementManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', description: '', image: '', achievement_date: '', external_url: '' });
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchAch(); }, []);

  const fetchAch = () => API.get('/achievements').then(res => setAchievements(res.data.data));

  const handleOpenModal = (item = null) => {
    setMsg('');
    setErrorMsg('');
    if (item) setFormData(item);
    else setFormData({ id: null, title: '', description: '', image: '', achievement_date: '', external_url: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setErrorMsg('');
    try {
      if (formData.id) {
        await API.put('/achievements/' + formData.id, formData);
        setMsg('Achievement updated successfully!');
      } else {
        await API.post('/achievements', formData);
        setMsg('New achievement added!');
      }
      setIsModalOpen(false);
      fetchAch();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save achievement.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete achievement?")) {
      try {
        await API.delete('/achievements/' + id);
        setMsg('Achievement deleted.');
        fetchAch();
      } catch (err) {
        setErrorMsg('Failed to delete achievement.');
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Achievement Management</h3>
        <button onClick={() => handleOpenModal()} className="btn btn-primary btn-sm"><Plus size={16} /> Add Achievement</button>
      </div>

      {msg && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} /> {msg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fef2f2', color: 'var(--error-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem' }}>Title</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{a.title}</td>
                <td style={{ padding: '0.75rem' }}>{a.achievement_date}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleOpenModal(a)} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}><Edit size={18} /></button>
                  <button onClick={() => handleDelete(a.id)} style={{ color: 'var(--error-color)' }}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Achievement" : "Add Achievement"}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label>Title</label><input type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
          <div><label>Description</label><textarea rows={3} className="input-field" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
          <div><label>Date / Year</label><input type="text" className="input-field" value={formData.achievement_date || ''} onChange={e => setFormData({...formData, achievement_date: e.target.value})} /></div>
          <div><label>Image / Certificate URL</label><input type="url" className="input-field" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} /></div>
          <div><label>External Credential URL</label><input type="url" className="input-field" value={formData.external_url || ''} onChange={e => setFormData({...formData, external_url: e.target.value})} /></div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Achievement'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
