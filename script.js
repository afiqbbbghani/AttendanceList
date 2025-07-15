let userEmail = "";

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  userEmail = profile.getEmail();
  document.getElementById("user-email").innerText = `Signed in as ${userEmail}`;
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
  if (!matric) return alert("Please enter your matric number.");

  fetch('https://script.google.com/macros/s/AKfycbyv1AvKU4PiAymfCiNudjzwNJP4nOiEGBFvEnnW-QdIXXb5Gc7DnsjH-cM4TqjF7a71/exec', {
    method: 'POST',
    body: JSON.stringify({ email: userEmail, matric: matric, action: action }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert(`${action} successful`);
      document.getElementById("matric").value = "";
    } else {
      alert("Error: " + data.message);
    }
  });
}
