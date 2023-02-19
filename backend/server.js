const app = require('./app')

require('dotenv').config({path: "backend/config/config.env"});

const PORT = process.env.PORT;
const connectDB = require('./database/connect')

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
  