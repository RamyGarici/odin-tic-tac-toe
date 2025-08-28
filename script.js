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
    console.log(`${players[currentPlayerIndex].name}'s turn`);
  };

  const playRound = (index)=>{
    if(gameOver){
      console.log("Game is over. Restart to play again.");
      return;
    }
     const currentPlayer = players[currentPlayerIndex];
     if(Gameboard.setMark(index, currentPlayer.marker)){
       console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at ${index}`);
       printBoard();
     

      if (checkWinner(currentPlayer.marker)) {
        console.log(`${currentPlayer.name} wins!`);
        gameOver = true;
        return;
      }

      if(isTie()){
        console.log("It's a tie!");
        gameOver = true;
        return;
      }

      currentPlayerIndex = currentPlayerIndex===0? 1:0;
       console.log(`Now it's ${players[currentPlayerIndex].name}'s turn`);
    } else {
      console.log("Spot already taken, try again!");
    }

  };
    

  const printBoard=()=>{
    const board=Gameboard.getBoard()
     console.log(`
      ${board[0] || "-"} | ${board[1] || "-"} | ${board[2] || "-"}
      ${board[3] || "-"} | ${board[4] || "-"} | ${board[5] || "-"}
      ${board[6] || "-"} | ${board[7] || "-"} | ${board[8] || "-"}
    `);
  }

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