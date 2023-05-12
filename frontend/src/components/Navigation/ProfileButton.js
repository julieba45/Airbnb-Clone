import React, { useState, useEffect, useRef} from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/'); // Redirect to the homepage
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className ="navbar-button"onClick={openMenu}>
        <div className="icon-container">
        <i className="fas fa-bars icon" />
        <i className="fas fa-user-circle icon" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.username}</div>
            {/* <div>{user.firstName} {user.lastName}</div> */}
            <div>Email: {user.email}</div>
            <div>
              <NavLink to={`/spots/current`} className="manage-spots-link">Manage Spots</NavLink>
            </div>
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';


// function ProfileButton() {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = () => setShowMenu(prevState => !prevState);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ulRef.current && !ulRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ulRef]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const menuClass = `profile-dropdown ${showMenu ? 'show' : ''}`;

//   return (
//     <div className="profile-button-container">
//       <button onClick={toggleMenu}>
//         <i className="fas fa-bars" />
//       </button>
//       <ul className={menuClass} ref={ulRef}>
//         <li>
//           <OpenModalMenuItem
//             itemText="Log In"
//             onItemClick={() => setShowMenu(false)}
//             modalComponent={<LoginFormModal />}
//           />
//         </li>
//         <li>
//           <OpenModalMenuItem
//             itemText="Sign Up"
//             onItemClick={() => setShowMenu(false)}
//             modalComponent={<SignupFormModal />}
//           />
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default ProfileButton;
