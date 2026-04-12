import React, { useState } from 'react';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import RadioGroup from './components/RadioGroup';
import { CheckCircle } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    institution: '',
    hackathonTheme: '',
    specialSkills: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const themeOptions = [
    { value: 'ai_automation', label: 'AI & Automation' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'future_mobility', label: 'Future Mobility' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.participantName.trim()) newErrors.participantName = 'Participant name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.institution.trim()) newErrors.institution = 'Institution or team name is required';
    if (!formData.hackathonTheme) newErrors.hackathonTheme = 'Please select a theme';
    if (!formData.specialSkills.trim()) newErrors.specialSkills = 'Please list at least one skill';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [page, setPage] = useState('home');

  const resetForm = () => {
    setFormData({
      participantName: '',
      email: '',
      institution: '',
      hackathonTheme: '',
      specialSkills: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const startRegistration = () => {
    resetForm();
    setPage('register');
  };

  const backToHome = () => {
    setPage('home');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="page">
      {page === 'home' && (
        <section className="home-hero">
          <div className="home-copy">
            <span className="eyebrow">Technoverse 2026</span>
            <h1>Refreshingly simple registration, built to breathe.</h1>
            <p className="home-text">
              A clean launch page for the Technoverse hackathon. Pick a theme,
              submit your profile, and focus only on ideas that matter.
            </p>
            <button className="hero-btn" type="button" onClick={startRegistration}>
              Register Now
            </button>
          </div>

          <div className="home-features">
            <div className="feature-card">
              <strong>8 teams per college</strong>
              <span>Limited slots to keep experience focused.</span>
            </div>
            <div className="feature-card">
              <strong>April 10 deadline</strong>
              <span>Register before the final day.</span>
            </div>
            <div className="feature-card">
              <strong>Minimal info required</strong>
              <span>Only the essentials to get you started.</span>
            </div>
          </div>
        </section>
      )}

      {page === 'register' && (
        <section className="card registration-card">
          <div className="card-header">
            <button type="button" className="text-btn" onClick={backToHome}>
              ← Back to home
            </button>
            <span className="section-label">Hackathon Registration</span>
            <h2>A dedicated page for your details.</h2>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} noValidate>
              <InputField
                label="Participant Name"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                error={errors.participantName}
                placeholder="e.g. Jane Doe"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="participant@example.com"
              />

              <InputField
                label="Institution / Team"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                error={errors.institution}
                placeholder="e.g. XYZ University or Team Innovate"
              />

              <RadioGroup
                label="Hackathon Theme"
                name="hackathonTheme"
                options={themeOptions}
                value={formData.hackathonTheme}
                onChange={handleChange}
                error={errors.hackathonTheme}
              />

              <InputField
                label="Special Skills / Traits"
                name="specialSkills"
                type="textarea"
                value={formData.specialSkills}
                onChange={handleChange}
                error={errors.specialSkills}
                placeholder="List any unique abilities, hackathon experience, or innovation strengths..."
              />

              <button type="submit" className="submit-btn">
                Submit Registration
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={40} />
              </div>
              <h2>Registration Complete!</h2>
              <p>Thank you, <strong>{formData.participantName}</strong>.</p>
              <p>
                Your submission from <strong>{formData.institution}</strong> for the{' '}
                <strong>
                  {themeOptions.find((t) => t.value === formData.hackathonTheme)?.label}
                </strong>{' '}
                theme is being reviewed.
              </p>
              <p className="success-detail">
                Further orders will be transmitted to:<br />
                <span>{formData.email}</span>
              </p>

              <button className="restart-btn" onClick={backToHome}>
                Back to home
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
