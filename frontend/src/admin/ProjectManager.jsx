/**
 * Project Manager: Interface for managing portfolio projects
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Trash, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', slug: '', description: '', image: '', category: 'Full Stack', github_url: '', live_url: '', featured: false, technologiesStr: '' });
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = () => API.get('/projects').then(res => setProjects(res.data.data));

  const handleOpenModal = (project = null) => {
    setMsg('');
    setErrorMsg('');
    if (project) {
      setFormData({ ...project, technologiesStr: project.technologies ? project.technologies.join(', ') : '' });
    } else {
      setFormData({ id: null, title: '', slug: '', description: '', image: '', category: 'Full Stack', github_url: '', live_url: '', featured: false, technologiesStr: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    setErrorMsg('');
    const technologies = formData.technologiesStr.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...formData, technologies };

    try {
      if (formData.id) {
        await API.put('/projects/' + formData.id, payload);
        setMsg('Project updated successfully!');
      } else {
        await API.post('/projects', payload);
        setMsg('New project added successfully!');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete('/projects/' + id);
        setMsg('Project deleted successfully.');
        fetchProjects();
      } catch (err) {
        setErrorMsg('Failed to delete project.');
      }
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Project Management</h3>
        <button onClick={() => handleOpenModal()} className="btn btn-primary btn-sm"><Plus size={16} /> Add Project</button>
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
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Featured</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{p.title}</td>
                <td style={{ padding: '0.75rem' }}><span className="badge">{p.category}</span></td>
                <td style={{ padding: '0.75rem' }}>{p.featured ? '★ Yes' : 'No'}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => handleOpenModal(p)} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }}><Edit size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} style={{ color: 'var(--error-color)' }}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Project" : "Add Project"}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label>Project Title</label><input type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
          <div><label>Slug (URL Identifier)</label><input type="text" className="input-field" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. student-portal" /></div>
          <div><label>Description</label><textarea rows={3} className="input-field" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
          <div><label>Category</label><select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="Full Stack">Full Stack</option><option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Other">Other</option></select></div>
          <div><label>Technologies (comma separated)</label><input type="text" className="input-field" value={formData.technologiesStr} onChange={e => setFormData({...formData, technologiesStr: e.target.value})} placeholder="React, Node.js, MySQL" /></div>
          <div><label>Image URL</label><input type="url" className="input-field" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} /></div>
          <div><label>GitHub Repository URL</label><input type="url" className="input-field" value={formData.github_url || ''} onChange={e => setFormData({...formData, github_url: e.target.value})} /></div>
          <div><label>Live Demo URL</label><input type="url" className="input-field" value={formData.live_url || ''} onChange={e => setFormData({...formData, live_url: e.target.value})} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
            <label htmlFor="featured">Mark as Featured Project on Homepage</label>
          </div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {saving ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
