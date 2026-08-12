import { motion } from "framer-motion";
import {
  fadeSlideUp,
  fadeSlideLeft,
  fadeSlideRight,
  viewportConfig,
} from "../hooks/animations";

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.h2
          className="section-heading"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="section-subtext"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Have questions? We&apos;d love to hear from you.
        </motion.p>

        <div className="contact__content">
          {/* Info */}
          <motion.div
            className="contact__info"
            variants={fadeSlideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="contact__info-block">
              <span className="contact__info-label">Email</span>
              <span className="contact__info-value">
                <a href="mailto:mridang@mitu.edu">mridang@mitu.edu</a>
              </span>
            </div>
            <div className="contact__info-block">
              <span className="contact__info-label">Phone</span>
              <span className="contact__info-value">
                <a href="tel:+919876543210">+91 98765 43210</a>
              </span>
            </div>
            <div className="contact__info-block">
              <span className="contact__info-label">Location</span>
              <span className="contact__info-value">
                MITU Campus, Main Auditorium<br />
                Pune, Maharashtra 411001
              </span>
            </div>
            <div className="contact__info-block">
              <span className="contact__info-label">Follow Us</span>
              <span className="contact__info-value">
                <a href="#">Instagram</a> &nbsp;·&nbsp;{" "}
                <a href="#">Twitter</a> &nbsp;·&nbsp;{" "}
                <a href="#">YouTube</a>
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact__form"
            variants={fadeSlideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="contact__field">
              <label htmlFor="contact-name">Name</label>
              <input type="text" id="contact-name" placeholder="Your name" />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input type="email" id="contact-email" placeholder="you@example.com" />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Your message..."
                rows={5}
              />
            </div>
            <button type="submit" className="contact__submit" id="contact-submit">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
