/**
 * Projects Page: Interactive portfolio grid with search and category filters
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/ProjectCard';
import { Loading } from '../components/Loading';
import API from '../services/api';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/projects').then(res => {
      if (res.data.success) setProjects(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Other'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="section">
      <div className="container">
        <SectionTitle title="Projects Portfolio" subtitle="Explore my latest software engineering projects, web applications, and robotics systems." />

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)' }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
            No projects found in this category.
          </p>
        )}
      </div>
    </div>
  );
};
