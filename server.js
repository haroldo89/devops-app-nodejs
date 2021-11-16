const auth = require("./app/middleware/auth");
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
var cors = require('cors');
const app = express();
const admin = require('firebase-admin');
require("dotenv").config();

app.use(cors({
  origin: '*'
}));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.urlServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}); 

app.get("/api/hello", (req, res) => {
  res.status(200).send("Hello 🙌");
});

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/note.routes.js')(app);
require('./app/routes/notese.routes.js')(app);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});