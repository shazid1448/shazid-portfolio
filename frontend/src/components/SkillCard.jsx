/**
 * SkillCard Component: Skill progress bar component
 */

import React from 'react';
import * as Icons from 'lucide-react';

export const SkillCard = ({ skill }) => {
  const IconComponent = Icons[skill.icon] || Icons.Code;
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>
        <IconComponent size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{skill.name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.level}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ width: `${skill.level}%`, height: '100%', backgroundColor: 'var(--primary-color)' }} />
        </div>
      </div>
    </div>
  );
};
