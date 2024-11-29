const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Log incoming requests for update and delete
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Connect to the SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a new task
app.post('/tasks', (req, res) => {
    console.log('Received POST request for /tasks');
    console.log('Request body:', req.body);
    const { title, description, due_date, status } = req.body;
    db.run('INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)', [title, description, due_date, status], function(err) {
        if (err) {
            console.error('Error inserting task:', err);
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": {
                "id": this.lastID
            }
        });
    });
});

// View all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { title, description, due_date, status } = req.body;
    const { id } = req.params;
    db.run(
        'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?',
        [title, description, due_date, status, id],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": {
                    "id": id
                }
            });
        }
    );
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                "id": id
            }
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
