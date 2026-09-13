const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./config/moongoose-connection");

const app = express();

// =======================
// Middleware
// =======================

// Parse JSON data
app.use(express.json());

// Parse form data (URL encoded)
app.use(express.urlencoded({ extended: true }));

// Read cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Set EJS as template engine
app.set("view engine", "ejs");

// =======================
// Basic Route
// =======================

app.get("/", (req, res) => {
    res.send("Server is running");
});

// =======================
// Authentication Example
// =======================

// Register
app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Example:
    // const user = await userModel.create({
    //     username,
    //     email,
    //     password: hashedPassword
    // });

    res.send("User registered");
});


// Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // Example:
    // const user = await userModel.findOne({ email });

    // Compare password
    // const isMatch = await bcrypt.compare(password, user.password);

    // Create JWT
    const token = jwt.sign(
        { email: email },
        "SECRET_KEY"
    );

    // Store token in cookie
    res.cookie("token", token);

    res.send("Logged in");
});


// =======================
// Authentication Middleware
// =======================

function isLoggedIn(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("You must login first");
    }

    try {

        const data = jwt.verify(token, "SECRET_KEY");

        req.user = data;

        next();

    } catch (err) {

        res.status(401).send("Invalid token");

    }
}


// Protected Route
app.get("/profile", isLoggedIn, (req, res) => {

    res.send(`Welcome ${req.user.email}`);

});


// Logout
app.get("/logout", (req, res) => {

    res.clearCookie("token");

    res.send("Logged out");

});


// =======================
// Start Server
// =======================

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
}); 