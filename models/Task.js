const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Why No Name?'],
        trim:true,
        maxlength:[100,'Why Name is So Long?']

    },
    completed:{
        type:Boolean,
        default:false
    },
});


module.exports = mongoose.model('Task',TaskSchema);