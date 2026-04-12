import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate send
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const CONTACT_INFO = [
    { icon: '📧', label: 'Email', value: 'arya@example.com', href: 'mailto:arya@example.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/arya', href: 'https://linkedin.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/arya', href: 'https://github.com' },
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.glowBottom} />
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Get In Touch</span>
          <h2 className={styles.title}>
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className={styles.subtitle}>
            Have an opportunity, project idea, or just want to say hi?
            My inbox is always open.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Info */}
          <div className={styles.infoCol}>
            <div className={`${styles.infoCard} glass-panel`}>
              <h3>Contact Info</h3>
              <p className={styles.infoText}>
                I'm currently open to internship opportunities and freelance projects.
                Let's build something amazing together!
              </p>

              <div className={styles.contactItems}>
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.contactItem}>
                    <span className={styles.contactIcon}>{icon}</span>
                    <div>
                      <span className={styles.contactLabel}>{label}</span>
                      <span className={styles.contactValue}>{value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className={styles.availability}>
                <span className={styles.availDot} />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.formCol}>
            {submitted ? (
              <div className={`${styles.successBox} glass-panel`}>
                <div className={styles.successIcon}>🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form
                className={`${styles.form} glass-panel`}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Arya Kulkarni"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? styles.inputError : ''}
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? styles.inputError : ''}
                  />
                  {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <><span className={styles.spinner} /> Sending...</>
                  ) : (
                    'Send Message ✦'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
