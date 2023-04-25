const express = require("express");
const router = express.Router(); 
const CouponController=require("../Controllers/couponController")


router.post("/addcoupon/:id",CouponController.Addcoupon)
router.get("/getall",CouponController.getAllcoupon)
router.get("/getbyid/:uuid",CouponController.getCouponById)
router.patch("/update/:uuid",CouponController.updateCupon)
router.patch("/desactiver/:uuid",CouponController.desactiverCoupon)
router.delete("/supprimer/:uuid",CouponController.deleteCoupon)

module.exports = router;