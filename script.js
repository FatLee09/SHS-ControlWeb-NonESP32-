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

// --- Adafruit IO Connection ---
const AIO_USERNAME = "fatlee09";
const AIO_KEY = "aio_VpqM97AFn2xiRnMFpct3RGz1mpWi";
const FEED_KEY = "led-control";

// Send data to Adafruit IO
async function sendToAdafruit(value) {
  try {
    const res = await fetch(`https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": AIO_KEY
      },
      body: JSON.stringify({ value })
    });

    if (res.ok) {
      console.log("Sent to Adafruit IO:", value);
    } else {
      console.error("Failed to send:", await res.text());
    }
  } catch (err) {
    console.error("Error sending to Adafruit IO:", err);
  }
}

// Lamp control functions
const lamp = document.getElementById('lamp');

function turnOn() {
  lamp.classList.add('on');
  lamp.style.background = "yellow";
  console.log("Power System: ON");
  sendToAdafruit("ON");
}

function turnOff() {
  lamp.classList.remove('on');
  lamp.style.background = "gray";
  console.log("Power System: OFF");
  sendToAdafruit("OFF");
}
