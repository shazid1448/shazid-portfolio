/**
 * Experience Page: Professional work and internship history timeline
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Timeline } from '../components/Timeline';
import { Loading } from '../components/Loading';
import API from '../services/api';

export const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/experience').then(res => {
      if (res.data.success) setExperience(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionTitle title="Professional Experience" subtitle="Software engineering internships and industry experience." />
        <Timeline items={experience} type="experience" />
      </div>
    </div>
  );
};
