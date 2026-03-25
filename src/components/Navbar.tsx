import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="container nav-links">
        <Link to="/">Home</Link>
        <Link to="/cv">Lebenslauf</Link>
        <Link to="/achievements">Erfolge</Link>
        <Link to="/projects">Projekte</Link>
      </div>
    </nav>
  );
}
