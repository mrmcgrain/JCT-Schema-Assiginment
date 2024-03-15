const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('my_treasure_hunt.db', (err) => {
    if (err) {
        console.error('Database opening error: ' + err.message);
    } else {
        console.log('Database connected successfully.');
    }
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
   username TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   password_hash TEXT NOT NULL,
)
CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );
    
    CREATE TABLE IF NOT EXISTS comments (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        user_id INTEGER,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES Posts(post_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );
    
    
    
    ;`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.message);
    } else {
        console.log('Table created or already exists.');
    }
});

db.close((err) => {
    if (err) {
        console.error('Error closing the database: ' + err.message);
    } else {
        console.log('Database connection closed.');
    }
});