const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 3000;

const client = require('./database')


app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/submit-form', (req, res) => {
  const { FirstName, LastName, Age, Country } = req.body;

  client.query(
    `INSERT INTO customer_db ("FirstName", "LastName", "Age", "Country") VALUES ($1, $2, $3, $4) RETURNING id`,
    [FirstName, LastName, Age, Country],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      const newCustomerId = result.rows[0].id;

      // Now retrieve the newly inserted customer details
      client.query(
        "SELECT * FROM customer_db WHERE id = $1",
        [newCustomerId],
        (err, selectResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }

          const newCustomer = selectResult.rows[0];
          res.status(201).json(newCustomer);
        }
      );
    }
  );
});

app.post('/update-customer', (req, res) => {
  const { FirstName, LastName, Age, Country, id } = req.body;

  // Validate input (e.g., check if required fields are provided)

  // Execute the UPDATE query
  client.query(
    `UPDATE customer_db
     SET "FirstName" = $1, "LastName" = $2, "Age" = $3, "Country" = $4
     WHERE id = $5`,
    [FirstName, LastName, Age, Country, id],
    (err, updateResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      // Check if any rows were affected by the update
      if (updateResult.rowCount === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Retrieve the updated customer details
      client.query(
        "SELECT * FROM customer_db WHERE id = $1 ORDER BY id ASC",
        [id],
        (err, selectResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }

          const updatedCustomer = selectResult.rows[0];
          res.status(200).json(updatedCustomer);
        }
      );
    }
  );
});

// app.post('/update-customer', (req,res) =>{
//   const {FirstName, LastName, Age, Country, id} = req.body;

//   client.query(
//     `UPDATE customer_db SET "FirstName" = $1, "LastName" = $2, "Age" = $3, "Country" = $4 WHERE id = $5`,
//     [FirstName, LastName, Age, Country, id],
//     (err,result) =>{
//       if (err){
//         console.log(err)
//       }
//       if (result.rowCount === 0) {
//         return res.status(404).json({ error: 'Customer not found' });
//       }

//       // Now retrieve the updated customer details
//       client.query(
//         "SELECT * FROM customer_db WHERE id = $1",
//         [id],
//         (err, selectResult) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//           }

//           const updatedCustomer = selectResult.rows[0];
//           res.status(200).json(updatedCustomer);
//         }
//       );
//     }
//   );
// });

app.get('/get-all-customers', (req, res) => {
  // SQL query to select all customers from the database
  client.query('SELECT * FROM customer_db ORDER BY id ASC', (error, results) => {
    if (error) {
      // If there's an error, send a server error response
      console.log(error)
      return res.status(500).send('Error fetching customers');
    }
    if (results.length === 0) {
      // If the results array is empty, send an empty array response
      return res.status(200).json([]);
    }
    // Send the results back to the client
    res.status(200).json(results);
  });
});

app.delete('/delete-customer'), (req, res) => {
  const id= req.body;
  console.log(id)
  client.query('DELETE FROM customer_db WHERE id =?',
  [id],
  (error, results) => {
    if (error) {
      // If there's an error, send a server error response
      return res.status(500).send('Error fetching customers');
    }
    // Send the results back to the client
    res.status(200).json(results);
  });
}

app.delete('/delete-customer', (req, res) => {
  const id = req.body.id;
  // Simulate deletion logic
  client.query('DELETE FROM customer_db WHERE id = $1 ',
    [id],
    (error, results) => {
      if (error) {
        // If there's an error, send a server error response
        return res.status(500).send('Error fetching customers');
      }
      // Send the results back to the client
      
      res.status(200).json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});