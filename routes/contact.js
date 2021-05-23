const express = require('express');
const router  = express.Router();
const {  validationResult,check } = require('express-validator');
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
    .post('/',[
        check('name')
            .notEmpty().withMessage('Nama tidak boleh kosong').bail()
            .isLength({min:3}).withMessage('Nama minimal 3 karakter').bail()
            .isString(),
        check('email')
            .notEmpty().withMessage('Email tidak boleh kosong').bail()
            .isEmail().withMessage('Email tidak valid').bail(),
        check('number')
            .notEmpty().withMessage('Nomor tidak boleh kosong').bail().
            isMobilePhone('id-ID').withMessage('nomor tidak valid')

    ],(req,res) => {

        const errors = validationResult(req);
        if(errors.isEmpty()){
            storeContact(req.body,(head,data) => {
                res.send({
                    head,
                    data,
                });
            })
        }else{
            return res.status(400).json({errors:errors.array()});
        }
    })

    .get('/:id',[
      check('id')
        .notEmpty().withMessage('id tidak boleh kosong').bail()
        .isAlphanumeric().withMessage('Id tidak valid'),
    ], (req,res) => {

        const errors = validationResult(req);
        if(errors.isEmpty()){
            detailContact(req.params.id,(head,data) => {
                res.send({
                    head,
                    data,
                });
            });
        }else{
            return res.status(400).json({errors:errors.array()}); 
        }
    })
    .put('/:id',[
        check('id')
          .notEmpty().withMessage('id tidak boleh kosong').bail()
          .isAlphanumeric().withMessage('Id tidak valid'),
      ],(req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            updateContact(req.params.id,req.body,(head,data) => {
                res.send({
                    head,
                    data,
                });
            });
        }else{
            return res.status(400).json({errors:errors.array()}); 
        }
        
    })
    .delete('/:id',[
        check('id')
          .notEmpty().withMessage('id tidak boleh kosong').bail()
          .isAlphanumeric().withMessage('Id tidak valid'),
      ], (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            destroyContact(req.params.id,(head,data) => {
                res.send({
                    head,
                    data,
                });
            });
        }else{
            return res.status(400).json({errors:errors.array()}); 
        }
        
    });
    
module.exports = router;