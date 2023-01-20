import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

function Layout() {
  return (
    <main>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
