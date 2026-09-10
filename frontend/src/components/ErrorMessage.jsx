/**
 * ErrorMessage Component: Error banner component for displaying API alerts
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
export const ErrorMessage = ({ message = "Unable to load data." }) => (
  <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: '#fff5f5' }}>
    <AlertTriangle size={36} color="var(--error-color)" />
    <p style={{ marginTop: '1rem' }}>{message}</p>
  </div>
);
