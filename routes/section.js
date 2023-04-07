const express = require("express");
const router = express.Router(); 
const sectionControlller=require("../Controllers/sectionController")

router.post("/addsection",sectionControlller.addsection)
router.get("/getall",sectionControlller.getSection)
router.get("/getbyid",sectionControlller.getsectionByid)
router.patch("/update",sectionControlller.updateSection)
router.delete("/supprimer",sectionControlller.deleteSection)



module.exports = router;