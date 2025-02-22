const { v4: uuidv4 } = require('uuid'); 
const jwt = require('jsonwebtoken');
const process = require('process');
require("dotenv").config();


function generateId(){
    return uuidv4();
}

function isNullorEmpty(value){
    if(value === null || value === undefined || value === ''){
        return true;
    }
}

function getUserMoment(req){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}

function isRootSystem(id){
    if(id == process.env.ROOT_SYSTEM){
        return true;
    }else{
        return false;
    }
}
module.exports = {
    generateId,
    isNullorEmpty,
    getUserMoment,
    isRootSystem
};