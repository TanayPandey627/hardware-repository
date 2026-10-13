import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function FutureBanner({ title, description, badge = 'FUTURE' }) {
  return (
    <div className="future-placeholder-banner">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span className="future-tag">[ {badge} ]</span>
        <Sparkles size={16} style={{ color: 'var(--accent-purple)' }} />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {description}
      </p>
    </div>
  );
}
