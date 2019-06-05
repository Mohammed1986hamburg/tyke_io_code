const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({ 

  deviceId:{type:String, required: true,},
  name: {type: String, required: true, trim: true},
  firmwareVersion: {type: String, required: true, trim: true},
  firmwareRevision: {type: String,required: true, trim: true}
} ,{versionKey: false})

module.exports=userSchema;