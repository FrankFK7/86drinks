const { Schema, model } = require("mongoose");

const drinksSchema = new Schema(
  {
    // title: {type: String, unique: true},
    strDrink: String,
    strInstructions: String,
    strGlass: String,
    strMeasure: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

// instead of typing mongoose.model(), we can just say model() beacuse we destructured "model"
// variable in line 4
const drinks = model("Cocktails", drinksSchema);
module.exports = drinks;
