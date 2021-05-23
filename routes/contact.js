const express = require('express');
const router  = express.Router();
const { 
    storeContact,
    loadContacts ,
    updateContact,
    detailContact,
    destroyContact,

} = require('../utils/contact');

router
    .get('/',(req,res) => {
        loadContacts((head,data) => {
            res.send({
                head,
                data,
            });
        })
    })
    .post('/',(req,res) => {
        storeContact(req.body,(head,data) => {
            res.send({
                head,
                data,
            });
        })
    })
    .get('/:id', (req,res) => {

        detailContact(req.params.id,(head,data) => {
            res.send({
                head,
                data,
            });
        });
    })
    .put('/:id',(req,res) => {

        updateContact(req.params.id,req.body,(head,data) => {

            res.send({
                head,
                data,
            });
        });
    })
    .delete('/:id', (req,res) => {

        destroyContact(req.params.id,(head,data) => {
            res.send({
                head,
                data,
            });
        });
    });
    
module.exports = router;