const express = require("express");
const router = express.Router();
const recipeController = require('../server/controllers/recipeControllers');


router.get('/',recipeController.homepage);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.exploreCategoriesById);
router.post('/search',recipeController.searchRecipe);
router.get('/explore-latest',recipeController.exploreLatest);
router.get('/explore-random',recipeController.exploreRandom);



module.exports = router;