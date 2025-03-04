const express = require("express");
const { authMiddleware, checkHeadersSent } = require("../middleware/middleware");
const { registerBank, deleteBank, listBanks, alterInfoBank } = require("../controllers/bankController");

const router = express.Router();

router.post('/register', authMiddleware, checkHeadersSent, registerBank);
router.delete('/delete/:id', authMiddleware, checkHeadersSent, deleteBank);
router.get('/list', authMiddleware, checkHeadersSent, listBanks);
router.put('/update/:id', authMiddleware, checkHeadersSent, alterInfoBank);


module.exports = router;  // export the router