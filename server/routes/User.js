const express = require('express');
const app = express();
const UserRouter = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/User');


UserRouter.route('/register').post(function (req, res) {
    var token =crypto.randomBytes(16).toString('hex');
    var newUser=new User();
    newUser.email=req.body.email;
    newUser.password=req.body.password;
    newUser.token=token
    

    newUser.save()
    .then(newUser => { 

        if(newUser===null)
             res.status(200).send("Registration Unsuccessful - email already in use");
        else{
       var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'shaythompson', pass: 'shaythompson1' } });
       var mailOptions = { from: 'shaynathompsonbz@gmail.com', to: newUser.email, subject: 'Email Verification', text: 'Hello,\n\n' + 'Please confirm your email address with the token: ' + token + '.\n' };
       console.log(newUser);
       transporter.sendMail(mailOptions, function (err) {              
           if (err) {
                return res.status(500).send(err.message); }
           res.status(200).send('A verification email has been sent to ' + newUser.email + '.' + ' Please enter the token received');
           console.log("Email bloooock");
     });
    }

    }).catch(err => {
        res.send("Registration Unsuccessful  - email already in use");
    });
});

UserRouter.route('/login').post(function (req, res) {
    var email=req.body.email;
    var password=req.body.password;

    //searches for user with email address entered
    User.findOne({email:email, password:password, isVerified: true})
        .then(user => {
            if (user==null)
             res.status(200).send('Invalid Credentials or account not verified'); 
            else{
            if (!user.isVerified) 
                res.status(200).send('Account not verified');
            else{
              
                res.status(200).send('Logged in successfully'); 
                res.send({ token: generateToken(user), user: user.toJSON()});
                
                }  
            }
        }).catch(err => {
            res.json('Something went wrong');
        });
});


UserRouter.route('/verifyEmail').post(function (req, res) {
    var email=req.body.email;
    var token = req.body.token

    console.log("in verification email block");
    //searches for user with email address entered
    User.findOne({email:email, token, token})
        .then(user => {
            if (user==null)
             res.status(200).send('Invalid token. Please try again'); 
            else{
                user.isVerified = true;
                user.save(function (err) {
                if (err) 
                { return res.status(500).send(err.message ); }
               
                res.status(200).send("The account has been verified. Please log in.");
            });      
            }
        }).catch(err => {
            res.json('Something went wrong');
        });
});
      

module.exports = UserRouter;