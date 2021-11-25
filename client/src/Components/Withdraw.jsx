import React, { useState } from 'react'
import { useBankContext } from '../context';
import { updateAmmount } from '../utils/updateAmmount';

import BankForm from "./BankForm";

function Withdraw(){
  const [withDrawError, setWithDrawError] = useState(false)
  // const ctx = React.useContext(UserContext); 
  const { users, currentUser } = useBankContext() 
  const handle = async (data) => {
    let user = users.filter(user => user.loged === true)
    let index = users.indexOf(user[0])
    let balance = users[index].balance
    console.log(balance);
    console.log(data.amount);
    if (balance > 0 && balance >= Number(data.amount) && Number(data.amount) >= 0) {
      users[index].balance -= Number(data.amount)
      await updateAmmount(currentUser.email, -1*Number(data.amount))
    } else {
      setWithDrawError(true)
      alert("You can't withdraw that amount")
      return false
      // setTimeout(() => {
      //   setWithDrawError(false)
      // }, 5000);
    }
    return true
  }
  return (
    <>
      <BankForm
      bgcolor="info"
      label="Withdraw"
      handle={handle}
      hideAmount={false}
      successButton="Make another withdraw"
      finalMessage={withDrawError ? "You can't withdraw that amount" : 'Success'}
      callBackOnclose={()=>setWithDrawError(false)}
    />
    {/* {
      withDrawError &&
      <p>You can't withdraw that amount</p>
    } */}
  </>
  )
}

export default Withdraw