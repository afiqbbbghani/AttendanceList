let userEmail = "";

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  userEmail = profile.getEmail();
  document.getElementById("user-email").innerText = `Logged in as ${userEmail}`;
  document.querySelector(".g-signin2").style.display = "none";
  document.getElementById("form").style.display = "block";
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    userEmail = "";
    document.querySelector(".g-signin2").style.display = "block";
    document.getElementById("form").style.display = "none";
  });
}

function submitData(action) {
  const matric = document.getElementById("matric").value;
  if (!matric) {
    alert("Enter Matric Number");
    return;
  }

  fetch('YOUR_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify({ email: userEmail, matric: matric, action: action })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert(`${action} successful`);
    } else {
      alert("Error: " + data.message);
    }
  });
}
