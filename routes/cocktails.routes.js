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
router.get("/cocktails-list",  (req, res, next) => {
   // const {searchTerm} = req.query
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka")
    .then(responseFromAPI => {
       console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomdrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))
});

// show the cocktails based on the search
router.get("/cocktails-list2",  (req, res, next) => {
    const { searchTerm } = req.query
    console.log(searchTerm)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomdrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))
});


router.post("/cocktails-list",  (req, res, next) => {
    const { strDrink, strCategory, strGlass, strIngredient1, strMeasure1} = req.body
//need to console log req.body - to print data from post request on console
    Alcohol.create({  strDrink, strCategory, strGlass, strIngredient1, strMeasure1, creator:req.session.currentUser._id})
    .then(randomdrinks => {
        res.render("cocktails/cocktails-details", { randomdrinks})
    })
//catch error => console.log(error) while deletiing drinks from db
})

router.post("/cocktails-list2",  (req, res, next) => {
    const { title,glass,instructions,liqour } = req.body
Alcohol.create({ title,glass,instructions,liqour})
.then((results)=>{
   console.log("success", results)
   res.redirect("/profile")
})
.catch(err => console.log(`Error creating`, err))

})

//--------------------------------------------------------------------------------------------------------------------//
// GET Route: PREFILL All cocktails ---------DETAILS DETAILS  DETAILS -------- TO ENABLE EDITING ROUTE
// ************************************************

router.get("/cocktails/:alcohol", (req, res) => {
    Alcohol.findById(req.params.alcoholId)
    .then(cocktailFromDB => {
        //console.log("drink title: ", cocktailFromDB.title)
        res.render("cocktails/cocktails-list", { randomdrinks: responseFromAPI.data.drinks})
    })
    .catch(err => console.log("Error while getting a drink to be details from the DB: ", err))
})

router.post("/cocktails/:alcoholId/edit", (req, res) => {
    // console.log("updated book: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    // Book.findByIdAndUpdate(req.params.bookID, req.body)
    Alcohol.findByIdAndUpdate(req.params.alcoholId, {title,glass,instructions,liqour }, { new: true })
    .then(cocktailFromDB => {
        // console.log(updatedBookFromDB);

        res.redirect(`/alcoholId/${cocktailFromDB._id}`)
    })
    .catch(err => console.log("Error while saving the updates in the book to the DB: ", err))
})

// })//for cocktail----------DETAILS DETAILS  DETAILS -------- ---------DETAILS DETAILS  DETAILS -------- l
// -------------------------------------------------------------------------------------------------------------------//

// <form action="/books/{{_id}}/edit" method="POST">

// 1. display the form to a user so they can input title, description, author and rating

router.get("/cocktails-create",(req, res, )=>{
    res.render("cocktails/cocktails-new.hbs")
    Alcohol.find()
    .then(cocktailFromDB => {
        res.render("cocktails/cocktails-new", {cocktailFromDB} )
})
.catch(err => console.error ("Error while making a new drink in the DB: ", err))
})

// 2. create a route to pick up what user inputted in these fields and save it to the database

{/* <form action="/cocktails/new" method="POST"> */}

router.post("/cocktails-create", (req, res) => {
    console.log("this is what user added in the form: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    Alcohol.create({ title,glass,instructions,liqour })
    .then(newcocktailFromDB => {
        console.log("this is new cocktail: ", newCocktailFromDB);

        res.redirect("/profile");
    })
    .catch(err => console.log("Error while saving a new drink in the DB: ", err))
})
  
// -------------------------------------------------------------------------------------------------------------------//

// get route to display the pre-filled form for users to be able to update the drink
router.get("/cocktails/:alcoholId", (req, res) => {
    //console.log("the ID is: ", req.params.alcoholId);
    Alcohol.findById (req.params.alcoholId)
   // .populate("title, glass, liquor, instructions")
    //.then(cocktailfromDB=> {
        Alcohol.find()
        .then(cocktailfromDB => {
            //console.log("Alcohol", cocktailfromDB.title)
            
            // console.log(allOtherAuthors)

            // this should show you the detaIls of the specific coctail you cliked on
            // this can't take you to the profile page 
            res.render("user-pages/profile-page.hbs") 
        })
        .catch(err => console.log(`Error while getting the drink that will be edited: ${err}`))
    })



router.post("/cocktails/:idOfTheEditedDrink/update", (req, res, next) => {

    const { title, glass, liquor, instructions } = req.body;
    Alcohol.findByIdAndUpdate(req.params.idOfTheEditedDrink, { title, glass, liquor, instructions  }, {new: true})
    .populate("title, glass,  liquor, instructions")
    .then(updatedDrink => res.redirect(`/cocktails/${updatedDrink._id}`))
    .catch(err => console.log(`Error while saving updates of a cocktail in the DB: ${err}`))
})
//--------------------------------------------------------------------------------------------------------------------//





module.exports = router