import Card from './Card'
import BankLogo from '../assets/bank.png'
function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={<img src={BankLogo} className="img-fluid" alt="Responsive imag"/>}
    />    
  );  
}

export default Home