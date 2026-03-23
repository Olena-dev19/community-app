import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./UserModal.module.css";
import { setUserName } from "../../features/user/userSlice";

const UserModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (!name.trim()) return;

    dispatch(setUserName(name));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Enter your name</h2>
        <input
          className={styles.input}
          value={name}
          onKeyDown={handleKeyDown}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserModal;
