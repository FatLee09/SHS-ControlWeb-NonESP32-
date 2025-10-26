// === LOGIN CONFIG ===
const ID = "difadli";
const PASS = "5220711056";

// === ADAFRUIT IO CONFIG ===
const AIO_USERNAME = "fatlee09";   // your Adafruit IO username
const FEED_KEY = "led-control";    // your feed key

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

// Send ON/OFF to Adafruit IO via Webhook
async function sendToAdafruit(value) {
  // ⚠️ Replace the URL below with your actual Adafruit Webhook URL
  const url = "https://io.adafruit.com/api/v2/webhooks/feed/6zpGhmcsr5sd2zS6PWBAKhJZ3Epbh";  

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ value })
    });

    if (res.ok) {
      console.log("✅ Sent via Webhook:", value);
    } else {
      console.error("❌ Failed:", await res.text());
    }
  } catch (err) {
    console.error("⚠️ Network Error:", err);
  }
}

function turnOn() {
  lamp.classList.add("on");
  lamp.style.background = "yellow";
  statusText.textContent = "Status: ON";
  sendToAdafruit("ON");
}

function turnOff() {
  lamp.classList.remove("on");
  lamp.style.background = "gray";
  statusText.textContent = "Status: OFF";
  sendToAdafruit("OFF");
}
