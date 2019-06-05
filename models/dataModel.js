const mongoose=require('mongoose');

const userSchema=require('../schemas/userSchema');
const userModel=mongoose.model('devices',userSchema);

module.exports=userModel;