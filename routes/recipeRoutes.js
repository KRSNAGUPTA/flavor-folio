const express = require("express");
const router = express.Router();
const recipeController = require('../server/controllers/recipeControllers');


router.get('/',recipeController.homepage);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.exploreCategoriesById);



module.exports = router;