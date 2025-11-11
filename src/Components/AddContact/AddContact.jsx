import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../AddContact/ConfirmModal";
import ViewModal from "../AddContact/ViewModal";
import styles from "./AddContact.module.css";

function AddContact({
  contacts,
  onDelete,
  onEdit,
  onToggleSelect,
  selectedContacts,
  onDeleteSelected,
  onDeleteAll,
}) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // برای مدال حذف تکی
  const [deleteIndex, setDeleteIndex] = useState(null);
  // برای نمایش جزئیات
  const [viewContact, setViewContact] = useState(null);

  const confirmDelete = () => {
    if (typeof onDelete === "function") onDelete(deleteIndex);
    setDeleteIndex(null);
  };
  const cancelDelete = () => setDeleteIndex(null);

  const handleDeleteSelected = () => {
    if (typeof onDeleteSelected === "function") onDeleteSelected();
  };

  return (
    <div>
      <div className={styles.parentInfo}>
        <h1 className={styles.AddInfo}>Contact Manager</h1>

        <div>
          <button
            className={styles.buttonInfo}
            onClick={() => navigate("/add")}
          >
            + New
          </button>

          {contacts.length > 0 && (
            <>
              <button
                className={styles.buttonInfo}
                onClick={onDeleteAll}
                style={{ marginLeft: "10px", backgroundColor: "red" }}
              >
                Delete All
              </button>

              {selectedContacts && selectedContacts.length > 0 && (
                <button
                  className={styles.buttonInfo}
                  onClick={handleDeleteSelected}
                  style={{ marginLeft: "10px", backgroundColor: "orange" }}
                >
                  Delete Selected ({selectedContacts.length})
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <p className={styles.paragInfo}>
        Welcome to contact list manager application. Please navigate through
        different areas.
      </p>

      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {contacts.length === 0 && (
            <p className={styles.cardParagraphNoContatct}>
              NO CONTACTS ADDED YET!!
            </p>
          )}

          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className={styles.card}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: "relative" }}
            >
              <input
                type="checkbox"
                checked={selectedContacts && selectedContacts.includes(idx)}
                onChange={() => onToggleSelect(idx)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />

              {hoveredIndex === idx && (
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    onClick={() => setDeleteIndex(idx)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    onClick={() => onEdit(idx, navigate)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.view}`}
                    onClick={() => setViewContact(contact)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
              )}

              {contact.img && (
                <img
                  src={contact.img}
                  alt={contact.user}
                  className={styles.cardImg}
                />
              )}
              <h3 className={styles.contactsHeader}>{contact.user}</h3>
              <p className={styles.contactsEmails}>
                <span>Email</span> : {contact.email}
              </p>
              <p className={styles.contactsJob}>
                <span>Job</span> : {contact.job}
              </p>
              <p className={styles.contactsPhone}>
                <span>Phone</span> : {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {deleteIndex !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {viewContact && (
        <ViewModal contact={viewContact} onClose={() => setViewContact(null)} />
      )}
    </div>
  );
}

export default AddContact;
