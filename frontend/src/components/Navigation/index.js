
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';


// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul>

//       <li>
//         <NavLink exact to="/">Home</NavLink>
//       </li>
//       {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </ul>
//   );
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../../src/assets/airbnb_icon.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink exact to="/">
            <img src={logo} alt="Logo" className='logo-image'/>
          </NavLink>
        </div>
        <div className="navbar-menu">
          {isLoaded && sessionUser && (
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          )}
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
