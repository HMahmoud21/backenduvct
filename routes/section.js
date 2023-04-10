const express = require("express");
const router = express.Router(); 
const sectionControlller=require("../Controllers/sectionController")

router.post("/addsection/:id",sectionControlller.addsection)
router.get("/getall",sectionControlller.getSection)
router.get("/getbyid/:uuid",sectionControlller.getsectionByid)
router.patch("/update/:uuid",sectionControlller.updateSection)
router.delete("/supprimer/:uuid",sectionControlller.deleteSection)



module.exports = router;