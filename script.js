
/* =========================================
   1. PENGATURAN WEBSITE
========================================= */

const SECRET_PIN = "181945";
const PARTNER_NAME = "Sayangku";
const SONG_TITLE = "Our Favorite Song ♡";

const memories = [
  {
    photo: "asset/foto1.jpg",
    title: "Our First Memory",
    caption: "Salah satu momen yang selalu membuatku tersenyum. ♡"
  },
  {
    photo: "asset/foto2.png",
    title: "A Day to Remember",
    caption: "Hal sederhana terasa istimewa ketika bersamamu."
  },
  {
    photo: "asset/foto3.png",
    title: "My Favorite Moment",
    caption: "Kenangan yang ingin kusimpan lama di dalam hati."
  },
  {
    photo: "asset/foto4.png",
    title: "More Memories to Come",
    caption: "Semoga masih banyak cerita indah yang bisa kita buat. 💗"
  }
];


/* =========================================
   2. MENGAMBIL ELEMEN HTML
========================================= */

const pages = document.querySelectorAll(".page");

const pinPage = document.getElementById("pinPage");
const gamePage = document.getElementById("gamePage");
const memoriesPage = document.getElementById("memoriesPage");
const musicPage = document.getElementById("musicPage");

const pinForm = document.getElementById("pinForm");
const pinInput = document.getElementById("pinInput");
const pinMessage = document.getElementById("pinMessage");

const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const gameMessage = document.getElementById("gameMessage");

const memoryPhoto = document.getElementById("memoryPhoto");
const memoryNumber = document.getElementById("memoryNumber");
const memoryLabel = document.getElementById("memoryLabel");
const memoryTitle = document.getElementById("memoryTitle");
const memoryCaption = document.getElementById("memoryCaption");
const memoryDots = document.querySelectorAll(".dot");

const prevMemory = document.getElementById("prevMemory");
const nextMemory = document.getElementById("nextMemory");
const specialSongPrompt =
  document.getElementById("specialSongPrompt");
const goToMusic = document.getElementById("goToMusic");

const vinyl = document.getElementById("vinyl");
const birthdayMusic = document.getElementById("birthdayMusic");
const playMusic = document.getElementById("playMusic");
const musicMessage = document.getElementById("musicMessage");
const songTitleElement = document.getElementById("songTitle");
const backToMemories = document.getElementById("backToMemories");


/* =========================================
   3. PENGATURAN JUDUL LAGU
========================================= */

// HTML kamu belum memiliki elemen dengan id="partnerName",
// jadi nama pasangan tidak diubah di sini.
songTitleElement.textContent = SONG_TITLE;


/* =========================================
   4. FUNGSI PINDAH HALAMAN
========================================= */

function showPage(targetPage) {
  if (!targetPage) {
    console.error("Halaman tujuan tidak ditemukan.");
    return;
  }

  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   5. GAME MATEMATIKA
========================================= */

const questions = [
  {
    question: "Berapa hasil dari 12 × 4?",
    answer: 48
  },
  {
    question: "Berapa hasil dari 100 − 37?",
    answer: 63
  },
  {
    question: "Berapa hasil dari 81 ÷ 9?",
    answer: 9
  }
];

let currentQuestion = 0;

function startGame() {
  currentQuestion = 0;

  gameMessage.textContent = "";
  answerInput.value = "";

  updateQuestion();
  showPage(gamePage);
}

function updateQuestion() {
  questionNumber.textContent = currentQuestion + 1;
  questionText.textContent = questions[currentQuestion].question;

  answerInput.value = "";
  answerInput.focus();
}

answerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const answer = Number(answerInput.value);
  const correctAnswer = questions[currentQuestion].answer;

  if (answer !== correctAnswer) {
    gameMessage.textContent =
      "Belum benar, coba hitung sekali lagi yaa! 💕";

    answerInput.value = "";
    answerInput.focus();
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    gameMessage.textContent =
      "Benar! Lanjut soal berikutnya ✨";

    updateQuestion();
    return;
  }

  gameMessage.textContent =
    "Yeay! Kamu berhasil membuka semua kenangan! 💗";

  setTimeout(function () {
    showMemories();
  }, 800);
});


/* =========================================
   6. PEMERIKSAAN PIN
========================================= */

pinForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredPin = pinInput.value.trim();

  console.log("PIN dimasukkan:", enteredPin);

  if (enteredPin === SECRET_PIN) {
    console.log("PIN benar. Membuka halaman kenangan.");

    pinMessage.textContent = "";
    pinInput.value = "";

    showMemories();
  } else {
    console.log("PIN salah. Membuka game matematika.");

    pinMessage.textContent =
      "PIN salah! Coba jawab tantangan 💗";

    startGame();
  }
});


/* =========================================
   7. NAVIGASI EMPAT FOTO KENANGAN
========================================= */

let currentMemory = 0;

function showMemories() {
  currentMemory = 0;
  renderMemory();
  showPage(memoriesPage);
}

function renderMemory() {
  const memory = memories[currentMemory];

  memoryPhoto.src = memory.photo;
  memoryPhoto.alt = memory.title;

  memoryNumber.textContent = currentMemory + 1;

  memoryLabel.textContent =
    "MEMORY NO. " +
    String(currentMemory + 1).padStart(2, "0");

  memoryTitle.textContent = memory.title;
  memoryCaption.textContent = memory.caption;

  memoryDots.forEach(function (dot, index) {
    dot.classList.toggle("active", index === currentMemory);
  });

  prevMemory.hidden = currentMemory === 0;

  nextMemory.hidden =
    currentMemory === memories.length - 1;

  specialSongPrompt.hidden =
    currentMemory !== memories.length - 1;
}

nextMemory.addEventListener("click", function () {
  if (currentMemory < memories.length - 1) {
    currentMemory++;
    renderMemory();
  }
});

prevMemory.addEventListener("click", function () {
  if (currentMemory > 0) {
    currentMemory--;
    renderMemory();
  }
});


/* =========================================
   8. TOMBOL MENUJU LAGU SPESIAL
========================================= */

goToMusic.addEventListener("click", function () {
  showPage(musicPage);
});


/* =========================================
   9. PEMUTAR MUSIK DAN PIRINGAN HITAM
========================================= */

playMusic.addEventListener("click", async function () {
  if (birthdayMusic.paused) {
    musicMessage.textContent = "Memuat lagu...";

    try {
      await birthdayMusic.play();

      vinyl.classList.add("playing");

      playMusic.textContent = "Ⅱ";
      playMusic.setAttribute("aria-label", "Jeda lagu");

      musicMessage.textContent =
        "Lagu spesial sedang diputar untukmu ♡";
    } catch (error) {
      console.error("Gagal memutar musik:", error);

      musicMessage.textContent =
        "Lagu belum dapat diputar. Periksa file assets/lagu.mp3.";
    }
  } else {
    birthdayMusic.pause();
  }
});

birthdayMusic.addEventListener("play", function () {
  vinyl.classList.add("playing");

  playMusic.textContent = "Ⅱ";
  playMusic.setAttribute("aria-label", "Jeda lagu");
});

birthdayMusic.addEventListener("pause", function () {
  vinyl.classList.remove("playing");

  playMusic.textContent = "▶";
  playMusic.setAttribute("aria-label", "Putar lagu");
});

birthdayMusic.addEventListener("error", function () {
  musicMessage.textContent =
    "File lagu tidak ditemukan atau formatnya tidak didukung.";
});


/* =========================================
   10. KEMBALI KE KENANGAN
========================================= */

backToMemories.addEventListener("click", function () {
  showPage(memoriesPage);
});

console.log("JavaScript berhasil terhubung! 💗");
