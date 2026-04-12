import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const TYPED_WORDS = ['Full Stack Developer', 'MERN Stack Engineer', 'UI/UX Enthusiast', 'Problem Solver'];

const Hero = () => {
  const typedRef = useRef(null);
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout;
    const type = () => {
      const current = TYPED_WORDS[wordIndex.current];
      const el = typedRef.current;
      if (!el) return;

      if (isDeleting.current) {
        el.textContent = current.substring(0, charIndex.current - 1);
        charIndex.current--;
      } else {
        el.textContent = current.substring(0, charIndex.current + 1);
        charIndex.current++;
      }

      if (!isDeleting.current && charIndex.current === current.length) {
        isDeleting.current = true;
        timeout = setTimeout(type, 1800);
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        wordIndex.current = (wordIndex.current + 1) % TYPED_WORDS.length;
        timeout = setTimeout(type, 400);
      } else {
        timeout = setTimeout(type, isDeleting.current ? 60 : 90);
      }
    };
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" className={styles.heroSection}>
      {/* Animated background elements */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* LEFT: Text */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.pulse} />
            Available for Internship & Projects
          </div>

          <h1 className={styles.title}>
            Hi, I'm{' '}
            <span className="text-gradient">Arya</span>
            <br />
            <span className={styles.typedWrapper}>
              <span ref={typedRef} className={styles.typed} />
              <span className={styles.cursor}>|</span>
            </span>
          </h1>

          <p className={styles.subtitle}>
            A passionate MERN Stack developer crafting seamless digital experiences —
            from pixel-perfect UIs to robust REST APIs and MongoDB schemas.
          </p>

          <div className={styles.techRow}>
            {['MongoDB', 'Express', 'React', 'Node.js'].map((tech) => (
              <span key={tech} className={styles.techChip}>{tech}</span>
            ))}
          </div>

          <div className={styles.heroActions}>
            <a href="#projects" className={styles.primaryBtn}>
              View Projects <span>→</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className={styles.secondaryBtn}
            >
              Download Resume ↓
            </a>
          </div>
        </div>

        {/* RIGHT: Visual card */}
        <div className={styles.visualContent}>
          <div className={styles.floatCard}>
            <div className={`${styles.profileCard} glass-panel`}>
              <div className={styles.avatarRing}>
                <div className={styles.avatar}>
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="30" r="18" fill="url(#av1)" />
                    <ellipse cx="40" cy="72" rx="28" ry="18" fill="url(#av2)" />
                    <defs>
                      <linearGradient id="av1" x1="22" y1="12" x2="58" y2="48" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00f5d4" />
                        <stop offset="1" stopColor="#bf5af2" />
                      </linearGradient>
                      <linearGradient id="av2" x1="12" y1="54" x2="68" y2="90" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0a84ff" />
                        <stop offset="1" stopColor="#00f5d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 className={styles.cardName}>Arya K.</h3>
              <p className={styles.cardRole}>MERN Stack Developer</p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <strong>10+</strong>
                  <span>Projects</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong>CRUD</strong>
                  <span>Mastery</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong>TY</strong>
                  <span>Student</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className={`${styles.floatBadge} ${styles.floatBadge1}`}>
              <span>⚡</span> Node.js Pro
            </div>
            <div className={`${styles.floatBadge} ${styles.floatBadge2}`}>
              <span>🎨</span> React Expert
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#about" className={styles.scrollHint} aria-label="Scroll to about section">
        <span />
      </a>
    </section>
  );
};

export default Hero;
