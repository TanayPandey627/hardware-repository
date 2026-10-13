import React, { useEffect, useState } from 'react';
import { Search, Filter, Cpu, Plus } from 'lucide-react';
import { apiService } from '../services/api';
import ComponentCard from '../components/ComponentCard';

export default function ComponentList() {
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Microcontroller', 'Sensor', 'Actuator', 'Motor Driver', 'Optoelectronics', 'Passive', 'Single Board Computer'];

  useEffect(() => {
    async function fetchComponents() {
      setLoading(true);
      try {
        const data = await apiService.getComponents(search, selectedCategory);
        setComponents(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch components');
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchComponents();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Hardware Components</h1>
        <p className="page-subtitle">Browse microcontrollers, sensors, actuators, and passive components in the registry.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search components by name, manufacturer, model, or interface..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: 'var(--accent-rose)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading component catalog...
        </div>
      ) : components.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Cpu size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No components match your search</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try clearing your search query or selecting a different category filter.</p>
        </div>
      ) : (
        <div className="grid-3">
          {components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
}
