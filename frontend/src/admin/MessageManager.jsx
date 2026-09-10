/**
 * Message Manager: Inbox viewer for reviewing and deleting user contact submissions
 */

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Eye, EyeOff, Trash, Check } from 'lucide-react';
import { Modal } from '../components/Modal';

export const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = () => API.get('/messages').then(res => setMessages(res.data.data));

  const toggleRead = async (msg) => {
    if (msg.is_read) {
      await API.put('/messages/' + msg.id + '/unread');
    } else {
      await API.put('/messages/' + msg.id + '/read');
    }
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact message?")) {
      await API.delete('/messages/' + id);
      if (selectedMsg?.id === id) setSelectedMsg(null);
      fetchMessages();
    }
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Contact Messages Inbox</h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Sender</th>
              <th style={{ padding: '0.75rem' }}>Subject</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: m.is_read ? 'transparent' : '#f0f7ff' }}>
                <td style={{ padding: '0.75rem' }}>
                  <span className="badge" style={{ backgroundColor: m.is_read ? 'var(--border-color)' : 'var(--primary-light)', color: m.is_read ? 'var(--text-muted)' : 'var(--primary-color)' }}>
                    {m.is_read ? 'Read' : 'New'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', fontWeight: 600 }}>{m.name}<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.email}</div></td>
                <td style={{ padding: '0.75rem' }}>{m.subject}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => { setSelectedMsg(m); if (!m.is_read) toggleRead(m); }} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }} aria-label="View Message"><Eye size={18} /></button>
                  <button onClick={() => toggleRead(m)} style={{ marginRight: '0.5rem', color: 'var(--text-secondary)' }} aria-label="Toggle Read">{m.is_read ? (<EyeOff size={18} />) : (<Check size={18} />)}</button>
                  <button onClick={() => handleDelete(m.id)} style={{ color: 'var(--error-color)' }} aria-label="Delete Message"><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={Boolean(selectedMsg)} onClose={() => setSelectedMsg(null)} title={selectedMsg?.subject || "Message Details"}>
        {selectedMsg && (
          <div>
            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <strong>From:</strong> {selectedMsg.name} ({selectedMsg.email})<br />
              <strong>Date:</strong> {new Date(selectedMsg.created_at).toLocaleString()}
            </div>
            <div style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {selectedMsg.message}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
