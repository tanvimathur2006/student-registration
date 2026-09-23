// ================================
// REGISTRATION
// ================================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", function (event) {

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


        // Create student object
        const student = {
            fullName: fullName,
            email: email,
            phone: phone,
            college: college,
            course: course,
            semester: semester,
            password: password
        };


        // Save student data
        localStorage.setItem("student", JSON.stringify(student));

        alert("Registration successful!");

        // Go to login page
        window.location.href = "index.html";
    });
}



// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        // Get registered student
        const storedStudent = localStorage.getItem("student");

        if (!storedStudent) {
            alert("No registered account found. Please register first.");
            return;
        }


        const student = JSON.parse(storedStudent);


        // Check credentials
        if (
            email === student.email &&
            password === student.password
        ) {

            // Create login session
            localStorage.setItem("loggedIn", "true");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {

            alert("Invalid email or password.");

        }

    });
}



// ================================
// DASHBOARD
// ================================

const dashboard = document.querySelector(".dashboard");

if (dashboard) {

    // Check login status

    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        window.location.href = "index.html";

    } else {

        // Get student data

        const storedStudent = localStorage.getItem("student");

        if (storedStudent) {

            const student = JSON.parse(storedStudent);


            // Dashboard cards

            document.getElementById("studentName").textContent =
                student.fullName;

            document.getElementById("studentCourse").textContent =
                student.course;

            document.getElementById("studentSemester").textContent =
                student.semester;


            // Profile section

            document.getElementById("profileName").textContent =
                student.fullName;

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

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";

    });
}