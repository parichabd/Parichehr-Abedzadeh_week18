import styles from "./AvatarModal.module.css";

function AvatarModal({ avatar, onClose }) {
  if (!avatar) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img src={avatar} alt="avatar" className={styles.image} />
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AvatarModal;
