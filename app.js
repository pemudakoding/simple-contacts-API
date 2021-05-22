const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { storeContact,loadContacts } = require('./utils/contact');

const host = 'localhost';
const port = 5500;

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(bodyParser.json());

app
    .get('/contact',(req,res) => {
        loadContacts((head,data) => {
            res.send({
                head,
                data,
            });
        })
    })
    .post('/contact',(req,res) => {
        storeContact(req.body,(head,data) => {
            res.send({
                head,
                data,
            });
        })
    });  


app.listen(port,host,() => {
    console.log(`app listening at ${host}:${port}`);
});