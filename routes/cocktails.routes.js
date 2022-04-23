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
// -------------------------------------------------------------------------------------------------------------------//
router.get("/cocktails-create",(req, res, next)=>{
    // res.render("cocktails/cocktails-new")
    alcohol.find()
      .then(cocktailsfromDB => {
        res.render("cocktails/cocktails-new", {cocktailsfromDB} )
      })
      .catch(err => console.log(`Error while getting the drinks :) : ${err}`))
   
})



router.post("/cocktails-create", (req, res, next) =>{


    // const { title,glass, liquor,instructions } = req.body;
    
    // alcohol.create({title,glass, liquor, instructions})
    // .then((newDrinks) => {
    // const { title, glass, liquor, instructions } = req.body;
    
    alcohol.create({title, liquor,instructions,glass})
    .then(cocktailsfromDB => {
     
        res.render("cocktails/cocktails-new",{cocktailsfromDB});
    })
    .catch((err) => {
        console.log(err);
       
      });
    });

   

// -------------------------------------------------------------------------------------------------------------------//
router.get("/cocktails-details", (req, res, next) => {
    alcohol.findById(req.params._id) 
    .then(createCocktail =>{
        console.log(createCocktail)
        res.render("cocktails/cocktails-details.hbs")
    })
    
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))

     })

    router.post("/cocktails-details", (req, res, next) => {
       
        const { title, glass, liquor, instructions } = req.body;
        alcohol.findById({ title, glass, liquor, instructions })
        .then( createCocktails =>{
            console.log("new author created: ", createCocktails);
        })
        .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))
    })
module.exports = router;
