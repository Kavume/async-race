import { Outlet } from  'react-router-dom';
import styles from './Layout.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

function Layout() {
  return (
        <div className={styles.layoutWrapper}>
          <Header />
            <main className={styles.main}>
              <Outlet />
            </main>
          <Footer />
        </div>
  );
}

export default Layout;