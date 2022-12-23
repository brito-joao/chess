const container=document.querySelector(".container");
const title=document.querySelector(".title");
const body=document.querySelector("body")
//main game object 
function Game(){
    this.board=[];
    this.pieces=[];
    this.current_piece=10;
    this.current_piece_color="white";
    this.row_board=[
        [],[],[],[],[],[],[],[]
    ];
}
Game.prototype.chessBoard=function(number,element){
    
    number==1 ? element.style="background-color:green" : element.style="background-color:white";
    
}
Game.prototype.gameBoard=function(){
    let counter=0;
    let array=[1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1];
    
    for(var i=1;i<=64;i++){
        
        const square=document.createElement("square");
        
        (i>9)?( square.className=`square p${i}`,game.board.push(`.p${i}`) ):( square.className=`square p0${i}`,game.board.push(`.p0${i}`) );
        (counter<15)?( counter+=1,game.chessBoard(array[counter],square) ):( counter=0,game.chessBoard(array[counter+1],square) );

        container.appendChild(square);
        
        
    }
};

Game.prototype.position_board_creator=function(){
    let row=0;
    let row_start=[9,17,25,33,41,49,57];
    for(var i=1;i<=64;i++){
        row_start.includes(i) ? row++:{};
        game.row_board[row].push(i)
    }
    console.log(game.row_board);
}

let game=new Game();
game.gameBoard();
game.position_board_creator();
//most important function of the program
Game.prototype.eventListener=function(){
    const squares=document.querySelectorAll(".square");

    squares.forEach((square)=>{
        square.addEventListener("click", ()=>{

            mainFunction(square);
            game_over(game);
        })
    });
};
function game_over(game){
    let counter=0;
    game.pieces.forEach((piece)=>{
        if(piece.name=="king"){
            counter++;
        }
    })
    console.log("is game over?",counter);
    if(counter<2){
        title.innerText="Game Over";
        body.style="background-color:black";
    }
}
function mainFunction(square){
    //find position of clicked piece
    let item_class;
    item_class=square.classList[1];
    let clicked_square=item_class[1]+item_class[2];


    switch(hasPiece(clicked_square)){

        case true:

            game.current_piece==undefined ? first_square_clicked(clicked_square)
                :game.current_piece==clicked_square ? console.log("this is your own piece")
                :clicked_occupied_place(clicked_square,item_class);
            break;
        case false:
            //if piece is already selected and current click is on empty space
            if(game.current_piece!=undefined){

                //piece move validation
                piece_movement_validation(game,clicked_square,item_class);
            }
            
    }
}

//change color of selected square
function move_piece_to_empty_square(item_class,game){
    
    change_back_square_color(game.current_piece,game.current_piece_color)
    bin(item_class,game.current_piece);
    game.current_piece=undefined;
}

function piece_movement_validation(game,clicked_square,item_class){
    
    bishop_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :pawn_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :knight_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :rook_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :queen_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :king_can_move(game.current_piece,clicked_square,game.current_piece_color)==true ? move_piece_to_empty_square(item_class,game)
    :{};

}

function first_square_clicked(clicked_square){game.current_piece=clicked_square;game.current_piece_color=change_square_color(game.current_piece);}

function clicked_occupied_place(clicked_square,item_class){


    //if the piece clicked has the same color of the current piece
    switch(game.pieces[piece_finder(clicked_square)].color==game.pieces[piece_finder(game.current_piece)].color){
        case true:
            change_current_selected_piece(game,clicked_square)
            break;
        case false:
                //if condition that finds the type of piece
                //later change this if and put it inside the pawn_can_kill function
            
                
            (pawn_can_kill(game.current_piece,clicked_square,game)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :(bishop_can_move(game.current_piece,clicked_square,game.current_piece_color)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :(knight_can_move(game.current_piece,clicked_square,game.current_piece_color)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :(rook_can_move(game.current_piece,clicked_square,game.current_piece_color)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :(queen_can_move(game.current_piece,clicked_square,game.current_piece_color)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :(king_can_move(game.current_piece,clicked_square,game.current_piece_color)==true) ? piece_killing_validation(game,clicked_square,item_class)
                :{};
            break;
            
        
    }
    
    
}

function piece_killing_validation(game,clicked_square,item_class){
    remove_piece(item_class);
    game.pieces.splice(piece_finder(clicked_square),1);

    change_back_square_color(game.current_piece,game.current_piece_color)
    bin(item_class,game.current_piece);
    game.current_piece=undefined;
}
function change_current_selected_piece(game,clicked_square){
     

    //so that when the piece is changed the color of the square remains the same
    change_back_square_color(game.current_piece,game.current_piece_color);
    //update current square color to mach game.current_piece
    game.current_piece_color=find_square_color(clicked_square);
    game.current_piece=clicked_square;
    //change pressed square to yellow
    change_square_color(game.current_piece);
}

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
function pawn_can_kill(pawn_position,victim_piece,game){
    let difference;
    let can_kill=false;
    let is_pawn=false;
    let color_same=false;
    let pawn_color=game.pieces[piece_finder(pawn_position)].color;
    difference=pawn_position-victim_piece;
    //find pawn color, then compare, if 9 or 7 squares away, then can eat

    game.pieces[piece_finder(pawn_position)].name==="pawn" ? is_pawn=true:{};
    (pawn_color!=game.pieces[piece_finder(victim_piece)].color) ? color_same=true:{};
    (Math.abs(difference)==9 || Math.abs(difference)==7)? can_kill=true:{};
        
        
        
    
    return is_pawn==true && can_kill==true && color_same==true? true : false;

}
//validate the movement of pieces

function pawn_can_move(pawn_position,wanted_position,original_color){
    let difference;
    let is_first_move=false;
    let is_pawn=false;
    let can_move=false;
    

    //verify if it is a pawn
    game.pieces[piece_finder(pawn_position)].name==="pawn"?is_pawn=true:{};
    //if it is the pawn's first move --------
    //change the var is_first_move to true and pawn atribute is_first_move to false
    
    if(game.pieces[piece_finder(pawn_position)].is_first_move==true){is_first_move=true;game.pieces[piece_finder(pawn_position)].is_first_move=false;}
    
    

    //tomorrow: create a function for the difference for all the positions
    difference=Math.abs(pawn_position-wanted_position);
    
    if((difference==8 && find_square_color(wanted_position)!=original_color && is_first_move==false)){
        
        can_move=true;
        
    }

    
    if((is_first_move==true && difference==16) || (is_first_move==true && difference==8)){
        
        can_move=true;
        
    }
    
    return is_pawn==true && can_move==true ? true:false;
}
function bishop_can_move(bishop_position,wanted_position,original_color){
    let difference;
    let can_move=false;
    let color_same=false;
    let is_bishop=false;
    difference=Math.abs(bishop_position-wanted_position);
    //this method of % doesn't completly work, so I'll use the colors of the squares to compare also
    game.pieces[piece_finder(bishop_position)].name==="bishop"? is_bishop=true:{};
    original_color==find_square_color(wanted_position)? color_same=true:{};
    difference>=7 && (difference%9==0 || difference%7==0)?can_move=true:{};
    
    
    
    return color_same==true && can_move==true && is_bishop==true && bishop_piece_validation(bishop_position,wanted_position,difference,original_color) ? true : false;
    
    
}


function knight_can_move(knight_position,wanted_position,original_color){
    let knight_movement={"can_move":false,"color_same":false,"is_knight":false,"difference":0};
    knight_movement["difference"]=Math.abs(knight_position-wanted_position);
    

    game.pieces[piece_finder(knight_position)].name==="horse" ? knight_movement["is_knight"]=true:{};
    original_color!=find_square_color(wanted_position)? knight_movement["color_same"]=true:{};
    
    (knight_movement["difference"]==17 || knight_movement["difference"]==15 || knight_movement["difference"]==10 || knight_movement["difference"]==6)? knight_movement["can_move"]=true:{};
    
    
    return (knight_movement["color_same"]==true && knight_movement["can_move"]==true && knight_movement["is_knight"]==true) ? true : false;
}
function rook_can_move(rook_position,wanted_position,original_color){
    let rook_movement={"can_move":false,"color_same":false,"is_rook":false,"difference":0};
    game.pieces[piece_finder(rook_position)].name==="tower" ? rook_movement["is_rook"]=true:{};
    
    return (same_column(rook_position,wanted_position)==true || same_row(rook_position,wanted_position)==true) && rook_movement["is_rook"]==true && rook_piece_validation(rook_position,wanted_position)==true ? true : false;
}
//turn occupied piece into an empty space
function same_row(number1, number2){
    
    let is_same_row=false;
    
    game.row_board.forEach((row)=>{
        
        
        row.includes(parseInt(number1))==true && row.includes(parseInt(number2))==true ? is_same_row=true:{};
    })
    return is_same_row;
}
function same_column(number1,number2){
    
    
    let number1_index=0;
    let number2_index=0;
    game.row_board.forEach((row)=>{
        //write the index of the number 1 & number2
        if(row.includes(parseInt(number1))){
            number1_index=row.indexOf(parseInt(number1));
        }
        if(row.includes(parseInt(number2))){
            number2_index=row.indexOf(parseInt(number2));
        }
        
    });
    return number1_index==number2_index ? true:false;
}
function queen_can_move(queen_position,wanted_position,original_color){
    let queen_movement={"can_move":false,"color_same":false,"is_queen":false,"difference":0};
    queen_movement["difference"]=Math.abs(queen_position-wanted_position);
    game.pieces[piece_finder(queen_position)].name==="queen" ? queen_movement["is_queen"]=true:{};
    console.log("queen moves",same_column(queen_position,wanted_position),"b",same_row(queen_position,wanted_position),"c",queen_diagonal_movement(original_color,wanted_position,queen_movement["difference"]),"d",queen_movement["is_queen"],"e",rook_piece_validation(queen_position,wanted_position),"f",bishop_piece_validation(queen_position,wanted_position,queen_movement["difference"],original_color));
    return (same_column(queen_position,wanted_position)==true || same_row(queen_position,wanted_position)==true || queen_diagonal_movement(original_color,wanted_position,queen_movement["difference"])) && queen_movement["is_queen"]==true && (rook_piece_validation(queen_position,wanted_position)==true || bishop_piece_validation(queen_position,wanted_position,queen_movement["difference"],original_color)) ? true : false;

}

function queen_diagonal_movement(original_color,wanted_position,difference){
    let can_move=false;
    let color_same=false;
    original_color==find_square_color(wanted_position)? color_same=true:{};
    difference>=7 && (difference%9==0 || difference%7==0)?can_move=true:{};
    return can_move==true && color_same==true ? true:false;
}
function bishop_piece_validation(number1,number2,difference,original_color){
    //let difference=number1-number2;
    let divisible_by=difference%9==0 ? 9:7;
    let is_negative=parseInt(number1)-parseInt(number2)<0 ? true:false;
    
    number1=parseInt(number1);
    number2=parseInt(number2);
    let differences_array_9=[];
    let differences_array_7=[];
    let can_move=true;
    if(divisible_by==9){
        differences_array_9=findNumbersDivisibleBy(difference,9);
    }
    if(divisible_by==7){
        differences_array_7=findNumbersDivisibleBy(difference,7);
        
    }
    let number1_index=0;
    let number2_index=0;
    game.row_board.forEach((row)=>{
        if(row.includes(number1)&&row.includes(number2)){
            can_move=false;
        }
        if(row.includes(number1)){
            number1_index=row.indexOf(number1);
        }
        if(row.includes(number2)){
            number2_index=row.indexOf(number2);
        }
    })
    if(number1_index==number2_index){
        can_move=false;
        differences_array_9=[];
        differences_array_7=[];
    }
    if(differences_array_9.length>=1){
        differences_array_9.forEach((number_difference)=>{
            
            
            if(is_negative==true){
                if(original_color==find_square_color(number1+number_difference)){
                    
                    if(hasPiece(number1+number_difference)){
                        can_move=false;
                    }
                }
                
            }else{
                if(original_color==find_square_color(number1-number_difference)){
                    if(hasPiece(number1-number_difference)){
                        can_move=false;
                    }
                }
                
            }
                
            
        })
    }
    
    
    if(differences_array_7.length>=1){
        differences_array_7.forEach((number_difference)=>{
            
            if(is_negative==true){
                if(original_color==find_square_color(number1+number_difference)){
                    
                    if(hasPiece(number1+number_difference)){
                        can_move=false;
                    }
                }
                
            }else{
                console.log("hello world",number1,number_difference,differences_array_7);
                if(original_color==find_square_color(parseInt(number1)-number_difference)){
                    if(hasPiece(number1-number_difference)){
                        can_move=false;
                    }
                }
                
            }
            
        })
    }
    
    
    return can_move;
    
}
function findNumbersDivisibleBy(n,divisible) {
    let array=[];
    for (let i = 1; i < n; i++) {
        if (i % divisible === 0) {
            array.push(i);
        }
    }
    
    return array;
}

function king_can_move(king_positon,wanted_position,original_color){
    let possible_differences=[1,7,8,9];
    let is_king=false;
    game.pieces[piece_finder(king_positon)].name==="king" ? is_king=true:{};
    let difference=Math.abs(parseInt(king_positon)-parseInt(wanted_position));
    console.log(difference,king_positon,wanted_position)
    return possible_differences.includes(difference) && is_king? true:false;
}

function rook_piece_validation(number1,number2){
    let smallest_position=number1<number2?number1:number2;
    let biggest_position=number1>number2?number1:number2;
    let can_move=true;
    smallest_position=parseInt(smallest_position);
    biggest_position=parseInt(biggest_position);
    let is_vertical=false,is_horizontal=false;
    game.row_board.forEach((row)=>{
        
        if(row.includes(smallest_position) && row.includes(biggest_position)){
            is_horizontal=true;
            
        }else{
            is_vertical=true;
        }
    })
    //for the horizontal validation
    if(is_horizontal){
        let difference=biggest_position-smallest_position;
        for(var i=1;i<difference;i++){
            if(hasPiece(smallest_position+i)){
                can_move=false;
            }
        }    
    }
    

    //for the vertical validation
    let current_row_index=0;
    let possible_positios=[];
    if(is_vertical){
        game.row_board.forEach((row,index_of_row)=>{
            if(row.includes(smallest_position)){
                current_row_index=row.indexOf(smallest_position);
            }
            if(row.includes(smallest_position)==false && row[7]<biggest_position && row[0]>smallest_position){
                possible_positios.push(row[current_row_index]);
            }
        });
        possible_positios.forEach((position)=>{
            if(hasPiece(position)){
                can_move=false;
            }
        })

    }
    console.log("can move:",can_move,number1,number2,is_vertical,is_horizontal,possible_positios);
    return can_move;
}
function remove_piece(item_class){
    
    const piece_div=document.querySelector(`.${item_class}`);
    piece_div.innerHTML="";
}


//move a piece to an empty space and change this funtion name to piece_display_update
function bin(item_class,selected_piece_class){
    const piece_div=document.querySelector(`.p${selected_piece_class}`);
    piece_div.innerHTML="";
    game.pieces[piece_finder(selected_piece_class)].position=item_class[1]+item_class[2];
    game.pieces[piece_finder(item_class[1]+item_class[2])].updatePosition();
}

//experiments unorganized code 

function piece_finder(item_class){
    let item_index=0;game.pieces.forEach((item,index)=>{item.position==item_class?item_index=index:{};});
    return item_index;
}
function hasPiece(square){
    let condition=false;game.pieces.forEach((item)=>{item.position==square?condition=true:{} ;})
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
    updatePosition(game.pieces[current_index]);
}
function Pawn(position){
    this.name="pawn";
    this.position=position;
    this.canMove=false;
    this.color="black";
    this.is_first_move=true;
}

Pawn.prototype.updatePosition=function (){
    let current_index=piece_finder(this.position);
    updatePosition(game.pieces[current_index]);
    
}

function Tower(position){
    this.name="tower";
    this.position=position;
    this.color="black";
}

Tower.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    updatePosition(game.pieces[current_index]);
}

function Horse(position){
    this.name="horse";
    this.position=position;
    this.color="black";
}

Horse.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    updatePosition(game.pieces[current_index]);
}

function Bishop(position){
    this.name="bishop";
    this.position=position;
    this.color="black";
}

Bishop.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    updatePosition(game.pieces[current_index]);
}

function Queen(position){
    this.name="queen";
    this.position=position;
    this.color="black";
}

Queen.prototype.updatePosition=function(){
    let current_index=piece_finder(this.position);
    updatePosition(game.pieces[current_index]);
}

//template for all updateposition functions
function updatePosition(object){
    object.piece=document.querySelector(`${game.board[object.position-1]}`);
    object.img=document.createElement("img");
    object.img.className="pawn";
    object.img.src=`${object.name}_${object.color}.png`;
    object.piece.appendChild(object.img);
    
}

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
piece_spawner(Pawn,[9,10,11,12,13,14,15,16],[49,50,51,52,53,54,55,56])
piece_spawner(King,[5],[60]);
piece_spawner(Tower,[1,8],[57,64]);
piece_spawner(Horse,[2,7],[58,63]);
piece_spawner(Bishop,[3,6],[59,62]);
piece_spawner(Queen,[4],[61]);
console.log("hello world");