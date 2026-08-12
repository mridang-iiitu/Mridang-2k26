import { motion } from "framer-motion";
import {
  fadeSlideUp,
  staggerContainer,
  viewportConfig,
} from "../hooks/animations";

const SCHEDULE = [
  {
    day: "Day 1 — Sept 26",
    title: "Resonance",
    desc: "Opening ceremony, classical fusion performances, and the battle of bands qualifier round.",
    time: "10:00 AM — 9:00 PM",
  },
  {
    day: "Day 2 — Sept 27",
    title: "Kaleidoscope",
    desc: "Dance battles, street art showcase, fashion walk, and the stand-up comedy night.",
    time: "11:00 AM — 11:00 PM",
  },
  {
    day: "Day 3 — Sept 28",
    title: "Crescendo",
    desc: "Grand finale — pro-night with headline artists, awards ceremony, and the closing celebration.",
    time: "4:00 PM — 2:00 AM",
  },
  {
    day: "All Days",
    title: "Open Mic & Workshops",
    desc: "Drop-in jam sessions, beat-boxing workshops, pottery, mehendi, and photography walks.",
    time: "Throughout the day",
  },
  {
    day: "Day 1 & 2",
    title: "Competitive Events",
    desc: "Solo singing, group dance, dramatics, creative writing, quiz, and coding competitions.",
    time: "Varies by event",
  },
  {
    day: "Day 2 Evening",
    title: "Cultural Night",
    desc: "A curated evening of regional folk performances showcasing India's diverse heritage.",
    time: "6:00 PM — 9:00 PM",
  },
];

export default function Schedule() {
  return (
    <section className="schedule section" id="schedule">
      <div className="container">
        <motion.h2
          className="section-heading"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Schedule
        </motion.h2>
        <motion.p
          className="section-subtext"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Three days of non-stop culture, creativity, and celebration.
        </motion.p>

        <motion.div
          className="schedule__grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SCHEDULE.map((item) => (
            <motion.div
              key={item.title}
              className="schedule__card"
              variants={fadeSlideUp}
            >
              <div className="schedule__card-accent" />
              <span className="schedule__card-day">{item.day}</span>
              <h3 className="schedule__card-title">{item.title}</h3>
              <p className="schedule__card-desc">{item.desc}</p>
              <span className="schedule__card-time">{item.time}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
