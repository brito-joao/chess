const container=document.querySelector(".container");


function gameBoard(){
    let counter=0;
    for(var i=1;i<=64;i++){
        
        const square=document.createElement("square");
        square.className="square";

        if(counter<=8 && i!=0){
            counter+=1;
        }else{
            if ((counter-1)%2 && counter!=0){
                counter=2;
            }else{
                counter=1;
            }
            
        }

        console.log(counter);
        chessBoard(i,counter,square);
        
        container.appendChild(square);
    }
}
gameBoard();

//to make criss cross
function chessBoard(number,count,element){
    
    if((number%3) && (number%9)){
        //element.style="background-color:green";
        
    }
    
    if(count%2){
        element.style="background-color:green";
        
    }
    
}