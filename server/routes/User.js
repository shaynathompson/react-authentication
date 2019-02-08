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
    
    console.log('register =>', req.body);
    //const user= new User(req.body);
    newUser.save()
    .then(newUser => {
       // res.json('User Register Successfully');  
 
            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: 'shaynathompson', pass: 'Fuld@2018!' } });
            var mailOptions = { from: 'shaynathompsonbz@gmail.com', to: newUser.email, subject: 'Email Verification', text: 'Hello,\n\n' + 'Please confirm your email address by clicking the following link \nhttp:\/\/' + req.headers.host + '\/verifyEmail\/' + token + '.\n' };
            console.log(newUser.email);
            transporter.sendMail(mailOptions, function (err) {              
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + newUser.email + '.');
                console.log("Email bloooock");
        });

    }).catch(err => {
        res.status(400).send("Registration Unsuccessful");
    });
});

UserRouter.route('/login').post(function (req, res) {
    var email=req.body.email;
    var password=req.body.password;

    //searches for user with email address entered
    User.findOne({email:email, password:password})
        .then(user => {
            if (user==null)
             res.json('Invalid Credentials'); 
            else{
            if (!user.isVerified) 
                res.json('Account not verified');
            else{
                res.json('User Login Successfully');
                res.send({ token: generateToken(user), user: user.toJSON()});
            }  
            }
        }).catch(err => {
            res.json('Something went wrong');
        });
});


UserRouter.route('/verifyEmail').post(function (req, res) {
    var email=req.body.email;
    var password=req.body.password;

    //searches for user with email address entered
    User.findOne({email:email, password:password})
        .then(user => {
            if (user==null)
             res.json('Invalid Credentials'); 
            else{
            res.json('User Login Successfully');
            res.redirect('/index');
            }
        }).catch(err => {
            res.json('Something went wrong');
        });
});
      

module.exports = UserRouter;