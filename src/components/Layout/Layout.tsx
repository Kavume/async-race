import { Outlet } from  'react-router-dom';

function Layout() {
  return (
        <div>
          <header>Header</header>
            <Outlet />
          <footer>Footer</footer>
        </div>
  );
}

export default Layout;