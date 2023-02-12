import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <>
      <header className={styles.navHeader}>
        <nav className={styles.navList}>
          <h1 id={styles.logo}>Logo</h1>
          <ul>
            <li>Profile</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
