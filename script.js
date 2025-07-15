const GAS_URL = "https://script.google.com/macros/s/AKfycbzSRnwIYoyLGF8Pz9S9gNJsarfM_bHc9nVjbLlfr9axTzsIJ2K4zzKSFPOJsiygbgsRKg/exec"; // Update with your Apps Script URL

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      localStorage.setItem("loggedIn", true);
      document.getElementById("login-section").style.display = "none";
      document.getElementById("attendance-section").style.display = "block";
    } else {
      alert("Invalid login.");
    }
  });
}

function clock(actionType) {
  const matric = document.getElementById("matric").value;
  fetch(GAS_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "clock",
      matric,
      type: actionType
    })
  })
  .then(res => res.text())
  .then(alert);
}

function clockIn() {
  clock("Clock-In");
}

function clockOut() {
  clock("Clock-Out");
}

// Check login status on page load
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("attendance-section").style.display = "block";
  }
};

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      // Save login status locally
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email); // Optional
      document.getElementById("login-section").style.display = "none";
      document.getElementById("attendance-section").style.display = "block";
    } else {
      alert("Invalid login.");
    }
  });
}

