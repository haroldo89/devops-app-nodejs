const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
// importing user context
const User = require('../models/user.model.js');

exports.register = (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        //Encrypt user password
        encryptedPassword = bcrypt.hashSync(password, 10);

        // Create user in our database
        const user = new User({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY, 
            { expiresIn: "2h"}
        );
        // save user token
        user.token = token;

        // Save Note in the database
        user.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

// Login
exports.login = (req, res) => {

// Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user =  userModel.findOne({ email });

    if (user && (bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};