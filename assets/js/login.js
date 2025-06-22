// Global variable to hold interval ID
document.addEventListener("DOMContentLoaded", function () {
     const form = document.getElementById("loginForm");
     const emailInput = document.getElementById("email");
     const passwordInput = document.getElementById("password");

     form.addEventListener("submit", async function (event) {
          event.preventDefault(); // Prevent form submission

          // Get values from form inputs
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();

          // Get stored user data from localStorage
          const storedData = localStorage.getItem("userData");
          if (!storedData) {
               alert("Please sign up first. No user found.");
               window.location.href = "Signup.html"; // Redirect to Signup
               return;
          }

          const userData = JSON.parse(storedData);

          // Check if email exists
          if (userData.email !== email) {
               alert("Invalid email or password!");
               return;
          }

          // Hash the entered password and compare with stored hash
          const hashedPassword = await hashPassword(password);
          if (hashedPassword !== userData.password) {
               alert("Invalid email or password!");
               return;
          }

          // If login is successful, set "isLoggedIn" status in localStorage
          localStorage.setItem("isLoggedIn", true);
          // Redirect to index.html after successful login
          window.location.href = "index.html";
     });
     // Function to hash the password using SHA-256
     async function hashPassword(password) {
          const encoder = new TextEncoder(); // Encoder to convert string to bytes
          const data = encoder.encode(password); // Convert password to bytes
          const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Hash the password
          const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert byte array to hex string
          return hashHex;
     }
});

document.addEventListener("DOMContentLoaded", function () {
     const profileDiv = document.getElementById("profile");
     const loginSignupBtn = document.getElementById("login-signup-btn");
     const signupBtn = document.getElementById("signup-btn");

     // Check if user is logged in
     const storedData = localStorage.getItem("userData");

     if (storedData) {
          const userData = JSON.parse(storedData);
          // Create a div for the profile photo and set styles
          const profilePhotoDiv = document.createElement("div");
          profilePhotoDiv.style.width = "60px";
          profilePhotoDiv.style.height = "60px";
          profilePhotoDiv.style.borderRadius = "50%";
          profilePhotoDiv.style.backgroundColor = "#ccc";
          // Use the base64 encoded image stored in localStorage
          const profileImage = userData.profileImage || 'assets/img/profile/default-profile.png';
          profilePhotoDiv.style.backgroundImage = `url(${profileImage})`;
          profilePhotoDiv.style.backgroundSize = "cover";
          profilePhotoDiv.style.backgroundPosition = "center";
          profileDiv.appendChild(profilePhotoDiv);

          // Change 'Signup' button to 'Logout'
          signupBtn.textContent = "Logout";
          signupBtn.setAttribute("class", "btn-logout"); // Add the red logout button style

          // Logout functionality
          signupBtn.addEventListener("click", function () {
               localStorage.removeItem("userData");
               localStorage.removeItem("isLoggedIn");
               window.location.href = "Login.html"; // Redirect to login page
          });

          // Hide the 'Login' button (user is logged in)
          loginSignupBtn.style.display = "none";
     } else {
          // If not logged in, show Login/Signup options
          loginSignupBtn.textContent = "Login";
          loginSignupBtn.addEventListener("click", function () {
               window.location.href = "Login.html"; // Redirect to login page
          });

          signupBtn.textContent = "Signup";
          signupBtn.setAttribute("href", "Signup.html");
     }

});

// Start the interval to show login alert every 4 seconds until the user logs in
