require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI);

const winnerSchema = mongoose.Schema({
  name: String,
  time: String,
});

const Winner = mongoose.model('winner', winnerSchema);

app.get('/', (req, res) => {
  res.sendFile('./index.html');
});

app.post('/', (req, res) => {
  if (
    req.body.code !== 'cicada 3301' ||
    typeof req.body.name !== 'string' ||
    typeof req.body.code !== 'string'
  ) {
    return res.send('incorrect code, try again');
  }
  const winner = new Winner({
    name: req.body.name,
    time: new Date().toLocaleDateString(),
  });
  winner.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('you won congrats');
    }
  });
});

app.listen(3000);
