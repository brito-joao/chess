const container=document.querySelector(".container");

function Game(){
    this.board=[];
    this.pawns=[];
    this.pieces=[];
    this.current_piece=undefined;
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
        if(i>9){
            square.className=`square p${i}`;
            game.board.push(`.p${i}`);
        }else{
            square.className=`square p0${i}`;
            game.board.push(`.p0${i}`);
        }
        
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


Game.prototype.eventListener=function(){



    const squares=document.querySelectorAll(".square");
    let item_class;



    squares.forEach((square)=>{


        square.addEventListener("click", ()=>{
            
            item_class=square.classList[1];
            
            let clicked_square=item_class[1]+item_class[2];
            
            if(hasPiece(clicked_square)==true){
                if(game.current_piece==undefined){
                    game.current_piece=clicked_square;  
                }else{
                    if(game.current_piece==clicked_square){
                        console.log("this is your own piece");
                    }else{
                       console.log("cant go here, there is another piece here"); 
                    }
                    
                }
                console.log("piece here");
                
            }else{
                console.log("no piece here");
            }
            
        })
    });
}
//to make criss cross
function bin(){
    const pawn_div=document.querySelector(`.p${pawn.position}`);
    pawn_div.innerHTML="";
    pawn.position=item_class[1]+item_class[2];
    pawn.updatePosition(); 
}

//experiments unorganized code 

//useless function
function hasPiece(square){
    let condition=false;
    
    game.pawns.forEach((item)=>{
        if(item.position==square){
            
            condition=true;
            
        }
        
    })
    return condition;
    
}


game.eventListener();

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

//basic pawn testing setup
game.pawns.push(new Pawn(20));
game.pawns.push(new Pawn(22));
game.pawns[0].updatePosition();
game.pawns[1].updatePosition();
console.log(game.board);