const gameboard = (()=>{
const _board = new Array(9).fill(null);

const getBoard = ()=> _board.slice();
const reset = ()=> _board.fill(null);
const isFull = ()=>_board.every(cell =>cell!=null);
const placeMark = (index, mark)=>{
    if(index<0 || index >8){ return{ok: false, reason:"out of range"}}
    if (_board[index] !=null){
        return{ok:false, reason:"cell taken"}
    }
    _board[index] = mark;
    return{ok:true};

};
 return { getBoard, reset, isFull, placeMark };


})();

const player = (name,mark) =>{return(name,mark)};
const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
