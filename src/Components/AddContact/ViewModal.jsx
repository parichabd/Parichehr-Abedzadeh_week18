import styles from "./ViewModal.module.css";

function ViewModal({ contact, onClose }) {
  if (!contact) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {contact.img && (
          <img src={contact.img} alt={contact.user} className={styles.avatar} />
        )}
        <h2 className={styles.userName}>{contact.user}</h2>
        <div className={styles.infoRow}>
          <strong>Email:</strong> <span>{contact.email}</span>
        </div>
        <div className={styles.infoRow}>
          <strong>Job:</strong> <span>{contact.job}</span>
        </div>
        <div className={styles.infoRow}>
          <strong>Phone:</strong> <span>{contact.phone}</span>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewModal;
