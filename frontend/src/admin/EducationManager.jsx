/**
 * Education Manager: Interface for updating educational records
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Trash, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, institution: '', degree: '', field: '', start_date: '', end_date: 'Present', is_current: false, description: '' });
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchEdu(); }, []);

  const fetchEdu = () => API.get('/education').then(res => setEducation(res.data.data));

  const handleOpenModal = (item = null) => {
    setMsg('');
    setErrorMsg('');
    if (item) setFormData(item);
    else setFormData({ id: null, institution: '', degree: '', field: '', start_date: '', end_date: 'Present', is_current: false, description: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setErrorMsg('');
    try {
      if (formData.id) {
        await API.put('/education/' + formData.id, formData);
        setMsg('Education record updated successfully!');
      } else {
        await API.post('/education', formData);
        setMsg('New education record created!');
      }
      setIsModalOpen(false);
      fetchEdu();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save education record. Please make sure you are logged in.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete education record?")) {
      try {
        await API.delete('/education/' + id);
        setMsg('Record deleted successfully.');
        fetchEdu();
      } catch (err) {
        setErrorMsg('Failed to delete record.');
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Education Management</h3>
        <button onClick={() => handleOpenModal()} className="btn btn-primary btn-sm"><Plus size={16} /> Add Record</button>
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
              <th style={{ padding: '0.75rem' }}>Institution</th>
              <th style={{ padding: '0.75rem' }}>Degree</th>
              <th style={{ padding: '0.75rem' }}>Duration</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {education.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{e.institution}</td>
                <td style={{ padding: '0.75rem' }}>{e.degree}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Education" : "Add Education"}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label>Institution Name</label><input type="text" className="input-field" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} required /></div>
          <div><label>Degree</label><input type="text" className="input-field" value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} required /></div>
          <div><label>Field of Study</label><input type="text" className="input-field" value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})} /></div>
          <div><label>Start Date</label><input type="text" className="input-field" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} required /></div>
          <div><label>End Date</label><input type="text" className="input-field" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="currEdu" checked={formData.is_current} onChange={e => setFormData({...formData, is_current: e.target.checked})} />
            <label htmlFor="currEdu">Currently Studying Here</label>
          </div>
          <div><label>Description</label><textarea rows={3} className="input-field" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {saving ? 'Saving Changes...' : 'Save Education'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
