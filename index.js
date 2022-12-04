const container=document.querySelector(".container");


function gameBoard(){
    let counter=0;
    let array=[1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1];
    
    for(var i=1;i<=64;i++){
        
        const square=document.createElement("square");
        square.className=`square p${i}`;

        if(counter<15){
            counter+=1;
            chessBoard(array[counter],square);  
        }else{
            counter=0;
        }
        container.appendChild(square);
    }
}
gameBoard();

//to make criss cross
function chessBoard(number,element){
    if(number==1){
        element.style="background-color:green";
    }else{
        element.style="background-color:white";
    } 
}

//experiments with images 
let piece_coordinate=11;
square10=document.querySelector(`.p${piece_coordinate}`);
//square10.style="background-color:red";
const img=document.createElement("img");
img.className="pawn";
img.src="pawn.png";
square10.appendChild(img)
