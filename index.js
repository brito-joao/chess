const container=document.querySelector(".container");


//main game object 
function Game(){
    this.board=[];
    
    this.pieces=[];
    this.current_piece=undefined;
    this.current_piece_color=undefined;
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



//most important function of the program
Game.prototype.eventListener=function(){



    const squares=document.querySelectorAll(".square");
    let item_class;



    squares.forEach((square)=>{


        //center of the game operations----- since the game doesn't have a main loop
        square.addEventListener("click", ()=>{
            
            //find position of clicked piece
            item_class=square.classList[1];
            let clicked_square=item_class[1]+item_class[2];
            
            
            if(hasPiece(clicked_square)==true){

                
                if(game.current_piece==undefined){
                    //change current piece to pressed piece
                    game.current_piece=clicked_square;  
                    //update square color to yellow because is selected
                    game.current_piece_color=change_square_color(game.current_piece);
                    console.log(game.current_piece_color);
                }else{
                    //if clicked on currently selected piece-------
                    if(game.current_piece==clicked_square){
                        console.log("this is your own piece");
                    }else{
                        //clicking on a piece that has the same color, but not selected------
                        if(game.pieces[piece_finder(clicked_square)].color==game.pieces[piece_finder(game.current_piece)].color){
                            console.log("cant go here, this piece is part of your team"); 

                            
                            //so that when the piece is changed the color of the square remains the same
                            change_back_square_color(game.current_piece,game.current_piece_color);
                            //update current square color to mach game.current_piece
                            game.current_piece_color=find_square_color(clicked_square);
                            game.current_piece=clicked_square;
                            //change pressed square to yellow
                            change_square_color(game.current_piece);
                        }else{
                            //if condition that finds the type of piece
                            //later change this if and put it inside the pawn_can_kill function
                            if(game.pieces[piece_finder(game.current_piece)].name=="pawn"){
                                console.log("killed with a pawn!");
                                if(pawn_can_kill(game.current_piece,clicked_square)==true){
                                    console.log(game.pieces);remove_piece(item_class);
                                    game.pieces.splice(piece_finder(clicked_square),1);
                                    console.log(clicked_square);
                                    
                                    change_back_square_color(game.current_piece,game.current_piece_color)
        
                                    bin(item_class,game.current_piece);
                                    console.log("yummy, you can kill this piece");
                                    game.current_piece=undefined;
                                }
                            }else{
                                //other pieces , remove this else later 
                                console.log(game.pieces);remove_piece(item_class);
                                game.pieces.splice(piece_finder(clicked_square),1);
                                console.log(clicked_square);
                                
                                change_back_square_color(game.current_piece,game.current_piece_color)

                                bin(item_class,game.current_piece);
                                console.log("yummy, you can kill this piece");
                                game.current_piece=undefined;
                            }
                            
                        }
                       
                    }
                    
                }
                console.log("piece here");
                
            }else{

                //if piece is already selected and current click is on empty space
                if(game.current_piece!=undefined){

                    //bishop moves 
                    
                    if(bishop_can_move(game.current_piece,clicked_square)==true){
                        change_back_square_color(game.current_piece,game.current_piece_color)
                        bin(item_class,game.current_piece);
                        game.current_piece=undefined;
                    }
                    if(pawn_can_move(game.current_piece,clicked_square,game.current_piece_color)==true){
                        console.log("moving to this place! BB"); 
                        change_back_square_color(game.current_piece,game.current_piece_color)
                        bin(item_class,game.current_piece);
                        game.current_piece=undefined;
                    }
                    
                }
                console.log("no piece here");
            }
            
        })
    });
};


//change color of selected square
function find_square_color(square_number){
    const square=document.querySelector(`.p${square_number}`);
    let original_color=square.style.backgroundColor;
    return original_color;
}
function change_square_color(selected_piece_class){
    const square=document.querySelector(`.p${selected_piece_class}`);
    let original_color=square.style.backgroundColor;
    
    square.style="background-color:yellow";
    return original_color;
}
function change_back_square_color(selected_piece_class,original_color){
    const square=document.querySelector(`.p${selected_piece_class}`);
    square.style=`background-color:${original_color}` ;
}
//validate pawn killing
function pawn_can_kill(pawn_position,victim_piece){
    let difference;
    let can_kill=false;
    //find pawn color, then compare, if 9 or 7 squares away, then can eat
    let pawn_color=game.pieces[piece_finder(pawn_position)].color;
    console.log(pawn_color);
    if(pawn_color.piece!=game.pieces[piece_finder(victim_piece)].color){

        //white

        //use absolute values to later change this part to 1 condition black & white

        //this doesn't work long term, as the pawn can eat backwards
        difference=pawn_position-victim_piece;
        
        if(Math.abs(difference)==9 || Math.abs(difference)==7){
            can_kill=true;
        }
        
        
    }
    return can_kill;

}
//validate the movement of pieces

function pawn_can_move(pawn_position,wanted_position,original_color){
    let difference;
    let is_first_move=false;
    let is_pawn=false;
    let can_move=false;
    let original_position_color="white";
    if(game.pieces[piece_finder(pawn_position)].name==="pawn"){
        is_pawn=true;
    }

    if(game.pieces[piece_finder(pawn_position)].moved==false){
        
        is_first_move=true;
        game.pieces[piece_finder(pawn_position)].moved=true;
    }
    
    console.log(is_first_move, "istf")

    //tomorrow: create a function for the difference for all the positions
    difference=Math.abs(pawn_position-wanted_position);
    
    if((difference==8 && find_square_color(wanted_position)!=original_color && is_first_move==false) || (is_first_move=true && difference==16)){
        console.log(find_square_color(wanted_position)!=original_color, "unique ident for bug fix");
        can_move=true;
        
    }
    

    if(is_pawn==true && can_move==true){
        return true;
    }else{
        return false;
    }
}
function bishop_can_move(bishop_position,wanted_position){
    let difference;
    let can_move=false;
    let color_same=false;
    let is_bishop=false;
    //this method of % doesn't completly work, so I'll use the colors of the squares to compare also
    if(game.pieces[piece_finder(bishop_position)].name==="bishop"){
        is_bishop=true;
    }
    
    if(find_square_color(bishop_position)==find_square_color(wanted_position)){
        color_same=true;
    }

    difference=Math.abs(bishop_position-wanted_position);
    if(difference>=7 && (difference%9==0 || difference%7==0) ){
        console.log("difference is:", difference, difference%9, difference%7);
        can_move=true;
    }
    if(color_same==true && color_same==true && is_bishop==true){
        return true;
    }else{
        return false;
    }
    
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
    this.moved=false;
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