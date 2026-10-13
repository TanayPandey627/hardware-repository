import React, { useEffect, useState } from 'react';
import { Search, Layers, Plus } from 'lucide-react';
import { apiService } from '../services/api';
import ProjectCard from '../components/ProjectCard';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await apiService.getProjects(search, selectedDifficulty);
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load project catalog.');
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchProjects();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, selectedDifficulty]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Hardware Projects</h1>
        <p className="page-subtitle">Explore community-designed hardware builds, required components, and build instructions.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          style={{
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          <option value="">All Difficulty Levels</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      {/* Error State */}
      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading projects library...
        </div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Layers size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No projects found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search criteria or difficulty filter.</p>
        </div>
      ) : (
        <div className="grid-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
