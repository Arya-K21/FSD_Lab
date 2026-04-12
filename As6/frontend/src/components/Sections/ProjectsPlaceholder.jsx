import React, { useState, useEffect } from 'react';
import styles from './Projects.module.css';

/* ── Helpers ─────────────────────────────────────────────── */
const STORAGE_KEY = 'portfolio_projects';

const DEFAULTS = [
  {
    id: '1',
    title: 'Weather Prediction App',
    description:
      'A machine-learning powered web app that predicts weather using a FastAPI backend with a React frontend. Integrates with a Random Forest model for real-time classification.',
    tags: ['React', 'FastAPI', 'Python', 'ML'],
    github: 'https://github.com',
    live: '',
    color: '#00f5d4',
  },
  {
    id: '2',
    title: 'Meal Prep PWA',
    description:
      'A Progressive Web App for managing weekly meal plans, macro tracking, and grocery lists. Features JWT auth, per-user data isolation, and offline support.',
    tags: ['React', 'Node.js', 'MongoDB', 'PWA'],
    github: 'https://github.com',
    live: '',
    color: '#bf5af2',
  },
  {
    id: '3',
    title: 'Student Portal MERN',
    description:
      'Full-stack student data management system with CRUD operations, form validation, and admin panel. Built with Express REST API and MongoDB Atlas.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com',
    live: '',
    color: '#0a84ff',
  },
];

const TAG_COLORS = ['#00f5d4', '#bf5af2', '#0a84ff', '#ff9f0a', '#ff375f'];
const PRESET_TAGS = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Python', 'REST API', 'HTML/CSS'];

const getProjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
};

const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const CARD_COLORS = ['#00f5d4', '#bf5af2', '#0a84ff', '#ff9f0a', '#ff375f', '#34d399'];

/* ── Modal ───────────────────────────────────────────────── */
const EMPTY_FORM = { title: '', description: '', tags: [], github: '', live: '', color: CARD_COLORS[0] };

const Modal = ({ mode, project, onClose, onSave }) => {
  const [form, setForm] = useState(mode === 'edit' ? { ...project } : { ...EMPTY_FORM, id: Date.now().toString() });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.tags.length === 0) e.tags = 'Add at least one tag';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  const addTag = (tag) => {
    const t = tag.trim();
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
      setErrors((e) => ({ ...e, tags: undefined }));
    }
    setTagInput('');
  };

  const removeTag = (tag) => setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{mode === 'edit' ? '✏️ Edit Project' : '✦ Add New Project'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Title */}
          <div className={styles.field}>
            <label htmlFor="proj-title">Project Title *</label>
            <input
              id="proj-title"
              type="text"
              placeholder="e.g. Chat Application"
              value={form.title}
              onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setErrors((er) => ({ ...er, title: undefined })); }}
              className={errors.title ? styles.inputError : ''}
            />
            {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label htmlFor="proj-desc">Description *</label>
            <textarea
              id="proj-desc"
              rows={3}
              placeholder="Briefly describe what this project does..."
              value={form.description}
              onChange={(e) => { setForm((f) => ({ ...f, description: e.target.value })); setErrors((er) => ({ ...er, description: undefined })); }}
              className={errors.description ? styles.inputError : ''}
            />
            {errors.description && <span className={styles.errorMsg}>{errors.description}</span>}
          </div>

          {/* Tags */}
          <div className={styles.field}>
            <label>Tech Tags *</label>
            <div className={styles.tagInputRow}>
              <input
                type="text"
                placeholder="Type and press Enter or comma"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput); } }}
                className={errors.tags ? styles.inputError : ''}
              />
            </div>
            {/* Presets */}
            <div className={styles.presetTags}>
              {PRESET_TAGS.filter((t) => !form.tags.includes(t)).map((t) => (
                <button key={t} type="button" className={styles.presetTag} onClick={() => addTag(t)}>+ {t}</button>
              ))}
            </div>
            <div className={styles.selectedTags}>
              {form.tags.map((t, i) => (
                <span key={t} className={styles.tag} style={{ '--tc': TAG_COLORS[i % TAG_COLORS.length] }}>
                  {t} <button type="button" onClick={() => removeTag(t)}>✕</button>
                </span>
              ))}
            </div>
            {errors.tags && <span className={styles.errorMsg}>{errors.tags}</span>}
          </div>

          {/* Links */}
          <div className={styles.fieldsRow}>
            <div className={styles.field}>
              <label htmlFor="proj-github">GitHub URL</label>
              <input id="proj-github" type="url" placeholder="https://github.com/..." value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label htmlFor="proj-live">Live Demo URL</label>
              <input id="proj-live" type="url" placeholder="https://..." value={form.live} onChange={(e) => setForm((f) => ({ ...f, live: e.target.value }))} />
            </div>
          </div>

          {/* Color picker */}
          <div className={styles.field}>
            <label>Card Accent Color</label>
            <div className={styles.colorRow}>
              {CARD_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.colorDot} ${form.color === c ? styles.colorActive : ''}`}
                  style={{ background: c, boxShadow: `0 0 12px ${c}80` }}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>
              {mode === 'edit' ? 'Save Changes ✓' : 'Add Project ✦'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Confirm Delete Dialog ───────────────────────────────── */
const ConfirmDialog = ({ project, onConfirm, onCancel }) => (
  <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onCancel()}>
    <div className={styles.confirmDialog}>
      <div className={styles.confirmIcon}>🗑️</div>
      <h3>Delete Project?</h3>
      <p>Are you sure you want to delete <strong>"{project.title}"</strong>? This action cannot be undone.</p>
      <div className={styles.confirmActions}>
        <button className={styles.cancelBtn} onClick={onCancel}>Keep It</button>
        <button className={styles.deleteConfirmBtn} onClick={onConfirm}>Yes, Delete</button>
      </div>
    </div>
  </div>
);

/* ── Project Card ────────────────────────────────────────── */
const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className={`${styles.card} glass-panel`} style={{ '--card-color': project.color }}>
    <div className={styles.cardVisual}>
      <div className={styles.cardGlow} />
      <div className={styles.cardPattern} />
      <div className={styles.cardIcon}>
        {project.title.charAt(0).toUpperCase()}
      </div>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.tags}>
        {project.tags.slice(0, 4).map((tag, i) => (
          <span key={tag} className={styles.tag} style={{ '--tc': TAG_COLORS[i % TAG_COLORS.length] }}>
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className={styles.tagMore}>+{project.tags.length - 4}</span>
        )}
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.cardLinks}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>
            GitHub ↗
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className={styles.linkBtn + ' ' + styles.linkBtnLive}>
            Live Demo ↗
          </a>
        )}
      </div>

      <div className={styles.cardActions}>
        <button className={styles.editBtn} onClick={() => onEdit(project)}>
          ✏️ Edit
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(project)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
);

/* ── Main Component ──────────────────────────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(null); // null | { mode: 'add' | 'edit', project? }
  const [confirmDelete, setConfirmDelete] = useState(null); // project | null
  const [toast, setToast] = useState(null); // { msg, type }

  useEffect(() => { setProjects(getProjects()); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (form) => {
    let updated;
    if (modal.mode === 'add') {
      updated = [...projects, form];
      showToast('Project added successfully! 🎉');
    } else {
      updated = projects.map((p) => (p.id === form.id ? form : p));
      showToast('Project updated! ✓');
    }
    setProjects(updated);
    saveProjects(updated);
    setModal(null);
  };

  const handleDelete = () => {
    const updated = projects.filter((p) => p.id !== confirmDelete.id);
    setProjects(updated);
    saveProjects(updated);
    setConfirmDelete(null);
    showToast('Project deleted.', 'error');
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.glowCenter} />

      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Portfolio</span>
          <h2 className={styles.sectionTitle}>
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className={styles.subtitle}>
            A showcase of what I've built — real-world MERN apps, ML integrations, and more.
          </p>
        </div>

        <div className={styles.topBar}>
          <span className={styles.count}>{projects.length} Project{projects.length !== 1 ? 's' : ''}</span>
          <button
            id="add-project-btn"
            className={styles.addBtn}
            onClick={() => setModal({ mode: 'add' })}
          >
            ✦ Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📂</div>
            <h3>No projects yet</h3>
            <p>Start by adding your first project above.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={(p) => setModal({ mode: 'edit', project: p })}
                onDelete={(p) => setConfirmDelete(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <Modal
          mode={modal.mode}
          project={modal.project}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {confirmDelete && (
        <ConfirmDialog
          project={confirmDelete}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${styles['toast_' + toast.type]}`}>
          {toast.msg}
        </div>
      )}
    </section>
  );
};

export default Projects;
