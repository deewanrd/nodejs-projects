const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./routes/controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.use(express.static(__dirname + '/public'));

app.get('/fetchContacts', (req, res) => {
  controller.fetchContacts(req, res);
})

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`Started to listen on port: ${port}`);
});