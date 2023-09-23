const connection = require('../config/db');

exports.getSkillDetails = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM skill_details');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}