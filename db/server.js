// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 7070;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = [];
var idVal = 1;

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/../public/notes.html')));

// Get request returns all reservations. Here in case we need it.
app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

// Make new note, added to note array
app.post('/api/notes', (req, res) => {
  idVal++;
  const note = req.body;
  note.id = idVal;
  notes.push(note);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const index = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (index == notes[i].id) {
      notes.splice(i, 1);
      return res.json(notes);
    }
  }
  res.end(false);
});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));