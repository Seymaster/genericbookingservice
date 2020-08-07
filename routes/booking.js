const express = require("express");
const router  = express.Router();
const bookingController = require("../controllers/booking");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");

// POST /saves a booking
router.post("/booking", middleware.addmiddleware(Schema.bookingSchema.bookingPost),bookingController.postBooking);

// GET  /retrieves all booking 
router.get("/booking", bookingController.getAllBooking)


module.exports = router;