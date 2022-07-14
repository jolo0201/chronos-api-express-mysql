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
// set port, listen for requests
const PORT = process.env.PORT || 8080;
// simple route
app.get("/", authenticateToken, (req, res) => {
    res.json({ message: "Chronos API v1.0.0" });
});

const options = {
  definition: {
      openapi: "3.0.3",
      info: {
          title: "Chronos API",
          version: "1.0.1",
          description: "Restful API for Chronos",
          contact: {
            name: "John Carlo Guevarra"
          }
      },
      servers: [
          {
              url: `http://localhost:${PORT}`
          }
      ],
      securitySchemes: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    }
},
  apis: ["./app/routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

timeRoutes(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
