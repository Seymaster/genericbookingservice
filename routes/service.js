const express = require("express");
const router  = express.Router();
const serviceController = require("../controllers/service");
const Schema = require("../middleware/schema");
const middleware = require("../middleware/middleware");

// POST /Service
router.post("/services", middleware.addmiddleware(Schema.serviceSchema.servicePost),serviceController.postService);

// GET /Service
// router.get("/services/:id", serviceController.getService)

// GET /1 service
router.get("/services/:option_id", serviceController.getOneService);

// GET /1 service option
router.get("/services/:id/:option_id", serviceController.getOneOption);

// PUT /Service Update
router.put("/services/:id",middleware.addmiddleware(Schema.serviceSchema.servicePost), serviceController.updateService)

// DELETE /Service delete
router.delete("/services/:id", serviceController.deleteService)

module.exports = router;