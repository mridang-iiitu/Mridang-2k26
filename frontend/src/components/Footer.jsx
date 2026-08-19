import logoImg from "../assets/mr.webp";
import iiitLogo from "../assets/iiitu-logo.png";
import mandala from "../assets/mandala.svg";
import Countdown from "./Countdown";

export default function Footer() {
  return (
    <footer className="footer">

      {/* =====================================================
          ROTATING MANDALA
      ====================================================== */}
      <img
        src={mandala}
        alt=""
        aria-hidden="true"
        className="footer__mandala"
      />

      <div className="container footer__container">

        {/* =====================================================
            MAIN FOOTER CONTENT
        ====================================================== */}
        <div className="footer__content">

          {/* =================================================
              BRAND / INSTITUTE
          ================================================== */}
          <div className="footer__brand">

            {/* Merged Logos */}
            <div className="footer__logo-group">

              <img
                src={iiitLogo}
                alt="IIIT Una"
                className="footer__iiit-logo"
              />

              <img
                src={logoImg}
                alt="Mridang"
                className="footer__mridang-logo"
              />

            </div>

            {/* Institute Information */}
            <div className="footer__info">

              <h3>
                Indian Institute of
                <br />
                Information Technology Una
              </h3>

              <h4>Contacts</h4>

              <a href="mailto:mridang@iiitu.ac.in">
                mridang@iiitu.ac.in
              </a>

              <a
                href="https://www.iiitu.ac.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.iiitu.ac.in
              </a>

            </div>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================== */}
          <div className="footer__section">

            <h4>Navigation</h4>

            <a href="#schedule">
              Schedule
            </a>

            <a href="#sponsors">
              Sponsors
            </a>

            <a href="#about">
              About Us
            </a>

            <a href="#teams">
              Teams
            </a>

            <a href="#contact">
              Contact Us
            </a>

          </div>


          {/* =================================================
              SOCIALS
          ================================================== */}
          <div className="footer__section">

            <h4>Socials</h4>


            {/* Instagram */}
            <a
              href="https://www.instagram.com/mridang_iiitu/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="Instagram"
            >

              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>

              <span>mridang.iiitu</span>

            </a>


            {/* Email */}
            <a
              href="mailto:mridang@iiitu.ac.in"
              className="footer__social"
              aria-label="Email"
            >

              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M4 7L12 13L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>mridang@iiitu.ac.in</span>

            </a>


            {/* YouTube */}
            <a
              href="https://www.youtube.com/@MridangIIITU"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="YouTube"
            >

              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="
                    M21.2 7.2
                    C21 6.4 20.4 5.8 19.6 5.6
                    C18.2 5.2 12 5.2 12 5.2
                    C12 5.2 5.8 5.2 4.4 5.6
                    C3.6 5.8 3 6.4 2.8 7.2
                    C2.4 8.6 2.4 12 2.4 12
                    C2.4 12 2.4 15.4 2.8 16.8
                    C3 17.6 3.6 18.2 4.4 18.4
                    C5.8 18.8 12 18.8 12 18.8
                    C12 18.8 18.2 18.8 19.6 18.4
                    C20.4 18.2 21 17.6 21.2 16.8
                    C21.6 15.4 21.6 12 21.6 12
                    C21.6 12 21.6 8.6 21.2 7.2Z
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                <path
                  d="M10 9L15 12L10 15V9Z"
                  fill="currentColor"
                />

              </svg>

              <span>Mridang IIITU</span>

            </a>

          </div>


          {/* =================================================
              COUNTDOWN
          ================================================== */}
          <div className="footer__timer-wrapper">
            <Countdown />
          </div>

        </div>


        {/* =====================================================
            COPYRIGHT
        ====================================================== */}
        <div className="footer__bottom">

          <p>
            © Indian Institute of Information Technology Una,
            Himachal Pradesh 2026
          </p>

        </div>

      </div>
    </footer>
  );
}