document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form from refreshing the page
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error("Login failed");
        }
  
        const data = await response.json();
        localStorage.setItem("token", data.token);
  
        // Redirect to the home page or another page
        window.location.href = "/";
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed: " + error.message);
      }
    });
  });
  