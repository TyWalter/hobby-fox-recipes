// Requiring in express and routes
const router = require("express").Router();
const apiRoutes = require("./api");

// Directing traffic to API routes
router.use("/api", apiRoutes);

// Exporting
module.exports = router;