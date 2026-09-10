/**
 * Loading Component: Reusable animated loading spinner indicator
 */

import React from 'react';
export const Loading = ({ text = "Loading data..." }) => (
  <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
    <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <p style={{ marginTop: '1rem', fontWeight: 500 }}>{text}</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);
