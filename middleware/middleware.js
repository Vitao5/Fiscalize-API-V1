const jwt = require('jsonwebtoken');
const process = require('process');
require("dotenv").config()
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições do mesmo IP, por favor tente novamente mais tarde.'
});

// Middleware de Throttling
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 100, // Começa a desacelerar após 100 requisições
  delayMs: (used, req) => {
    const delayAfter = req.slowDown.limit;
    return (used - delayAfter) * 500; // Atraso calculado
  }
});
module.exports = { authMiddleware, checkHeadersSent, limiter, speedLimiter };
