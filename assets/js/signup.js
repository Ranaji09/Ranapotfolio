document.addEventListener("DOMContentLoaded", function () {
     const form = document.getElementById("signup-form");
     const usernameInput = document.getElementById("username");
     const emailInput = document.getElementById("email");
     const passwordInput = document.getElementById("password");
     const confirmPasswordInput = document.getElementById("confirm-password");
     const uploadProfileInput = document.getElementById("upload-profile");

     form.addEventListener("submit", async function (event) {
          event.preventDefault(); // Prevent form submission

          // Get values from form inputs
          const username = usernameInput.value.trim();
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();
          const confirmPassword = confirmPasswordInput.value.trim();

          // Check if password and confirm password match
          if (password !== confirmPassword) {
               alert("Passwords do not match!");
               return;
          }

          // Hash the password using SHA-256 before storing
          const hashedPassword = await hashPassword(password);

          // Get the profile image and convert it to Base64 if it's selected
          let profileImageBase64 = null;
          if (uploadProfileInput.files.length > 0) {
               profileImageBase64 = await convertImageToBase64(uploadProfileInput.files[0]);
          }

          // Store data in localStorage
          const userData = {
               username: username,
               email: email,
               password: hashedPassword,
               profileImage: profileImageBase64 // Save the profile image Base64 string
          };
          localStorage.setItem("userData", JSON.stringify(userData)); // Save as stringified JSON
          alert("Account created successfully!"); // Display success message
          // Optionally, redirect to another page
          window.location.href = "Login.html"; // Redirect to login page
     });
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

// Function to convert image to Base64
function convertImageToBase64(imageFile) {
     return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function () {
               resolve(reader.result); // Resolve with Base64 string
          };
          reader.onerror = function (error) {
               reject(error); // Reject if there is an error
          };
          reader.readAsDataURL(imageFile); // Convert image file to Base64
     });
}
