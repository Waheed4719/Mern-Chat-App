const mongoose = require('mongoose'),
      schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;

const usersInChatSchema = new schema({
    user: {
        type: ObjectId,
         ref: 'User',
         required: true
     },
     name: {
         type: String,
         required: true
     },
     room:{
         type: String,
         required: true
     },
     socketId: {
         type: String,
         required: true
     }
    
})


  module.exports = Users_in_chat = mongoose.model('Users_in_chat',usersInChatSchema)    