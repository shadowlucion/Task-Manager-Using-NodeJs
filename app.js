// Module Import Start
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
require('dotenv').config()
const tasks = require('./routes/tasks')
// Module Import End


// enable all static files 
app.use(express.static('./public'));

// middleware for all json parsing
app.use(express.json());

// Applying all middleware 
app.use('/api/v1/tasks',tasks);




// Server Start Here...
const port = 5000;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`Server is listening on Port ${port}`));
    }catch(error){
        console.log(error);
    }
}

start();
// Server End Here...