import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <h1>AquaSense</h1>
    <div className="nav-links">
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/alertas">⚠ Alertas</Link>
      <Link to="/informes">📊 Informes</Link>
      <Link to="/usuario">👤 Usuario</Link>
    </div>
  </nav>
);

export default Navbar;
