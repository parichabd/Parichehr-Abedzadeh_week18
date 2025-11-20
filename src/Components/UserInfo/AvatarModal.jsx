import styles from "./AvatarModal.module.css";

import avatar1 from "../../assets/1.jpg";
import avatar2 from "../../assets/2.jpg";
import avatar3 from "../../assets/3.jpg";
import avatar4 from "../../assets/4.jpg";
import avatar5 from "../../assets/5.jpg";
import avatar6 from "../../assets/6.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

function AvatarModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Select an Avatar</h3>

        <div className={styles.grid}>
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`avatar-${index}`}
              className={styles.avatarImg}
              onClick={() => {
                onSelect(avatar);
                onClose();
              }}
            />
          ))}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AvatarModal;
