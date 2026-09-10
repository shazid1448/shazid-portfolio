/**
 * Admin Dashboard: Main layout with navigation sidebar and manager tabs
 */

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProfileManager } from './ProfileManager';
import { SkillManager } from './SkillManager';
import { ProjectManager } from './ProjectManager';
import { EducationManager } from './EducationManager';
import { ExperienceManager } from './ExperienceManager';
import { AchievementManager } from './AchievementManager';
import { MessageManager } from './MessageManager';
import { SettingsManager } from './SettingsManager';
import { StatCard } from '../components/StatCard';
import { User, Code, FolderKanban, GraduationCap, Briefcase, Award, Mail, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import API from '../services/api';

export const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ projects: 0, skills: 0, achievements: 0, messages: 0 });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [proj, skill, ach, msg] = await Promise.all([
        API.get('/projects'),
        API.get('/skills'),
        API.get('/achievements'),
        API.get('/messages')
      ]);
      setStats({
        projects: proj.data.data ? proj.data.data.length : 0,
        skills: skill.data.data ? skill.data.data.length : 0,
        achievements: ach.data.data ? ach.data.data.length : 0,
        messages: msg.data.data ? msg.data.data.filter(m => !m.is_read).length : 0
      });
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'skills', label: 'Skills Manager', icon: Code },
    { id: 'projects', label: 'Projects Manager', icon: FolderKanban },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'messages', label: 'Messages (' + stats.messages + ')', icon: Mail },
    { id: 'settings', label: 'Global Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '90vh', backgroundColor: 'var(--surface-color)', padding: '2rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        <aside className="card" style={{ height: 'fit-content', padding: '1.25rem' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Admin Control Panel</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Signed in as: {admin?.email}</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    transition: 'var(--transition)'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                color: 'var(--error-color)',
                marginTop: '1.5rem',
                textAlign: 'left'
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Welcome, Administrator</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <StatCard title="Total Projects" value={stats.projects} icon={FolderKanban} />
                <StatCard title="Total Skills" value={stats.skills} icon={Code} />
                <StatCard title="Achievements" value={stats.achievements} icon={Award} />
                <StatCard title="Unread Messages" value={stats.messages} icon={Mail} />
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Quick Actions</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Use the left sidebar to add new projects, update skills, manage timeline items, or inspect contact form submissions.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setActiveTab('projects')} className="btn btn-primary btn-sm">+ Add Project</button>
                  <button onClick={() => setActiveTab('skills')} className="btn btn-secondary btn-sm">+ Add Skill</button>
                  <button onClick={() => setActiveTab('messages')} className="btn btn-secondary btn-sm">View Messages</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <ProfileManager />}
          {activeTab === 'skills' && <SkillManager />}
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'achievements' && <AchievementManager />}
          {activeTab === 'messages' && <MessageManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};
