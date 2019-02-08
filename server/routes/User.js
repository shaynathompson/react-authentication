const express = require('express');
const app = express();
const UserRouter = express.Router();

const User = require('../models/User');


UserRouter.route('/register').post(function (req, res) {
 
    console.log('login =>', req.body);
    const user= new User(req.body);
    user.save()
    .then(user => {
        res.json('User Register Successfully');
        res.redirect('/login');
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
            res.json('User Login Successfully');
            res.redirect('/index');
            }
        }).catch(err => {
            res.json('Something went wrong');
        });
    });
      

module.exports = UserRouter;