const container=document.querySelector(".container");

function Game(){
    this.board=[];
    this.pawns=[".p11"];
    this.current_piece;
}
Game.prototype.chessBoard=function(number,element){
    if(number==1){
        element.style="background-color:green";
    }else{
        element.style="background-color:white";
    } 
}
Game.prototype.gameBoard=function(){
    let counter=0;
    let array=[1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1];
    
    for(var i=1;i<=64;i++){
        
        const square=document.createElement("square");
        square.className=`square p${i}`;


        game.board.push(`.p${i}`);
        if(counter<15){
            counter+=1;
            game.chessBoard(array[counter],square);  
        }else{
            counter=0;
        }
        container.appendChild(square);
        
        
    }
};
let game=new Game();
game.gameBoard();

//to make criss cross


//experiments with images 

const squares=document.querySelectorAll(".square");
let item_class;
squares.forEach((item)=>{
    item.addEventListener("click", ()=>{
        item.style="background-color: blue;";
        console.log(item.classList[1]);
        item_class=item.classList[1];
        
    })
});


function Pawn(position){
    this.position=position;
}

Pawn.prototype.updatePosition=function (){
    
    this.pawn=document.querySelector(`.p${this.position}`);

    //square10.style="background-color:red";
    this.img=document.createElement("img");
    this.img.className="pawn";
    this.img.src="pawn.png";
    this.pawn.appendChild(this.img);
}
game.pawns.push(new Pawn(20));
console.log(game.pawns[1])
game.pawns[1].updatePosition();
console.log(game.board);