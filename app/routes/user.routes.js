module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/register', user.register);

    // auth a user
    app.post('/authenticate', user.login);
}