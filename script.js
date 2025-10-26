// === LOGIN CONFIG ===
const ID = "difadli";
const PASS = "5220711056";

// === ADAFRUIT IO CONFIG ===
const AIO_USERNAME = "fatlee09";   // your username
const AIO_KEY = "aio_YxWo08LrHjL0f284oI8eDOFy6nuK";   // your Adafruit IO key
const FEED_KEY = "led-control";      // your feed name (create it on io.adafruit.com)
const url = `https://io.adafruit.com/fatlee09/feeds/led-control`;


// === PAGE CONTROL ===
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// === LOGIN LOGIC ===
function login() {
  const user = document.getElementById("user-id").value;
  const pass = document.getElementById("password").value;

  if (user === ID && pass === PASS) {
    showPage("control-page");
  } else {
    alert("Invalid ID or Password. Try again.");
    document.getElementById("password").value = "";
  }
}

function logout() {
  showPage("login-page");
}

// === CONTROL LOGIC ===
const lamp = document.getElementById("lamp");
const statusText = document.getElementById("status");

async function sendToAdafruit(value) {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_KEY}/data`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": AIO_KEY
      },
      body: JSON.stringify({ value })
    });

    if (res.ok) {
      console.log("✅ Sent:", value);
    } else {
      console.error("❌ Failed:", await res.text());
    }
  } catch (err) {
    console.error("⚠️ Network Error:", err);
  }
}

function turnOn() {
  lamp.classList.add("on");
  statusText.textContent = "Status: ON";
  sendToAdafruit("ON");
}

function turnOff() {
  lamp.classList.remove("on");
  statusText.textContent = "Status: OFF";
  sendToAdafruit("OFF");
}
