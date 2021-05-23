const firebase = require('../core/firebase');


const dataExist = (id,callback) => {
    let exist;
    firebase.database().ref(`/contacts/${id}`).once('value', snapshot => {
        if(snapshot.exists()) callback(true);
        else callback(false);
    });
  
}

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

const updateContact = (id,data,callback) => {
    
    dataExist(id,status => {
        if(status){
            let update = {};
                update[`contacts/${id}`] = {
                    id,
                    ...data,
                }
            
            firebase.database().ref().update(update, (error) => {
                if(!error){
                    callback({
                        status:"success",
                        code:200,
                        msg:`success update ${data.name} data`,
                    },data);
                }else{
                    callback({
                        status:"fail",
                        code:400,
                        msg:`fail update ${data.name} data`,
                    },null);
                }
            });
        }else{
            callback({
                status:"fail",
                code:404,
                msg:`Data not found`,
            },null);
        }
    })
}

const detailContact = (id,callback) => {

   dataExist(id,(status) => {
        if(status){
            const detailRef = firebase.database().ref(`/contacts/${id}`).get();
            detailRef.then( (snapshot) => {
                if(snapshot.exists()){
                    callback({
                        status:"success",
                        code:200,
                        msg:`Success get ${snapshot.val().name} data`,
                    },snapshot.val());
                }else{
                    callback({
                        status:"fail",
                        code:404,
                        msg:`Data not found`,
                    },null);
                }
            }).catch( () => {
                callback({
                    status:"fail",
                    code:500,
                    msg:`system errors`,
                },null);
            });
        }else{
            callback({
                status:"fail",
                code:404,
                msg:`Data not found`,
            },null);
        }
   });

}

const destroyContact = (id,callback) => {

    dataExist(id, status => {
        if(status){
            const destroyRef = firebase.database().ref(`/contacts/${id}`).remove();
                destroyRef.then( () => {
                    callback({
                        status:"success",
                        code:200,
                        msg:`success delete data`,
                    },null);
                }).catch( e => {
                    callback({
                        status:"fail",
                        code:400,
                        msg:`fail delete data`,
                    },null);
                })
        }else{
            callback({
                status:"fail",
                code:404,
                msg:`Data not found`,
            },null);
        }
    });
}   


module.exports = {
    storeContact,
    loadContacts,
    updateContact,
    detailContact,
    destroyContact
}