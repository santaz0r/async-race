import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import Footer from '../components/Footer/Footer';

function Layout() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
