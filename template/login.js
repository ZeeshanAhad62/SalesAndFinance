document.addEventListener("DOMContentLoaded", function () {
    const passwordToggle = document.querySelector(".toggle-password");
    const loginForm = document.getElementById("loginForm");

    const apiUrl = `${ENV.API_URL}api/auth`;
    console.log("API URL:", apiUrl); // Debug: Check the API URL

    // Toggle Password Visibility
    if (passwordToggle) {
        passwordToggle.addEventListener("click", function () {
            const passwordInput = document.getElementById("password");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.classList.add("fa-eye-slash");
                this.classList.remove("fa-eye");
            } else {
                passwordInput.type = "password";
                this.classList.add("fa-eye");
                this.classList.remove("fa-eye-slash");
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const requestData = {
                email: email,
                password: password
            };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                });

                const result = await response.json();
                console.log("Response data:", result); // Debug: Check the response data

                if (response.ok) {
                    window.location.href = "index.html"; // Redirect on success
                } else {
                    alert(result.message || "Login failed");
                }
            } catch (error) {
                console.error("Error logging in:", error); // Debug: Check for errors
                alert("An error occurred. Please try again.");
            }
        });
    }
});