/**
 * Skill Manager: Interface for adding, editing, and deleting skills
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Trash, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', category: 'Frontend', level: 80, icon: 'Code' });
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = () => API.get('/skills').then(res => setSkills(res.data.data));

  const handleOpenModal = (skill = null) => {
    setMsg('');
    setErrorMsg('');
    if (skill) setFormData(skill);
    else setFormData({ id: null, name: '', category: 'Frontend', level: 80, icon: 'Code' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setErrorMsg('');
    try {
      if (formData.id) {
        await API.put('/skills/' + formData.id, formData);
        setMsg('Skill updated successfully!');
      } else {
        await API.post('/skills', formData);
        setMsg('New skill added successfully!');
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await API.delete('/skills/' + id);
        setMsg('Skill deleted successfully.');
        fetchSkills();
      } catch (err) {
        setErrorMsg('Failed to delete skill.');
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Skill Management</h3>
        <button onClick={() => handleOpenModal()} className="btn btn-primary btn-sm"><Plus size={16} /> Add Skill</button>
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
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Level</th>
              <th style={{ padding: '0.75rem' }}>Icon</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '0.75rem' }}><span className="badge">{s.category}</span></td>
                <td style={{ padding: '0.75rem' }}>{s.level}%</td>
                <td style={{ padding: '0.75rem' }}><code>{s.icon}</code></td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleOpenModal(s)} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}><Edit size={18} /></button>
                  <button onClick={() => handleDelete(s.id)} style={{ color: 'var(--error-color)' }}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Skill" : "Add New Skill"}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label>Skill Name</label><input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
          <div>
            <label>Category</label>
            <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Programming">Programming</option>
              <option value="Tools">Tools</option>
            </select>
          </div>
          <div><label>Skill Level (1-100)</label><input type="number" min="1" max="100" className="input-field" value={formData.level} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} required /></div>
          <div><label>Lucide Icon Name</label><input type="text" className="input-field" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} required /></div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Skill'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
