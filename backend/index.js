require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT=process.env.PORT;
const userRoute = require("./routes/userRoute");
const messRoute = require("./routes/messRoute");
const commentRoute = require("./routes/commentRoute");
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


//connection establishment to mongoDB.....
mongoose.connect(process.env.MONGO_URL)
.then(() =>console.log("connected to MongoDB"))
.catch(err=>console.log(err))


//configurations.........
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


//middleware.....
app.use(express.json());
app.use(express.static('uploads')); // Serve static files from the "public" directory
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));



//routes....
app.use("/api" ,userRoute)
app.use("/mess",messRoute)
app.use("/comment",commentRoute)


app.listen(PORT ,(req,res) =>{
    console.log(`Listening on port no. ${PORT}`);
})

