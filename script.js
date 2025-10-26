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

//THE CONNECTION ADAFRUIT IO TO WEBSITE
// Replace with your actual Adafruit IO username and key
const AIO_USERNAME = "fatlee09";
const AIO_KEY = "aio_VpqM97AFn2xiRnMFpct3RGz1mpWi";
const FEED_KEY = "led-control"; // name of your Adafruit IO feed

// Turn ON the lamp (send data = "ON")
async function turnOn() {
  await fetch(`https://io.adafruit.com/api/v2/${fatlee09}/feeds/${led-control}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AIO-Key": aio_VpqM97AFn2xiRnMFpct3RGz1mpWi
    },
    body: JSON.stringify({ value: "ON" })
  });
  document.getElementById("lamp").style.background = "yellow";
}

// Turn OFF the lamp (send data = "OFF")
async function turnOff() {
  await fetch(`https://io.adafruit.com/api/v2/${fatlee09}/feeds/${led-control}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AIO-Key": aio_VpqM97AFn2xiRnMFpct3RGz1mpWi
    },
    body: JSON.stringify({ value: "OFF" })
  });
  document.getElementById("lamp").style.background = "gray";
}

// Get current lamp status (optional refresh)
  const data = await res.json();
  const lamp = document.getElementById("lamp");
  lamp.style.background = data.value === "ON" ? "yellow" : "gray";
}
