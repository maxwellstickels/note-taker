// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 7070;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/../public/notes.html')));

// Get request returns all reservations. Here in case we need it.
app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

// Make new note, added to note array
app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.json(note);
});

app.delete('/api/notes/:index', (req, res) => {
  const note = Number(req.params.index);
  if (!isNaN(note)) {
    notes.splice(index, 0);
    return res.json(note);
  }
  res.end(false);
});


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));