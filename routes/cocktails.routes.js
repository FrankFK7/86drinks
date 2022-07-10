const router = require("express").Router();
const axios = require("axios");
const res = require("express/lib/response");
const Alcohol = require("../models/Alcohol.model");
axios['1-api-key'] = process.env.API_KEY;

const { isLoggedIn } = require("../config/route-guard.config");

/* GET home page */
router.get("/secret", isLoggedIn, (req, res, next) => {
  res.render("secret.hbs");
});

//--------------------------------------------------------------------------------------------------------------------//
//  show all the cocktails from API 
//Get all drinks route 
router.get("/cocktails-list",  (req, res, next) => {
   // const {searchTerm} = req.query
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka")
    .then(responseFromAPI => {
       console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomDrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))
});
router.post("/cocktails-list",  (req, res, next) => {
    const { strDrink, strCategory, strGlass, strIngredient1, strMeasure1} = req.body
//need to console log req.body - to print data from post request on console
    Alcohol.create({  strDrink, strCategory, strGlass, strIngredient1, strMeasure1, creator:req.session.currentUser._id})
    .then(randomDrinks => {
        
        res.render("cocktails/cocktails-details", { randomDrinks})
    })
})

// show the cocktails based on the search
router.get("/cocktailSearch",  (req, res, next) => {
    const { searchTerm } = req.query
    console.log(searchTerm)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomDrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))
});

router.post("/cocktailSearch",  (req, res) => {
   // console.log("search results" , newCocktailFromDB)

    const { title,glass,instructions,liqour } = req.body

Alcohol.create({ title,glass,instructions,liqour})
.then((newCocktailFromDB)=>{
    //console.log("new drink: ", newCocktailFromDB);
   

   res.redirect("/profile")
})
.catch(err => console.log("Error searching for drinks", err))

})

//--------------------------------------------------------------------------------------------------------------------/
// })//Create Cocktail----------Create CreateCreate -------- ---------Create Create Create  -------- l
// -------------------------------------------------------------------------------------------------------------------//

router.get("/cocktails-create",(req, res, )=>{
    res.render("cocktails/cocktails-new.hbs")
    Alcohol.find()
    .then(newCocktailFromDB => {
        res.render("user-pages/profile-page.hbs", {newCocktailFromDB} )
})
.catch(err => console.error ("Error while making a new drink in the DB: ", err))
})

// 2. create a route to pick up what user inputted in these fields and save it to the database

{/* <form action="/cocktails/new" method="POST"> */}

router.post("/cocktails-create", (req, res) => {
    console.log("this is what user added in the form: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    Alcohol.create({ title,glass,instructions,liqour })
    .then(newCocktailFromDB => {
        //console.log("this is new cocktail: ", newCocktailFromDB);

        res.redirect("/profile");
    })
    .catch(err => console.log("Error while saving a new drink in the DB: ", err))
})
  
// -------------------------------------------------------------------------------------------------------------------//

// ************************************************
// GET Route: PREFILL A BOOK DETAILS TO ENABLE EDITING ROUTE
// ************************************************

router.get("/cocktails-details", (req, res) => {
    Alcohol.findByIdAndUpdate(req.params.cocktailId)
    .then(cocktailToUpdate => {
        //console.log("added drink here")
        res.render("user-pages/profile-page.hbs", cocktailToUpdate)
    })
    .catch(err => console.log("Error while getting a drink to be edited from the DB: ", err))
})

// <form action="/books/{{_id}}/edit" method="POST">
router.post("/cocktails-details/:drinksThatWillBeEdited", (req, res) => {

    const { title, glass, measure, ingredient } = req.body
Alcohol.findByIdAndUpdate(req.params.drinksThatWillBeEdited,{title, glass, measure, ingredient}, {new: true})


.then(cocktailToUpdate =>{
    Alcohol.find({creator:req.session.currentUser._id}) 

.then(cocktailToUpdate =>{
    console.log(cocktailToUpdate)
    res.render("user-pages/profile-page",{cocktailToUpdate})
    })  
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
    

})

.catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   

})

// ************************************************
// 
// ************************************************






module.exports = router