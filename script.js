
const scriptURL = 'https://script.google.com/macros/s/AKfycbzSRnwIYoyLGF8Pz9S9gNJsarfM_bHc9nVjbLlfr9axTzsIJ2K4zzKSFPOJsiygbgsRKg/exec';

if (localStorage.getItem('loggedIn') === 'true') {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('main-form').style.display = 'block';
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch(scriptURL + '?action=login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('main-form').style.display = 'block';
      } else {
        alert('Invalid credentials');
      }
    });
}

function submitAttendance(type) {
  const matric = document.getElementById('matric').value;
  if (!matric) return alert('Please enter matric number');
  fetch(scriptURL + '?action=log', {
    method: 'POST',
    body: JSON.stringify({ matric, type }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(data => {
      document.getElementById('message').textContent = data.message;
      document.getElementById('matric').value = '';
    });
}
