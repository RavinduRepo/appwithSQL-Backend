const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message });
};

// Create a new user
app.post('/users', (req, res, next) => {
    let user = { name: req.body.name, email: req.body.email };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) return next(err);
        res.send('User added...');
    });
    console.log("create");
});

// Get all users
app.get('/users', (req, res, next) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) return next(err);
        res.send(results);
    });
    console.log("get");
});

// Update user
app.put('/users/:id', (req, res, next) => {
    let sql = `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.send('User updated...');
    });
    console.log("update");
});

// Delete user
app.delete('/users/:id', (req, res, next) => {
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.send('User deleted...');
    });
    console.log("delete");
});

// Error handling middleware should be the last piece of middleware added
app.use(errorHandler);

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
