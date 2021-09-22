import React from 'react'
import { useBankContext } from '../context';
import Card from './Card'

function Balance(){
  // const ctx = React.useContext(UserContext);
  const {users} = useBankContext()
  let user = users.filter(user => user.loged === true)
  let index;
  let balance;
  if (user.length > 0) {
    index = users.indexOf(user[0])
    balance = users[index].balance
  }
  return (
    <>
      {
        user.length > 0 ?
        <Card
          bgcolor={'light'}
          txtcolor='dark'
          header={user[0].name + "'s Balance"}
          body={
            <h1>
              $ {balance}
            </h1>
          }
        />
        : <h2>Please Log in</h2>
      }
    </>
  )
}
export default Balance