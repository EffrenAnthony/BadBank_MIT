import React from 'react'
import { Card } from 'react-bootstrap';
import { useBankContext } from '../context';

function AllData(){
  // const ctx = React.useContext(UserContext);
  const { users } = useBankContext()
  return (
    <>
    <Card border="primary">
      <Card.Header>
        <h5>All Data in Store</h5>
      </Card.Header>
      <Card.Body>
        <table className="table">
          <thead>
            <tr >
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody >
            {
              users.map((item, key) => (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.balance}</td>
                </tr>
              ))
            }
          </tbody>
        </table>  

      </Card.Body>

    </Card>
    </>
  );
}
export default AllData