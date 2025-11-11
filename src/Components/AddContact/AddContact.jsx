import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddContact.module.css";
import ConfirmModal from "./ConfirmModal"; // 👈 ایمپورت مودال جدید

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

  // برای مودال
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // وقتی کاربر روی دکمه حذف کلیک می‌کند
  const handleDeleteClick = (index) => {
    setContactToDelete(index);
    setShowConfirm(true);
  };

  // تأیید حذف
  const confirmDelete = () => {
    if (contactToDelete !== null) {
      onDelete(contactToDelete);
    }
    setShowConfirm(false);
    setContactToDelete(null);
  };

  // لغو حذف
  const cancelDelete = () => {
    setShowConfirm(false);
    setContactToDelete(null);
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

              {selectedContacts.length > 0 && (
                <button
                  className={styles.buttonInfo}
                  onClick={onDeleteSelected}
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

          {contacts.map((contact, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: "relative" }}
            >
              <input
                type="checkbox"
                checked={selectedContacts.includes(index)}
                onChange={() => onToggleSelect(index)}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />

              {hoveredIndex === index && (
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    onClick={() => handleDeleteClick(index)} // ← اینجا مودال فعال می‌شه
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    onClick={() => onEdit(index, navigate)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.view}`}
                    onClick={() =>
                      alert(
                        `👤 ${contact.user}\n📧 ${contact.email}\n💼 ${contact.job}\n📱 ${contact.phone}`
                      )
                    }
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

      {/* ✅ نمایش مودال تأیید حذف */}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default AddContact;
