const router = require('express').Router();
const otp = require('../controllers/otp');

router.post('/send-otp', otp.sendOTP);
router.post('/verify-otp', otp.verifyOTP);

module.exports = router;