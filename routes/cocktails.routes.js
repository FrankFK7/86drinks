const router = require("express").Router();
const axios = require("axios");
const res = require("express/lib/response");

const alcohol = require("../models/alcohol.model");
axios['1-api-key'] = process.env.API_KEY;



const { isLoggedIn } = require("../config/route-guard.config");

/* GET home page */
router.get("/secret", isLoggedIn, (req, res, next) => {
  res.render("secret.hbs");
});


router.get("/cocktails-list",  (req, res, next) => {
    // const { searchTerm } = req.query
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=rum")
    .then(responseFromAPI => {
        // console.log(responseFromAPI.data.drinks)
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

router.post("/cocktails-list",  (req, res, next) => {
    const { strDrink, strCategory, strGlass, strIngredient1, strMeasure1} = req.body

    alcohol.create({  strDrink, strCategory, strGlass, strIngredient1, strMeasure1, creator:req.session.currentUser._id})
    .then(randomdrinks => {
        res.render("cocktails/all-cocktails", { randomdrinks})

})
})

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


    const { title, glass, liquor, instructions } = req.body;
    
    alcohol.create({title, liquor,instructions,glass, creator:req.session.currentUser._id})
    .then(cocktailsfromDB => {
     
        res.render("cocktails/cocktails-new",{cocktailsfromDB});
    })
    .catch((err) => {
        console.log(err);
       
      });
    });

   

// -------------------------------------------------------------------------------------------------------------------//
router.get("/cocktails-details", (req, res, next) => {
    alcohol.find({creator:req.session.currentUser._id}) 
    .then(cocktailfromDB=>{
        // console.log(cocktailfromDB)
        res.render("cocktails/cocktails-details.hbs", {cocktailfromDB})
    })
    
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))

     })
    
    //  "/all-cocktails
    router.get("/all-cocktails", (req, res, next) => {
        alcohol.find({creator:req.session.currentUser._id}) 
        .then(cocktailfromDB=>{
            console.log(cocktailfromDB)
        res.render("cocktails/all-cocktails.hbs", {cocktailfromDB})
        })
        
        .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))
    
         })

// -------------------------------------------------------------------------------------------------------------------//
router.get("/cocktails-edits/:cocktailid/edit", (req, res, next) => {
      alcohol.findById(req.params.cocktailid)
    .then(drinksThatWillBeEdited => {
        res.render("cocktails/cocktails-edits", {drinksThatWillBeEdited} )

    })
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))     
})




router.post("/cocktails-edits/:drinksThatWillBeEdited", (req, res, next) => {

    const { title, glass, liquor, instructions } = req.body
alcohol.findByIdAndUpdate(req.params.drinksThatWillBeEdited,{title, glass, liquor, instructions}, {new: true})


.then(cocktailfromDB =>{
    
res.render("cocktails/cocktails-details",{cocktailfromDB})
console.log( )
})

.catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
alcohol.find({creator:req.session.currentUser._id}) 
.then(cocktailfromDB =>{
    
    res.render("cocktails/cocktails-details",{cocktailfromDB})
    })  
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
})







module.exports = router;