let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-game"); 
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg");

let turn0=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        box.innerText = turn0 ? "O" : "X";
        box.style.color = turn0 ? "blue" : "rgb(154, 2, 255)";
        turn0 = !turn0;
        box.disabled = true;
        count++;
        checkWinner();
    });
    
});
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "white";
    });
    msgContainer.classList.add("hide");
    turn0 = true;
    count = 0;
}


const showWinner = (winner) => {
    msg.innerText = `${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    boxes.forEach((box) => {
        box.disabled = true;
    });
};


const checkWinner=()=>{
    for(pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!= "" && pos2val!="" && pos3val!=""){
            if(pos1val==pos2val && pos2val==pos3val){

                boxes[pattern[0]].style.backgroundColor = "rgb(84, 242, 139)";
                boxes[pattern[1]].style.backgroundColor = "rgb(84, 242, 139)";
                boxes[pattern[2]].style.backgroundColor = "rgb(84, 242, 139)";
                showWinner(pos1val);
                count=0;
                break;
            }else if(count==9){
                msg.innerText = "It's a draw!";
                msgContainer.classList.remove("hide");
            }
        }
        
    }
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);