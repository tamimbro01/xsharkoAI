const mongoose = require('mongoose');


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI , {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log("DB Connection Success");
    
  } catch (error) {
  

    console.log("DB Connection Fails " , error);
    process.exit(1);
    
  }
  
}
module.exports = connectDB;