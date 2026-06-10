require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db')

const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"])


async function startServer() {


  try {
    await connectDB()

    app.listen(process.env.PORT || 5000 , () => {
      console.log(`Server Running Port`);
       
    })
    
  } catch (error) {
    console.log("Internal Server Error" , error);
    
  }
  
}

startServer();