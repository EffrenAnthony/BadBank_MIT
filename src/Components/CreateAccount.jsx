import React from 'react'
import { useBankContext } from '../context';
import BankForm from './BankForm';

function CreateAccount(){
  // const ctx = React.useContext(UserContext);  
  const { users } = useBankContext()
  function handle(data){
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
      loged: false
    })
    return true
  }
  return (
    <BankForm
      bgcolor="primary"
      label="Create Account"
      handle={handle}
      hideAmount={true}
      successButton="Add nother account"
    />
  )
}

export default CreateAccount