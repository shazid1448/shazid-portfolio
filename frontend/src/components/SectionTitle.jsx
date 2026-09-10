import React from 'react';

export const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <div style={{ textAlign: align, marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: align === 'center' ? '0 auto' : '0' }}>{subtitle}</p>}
    </div>
  );
};
