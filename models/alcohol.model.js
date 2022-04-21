const { Schema, model } = require("mongoose");

const cocktailsSchema = new Schema(
  {
    // title: {type: String, unique: true},
     Title: String,
     glass: String,
     liquor: String,
    Instructions: String,
    
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

// instead of typing mongoose.model(), we can just say model() beacuse we destructured "model"
// variable in line 4



module.exports = model("cocktails", cocktailsSchema);
