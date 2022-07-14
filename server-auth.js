require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');

var corsOptions = {
  origin: "http://localhost:8082"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json()); 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let refreshTokens = []
app.post('/refreshtoken', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
  
  app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })
  
  app.post('/login', (req, res) => {
    // Authenticate User
  
    const username = req.body.username
    const user = { name: username }
  
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  })
  
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
  }
  
// set port, listen for requests
const PORT = process.env.AUTH_PORT || 9090;
app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}.`);
});
