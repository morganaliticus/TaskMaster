const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
   try {
    //extracting the data from the body
     const {email, password, name} = req.body;
     console.log(`From the signup controller-- email: ${email}, password: ${password}, name: ${name},`);
 
     // checking for existing users
     const existingUser = await user.findOne({email});
     console.log(`From the signup controller-- existingUser: ${existingUser}`);
     if (existingUser) {
        return res.status(400).json({message: "User already exists"});
     }

     //hashing the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     console.log(`From the signup controller-- hashedPassword: ${hashedPassword}`);

     //creating and saving the new user
     const newUser = new user ({
      email,
      password: hashedPassword,
      name
     });
     await newUser.save();

     //generating the token
     const accessToken = jwt.sign({id: newUser._id, email: newUser.email, name: newUser.name}, process.env.TOKEN_SECRET_KEY, {expiresIn: "15m"}
     ); //short expiry for access token

     //creating a refresh token
     const refreshToken = jwt.sign({id: newUser.id},  process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: "30m"});

     newUser.refreshToken =refreshToken;
     await newUser.save();

     /**
      * TODO: Implement cookies later
      */

     return res.status(201).json({
      success: true,
      message: "Registeration successful",
      user: {
         email: newUser.email,
         id: newUser._id,
         name: newUser.name,
         refreshToken: newUser.refreshToken
      }
     })
   } catch (error) {
      console.log(`error caught when signing a user = ${error}`);
      return res.status(500).json({
         success: false,
         message: "Server error",
         error: error.message
      });
   }
}

module.exports = { signup };