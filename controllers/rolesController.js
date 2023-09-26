const connection = require('../config/db');

exports.getRoleListings = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listings');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListing = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listings WHERE rl_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingUpdaters = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_updater');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingUpdater = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_updater WHERE rl_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingManagers = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_manager');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingManager = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_manager WHERE rl_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

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
            res.json(rows[0]);
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
            res.json(rows[0]);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}