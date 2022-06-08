const { Schema, model } = require("mongoose");

const alcoholSchema = new Schema(
  {
    // title: {type: String, unique: true},
     title: String,
     glass: String,
     liquor: String,
    instructions: String,
    
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
  },
  {

    timestamps: true
  }
);

// instead of typing mongoose.model(), we can just say model() beacuse we destructured "model"
// variable in line 4



module.exports = model("Alcohol", alcoholSchema);