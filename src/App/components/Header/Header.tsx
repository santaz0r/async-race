import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <ul className={styles.navigation__links}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/winners">Winners</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
