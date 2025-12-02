const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextBlock');
const nextCtx = nextCanvas.getContext('2d');

const ROW = 20;
const COL = 12;
const SQ = 20;
const VACANT = "BLACK";

// ===== HỆ THỐNG ÂM THANH =====
let soundEnabled = true;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Hàm tạo âm thanh với Web Audio API
function playTone(frequency, duration, type = 'sine', volume = 0.1) {
    if (!soundEnabled) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Audio error:', e);
    }
}

// Âm thanh di chuyển trái/phải
function playMoveSound() {
    playTone(200, 0.05, 'square', 0.08);
}

// Âm thanh xoay khối
function playRotateSound() {
    playTone(300, 0.08, 'square', 0.1);
}

// Âm thanh khối chạm đáy
function playLockSound() {
    playTone(150, 0.12, 'triangle', 0.12);
}

// Âm thanh xóa dòng (tùy theo số dòng)
function playLineClearSound(linesCleared) {
    if (linesCleared === 1) {
        playTone(400, 0.15, 'sine', 0.15);
    } else if (linesCleared === 2) {
        playTone(500, 0.15, 'sine', 0.15);
        setTimeout(() => playTone(600, 0.15, 'sine', 0.15), 100);
    } else if (linesCleared === 3) {
        playTone(600, 0.15, 'sine', 0.15);
        setTimeout(() => playTone(700, 0.15, 'sine', 0.15), 100);
        setTimeout(() => playTone(800, 0.15, 'sine', 0.15), 200);
    } else if (linesCleared >= 4) {
        // TETRIS! - Âm thanh đặc biệt
        playTone(700, 0.2, 'sine', 0.2);
        setTimeout(() => playTone(800, 0.2, 'sine', 0.2), 100);
        setTimeout(() => playTone(900, 0.2, 'sine', 0.2), 200);
        setTimeout(() => playTone(1000, 0.3, 'sine', 0.2), 300);
    }
}

// Âm thanh game over
function playGameOverSound() {
    playTone(200, 0.25, 'sawtooth', 0.2);
    setTimeout(() => playTone(150, 0.25, 'sawtooth', 0.2), 250);
    setTimeout(() => playTone(100, 0.5, 'sawtooth', 0.2), 500);
}

// Toggle âm thanh
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundText = document.getElementById('soundText');
    const soundBtn = document.getElementById('soundBtn');
    if (soundEnabled) {
        soundText.textContent = 'Sound: ON';
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span id="soundText">Sound: ON</span>';
        playTone(440, 0.1); // Test sound
    } else {
        soundText.textContent = 'Sound: OFF';
        soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span id="soundText">Sound: OFF</span>';
    }
}

// ===== ĐỊNH NGHĨA CÁC KHỐI TETROMINO =====
const I = [[[1, 1, 1, 1]], [[1], [1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]]];
const J = [[[1, 0, 0], [1, 1, 1]], [[1, 1], [1, 0], [1, 0]], [[1, 1, 1], [0, 0, 1]], [[0, 1], [0, 1], [1, 1]]];
const L = [[[0, 0, 1], [1, 1, 1]], [[1, 0], [1, 0], [1, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1], [0, 1], [0, 1]]];
const O = [[[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]]];
const S = [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]];
const T = [[[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]]];
const Z = [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]];

// Mảng các hình dạng với màu sắc
const SHAPES = [
    [I, "#00FFFF"], // Cyan
    [J, "#0000FF"], // Blue
    [L, "#FFA500"], // Orange
    [O, "#FFFF00"], // Yellow
    [S, "#00FF00"], // Green
    [T, "#800080"], // Purple
    [Z, "#FF0000"]  // Red
];

// ===== BIẾN TOÀN CỤC =====
let board = [];
let score = 0;
let lines = 0;
let gameOver = false;
let isPaused = false;
let dropStart = Date.now();
let p; // Khối hiện tại
let nextP; // Khối tiếp theo

// Khởi tạo bảng game
function initBoard() {
    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = VACANT;
        }
    }
}

// Vẽ một ô vuông với hiệu ứng gradient
function drawSquare(x, y, color, ctxTarget = ctx) {
    if (color === VACANT) {
        ctxTarget.fillStyle = color;
        ctxTarget.fillRect(x * SQ, y * SQ, SQ, SQ);
    } else {
        // Tạo gradient cho mỗi khối
        const gradient = ctxTarget.createLinearGradient(
            x * SQ, y * SQ,
            x * SQ + SQ, y * SQ + SQ
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, shadeColor(color, -30));

        ctxTarget.fillStyle = gradient;
        ctxTarget.fillRect(x * SQ, y * SQ, SQ, SQ);

        // Thêm viền sáng
        ctxTarget.strokeStyle = shadeColor(color, 30);
        ctxTarget.lineWidth = 2;
        ctxTarget.strokeRect(x * SQ + 1, y * SQ + 1, SQ - 2, SQ - 2);
    }

    // Viền ngoài
    ctxTarget.strokeStyle = "#1a1a1a";
    ctxTarget.lineWidth = 1;
    ctxTarget.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Hàm tạo màu sáng/tối hơn
function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
           (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
           .toString(16).slice(1);
}

// Vẽ bảng game
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

// Class Piece - Khối Tetromino
class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.x = 4;
        this.y = -2;
    }

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(VACANT);
    }

    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            p = nextP;
            p.x = 4;
            p.y = -2;

            let r = Math.floor(Math.random() * SHAPES.length);
            nextP = new Piece(SHAPES[r][0], SHAPES[r][1]);
            drawNextPiece();
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
            playMoveSound();
        }
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
            playMoveSound();
        }
    }

    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) kick = -1;
            else kick = 1;
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
            playRotateSound();
        }
    }

    collision(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (!piece[r][c]) continue;
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                if (newX < 0 || newX >= COL || newY >= ROW) return true;
                if (newY < 0) continue;
                if (board[newY][newX] != VACANT) return true;
            }
        }
        return false;
    }

    lock() {
        playLockSound();

        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if (!this.activeTetromino[r][c]) continue;
                if (this.y + r < 0) {
                    gameOver = true;
                    playGameOverSound();
                    document.getElementById('finalScore').innerText = score;
                    document.getElementById('gameOverModal').style.display = 'flex';
                    return;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }

        // Xóa các dòng đầy và đếm số dòng
        let linesCleared = 0;
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COL; c++) {
                if (board[r][c] == VACANT) isRowFull = false;
            }
            if (isRowFull) {
                linesCleared++;
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                for (let c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }
                score += 10;
                lines++;
            }
        }

        // Phát âm thanh xóa dòng nếu có
        if (linesCleared > 0) {
            playLineClearSound(linesCleared);
        }

        drawBoard();
        document.getElementById('score').innerText = score;
        document.getElementById('lines').innerText = lines;
    }
}

// Vẽ khối tiếp theo
function drawNextPiece() {
    nextCtx.clearRect(0, 0, 80, 80);

    if(!nextP) return;

    let previewPiece = nextP.activeTetromino;

    let pieceWidth = previewPiece[0].length * 15;
    let pieceHeight = previewPiece.length * 15;
    let offsetX = (80 - pieceWidth) / 2;
    let offsetY = (80 - pieceHeight) / 2;

    for (let r = 0; r < previewPiece.length; r++) {
        for (let c = 0; c < previewPiece[r].length; c++) {
            if (previewPiece[r][c]) {
                // Vẽ với gradient
                const gradient = nextCtx.createLinearGradient(
                    offsetX + c * 15, offsetY + r * 15,
                    offsetX + c * 15 + 15, offsetY + r * 15 + 15
                );
                gradient.addColorStop(0, nextP.color);
                gradient.addColorStop(1, shadeColor(nextP.color, -30));

                nextCtx.fillStyle = gradient;
                nextCtx.fillRect(offsetX + c * 15, offsetY + r * 15, 15, 15);

                // Viền
                nextCtx.strokeStyle = shadeColor(nextP.color, 30);
                nextCtx.lineWidth = 1.5;
                nextCtx.strokeRect(offsetX + c * 15 + 1, offsetY + r * 15 + 1, 13, 13);
            }
        }
    }
}

// Xử lý phím
document.addEventListener("keydown", function(event){
    const gameKeys = [37, 38, 39, 40, 32];

    if (gameKeys.includes(event.keyCode)) {
        event.preventDefault();
    }

    if(gameOver || isPaused) return;

    if(event.keyCode == 37) p.moveLeft();
    else if(event.keyCode == 38) p.rotate();
    else if(event.keyCode == 39) p.moveRight();
    else if(event.keyCode == 40) p.moveDown();
});

// Vòng lặp game - khối tự động rơi
function drop() {
    if(gameOver || isPaused) return;
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}

// Bắt đầu game mới
function startGame() {
    initBoard();
    drawBoard();
    score = 0;
    lines = 0;
    gameOver = false;
    isPaused = false;
    document.getElementById('score').innerText = 0;
    document.getElementById('lines').innerText = 0;
    document.getElementById('gameOverModal').style.display = 'none';

    // Tạo khối đầu tiên
    let r = Math.floor(Math.random() * SHAPES.length);
    p = new Piece(SHAPES[r][0], SHAPES[r][1]);

    // Tạo khối tiếp theo
    let rn = Math.floor(Math.random() * SHAPES.length);
    nextP = new Piece(SHAPES[rn][0], SHAPES[rn][1]);

    drawNextPiece();
    dropStart = Date.now();
    drop();
}

// Reset game
function resetGame() {
    startGame();
}

// Tạm dừng/Tiếp tục
function togglePause() {
    isPaused = !isPaused;
    const pauseText = document.getElementById('pauseText');
    if(isPaused) {
        pauseText.textContent = 'Resume';
    } else {
        pauseText.textContent = 'Pause';
        drop();
    }
}

// Auto start game khi load trang
startGame();