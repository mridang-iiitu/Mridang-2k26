import { motion } from "framer-motion";
import {
  fadeSlideUp,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "../hooks/animations";

const SPONSORS = {
  "Title Sponsor": ["86 PURE"],
  "Gold Sponsors": ["TechVista", "Harmonia Labs", "Crescendo Media"],
  "Silver Sponsors": ["SoundForge", "ArtisanCo", "RhythmBox", "Vibe Studios"],
};

export default function Sponsors() {
  return (
    <section className="sponsors section" id="sponsors">
      <div className="container">
        <motion.h2
          className="section-heading"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Our Sponsors
        </motion.h2>
        <motion.p
          className="section-subtext"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Mridang is made possible by the generous support of our partners.
        </motion.p>

        {Object.entries(SPONSORS).map(([tier, names]) => (
          <div key={tier} style={{ marginBottom: "2.5rem" }}>
            <motion.div
              className="sponsors__tier"
              variants={fadeSlideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <span className="sponsors__tier-label">{tier}</span>
            </motion.div>

            <motion.div
              className="sponsors__grid"
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {names.map((name) => (
                <motion.div
                  key={name}
                  className="sponsors__card"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="sponsors__card-name">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
