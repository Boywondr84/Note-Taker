const express = require('express');
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let { notes } = require('./Develop/db/db.json');

// function that adds new to notes to db.json
function createNewNote(body, activeNote) {
    // console.log(body);
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: activeNote }, null, 2)
    );
    return body;
}

function deleteNote(body) {
    
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return body;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// post notes in database
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    console.log(note);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    var { id } = req.params;

    const deleted = notes.find(note => note.id === id)
    if (deleted) {
        // console.log(deleted);
        notes = notes.filter(note => note.id != id)
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: "ID does not exist"});
    }
    const deletedNote = deleteNote;
    console.log(deleteNote);
        notes.filter(deleteNote);
    });

app.listen(PORT, () => {
    console.log("API server now on port" + ` ${PORT}`);
});