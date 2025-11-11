import { createContext, useContext, useEffect, useState } from "react";

const ContactsContext = createContext(null);

/* eslint-disable react-refresh/only-export-components */
export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => {
    try {
      const raw = localStorage.getItem("contacts");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch {
      (error) => error.message;
    }
  }, [contacts]);

  const addOrUpdateContact = (contact, navigate = null) => {
    if (editIndex !== null && editData !== null) {
      setContacts((prev) =>
        prev.map((c, i) => (i === editIndex ? contact : c))
      );
      setEditData(null);
      setEditIndex(null);
    } else {
      setContacts((prev) => [...prev, contact]);
    }
    if (typeof navigate === "function") navigate("/");
  };

  const deleteContact = (index) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
    setSelectedContacts((prev) => prev.filter((i) => i !== index));
  };

  const deleteSelected = () => {
    if (selectedContacts.length === 0) return;
    setContacts((prev) => prev.filter((_, i) => !selectedContacts.includes(i)));
    setSelectedContacts([]);
  };

  const deleteAll = () => {
    setContacts([]);
    setSelectedContacts([]);
  };

  const toggleSelect = (index) => {
    setSelectedContacts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const startEdit = (index, navigate) => {
    setEditData(contacts[index] ?? null);
    setEditIndex(index);
    if (typeof navigate === "function") navigate("/add");
  };

  const filteredContacts = contacts.filter((c) => {
    if (!c) return false;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    const name = (c.user || "").toLowerCase();
    const email = (c.email || "").toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        filteredContacts,
        selectedContacts,
        editData,
        editIndex,
        searchTerm,
        setSearchTerm,
        addOrUpdateContact,
        deleteContact,
        deleteSelected,
        deleteAll,
        toggleSelect,
        startEdit,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContext;
