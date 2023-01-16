import { Outlet } from 'react-router-dom';

// import Footer from '../Footer';

import styles from './Layout.module.scss';
import Header from '../components/Header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
