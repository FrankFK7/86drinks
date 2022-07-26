// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Alcohol = require("../models/Alcohol.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/86drinks";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

//   Alcohol.create(oneCocktail)
// .then(cocktailFromDB=>{// all went good
//     cocktailFromDB.forEach(oneCocktail => {
//    });
//     console.log(oneCocktail.title)
// })

// mongoose.connections.close

// .catch()// something bad happened


  //MONGODB_URI=mongodb+srv://FrankFK7:Password123@cluster0.xaaxf.mongodb.net/86drinks?retryWrites=true&w=majority