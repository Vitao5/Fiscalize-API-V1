const express = require("express");
const { authMiddleware, checkHeadersSent } = require("../middleware/middleware");
const {registerExtraPurchase, alterExtraPurchase, listExtraPurchase, deleteExtraPurchase,getPruchaseById} = require('../controllers/extraPurchaseController')


const router = express.Router();

router.post('/register', authMiddleware, checkHeadersSent, registerExtraPurchase)
router.put('/update', authMiddleware, checkHeadersSent, alterExtraPurchase)
router.get('/list', authMiddleware, checkHeadersSent, listExtraPurchase)
router.delete('/delete', authMiddleware, checkHeadersSent, deleteExtraPurchase)
router.get('/:id', authMiddleware, checkHeadersSent, getPruchaseById)
///

module.exports = router;  // export the router