import React from 'react';
import styles from './About.module.css';

const TIMELINE = [
  { year: '2022', event: 'Started B.E. in Computer Engineering' },
  { year: '2023', event: 'Built first MERN stack project' },
  { year: '2024', event: 'Completed multiple full-stack assignments' },
  { year: '2025', event: 'Advanced React & Node.js projects' },
];

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      {/* Decorative glow */}
      <div className={styles.glowLeft} />

      <div className="container">
        <div className={styles.grid}>
          {/* Left: Info */}
          <div className={styles.info}>
            <span className="section-label">Who I Am</span>
            <h2 className={styles.title}>
              Passionate about building <span className="text-gradient">real-world</span> solutions
            </h2>
            <p className={styles.para}>
              I'm a final-year Computer Engineering student from Pune, with a deep love for
              crafting full-stack web applications. I believe in writing clean, scalable code
              and creating interfaces that users actually enjoy using.
            </p>
            <p className={styles.para}>
              My stack of choice is the <strong>MERN stack</strong> — MongoDB, Express.js,
              React, and Node.js. I enjoy every layer of the stack, from designing database
              schemas to polishing pixel-perfect UIs.
            </p>

            <div className={styles.highlights}>
              {[
                { icon: '🎓', label: 'T.Y. B.E. Computer Engineering' },
                { icon: '📍', label: 'Pune, Maharashtra, India' },
                { icon: '💼', label: 'Open to internships & freelance' },
                { icon: '🏆', label: 'MERN Stack Specialist' },
              ].map(({ icon, label }) => (
                <div key={label} className={styles.highlight}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className={styles.timelineWrapper}>
            <div className={styles.timelineCard + ' glass-panel'}>
              <h3 className={styles.timelineTitle}>My Journey</h3>
              <div className={styles.timeline}>
                {TIMELINE.map(({ year, event }, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineYear}>{year}</span>
                      <p>{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
