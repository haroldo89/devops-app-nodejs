
module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require("../middleware/auth");
    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.post('/notesAll', auth, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notesTitle/:title', notes.findByTitle, auth);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne, auth);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update, auth);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete, auth);
}