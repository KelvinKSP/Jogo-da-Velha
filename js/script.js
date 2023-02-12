let player = "X";
let xWins = 0;
let oWins = 0;
let gameOver = false;

const cells = document.querySelectorAll("td");
const scoreBoard = document.querySelector("#score-board");
const resetButton = document.querySelector("#btn-reset");

for(let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
        if(!gameOver && this.textContent === "") {
            this.textContent = player;
            checkForWin();
            player = (player === "X") ? "O" : "X";
        }
    })
}

const checkForWin = () => {
    // Todas as combinação possíveis para ganhar no jogo da Velha
    const combinations = [ 
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < combinations.length; i++) {
        const [a, b, c] = combinations[i];
        if(cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
                gameOver = true;
                updateScore();
                resetButton.style.display = "block";
                return;
        }
    }

    let isDraw = true;
    for(let i = 0; i < cells.length; i++) {
        if(cells[i].textContent === "") {
            isDraw = false;
            break;
        }
    }
    if(isDraw) {
        resetButton.style.display = "block";
        gameOver = true;
    }
}

const updateScore = () => {
    if(player === "X") {
        xWins++;
    } else {
        oWins++;
    }
    scoreBoard.textContent = `X = ${xWins}    -     O = ${oWins}`;
}

const resetGame = () => {
    gameOver = false;
    player = "X";
    for(let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].classList.remove("win");
    }
    resetButton.style.display = "none";
}



resetButton.addEventListener("click", resetGame);