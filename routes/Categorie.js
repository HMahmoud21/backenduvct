const express = require("express");
const router = express.Router(); 
const CategorieController=require("../Controllers/categorieController")


router.post("/addcat/:id",CategorieController.CreateCategorie)
router.get("/getcat",CategorieController.getCategories)
router.delete("/delcat",CategorieController.deleteCtegories)

module.exports = router;