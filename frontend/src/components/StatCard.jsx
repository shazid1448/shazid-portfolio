/**
 * StatCard Component: Visual counter card displaying key portfolio stats
 */

import React from 'react';
export const StatCard = ({ title, value, icon: Icon }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
    {Icon && <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}><Icon size={28} /></div>}
    <div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{title}</div>
    </div>
  </div>
);
