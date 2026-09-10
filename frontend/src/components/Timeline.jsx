/**
 * Timeline Component: Vertical timeline display for education and experience
 */

import React from 'react';
import { Calendar, Building, GraduationCap } from 'lucide-react';

export const Timeline = ({ items, type = 'education' }) => {
  return (
    <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--border-color)' }}>
      {items.map((item, index) => (
        <div key={item.id || index} style={{ marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-2.65rem', top: '0.2rem', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ffffff', border: '4px solid var(--primary-color)' }} />
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{type === 'education' ? item.degree : item.position}</h3>
              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {item.start_date} - {item.is_current ? 'Present' : item.end_date}</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {type === 'education' ? <GraduationCap size={16} /> : <Building size={16} />}
              {type === 'education' ? item.institution : item.company}
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
