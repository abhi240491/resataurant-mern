const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret,jwtExpire} = require('../config/keys')

exports.signupController = async (req,res) =>{
    const {username, email, password} = req.body;

    try{
        const user = await User.findOne({email:email});     
        //query to match user email, with database email(in this case fixed to be same)
        if(user) {
            return res.status(400).json({
                errorMessage: 'Email already exists',
            })
        }
    //Creating NEW USER in database..........
    //if query is not true create and add new user using UserSchema.
        const newUser = new User(); 
        
        newUser.username = username;
        newUser.email = email;
        
        //encrypting the password
        const salt = await bcrypt.genSalt(10);      //1st layer encryption
        newUser.password = await bcrypt.hash(password, salt);   //final encryption

        //console.log("Password: ",password, "Password Hashed:", newUser.password);
        
        await newUser.save();

        res.json({
            successMessage: 'Registration successful, Please signin'
        })
    }
    catch(err){
        console.log("Error in signupController:", err)
        res.status(500).json({
            errorMessage: 'Server Error',
        })
    }
}

exports.signinController = async (req,res) =>{
    console.log('Inside signInController');
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errorMessage: "Invalid Credentials",
            });            
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                errorMessage: "Invalid Credentials",
            });
        }

        const payload = {
            user: {
                _id: user._id,
            },
        };

        //jst.sign(payload,jwtSecret,jwtExpire,callback)
        await jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err,token) => {
            console.log("inside JWT")
            if(err) console.log('jwt error:', err);
            const {_id, username, email, role} = user;      //deconstructing the user attributes
                res.json({
                    token,                                  //stored with cookies to be used for validation   
                user: {_id, username, email, role},         //info sent to client for user SignedIN
            });
        })

    }
    catch(err){
        console.log('signinController Error:',err);
        res.status(500).json({
            errorMessage: 'Server Error',
        });
    }
}

