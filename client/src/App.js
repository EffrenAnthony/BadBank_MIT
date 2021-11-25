/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ContextProvider from './context';
import Home from './Components/Home';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import Balance from './Components/Balance';
import AllData from './Components/AllData';
import Layout from './shared/Layout';
import firebase from './utils/firebase';

function App() {
  
  return (
    <Router>
      {/* <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100, loged: false}]}}> */}

      <ContextProvider>
        <Router>
          <Switch>
              <Layout>
                  <Redirect from="/" to="/index.html" exact component={Home}></Redirect>
                  <Route path="/index.html" exact component={Home} />
                  <Route path="/CreateAccount/" component={CreateAccount} />
                  <Route path="/login/" component={Login} />
                  <Route path="/deposit/" component={Deposit} />
                  <Route path="/withdraw/" component={Withdraw} />
                  <Route path="/balance/" component={Balance} />
                  <Route path="/alldata/" component={AllData} />
              </Layout>
          </Switch>
        </Router>
      </ContextProvider>      
      {/* </UserContext.Provider> */}
    </Router>
  );
}

export default App;
