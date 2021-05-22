const firebase = require('../core/firebase');

const loadContacts = function (callback) {
    const dbRef = firebase.database().ref();
        dbRef.child("contacts").get().then((snapshot) => {
            let data;
            if(snapshot.exists()){
                 data = snapshot.val();
            }else{
                 data = null;
            }
            
            callback({
                status:"success",
                code:200,
                msg:"success get all data",
            },data);
        }).catch( (err) => {
            callback({
                status:"fail",
                code:500,
                msg:"fail get all data",
            },null);
        });
}

const storeContact = (data,callback) => {
    const id =  Math.random().toString(36).substr(2, 9);
    
    const contact = {
        id, 
        name: data.name,
        email: data.email,
        number: data.number,
    };

    firebase.database().ref('contacts/'+id).set(contact,(error) => {
        if(!error){ 
            callback({
                status:"success",
                code:200,
                msg:"success store data",
            },contact);
        }else{
            callback({
                status:"fail",
                code:500,
                msg:"fail store data",
            },null);
        }
        
    });

    
}

module.exports = {storeContact,loadContacts}