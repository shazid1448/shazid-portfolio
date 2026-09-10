/**
 * Project Details Page: Deep-dive view of individual project features and links
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import API from '../services/api';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/projects/${slug}`).then(res => {
      if (res.data.success) setProject(res.data.data);
    }).catch(err => {
      setError(err.response?.data?.message || 'Project not found.');
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (error || !project) return <div className="container section"><ErrorMessage message={error || "Project not found"} /><Link to="/projects" className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>← Back to Projects</Link></div>;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        <div className="badge" style={{ marginBottom: '0.75rem' }}>{project.category}</div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          {project.title}
        </h1>

        <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--border-color)' }}>
          <img
            src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Overview</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {project.description}
          </p>

          {project.technologies && project.technologies.length > 0 && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Technologies Used</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.technologies.map((t, i) => (
                  <span key={i} className="badge">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Github size={18} /> View on GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <ExternalLink size={18} /> Visit Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
