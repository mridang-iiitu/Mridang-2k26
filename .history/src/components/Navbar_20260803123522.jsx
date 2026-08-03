import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/events">Events</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/sponsors">Sponsors</Link>
      <Link to="/team">Team</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}