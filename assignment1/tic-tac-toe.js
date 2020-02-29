(function(){
  var fieldDom = [[null, null, null], [null, null, null], [null, null, null]],
  		fieldWidth = 3,
      fieldHeight = 3,
			trs = document.getElementById("gameBoard").children[0].children,
      gameResult = document.getElementById("gameResult"),
      currentTurn = 0, //0: X, 1: O
      countTurn = 0,
      gameOver = false,
      currentCheck = "X",
      isGameOver = false,
      tds = null;

	(function initField() {
  	for(var i=0; i<trs.length; i++) {
      tds = trs[i].children;
      for(var j=0; j<tds.length; j++) {
        fieldDom[i][j] = tds[j];
        fieldDom[i][j].innerHTML = "";
      }
    }
  })();
  
  function checkLeftToRight(paramX, paramY) {
  	var isGameOver = true;
    for(var k=0; k<fieldWidth; k++) {
      if (fieldDom[paramX][k].innerHTML.length <= 0 || fieldDom[paramX][k].innerHTML.indexOf(currentCheck) < 0) {
        isGameOver = false;
      }
    }
    
    return isGameOver;
  };
  
  function checkUpToDown(paramX, paramY) {
  	var isGameOver = true;
    for(var k=0; k<fieldHeight; k++) {
      if (fieldDom[k][paramY].innerHTML.length <= 0 || fieldDom[k][paramY].innerHTML.indexOf(currentCheck) < 0) {
        isGameOver = false;
      }
    }
    
    return isGameOver;
  };
  
  function checkCrossLeftTopToRightDown(paramX, paramY) {
    if((paramX+paramY) % 2 != 0) {return false;}
		
    var isGameOver = true;
    for(k=0; k<fieldDom.length; k++) {
      if(fieldDom[k][k].innerHTML.length <= 0 || fieldDom[k][k].innerHTML.indexOf(currentCheck) < 0) {
        isGameOver = false;
      }
    }
    
    return isGameOver;
  }
  
  function checkCrossRightTopToLeftDown(paramX, paramY) {
    if((paramX+paramY) % 2 != 0) {return false;}

		var isGameOver = true;
  	for(k=0; k<fieldDom.length; k++) {
      if(fieldDom[k][2-k].innerHTML.length <= 0 || fieldDom[k][2-k].innerHTML.indexOf(currentCheck) < 0) {
        isGameOver = false;
      }
    }

		return isGameOver;  
  }

  for(i=0; i<fieldDom.length; i++) {
    for(j=0; j<fieldDom[i].length; j++) {
      fieldDom[i][j].onclick = (function(paramX, paramY) {
        return function(e){
        	if(gameOver) {return false;}
        
          //click i-j cell
          if(fieldDom[paramX][paramY].innerHTML.length == 0) {
            if(currentTurn==0) {
            	currentCheck = "X";
            } else {
            	currentCheck = "O";
            }
            
            fieldDom[paramX][paramY].innerHTML = currentCheck;
            
            if(checkLeftToRight(paramX, paramY)
            	 || checkUpToDown(paramX, paramY)
               || checkCrossLeftTopToRightDown(paramX, paramY)
               || checkCrossRightTopToLeftDown(paramX, paramY)) {
            	gameResult.innerHTML = (currentCheck+" is Win!");
              gameOver = true;
              return true;
            }
            
            currentTurn==0 ? currentTurn=1:currentTurn=0; //turn change
            if(++countTurn == 9) {
            gameResult.innerHTML = ("Draw!");
            	gameOver = true;
            } 
          }
          //do nothing if not empty field
          
        }
      })(i, j);
    }
  }
})();