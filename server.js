const express = require("express");
const cors = require("cors");
const app = express();
const timeRoutes = require("./app/routes/time.routes");
const authenticateToken = require('./app/auth/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc")

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json()); 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/",authenticateToken, (req, res) => {
    res.json({ message: "Chronos API v1.0.0" });
});

const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Chronos API",
          version: "1.0.0",
          description: "Restful API for Chronos"
      },
      servers: [
          {
              url: "http://localhost:8080"
          }
      ]
},
  apis: ["./app/routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
timeRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
