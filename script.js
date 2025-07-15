const GAS_URL = "https://script.google.com/macros/s/AKfycbzSRnwIYoyLGF8Pz9S9gNJsarfM_bHc9nVjbLlfr9axTzsIJ2K4zzKSFPOJsiygbgsRKg/exec"; // Replace with your actual Apps Script Web App URL

// Check login status on page load
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("attendance-section").style.display = "block";
  }
};

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  fetch(GAS_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "login",
      email,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email); // Optional use
      document.getElementById("login-section").style.display = "none";
      document.getElementById("attendance-section").style.display = "block";
    } else {
      alert("Invalid login credentials.");
    }
  })
  .catch(err => {
    console.error("Login failed:", err);
    alert("Login error. Please try again.");
  });
}

function clock(actionType) {
  const matric = document.getElementById("matric").value.trim();

  if (!matric) {
    alert("Please enter your matric number.");
    return;
  }

  fetch(GAS_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "clock",
      matric,
      type: actionType
    })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    document.getElementById("matric").value = ""; // Clear field
  })
  .catch(err => {
    console.error("Clock action failed:", err);
    alert("Error submitting attendance.");
  });
}

function clockIn() {
  clock("Clock-In");
}

function clockOut() {
  clock("Clock-Out");
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  location.reload();
}
