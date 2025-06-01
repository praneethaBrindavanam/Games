const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed matters in many coding challenges.",
  "Practice makes perfect when learning to type.",
  "JavaScript makes web pages dynamic and fun.",
  "Never give up, great things take time."
];

let timerInterval;
let startTime;
let typed = false;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const currentTime = Math.floor((new Date() - startTime) / 1000);
    timerEl.textContent = currentTime;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function calculateStats() {
  stopTimer();
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  const inputText = inputEl.value.trim();
  const wordCount = inputText.split(/\s+/).length;
  const wpm = Math.round((wordCount / elapsedTime) * 60);
  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;

  const correct = quoteEl.textContent;
  let matches = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === correct[i]) matches++;
  }

  const accuracy = Math.round((matches / correct.length) * 100);
  accuracyEl.textContent = isNaN(accuracy) ? "0%" : `${accuracy}%`;
}

startBtn.addEventListener("click", () => {
  quoteEl.textContent = getRandomQuote();
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();
  timerEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = "0%";
  typed = false;
});

inputEl.addEventListener("input", () => {
  if (!typed) {
    startTimer();
    typed = true;
  }
  const quote = quoteEl.textContent;
  if (inputEl.value.trim() === quote) {
    calculateStats();
    inputEl.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  inputEl.value = "";
  inputEl.disabled = true;
  quoteEl.textContent = "";
  timerEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = "0%";
});
