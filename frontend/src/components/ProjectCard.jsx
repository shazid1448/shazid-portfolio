/**
 * ProjectCard Component: Card widget rendering individual project details
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--surface-color)', overflow: 'hidden' }}>
        <img src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span className="badge">{project.category}</span>
          {project.featured ? <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>★ Featured</span> : null}
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{project.title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {project.technologies.map((tech, i) => (
              <span key={i} style={{ fontSize: '0.75rem', background: 'var(--surface-color)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{tech}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <Link to={`/projects/${project.slug}`} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            Details <ArrowRight size={16} />
          </Link>
          {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><Github size={18} /></a>}
          {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={18} /></a>}
        </div>
      </div>
    </div>
  );
};
