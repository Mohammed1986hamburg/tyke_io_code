const express = require('express');
const serverless = require('serverless-http');
const app = express();
const morgan= require('morgan');
const errorHandler=require('./middleware/errorHandler');
const connectToMongo=require('./helpers/mongoHelpers');
const dataModel=require('./models/dataModel');
const uuid= require('uuid');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const craeteDvice = async (req, res, next) => {

  try {

  connectToMongo(); // to connect to DB
  req.body.deviceId= uuid.v1() ;
  req.body.name= req.params.name ;
  req.body.firmwareVersion= req.params.firmwareVersion;
  req.body.firmwareRevision= req.params.firmwareRevision;;
  await dataModel.create(req.body);
  res.status(200).json({message: `New device was created, with deviceId: ${req.body.deviceId }`});

  }catch(error) {
    next(error);
    }
  
}

const getDevice = async (req, res, next) => {

  try {

    connectToMongo(); // to connect to DB
    const deviceById=await dataModel.findOne({ deviceId:req.params.ID});
    if(deviceById){
      res.status(200).json(deviceById);
    }else{
      res.status(201).json({message: `No device with this deviceId: ${req.body.req.params.deviceId }`});
    }
  }catch(error) {
    next(error);
    } 
    
}



app.get('/getone/:ID',getDevice);
app.get('/insert/:name/:firmwareVersion/:firmwareRevision',craeteDvice);
app.use(errorHandler);




module.exports = {
    app,
    device:serverless(app), //serverless(app) in order to run Express app in the Serverless Framework
   
};