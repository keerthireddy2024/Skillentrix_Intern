import ContactCard from './ContactCard';
import './ContactList.css';

function ContactList({ contacts, totalContacts, searchTerm, onDeleteContact }) {
  const isSearching = searchTerm.trim().length > 0;
  const isEmpty = contacts.length === 0;

  return (
    <section className="list-section" id="contact-list-section">
      <h2 className="list-heading">
        Contacts <span className="list-count">({contacts.length})</span>
      </h2>

      {isEmpty ? (
        <div className="list-empty" id="empty-state">
          <div className="list-empty-illustration">
            {isSearching ? (
              /* Search miss icon */
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="28" cy="28" r="18" stroke="var(--border)" strokeWidth="3"/>
                <path d="M42 42L56 56" stroke="var(--border)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M22 24L34 36M34 24L22 36" stroke="var(--primary-light)" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Empty cards icon */
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="8" y="14" width="36" height="44" rx="6" stroke="var(--border)" strokeWidth="2.5" fill="var(--primary-light)" fillOpacity="0.3"/>
                <rect x="20" y="6" width="36" height="44" rx="6" stroke="var(--border)" strokeWidth="2.5" fill="var(--surface)"/>
                <circle cx="38" cy="22" r="6" fill="var(--primary-light)"/>
                <path d="M28 38H48" stroke="var(--border)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M28 44H42" stroke="var(--border)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <p className="list-empty-text">
            {isSearching
              ? 'No contacts match your search.'
              : 'No contacts yet. Add your first one above!'}
          </p>
        </div>
      ) : (
        <div className="list-grid" id="contacts-grid">
          {contacts.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
              style={{ animationDelay: `${index * 0.06}s` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ContactList;
