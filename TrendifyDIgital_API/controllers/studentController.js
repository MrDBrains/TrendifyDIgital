// controllers/studentController.js
const StudentModel = require('../models/studentModel');

class StudentController {

    // 🔹 Login
    static async login(req, res) {
        try {
            const { loginID, password } = req.body;
            const student = await StudentModel.login(loginID, password);

            if (!student) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.json({
                success: true,
                student
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // 🔹 Change Password
    static async changePassword(req, res) {
        try {
            const { studentID, oldPassword, newPassword } = req.body;
            const isChanged = await StudentModel.changePassword(studentID, oldPassword, newPassword);

            if (!isChanged) {
                return res.status(400).json({ message: 'Password change failed' });
            }

            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (err) {
            console.error('Change password error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // 🔹 Get Profile
   static async getProfile(req, res) {
        try {
            const studentID = req.params.id;
            const profile = await StudentModel.getProfile(studentID);

            if (!profile) {
                return res.status(404).json(null); // or {} if you prefer
            }

            // Return only the profile object
            return res.status(200).json(profile);
        } catch (err) {
            console.error('Get profile error:', err);
            return res.status(500).json(null); // or {} if you prefer
        }
    }


    // 🔹 Get Student Payments
    static async getPayments(req, res) {
        try {
            const studentID = parseInt(req.params.id, 10);
            const payments = await StudentModel.getStudentPayments(studentID);

            res.json(payments);
        } catch (err) {
            console.error('Get payments error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = StudentController;
