require("dotenv").config();


const express = require("express");
const app=express();
const router = require("./routes/auth-route")
const cors = require("cors");
const connectDb = require("./utils/db")


// const corsOption = {
//     origin:"http://localhost:3000",
//     methods: "GET, POST , PUT, DELETE, PATCH, HEAD",
//     credential:true,
// };
app.use(express.json());
app.use(cors())
app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Sever is listening at ${PORT}`);
    })
})
