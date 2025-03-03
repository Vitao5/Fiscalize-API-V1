const { v4: uuidv4 } = require('uuid'); 
const jwt = require('jsonwebtoken');
const process = require('process');
require("dotenv").config();
const nodemailer = require('nodemailer');




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

function codeFourDigits() {
    let sequencia = '';
    for (let i = 0; i < 4; i++) {
      const numero = Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
      sequencia += numero;
    }
    return sequencia;
  }


async function sendMail(email, texto) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Código de Verificação",
        text: texto
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar o email:", error);
            return 500
        } else {
            console.log("E-mail enviado com sucesso:", info.response);
            return 200
        }
    });
    
}

module.exports = {
    generateId,
    isNullorEmpty,
    getUserMoment,
    isRootSystem,
    codeFourDigits,
    sendMail
};