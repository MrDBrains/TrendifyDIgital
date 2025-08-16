// models/studentModel.js
const { poolPromise, sql } = require('./db');
const { StudentDTO } = require('../DTOs/StudentDTO.js');

class StudentModel {

    // 🔹 Login
    static async login(loginID, password) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('LoginID', sql.NVarChar, loginID)
            .input('Password', sql.NVarChar, password)
            .execute('sp_StudentLogin'); // Your stored procedure name
        return result.recordset[0] || null;
    }

    // 🔹 Change Password
    static async changePassword(studentID, oldPassword, newPassword) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('StudentID', sql.Int, studentID)
            .input('OldPassword', sql.NVarChar, oldPassword)
            .input('NewPassword', sql.NVarChar, newPassword)
            .execute('sp_ChangeStudentPassword'); // Your stored procedure name
        return result.rowsAffected[0] > 0;
    }

    // 🔹 Get Profile
    static async getProfile(studentID) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('LoginID', sql.VarChar(100), studentID)
            .execute('sp_GetStudentProfile');

        const student = result.recordset[0];
        if (!student) return null;

        // Map SQL result to DTO
        return new StudentDTO(student);
    }

    // 🔹 Get Student Payments
    static async getStudentPayments(studentID) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('StudentID', sql.Int, studentID)
            .execute('sp_GetStudentPayments'); // Stored procedure for payments
        return result.recordset || [];
    }

}

module.exports = StudentModel;
