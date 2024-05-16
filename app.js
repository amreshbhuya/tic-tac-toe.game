let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let p=document.querySelector("p")

let turnO = true; // playerX ,playerO
let moveCount = 0; // To keep track of the number of moves

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure the box is empty before making a move
            if (turnO) {
                box.innerText = "O";
                box.style.color="green";
                turnO = false;
                
            } else {
                box.style.color="rgb(174, 0, 72)";
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            moveCount++;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations..!, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const draw = () => {
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("winner", pos1val);
            showWinner(pos1val);
            p.style.background="rgba(3, 131, 5, 0.871)";
            return; // Stop checking further if we have a winner
        }
    }
    if (moveCount === 9) {
        draw();
        p.style.background="rgb(22, 101, 119)";
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
