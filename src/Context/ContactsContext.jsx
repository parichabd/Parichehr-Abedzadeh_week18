import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const ContactsContext = createContext(null);

const ACTIONS = {
  LOAD: "LOAD",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  DELETE_SELECTED: "DELETE_SELECTED",
  DELETE_ALL: "DELETE_ALL",
  TOGGLE_SELECT: "TOGGLE_SELECT",
  START_EDIT: "START_EDIT",
  RESET_EDIT: "RESET_EDIT",
  SET_SEARCH: "SET_SEARCH",
  SET_CONTACTS: "SET_CONTACTS",
};

function ensureId(contact) {
  return contact && contact.id != null
    ? contact
    : { ...contact, id: Date.now() + Math.random() };
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD: {
      return {
        ...state,
        contacts: action.payload.map((c) => ensureId(c)),
      };
    }

    case ACTIONS.ADD: {
      const newContact = ensureId(action.payload);
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };
    }

    case ACTIONS.UPDATE: {
      const { id, contact } = action.payload;
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === id ? { ...contact, id } : c
        ),
        editData: null,
        editIndex: null,
      };
    }

    case ACTIONS.DELETE: {
      const id = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== id),
        selectedContacts: state.selectedContacts.filter((sid) => sid !== id),
      };
    }

    case ACTIONS.DELETE_SELECTED: {
      const toDelete = new Set(state.selectedContacts);
      return {
        ...state,
        contacts: state.contacts.filter((c) => !toDelete.has(c.id)),
        selectedContacts: [],
      };
    }

    case ACTIONS.DELETE_ALL: {
      return {
        ...state,
        contacts: [],
        selectedContacts: [],
      };
    }

    case ACTIONS.TOGGLE_SELECT: {
      const id = action.payload;
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(id)
          ? state.selectedContacts.filter((sid) => sid !== id)
          : [...state.selectedContacts, id],
      };
    }

    case ACTIONS.START_EDIT: {
      const id = action.payload;
      const contact = state.contacts.find((c) => c.id === id) ?? null;
      return {
        ...state,
        editData: contact,
        editIndex: state.contacts.findIndex((c) => c.id === id),
      };
    }

    case ACTIONS.RESET_EDIT: {
      return {
        ...state,
        editData: null,
        editIndex: null,
      };
    }

    case ACTIONS.SET_SEARCH: {
      return {
        ...state,
        searchTerm: action.payload ?? "",
      };
    }

    case ACTIONS.SET_CONTACTS: {
      return {
        ...state,
        contacts: (action.payload || []).map((c) => ensureId(c)),
      };
    }

    default:
      return state;
  }
}

const initialState = {
  contacts: [],
  selectedContacts: [],
  editData: null,
  editIndex: null,
  searchTerm: "",
};

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("contacts");
      if (raw) {
        const parsed = JSON.parse(raw);

        const normalized = parsed.map((c) => ensureId(c));
        dispatch({ type: ACTIONS.LOAD, payload: normalized });
      }
    } catch (err) {
      console.warn("Failed to load contacts from localStorage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    } catch (err) {
      console.warn("Failed to write contacts to localStorage:", err);
    }
  }, [state.contacts]);

  const addOrUpdateContact = (contact, navigate) => {
    if (state.editData && state.editData.id != null) {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: { id: state.editData.id, contact },
      });
      toast.success("Contact updated");
    } else {
      dispatch({ type: ACTIONS.ADD, payload: contact });
      toast.success("Contact added");
    }
    if (typeof navigate === "function") navigate("/");
  };

  const deleteContact = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
    toast.success("Contact deleted");
  };

  const deleteSelected = () => {
    if (state.selectedContacts.length === 0) return;
    dispatch({ type: ACTIONS.DELETE_SELECTED });
    toast.success("Selected contacts deleted");
  };

  const deleteAll = () => {
    dispatch({ type: ACTIONS.DELETE_ALL });
    toast.success("All contacts deleted");
  };

  const toggleSelect = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_SELECT, payload: id });
  };

  const startEdit = (id, navigate) => {
    dispatch({ type: ACTIONS.START_EDIT, payload: id });
    if (typeof navigate === "function") navigate("/add");
  };

  const setSearchTerm = (q) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: q });
  };

  const resetEdit = () => dispatch({ type: ACTIONS.RESET_EDIT });

  const filteredContacts = (function () {
    const q = (state.searchTerm || "").trim().toLowerCase();
    if (!q) return state.contacts;
    return state.contacts.filter((c) => {
      const name = (c.user || "").toLowerCase();
      const email = (c.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  })();

  const value = {
    contacts: state.contacts,
    filteredContacts,
    selectedContacts: state.selectedContacts,
    editData: state.editData,
    editIndex: state.editIndex,
    searchTerm: state.searchTerm,

    addOrUpdateContact,
    deleteContact,
    deleteSelected,
    deleteAll,
    toggleSelect,
    startEdit,
    setSearchTerm,
    resetEdit,
    dispatch,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}

export default ContactsContext;
