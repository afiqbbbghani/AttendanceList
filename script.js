const GAS_URL = "YOUR_DEPLOYED_WEB_APP_URL"; // Update with your Apps Script URL

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
