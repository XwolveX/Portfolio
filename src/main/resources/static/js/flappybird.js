const canvas = document.getElementById("birdCanvas");
const ctx = canvas.getContext("2d");

// ==========================================
// 1. CONFIG & ASSETS
// ==========================================

const CONFIG = {
    gravity: 1100,
    jump: -350,
    speed: 160,
    pipeGap: 150,
    pipeWidth: 60,
    birdScale: 3
};

const COLORS = {
    bg: "#70c5ce", ground: "#ded895", grass: "#73bf2e",
    pipe: { light: "#55e005", dark: "#0c9e00", border: "#004400" }
};

// --- A. PIXEL ART CHIM (Giống Flappy Bird gốc) ---
const BIRD_PIXELS = [
    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,1,0,0],
    [0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,3,3,1],
    [0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,3,3,1],
    [0,0,0,1,2,2,2,2,2,2,2,2,2,2,1,3,3,1],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,1,3,3,1],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,1,3,3,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,3,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,3,3,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,0],
    [0,1,1,2,2,2,2,2,2,2,2,1,4,4,4,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,4,4,4,4,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,4,4,4,1,0,0,0]
];

const PIXEL_COLORS = [
    null, "#000000", "#FFC300", "#FFFFFF", "#FF5733"
];

const BIRD_W = BIRD_PIXELS[0].length * CONFIG.birdScale;
const BIRD_H = BIRD_PIXELS.length * CONFIG.birdScale;

// --- B. AUDIO (Tối ưu để tránh delay) ---
// Pre-load và clone audio để phát nhanh không bị delay
const audioCache = {};

function initAudio() {
    const sounds = {
        wing: '/sounds/sfx_wing.wav',
        point: '/sounds/sfx_point.wav',
        hit: '/sounds/sfx_hit.wav',
        die: '/sounds/sfx_die.wav'
    };

    for (let key in sounds) {
        const audio = new Audio(sounds[key]);
        audio.preload = 'auto';
        audio.load();
        audioCache[key] = audio;
    }
}

// Phát âm thanh bằng cách clone để tránh delay khi spam click
function playSound(key) {
    if (!audioCache[key]) return;
    try {
        const clone = audioCache[key].cloneNode();
        clone.volume = 0.5; // Giảm âm lượng một chút
        clone.play().catch(err => console.log("Audio play error:", err));
    } catch (err) {
        // Fallback: dùng audio gốc
        audioCache[key].currentTime = 0;
        audioCache[key].play().catch(e => {});
    }
}

// ==========================================
// 2. GAME STATE
// ==========================================
let state = {
    bird: { x: 80, y: 300, vy: 0, rotation: 0 },
    pipes: [], score: 0, timer: 0,
    bestScore: localStorage.getItem("flappy_best") || 0,
    isPlaying: false, isGameOver: false, lastTime: 0
};

// ==========================================
// 3. DRAWING FUNCTIONS
// ==========================================

function drawBirdPixelArt(x, y, rot) {
    ctx.save();
    ctx.translate(x + BIRD_W/2, y + BIRD_H/2);
    ctx.rotate(rot);
    ctx.translate(-BIRD_W/2, -BIRD_H/2);

    const s = CONFIG.birdScale;
    for (let row = 0; row < BIRD_PIXELS.length; row++) {
        for (let col = 0; col < BIRD_PIXELS[row].length; col++) {
            let colorIndex = BIRD_PIXELS[row][col];
            if (colorIndex > 0) {
                ctx.fillStyle = PIXEL_COLORS[colorIndex];
                ctx.fillRect(col * s, row * s, s, s);
            }
        }
    }
    ctx.restore();
}

function drawMarioPipe(x, y, w, h, isTop) {
    ctx.save();
    let gradient = ctx.createLinearGradient(x, 0, x + w, 0);
    gradient.addColorStop(0, COLORS.pipe.dark);
    gradient.addColorStop(0.1, COLORS.pipe.light);
    gradient.addColorStop(0.8, COLORS.pipe.light);
    gradient.addColorStop(1, COLORS.pipe.dark);

    ctx.fillStyle = gradient;
    ctx.strokeStyle = COLORS.pipe.border;
    ctx.lineWidth = 2;

    const capH = 24, capW = 4;
    if (isTop) {
        ctx.fillRect(x, y, w, h - capH); ctx.strokeRect(x, y, w, h - capH);
        ctx.fillRect(x - capW, y + h - capH, w + capW*2, capH);
        ctx.strokeRect(x - capW, y + h - capH, w + capW*2, capH);
    } else {
        ctx.fillRect(x - capW, y, w + capW*2, capH);
        ctx.strokeRect(x - capW, y, w + capW*2, capH);
        ctx.fillRect(x, y + capH, w, h - capH);
        ctx.strokeRect(x, y + capH, w, h - capH);
    }
    ctx.restore();
}

// ==========================================
// 4. GAME LOGIC
// ==========================================

function update(dt) {
    // Vật lý chim
    state.bird.vy += CONFIG.gravity * dt;
    state.bird.y += state.bird.vy * dt;

    // Góc quay
    if (state.bird.vy < 0) state.bird.rotation = -25 * Math.PI / 180;
    else {
        state.bird.rotation += 2.5 * dt;
        if (state.bird.rotation > 1.5) state.bird.rotation = 1.5;
    }

    // Chạm đất/trần
    if (state.bird.y + BIRD_H >= canvas.height - 50) {
        state.bird.y = canvas.height - 50 - BIRD_H;
        playSound('hit');
        gameOver();
    }
    if (state.bird.y < 0) { state.bird.y = 0; state.bird.vy = 0; }

    // Tạo ống
    state.timer += dt;
    if (state.timer > 1.8) {
        state.timer = 0;
        const min = 50, max = canvas.height - 50 - CONFIG.pipeGap - min;
        state.pipes.push({ x: canvas.width, topHeight: Math.random() * (max - min) + min, passed: false });
    }

    // Di chuyển & Va chạm
    state.pipes.forEach(p => {
        p.x -= CONFIG.speed * dt;
        // Hitbox
        const bx = state.bird.x + 4, by = state.bird.y + 4;
        const bw = BIRD_W - 8, bh = BIRD_H - 8;

        // Kiểm tra va chạm ống
        if (bx + bw > p.x && bx < p.x + CONFIG.pipeWidth) {
            if (by < p.topHeight || by + bh > p.topHeight + CONFIG.pipeGap) {
                playSound('hit');
                setTimeout(() => playSound('die'), 100);
                gameOver();
            }
        }

        // Ghi điểm
        if (p.x + CONFIG.pipeWidth < state.bird.x && !p.passed) {
            state.score++;
            p.passed = true;
            playSound('point');
            updateScore();
        }
    });
    state.pipes = state.pipes.filter(p => p.x + CONFIG.pipeWidth > -50);
}

function draw() {
    // Nền & Đất
    ctx.fillStyle = COLORS.bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = COLORS.ground; ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    ctx.fillStyle = COLORS.grass; ctx.fillRect(0, canvas.height - 50, canvas.width, 12);

    // Ống
    state.pipes.forEach(p => {
        drawMarioPipe(p.x, 0, CONFIG.pipeWidth, p.topHeight, true);
        drawMarioPipe(p.x, p.topHeight + CONFIG.pipeGap, CONFIG.pipeWidth, canvas.height - (p.topHeight + CONFIG.pipeGap) - 50, false);
    });

    // Chim
    drawBirdPixelArt(state.bird.x, state.bird.y, state.bird.rotation);
}

// ==========================================
// 5. CONTROL & LOOP
// ==========================================
function loop(timestamp) {
    if (!state.isPlaying) return;
    let dt = (timestamp - state.lastTime) / 1000;
    state.lastTime = timestamp;
    update(dt); draw();
    if (!state.isGameOver) requestAnimationFrame(loop);
}

function action(e) {
    if(e) e.preventDefault();
    if (state.isGameOver) return;

    if (!state.isPlaying) {
        state.isPlaying = true; state.lastTime = performance.now();
        playSound('wing');
        requestAnimationFrame(loop); return;
    }

    state.bird.vy = CONFIG.jump;
    playSound('wing');
}

function gameOver() {
    state.isGameOver = true; state.isPlaying = false;
    document.getElementById("finalScore").innerText = state.score;
    document.getElementById("gameOverModal").style.display = "flex";
}

function updateScore() {
    document.getElementById("score").innerText = state.score;
    if (state.score > state.bestScore) {
        state.bestScore = state.score;
        localStorage.setItem("flappy_best", state.bestScore);
        document.getElementById("bestScore").innerText = state.bestScore;
    }
}

function resetGame() {
    state.bird = { x: 80, y: 300, vy: 0, rotation: 0 };
    state.pipes = []; state.score = 0; state.timer = 0;
    state.isGameOver = false; state.isPlaying = false;
    document.getElementById("score").innerText = 0;
    document.getElementById("gameOverModal").style.display = "none";
    draw();
    ctx.fillStyle = "white"; ctx.font = "bold 24px Arial";
    ctx.strokeStyle = "black"; ctx.lineWidth = 3;
    ctx.strokeText("PRESS SPACE TO START", 60, canvas.height/2 + 60);
    ctx.fillText("PRESS SPACE TO START", 60, canvas.height/2 + 60);
}

// Input & Init
initAudio(); // Khởi tạo audio trước
document.addEventListener("keydown", e => { if (e.code === "Space") action(e); });
canvas.addEventListener("mousedown", action);
document.getElementById("bestScore").innerText = state.bestScore;
resetGame();