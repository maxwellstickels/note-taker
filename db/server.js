// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 7070;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var notes = [];
fs.readFile(`${__dirname}/db.json`, (err, data) => {
  if (err) throw err;
  notes = JSON.parse(data);
});

var idVal = 1;

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/../public/notes.html')));

// Get all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(`${__dirname}/db.json`, (err, data) => {
    if (err) throw err;
    response = JSON.parse(data);
    return res.json(response);
  });
});

// Make new note, added to note array
app.post('/api/notes', (req, res) => {
  idVal++;
  const note = req.body;
  note.id = idVal;
  notes.push(note);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(notes), (err) => err ? console.error(err) : true);
  res.json(note);
});

// Remove a note by its id
app.delete('/api/notes/:id', (req, res) => {
  const index = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (index == notes[i].id) {
      notes.splice(i, 1);
      fs.writeFile(`${__dirname}/db.json`, JSON.stringify(notes), (err) => err ? console.error(err) : true);
      return res.json(notes);
    }
  }
  res.end(false);
});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));