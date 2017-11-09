var Game={};
Game.canvas=document.getElementById("mycanvas");
Game.context=Game.canvas.getContext("2d");

Game.pos=[0,0];
Game.width=Game.canvas.width;
Game.height=Game.canvas.height;
Game.size=20;
Game.status="init";
Game.score=0;
Game.scoreHTML=document.getElementById("score");
Game.speed=500;

Game.draw=function(pos,size,color){
	Game.context.fillStyle=color;	
	Game.context.fillRect(pos[0],pos[1],size,size);
}

Game.init=function(){
	Game.draw(Game.pos,Game.width,"white");
	var snake=Snake.creatNew();
	for(var i=0;i<snake.length;i++){
		Game.draw(snake.pos[i],Game.size,snake.color); 
	} 
	food.init();
	Game.draw(food.pos,Game.size,food.color);
	t=setInterval(Game.update,Game.speed);	
}
Game.start=function(){
	if(Game.status=="init"){
		Game.init();
	}else if(Game.status=="pause"){
		t=setInterval(Game.update,Game.speed);	
	}
}
Game.pause=function(){
	clearInterval(t);
	Game.status="pause";
}
Game.update=function(){
	snake.move();
	Game.draw(Game.pos,Game.width,"white");
	for(var i=0;i<snake.length;i++){
		Game.draw(snake.pos[i],Game.size,"blue"); 
	} 
	if(snake.eat){
		food.init();
		Game.score++;
		Game.scoreHTML.innerHTML=Game.score;
	}
	Game.draw(food.pos,Game.size,food.color)
	if(Game.score>2){
		Game.score=0;
		Game.speed-=100;
	}
}

Game.gameover=function(){
	clearInterval(t);
	alert("GAME OVER");
	window.reload;
}
var food={};
food.pos=new Array();
food.color="green";
food.init=function(){
	food.pos[0]=Math.floor(Math.random()*(Game.width/Game.size))*Game.size;
	food.pos[1]=Math.floor(Math.random()*(Game.height/Game.size))*Game.size; 
	for(var i=0;i<snake.length;i++){
		if(food.pos[0]==snake.pos[i][0] && food.pos[1]==snake.pos[i][1]){
			food.init();
		}
	}
	snake.eat=false;
}

var Snake={
	creatNew:function(){
		snake={};
		snake.length=1;
		snake.pos=[[0,0]];
		snake.direct="right";
		snake.head=[0,0];
		snake.color="blue";
		snake.dead=false; 
		snake.eat=false;

		snake.move=function(){
			switch(snake.direct){
				case "right":
					snake.head[0]+=Game.size;
					break;
				case "down":
					snake.head[1]+=Game.size;
					break;
				case "left":
					snake.head[0]-=Game.size;
					break;
				case "up":
					snake.head[1]-=Game.size;
					break; 
			}		
			if(snake.head[0]<0 || snake.head[0]>=Game.width || snake.head[1]>=Game.height || snake.head[1]<0){
				snake.dead=true;
			}else{
				for(var i=0;i<snake.length;i++){
					if(snake.pos[i][0]==snake.head[0] && snake.pos[i][1]==snake.head[1]){
						snake.dead=true;
						break;
					}
				 }	
			}
			if(snake.dead==true){
				Game.gameover();
			}else{
				var head=[snake.head[0],snake.head[1]];
				snake.pos.unshift(head);
				if(snake.head[0]==food.pos[0] && snake.head[1]==food.pos[1]){
					snake.eat=true;	
					snake.length++;
				}
				if(!snake.eat)snake.pos.pop();
			}
		}
		return snake;
	},
}
document.onkeydown=function(e){
	var e= e || window.event;
	var key = e.keyCode || e.which;
	switch(key){
		case 37:
			if(snake.direct!="right")snake.direct="left";
			break;
		case 38:
			if(snake.direct!="down")snake.direct="up";
			break;
		case 39:
			if(snake.direct!="left")snake.direct="right";
			break;
		case 40:
			if(snake.direct!="up")snake.direct="down";
			break;
	}
}
function canvInit(){
	var canvSize=document.getElementById("canvSize");
	if(canvSize.value==0){
		Game.canvas.width="200";
		Game.canvas.height="200";
	}else if(canvSize.value==1){
		Game.canvas.width="300";
		Game.canvas.height="300";
	}else if(canvSize.value==2){
		Game.canvas.width="400";
		Game.canvas.height="400"; 
	}
}
