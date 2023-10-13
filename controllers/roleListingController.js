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
            res.json(rows);

        } else {
            res.status(404).send('Role not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingUpdater = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_updater WHERE rl_id = ?', [req.params.id]);
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

exports.createRoleListing = async (req, res) => {
    try {
        // Extract data from the request body
        let {rl_id, role_id, rl_desc, rl_source, rl_open, rl_close, rl_creator, location, department} = req.body;


        // Validate the data (if needed)
        if (!rl_id || !role_id || !rl_desc || !rl_source || !rl_open || !rl_creator || !location || !department) {
            return res.status(400).json({error: 'All fields are required'});
        }

        if (!rl_close) {
            rl_close = 'DATE_ADD(now(),INTERVAL 2 WEEK)';
        }

        rl_ts_create = 'now()';


        // Insert the new role listing into the database
        const sql = 'INSERT INTO role_listings (rl_id, role_id, rl_desc, rl_source, rl_open, rl_close, rl_creator, rl_ts_create, location, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.promise().query(sql, [rl_id, role_id, rl_desc, rl_source, rl_open, rl_close, rl_creator, rl_ts_create, location, department]);

        // Send a success response
        res.status(201).json({message: 'Role listing created successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};

exports.updateRoleListing = async (req, res) => {
    try {
        // Extract data from the request body and parameters
        const {role_id, rl_desc, rl_source, rl_open, rl_close, rl_updater, location, department} = req.body;
        const rl_id = req.params.id;

        // Update the role_listing table
        const updateSql = 'UPDATE role_listings SET role_id =?, rl_desc=?, rl_source=?, rl_open=?, rl_close=?, location=?, department=? WHERE rl_id=?';
        connection.query(updateSql, [role_id, rl_desc, rl_source, rl_open, rl_close, location, department, rl_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({error: 'Failed to update role listing'});
            }

            // Insert a new row into the role_listing_updater table
            const logSql = 'INSERT INTO role_listing_updater (rl_id, rl_updater, rl_ts_update) VALUES (?, ?, NOW())';
            connection.query(logSql, [rl_id, rl_updater], (logErr) => {
                if (logErr) {
                    console.error(logErr);
                    return res.status(500).json({error: 'Failed to log the update'});
                }

                res.json({message: 'Role listing updated successfully'});
            });
        });
    } catch (catchErr) {
        console.error(catchErr);
        res.status(500).json({error: 'Server error'});
    }

};

exports.getRoleListingApplications = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM application');
        if (rows.length > 0) {
            res.json(rows);

        } else {
            res.status(404).send('Role listing applications not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.getRoleListingApplication = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM application WHERE rl_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows);

        } else {
            res.status(404).send('Role listing applications not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

