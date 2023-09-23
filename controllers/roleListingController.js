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

exports.getRoleListingManager = async (req, res) => {
    try {
        const [rows, fields] = await connection.promise().query('SELECT * FROM role_listing_manager WHERE rl_id = ?', [req.params.id]);
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
   let { rl_id, role_id, rl_desc, rl_open, rl_close, rl_creator } = req.body;
    

    // Validate the data (if needed)
    if (!rl_id || !role_id || !rl_desc || !rl_open || !rl_creator) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!rl_close) {
      rl_close = 'DATE_ADD(now(),INTERVAL 2 WEEK)';
    }

    rl_ts_create = 'now()';

    
    // Insert the new role listing into the database
    const sql = 'INSERT INTO role_listings (rl_id, role_id, rl_desc, rl_open, rl_close, rl_creator, rl_ts_create) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await connection.promise().query(sql, [rl_id, role_id, rl_desc, rl_open, rl_close, rl_creator, rl_ts_create]);

    // Send a success response
    res.status(201).json({ message: 'Role listing created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

