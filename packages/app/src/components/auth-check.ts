document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const usernameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout-button");
  
    if (!token) {
      window.location.href = "/login.html";
      return;
    }
  
    fetch("/api/profiles", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        return response.json();
      })
      .then(data => {
        fetchAndDisplayProperties(data);
        const username = JSON.parse(atob(token.split('.')[1])).username;
        usernameDisplay.textContent = username;
      })
      .catch(error => {
        console.error("Error:", error);
        localStorage.removeItem("token");
        window.location.href = "/login.html";
      });
  
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    });
  });
  