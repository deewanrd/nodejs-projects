const fs = require('fs');
const jsonfile = require('jsonfile');
const path = require('path');

const fileName = path.join(__dirname, '../contacts.json');

exports.fetchContacts = function (req, res) {
  jsonfile.readFile(fileName, function (err, contents) {
    if (err) {
      console.error(`Error reading file: ${fileName}: `, err);
      return res.status(400).send('Error fetching contacts');
    }
    console.log("Contents: ", contents);
    res.json(contents);
  })
} 