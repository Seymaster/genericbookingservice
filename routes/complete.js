const express = require("express");
const router  = express.Router();
const completeController = require("../controllers/complete");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");

// POST /booking/complete
router.post("/booking/complete", middleware.addmiddleware(Schema.completeSchema.completePost), completeController.postComplete);

// GET /booking/complete
router.get("/booking/complete", completeController.getAllCompleted);


module.exports = router;