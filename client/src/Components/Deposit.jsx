import React, { useState } from 'react'
import { useBankContext } from '../context';
import { updateAmmount } from '../utils/updateAmmount';
import BankForm from './BankForm';

function Deposit(){
  // const ctx = React.useContext(UserContext);  
  const { users, currentUser } = useBankContext()
  const [success, setSuccess] = useState(true)
  const handle = async (data) => {
    let user = users.filter(user => user.loged === true)
    let index = users.indexOf(user[0])

    if (Number(data.amount) >= 0) {
      users[index].balance += Number(data.amount)
      console.log(users[index].balance);
      await updateAmmount(currentUser.email, Number(data.amount))
      setSuccess(true)
    } else {
      alert("You can't make operations with negative numbers")
      setSuccess(false)
      return false
    }
    return true
  }
  return (
    <BankForm
    bgcolor="success"
    label="Deposit now"
    handle={handle}
    hideAmount={false}
    successButton="Make another deposit"
    title='submit-btn-deposit'
    finalMessage={success ? 'Success' : "You can't make operations with negative numbers"}
    callBackOnclose={()=> {setSuccess(false)}}
  />
  )
}

export default Deposit
