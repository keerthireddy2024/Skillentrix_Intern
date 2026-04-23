import { useState } from 'react';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import './App.css';

// Seed contacts so grid is never empty on first load
const SEED_CONTACTS = [
  {
    id: crypto.randomUUID(),
    fullName: 'Sarah Chen',
    jobTitle: 'Product Designer',
    company: 'Figma',
    phone: '+1 (415) 555-0142',
    email: 'sarah.chen@figma.com',
    bio: 'Passionate about creating intuitive user experiences. Previously at Google and Airbnb.',
    avatarUrl: '',
  },
  {
    id: crypto.randomUUID(),
    fullName: 'James Rodriguez',
    jobTitle: 'Senior Engineer',
    company: 'Stripe',
    phone: '+1 (628) 555-0198',
    email: 'j.rodriguez@stripe.com',
    bio: 'Full-stack developer specializing in payment infrastructure and distributed systems.',
    avatarUrl: '',
  },
  {
    id: crypto.randomUUID(),
    fullName: 'Priya Sharma',
    jobTitle: 'Engineering Manager',
    company: 'Vercel',
    phone: '+1 (212) 555-0267',
    email: 'priya.sharma@vercel.com',
    bio: '',
    avatarUrl: '',
  },
];

function App() {
  const [contacts, setContacts] = useState(SEED_CONTACTS);
  const [searchTerm, setSearchTerm] = useState('');

  const addContact = (contact) => {
    setContacts((prev) => [{ ...contact, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Filter contacts by search term (case-insensitive match on name + company)
  const filteredContacts = contacts.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(term) ||
      c.company.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <span className="navbar-logo" id="navbar-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--primary)" />
              <path d="M8 10.5C8 9.11929 9.11929 8 10.5 8H17.5C18.8807 8 20 9.11929 20 10.5V17.5C20 18.8807 18.8807 20 17.5 20H10.5C9.11929 20 8 18.8807 8 17.5V10.5Z" fill="var(--primary-light)" fillOpacity="0.5"/>
              <path d="M14 11C12.8954 11 12 11.8954 12 13C12 14.1046 12.8954 15 14 15C15.1046 15 16 14.1046 16 13C16 11.8954 15.1046 11 14 11Z" fill="white"/>
              <path d="M10.5 19C10.5 17.067 12.067 15.5 14 15.5C15.933 15.5 17.5 17.067 17.5 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            ContactVault
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-container" id="main-content">
        <section className="hero-section" id="hero-section">
          <h1 className="hero-title">
            Your contacts,<br />
            <span className="hero-accent">beautifully organized.</span>
          </h1>
          <p className="hero-subtitle">
            Add, search, and manage your professional network in one place.
          </p>
        </section>

        <ContactForm onAddContact={addContact} />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ContactList
          contacts={filteredContacts}
          totalContacts={contacts.length}
          searchTerm={searchTerm}
          onDeleteContact={deleteContact}
        />
      </main>

      {/* Footer */}
      <footer className="footer" id="footer">
        <p>© 2026 ContactVault. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
