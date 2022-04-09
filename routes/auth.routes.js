const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const mongoose = require("mongoose");

const User = require("../models/User.model");


const { isLoggedIn, isLoggedOut } = require("../config/route-guard.config");

// GET route to display the signup form to a user
router.get("/signup", isLoggedOut, (req, res, next) => {
    res.render("auth-pages/signup.hbs");
  });


  router.post("/create-account", (req, res, next) => {
    const saltRounds = 10;

    const { username, email, password } = req.body;

    if (!username || !email || !password){
        res.render("auth-pages/signup", {
            errorMessage: "All fields are mandatory. Please provide your username, email and password."
        })

        return;
    }
    
     // make sure passwords are strong:
     const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
     if (!regex.test(password)) {
         res
         .status(500)
         .render("auth-pages/signup", { errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter." });
         return;
     }

     


     bcryptjs
     .genSalt(saltRounds)
     .then(salt => bcryptjs.hash(password, salt))
     .then(hashedPassword => {
         return User.create({ 
             username, 
             email,
             passwordHash: hashedPassword
         })
     })
     .then(userFromDB => {
         // console.log(`New user created: ${userFromDB}`);
         res.redirect("/profile")
     })
     .catch(err => {
         // error message to make sure users fill in data in the valid format
         if(err instanceof mongoose.Error.ValidationError){
             res.status(500).render("auth-pages/signup", {
                 errorMessage: err.message
             })
         } else if(err.code === 11000){ // error message to prevent duplicates in the DB
                 res.status(500).render("auth-pages/signup", {
                     errorMessage: "Username and email need to be unique. Either username or email is already used."
                 })  
         } else {
             console.log("error: ", err.message);
             next(err);
         } 
     })
 })

// const { Router } = require('express');
// const router = new Router();

// // GET route ==> to display the signup form to users
// router.get('/signup', (req, res) => res.render('auth/signup'));

// // POST route ==> to process form data
// router.post('/signup', (req, res, next) => {
//     console.log('The form data: ', req.body);
//   });
// module.exports = router;

// const bcryptjs = require('bcryptjs');
// const saltRounds = 8;

// //  skipped get route

// // POST route ==> to process form 
// router.post('/signup', (req, res, next) => {

//   const { username, email, password } = req.body;

//   bcryptjs
//     .genSalt(saltRounds)
//     .then(salt => bcryptjs.hash(password, salt))
//     .then(hashedPassword => {
//       console.log(`Password hash: ${hashedPassword}`);
//     })
//     .catch(error => next(error));
// });

// // other imports
// const User = require('../models/User.model');


// // POST route ==> to process form data
// router.post('/signup', (req, res, next) => {
  

//   const { username, email, password } = req.body;

//   bcryptjs
//     .genSalt(saltRounds)
//     .then(salt => bcryptjs.hash(password, salt))
//     .then(hashedPassword => {
//       return User.create({
//         // username: username
//         username,
//         email,
//         // passwordHash => this is the key from the User model

//         passwordHash: hashedPassword
//       });
//     })
//     .then(userFromDB => {
//       console.log('Newly created user is: ', userFromDB);
//       res.redirect('/userProfile');
//     })
//     .catch(error => next(error));
    
//     router.get('/userProfile', (req, res) => res.render('users/user-profile'));
 
// module.exports = router;
// });