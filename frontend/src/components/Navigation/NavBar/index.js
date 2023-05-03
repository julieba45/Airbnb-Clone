import React, { useState } from 'react';

import './Navbar.css';
import LoginFormModal from '../../LoginFormModal';
import SignupFormModal from '../../SignupFormModal';
import { useModal } from '../../../context/Modal';

function Navbar(){
    const { updateModal } = useModal();
    const [show, setShow] = useState(false);

    const toggleDropdown = () => {
        setShow(!show)
    };
    const handleLoginClick = () => {
        console.log('UPDATEMODAL', updateModal)
        updateModal(<LoginFormModal />);
      };

      const handleSignupClick = () => {
        updateModal(<SignupFormModal />);
      };

      return (
        <div className="navbar">
          <h3>Airbnb</h3>
          <div className="menu">
            <div className="dropdown">
              <span onClick={toggleDropdown} className="menu-icon">
                &#9776;
              </span>
              <div
                className={`dropdown-menu${show ? ' show' : ''}`}
                onClick={toggleDropdown}
              >
                <button onClick={handleLoginClick}>Log In</button>
                <button onClick={handleSignupClick}>Sign Up</button>
              </div>
            </div>
            <span className="profile">&#128100;</span>
          </div>
        </div>
      );
    }




export default Navbar;
