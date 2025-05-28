// ==================== Data Buah ====================
const fruits = [
    { name: "Apel", image: "assets/apel.jpg", color: "Merah", shape: "assets/siluet_apel.jpg", fact: "Apel ada banyak jenisnya dan warnanya!" },
    { name: "Jeruk", image: "assets/jeruk.jpg", color: "Orange", shape: "assets/siluet_jeruk.jpg", fact: "Jeruk kaya vitamin C, bikin badan kuat!" },
    { name: "Mangga", image: "assets/mangga.jpg", color: "Kuning", shape: "assets/siluet_mangga.jpg", fact: "Mangga manis sekali, bisa dibuat jus juga!" },
    { name: "Alpukat", image: "assets/alpukat.jpg", color: "Hijau", shape: "assets/siluet_alpukat.jpg", fact: "Alpukat itu buah, tapi rasanya tidak terlalu manis!" },
    { name: "Anggur", image: "assets/anggur.jpg", color: "Ungu", shape: "assets/siluet_anggur.jpg", fact: "Anggur tumbuhnya bergerombol seperti kalung!" },
    { name: "Jambu", image: "assets/jambu.jpg", color: "Hijau", shape: "assets/siluet_jambu.jpg", fact: "Jambu biji bagus untuk perut kita!" },
    { name: "Semangka", image: "assets/semangka.jpg", color: "Merah", shape: "assets/siluet_semangka.jpg", fact: "Semangka isinya banyak air, segar sekali!" },
    { name: "Kiwi", image: "assets/kiwi.jpg", color: "Hijau", shape: "assets/siluet_kiwi.jpg", fact: "Kulit kiwi berbulu, tapi dalamnya hijau cerah!" },
    { name: "Cherry", image: "assets/cherry.jpg", color: "Merah", shape: "assets/siluet_cherry.jpg", fact: "Cherry itu buah kecil, manis, dan berwarna merah!" },
    { name: "Melon", image: "assets/melon.jpg", color: "Hijau", shape: "assets/siluet_melon.jpg", fact: "Kulit melon biasanya kasar, tapi dalamnya lembut!" },
    { name: "Nanas", image: "assets/nanas.jpg", color: "Kuning", shape: "assets/siluet_nanas.jpg", fact: "Nanas punya 'mata' di kulitnya dan daun mahkota!" },
    { name: "Pepaya", image: "assets/pepaya.jpg", color: "Orange", shape: "assets/siluet_pepaya.jpg", fact: "Biji pepaya ada di tengah, banyak sekali!" },
    { name: "Pisang", image: "assets/pisang.jpg", color: "Kuning", shape: "assets/siluet_pisang.jpg", fact: "Pisang tumbuh menggantung, sering jadi bekal sehat!" },
    { name: "Sawo", image: "assets/sawo.jpg", color: "Coklat", shape: "assets/siluet_sawo.jpg", fact: "Sawo itu manis seperti karamel!" },
    { name: "Strawberi", image: "assets/strawberri.jpg", color: "Merah", shape: "assets/siluet_strawberri.jpg", fact: "Biji strawberi ada di luar buahnya!" }
];

// ==================== Elemen Audio ====================
const correctSound = new Audio("assets/musik/correct.mp3");
const wrongSound = new Audio("assets/musik/wrong.mp3");
const backgroundMusic = document.getElementById("backgroundMusic");
const buttonClickSound = document.getElementById("buttonClickSound");
const levelCompleteSound = document.getElementById("levelCompleteSound");

// ==================== Variabel Game State ====================
let correctFruit = null;
let gameMode = "name";
let score = 0;
let questionCount = 0;
const maxQuestionsPerLevel = 5;
let isSoundOn = true;

// ====== Variabel Level ======
let currentLevel = 1;
const totalLevels = 5;

// ==================== Navigasi Antar Layar ====================

function showGameMenu() {
    playButtonClickSound();
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('modeSelector').style.display = 'block';
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('scoreSection').classList.add('hidden');
    const gameTitleElement = document.getElementById('gameTitle');
    if(gameTitleElement) gameTitleElement.textContent = 'Pilih Mode';

    currentLevel = 1;
    updateProgressBar(0);

    playBackgroundMusic();
}

function startGame() {
    document.getElementById("modeSelector").style.display = "none";
    document.getElementById("gameArea").classList.remove("hidden");
     const gameTitleElement = document.getElementById('gameTitle');
    if(gameTitleElement) gameTitleElement.textContent = 'FRUIT POP!';

    score = 0;
    questionCount = 0;

    updateProgressBar(0);
    updateLevelDisplay();

    loadRandomFruit();

    playBackgroundMusic();
}

function nextLevel() {
    playButtonClickSound();
    currentLevel++;
    document.getElementById('scoreSection').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');

    startGame();
}

function backToModes() {
    playButtonClickSound();
    currentLevel = 1;
    score = 0;
    questionCount = 0;

    document.getElementById('scoreSection').classList.add('hidden');
    document.getElementById('modeSelector').style.display = 'block';
    document.getElementById('gameArea').classList.add('hidden');
     const gameTitleElement = document.getElementById('gameTitle');
    if(gameTitleElement) gameTitleElement.textContent = 'Pilih Mode';


    updateProgressBar(0);

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function exitGame() {
    playButtonClickSound();
    currentLevel = 1;
    score = 0;
    questionCount = 0;

    document.getElementById('scoreSection').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('homeScreen').classList.remove('hidden');

    updateProgressBar(0);

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Menampilkan Layar Akhir Level atau Game Selesai
function displayEndOfLevelScreen() {
    const gameAreaElement = document.getElementById('gameArea');
     if(gameAreaElement) gameAreaElement.classList.add('fade-out');


    if (isSoundOn && levelCompleteSound) {
        levelCompleteSound.currentTime = 0;
        levelCompleteSound.play().catch(e => console.log("Level complete sound blocked:", e));
    }

    setTimeout(() => {
         if(gameAreaElement) {
            gameAreaElement.classList.add('hidden');
            gameAreaElement.classList.remove('fade-out');
         }


        const scoreSectionElement = document.getElementById('scoreSection');
         if(scoreSectionElement) scoreSectionElement.classList.remove('hidden');


        const endLevelMessageElement = document.getElementById('endLevelMessage');
        const levelResultTextElement = document.getElementById('levelResultText');
        const finalScoreTextStarsElement = document.getElementById('finalScoreTextStars');
        const endMessageElement = document.getElementById('endMessage');
        const backToModesBtn = document.getElementById('backToModesBtn');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const exitBtn = document.getElementById('exitBtn');
        // const prizeImageElement = document.getElementById('prizeImage'); // Dihapus


        // Pastikan pesan motivasi awalnya tidak terlihat sebelum animasi bintang
         if (endMessageElement) {
            endMessageElement.style.opacity = '0';
            endMessageElement.textContent = ''; // Kosongkan teks lama
         }

        // if (prizeImageElement) { prizeImageElement.classList.add('hidden'); } // Dihapus


        const effectiveScore = Math.min(score, maxQuestionsPerLevel);
        if(finalScoreTextStarsElement) finalScoreTextStarsElement.textContent = '';


        let starCount = 0;
        const starInterval = setInterval(() => {
            if (starCount < effectiveScore) {
                if(finalScoreTextStarsElement) finalScoreTextStarsElement.textContent += '⭐';
                starCount++;
                 // Optional: play a small sparkle sound here if you have one
            } else {
                clearInterval(starInterval);

                // === Atur Pesan Motivasi SETELAH bintang muncul ===
                 if (endMessageElement) {
                    if (score === maxQuestionsPerLevel) {
                        endMessageElement.textContent = 'Yey, kamu hebat sekali di level ini!';
                        endMessageElement.style.color = 'green';
                    } else if (score >= Math.ceil(maxQuestionsPerLevel / 2)) {
                         endMessageElement.textContent = 'Bagus, terus coba dan jadi lebih hebat!';
                         endMessageElement.style.color = 'blue';
                    }
                    else {
                        endMessageElement.textContent = 'Tetap semangat ya, kamu pasti bisa!';
                        endMessageElement.style.color = 'orange';
                    }
                    endMessageElement.style.opacity = '1'; // Set opacity ke 1 untuk memicu transisi CSS
                 }
                 // === End Atur Pesan Motivasi ===

                // Logika tampilkan hadiah dihapus
                // if (currentLevel === totalLevels && score === maxQuestionsPerLevel) {
                //      if (prizeImageElement) {
                //          prizeImageElement.classList.remove('hidden');
                //      }
                // }
            }
        }, 200);

        if(finalScoreTextStarsElement) {
            finalScoreTextStarsElement.style.color = 'gold';
            finalScoreTextStarsElement.style.fontSize = '2.5rem';
        }


        if (currentLevel < totalLevels) {
            if(endLevelMessageElement) endLevelMessageElement.textContent = 'Level Selesai!';
            if(levelResultTextElement) levelResultTextElement.textContent = `Hasil Level ${currentLevel}:`;
            if(nextLevelBtn) nextLevelBtn.classList.remove('hidden');
            if(endMessageElement) endMessageElement.style.minHeight = '2.2rem';
        } else {
            if(endLevelMessageElement) endLevelMessageElement.textContent = '🏆 Selamat! Permainan Selesai! 🏆';
            if(levelResultTextElement) levelResultTextElement.textContent = `Skor Akhir ${gameMode === 'name' ? 'Tebak Nama' : gameMode === 'color' ? 'Tebak Warna' : 'Tebak Bentuk'}:`;
            if(nextLevelBtn) nextLevelBtn.classList.add('hidden');
             if(endMessageElement) endMessageElement.style.minHeight = 'auto';
        }


        if(backToModesBtn) backToModesBtn.classList.remove('hidden');
        if(exitBtn) exitBtn.classList.remove('hidden');

        if (isSoundOn) {
            playBackgroundMusic();
        }

    }, 700);
}

function updateLevelDisplay() {
     const levelDisplayElement = document.getElementById('currentLevelDisplay');
     if (levelDisplayElement) {
         levelDisplayElement.textContent = `Level ${currentLevel} / ${totalLevels}`;
     }
}

function updateProgressBar(completedCount) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const percentage = (completedCount / maxQuestionsPerLevel) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}


// ==================== Logika Game Utama ====================

function setGameMode(mode) {
    gameMode = mode;
    currentLevel = 1;
    startGame();
}

function setModeStyle(mode) {
    const title = document.getElementById("questionTitle");
    if(title) {
        title.classList.remove('nameMode', 'colorMode', 'dragMode');
        title.classList.add(mode);
    }
}


function loadRandomFruit() {
    // Clear feedback texts immediately when loading new question
    const feedbackElement = document.getElementById("feedback");
    const feedbackShapeElement = document.getElementById("feedbackShape");
    if(feedbackElement) {
        feedbackElement.textContent = "";
        // Hapus juga opacity style yang mungkin diset langsung
        feedbackElement.style.opacity = '0';
    }
    if(feedbackShapeElement) {
        feedbackShapeElement.textContent = "";
        // Hapus juga opacity style yang mungkin diset langsung
        feedbackShapeElement.style.opacity = '0';
    }


    // Hapus semua kelas feedback/animasi dari elemen soal sebelumnya
    document.querySelectorAll('.option, .shapeOption, #fruitImage, #shapeSiluet, #questionTitle, #currentLevelDisplay').forEach(el => {
        el.classList.remove('correct-border', 'wrong-border', 'shake', 'animate-in');
    });
    const siluetContainer = document.getElementById("siluetContainer");
    if(siluetContainer) siluetContainer.classList.remove('drag-over');

    if (questionCount >= maxQuestionsPerLevel) {
        displayEndOfLevelScreen();
        return;
    }

    questionCount++;
    updateProgressBar(questionCount - 1);

    correctFruit = fruits[Math.floor(Math.random() * fruits.length)];

    const gameAreaElement = document.getElementById("gameArea");
    if(gameAreaElement) gameAreaElement.classList.add("fade-out");

    const questionTitleElement = document.getElementById("questionTitle");
    if(questionTitleElement) questionTitleElement.textContent = "";

    updateLevelDisplay();


    setTimeout(() => { // Tunggu fade-out area game selesai (0.5s)
        if(gameAreaElement) gameAreaElement.classList.remove("fade-out");

        // Tampilkan game sesuai mode yang dipilih dan load kontennya
        if (["name", "color"].includes(gameMode)) {
            // Pastikan hanya game mode yang relevan terlihat
            const nameOrColorGameElement = document.getElementById("nameOrColorGame");
            const shapeGameElement = document.getElementById("shapeGame");
            if(nameOrColorGameElement) nameOrColorGameElement.classList.remove("hidden");
            if(shapeGameElement) shapeGameElement.classList.add("hidden");

            displayNameOrColorGame(); // Load konten mode nama/warna
             // Apply entrance animation to elements after they are loaded/displayed
             setTimeout(() => { // Small delay (e.g., 10ms) to ensure elements are ready
                 document.querySelectorAll("#nameOrColorGame .animate-target, #questionTitle, #currentLevelDisplay").forEach(el => {
                     el.classList.add("animate-in");
                 });
                  // Specific delay for options buttons for staggered animation
                 document.querySelectorAll(".options .option").forEach((opt, index) => {
                    setTimeout(() => { opt.classList.add("animate-in"); }, index * 50);
                 });
             }, 10);


        } else if (gameMode === "shape") {
            // Pastikan hanya game mode yang relevan terlihat
             const nameOrColorGameElement = document.getElementById("nameOrColorGame");
             const shapeGameElement = document.getElementById("shapeGame");
             if(nameOrColorGameElement) nameOrColorGameElement.classList.add("hidden");
             if(shapeGameElement) shapeGameElement.classList.remove("hidden"); // Show shape game area

            displayShapeGame(); // Load konten mode bentuk
             // Apply entrance animation to elements after they are loaded/displayed
             setTimeout(() => { // Small delay (e.g., 10ms) to ensure elements are ready
                 document.querySelectorAll("#shapeGame .animate-target, #questionTitle, #currentLevelDisplay").forEach(el => {
                     el.classList.add("animate-in");
                 });
                  // Specific delay for shape choices images for staggered animation
                 document.querySelectorAll(".shapeChoicesContainer .shapeOption").forEach((opt, index) => {
                    setTimeout(() => { opt.classList.add("animate-in"); }, index * 50);
                 });
             }, 10);
        }
         // Setel gaya mode lagi (memastikan warna judul sesuai)
         if (gameMode === 'shape') setModeStyle('dragMode');
         else setModeStyle(gameMode + 'Mode');


    }, 500); // Duration of fade out (0.5s)
}

function displayNameOrColorGame() {
    const questionTitleElement = document.getElementById("questionTitle");
     if(questionTitleElement) {
        questionTitleElement.textContent = gameMode === "name" ? `Soal ${questionCount}: Tebak Nama Buah:` : `Soal ${questionCount}: Tebak Warna Buah:`;
     }

    const fruitImg = document.getElementById("fruitImage");
    if(fruitImg) {
        fruitImg.src = correctFruit.image;
        fruitImg.alt = correctFruit.name;
        fruitImg.classList.remove('animate-in'); // Remove animate-in class before applying it again in loadRandomFruit
    }

    const correctAnswer = gameMode === "name" ? correctFruit.name : capitalize(correctFruit.color);
    shuffleOptions(correctAnswer, gameMode); // This populates the options buttons
}

function displayShapeGame() {
    const questionTitleElement = document.getElementById("questionTitle");
    if(questionTitleElement) {
         questionTitleElement.textContent = `Soal ${questionCount}: Tebak Bentuk Buah:` ;
    }
    loadShapeGame(); // This populates the shape elements
}

function shuffleOptions(correctAnswer, type) {
    const optionsContainer = document.querySelector(".options");
    if(!optionsContainer) return;

    const numberOfOptions = 3;
    let choices = type === "name" ? fruits.map(f => f.name) : fruits.map(f => capitalize(f.color));
    choices = [...new Set(choices)];

    let wrongChoices = choices.filter(c => c.toLowerCase() !== correctAnswer.toLowerCase())
        .sort(() => 0.5 - Math.random()).slice(0, numberOfOptions - 1);

    let shuffled = [correctAnswer, ...wrongChoices];
    shuffled = shuffled.sort(() => 0.5 - Math.random());

     optionsContainer.innerHTML = ''; // Clear previous buttons

    shuffled.forEach((choiceText, index) => {
        const button = document.createElement('button');
        button.classList.add('option', 'animate-target'); // Add animate-target class
        button.textContent = choiceText;
        button.addEventListener('click', () => checkAnswer(button, choiceText, correctAnswer));
        button.disabled = false;
        button.classList.remove('correct-border', 'wrong-border', 'shake', 'animate-in'); // Ensure no animation/feedback classes initially
        optionsContainer.appendChild(button);
    });
}

// Modified checkAnswer function to manage feedback visibility correctly
function checkAnswer(clickedButton, selected, correct) {
    // Nonaktifkan semua tombol sementara untuk mencegah klik ganda
    document.querySelectorAll('.option').forEach(button => button.disabled = true);

    const feedback = document.getElementById("feedback");
    if(!feedback) return;

    const isCorrect = selected.toLowerCase() === correct.toLowerCase();

    // Tampilkan feedback visual pada tombol
    if (clickedButton) {
         clickedButton.classList.add(isCorrect ? 'correct-border' : 'wrong-border');
         if (!isCorrect) clickedButton.classList.add('shake');
    }

     // Cari data buah untuk feedback teks
     const correctFruitData = fruits.find(f => {
         if (gameMode === 'name') return f.name.toLowerCase() === correct.toLowerCase();
         if (gameMode === 'color') return f.color.toLowerCase() === correct.toLowerCase();
         return false; // Shape mode is handled in drop()
     });

    // Tampilkan feedback teks SEGERA
    if(correctFruitData) {
        showFeedback(feedback, isCorrect, correctFruitData);
    } else {
         feedback.textContent = isCorrect ? "✅ Benar!" : `❌ Salah! Coba lagi!`;
         feedback.style.color = isCorrect ? "green" : "red";
    }
    // Set opacity ke 1 agar feedback terlihat (memicu transisi jika ada)
    feedback.style.opacity = '1';


    if (isSoundOn) {
         isCorrect ? correctSound.play() : wrongSound.play();
    }

    if (isCorrect) {
        score++;
        if (clickedButton) {
             const rect = clickedButton.getBoundingClientRect();
             const x = rect.left + rect.width / 2;
             const y = rect.top + rect.height / 2;
             spawnParticles(x, y, 20);
        }
    }

    // Timing untuk menyembunyikan feedback dan memuat soal berikutnya
    const feedbackDisplayDuration = 1500; // Feedback terlihat selama 1.5 detik
    const delayBeforeNextQuestion = 500; // Jeda sebelum mulai transisi soal berikutnya

    setTimeout(() => {
        // Sembunyikan feedback setelah durasi
        feedback.style.opacity = '0'; // Set opacity ke 0 untuk menyembunyikan

        // Hapus kelas visual dari tombol
        if (clickedButton) {
             clickedButton.classList.remove('shake', 'correct-border', 'wrong-border');
        }
        document.querySelectorAll('.option').forEach(button => {
            button.classList.remove('shake', 'correct-border', 'wrong-border');
        });


        // Tunggu sebentar lagi sebelum memuat soal berikutnya (untuk memberi jeda visual)
        setTimeout(() => {
            // Hapus teks feedback setelah elemen disembunyikan sepenuhnya
             feedback.textContent = "";
            loadRandomFruit(); // Memuat soal berikutnya (or call displayEndOfLevelScreen)
        }, delayBeforeNextQuestion);

    }, feedbackDisplayDuration); // Wait 1.5 seconds before starting to hide feedback
}


// Modified showFeedback (removed fun fact)
function showFeedback(element, isCorrect, fruitData) {
    if (!element) return;

    if (isCorrect) {
        element.textContent = `✅ Benar!`; // HANYA tampilkan "✅ Benar!"
        element.style.color = "green";
    } else {
        element.textContent = `❌ Salah! Coba lagi!`; // Tetap tampilkan "❌ Salah! Coba lagi!"
        element.style.color = "red";
    }
    // Visibility is controlled by setting element.style.opacity in checkAnswer/drop
}


function loadShapeGame() {
    const shapeImg = document.getElementById("shapeSiluet");
     if(shapeImg) {
        shapeImg.src = correctFruit.shape;
        shapeImg.setAttribute("data-correct", correctFruit.name);
        shapeImg.classList.remove('animate-in'); // Remove animate-in class before applying it again in loadRandomFruit
     }

    const shapeChoices = document.getElementById("shapeChoices");
    if(!shapeChoices) {
        console.error("Error: #shapeChoices element not found!");
        return;
    }

    shapeChoices.innerHTML = ""; // Clear previous choices

    const wrongFruits = fruits.filter(f => f.name !== correctFruit.name)
        .sort(() => 0.5 - Math.random()).slice(0, 2);
    const choices = [...wrongFruits, correctFruit].sort(() => 0.5 - Math.random());

    choices.forEach(fruit => {
        const img = document.createElement("img");
        img.src = fruit.image;
        img.classList.add("shapeOption", "animate-target"); // Add animate-target class
        img.setAttribute("draggable", "true");
        img.setAttribute("id", fruit.name);
        img.addEventListener("dragstart", drag);
        img.classList.remove('correct-border', 'wrong-border', 'shake', 'animate-in'); // Ensure no animation/feedback classes initially
        shapeChoices.appendChild(img);
    });
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

const siluetContainer = document.getElementById("siluetContainer");
if(siluetContainer) {
    siluetContainer.addEventListener("dragover", function(event) {
        event.preventDefault();
        this.classList.add("drag-over");
    });

    siluetContainer.addEventListener("dragleave", function() {
        this.classList.remove("drag-over");
    });

    siluetContainer.addEventListener("drop", drop);
}

// Modified drop function to manage feedback visibility correctly
function drop(ev) {
    ev.preventDefault();

    const siluetContainer = document.getElementById("siluetContainer");
    const shapeOptions = document.querySelectorAll('.shapeOption');
    const feedback = document.getElementById("feedbackShape");

    if(!siluetContainer || !feedback || shapeOptions.length === 0) {
         console.error("Missing game elements for shape drop.");
         return;
    }

    siluetContainer.style.pointerEvents = 'none';
    siluetContainer.classList.remove('drag-over');

    shapeOptions.forEach(img => {
        img.style.pointerEvents = 'none';
        img.classList.remove('correct-border', 'wrong-border', 'shake');
    });

    const draggedId = ev.dataTransfer.getData("text");
    const dropTarget = ev.target.closest('#siluetContainer, #shapeSiluet');
    const correctId = dropTarget ? dropTarget.getAttribute("data-correct") : null;

    const isCorrect = draggedId !== null && draggedId === correctId;

    const draggedImg = document.getElementById(draggedId);
    if (draggedImg) {
         draggedImg.classList.add(isCorrect ? 'correct-border' : 'wrong-border');
         if (!isCorrect) draggedImg.classList.add('shake');
    }

    const correctFruitData = fruits.find(f => f.name === correctId);
    if (correctFruitData) {
        showFeedback(feedback, isCorrect, correctFruitData);
    } else {
         feedback.textContent = isCorrect ? "✅ Benar!" : `❌ Salah! Coba lagi!`;
         feedback.style.color = isCorrect ? "green" : "red";
    }
    // Set opacity ke 1 agar feedback terlihat (memicu transisi jika ada)
    feedback.style.opacity = '1';


    if (isSoundOn) {
        isCorrect ? correctSound.play() : wrongSound.play();
    }

    if (isCorrect) {
        score++;
        if (draggedImg) {
             const rect = draggedImg.getBoundingClientRect();
             const x = rect.left + rect.width / 2;
             const y = rect.top + rect.height / 2;
             spawnParticles(x, y, 20);
         } else if (siluetContainer) {
             const rect = siluetContainer.getBoundingClientRect();
             const x = rect.left + rect.width / 2;
             const y = rect.top + rect.height / 2;
             spawnParticles(x, y, 20);
         }
    }

     // Timing untuk menyembunyikan feedback dan memuat soal berikutnya
    const feedbackDisplayDuration = 1500; // Feedback terlihat selama 1.5 detik
    const delayBeforeNextQuestion = 500; // Jeda sebelum mulai transisi soal berikutnya

    setTimeout(() => {
        // Sembunyikan feedback setelah durasi
        feedback.style.opacity = '0'; // Set opacity ke 0 untuk menyembunyikan

         // Hapus kelas visual dari gambar
        if (draggedImg) {
             draggedImg.classList.remove('shake', 'correct-border', 'wrong-border');
        }
        shapeOptions.forEach(img => {
            img.classList.remove('shake', 'correct-border', 'wrong-border');
        });


        siluetContainer.style.pointerEvents = 'auto';
        shapeOptions.forEach(img => {
            img.style.pointerEvents = 'auto';
        });


        // Tunggu sebentar lagi sebelum memuat soal berikutnya
        setTimeout(() => {
             // Hapus teks feedback setelah elemen disembunyikan sepenuhnya
             feedback.textContent = "";
            loadRandomFruit();
        }, delayBeforeNextQuestion);

    }, feedbackDisplayDuration); // Tunggu 1.5 detik sebelum menyembunyikan feedback
}

function allowDrop(ev) {
    ev.preventDefault();
}

function spawnParticles(x, y, count) {
    const particleContainer = document.getElementById('particleContainer');
    if(!particleContainer) return;

    const containerRect = particleContainer.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        particle.style.left = `${x - containerRect.left}px`;
        particle.style.top = `${y - containerRect.top}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 70;

        const deltaX = distance * Math.cos(angle);
        const deltaY = distance * Math.sin(angle);

        particle.style.setProperty('--particle-x', `${deltaX}px`);
        particle.style.setProperty('--particle-y', `${deltaY}px`);

        const size = 8 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const colors = [varToHex('--primary'), varToHex('--secondary'), varToHex('--accent'), '#FF9800', '#9C27B0'];
         const randomColor = colors[Math.floor(Math.random() * colors.length)];
         particle.style.backgroundColor = randomColor;


        particleContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function varToHex(variable) {
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue(variable).trim();
    if (color.startsWith('#') || color.startsWith('rgb')) return color;
    return color;
}


// ==================== Fungsi Utilitas ====================

function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// ==================== Suara ====================

function toggleSound() {
    const soundButton = document.getElementById('sound-toggle');
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
        backgroundMusic.muted = false;
        correctSound.muted = false;
        wrongSound.muted = false;
        if(buttonClickSound) buttonClickSound.muted = false;
        if(levelCompleteSound) levelCompleteSound.muted = false;

        if (document.getElementById('homeScreen').classList.contains('hidden')) {
             playBackgroundMusic();
        }

        soundButton.src = "assets/gambar/sound_on.png";
    } else {
        backgroundMusic.pause();
        backgroundMusic.muted = true;
        correctSound.muted = true;
        wrongSound.muted = true;
        if(buttonClickSound) buttonClickSound.muted = true;
        if(levelCompleteSound) levelCompleteSound.muted = true;

        soundButton.src = "assets/gambar/sound_off.png";
    }
     console.log("Sound toggled, isSoundOn:", isSoundOn);
}

function playBackgroundMusic() {
    if (isSoundOn && backgroundMusic.paused) {
        backgroundMusic.volume = 0.3;
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(err => {
            console.log("Background music autoplay failed:", err);
        });
    } else if (!isSoundOn) {
         backgroundMusic.muted = true;
         backgroundMusic.pause();
    }
}

function playButtonClickSound() {
    if (isSoundOn && buttonClickSound) {
        buttonClickSound.currentTime = 0;
        buttonClickSound.play().catch(e => console.log("Button click sound blocked:", e));
    }
}


// ==================== Event Listeners & Inisialisasi ====================

document.addEventListener('DOMContentLoaded', (event) => {
    const startHomeButton = document.getElementById('startHomeButton');
    if (startHomeButton) {
        startHomeButton.addEventListener('click', showGameMenu);
    }

    const soundToggle = document.getElementById("sound-toggle");
    if (soundToggle) {
        soundToggle.addEventListener("click", toggleSound);

        soundToggle.src = isSoundOn ? "assets/gambar/sound_on.png" : "assets/gambar/sound_off.png";

        backgroundMusic.muted = !isSoundOn;
        correctSound.muted = !isSoundOn;
        wrongSound.muted = !isSoundOn;
        if(buttonClickSound) buttonClickSound.muted = !isSoundOn;
        if(levelCompleteSound) levelCompleteSound.muted = !isSoundOn;

        backgroundMusic.volume = 0.3;

         if (isSoundOn) {
             backgroundMusic.play().catch(e => console.log("Initial autoplay blocked:", e));
         }
    }

    const backToModesButton = document.getElementById('backToModesBtn');
    if (backToModesButton) {
        backToModesButton.addEventListener('click', backToModes);
    }

    const nextLevelButton = document.getElementById('nextLevelBtn');
    if (nextLevelButton) {
        nextLevelButton.addEventListener('click', nextLevel);
    }

    const exitButton = document.getElementById('exitBtn');
    if (exitButton) {
        exitButton.addEventListener('click', exitGame);
    }

    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('scoreSection').classList.add('hidden');
    document.getElementById('gameArea').classList.add('hidden');
     const modeSelector = document.getElementById('modeSelector');
     if(modeSelector) modeSelector.style.display = 'none';


    let userInteracted = false;
    function handleFirstInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            console.log("First user interaction detected. Attempting to play sound.");
            if(isSoundOn) {
               playBackgroundMusic();
            }
        }
    }

    document.body.addEventListener('click', handleFirstInteraction, { once: true });
    document.body.addEventListener('touchstart', handleFirstInteraction, { once: true });

});