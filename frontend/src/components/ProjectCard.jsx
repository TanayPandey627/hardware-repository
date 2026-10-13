import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Cpu, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return <span className="badge badge-green">Beginner</span>;
      case 'intermediate':
        return <span className="badge badge-amber">Intermediate</span>;
      case 'advanced':
        return <span className="badge badge-cyan">Advanced</span>;
      default:
        return <span className="badge badge-purple">{difficulty || 'General'}</span>;
    }
  };

  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          {getDifficultyBadge(project.difficulty)}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {project.components ? `${project.components.length} components` : 'Requirements listed'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description || 'No project description.'}
        </p>

        {project.components && project.components.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600', textTransform: 'uppercase' }}>
              Required Hardware
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {project.components.slice(0, 3).map((pc) => (
                <span key={pc.id || pc.componentId} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {pc.componentName} {pc.quantity > 1 ? `(x${pc.quantity})` : ''}
                </span>
              ))}
              {project.components.length > 3 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.2rem' }}>
                  +{project.components.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>
          <span>View Project Details</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
