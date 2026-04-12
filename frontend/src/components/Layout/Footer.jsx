import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    { label: 'GitHub', icon: '🐙', href: 'https://github.com' },
    { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { label: 'Twitter', icon: '🐦', href: 'https://twitter.com' },
  ];

  const links = [
    { label: 'Home',     href: '#home' },
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact',  href: '#contact' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <a href="#home" className="text-gradient" style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 900, letterSpacing: '-1px' }}>
            &lt;Arya/&gt;
          </a>
          <p className={styles.tagline}>
            Building scalable MERN applications<br />
            with clean code & great UX.
          </p>
          <div className={styles.socials}>
            {socials.map(({ label, icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.socialLink} aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.navLinks}>
          <h4>Quick Links</h4>
          <ul>
            {links.map(({ label, href }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.stack}>
          <h4>My Stack</h4>
          <ul>
            {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'REST APIs'].map((t) => (
              <li key={t}><span className={styles.stackItem}>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className="container">
          <p>© {year} Arya. Crafted with ❤️ using React &amp; Vite.</p>
          <p className={styles.madeWith}>MERN Stack Developer · Open to Work</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
