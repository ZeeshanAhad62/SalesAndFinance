document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const apiUrl = `${ENV.API_URL}api/users`;// Your API URL (Update accordingly)

        // Get form values
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Password confirmation validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare request body
        const requestData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNumber: contactNumber,
            password: password
        };
        console.log('Request data:', requestData);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
            console.log('Response:', response );
             

            if (!response.ok) {
                throw new Error("Registration failed! " + response.statusText);
            }

            const responseData = await response.json();
            window.location.href = "login.html"; // Redirect to login page after success
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    });
});
