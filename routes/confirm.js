const express = require("express");
const router  = express.Router();
const confirmController = require("../controllers/confirm");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");
const { route } = require("./service");


// POST /booking/complete
router.post("/booking/confirm", middleware.addmiddleware(Schema.confirmSchema.confirmPost), confirmController.postConfirm);

// GET /booking/complete
router.get("/booking/confirm", confirmController.getAllConfirmed);

module.exports = router;