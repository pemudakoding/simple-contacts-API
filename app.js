// Include Lib
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// HOST
const host = 'localhost';
const port = 5500;

// LOAD ROUTES
const contact = require('./routes/contact');

// Using Middleware
app.use(bodyParser.json());

// Use routes
app.use('/contact',contact);

app.listen(port,host,() => {
    console.log(`app listening at ${host}:${port}`);
});