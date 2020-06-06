import React, {useEffect, useState} from 'react';
import './matchFive.css'

function GameBoard() {
    const [board, setBoard] = useState([])
    const [player, setPlayer] =useState(1)
    useEffect(()=>{
        let board =[];
        for (let row = 0; row < 11; row++) { //row
            for (let col = 0; col < 11; col++) { //column
                let tile = {owner:0, row: row, col: col, pressed: false}
                board.push(tile);
            }
        }
        setBoard(board);
    },[])
    return (
        <div>
            <h2>Gomoku</h2>
            <h3>{player}. player turn</h3>
            {board.filter(tile => tile.col === 1).map(tile => {
                return <BoardRow tiles={board.filter(rowTile => rowTile.row === tile.row)}/>
            })}
        </div>
    )

    function BoardRow(props) {
        return (
            <div>
                {props.tiles.map(tile => {
                    return <BoardTile tile={tile}/>
                })}
            </div>
        )
    }

    function BoardTile(props) {
        return(
            <button className="Tile" onClick={handleClick}>{props.tile.owner === 0 ? "    " : props.tile.owner === 1 ? "x": "o"}</button>
        )
        function handleClick(){
            if (props.tile.pressed === false){
                let updateBoard = board;
                updateBoard.find(tile => tile === props.tile).owner = player;
                updateBoard.find(tile => tile === props.tile).pressed = true;
                player === 1 ? setPlayer(2): setPlayer(1);
                CheckWinner();
            }
        }

    }

    function Win(){
        alert("Player "+player+ ". Won!");
        window.location.reload();
    }

    function CheckWinner(){

        // Horzontal
        for (let i = 0; i < 10; i++) {
            let line = "";
            const row = board.filter(tile => tile.row === i)
            row.forEach(tile => {
                line = line.concat(tile.owner);
            })
            if (/([12])\1\1\1\1/.test(line)){
                Win();
            }
        }
        //Vertical
        for (let i = 0; i < 10; i++) {
            let line = "";
            const row = board.filter(tile => tile.col === i)
            row.forEach(tile => {
                line = line.concat(tile.owner);
            })
            if (/([12])\1\1\1\1/.test(line)){
                Win();
            }
        }
        let diagonalLine = "";
        let rowOffset = 0;
        let colOffset = 0;
        let flip = false;
        //Diagonal left to right
        for (let j = 0; j < 20; j++) {
            for (let i = 0; i < 11-(colOffset+rowOffset); i++) {
                diagonalLine = diagonalLine.concat(board.find(tile => tile.col === i+colOffset && tile.row === i+rowOffset).owner)
            }
            if (/([12])\1\1\1\1/.test(diagonalLine)){
                Win();
                break;
            }
            if (!flip){
                colOffset = colOffset+1;
            }
            else {
                rowOffset = rowOffset+1;
            }
            if (colOffset === 10 ){
                colOffset = 0;
                flip = true;
            }
        }

        rowOffset = 0;
        colOffset = 0;
        flip = false;
        //Diagonal right to left
        for (let j = 0; j < 20; j++) {

            for (let i = 10; i > -1+(colOffset+rowOffset); i--) {
                diagonalLine = diagonalLine.concat(board.find(tile => tile.col === i-colOffset && tile.row === (10-i)+rowOffset).owner)
            }
            if (/([12])\1\1\1\1/.test(diagonalLine)){
                Win();
                break;
            }

            if (!flip){
                colOffset = colOffset+1;
            }
            else {
                rowOffset = rowOffset+1;
            }
            if (colOffset === 10 ){
                colOffset = 0;
                flip = true;
            }

        }

    }
}
export default GameBoard;