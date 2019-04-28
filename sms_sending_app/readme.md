This is a sms sending web app built on MEAN stack.

Libraries Used:
1. express: for creating server and listening to requests.
2. mongoose: for connecting to mongodb.
3. nexmo: for sending messages
4. moment: for easier handling of date and time
5. stream-json: for reading json file of contacts line by line
6. NgTable: for displaying data in table format with filters and sorting
7. ui-router: for state wise routing

Requirements for running project:
1. node
2. mongodb

Steps for running project:
1. Move to the directory of the project.
2. run node app.js
3. Go to browser and hit localhost:8000
4. This will display the website.

Initially contacts are read from contacts.json file and loaded in the cache.
Messages sent are stored in mongodb with dbName: sms_app and collection messages.
In the messages collection fields are:
recipientname, text, otp, sent_at
