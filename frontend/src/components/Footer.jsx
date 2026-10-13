import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <strong>Hardware Build Repository</strong> — Verified Open Hardware Documentation Platform
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          Research-based engineering schematics, step-by-step assembly guides & firmware references
        </div>
      </div>
    </footer>
  );
}
