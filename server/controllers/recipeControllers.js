require("../model/database");
const Category = require("../model/Category");
const Recipe = require("../model/recipe");

/*
Get /
homepage
*/

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const indian = await Recipe.find({ category: "Indian" }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(limitNumber);
    const nepali = await Recipe.find({ category: "Nepali" }).limit(limitNumber);
    const spanish = await Recipe.find({ category: "Spanish" }).limit(limitNumber);
    const chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
    const italian = await Recipe.find({ category: "Italian" }).limit(limitNumber);
    const food = { latest, american, chinese, indian,thai,nepali,spanish,italian };

    res.render("index", { title: "Flavour Folio - Unleashing Taste Adventures", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
Get /categories
categories
*/

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", {
      title: "Flavour Folio - Taste the Variety",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
Get /recipe/:id
recipe
*/

exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "Flavour Folio - Flavourful Journeys", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
Get /categories/:id
categories by id
*/

exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "Flavour Folio - Taste the Variety",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
Post /search
search 
*/

exports.searchRecipe = async (req, res) => {
  console.log("Received search request with data:", req.body);
  try {
    let searchTerm = req.body.sesearchTera;
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).send({ message: "Kuch type bhi toh krle!" });
    }
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Flavour Folio - Discover Deliciousness" ,recipe });
    console.log(recipe);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};




/*
Get /explore-latest
explore latest
*/

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber)
    res.render("explore-latest", {
      title: "Flavour Folio - Explore the Latest Flavour Stories",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};


/*
Get /explore-random
explore latest
*/

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);

  let recipe = await Recipe.findOne().skip(random).exec();

    res.render("explore-random", {
      title: "Flavour Folio - A Taste of Serendipity",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};


/*
Get /submit-recipe
Submit Recipe
*/

exports.submitRecipe = async (req, res) => {
  
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  
  res.render("submit-recipe", {
    title: "Flavour Folio -> Share Your Flavour Adventure" ,infoErrorsObj , infoSubmitObj
  });
};


/*
Get /about
getAbout
*/

exports.getAbout = async (req, res) => {
  
  res.render("about", {
    title: "Flavour Folio -> about us" 
  });
};


/*
Get /contact
getContact
*/

exports.getContact = async (req, res) => {
  
  res.render("contact", {
    title: "Flavour Folio -> about us" 
  });
};


const path = require('path');

exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error('No files were uploaded.');
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + '-' + imageUploadFile.name;
      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      await imageUploadFile.mv(uploadPath);
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      instruction: req.body.instruction,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });

    console.log(newRecipe);
    await newRecipe.save();

    req.flash('infoSubmit', 'Your recipe has been added to Flavor Folio! Explore more flavors in the Folio.');
    res.redirect('/submit-recipe');
  } catch (error) {
    console.error(error);
    req.flash('infoError', 'An error occurred while submitting the recipe. Please try again.');
    res.redirect('/submit-recipe');
  }
};


// Delete Recipe 
//  async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'Southern fried Chicken' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();


// async function insertDummyCategoryData() {
//   try {
//     await Catagory.insertMany([
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("Error", +error);
//   }
// }

// insertDummyCategoryData();

// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       {
//         "name": "Recipe Name Goes Here",
//         "instruction": `Recipe instruction Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American",
//         "image": "southern-friend-chicken.jpg"
//       },
//       {
//         "name": "Recipe Name Goes Here",
//         "instruction": `Recipe instruction Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American",
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();
