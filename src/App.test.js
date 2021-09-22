import { render,fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import Deposit from './Components/Deposit';
import Login from './Components/Login';
import ContextProvider from './context';

describe('Banking app rendering', () => {
  test('Render', () => {  
    const {getByText } = render(<App/>);
    getByText('BadBank Landing Module');
  });

  test('login', () => {
    const {getByText, getByPlaceholderText, getByTitle } = render(
      <ContextProvider>
        <Login />
      </ContextProvider>
    );
    
    getByText('Email address');
    const input = getByPlaceholderText('Enter email');
    fireEvent.change(input, {target:{value:'abel@mit.edu'}});
    const inputPass = getByPlaceholderText('Enter password');
    fireEvent.change(inputPass, {target:{value:'12343456788'}});
    const button = getByTitle("submit-btn");
    userEvent.click(button);
    getByText('Hello abel');
  });
  
})

describe('Banking app with userEvent', () => {
  test('Render', () => {  
    const {getByText } = render(<App/>);
    getByText('BadBank Landing Module');
  });

  test('login userEvent inputs', () => {
    const {getByText, getByPlaceholderText, getByTitle } = render(
      <ContextProvider>
        <Login />
      </ContextProvider>
    );    
    getByText('Email address');
    const input = getByPlaceholderText('Enter email');
    userEvent.type(input, "abel@mit.edu")
    const inputPass = getByPlaceholderText('Enter password');
    userEvent.type(inputPass, "123456789")
    const button = getByTitle("submit-btn");
    userEvent.click(button);
    getByText('Hello abel');
  });  
})

describe('Deposit test', () => {
  test('Render', () => {  
    const {getByText } = render(<App/>);
    getByText('BadBank Landing Module');
  });

  test('Deposit userEvent inputs', () => {
    const {getByText, getByPlaceholderText, getByTitle } = render(
      <ContextProvider>
        <Login />
        <Deposit />
      </ContextProvider>
    );    
    getByText('Email address');
    const input = getByPlaceholderText('Enter email');
    userEvent.type(input, "abel@mit.edu")
    const inputPass = getByPlaceholderText('Enter password');
    userEvent.type(inputPass, "123456789")
    const button = getByTitle("submit-btn");
    userEvent.click(button);
    getByText('Hello abel');

    const inputDeposit = getByPlaceholderText('Deposit now Ammount');
    userEvent.type(inputDeposit,'300')
    const button2 = getByTitle("submit-btn-deposit");
    userEvent.click(button2);
    getByText('Success');
  });  
})
