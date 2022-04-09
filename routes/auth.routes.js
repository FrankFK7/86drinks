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
