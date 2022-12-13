const container=document.querySelector(".container");

function Game(){
    this.board=[];
    
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



//modify this 
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
                        if(game.pieces[piece_finder(clicked_square)].color==game.pieces[piece_finder(game.current_piece)].color){
                            console.log("cant go here, this piece is part of your team"); 
                        }else{
                            console.log(game.pieces);remove_piece(item_class);
                            game.pieces.splice(piece_finder(clicked_square),1);
                            console.log(clicked_square);
                            
                            bin(item_class,game.current_piece);
                            console.log("yummy, you can kill this piece");
                            game.current_piece=undefined;
                        }
                       
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
//turn occupied piece into an empty space
function remove_piece(item_class){
    console.log(item_class);
    const piece_div=document.querySelector(`.${item_class}`);
    piece_div.innerHTML="";
}


//move a piece to an empty space
function bin(item_class,selected_piece_class){
    const piece_div=document.querySelector(`.p${selected_piece_class}`);
    piece_div.innerHTML="";
    game.pieces[piece_finder(selected_piece_class)].position=item_class[1]+item_class[2];
    game.pieces[piece_finder(item_class[1]+item_class[2])].updatePosition();
}

//experiments unorganized code 

function piece_finder(item_class){
    let item_index=0;
    game.pieces.forEach((item,index)=>{
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
    game.pieces.forEach((item)=>{
        if(item.position==square){
            
            condition=true;
            
        }
        
    })
    return condition;
    
}


game.eventListener();
function King(position){
    this.position=position;
    this.color="black";
    this.name="king";
}

King.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
}
function Pawn(position){
    this.name="pawn";
    this.position=position;
    this.canMove=false;
    this.color="black";
}

Pawn.prototype.updatePosition=function (){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
    
}

function Tower(position){
    this.name="tower";
    this.position=position;
    this.color="black";
}

Tower.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
}

function Horse(position){
    this.name="horse";
    this.position=position;
    this.color="black";
}

Horse.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
}

function Bishop(position){
    this.name="bishop";
    this.position=position;
    this.color="black";
}

Bishop.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
}

function Queen(position){
    this.name="queen";
    this.position=position;
    this.color="black";
}

Queen.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    console.log(game.pieces[current_index]);
    updatePosition(game.pieces[current_index]);
}

//template for all updateposition functions
function updatePosition(object){
    object.piece=document.querySelector(`${game.board[object.position-1]}`);
    
    object.img=document.createElement("img");
    object.img.className="pawn";
    
    object.img.src=`${object.name}_${object.color}.png`;
    object.piece.appendChild(object.img);
    console.log(object.img);
}



//--piece spawner-- create pieces from thin air

function piece_spawner(object,array_positions_black,array_positions_white){
    //this function works only for 4 pieces by type
    array_positions_black.forEach((position)=>{
        game.pieces.push(new object(position));
        game.pieces[game.pieces.length-1].updatePosition();
    })

    //white pieces
    array_positions_white.forEach((position)=>{
        game.pieces.push(new object(position));
        game.pieces[game.pieces.length-1].color="white";
        game.pieces[game.pieces.length-1].updatePosition();
    })
}
//skings_creator();

//pawns_creator();
//kings_creator();
piece_spawner(Pawn,[9,10,11,12,13,14,15,16],[49,50,51,52,53,54,55,56])
piece_spawner(King,[5],[60]);
piece_spawner(Tower,[1,8],[57,64]);
piece_spawner(Horse,[2,7],[58,63]);
piece_spawner(Bishop,[3,6],[59,62]);
piece_spawner(Queen,[4],[61]);

console.log("hello world");