
module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require("../middleware/auth");
    
    // Retrieve all Notes
    app.post('/notes/getAll', auth, notes.findAll);
    
    // Retrieve a single note with noteId with post method
    app.post('/notes/getNote', auth, notes.findOneById)

    // Create a new Note
    app.post('/notes/createNote', notes.create);

    // Retrieve a single Note with noteId
    app.get('/notesTitle/:title', auth, notes.findByTitle, auth);

    // Update a Note with noteId
    app.post('/notes/updateNote', auth, notes.update);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', auth, notes.findOne);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', auth, notes.delete);

    // Delete a Note with noteId
    app.post('/notes/deleteNote', auth, notes.delete);
}