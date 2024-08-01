const {Client} = require("pg")


const client = new Client({
    user:"postgres.dieqckorxsdjolkvdjzm",
    host:"aws-0-us-east-1.pooler.supabase.com",
    password:"Q{H'A=lG30KSc[,",
    port: 6543,
    database:"postgres"
  });


  client.connect((err) => {
    if(err){
        console.log('connection err', err.stack)
    } else {
        console.log('connected to PostgresDB')
    }
  })

module.exports = client;