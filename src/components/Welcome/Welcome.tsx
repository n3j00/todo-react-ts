import './welcome.scss';

//Animation
import Lottie from 'lottie-react';
import animationData from '../../assets/welcome-animation.json';

//Main imports
import { NavLink } from 'react-router-dom';

//Icons
import { IoArrowRedoSharp } from 'react-icons/io5';

const Welcome = () => {
  return (
    <div className="welcome-section">
      <div className="left-side">
        <Lottie animationData={animationData} className="welcome-animation" />
      </div>

      <div className="right-side">
        <div className="welcome-title">
          <h1>Welcome to demo ToDo App.</h1>
        </div>
        <div className="welcome-desc">
          <p>
            This is a demo ToDo App built with React, TypeScript and SCSS. You
            can create your own ToDo list and save it in your browser.
          </p>
        </div>
        <div className="welcome-buttons">
          <NavLink to="/todo-react-ts/todo" className="classic-button">
            Go to ToDo App <IoArrowRedoSharp />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
