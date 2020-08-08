const express = require("express");
const router  = express.Router();
const completeController = require("../controllers/complete");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");


// POST /booking/complete
router.post("/booking/confirm", middleware.addmiddleware(Schema.confirmSchema.confirmPost), completeController.postConfirm);

// GET /booking/complete
router.get("/booking/confirm", completeController.getAllConfirmed);