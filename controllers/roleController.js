const connection = require('../config/db');

exports.getRoleDetails = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_details');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleDetail = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_details WHERE role_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);

        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleSkills = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_skills');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleSkill = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_skills WHERE role_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);

        } else {
            res.status(404).send('Role skills not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}




