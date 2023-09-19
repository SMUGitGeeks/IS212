const connection = require('../config/db');

exports.getRoles = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listings');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRole = async (req, res) => {
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
