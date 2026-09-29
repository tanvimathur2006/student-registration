const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "data.json");

// Read data from JSON file
function readData() {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
}

// Write data to JSON file
function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Registration API is running"
    });
});

// Register student
app.post("/api/register", (req, res) => {
    const {
        name,
        email,
        phone,
        college,
        course,
        semester,
        password
    } = req.body;

    if (
        !name ||
        !email ||
        !phone ||
        !college ||
        !course ||
        !semester ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const data = readData();

    const existingStudent = data.students.find(
        student => student.email.toLowerCase() === email.toLowerCase()
    );

    if (existingStudent) {
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    const newStudent = {
        id: data.students.length + 1,
        name,
        email,
        phone,
        college,
        course,
        semester,
        password
    };

    data.students.push(newStudent);

    writeData(data);

    res.status(201).json({
        message: "Registration successful"
    });
});

// Login student
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const data = readData();

    const student = data.students.find(
        student =>
            student.email.toLowerCase() === email.toLowerCase() &&
            student.password === password
    );

    if (!student) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    // Don't send password back to frontend
    const { password: _, ...studentWithoutPassword } = student;

    res.json({
        message: "Login successful",
        student: studentWithoutPassword
    });
});

// Get all students
app.get("/api/students", (req, res) => {
    const data = readData();

    const students = data.students.map(
        ({ password, ...student }) => student
    );

    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});