import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CustomerForm(props){

  const {
    FirstName = '',
    LastName = '',
    Age = '',
    Country = ''
  } = props.customer || {}; // Also account for props.customer being null/undefined
  
  const { handleChange } = props;
    
    return (
        <form className="customer--form" onSubmit={props.handleSubmit}>
          <h1>Enter New Customer</h1>
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
          placeholder="Last Name"
          value={LastName}
          onChange={handleChange}
          variant="outlined"
          sx={{ width: '50%',m: 0.5 }}
          required
        />
        <TextField
          type="number"
          name="Age"
          placeholder="Age"
          value={Age}
          onChange={handleChange}
          variant="outlined"
          sx={{ width: '50%',m: 0.5 }}
          helperText="Enter number only"
          required
        />
        <TextField
          type="text"
          name="Country"
          placeholder="Country"
          value={Country}
          onChange={handleChange}
          variant="outlined"
          sx={{ width: '50%',m: 0.5 }}
          required
        />
        <br/>
        <Button variant="contained"
                color="primary"
                type="submit"
        >
          Submit
        </Button>
      </form>
    )
}