const ID = "difadli";
const PASS = "5220711056";
let currentPage = "login";

function fadeTo(target) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  setTimeout(() => {
    document.getElementById(target).classList.add('active');
    currentPage = target;
  }, 300);
}

function login() {
  const user = document.getElementById('user-id').value;
  const pass = document.getElementById('password').value;

  if (user === ID && pass === PASS) {
    fadeTo('menu-page');
  } else {
    alert('Invalid ID or Password. Please try again.');
    document.getElementById('password').value = '';
  }
}

function gotoControl() {
  fadeTo('control-page');
}

function goBack() {
  if (currentPage === 'control-page') fadeTo('menu-page');
  else if (currentPage === 'menu-page') fadeTo('login-page');
}

const lamp = document.getElementById('lamp');
function turnOn() {
  lamp.classList.add('on');
  console.log("Power System: ON");
}
function turnOff() {
  lamp.classList.remove('on');
  console.log("Power System: OFF");
}
