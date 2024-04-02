require('../model/database')
const Category = require('../model/Category');

/*
Get /
homepage
*/

exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);

    res.render('index', { title: "Flavour Folio - Home" , categories });
  } catch (error) {
    res.status(500).send({message : error.message || "Error Occured"})
  }
};

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
