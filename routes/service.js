const express = require("express");
const router  = express.Router();
const serviceController = require("../controllers/service");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");

// POST /Service
router.post("/services", middleware.addmiddleware(Schema.serviceSchema.servicePost),serviceController.postService);

// GET /Service
router.get("/services", serviceController.getService)

// PUT /Service Update
router.put("/medical-logistics/:id",middleware.addmiddleware(Schema.serviceSchema.servicePost), serviceController.updateService)

// DELETE /Service delete
module.exports = router;