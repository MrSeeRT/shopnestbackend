const mongoose = require("mongoose");

// const URI= "mongodb+srv://SeeRT:Sujeet123@shopnest-admin.0n1apqh.mongodb.net/ShopNest?retryWrites=true&w=majority";
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