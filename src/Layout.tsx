//Main Imports
import { Outlet } from 'react-router-dom';

//Styles
import './layout.scss';

//Components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { fetchData } from './helpers/fetchData';

const Layout = () => {
  const username = fetchData('username') as string;

  return (
    <>
      <div className="locked">
        <h1>Hi sorry, but this application does not support mobile devices</h1>
        <p>Try again on Desktop Device</p>
      </div>

      <div className="approved">
        <nav>
          <NavBar username={username} />
        </nav>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
