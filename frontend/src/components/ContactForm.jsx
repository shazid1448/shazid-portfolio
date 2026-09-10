/**
 * ContactForm Component: Interactive message form component
 */

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import API from '../services/api';

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Unable to send message.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {status.success && <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', color: 'var(--success-color)', borderRadius: 'var(--radius-md)' }}><CheckCircle size={20} /> Message sent successfully!</div>}
      {status.error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: 'var(--error-color)', borderRadius: 'var(--radius-md)' }}><AlertCircle size={20} /> {status.error}</div>}
      <div><label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Your Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field" /></div>
      <div><label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Address *</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-field" /></div>
      <div><label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subject *</label><input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="input-field" /></div>
      <div><label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Message *</label><textarea name="message" rows={5} required value={formData.message} onChange={handleChange} className="input-field" /></div>
      <button type="submit" disabled={status.loading} className="btn btn-primary">{status.loading ? 'Sending...' : <>Send Message <Send size={18} /></>}</button>
    </form>
  );
};
