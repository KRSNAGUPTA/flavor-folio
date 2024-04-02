const express = require("express");
const router = express.Router();
const recipeController = require('../server/controllers/recipeControllers');


router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);


module.exports = router;