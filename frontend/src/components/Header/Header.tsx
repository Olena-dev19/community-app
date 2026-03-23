import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const { name } = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.header}>
      <p className={styles.title}>
        Post<span>Hub</span>
      </p>
      <p className={styles.userName}>{name}</p>
    </div>
  );
};

export default Header;
