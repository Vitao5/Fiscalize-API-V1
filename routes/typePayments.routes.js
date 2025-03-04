const express = require("express");
const { authMiddleware, checkHeadersSent } = require("../middleware/middleware");
const { registerTypePayment, deleteTypePayment, listTypePayments, alterInfoTypePayment} = require("../controllers/typePaymentsController");

const router = express.Router();

router.post('/register', authMiddleware, checkHeadersSent, registerTypePayment);
router.delete('/delete', authMiddleware, checkHeadersSent, deleteTypePayment);
router.get('/list', authMiddleware, checkHeadersSent, listTypePayments);
router.put('/update', authMiddleware, checkHeadersSent, alterInfoTypePayment);


module.exports = router;  // export the router