const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextBlock');
const nextCtx = nextCanvas.getContext('2d');

const ROW = 20;
const COL = 12;
const SQ = 20;
const VACANT = "BLACK"; // Màu ô trống

// --- 1. ĐỊNH NGHĨA HÌNH DÁNG KHỐI TRƯỚC (Đưa lên đầu) ---
const I = [[[1, 1, 1, 1]], [[1], [1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]]];
const J = [[[1, 0, 0], [1, 1, 1]], [[1, 1], [1, 0], [1, 0]], [[1, 1, 1], [0, 0, 1]], [[0, 1], [0, 1], [1, 1]]];
const L = [[[0, 0, 1], [1, 1, 1]], [[1, 0], [1, 0], [1, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1], [0, 1], [0, 1]]];
const O = [[[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]]];
const S = [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]];
const T = [[[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]]];
const Z = [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]];

// --- 2. GỘP THÀNH MẢNG SHAPES ---
// Format: [ShapeVar, ColorHex]
const SHAPES = [
    [I, "#00FFFF"],
    [J, "#0000FF"],
    [L, "#FFA500"],
    [O, "#FFFF00"],
    [S, "#008000"],
    [T, "#800080"],
    [Z, "#FF0000"]
];

// --- 3. CÁC BIẾN GLOBAL KHÁC ---
let board = [];
let score = 0;
let lines = 0;
let gameOver = false;
let isPaused = false;
let dropStart = Date.now();
let p; // Khối hiện tại
let nextP; // Khối tiếp theo

// Init Board
function initBoard() {
    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = VACANT;
        }
    }
}

function drawSquare(x, y, color, ctxTarget = ctx) {
    ctxTarget.fillStyle = color;
    ctxTarget.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctxTarget.strokeStyle = "#333";
    ctxTarget.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

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

    draw() { this.fill(this.color); }
    unDraw() { this.fill(VACANT); }

    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            p = nextP;
            p.x = 4; p.y = -2; // Reset vị trí khối mới

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
        }
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) kick = -1; else kick = 1;
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
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
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if (!this.activeTetromino[r][c]) continue;
                if (this.y + r < 0) {
                    gameOver = true;
                    document.getElementById('finalScore').innerText = score;
                    document.getElementById('gameOverModal').style.display = 'flex';
                    return;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }

        // Remove Full Rows
        for (let r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (let c = 0; c < COL; c++) {
                if (board[r][c] == VACANT) isRowFull = false;
            }
            if (isRowFull) {
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COL; c++) board[y][c] = board[y - 1][c];
                }
                for (let c = 0; c < COL; c++) board[0][c] = VACANT;
                score += 10;
                lines++;
            }
        }
        drawBoard();
        document.getElementById('score').innerText = score;
        document.getElementById('lines').innerText = lines;
    }
}

function drawNextPiece() {
    // Xóa sạch canvas Next cũ
    nextCtx.clearRect(0, 0, 80, 80);

    if(!nextP) return;

    let previewPiece = nextP.activeTetromino;
    nextCtx.fillStyle = nextP.color;
    nextCtx.strokeStyle = "#ddd";

    // Căn giữa hình vẽ vào canvas 80x80
    // Mỗi ô preview nhỏ là 15px
    let pieceWidth = previewPiece[0].length * 15;
    let pieceHeight = previewPiece.length * 15;

    let offsetX = (80 - pieceWidth) / 2;
    let offsetY = (80 - pieceHeight) / 2;

    for (let r = 0; r < previewPiece.length; r++) {
        for (let c = 0; c < previewPiece[r].length; c++) {
            if (previewPiece[r][c]) {
                nextCtx.fillRect(offsetX + c * 15, offsetY + r * 15, 15, 15);
                nextCtx.strokeRect(offsetX + c * 15, offsetY + r * 15, 15, 15);
            }
        }
    }
}

document.addEventListener("keydown", function(event){
    if(gameOver || isPaused) return;
    if(event.keyCode == 37) p.moveLeft();
    else if(event.keyCode == 38) p.rotate();
    else if(event.keyCode == 39) p.moveRight();
    else if(event.keyCode == 40) p.moveDown();
});

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

function startGame() {
    initBoard();
    drawBoard();
    score = 0; lines = 0; gameOver = false; isPaused = false;
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

function resetGame() { startGame(); }
function togglePause() {
    isPaused = !isPaused;
    if(!isPaused) drop();
}

// Auto start game khi load trang
startGame();