const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { 
    storeContact,
    loadContacts ,
    updateContact,
    detailContact,
    destroyContact,

} = require('./utils/contact');

const host = 'localhost';
const port = 5500;

app.set('view engine','ejs');
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
    })
    .get('/contact/:id', (req,res) => {

        detailContact(req.params.id,(head,data) => {
            res.send({
                head,
                data,
            });
        });
    })
    .put('/contact/:id',(req,res) => {

        updateContact(req.params.id,req.body,(head,data) => {

            res.send({
                head,
                data,
            });
        });
    })
    .delete('/contact/:id', (req,res) => {

        destroyContact(req.params.id,(head,data) => {
            res.send({
                head,
                data,
            });
        });
    });  


app.listen(port,host,() => {
    console.log(`app listening at ${host}:${port}`);
});