import React, { useState, useEffect } from 'react'
import { useBankContext } from '../context';
import Card from './Card'

function BankForm({
  bgcolor,
  bgheader,
  label,
  handle,
  hideAmount,
  successButton,
  title,
  finalMessage,
  callBackOnclose
}){
  // const ctx = useContext(UserContext); 
  const { users } = useBankContext()
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount]       = useState('');
  const [balance, setBalance] = useState('');
  const [userLoged, setUserLogged] = useState('');

  useEffect(() => {
    function getBalance(){
      let userloged = users.filter(user => user.loged === true);
      // console.log(userloged)
      if (userloged.length > 0) {
        setBalance(userloged[0].balance)
        setUserLogged(true)
      } else {
        setBalance(false)
        setUserLogged(false)
      }
    }
    if (!hideAmount) {
      getBalance()
    }
  }, [show, hideAmount, users])
  function validate(field, label){
    if (!field) {
      setStatus('Error: missing ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if (label === 'password' && field.length < 8) {
      setStatus('Please enter at least 8 characters');
      setTimeout(() => setStatus(''),3000);
      return false
    }
    return true;
  }
  function handleBankForm(){
    // console.log(name,email,password);
    if (hideAmount) {
      if (label !== 'Login') {
        if (!validate(name,     'name')) {
          alert('Please enter a name')
          return ;
        } 
      }
      if (!validate(email,    'email'))    {
        alert('Please enter an email')
        return ;
      }     
      if (!validate(password, 'password'))  {
        alert('Please enter at least 8 characters')
        return ;
      }     
    } else {
      if (!validate(amount, 'amount'))  {
        alert('Please enter an ammount')
        return ;
      }     
    }
    let data = {
      name,
      email,
      password,
      amount
    }
    handle(data)
    setShow(false);
  }  
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setAmount('');
    setShow(true);
    if(callBackOnclose){
      callBackOnclose()
    }
  }
  const handleAmmount = (e) => {
    // console.log(e.target.value);
    if (!isNaN(Number(e.target.value))) {
      setAmount(e.target.value)
    } else {
      alert('Please write only positive numbers')
    }
  }
  const handleDisabled = () => {
    if (label === 'Create Account'){
      if (email !== '' || password !== '' || name!=='') {
        return false
      } else {
        return true
      }
    }
    if (label === 'Login'){
      if (email !== '' || password !== '') {
        return false
      } else {
        return true
      }
    }
    // disable when user is not loged in
    if(!hideAmount){
      if (label === 'Withdraw') {
        if (!balance || !userLoged){
          return true
        }
        if (amount !== '' ) {
          if(amount !== 0){
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      } else if (label === 'Deposit now') {
        if (!userLoged){
          return true
        }
        if (amount !== '' ) {
          if(amount !== 0){
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    } else if (balance) {
      if (balance <= 0){
        return true
      }
    } else {
      return false
    }
    // (!hideAmount && (label === 'Withdraw' && (!balance || !userLoged))) ? true : (balance && balance <= 0) 
  }
  return(
    <Card
      bgcolor={bgcolor}
      bgheader={bgheader}
      header={label}
      status={status}
      body={show ? (  
        <>
        {
          hideAmount
          ? <>
            {label !== 'Login' &&
            <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
            </>
            }
            <p style={{ margin: '0px' }}>Email address</p><br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
          </>
          :
          <>
            Balance: ${userLoged ? balance : "Login first"} <br/>
            <br />
            {label + ' Ammount'}
            <br />
            <input type="input" className="form-control" id="amount" placeholder={label + ' Ammount'} value={amount} onChange={handleAmmount}/><br/>
          </>
        }
        <button title={title} type="submit" className="btn btn-light" disabled={handleDisabled()} onClick={handleBankForm}>{label}</button>
        </>
      ):(
        <>
        <h5>{finalMessage ? finalMessage : 'Success'}</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>{successButton}</button>
        </>
      )}
    />
  )
}

export default BankForm