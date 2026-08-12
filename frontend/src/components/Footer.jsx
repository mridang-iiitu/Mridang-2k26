
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <img src="/assets/logo.png" alt="Mridang" className="footer__logo-img" />
            <span className="footer__title">MRIDANG</span>
          </div>

          <div className="footer__links">
            <a href="#schedule" className="footer__link">Schedule</a>
            <a href="#sponsors" className="footer__link">Sponsors</a>
            <a href="#about" className="footer__link">About</a>
            <a href="#teams" className="footer__link">Team</a>
            <a href="#contact" className="footer__link">Contact</a>
          </div>
        </div>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Mridang — MITU Cultural Fest. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
