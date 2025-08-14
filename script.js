const gameBoard = (()=>{
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

}


})
