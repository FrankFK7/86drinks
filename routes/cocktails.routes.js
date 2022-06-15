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


router.get("/cocktails-list",  (req, res, next) => {
   // const {searchTerm} = req.query
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka")
    .then(responseFromAPI => {
       console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomdrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))

    
});




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
// -------------------------------------------------------------------------------------------------------------------//
//for cocktail-detail
router.post("/cocktails-list",  (req, res, next) => {
    const { strDrink, strCategory, strGlass, strIngredient1, strMeasure1} = req.body
//need to console log req.body - to print data from post request on console
    Alcohol.create({  strDrink, strCategory, strGlass, strIngredient1, strMeasure1, creator:req.session.currentUser._id})
    .then(randomdrinks => {
        res.render("cocktails/all-cocktails", { randomdrinks})
//catch error => console.log(error) while deletiing drinks from db
})
})

// -------------------------------------------------------------------------------------------------------------------//
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
// CREATE A NEW BOOK ROUTE
// 1. display the form to a user so they can input title, description, author and rating

router.get("/cocktails-create",(req, res, )=>{
    res.render("cocktails/cocktails-new.hbs")
    Alcohol.find()
    .then(cocktailsfromDB => {
        res.render("cocktails/cocktails-new", {cocktailsfromDB} )
})
.catch(err => console.error ("Error while making a new drink in the DB: ", err))
})

// 2. create a route to pick up what user inputted in these fields and save it to the database

{/* <form action="/cocktails/new" method="POST"> */}

router.post("/cocktails-create", (req, res) => {
    console.log("this is what user added in the form: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    Book.create({ title,glass,instructions,liqour })
    .then(newcocktailFromDB => {
        console.log("this is new book: ", newcocktailFromDB);

        res.redirect("/profile");
    })
    .catch(err => console.log("Error while saving a new drink in the DB: ", err))
})
    // res.render("cocktails/cocktails-new")
    
    

// cocktails delete post request
    //find by id and delete





router.post("/cocktails-create", (req, res, next) =>{


    const { title, glass, measure, instructions } = req.body;
    
    Alcohol.create({title, measure ,instructions ,glass, creator:req.session.currentUser._id})
    .then(cocktailsFromDB => {
     
        res.render("cocktails/cocktails-new",{cocktailsfromDB});
    })
    .catch((err) => { console.log(err);
       
      });
    });
   

// -------------------------------------------------------------------------------------------------------------------//

// get route to display the pre-filled form for users to be able to update the book
router.get("/cocktails-details", (req, res, next) => {
    Alcohol.findById ({creator:req.session.currentUser._id})
    .populate("title, glass, liquor, instructions")
    //.then(cocktailfromDB=> {
        Alcohol.find()
        .then(cocktailfromDB => {

            // to compare mongoDB IDs we can't use === or == because
            // we are not comparing strings but type of IDs
            // when we compare mongodb IDs we should use ".equals()" method
            
            // console.log(allOtherAuthors)

            // we need allOtherAuthors to enable users to choose from a 
            // list of all authors except the one that is saved in this book
            res.render("cocktails/all-cocktails.hbs", {cocktailfromDB})
        })
        .catch(err => console.log(`Error while getting the drink that will be edited: ${err}`))
    })


// post route to save the updates user made in a specific book to the DB
// <form action="/books/{{bookThatWillBeEdited._id}}/update" method="POST">
router.post("/cocktails/:idOfTheEditedDrink/update", (req, res, next) => {

    const { title, glass, liquor, instructions } = req.body;
    Alcohol.findByIdAndUpdate(req.params.idOfTheEditedDrink, { title, glass, liquor, instructions  }, {new: true})
    .populate("title, glass,  liquor, instructions")
    .then(updatedDrink => res.redirect(`/cocktails/${updatedDrink._id}`))
    .catch(err => console.log(`Error while saving updates of a cocktail in the DB: ${err}`))
})


// get route to show a specific book details
router.get("/cocktails/:drinkID", (req, res, next) => {
    Alcohol.findById(req.params.drinkID)
    .populate("title, glass, liquor, instructions")
    .then(cocktailFromDB => {
        // console.log(bookFromDB);

        //res.render("views/cocktails-details", cocktailFromDB)
    })
    .catch(err => console.log(`Error while getting a details of specific cocktail: ${err}`))
})

// -------------------------------------------------------------------------------------------------------------------//
router.get("/all-cocktails/:cocktailId/edit", (req, res, next) => {
      Alcohol.findById(req.params.cocktailid)
    .then(drinksThatWillBeEdited => {
        res.render("cocktails/all-cocktails", {drinksThatWillBeEdited} )

    })
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))     
})




router.post("/all-cocktails/:drinksThatWillBeEdited", (req, res, next) => {

    const { title, glass, liquor, instructions } = req.body
Alcohol.findByIdAndUpdate(req.params.drinksThatWillBeEdited,{title, glass, liquor, instructions}, {new: true})


.then(cocktailfromDB =>{
    
res.render("cocktails/cocktails-details",{cocktailfromDB})
console.log( )
})

.catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
Alcohol.find({creator:req.session.currentUser._id}) 
.then(cocktailfromDB =>{
    
    res.render("cocktails/cocktails-details",{cocktailfromDB})
    })  
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
})




module.exports = router;