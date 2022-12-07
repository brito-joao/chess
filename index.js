const container=document.querySelector(".container");

function Game(){
    this.board=[];
    this.pawns=[];
    this.pieces=[];
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


//experiments unorganized code 

const squares=document.querySelectorAll(".square");
let item_class;
squares.forEach((item)=>{
    item.addEventListener("click", ()=>{
        
        console.log(item.classList[1]);
        item_class=item.classList[1];
        game.pawns.forEach((pawn)=>{
            console.log(pawn.position)
            if(item_class[1]+item_class[2]==pawn.position){
                //item.style="background-color: blue;";

                pawn.canMove=true;
            }else{
                if(pawn.canMove==true){
                    //remove the last position img; 
                    console.log(game.pawns, pawn.position, item_class);
                    const pawn_div=document.querySelector(`.p${pawn.position}`);
                    pawn_div.innerHTML="";
                    pawn.position=item_class[1]+item_class[2];
                    pawn.updatePosition();
                   
                }
            }

        })

    })
});


function Pawn(position){
    this.position=position;
    this.canMove=false;
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
game.pawns.push(new Pawn(22));
game.pawns[0].updatePosition();
game.pawns[1].updatePosition();
console.log(game.board);