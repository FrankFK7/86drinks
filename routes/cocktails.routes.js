const router = require("express").Router();
const axios = require("axios");
const res = require("express/lib/response");
const Alcohol = require("../models/Alcohol.model");
const Cocktail = require("../models/Cocktail.model")
axios['1-api-key'] = process.env.API_KEY

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
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=rum")
    .then(responseFromAPI => {
       console.log(responseFromAPI.data.drinks)
        res.render("cocktails/cocktails-list", { randomDrinks: responseFromAPI.data.drinks });
    })
    .catch(err => console.error(err))
});

router.post("/cocktails-list",  (req, res, next) => {
    const { title, category, glass, ingredient, measure} = req.body
console.log(req.body)
    Alcohol.create({ title, category, glass, ingredient, measure, creator:req.session.currentUser._id})
    
    .then(() => {
        Alcohol.find( )
        .then(cocktailFromDb =>{
            res.redirect("/profile")
        })
       
        .catch(err => console.log(`Error while deleting the book from the DB: ${err}`))
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
   // console.log("search results" , newCocktailFromDb)

    const { title,glass,instructions,liqour } = req.body

Alcohol.create({ title,glass,instructions,liqour})
.then((newCocktailFromDb)=>{
    //console.log("new drink: ", newCocktailFromDb);
   

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
    .then(cocktailFromDb => {
        res.render("user-pages/profile-page.hbs", {cocktailFromDb} )
})
.catch(err => console.error ("Error while making a new drink in the DB: ", err))
})

// 2. create a route to pick up what user inputted in these fields and save it to the database

{/* <form action="/cocktails/new" method="POST"> */}

router.post("/cocktails-create", (req, res) => {
    //console.log("this is what user added in the form: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    Alcohol.create({ title,glass,instructions, category,ingredient, measure,
        creator:req.session.currentUser._id})
    .then(cocktailFromDb => {
        console.log("this is a new drink: ", cocktailFromDb);
       // res.render("cocktails/cocktails-new",{cocktailfromDB});
        // res.redirect("/profile");
    })
    .catch(err => console.log("Error while saving a new drink in the DB: ", err))
})
  
// -------------------------------------------------------------------------------------------------------------------//

// ************************************************
// GET Route: PREFILL A DRINK DETAILS TO ENABLE EDITING ROUTE
// ************************************************
 
//  route to show all-cocktails that were saved for user editing
// router.get("/cocktails/:drinkId", (req, res) => {
//     Alcohol.findById(req.params.drinkId)
//     .then(cocktailFromDB => {
//         console.log("added drink here", cocktailFromDB.title)
//         res.render("cocktails/all-cocktails.hbs" )
//     })
//     .catch(err => console.log("Error while getting a drink to be edited from the DB: ", err))
// })


// ************************************************
//----------------EDIT-----EDIT----------EDIT------EDIT------//
// ************************************************

// router.get("/edit-cocktails/:Id", (req, res) => {
//     Alcohol.findById(req.params.Id)
//   .then( cocktailFromDB => {
//       res.render("cocktails/all-cocktails.hbs", { cocktailFomDB} )

//   })
//   .catch(err => console.log(`Error while getting the drinks to edit: ${err}`))     
// })




// router.post("/all-cocktails/:id", (req, res) => {
//   const { title, glass, measure, ingredient } = req.body
// Alcohol.findByIdAndUpdate(req.params.id,{title, glass, measure, ingredient}, {new: true})




// .then(cocktailFromDB =>{
//   //console.log(cocktailFromDb)
//   res.render("user-pages/profile-page",{cocktailFromDB})
//   })  
//   .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))   
  

// })

router.get("/cocktails-edits/:cocktailid/edit",(req, res, )=>{
    res.render("cocktails/all-cocktails.hbs")
    Alcohol.find()
    .then(editcocktailFromDb => {
        res.render("user-pages/profile-page.hbs", {editcocktailFromDb} )
})
.catch(err => console.error ("Error while making a new drink in the DB: ", err))
})

// 2. create a route to pick up what user inputted in these fields and save it to the database

{/* <form action="/cocktails/new" method="POST"> */}

router.post("/all-cocktails", (req, res) => {
    console.log("this is what user added in the form: ", req.body);

    const { title,glass,instructions,liqour } = req.body;

    Alcohol.create({ title,glass,instructions, category,ingredient, measure,
        creator:req.session.currentUser._id})
    .then(cocktailFromDb => {
        console.log("this is a new drink: ", cocktailFromDb);
       // res.render("cocktails/cocktails-new",{cocktailfromDB});
        // res.redirect("/profile");
    })
    .catch(err => console.log("Error while saving a new drink in the DB: ", err))
})
  

// ************************************************
//----------------Details-----Details----------Details------Details------//
// ************************************************

router.get("/details-cocktails", (req, res, next) => {
    Alcohol.find({creator:req.session.currentUser._id}) 
    .then(cocktailfromDB=>{
        // console.log(cocktailfromDB)
        res.render("cocktails/details-cocktails", {cocktailfromDB})
    })
    
    .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))

     })
    
    //  "/all-cocktails
    router.get("/all-cocktails", (req, res, next) => {
        Alcohol.find({creator:req.session.currentUser._id}) 
        .then(cocktailfromDB=>{
            console.log(cocktailfromDB)
        res.render("cocktails/all-cocktails", {cocktailfromDB})
        })
        
        .catch(err => console.log(`Error while getting the drinks from the DB: ${err}`))
    
         })

// ************************************************
//----------------Delete-----Delete----------Delete------Delete------//
// ************************************************

         router.post("/cocktails-list",  (req, res, next) => {
            const { title, category, glass, ingredient, measure} = req.body
        console.log(req.body)
            Alcohol.create({ title, category, glass, ingredient, measure, creator:req.session.currentUser._id})
            
            .then(() => {
                Alcohol.find( )
                .then(cocktailfromDB =>{
                    res.render("user-pages/profile-page", { cocktailfromDB})
                })
               
                .catch(err => console.log(`Error while deleting the book from the DB: ${err}`))
            })
        })
        
        
        router.get("/details-cocktails/cocktails-delete", (req, res, next) => {
             Alcohol.find({creator:req.session.currentUser._id})
             .then( cocktailfromDB => {
                res.render("cocktails/details-cocktails", {cocktailfromDB})
                .catch(err => console.log(`Error while deleting the book from the DB: ${err}`))
        })
        });
        
        router.post("/cocktails-delete/:_id", (req, res, next) => {
            Alcohol.findByIdAndDelete(req.params._id)
            
                //   console.log(cocktailfromDB))
                
                .then(() => {
                    Alcohol.find() 
                    .then(cocktailfromDB =>{
                        res.render("user-pages/profile-page" ,{cocktailfromDB}) 
                    })
               
            })
            .catch(err => console.log(`Error while deleting the book from the DB: ${err}`))
                
        })

module.exports = router



