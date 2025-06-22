const leftBarrier = document.querySelector(".left-barrier");
const rightBarrier = document.querySelector(".right-barrier");
const restartBtn = document.getElementById("restartBtn");
const phrase = document.getElementById("phrase");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeOutText(element) {
  element.style.opacity = 0;
  await delay(500);
}

async function fadeInText(element) {
  element.style.opacity = 1;
  await delay(500);
}

async function startAnimation() {
  phrase.innerHTML = 'I <span id="love">LOVE</span> YOU';
  phrase.style.opacity = 1;

  // Reset posição inicial (bem afastadas)
  leftBarrier.style.transform = "translate(-150px, -50%)";
  rightBarrier.style.transform = "translate(150px, -50%)";

  await delay(2000);

  // Aproxima barreiras sem invadir o texto
  leftBarrier.style.transform = "translate(-60px, -50%)";
  rightBarrier.style.transform = "translate(60px, -50%)";

  await fadeOutText(phrase);
  const loveSpan = document.getElementById("love");
  loveSpan.textContent = "❤️";
  await fadeInText(phrase);

  await delay(2000);

  // Barreiras “fecham” mais — mas continuam fora do texto
  leftBarrier.style.transform = "translate(50%, -50%)";
  rightBarrier.style.transform = "translate(-50%, -50%)";

  await fadeOutText(phrase);
  phrase.textContent = "❤️";
  await fadeInText(phrase);
}

restartBtn.addEventListener("click", () => {
  startAnimation();
});

window.onload = startAnimation;

