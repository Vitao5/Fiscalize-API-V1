const jwt = require('jsonwebtoken');
const process = require('process');
require("dotenv").config()

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    if (!res.headersSent) {
      return res.status(401).json({ message: 'Acesso não autorizado.' });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (!res.headersSent) {
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
  }
};

// Middleware para verificar se os cabeçalhos já foram enviados
const checkHeadersSent = (req, res, next) => {
  if (res.headersSent) {
    return;
  }
  next();
};


module.exports = { authMiddleware, checkHeadersSent };
