const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

// 🔹 Login
router.post('/login', StudentController.login);

// 🔹 Change Password
router.post('/change-password', StudentController.changePassword);

// 🔹 Get Profile
router.get('/:id/profile', StudentController.getProfile);

// 🔹 Get Student Payments
router.get('/:id/payments', StudentController.getPayments);

module.exports = router;
