const connection = require('../config/db');

exports.getStaffDetails = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM staff_details');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getStaffDetail = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM staff_details WHERE staff_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);
            
        } else {
            res.status(404).send('Staff not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getStaffSkills = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM staff_skills WHERE staff_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);
            
        } else {
            res.status(404).send('Staff skills not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getStaffRoles = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM staff_roles WHERE staff_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);
            
        } else {
            res.status(404).send('Staff roles not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getStaffApplications = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM application WHERE staff_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);
            
        } else {
            res.status(404).send('Staff applications not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}


