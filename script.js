document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("funForm");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const audio = document.getElementById("audio");
  const formPage = document.getElementById("formPage");
  const processingPage = document.getElementById("processingPage");
  const resultPage = document.getElementById("resultPage");
  const loadingText = document.getElementById("loadingText");
  const loaderPercent = document.getElementById("loader-percent");
  const dobInput = document.getElementById("dob");
  const dobError = document.getElementById("dobError");

  let isProcessing = false;

  // Access the webcam
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error accessing the webcam: ", error);
    });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isProcessing) return;
    isProcessing = true;

    // Validate date of birth
    if (!validateDOB(dobInput.value)) {
      dobError.textContent =
        "Please enter a valid date of birth in the format YYYY-MM-DD.";
      isProcessing = false;
      return;
    } else {
      dobError.textContent = "";
    }

    // Capture the picture immediately
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");

    // Show processing screen
    formPage.classList.add("hidden");
    processingPage.classList.remove("hidden");
    processingPage.classList.add("active");
    displayLoadingText();

    // Simulate loading process
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      loaderPercent.textContent = `${percent}%`;
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          processingPage.classList.add("hidden");
          resultPage.classList.remove("hidden");
          resultPage.classList.add("active");
          displayResult(imageDataURL);
          isProcessing = false;
        }, 100); // Minimize the delay to 100ms
      }
    }, 600);
  });

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !isProcessing) {
      isProcessing = true;
      captureAndDisplayResult();
      setTimeout(() => {
        isProcessing = false;
      }, 1000); // Prevent multiple triggers
    }
  });

  function captureAndDisplayResult() {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");
    displayResult(imageDataURL);
  }

  function displayLoadingText() {
    const loadingMessages = [
      "Calculating your horoscope...",
      "Reading the stars...",
      "Finding your fortune...",
      "Consulting the oracles...",
      "Checking your zodiac...",
    ];
    loadingText.textContent =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }

  function displayResult(imageDataURL) {
    // Play random audio
    const audioFiles = [
      "memes/audio1.mp3",
      "memes/audio2.mp3",
      "memes/audio3.mp3",
      "memes/audio4.mp3",
      "memes/audio5.mp3",
      "memes/audio6.mp3",
      "memes/audio7.mp3",
      "memes/audio8.mp3",
      "memes/audio9.mp3",
      "memes/audio10.mp3",
    ]; // Add your audio files here
    const randomAudio =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    audio.src = randomAudio;
    audio.volume = 1.0; // Full volume
    audio.play();

    // Display captured image in full screen
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous content
    const img = document.createElement("img");
    img.src = imageDataURL;
    img.style.position = "absolute";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    resultDiv.appendChild(img);

    // Add a random crazy effect
    addRandomEffect(resultDiv);
  }

  function addRandomEffect(resultDiv) {
    const effects = [
      createConfetti,
      createBouncingBalls,
      createRotatingStars,
      createFireworks,
      createColorOverlay,
    ];

    // Choose a random effect
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect(resultDiv);
  }

  function createConfetti(resultDiv) {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.backgroundColor = getRandomColor();
      resultDiv.appendChild(confetti);
    }
  }

  function createBouncingBalls(resultDiv) {
    for (let i = 0; i < 20; i++) {
      const ball = document.createElement("div");
      ball.className = "ball";
      ball.style.left = `${Math.random() * 100}vw`;
      ball.style.top = `${Math.random() * 100}vh`;
      ball.style.backgroundColor = getRandomColor();
      resultDiv.appendChild(ball);
    }
  }

  function createRotatingStars(resultDiv) {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      resultDiv.appendChild(star);
    }
  }

  function createFireworks(resultDiv) {
    const fireworkContainer = document.createElement("div");
    fireworkContainer.className = "firework-container";
    resultDiv.appendChild(fireworkContainer);
    for (let i = 0; i < 5; i++) {
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 100}vh`;
      fireworkContainer.appendChild(firework);
      animateFirework(firework);
    }
  }

  function animateFirework(firework) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.backgroundColor = getRandomColor(true);
      particle.style.transform = `rotate(${(360 / particles) * i}deg)`;
      firework.appendChild(particle);
    }
  }

  function createColorOverlay(resultDiv) {
    const colorOverlay = document.createElement("div");
    colorOverlay.className = "color-overlay";
    resultDiv.appendChild(colorOverlay);

    setInterval(() => {
      colorOverlay.style.backgroundColor = getRandomColor(true);
    }, 1000);
  }

  function getRandomColor(withTransparency = false) {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return withTransparency ? `${color}80` : color; // Adds transparency if needed
  }

  function validateDOB(dob) {
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
      return false;
    }
    const dobDate = new Date(dob);
    const today = new Date();
    return dobDate instanceof Date && !isNaN(dobDate) && dobDate < today;
  }
});
