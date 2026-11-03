// Remplace ce prénom par celui de la personne invitée.
const PRENOM = "my Chouquette Love";

const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const stage = document.querySelector("#button-stage");
const answer = document.querySelector("#answer");
const happyCats = document.querySelector("#happy-cats");
const celebration = document.querySelector("#celebration");
const question = document.querySelector("#question");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const escapeMessages = ["Tu es sûre ?", "Vraiment ?", "Raté 😼", "Même pas en rêve !"];
let escapes = 0;
let moving = false;
let celebrationStarted = false;

question.textContent = `Veux tu passer le jour de l'an avec moi ${PRENOM} ?`;

function findSafePosition() {
  const stageRect = stage.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const noRect = noButton.getBoundingClientRect();
  const width = noRect.width;
  const height = noRect.height;
  const padding = 4;
  const gap = 12;
  const maxX = Math.max(padding, stageRect.width - width - padding);
  const maxY = Math.max(padding, stageRect.height - height - padding);
  const yes = {
    left: yesRect.left - stageRect.left - gap,
    right: yesRect.right - stageRect.left + gap,
    top: yesRect.top - stageRect.top - gap,
    bottom: yesRect.bottom - stageRect.top + gap,
  };
  const isSafe = (x, y) => (
    x + width <= yes.left ||
    x >= yes.right ||
    y + height <= yes.top ||
    y >= yes.bottom
  );

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const x = padding + Math.random() * Math.max(0, maxX - padding);
    const y = padding + Math.random() * Math.max(0, maxY - padding);
    if (isSafe(x, y)) return { x, y };
  }

  // Le parcours en grille garantit une position de repli, même sur petit écran.
  for (let y = padding; y <= maxY; y += 8) {
    for (let x = padding; x <= maxX; x += 8) {
      if (isSafe(x, y)) return { x, y };
    }
  }

  return { x: padding, y: maxY };
}

function makeNoButtonFlee(event) {
  if (event.type === "touchstart") event.preventDefault();
  if (celebrationStarted || moving) return;

  moving = true;
  escapes += 1;
  noButton.textContent = escapeMessages[(escapes - 1) % escapeMessages.length];
  noButton.style.transform = "none";
  noButton.style.left = "0";
  noButton.style.top = "0";
  yesButton.style.transform = `translateX(-50%) scale(${Math.min(1 + escapes * 0.045, 1.45)})`;
  const position = findSafePosition();
  noButton.style.left = `${position.x}px`;
  noButton.style.top = `${position.y}px`;

  window.setTimeout(() => {
    moving = false;
  }, 220);
}

function makeHearts() {
  const reduced = prefersReducedMotion.matches;
  const count = reduced ? 8 : 32;
  const hearts = ["💖", "💕", "💗", "💞", "💘"];

  for (let index = 0; index < count; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = hearts[index % hearts.length];
    heart.style.setProperty("--left", `${Math.random() * 100}%`);
    heart.style.setProperty("--size", `${18 + Math.random() * 20}px`);
    heart.style.setProperty("--duration", `${reduced ? 1.2 : 2.4 + Math.random() * 2.2}s`);
    heart.style.setProperty("--delay", `${Math.random() * (reduced ? 0.3 : 1.2)}s`);
    heart.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
    heart.style.setProperty("--reduced-top", `${Math.random() * 85}vh`);
    celebration.append(heart);
  }
}

function makeCatsFall() {
  const reduced = prefersReducedMotion.matches;
  const count = reduced ? 6 : 18;
  const cats = ["😺", "😻", "😸", "😽"];

  for (let index = 0; index < count; index += 1) {
    const cat = document.createElement("span");
    cat.className = "falling-cat";
    cat.textContent = cats[index % cats.length];
    cat.style.setProperty("--left", `${Math.random() * 100}%`);
    cat.style.setProperty("--size", `${26 + Math.random() * 24}px`);
    cat.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
    cat.style.setProperty("--delay", `${Math.random() * 1.5}s`);
    cat.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    cat.style.setProperty("--rotation", `${-180 + Math.random() * 360}deg`);
    cat.style.setProperty("--reduced-top", `${Math.random() * 85}vh`);
    celebration.append(cat);
  }
}

function sayYes() {
  if (celebrationStarted) return;
  celebrationStarted = true;
  answer.textContent = "Youpi ! Rendez-vous le 31 🎆";
  noButton.hidden = true;
  yesButton.disabled = true;
  happyCats.innerHTML = ["😺", "😻", "😸", "😽"]
    .map((cat, index) => `<span class="happy-cat" style="animation-delay: ${index * 100}ms">${cat}</span>`)
    .join("");
  makeHearts();
  makeCatsFall();
}

noButton.addEventListener("mouseenter", makeNoButtonFlee);
noButton.addEventListener("touchstart", makeNoButtonFlee, { passive: false });
noButton.addEventListener("focus", makeNoButtonFlee);
noButton.addEventListener("click", makeNoButtonFlee);
yesButton.addEventListener("click", sayYes);

window.addEventListener("resize", () => {
  if (noButton.hidden || !noButton.style.left || celebrationStarted) return;
  const position = findSafePosition();
  noButton.style.left = `${position.x}px`;
  noButton.style.top = `${position.y}px`;
});
