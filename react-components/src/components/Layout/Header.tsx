import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

interface NavData {
  isActive: boolean;
  isPending: boolean;
}

// function Header() {
//   return (
//     <header>
//       <nav>
//         <NavLink to="/" end className={`${(navData: NavData) => isActiveLink(navData)} button`}>
//           Home
//         </NavLink>
//         <NavLink to="/about" className={`${(navData: NavData) => isActiveLink(navData)} button`}>
//           About
//         </NavLink>
//       </nav>
//     </header>
//   );
// }

// export default Header;

export default class Header extends Component {
  isActiveLink = (navData: NavData) => {
    return navData.isActive ? 'active' : 'link';
  };

  render() {
    return (
      <header>
        <nav>
          <NavLink
            to="/"
            end
            className={`${(navData: NavData) => this.isActiveLink(navData)} button`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={`${(navData: NavData) => this.isActiveLink(navData)} button`}
          >
            About
          </NavLink>
        </nav>
      </header>
    );
  }
}
