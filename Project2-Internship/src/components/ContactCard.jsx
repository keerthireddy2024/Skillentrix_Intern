import './ContactCard.css';

function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ContactCard({ contact, onDelete, style }) {
  const { id, fullName, jobTitle, company, phone, email, bio, avatarUrl } = contact;

  return (
    <article className="contact-card" style={style} id={`contact-card-${id}`}>
      {/* Delete Button */}
      <button
        className="card-delete"
        onClick={() => onDelete(id)}
        aria-label={`Delete ${fullName}`}
        title="Remove contact"
        type="button"
        id={`delete-btn-${id}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Avatar */}
      <div className="card-avatar-wrapper">
        {avatarUrl ? (
          <img
            className="card-avatar card-avatar--img"
            src={avatarUrl}
            alt={`${fullName}'s avatar`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="card-avatar card-avatar--initials"
          style={{ display: avatarUrl ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          {getInitials(fullName)}
        </div>
      </div>

      {/* Info */}
      <h3 className="card-name">{fullName}</h3>
      <p className="card-role">
        {jobTitle} <span className="card-dot">·</span> {company}
      </p>

      <hr className="card-divider" />

      {/* Contact Details */}
      <div className="card-details">
        <div className="card-detail-row">
          <span className="card-detail-icon" aria-hidden="true">📞</span>
          <span className="card-detail-text">{phone}</span>
        </div>
        <div className="card-detail-row">
          <span className="card-detail-icon" aria-hidden="true">✉️</span>
          <span className="card-detail-text card-detail-email">{email}</span>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <p className="card-bio">{bio}</p>
      )}
    </article>
  );
}

export default ContactCard;
