import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Layers, Cpu, ShieldAlert, CheckCircle2, Circle, AlertTriangle, 
  Lightbulb, Copy, Check, ExternalLink, DollarSign, Wrench, BookOpen, 
  Terminal, Activity, HelpCircle, Sparkles, ChevronRight, Zap
} from 'lucide-react';
import { apiService } from '../services/api';
import { projectDocs } from '../data/projectDocs';
import ProjectCircuitDiagram from '../components/ProjectCircuitDiagram';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Interactive assembly checklist state (saved in localStorage if available)
  const [completedSteps, setCompletedSteps] = useState({});

  // Copy code feedback state
  const [copiedCode, setCopiedCode] = useState(false);

  const doc = projectDocs[parseInt(id, 10)] || null;

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await apiService.getProjectById(id);
        setProject(data);
        setError(null);
      } catch (err) {
        // Fallback: If backend is not currently running, provide research doc directly
        if (doc) {
          setProject({
            id: doc.id,
            title: doc.title,
            description: doc.overview.summary,
            difficulty: doc.difficulty,
            createdByName: 'Hardware Research Team',
            components: doc.materialsAndTools.components.map((c, idx) => ({
              id: idx + 1,
              componentId: idx + 1,
              componentName: c.name,
              category: c.category,
              quantity: c.quantity,
              notes: c.role
            }))
          });
          setError(null);
        } else {
          setError(err.message || 'Failed to load project details.');
        }
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id, doc]);

  // Load checklist from localStorage
  useEffect(() => {
    if (doc) {
      const saved = localStorage.getItem(`hardware_proj_${doc.id}_checklist`);
      if (saved) {
        try {
          setCompletedSteps(JSON.parse(saved));
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [doc]);

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepNumber]: !prev[stepNumber] };
      if (doc) {
        localStorage.setItem(`hardware_proj_${doc.id}_checklist`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCompletedSteps({});
    if (doc) {
      localStorage.removeItem(`hardware_proj_${doc.id}_checklist`);
    }
  };

  const copyCodeToClipboard = () => {
    if (doc?.software?.code) {
      navigator.clipboard.writeText(doc.software.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading verified project documentation...</div>;
  }

  if (error || (!project && !doc)) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
        <ShieldAlert size={48} style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }} />
        <h2>Project Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error || 'The requested hardware project could not be found.'}</p>
        <Link to="/projects" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Projects Registry
        </Link>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return <span className="badge badge-green">Beginner</span>;
      case 'intermediate':
        return <span className="badge badge-amber">Intermediate</span>;
      case 'advanced':
        return <span className="badge badge-cyan">Advanced</span>;
      default:
        return <span className="badge badge-purple">{difficulty}</span>;
    }
  };

  // Checklist calculations
  const totalSteps = doc?.assemblySteps?.length || 0;
  const finishedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? Math.round((finishedCount / totalSteps) * 100) : 0;

  const tabs = [
    { id: 'overview', label: 'Overview & Principle', icon: BookOpen },
    { id: 'components', label: 'Components & Tools', icon: Cpu },
    { id: 'assembly', label: 'Assembly Guide', icon: Wrench, badge: totalSteps > 0 ? `${finishedCount}/${totalSteps}` : null },
    { id: 'wiring', label: 'Wiring & Schematic', icon: Zap },
    { id: 'code', label: 'Software & Code', icon: Terminal },
    { id: 'testing', label: 'Testing & Troubleshooting', icon: Activity },
    { id: 'cost', label: 'Cost & References', icon: DollarSign }
  ];

  return (
    <div>
      <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
        <ArrowLeft size={16} /> Back to Projects Registry
      </Link>

      {/* Project Header Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(15, 23, 42, 0.95))', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '2.5rem 2rem', 
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {getDifficultyBadge(doc ? doc.difficulty : project.difficulty)}
              {doc?.estimatedTime && (
                <span className="badge badge-cyan" style={{ textTransform: 'none' }}>
                  ⏱️ {doc.estimatedTime}
                </span>
              )}
              {doc?.estimatedCost && (
                <span className="badge badge-purple" style={{ textTransform: 'none' }}>
                  💵 {doc.estimatedCost}
                </span>
              )}
            </div>
            
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {project.title}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: '500', marginBottom: '0.75rem' }}>
              {doc?.subtitle || project.description}
            </p>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
              {doc?.overview?.summary || project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        borderBottom: '1px solid var(--border-color)', 
        marginBottom: '2rem', 
        overflowX: 'auto', 
        paddingBottom: '0.5rem' 
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{ 
                  background: finishedCount === totalSteps ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)', 
                  color: finishedCount === totalSteps ? '#000' : '#fff',
                  borderRadius: '999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & WORKING PRINCIPLE */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} /> Project Purpose & Objectives
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {doc?.overview?.purpose || project.description}
            </p>

            {doc?.overview?.realWorldApplications && (
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Real-World Industrial & Commercial Applications
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                  {doc.overview.realWorldApplications.map((app, idx) => (
                    <div key={idx} style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      padding: '0.85rem 1rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {doc?.workingPrinciple && (
            <div className="card">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} /> How It Works: Technical Working Principle
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {doc.workingPrinciple.explanation}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {doc.workingPrinciple.physicsAndMath.map((item, idx) => (
                  <div key={idx} style={{ 
                    background: 'rgba(168, 85, 247, 0.05)', 
                    border: '1px solid rgba(168, 85, 247, 0.2)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '1.25rem' 
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-purple)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      {item.concept}
                    </div>
                    <div style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '1rem', 
                      fontWeight: '700', 
                      color: 'var(--text-primary)', 
                      background: 'rgba(0,0,0,0.3)', 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '6px',
                      marginBottom: '0.75rem'
                    }}>
                      {item.formula}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMPONENTS & TOOLS */}
      {activeTab === 'components' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Tools required box */}
          {doc?.materialsAndTools?.tools && (
            <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={18} /> Tools & Setup Required
              </h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                {doc.materialsAndTools.tools.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Component Cards */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Bill of Materials & Component Specs
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {doc?.materialsAndTools?.components?.length || project?.components?.length || 0} items total
              </span>
            </div>

            <div className="grid-2">
              {(doc?.materialsAndTools?.components || []).map((comp, idx) => (
                <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {comp.imageUrl && (
                      <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#000', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                        <img src={comp.imageUrl} alt={comp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {comp.name}
                        </h4>
                        <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                          Qty: {comp.quantity}
                        </span>
                      </div>
                      
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                        {comp.category}
                      </span>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                        <strong>Role:</strong> {comp.role}
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <strong>Specs:</strong> {comp.specs}
                      </div>

                      {comp.imageAttribution && (
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                          Attribution: {comp.imageAttribution}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASSEMBLY GUIDE WITH INTERACTIVE CHECKLIST */}
      {activeTab === 'assembly' && (
        <div>
          {/* Progress Indicator Card */}
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '1.5rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Assembly Progress
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {finishedCount} of {totalSteps} steps completed ({progressPercent}%)
                </div>
              </div>

              {finishedCount > 0 && (
                <button 
                  onClick={resetChecklist} 
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid var(--border-color)', 
                    color: 'var(--text-secondary)', 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '0.4rem 0.8rem', 
                    fontSize: '0.8rem', 
                    cursor: 'pointer' 
                  }}
                >
                  Reset Checklist
                </button>
              )}
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                background: finishedCount === totalSteps 
                  ? 'var(--accent-green)' 
                  : 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Numbered Assembly Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {(doc?.assemblySteps || []).map((step) => {
              const isChecked = !!completedSteps[step.stepNumber];
              return (
                <div 
                  key={step.stepNumber} 
                  onClick={() => toggleStep(step.stepNumber)}
                  style={{ 
                    background: isChecked ? 'rgba(52, 211, 153, 0.05)' : 'var(--bg-card)', 
                    border: isChecked ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ paddingTop: '0.1rem', color: isChecked ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                      {isChecked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '800', 
                          padding: '0.15rem 0.5rem', 
                          borderRadius: '4px', 
                          background: isChecked ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255,255,255,0.08)',
                          color: isChecked ? 'var(--accent-green)' : 'var(--text-primary)'
                        }}>
                          STEP {step.stepNumber}
                        </span>
                        <h3 style={{ 
                          fontSize: '1.15rem', 
                          fontWeight: '700', 
                          color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          {step.title}
                        </h3>
                      </div>

                      <p style={{ fontSize: '0.95rem', color: isChecked ? 'var(--text-muted)' : 'var(--text-secondary)', lineHeight: 1.6, marginBottom: (step.tip || step.warning) ? '0.75rem' : '0' }}>
                        {step.description}
                      </p>

                      {step.tip && (
                        <div style={{ 
                          background: 'rgba(56, 189, 248, 0.08)', 
                          borderLeft: '3px solid var(--accent-cyan)', 
                          padding: '0.6rem 0.85rem', 
                          borderRadius: '0 6px 6px 0', 
                          fontSize: '0.85rem', 
                          color: '#bae6fd',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <Lightbulb size={16} style={{ flexShrink: 0, color: 'var(--accent-cyan)' }} />
                          <span><strong>Pro Tip:</strong> {step.tip}</span>
                        </div>
                      )}

                      {step.warning && (
                        <div style={{ 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          borderLeft: '3px solid var(--accent-rose)', 
                          padding: '0.6rem 0.85rem', 
                          borderRadius: '0 6px 6px 0', 
                          fontSize: '0.85rem', 
                          color: '#fca5a5',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <AlertTriangle size={16} style={{ flexShrink: 0, color: 'var(--accent-rose)' }} />
                          <span><strong>Warning:</strong> {step.warning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: WIRING & SCHEMATICS */}
      {activeTab === 'wiring' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Schematic Diagram View */}
          {doc?.wiring?.diagramType && (
            <ProjectCircuitDiagram diagramType={doc.wiring.diagramType} />
          )}

          {/* Warnings Callouts */}
          {doc?.wiring?.warnings && doc.wiring.warnings.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {doc.wiring.warnings.map((w, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(251, 191, 36, 0.08)', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  color: '#fef3c7'
                }}>
                  <AlertTriangle size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '0.1rem' }} />
                  <div style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <strong>Electrical Caution:</strong> {w}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Pinout Wiring Table */}
          {doc?.wiring?.pinTable && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Point-to-Point Pin Wiring Schedule
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>From Device</th>
                      <th>Source Pin</th>
                      <th>To Device</th>
                      <th>Target Pin</th>
                      <th>Wire Color</th>
                      <th>Electrical Function & Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.wiring.pinTable.map((row, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: '600' }}>{row.fromComponent}</td>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '700' }}>
                            {row.fromPin}
                          </span>
                        </td>
                        <td style={{ fontWeight: '600' }}>{row.toComponent}</td>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)', fontWeight: '700' }}>
                            {row.toPin}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                            {row.wireColor}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SOFTWARE & CODE */}
      {activeTab === 'code' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* IDE & Environment Info Card */}
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Target IDE & Environment
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {doc?.software?.ide}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Target Board Selection
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                {doc?.software?.boardTarget}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                Required Libraries
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-purple)' }}>
                {doc?.software?.librariesRequired || 'None'}
              </div>
            </div>

            <button 
              onClick={copyCodeToClipboard} 
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              {copiedCode ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Sketch Code'}</span>
            </button>
          </div>

          {/* Code Viewer */}
          {doc?.software?.code && (
            <div style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              border: '1px solid var(--border-color)',
              background: '#090d16'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.04)', 
                padding: '0.75rem 1.25rem', 
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {doc.slug}.ino (C++ / Arduino)
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                  Verified Firmware
                </span>
              </div>

              <pre style={{ 
                margin: 0, 
                padding: '1.5rem', 
                overflowX: 'auto', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.9rem', 
                lineHeight: 1.6, 
                color: '#e2e8f0' 
              }}>
                <code>{doc.software.code}</code>
              </pre>
            </div>
          )}

          {/* Line-by-Line Code Breakdown */}
          {doc?.software?.explanation && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Firmware Logic & Hardware Execution Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doc.software.explanation.map((item, idx) => (
                  <div key={idx} style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '0.85rem 1rem', 
                    borderRadius: '6px', 
                    border: '1px solid var(--border-color)' 
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                      {item.line}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: TESTING & TROUBLESHOOTING */}
      {activeTab === 'testing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Bench Procedure Card */}
          {doc?.testing?.procedure && (
            <div className="card">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} /> Bench Validation & Commissioning Checklist
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doc.testing.procedure.map((proc, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '0.75rem', 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '0.85rem 1rem', 
                    borderRadius: '6px', 
                    border: '1px solid var(--border-color)' 
                  }}>
                    <span style={{ 
                      background: 'rgba(52, 211, 153, 0.2)', 
                      color: 'var(--accent-green)', 
                      borderRadius: '50%', 
                      width: '22px', 
                      height: '22px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      flexShrink: 0,
                      marginTop: '0.1rem'
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {proc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting Table */}
          {doc?.troubleshooting && (
            <div className="card">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={20} /> Diagnostic Decision Tree & Common Problems
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {doc.troubleshooting.map((item, idx) => (
                  <div key={idx} style={{ 
                    background: 'rgba(244, 63, 94, 0.04)', 
                    border: '1px solid rgba(244, 63, 94, 0.25)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '1.25rem' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        ⚠️ Symptom: {item.problem}
                      </h4>
                      <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>
                        {item.severity}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#fca5a5', marginBottom: '0.4rem' }}>
                      <strong>Root Cause:</strong> {item.cause}
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#86efac' }}>
                      <strong>Verified Solution:</strong> {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: COST & REFERENCES */}
      {activeTab === 'cost' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Estimated Cost Breakdown */}
          {doc?.costEstimate && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                    Estimated Project Cost Breakdown
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {doc.costDisclaimer}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Typical Total Budget</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-green)' }}>
                    {doc.costEstimate.totalRange}
                  </div>
                </div>
              </div>

              <table className="specs-table">
                <thead>
                  <tr>
                    <th>Component / Material</th>
                    <th>Estimated Unit Cost</th>
                    <th>Retail Baseline Source</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.costEstimate.breakdown.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600' }}>{row.item}</td>
                      <td style={{ color: 'var(--accent-green)', fontWeight: '700' }}>{row.cost}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Verified Technical References & Citations */}
          {doc?.references && (
            <div className="card">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Verified References & Technical Citations
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                All instructions, pin connections, logic voltages, and formulas in this document are verified against manufacturer datasheets and official project documentation:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doc.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {ref.title}
                        </span>
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                          {ref.type}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Source: {ref.source}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '600' }}>
                      <span>View Source</span>
                      <ExternalLink size={14} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
