/**
 * Education Page: Academic timeline showing degrees, institutions, and achievements
 */

import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { Timeline } from '../components/Timeline';
import { Loading } from '../components/Loading';
import API from '../services/api';

export const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/education').then(res => {
      if (res.data.success) setEducation(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionTitle title="Academic Education" subtitle="Degrees, institutions, and coursework in Software Engineering." />
        <Timeline items={education} type="education" />
      </div>
    </div>
  );
};
