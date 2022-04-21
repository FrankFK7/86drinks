const router = require("express").Router();
const axios = require("axios");
const res = require("express/lib/response");

const alcohol = require("../models/alcohol.model");




const { isLoggedIn } = require("../config/route-guard.config");

/* GET home page */
router.get("/secret", isLoggedIn, (req, res, next) => {
  res.render("secret.hbs");
});


router.get("/cocktails-list",  (req, res, next) => {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php ")
    .then(responseFromAPI => {
        // console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomdrinks: responseFromAPI.data.drinks});
    })
    .catch(err => console.error(err))

});
 
router.get("/cocktails-create",(req, res, next)=>{
    res.render("cocktails/cocktails-new")
    alcohol.find()
      .then(cocktailsfromDB => {
        res.render("cocktails/cocktails-new", cocktailsfromDB )
      })
      .catch(err => console.log(`Error while getting the drinks :) : ${err}`))
   
})



router.post("/cocktails-create", (req, res, next) =>{


    const { title, liquor,instructions,glass } = req.body;
    
    alcohol.create({title, liquor,instructions,glass})
    .then((newDrinks) => {
     
        res.render("cocktails/cocktails-new",{newDrinks});
    })
    .catch((err) => {
        console.log(err);
       
      });
    });

    // alcohol.find()
    //   .then(drinksfromDB => {
    //     res.render("cocktails/cocktails-new", drinksfromDB )
    //   })
    //   .catch(err => console.log(`Error while getting the drinks :) : ${err}`))
   



module.exports = router;
