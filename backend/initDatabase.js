const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            status INTEGER NOT NULL CHECK (status IN (0, 1))
        )`, (err) => {
            if (err) {
                console.error('Error creating table ' + err.message);
            } else {
                console.log('Tasks table created or already exists.');
            }
        });
    }
});

db.close();
