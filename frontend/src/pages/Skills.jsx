/**
 * Skills Page: Categorized view of technical proficiencies with visual progress bars
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { SkillCard } from '../components/SkillCard';
import { Loading } from '../components/Loading';
import API from '../services/api';

export const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback CV skills if API is offline
  const fallbackSkills = [
    { id: 1, name: 'Java', category: 'Programming', level: 88, icon: 'FileCode' },
    { id: 2, name: 'C Programming', category: 'Programming', level: 82, icon: 'Cpu' },
    { id: 3, name: 'JavaScript', category: 'Frontend Development', level: 90, icon: 'Code' },
    { id: 4, name: 'HTML5 / CSS3', category: 'Frontend Development', level: 92, icon: 'Layout' },
    { id: 5, name: 'React.js', category: 'Frontend Development', level: 90, icon: 'Atom' },
    { id: 6, name: 'PHP', category: 'Backend Development', level: 78, icon: 'Server' },
    { id: 7, name: 'Node.js & Express.js', category: 'Backend Development', level: 85, icon: 'Server' },
    { id: 8, name: 'REST APIs', category: 'Backend Development', level: 88, icon: 'Globe' },
    { id: 9, name: 'MySQL', category: 'Database', level: 85, icon: 'Database' },
    { id: 10, name: 'Microsoft Office', category: 'Tools & Technologies', level: 95, icon: 'Monitor' },
    { id: 11, name: 'Git & GitHub', category: 'Tools & Technologies', level: 90, icon: 'GitBranch' },
    { id: 12, name: 'Leadership & Team Management', category: 'Tools & Technologies', level: 95, icon: 'Users' }
  ];

  useEffect(() => {
    API.get('/skills')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          // Standardize proficiency to level
          const formatted = res.data.data.map(s => ({
            ...s,
            level: s.level || s.proficiency || 80,
            icon: s.icon || 'Code'
          }));
          setSkills(formatted);
        } else {
          setSkills(fallbackSkills);
        }
      })
      .catch(() => {
        setSkills(fallbackSkills);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  // Extract unique categories dynamically
  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="section">
      <div className="container">
        <SectionTitle
          title="Skills & Competencies"
          subtitle="Comprehensive technical capabilities categorized by domain."
        />

        {categories.map(category => {
          const categorySkills = skills.filter(skill => skill.category === category);

          return (
            <div key={category} style={{ marginBottom: '3rem' }}>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  color: 'var(--text-primary)',
                  borderBottom: '2px solid var(--border-color)',
                  paddingBottom: '0.5rem'
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                {categorySkills.map(skill => (
                  <SkillCard key={skill.id || skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
