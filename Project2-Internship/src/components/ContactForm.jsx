import { useState } from 'react';
import './ContactForm.css';

const INITIAL_FORM = {
  fullName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  bio: '',
  avatarUrl: '',
};

function ContactForm({ onAddContact }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [toastExiting, setToastExiting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!form.company.trim()) newErrors.company = 'Company is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddContact({ ...form });
    setForm(INITIAL_FORM);
    setErrors({});

    // Show success toast
    setToastExiting(false);
    setToast(true);
    setTimeout(() => {
      setToastExiting(true);
      setTimeout(() => {
        setToast(false);
        setToastExiting(false);
      }, 300);
    }, 2200);
  };

  const bioLength = form.bio.length;

  return (
    <section className="form-section" id="contact-form-section">
      <h2 className="form-heading">Add New Contact</h2>

      <form className="form-card" onSubmit={handleSubmit} noValidate id="contact-form">
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
              placeholder="e.g. Jane Doe"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </div>

          {/* Job Title */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className={`form-input ${errors.jobTitle ? 'form-input--error' : ''}`}
              placeholder="e.g. Senior Developer"
              value={form.jobTitle}
              onChange={handleChange}
            />
            {errors.jobTitle && <span className="form-error">{errors.jobTitle}</span>}
          </div>

          {/* Company */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              className={`form-input ${errors.company ? 'form-input--error' : ''}`}
              placeholder="e.g. Acme Corp"
              value={form.company}
              onChange={handleChange}
              autoComplete="organization"
            />
            {errors.company && <span className="form-error">{errors.company}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
              placeholder="e.g. +1 (555) 123-4567"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              placeholder="e.g. jane@company.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Avatar URL */}
          <div className="form-group">
            <label className="form-label caption" htmlFor="avatarUrl">Avatar URL <span className="form-optional">(optional)</span></label>
            <input
              type="url"
              id="avatarUrl"
              name="avatarUrl"
              className="form-input"
              placeholder="e.g. https://example.com/photo.jpg"
              value={form.avatarUrl}
              onChange={handleChange}
            />
          </div>

          {/* Bio — Full Width */}
          <div className="form-group form-group--full">
            <label className="form-label caption" htmlFor="bio">
              Short Bio <span className="form-optional">(optional)</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              className="form-input form-textarea"
              placeholder="A brief intro..."
              value={form.bio}
              onChange={handleChange}
              maxLength={160}
              rows={3}
            />
            <span className={`form-charcount ${bioLength > 140 ? 'form-charcount--warn' : ''}`}>
              {bioLength}/160
            </span>
          </div>

          {/* Submit — Full Width */}
          <div className="form-group form-group--full">
            <button type="submit" className="form-submit" id="submit-contact-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Contact
            </button>
          </div>
        </div>
      </form>

      {/* Success Toast */}
      {toast && (
        <div className={`toast ${toastExiting ? 'toast--exit' : ''}`} id="success-toast" role="alert">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="var(--success)"/>
            <path d="M6 10.5L8.5 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Contact added!
        </div>
      )}
    </section>
  );
}

export default ContactForm;
