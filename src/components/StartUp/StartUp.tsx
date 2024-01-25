//Styles
import './startup.scss';

//Main imports and helpers
import { useState } from 'react';
import { createUser } from '../../helpers/crud';

const StartUp = () => {
  const [inputValue, setInputValue] = useState('');

  const handleUserSubmit = () => {
    if (inputValue.trim() !== '') {
      createUser(inputValue);
      window.location.href = '/todo-react-ts/todo';
    }
  };
  return (
    <div className="startup-section">
      <div className="signup-form">
        <h1>
          Create your <span>ToDo</span> account
        </h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          placeholder="UserName"
        />
        <button
          onClick={handleUserSubmit}
          className="classic-button button-green"
          type="submit"
        >
          <span>Start with ToDo App</span>
        </button>
      </div>
    </div>
  );
};

export default StartUp;
