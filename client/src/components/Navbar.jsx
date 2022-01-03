import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={styles.navbarContainer}>
      <NavLink className={styles.link} to={"/"}>
        Bienvenida
      </NavLink>
      <NavLink
        className={location.pathname === "/home" ? styles.linkActive : styles.link}
        to={`/home`}
      >
          Home
      </NavLink>
      <NavLink
        className={location.pathname === "/form" ? styles.linkActive : styles.link}
        to={"/form"}
      >
          Form
      </NavLink>
    </div>
  );
};

export default Navbar;
