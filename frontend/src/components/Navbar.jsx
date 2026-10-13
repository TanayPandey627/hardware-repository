import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Layers, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Cpu size={20} />
          </div>
          <span>Hardware Platform</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/components" className={`nav-link ${isActive('/components') ? 'active' : ''}`}>
              Components
            </Link>
          </li>
          <li>
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
