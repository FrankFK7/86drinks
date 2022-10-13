// const router = require("express").Router();
// //const Drink = require("../models/Drink.model");
// const User = require("../models/User.model");
// const axios = require("axios");
// const res = require("express/response");
// // axios.defaults.headers.common["x-api-key"] = process.env.API_KEY;

// //Searching  get route
// apiKey = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// router.get("/searched-drink", (req, res, next) => {
//   //const { searchTerm } = req.query;
//   axios
//     .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//     .then((responseFromAPI) => {
//       res.render("drinks/searched-drink", {
//         drinks: responseFromAPI.data.items,
//       });
//     })
//     .catch((err) => console.error(err));
// });
// // using try statement and catch
// router.post("/my-drinks", async (req, res, next) => {
//   const { drinkId, authors, title, image } = req.body;
//   try {
//     const user = await User.findById(req.session.currentUser._id);
//     const drink = { id: drinkId, authors, title, image };

//     // Save drink to the user
//     if (!user.myDrinks.some((myDrink) => drinkId === myDrink.id)) {
//       user.myDrinks.push(drink);
//       await user.save();
//     }

//     res.redirect("/drinks/my-drinks");
//   } catch {
//     console.error;
//   }
// });

// //Mydrinks get route
// router.get("/my-drinks", (req, res, next) => {
//   User.findById(req.session.currentUser._id)
//     .then((user) => {
//       res.render("drinks/my-drinks", {
//         drinks: user.myDrinks,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.post("/delete-drink", (req, res, next) => {
//   const { drinkId } = req.body;
//   User.findById(req.session.currentUser._id)
//     .then((user) => {
//       user.myDrink = user.myDrink.filter((drink) => drink.id !== drinkId);
//       user.save();
//       res.redirect("/drinks/mydrink");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// module.exports = router;
