const {Client} = require("pg")


const client = new Client({
    user:"postgres",
    host:"localhost",
    password:"admin",
    port: 5432,
    database:"customer_db"
  });


  client.connect((err) => {
    if(err){
        console.log('connection err', err.stack)
    } else {
        console.log('connected to PostgresDB')
    }
  })

module.exports = client;