/**
 * Home Page: Hero section, quick stats, featured skills, and showcase projects
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/ProjectCard';
import { SkillCard } from '../components/SkillCard';
import { StatCard } from '../components/StatCard';
import { Loading } from '../components/Loading';
import { FolderKanban, Cpu, Award, Clock, ArrowRight } from 'lucide-react';
import API from '../services/api';

export const Home = () => {
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [profRes, projRes, skillRes] = await Promise.all([
        API.get('/profile'),
        API.get('/projects'),
        API.get('/skills')
      ]);

      if (profRes.data.success) setProfile(profRes.data.data);
      if (projRes.data.success) setFeaturedProjects(projRes.data.data.filter(p => p.featured).slice(0, 3));
      if (skillRes.data.success) setSkills(skillRes.data.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading text="Loading portfolio homepage..." />;

  return (
    <div>
      <Hero profile={profile} />

      {/* Stats Section */}
      <section className="section" style={{ backgroundColor: 'var(--surface-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <StatCard title="Projects Completed" value={`${profile?.projects_count || 10}+`} icon={FolderKanban} />
          <StatCard title="Technologies Mastered" value={`${profile?.technologies_count || 15}+`} icon={Cpu} />
          <StatCard title="Years Learning" value={`${profile?.years_learning || 3}+`} icon={Clock} />
          <StatCard title="Achievements & Honors" value={`${profile?.achievements_count || 5}+`} icon={Award} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <SectionTitle title="Featured Projects" subtitle="A selection of software applications and technical projects I have built." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/projects" className="btn btn-secondary">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skills Preview */}
      <section className="section" style={{ backgroundColor: 'var(--surface-color)' }}>
        <div className="container">
          <SectionTitle title="Top Technical Skills" subtitle="Core competencies across frontend, backend, database, and system architecture." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {skills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/skills" className="btn btn-secondary">
              Explore All Skills <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: 'center', backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Interested in Collaborating or Hiring?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Feel free to reach out for software engineering roles, full-stack projects, or technical inquiries.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Get In Touch Now
          </Link>
        </div>
      </section>
    </div>
  );
};
