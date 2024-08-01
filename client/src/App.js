import './App.css';
import Navbar from './components/navbar';
import CustomerForm from './components/customerForm';
import CustomerTable from './components/customerTable';
import EditCustomerTable from './components/editCustomerTable';
import React from 'react'

function App() {
  
  

  const [customer, setCustomer] = React.useState({
    FirstName: '',
    LastName: '',
    Age: '',
    Country: ''
  });

  const [oldCustomer, setOldCustomer] = React.useState({
    FirstName: '',
    LastName: '',
    Age: '',
    Country: ''
  });


  const [savedCustomer, setSavedCustomer] = React.useState('')

  
  const handleEditChange = (event) => {
    
    const { name, value } = event.target;
    setOldCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleUpdateCustomer = (editCustomer) =>{
    setCustomer(editCustomer)
  }


  React.useEffect(() => {
    // Fetch the existing data from the backend when the component mounts
    fetch('http://localhost:3000/get-all-customers')
      .then(response => response.json())
      .then(data => {
          if (data) setSavedCustomer(data.rows);
          else return "No Data";

      })
      .catch(error => console.error('Error fetching data:', error));
  }, [customer]);

  React.useEffect(() => {
    // Fetch the existing data from the backend when the component mounts
    fetch('http://localhost:3000/get-all-customers')
      .then(response => response.json())
      .then(data => {
          if (data) {
            setSavedCustomer(data.rows);
          }
          else return "No Data";

      })
      .catch(error => console.error('Error fetching data:', error));
  }, [oldCustomer]);

  const handleDelete = (id) => {
    fetch('http://localhost:3000/delete-customer', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(() => {
      // Update the state to remove the deleted row
      setSavedCustomer(prevData => prevData.filter(row => row.id !== id));
    })
    .catch(error => console.error('Error:', error));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/update-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    .then(response => response.json())
    .then(data => {
      if (data){
      console.log('Success:', data);
      setSavedCustomer([...savedCustomer, customer]); // Add the new customer to the list
      setCustomer({FirstName: '', LastName: '', Age: '', Country: '' });
      }else{
        return "No Data";
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oldCustomer),
    })
    .then(response => response.json())
    .then(data => {
      if (data){
      console.log('Success:', data);
      setSavedCustomer([...savedCustomer, customer]); // Add the new customer to the list
      setOldCustomer({FirstName: '', LastName: '', Age: '', Country: '' });
      }else{
        return "No Data";
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">

        <Navbar />
        <CustomerForm 
            customer={oldCustomer}
            handleChange={handleEditChange}
            handleSubmit={handleSubmit}
        />
        <CustomerTable
            savedCustomer={savedCustomer} 
            handleSubmit={handleSubmit}
            handleUpdateCustomer={handleUpdateCustomer}
            handleDelete ={handleDelete}
        />
        <EditCustomerTable 
            handleUpdateCustomer={handleUpdateCustomer} 
            handleUpdateSubmit ={handleUpdateSubmit}
            handleChange={handleChange}
            customer={customer}/>
    </div>
  );
}

export default App;
