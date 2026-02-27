"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);
noButton.addEventListener("mouseenter", dodgeNoButton);

function handleNoClick() {
  if (!play) return;

  noCount++;
  const imageIndex = Math.min(noCount, MAX_IMAGES);
  changeImage(imageIndex);
  resizeYesButton();
  updateNoButtonText();
  burstHearts(6);

  if (noCount === MAX_IMAGES) {
    play = false;
    noButton.style.transform = "translate(0, 0)";
  }
}

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  titleElement.classList.add("celebrate");
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  burstHearts(20, true);
}

function dodgeNoButton() {
  if (!play || noCount === 0) return;

  const shiftX = randomBetween(-60, 60);
  const shiftY = randomBetween(-35, 35);
  noButton.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.35;

  yesButton.style.fontSize = `${newFontSize}px`;
  yesButton.classList.remove("grow-pulse");
  void yesButton.offsetWidth;
  yesButton.classList.add("grow-pulse");
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Please Jennyma",
    "I Love You Jennyma :(",
    "I'm Gonna Die",
    "Avan Sethutaan Da",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
  catImg.classList.remove("pop");
  void catImg.offsetWidth;
  catImg.classList.add("pop");
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

function burstHearts(count, wideSpread = false) {
  const { innerWidth, innerHeight } = window;
  const spread = wideSpread ? innerWidth * 0.4 : innerWidth * 0.15;
  const startX = innerWidth / 2;
  const startY = innerHeight * 0.7;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "💖" : "💕";

    const x = startX + randomBetween(-spread, spread);
    const y = startY + randomBetween(-30, 30);
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.animationDelay = `${i * 40}ms`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1700);
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
