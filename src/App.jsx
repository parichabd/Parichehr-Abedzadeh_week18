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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const {
    filteredContacts,
    contacts,
    deleteContact,
    startEdit,
    selectedContacts,
    toggleSelect,
    deleteSelected,
    deleteAll,
    searchTerm,
    setSearchTerm,
  } = useContacts();
  console.log(contacts);
  const mapFilteredIndexToId = (filteredIndex) => {
    const item = filteredContacts[filteredIndex];
    return item ? item.id : null;
  };

  const handleDelete = (filteredIndex) => {
    const id = mapFilteredIndexToId(filteredIndex);
    if (id != null) deleteContact(id);
  };

  const handleEdit = (filteredIndex, navigate) => {
    const id = mapFilteredIndexToId(filteredIndex);
    if (id != null) startEdit(id, navigate);
  };

  const handleToggleSelect = (filteredIndex) => {
    const id = mapFilteredIndexToId(filteredIndex);
    if (id != null) toggleSelect(id);
  };

  const handleDeleteSelected = () => {
    deleteSelected();
  };

  const handleDeleteAll = () => {
    deleteAll();
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
  const { addOrUpdateContact, editData, resetEdit } = useContacts();
  const navigate = useNavigate();

  return (
    <UserInfo
      onAdd={(contact) => addOrUpdateContact(contact, navigate)}
      editData={editData}
      onCancelEdit={resetEdit}
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
        <ToastContainer position="top-right" autoClose={2500} />
      </Router>
    </ContactsProvider>
  );
}
