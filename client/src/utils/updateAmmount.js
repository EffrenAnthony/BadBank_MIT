export const updateAmmount = async (email, amount) => {
  console.log('update');
  fetch(`http://localhost:3100/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log('JSON:', data);
        } catch(err) {
            console.log('err:', text);
        }
    });
}