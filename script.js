const cells = document.querySelectorAll(".cell");
const title = document.getElementById("title")


const Gameboard = (()=>{
let board =["","","","","","","","",""];

const getBoard=()=> board;
const setMark= (index,mark)=>{
  if(board[index]==""){
     board[index] = mark;
    return true
  }
  return false;
};

const reset = ()=>{
  board =["","","","","","","","",""];
  title.textContent = "Tic Tac Toe"

};

return{getBoard,setMark,reset};
})();;

const Player = (name,marker)=>{
  return{name,marker}
}

const gameController=(()=>{
  let players=[];
  let currentPlayerIndex=0;
  let gameOver=false;

  const start=(playerOneName,playerTwoName)=>{
    players=[Player(playerOneName,"X"),Player(playerTwoName,"O")];
    currentPlayerIndex=0;
    gameOver=false;
     Gameboard.reset();
   
  };

  const playRound = (index)=>{
    if(gameOver){
     
      return;
    }
     const currentPlayer = players[currentPlayerIndex];
     if(Gameboard.setMark(index, currentPlayer.marker)){
      
 
     

      if (checkWinner(currentPlayer.marker)) {
        
        title.textContent = `${currentPlayer.name} wins!`;

        gameOver = true;
        return;
      }

      if(isTie()){
        
        title.textContent= "It's a tie!"
        gameOver = true;
        return;
      }

      currentPlayerIndex = currentPlayerIndex===0? 1:0;
      
    } else {
      console.log("Spot already taken, try again!");
    }

  };
    


  const isTie=()=>{
    return Gameboard.getBoard().every(cell=>cell!="");
  }

  const checkWinner=(marker)=>{
    const winnPatterns=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8], 
      [0,4,8],[2,4,6]          
    ];

    return winnPatterns.some(pattern=> pattern.every(index=> Gameboard.getBoard()[index]===marker))

  };


  

  return { start, playRound };

})();

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  Gameboard.reset();
  renderBoard();
  gameController.start("Player 1", "Player 2"); 
  
});

cells.forEach(cell=>{
  cell.addEventListener("click",(e)=>{
    gameController.playRound(parseInt(cell.dataset.index));
    renderBoard()

  })
})

const renderBoard=()=>{
const board= Gameboard.getBoard();
cells.forEach((cell,index)=>{
  cell.textContent=board[index];

})

}

gameController.start("Player 1", "Player 2");
