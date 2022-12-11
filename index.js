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

                //if piece is already selected and current click is on empty space
                if(game.current_piece!=undefined){
                    console.log("moving to this place!"); 
                    
                    bin(item_class,game.current_piece);
                    game.current_piece=undefined;
                }
                console.log("no piece here");
            }
            
        })
    });
}
//to make criss cross
function bin(item_class,selected_piece_class){
    const pawn_div=document.querySelector(`.p${selected_piece_class}`);
    pawn_div.innerHTML="";
    game.pawns[pawn_finder(selected_piece_class)].position=item_class[1]+item_class[2];
    game.pawns[pawn_finder(item_class[1]+item_class[2])].updatePosition();
}

//experiments unorganized code 

function pawn_finder(item_class){
    let item_index=0;
    game.pawns.forEach((item,index)=>{
        if(item.position==item_class){
            item_index=index;
        }
    });
    return item_index;
}

//useless function
function hasPiece(square){
    let condition=false;
    

    //change this to accept all of the pieces
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
    this.color="black";
}

Pawn.prototype.updatePosition=function (){
    
    this.pawn=document.querySelector(`${game.board[this.position-1]}`);

    //square10.style="background-color:red";
    this.img=document.createElement("img");
    this.img.className="pawn";
    this.img.src=`pawn_${this.color}.png`;
    this.pawn.appendChild(this.img);
}

//basic pawn testing setup


function pawns_creator(){
    let counter=0;
    //black pawns
    for(var i=9;i<=16;i++){
        game.pawns.push(new Pawn(i));
        console.log(game.pawns[i-9]);
        console.log(game.pawns)
        game.pawns[i-9].updatePosition();
        counter++;
    }
    game.pawns.forEach((pawn)=>{
        pawn.updatePosition(pawn.color);
    });

    //white pawns
    for(var i=49;i<=56;i++){
        game.pawns.push(new Pawn(i));
        console.log(game.pawns[counter]);
        console.log(game.pawns)
        game.pawns[counter].color="white";
        game.pawns[counter].updatePosition();
        counter++;
    }
    

}
pawns_creator();
console.log(game.board);