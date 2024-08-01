import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditCustomerTable(props){
    const {
        FirstName = '',
        LastName = '',
        Age = '',
        Country = ''
      } = props.customer || {}; // Also account for props.customer being null/undefined
      
      const { handleChange} = props;
    
    
      return (
          <form className="customer--form" onSubmit={props.handleUpdateSubmit}>
            <h1>Update Existing Customer</h1>
          <TextField
            type="text"
            name="FirstName"
            placeholder="First Name"
            value={FirstName}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '50%',m: 0.5 }}
            required
          />
          <TextField
            type="text"
            name="LastName"
            value={LastName}
            placeholder="Last Name"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '50%',m: 0.5 }}
            required
          />
          <TextField
            type="number"
            name="Age"
            value={Age}
            placeholder="Age"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '50%',m: 0.5 }}
            helperText="Enter number only"
            required
          />
          <TextField
            type="text"
            name="Country"
            value={Country}
            placeholder="Country"
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '50%',m: 0.5 }}
            required
          />
          <br/>
          <Button variant="contained"
        color="secondary"
        type="submit">Update Now</Button>
        </form>
      )
  }