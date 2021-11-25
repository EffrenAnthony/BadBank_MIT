import React from 'react';
import NavBar from '../Components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container">
        { children } 
      </div>
    </div>
  );
};

export default Layout;