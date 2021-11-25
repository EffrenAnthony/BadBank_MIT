import React, { useState, useEffect } from 'react'
import { useBankContext } from '../context';
import { NavLink, useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
function NavBar(){ 
  const { logout, users, currentUser: currentUserContext } = useBankContext()
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState()
  useEffect(()=>{
    let user = users.filter(user => user.loged === true)
    // let index;
    if (user.length > 0) {
      // index = users.indexOf(user[0])
      setCurrentUser(user[0])
    }
  },[users])
  const logOut = () => {
    let user = users.filter(user => user.loged === true)
    if (user[0]) {
      logout(user[0])
      setCurrentUser(null)
      // BUG
      history.push('/login/')
      
    } else {
      history.push('/login/')
    }
    firebase.auth().signOut();
  }
  return(
    <>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <NavLink className="navbar-brand" to="/index.html" activeClassName="selected-logo">BadBank</NavLink>
    <div className="nav-popup">Home Page</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
              <NavLink className="nav-link ms-2 me-2" to="/CreateAccount/" activeClassName="selected">CreateAccount</NavLink>
              <div className="nav-popup">Create a FREE Account</div>
            </span>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link ms-2 me-2" to="/login/" activeClassName="selected">Login</NavLink>
            <div className="nav-popup">{currentUser ? 'Now you can do any action' : 'Login before using the BadBank'}</div>
          </li>
          {
            currentUserContext && 
            <>
            <li className="nav-item">
              <NavLink className="nav-link ms-2 me-2" to="/deposit/" activeClassName="selected">Deposit</NavLink>
              <div className="nav-popup">{currentUser ? 'Deposit funds in your account' : 'Please Login first'}</div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2 me-2" to="/withdraw/" activeClassName="selected">Withdraw</NavLink>
              <div className="nav-popup">{currentUser ? 'Withdraw funds from your account' : 'Please Login first'}</div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2 me-2" to="/balance/" activeClassName="selected">Balance</NavLink>
              <div className="nav-popup">{currentUser ? 'See your balance' : 'Please Login first'}</div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2 me-2" to="/alldata/" activeClassName="selected">AllData</NavLink>
              <div className="nav-popup">See all data in this Bank</div>
            </li>  
            </>
          }
      </ul>
          <div className="d-flex justify-content-end w-100">
              <button className="btn btn-secondary" onClick={logOut}>{currentUser ? 'Log out' : 'Log In'}</button>
        </div>
    </div>
  </div>
</nav>
    </>
  );
}

export default NavBar