import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Activity } from 'lucide-react';

export default function ComponentCard({ component }) {
  const getVoltageDisplay = () => {
    if (component.voltageMin && component.voltageMax) {
      return `${component.voltageMin}V - ${component.voltageMax}V`;
    } else if (component.voltageMin) {
      return `${component.voltageMin}V`;
    }
    return 'N/A';
  };

  return (
    <Link to={`/components/${component.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <span className="badge badge-cyan">{component.category}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {component.manufacturer || 'Generic'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {component.name}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {component.description || 'No description available.'}
        </p>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Zap size={14} style={{ color: 'var(--accent-amber)' }} />
            <span>{getVoltageDisplay()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Activity size={14} style={{ color: 'var(--accent-purple)' }} />
            <span>{component.interfaceType || 'Standard'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
