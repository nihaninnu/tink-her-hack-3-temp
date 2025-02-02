const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Niha0914",
    database: "edumatch"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.redirect('/user.html');
        } else {
            res.status(401).send("Invalid email or password");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});