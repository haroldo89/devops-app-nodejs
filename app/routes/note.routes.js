
module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require("../middleware/auth");
    // Create a new Note
    app.post('/notes', notes.create);

    app.post('/notes/createNote', notes.create);

    // Retrieve all Notes
    app.post('/notes/getAll', auth, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notesTitle/:title', auth, notes.findByTitle, auth);

    // Retrieve a single note with noteId with post method
    app.post('/notes/getNote', auth, notes.findOneById)

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', auth, notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', auth, notes.update);

    // Update a Note with noteId
    app.post('/notes/updateNote', auth, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', auth, notes.delete);
}