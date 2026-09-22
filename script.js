document.addEventListener("DOMContentLoaded", () => {
  const stars = document.getElementById("stars");
  const hero = document.getElementById("hero");
  const dedication = document.getElementById("dedication");
  const revealButton = document.getElementById("revealButton");
  const closeButton = document.getElementById("closeButton");
  const moreMagic = document.getElementById("moreMagic");
  const toast = document.getElementById("toast");

  const symbols = ["♥", "✦", "🌻", "💛"];
  const colors = ["#ffd84d", "#fff2a8", "#ff7396", "#ffffff"];

  // Crear las estrellas del fondo
  function buildStars() {
    const fragment = document.createDocumentFragment();
    const amount = Math.min(70, Math.floor(window.innerWidth / 16));

    for (let i = 0; i < amount; i++) {
      const star = document.createElement("span");

      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 85}%`;
      star.style.setProperty("--time", `${2 + Math.random() * 4}s`);
      star.style.setProperty("--delay", `${Math.random() * -5}s`);

      fragment.appendChild(star);
    }

    stars.appendChild(fragment);
  }

  // Crear un corazón, una flor o un destello
  function createParticle(x, y, special = false) {
    const particle = document.createElement("span");

    particle.className = "heart-particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.fontSize = special
      ? `${20 + Math.random() * 18}px`
      : `${13 + Math.random() * 13}px`;

    particle.style.setProperty(
      "--particle-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    particle.style.setProperty(
      "--drift",
      `${-75 + Math.random() * 150}px`
    );

    particle.style.setProperty(
      "--rotate",
      `${-55 + Math.random() * 110}deg`
    );

    particle.style.setProperty(
      "--duration",
      `${1.5 + Math.random() * 1.25}s`
    );

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2900);
  }

  // Crear una explosión de corazones y flores
  function burst(
    x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    amount = 18
  ) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        createParticle(
          x + (Math.random() - 0.5) * 110,
          y + (Math.random() - 0.5) * 55,
          true
        );
      }, i * 32);
    }
  }

  // Mostrar la dedicatoria para Daniela
  function openDedication() {
    hero.classList.add("is-hidden");
    dedication.classList.add("is-open");

    dedication.setAttribute("aria-hidden", "false");
    revealButton.setAttribute("aria-expanded", "true");

    burst(
      window.innerWidth / 2,
      window.innerHeight * 0.67,
      25
    );

    setTimeout(() => {
      closeButton.focus();
    }, 500);
  }

  // Cerrar la dedicatoria
  function closeDedication() {
    dedication.classList.remove("is-open");
    dedication.setAttribute("aria-hidden", "true");

    revealButton.setAttribute("aria-expanded", "false");
    hero.classList.remove("is-hidden");

    setTimeout(() => {
      revealButton.focus();
    }, 450);
  }

  // Mostrar el mensaje inferior
  function showToast() {
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // Crear el fondo de estrellas
  buildStars();

  // Abrir la dedicatoria
  revealButton.addEventListener("click", openDedication);

  // Cerrar la dedicatoria
  closeButton.addEventListener("click", closeDedication);

  // Crear más magia
  moreMagic.addEventListener("click", () => {
    burst(
      window.innerWidth / 2,
      window.innerHeight * 0.72,
      34
    );

    showToast();
  });

  // Crear partículas al tocar o hacer clic en la pantalla
  document.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        createParticle(event.clientX, event.clientY);
      }, i * 45);
    }
  });

  // Cerrar la dedicatoria presionando Escape
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      dedication.classList.contains("is-open")
    ) {
      closeDedication();
    }
  });
});