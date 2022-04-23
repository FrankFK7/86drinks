const { Schema, model } = require("mongoose");

const cocktailsSchema = new Schema(
  {
    // title: {type: String, unique: true},
     title: String,
     glass: String,
     liquor: String,
    instructions: String,
    
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

// instead of typing mongoose.model(), we can just say model() beacuse we destructured "model"
// variable in line 4



module.exports = model("cocktails", cocktailsSchema);
