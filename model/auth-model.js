const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

//Creating user schema
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

//Bcrypting password
userSchema.pre("save", async function(){
    const user = this;
    // console.log(this)
    if(!user.isModified){
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
    } catch (error) {
        return next(error);
    }
})

//Generating token
userSchema.methods.generateToken =  async function (){
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );
    } catch (error) {
        console.log("Token error:", error)
    }
}

//Comparing Password
userSchema.methods.comparePassword = async function (password){
return bcrypt.compare(password, this.password);
}

//Creating model
const User = new mongoose.model("USER", userSchema)

module.exports = User;