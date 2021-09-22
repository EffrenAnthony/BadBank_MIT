import React, { createContext, useState, useContext } from "react"
const BankContext = createContext(null);
export function useBankContext () {
  return useContext(BankContext)
}
function ContextProvider({children}){
  const [users, setUsers] = useState([{name:'abel',email:'abel@mit.edu',password:'secret',balance:100, loged: false}])
  function login(user){
    const index = users.indexOf(user)
    const usersCopy = [...users]
    usersCopy[index].loged = true
    setUsers(usersCopy)
  }
  function logout(user){
    const index = users.indexOf(user)
    const usersCopy = [...users]
    usersCopy[index].loged = false
    setUsers(usersCopy)
  }
  const value = {
    users,
    login,
    logout
  }
    return (
      <BankContext.Provider value={value}>
        {children}
      </BankContext.Provider>
    )
  }

export default ContextProvider