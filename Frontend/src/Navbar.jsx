import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>Career Gen</Link>
      </div>

      {/* Hamburger button — only visible on mobile */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Nav links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/Careers" onClick={closeMenu}>Careers</Link></li>
        <li><Link to="/CareerAptitudeTest" onClick={closeMenu}>Career Aptitude Test</Link></li>
        <li><Link to="/MagazinePage" onClick={closeMenu}>Magazine</Link></li>
        <li><Link to="/ContactPage" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;