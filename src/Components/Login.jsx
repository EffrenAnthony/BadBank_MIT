import React, { useState, useEffect } from 'react'
import { useBankContext } from '../context';


import BankForm from "./BankForm";

function Login(){
  // const ctx = useContext(UserContext);  
  const { login, users } = useBankContext()
  const [currentUser, setCurrentUser] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  useEffect(() => {
    function findlogedUser(){
      let userLoged = users.filter(user => user.loged === true)
      if (userLoged.length > 0) {
        setCurrentUser(userLoged[0])
      } else {
        setCurrentUser(false)
      }
    }
    findlogedUser()
  }, [users])

  function handle(data){
    let user = users.filter(user => user.email === data.email)
    if ( user.length > 0){
      let index = users.indexOf(user[0])
      users[index].loged = true
      login(user[0])
      setCurrentUser(user)
      return true
    } else {
      setUserNotFound(true)
      setTimeout(() =>{
        setUserNotFound(false)
      }, 3000)
    }
  }
  // const logOut = () => {
  //   let user = users.filter(user => user.loged === true)
  //   if (user[0]) {
  //     logout(user[0])
  //     setCurrentUser(null)
  //     // BUG
  //     history.push('/login/')
      
  //   } else {
  //     history.push('/login/')
  //   }
  // }
  return (
    <>
    {
      !currentUser ?
      <>
      <BankForm
        bgcolor="secondary"
        label="Login"
        handle={handle}
        hideAmount={true}
        successButton="Try Again"
        title='submit-btn'
        finalMessage='User not found try again'
      />
      {
        userNotFound &&
        <p>User not found, please register</p>
      }
      </>
      : <div className="alert alert-primary">
          <h3>Hello {currentUser.name}</h3>
          {/* <div className="d-flex justify-content-end w-100">
              <button className="btn btn-secondary" onClick={logOut}>{currentUser ? 'Log out' : 'Log In'}</button>
        </div> */}
        </div>
    }
    </>
  )

}

export default Login