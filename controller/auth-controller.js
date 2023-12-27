const  User  = require("../model/auth-model")
const Contact = require("../model/auth-contact");
const Cart = require("../model/auth-cart");

const home = async (req, res)=>{
    try {
        res.status(200).json({msg:"this is home"})
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res)=>{
    try {
        const { firstname, lastname, email, password } = req.body;
        // console.log(data)
        const userExist = await User.findOne({email : email});

        if(userExist){
            console.log("Email exists")
            return res.status(400).json({msg : "Email already exists"})

        }
        const userCreated= await User.create({firstname, lastname, email, password});
        // res.status(201).json({msg : userCreated})
        res.status(201).json({
            msg:"Successfully registered",
            token : await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })

        console.log(userCreated)
    } catch (error) {
    res.status(500).json({message: "Internal server error"})
    console.log("Server Error in Registration")
    }
};



//Login
const login = async (req, res)=>{
    try {
        const { email, password }= req.body;
        const userExist = await User.findOne({email})

        if(!userExist){
           return  res.status(400).json({ msg : "Invalid credentials"})
        }
        const  isPasswordValid =  await userExist.comparePassword(password);
        if(isPasswordValid){
        res.status(200).json({
            msg: "Login successfully",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
        })
    }else{
        res.status(401).json({msg: "Email or password incorrect"})
    }

    } catch (error) {
        console.log("Server error in  login")
    }
}


//Contact
const contact = async  (req, res)=>{
    try {
        const {name , email , subject, message}= req.body;
        const contactCreated = await Contact.create({name , email , subject, message});
        res.status(200).json({
            msg: "Message send successfully",
            data: contactCreated,
        })
    } catch (error) {
        console.log("Error at contact", error)
    }
}

//User
const user =async (req, res)=>{
    try {
    const userData = req.user;
        res.status(200).json(userData);
    } catch (error) {
        console.log("Error at User route", error)
    }
}


//Cart
const cart = async (req, res) =>{
    try {
        const { userEmail, products, totalPrice} = req.body;
        const cartCreated = await Cart.create({userEmail, products, totalPrice});
        console.log(cartCreated)
        res.status(201).json({
            msg: "Your order is successfully placed",
            data: cartCreated,
        })
    } catch (error) {
        console.log("Error at cart :",error)
    }
}

module.exports = {home, register, login, contact, user, cart}