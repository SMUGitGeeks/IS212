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
        const [rows, fields] = await connection.promise().query('SELECT * FROM staff_skills');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getStaffSkill = async (req, res) => {
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

exports.createApplication = async (req, res) => {
    try {
        // Extract data from the request body

        let {rl_id, staff_id, role_app_status, app_text} = req.body; // yet to add supporting doc


        // Validate the data (if needed)
        if (!rl_id || !staff_id || !role_app_status) {
            return res.status(400).json({error: 'All fields are required'});
        }

        // Insert the new role listing into the database
        const sql = 'INSERT INTO application (rl_id, staff_id, role_app_status, app_ts, app_text) VALUES (?, ?, ?, NOW(), ?)';
        await connection.promise().query(sql, [rl_id, staff_id, role_app_status, app_text]);

        // Send a success response
        res.status(201).json({message: 'Role listing created successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};


