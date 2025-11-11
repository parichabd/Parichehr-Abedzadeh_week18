import styles from "./ConfirmModal.module.css";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{message}</h3>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
