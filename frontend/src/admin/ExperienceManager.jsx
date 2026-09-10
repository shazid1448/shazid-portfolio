/**
 * Experience Manager: Interface for updating professional experience
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Trash, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export const ExperienceManager = () => {
  const [experience, setExperience] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, position: '', company: '', location: '', start_date: '', end_date: 'Present', is_current: false, description: '', technologies: '' });
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchExp(); }, []);

  const fetchExp = () => API.get('/experience').then(res => setExperience(res.data.data));

  const handleOpenModal = (item = null) => {
    setMsg('');
    setErrorMsg('');
    if (item) setFormData(item);
    else setFormData({ id: null, position: '', company: '', location: '', start_date: '', end_date: 'Present', is_current: false, description: '', technologies: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setErrorMsg('');
    try {
      if (formData.id) {
        await API.put('/experience/' + formData.id, formData);
        setMsg('Experience updated successfully!');
      } else {
        await API.post('/experience', formData);
        setMsg('New experience record created!');
      }
      setIsModalOpen(false);
      fetchExp();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save experience.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete experience record?")) {
      try {
        await API.delete('/experience/' + id);
        setMsg('Record deleted successfully.');
        fetchExp();
      } catch (err) {
        setErrorMsg('Failed to delete record.');
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Experience Management</h3>
        <button onClick={() => handleOpenModal()} className="btn btn-primary btn-sm"><Plus size={16} /> Add Position</button>
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
              <th style={{ padding: '0.75rem' }}>Position</th>
              <th style={{ padding: '0.75rem' }}>Company</th>
              <th style={{ padding: '0.75rem' }}>Duration</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{e.position}</td>
                <td style={{ padding: '0.75rem' }}>{e.company}</td>
                <td style={{ padding: '0.75rem' }}>{e.start_date} - {e.is_current ? 'Present' : e.end_date}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleOpenModal(e)} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}><Edit size={18} /></button>
                  <button onClick={() => handleDelete(e.id)} style={{ color: 'var(--error-color)' }}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label>Position Title</label><input type="text" className="input-field" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} required /></div>
          <div><label>Company / Organization</label><input type="text" className="input-field" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required /></div>
          <div><label>Location</label><input type="text" className="input-field" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
          <div><label>Start Date</label><input type="text" className="input-field" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} required /></div>
          <div><label>End Date</label><input type="text" className="input-field" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="currExp" checked={formData.is_current} onChange={e => setFormData({...formData, is_current: e.target.checked})} />
            <label htmlFor="currExp">Current Position</label>
          </div>
          <div><label>Description</label><textarea rows={3} className="input-field" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
          <div><label>Technologies Used</label><input type="text" className="input-field" value={formData.technologies || ''} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, Express" /></div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Experience'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
