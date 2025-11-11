import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Nav from "./Components/Navbar/Nav";
import AddContact from "./Components/AddContact/AddContact";
import UserInfo from "./Components/UserInfo/UserInfo";
import Search from "./Components/Search/Search";
import { ContactsProvider, useContacts } from "./Context/ContactsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const {
    filteredContacts,
    deleteContact,
    startEdit,
    selectedContacts,
    toggleSelect,
    deleteSelected,
    deleteAll,
    searchTerm,
    setSearchTerm,
  } = useContacts();

  const { contacts } = useContacts();

  const mapFilteredIndexToOriginal = (filteredIndex) => {
    const item = filteredContacts[filteredIndex];
    return contacts.findIndex((c) => c === item);
  };

  const handleDelete = (filteredIndex) => {
    const realIndex = mapFilteredIndexToOriginal(filteredIndex);
    if (realIndex !== -1) {
      deleteContact(realIndex);
      toast.success("Deleted successfully!");
    }
  };

  const handleEdit = (filteredIndex, navigate) => {
    const realIndex = mapFilteredIndexToOriginal(filteredIndex);
    if (realIndex !== -1) startEdit(realIndex, navigate);
  };

  const handleToggleSelect = (filteredIndex) => {
    const realIndex = mapFilteredIndexToOriginal(filteredIndex);
    if (realIndex !== -1) toggleSelect(realIndex);
  };

  const handleDeleteSelected = () => {
    if (selectedContacts.length === 0) return;
    deleteSelected();
    toast.success("Selected contacts deleted successfully!");
  };

  const handleDeleteAll = () => {
    deleteAll();
    toast.success("All contacts have been deleted!");
  };

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddContact
        contacts={filteredContacts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedContacts={selectedContacts}
        onToggleSelect={handleToggleSelect}
        onDeleteSelected={handleDeleteSelected}
        onDeleteAll={handleDeleteAll}
      />
    </>
  );
}

function UserInfoWrapper() {
  const { addOrUpdateContact, editData } = useContacts();
  const navigate = useNavigate();

  return (
    <UserInfo
      onAdd={(contact) => addOrUpdateContact(contact, navigate)}
      editData={editData}
    />
  );
}

export default function App() {
  return (
    <ContactsProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<UserInfoWrapper />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ContactsProvider>
  );
}
