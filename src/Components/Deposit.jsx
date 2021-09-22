import React, { useState } from 'react'
import { useBankContext } from '../context';
import BankForm from './BankForm';

function Deposit(){
  // const ctx = React.useContext(UserContext);  
  const { users } = useBankContext()
  const [success, setSuccess] = useState(true)
  const handle = (data) => {
    let user = users.filter(user => user.loged === true)
    let index = users.indexOf(user[0])

    if (Number(data.amount) >= 0) {
      users[index].balance += Number(data.amount)
      setSuccess(true)
    } else {
      alert("You can't make operations with negative numbers")
      setSuccess(false)
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
