import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Zap, Activity, ShieldAlert, Layers } from 'lucide-react';
import { apiService } from '../services/api';
import ProjectCard from '../components/ProjectCard';

export default function ComponentDetail() {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComponentDetail() {
      setLoading(true);
      try {
        const [compData, projectsData] = await Promise.all([
          apiService.getComponentById(id),
          apiService.getProjects('', '', id)
        ]);
        setComponent(compData);
        setRelatedProjects(projectsData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load component details.');
      } finally {
        setLoading(false);
      }
    }
    loadComponentDetail();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading component specsheet...</div>;
  }

  if (error || !component) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
        <ShieldAlert size={48} style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }} />
        <h2>Component Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error || 'The requested hardware component could not be found.'}</p>
        <Link to="/components" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Component Catalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/components" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Back to Component Catalog
      </Link>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>{component.category}</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              {component.name}
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manufacturer / Model</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {component.manufacturer || 'Generic'} {component.modelNumber ? `(${component.modelNumber})` : ''}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          {component.description || 'No detailed description available for this hardware component.'}
        </p>

        {/* Specifications Table */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Hardware Specifications
        </h3>

        <table className="specs-table">
          <tbody>
            <tr>
              <th style={{ width: '220px' }}>Operating Voltage</th>
              <td>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontWeight: '600' }}>
                  <Zap size={16} />
                  {component.voltageMin && component.voltageMax
                    ? `${component.voltageMin}V min — ${component.voltageMax}V max`
                    : component.voltageMin ? `${component.voltageMin}V` : 'Not specified'}
                </span>
              </td>
            </tr>
            <tr>
              <th>Interface Protocol</th>
              <td>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-purple)', fontWeight: '600' }}>
                  <Activity size={16} />
                  {component.interfaceType || 'Standard Digital/Analog'}
                </span>
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{component.category}</td>
            </tr>
            <tr>
              <th>Manufacturer</th>
              <td>{component.manufacturer || 'Generic / Open Hardware'}</td>
            </tr>
            <tr>
              <th>Model Number</th>
              <td>{component.modelNumber || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Projects requiring this component */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={22} style={{ color: 'var(--accent-cyan)' }} />
          Projects Requiring {component.name}
        </h2>

        {relatedProjects.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            No projects in the database currently require this component.
          </div>
        ) : (
          <div className="grid-2">
            {relatedProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
