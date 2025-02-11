let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#re");
let newgame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winP = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    enablebox(); 
    msgContainer.classList.add("hide"); 
    msgContainer.classList.remove("show");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "X";
                turnO = false;
            } else {
                box.innerText = "O";
                turnO = true;
            }
            box.disabled = true;
            checkwinner();
        }
    });
});

const disablebox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enablebox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disablebox();
}

const showdraw = () => {
    msg.innerText = "The minds of both players are equally matched!";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disablebox();
}

const checkwinner = () => {
    for (let pattern of winP) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showwinner(pos1);
                return;
            }
        }
    }

    const isDraw = Array.from(boxes).every(box => box.innerText !== "");
    if (isDraw) {
        showdraw();
    }
}

newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);

