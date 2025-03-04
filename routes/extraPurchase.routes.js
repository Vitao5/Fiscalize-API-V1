const express = require("express");
const {registerExtraPurchase, alterExtraPurchase, listExtraPurchase, deleteExtraPurchase} = require('../controllers/extraPurchaseController')
const { authMiddleware, checkHeadersSent } = require("../middleware/middleware");

const router = express.Router();

router.post('/register', authMiddleware, checkHeadersSent, registerExtraPurchase)
router.put('/update', authMiddleware, checkHeadersSent, alterExtraPurchase)
router.get('/list', authMiddleware, checkHeadersSent, listExtraPurchase)
router.delete('/delete', authMiddleware, checkHeadersSent, deleteExtraPurchase)


module.exports = router;  // export the router