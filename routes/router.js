const express = require("express");
const { register, deleteUser, login, allUsers, userId, updateUser } = require("../controllers/usersController");  
const { registerBank, deleteBank, listBanks, alterInfoBank } = require("../controllers/bankController");
const { registerTypePayment, deleteTypePayment, listTypePayments, alterInfoTypePayment } = require("../controllers/typePaymentsController");


// Import the controller functions
const { authMiddleware, checkHeadersSent } = require("../middleware/middleware");

const router = express.Router();


// Rotas usuários
router.get('/users', authMiddleware, checkHeadersSent, allUsers);
router.get('/users/:id', authMiddleware, checkHeadersSent, userId);
router.post('/users/create', register);
router.put('/users/update/:id', authMiddleware, checkHeadersSent, updateUser);
router.delete('/users/delete/:id', authMiddleware, checkHeadersSent, deleteUser);
router.post('/users/login', login); 

// Rotas bancos
router.post('/banks/register', authMiddleware, checkHeadersSent, registerBank);
router.delete('/banks/delete/:id', authMiddleware, checkHeadersSent, deleteBank);
router.get('/banks/list', authMiddleware, checkHeadersSent, listBanks);
router.put('/banks/update/:id', authMiddleware, checkHeadersSent, alterInfoBank);

// Rotas tipo de pagamento
router.post('/typePayments/register', authMiddleware, checkHeadersSent, registerTypePayment);
router.delete('/typePayments/delete', authMiddleware, checkHeadersSent, deleteTypePayment);
router.get('/typePayments/list', authMiddleware, checkHeadersSent, listTypePayments);
router.put('/typePayments/update', authMiddleware, checkHeadersSent, alterInfoTypePayment);


module.exports = router;  // export the router
