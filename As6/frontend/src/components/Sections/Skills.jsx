import React from 'react';
import styles from './Skills.module.css';

const SKILLS = [
  { category: 'Frontend',  color: '#00f5d4', items: [
    { name: 'React.js',    level: 88 },
    { name: 'HTML & CSS',  level: 92 },
    { name: 'JavaScript',  level: 85 },
    { name: 'Responsive Design', level: 80 },
  ]},
  { category: 'Backend',   color: '#bf5af2', items: [
    { name: 'Node.js',     level: 82 },
    { name: 'Express.js',  level: 80 },
    { name: 'REST APIs',   level: 85 },
    { name: 'JWT Auth',    level: 75 },
  ]},
  { category: 'Database',  color: '#0a84ff', items: [
    { name: 'MongoDB',     level: 80 },
    { name: 'Mongoose',    level: 78 },
    { name: 'SQL Basics',  level: 65 },
  ]},
  { category: 'Tools',     color: '#ff9f0a', items: [
    { name: 'Git & GitHub', level: 85 },
    { name: 'VS Code',     level: 92 },
    { name: 'Postman',     level: 78 },
    { name: 'Vite',        level: 75 },
  ]},
];

const SkillBar = ({ name, level, color }) => (
  <div className={styles.skillItem}>
    <div className={styles.skillHeader}>
      <span className={styles.skillName}>{name}</span>
      <span className={styles.skillLevel} style={{ color }}>{level}%</span>
    </div>
    <div className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{ '--w': `${level}%`, '--color': color }}
      />
    </div>
  </div>
);

const Skills = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.glowRight} />
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Expertise</span>
          <h2 className={styles.title}>
            My <span className="text-gradient">Tech Stack</span> & Skills
          </h2>
          <p className={styles.subtitle}>
            Technologies I work with daily, crafting end-to-end MERN applications.
          </p>
        </div>

        <div className={styles.grid}>
          {SKILLS.map(({ category, color, items }) => (
            <div key={category} className={`${styles.card} glass-panel`}>
              <div className={styles.cardHeader}>
                <div className={styles.dot} style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                <h3 className={styles.category} style={{ color }}>{category}</h3>
              </div>
              <div className={styles.skillList}>
                {items.map((skill) => (
                  <SkillBar key={skill.name} {...skill} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech logos strip */}
        <div className={styles.techStrip}>
          {['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'Git', 'HTML5', 'CSS3', 'REST API', 'JWT'].map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
