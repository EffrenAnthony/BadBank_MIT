import React from 'react'
import { useBankContext } from '../context';
import BankForm from './BankForm';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function CreateAccount(){
  // const ctx = React.useContext(UserContext);  
  const { users } = useBankContext()
  async function handle(data){
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
      loged: false
    })
    const auth  = firebase.auth();

    try {
      await auth.createUserWithEmailAndPassword(data.email,data.password);
    } catch (err) {
      console.log(err.message)
    }
    
    const url = `http://localhost:3100/account/create/${data.name}/${data.email}/${data.password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
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