// ================================
// BACKEND API
// ================================

const API_URL = "http://localhost:5000";


// ================================
// REGISTRATION
// ================================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const college = document.getElementById("college").value.trim();
        const course = document.getElementById("course").value;
        const semester = document.getElementById("semester").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;


        // Password validation
        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }


        // Confirm password validation
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        // Phone validation
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }


        // Student data
        const student = {
            name: fullName,
            email: email,
            phone: phone,
            college: college,
            course: course,
            semester: semester,
            password: password
        };


        try {

            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            const result = await response.json();


            if (!response.ok) {
                alert(result.message);
                return;
            }


            alert("Registration successful!");

            // Go to login page
            window.location.href = "client/index.html";

        } catch (error) {

            console.error("Registration error:", error);

            alert("Unable to connect to the server.");

        }

    });
}



// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        try {

            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const result = await response.json();


            if (!response.ok) {
                alert(result.message);
                return;
            }


            // Store only the logged-in student's data
            sessionStorage.setItem(
                "student",
                JSON.stringify(result.student)
            );

            sessionStorage.setItem("loggedIn", "true");


            // Redirect to dashboard
            window.location.href = "client/dashboard.html";


        } catch (error) {

            console.error("Login error:", error);

            alert("Unable to connect to the server.");

        }

    });
}



// ================================
// DASHBOARD
// ================================

const dashboard = document.querySelector(".dashboard");

if (dashboard) {

    const loggedIn = sessionStorage.getItem("loggedIn");


    // Check login status
    if (loggedIn !== "true") {

        window.location.href = "client/index.html";

    } else {

        const storedStudent = sessionStorage.getItem("student");


        if (storedStudent) {

            const student = JSON.parse(storedStudent);


            // Dashboard cards

            document.getElementById("studentName").textContent =
                student.name;

            document.getElementById("studentCourse").textContent =
                student.course;

            document.getElementById("studentSemester").textContent =
                student.semester;


            // Profile section

            document.getElementById("profileName").textContent =
                student.name;

            document.getElementById("profileEmail").textContent =
                student.email;

            document.getElementById("profilePhone").textContent =
                student.phone;

            document.getElementById("profileCollege").textContent =
                student.college;

            document.getElementById("profileCourse").textContent =
                student.course;

            document.getElementById("profileSemester").textContent =
                student.semester;

        }
    }
}



// ================================
// LOGOUT
// ================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("student");

        window.location.href = "client/index.html";

    });
}