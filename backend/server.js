require('dotenv').config({path: "backend/config/config.env"});
const app = require('./app')
const PORT = process.env.PORT;
const connectDB = require('./database/connect')

// Handling  Uncaught Exception 
process.on("uncaughtException",(err)=>{
  console.log(`Shutting down server due to UncaughtException`)
  process.exit(1);
})

// Handling  Promise Rejection
process.on("unhandledRejection",(err)=>{
  console.log(`Shutting down server due to UnhandledRejection`)
  process.exit(1);
})

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT);
      return `server started at ${PORT} :)` ;
    } catch (error) {
      return new Error(error);
    }
  }
  
  start()
    .then((res => console.log(res)))
  