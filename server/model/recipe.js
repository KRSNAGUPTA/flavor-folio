const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  instruction: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  category: {
    type: String,
    enum : ['Thai','American','Chinese','Mexican','Indian','Nepali',],
    required: "This field is required.",
  },
  image: {
    type: String,
    required: "This field is required.",
  },

});

recipeSchema.index({name: 'text',instruction : 'text',category : 'text'})

module.exports = mongoose.model('Recipe', recipeSchema);
