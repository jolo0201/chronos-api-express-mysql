const authenticateToken = require("../auth/auth")
module.exports = app => {
  const time = require("../controllers/time.controller.js");

  var router = require("express").Router();
/**
 * @swagger
 * /:
 *   post:
 *     security:
 *        - Bearer: [] 
 *     description: Use to create time logs.
 *     responses:
 *       200:
 *         description: Time log successfully created.
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
  router.post("/",authenticateToken, time.create);

/**
 * @swagger
 * /:
 *   get:
 *     security:
 *      - Bearer: []
 *     description: Use to request all time logs.
 *     responses:
 *       200:
 *         description: Returns all time logs.
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
  router.get("/",authenticateToken, time.findAll);

  // Retrieve a single time with empId and date
  router.get("/:empId/:date",authenticateToken, time.findOne);

  // Update time with id
  router.put("/:id/:date",authenticateToken, time.update);

  // Delete time with id
  router.delete("/:id",authenticateToken, time.delete);

  app.use('/api/time', router);
};

