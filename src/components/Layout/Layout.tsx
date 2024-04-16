import { Outlet } from  'react-router-dom';
import styles from './Layout.module.scss';
import { Header } from '../Header';

function Layout() {
  return (
        <div className={styles.layoutWrapper}>
          <Header />
            <main className={styles.main}>
              <Outlet />
            </main>
          <footer>Footer</footer>
        </div>
  );
}

export default Layout;