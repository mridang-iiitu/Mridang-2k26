import { motion } from "framer-motion";
import {
  fadeSlideUp,
  staggerContainer,
  viewportConfig,
} from "../hooks/animations";

const TEAM = [
  { name: "Arjun Mehta", role: "Convenor", dept: "Computer Science", initials: "AM" },
  { name: "Priya Sharma", role: "Co-Convenor", dept: "Design & Media", initials: "PS" },
  { name: "Rohan Gupta", role: "Tech Lead", dept: "Electronics", initials: "RG" },
  { name: "Sneha Iyer", role: "Creative Head", dept: "Fine Arts", initials: "SI" },
  { name: "Kabir Singh", role: "Logistics", dept: "Mechanical Eng.", initials: "KS" },
  { name: "Ananya Desai", role: "Marketing", dept: "MBA", initials: "AD" },
  { name: "Vikram Nair", role: "Sponsorship", dept: "Commerce", initials: "VN" },
  { name: "Meera Joshi", role: "Cultural Head", dept: "Music & Dance", initials: "MJ" },
];

export default function Teams() {
  return (
    <section className="teams section" id="teams">
      <div className="container">
        <motion.h2
          className="section-heading"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          The Team
        </motion.h2>
        <motion.p
          className="section-subtext"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          The passionate minds behind Mridang.
        </motion.p>

        <motion.div
          className="teams__grid"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              className="teams__card"
              variants={fadeSlideUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="teams__avatar">{member.initials}</div>
              <h3 className="teams__name">{member.name}</h3>
              <span className="teams__role">{member.role}</span>
              <p className="teams__dept">{member.dept}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
