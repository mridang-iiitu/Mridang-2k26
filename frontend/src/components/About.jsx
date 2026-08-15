import { motion } from "framer-motion";
import {
  fadeSlideUp,
  fadeSlideLeft,
  fadeSlideRight,
  staggerContainer,
  viewportConfig,
} from "../hooks/animations";
import bgImg from "../assets/BG1.webp";

const stats = [
  { number: "5K+", label: "Attendees" },
  { number: "50+", label: "Events" },
  { number: "3", label: "Days" },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.h2
          className="section-heading"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          About Mridang
        </motion.h2>
        <motion.p
          className="section-subtext"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Where tradition meets the avant-garde — three days of music, dance,
          art, and unbridled celebration.
        </motion.p>

        <div className="about__content">
          {/* Text Side */}
          <motion.div
            className="about__text"
            variants={fadeSlideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p>
              Mridang is MITU&apos;s flagship cultural festival, bringing together
              thousands of students, artists, and performers from across the
              country. From electrifying pro-nights to soul-stirring classical
              recitals, Mridang celebrates every shade of Indian culture.
            </p>
            <p>
              Named after the ancient percussion instrument, Mridang embodies
              the rhythm that connects us all — a beat that transcends
              boundaries, genres, and generations.
            </p>

            <motion.div
              className="about__highlight"
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  className="about__stat"
                  variants={fadeSlideUp}
                >
                  <span className="about__stat-number">{s.number}</span>
                  <span className="about__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="about__visual"
            variants={fadeSlideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="about__image-frame">
              <img
                src={bgImg}
                alt="Mridang cultural fest performance"
              />
            </div>
            <div className="about__image-glow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
