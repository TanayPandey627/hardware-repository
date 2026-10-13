import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Layers, Sparkles, ArrowRight, Zap, CheckCircle2, BookOpen, Terminal, Activity } from 'lucide-react';
import { apiService } from '../services/api';
import ComponentCard from '../components/ComponentCard';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [featuredComponents, setFeaturedComponents] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [comps, projs] = await Promise.all([
          apiService.getComponents(),
          apiService.getProjects()
        ]);
        setFeaturedComponents(comps.slice(0, 3));
        setFeaturedProjects(projs.slice(0, 4));
      } catch (err) {
        console.error("Failed loading homepage data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3.5rem 1rem 3rem 1rem' }}>
        <div className="badge badge-purple" style={{ marginBottom: '1.25rem', padding: '0.35rem 0.85rem' }}>
          <Sparkles size={14} /> Research-Verified Hardware Engineering Platform
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.15, letterSpacing: '-0.04em', marginBottom: '1.25rem', maxWidth: '850px', margin: '0 auto 1.25rem auto' }}>
          Build hardware projects from the <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>components you already have</span>.
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 2rem auto' }}>
          Explore microcontrollers, sensors, and actuators with comprehensive documentation. Verified wiring schematics, assembly guides, tested firmware, and official citations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/projects" className="btn btn-primary">
            <Layers size={18} /> Browse Verified Projects
          </Link>
          <Link to="/components" className="btn btn-secondary">
            <Cpu size={18} /> Explore Component Catalog
          </Link>
        </div>
      </section>

      {/* Engineering Workflow Pillars */}
      <section style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '2rem',
        marginBottom: '3.5rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem' }}>
            Rigorous Hardware Documentation Standard
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Every project in our repository follows a strict 4-stage engineering verification process.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Cpu size={26} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>1. Component Verification</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Datasheet electrical ratings (3.3V vs 5V logic, forward voltages, pinouts, current limits).
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Zap size={26} style={{ color: 'var(--accent-amber)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>2. Circuit Schematics</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Point-to-point pin tables, current limiting resistor math, and logic level protection.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Terminal size={26} style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>3. Verified Firmware</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Complete tested C++ source code with copy functionality and register-level explanations.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <CheckCircle2 size={26} style={{ color: 'var(--accent-green)', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.3rem' }}>4. Benchtop Verification</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Step-by-step commissioning checklists, diagnostic decision trees, and official citations.
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Featured Hardware Projects</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Step-by-step builds with verified component requirements and interactive checklists</p>
          </div>
          <Link to="/projects" style={{ fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading project registry...</div>
        ) : (
          <div className="grid-2">
            {featuredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </section>

      {/* Hardware Components Section */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Hardware Component Catalog</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Core building blocks available in the database</p>
          </div>
          <Link to="/components" style={{ fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            View All Components <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading hardware library...</div>
        ) : (
          <div className="grid-3">
            {featuredComponents.map((comp) => (
              <ComponentCard key={comp.id} component={comp} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
