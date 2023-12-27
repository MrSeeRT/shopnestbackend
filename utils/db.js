const mongoose = require("mongoose");


const URI = process.env.MONGODB_URI;

const connectDb = async () => {
     try {
        await mongoose.connect(URI);
        console.log("Connecton with DB is successfull")
     } catch (error) {
        console.log("Database connecton fail");
        process.exit(0)
     }
}

module.exports = connectDb;
