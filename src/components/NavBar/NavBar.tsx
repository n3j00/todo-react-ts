import { NavLink, useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './navbar.scss';

import { motion } from 'framer-motion';
import { deleteUser } from '../../helpers/crud';

const NavBar = ({ username }: { username: string }) => {
  const navigate = useNavigate();

  const handleDeleteData = () => {
    deleteUser();
    navigate('/');

    window.location.reload();
  };

  return (
    <div className="navbar">
      <SideBar />
      <div className="nav-wrapper">
        <div className="username">
          {username && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="link"
            >
              User: {username}
            </motion.h1>
          )}

          {username ? (
            <button className="link" onClick={handleDeleteData} type="submit">
              Delete Data
            </button>
          ) : (
            <NavLink to="/todo-react-ts/todo" className="link classic-button">
              Create your Profile
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
