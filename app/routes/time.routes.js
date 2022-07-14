const authenticateToken = require("../auth/auth")
module.exports = app => {
  const time = require("../controllers/time.controller.js");

  var router = require("express").Router();

  // Create a new time
  router.post("/",authenticateToken, time.create);

  // Retrieve all time
  router.get("/",authenticateToken, time.findAll);

  // Retrieve a single time with empId and date
  router.get("/:empId/:date",authenticateToken, time.findOne);

  // Update time with id
  router.put("/:id/:date",authenticateToken, time.update);

  // Delete time with id
  router.delete("/:id",authenticateToken, time.delete);

  app.use('/api/time', router);
};

