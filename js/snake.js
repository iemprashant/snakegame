function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cellsize = 66;
	score =0;
	collison=false;
	game_over=false;

	//food object
	food_img=new Image();
	food_img.src="Assets/apple.png";
	//score trophy
	Trophy=new Image();
	Trophy.src="Assets/trophy.png";
	food=getRandomFood();
	//audio
	const dead= new Audio();
	const eat= new Audio();
	const up = new Audio();
	const left = new Audio();
	const right = new Audio();
	const down = new Audio();
	dead.src = "audio/dead.mp3";
	eat.src = "audio/eat.mp3";
	up.src = "audio/up.mp3";
	left.src = "audio/left.mp3";
	right.src = "audio/right.mp3";
	down.src = "audio/down.mp3";
	snake = {
		init_len:1,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cellsize,this.cells[i].y*cellsize,cellsize-3,cellsize-3);
			}
		},
		updateSnake:function(){
			var headX =this.cells[0].x;
			var headY =this.cells[0].y;

			if(headX==food.x && headY==food.y){
				food=getRandomFood();
				score++; 
			}
			else{
			this.cells.pop();
			}
			var nextX,nextY;

			if(this.direction=="right"){
				nextX =headX+1;
				nextY=headY;
			}
			else if(this.direction=="left"){
				nextX =headX-1;
				nextY=headY;
			}
			else if(this.direction=="down"){
				nextX =headX;
				nextY=headY+1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			
			this.cells.unshift({x:nextX,y:nextY});
			//colision
			for(var i=1; i < this.cells.length; i++){
				if(nextX == this.cells[i].x && nextY == this.cells[i].y){
					dead.play();
					collison = true;
				}
			}
			//logic to prevent snake from going outside
			var lastx = Math.round(W/cellsize);
			var lasty = Math.round(H/cellsize);
			if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x > lastx || this.cells[0].y >lasty){
				game_over=true;
				dead.play();
			}
		}

	};
	
	snake.createSnake();
	function keyPressed(e){
		console.log(e);
		if(e.key=="ArrowRight" && snake.direction != ""){
			right.play();
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"&& snake.direction != "right"){
			left.play();
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"&& snake.direction != "up"){
			down.play();
			snake.direction="down";
		}
		else if(e.key=="ArrowUp"&& snake.direction != "down"){
			up.play();
			snake.direction="up";
		}
		
	};
	document.addEventListener('keydown',keyPressed);
	document.addEventListener('touchmove',keyPressed);
};
function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.drawImage(food_img,food.x*cellsize,food.y*cellsize,cellsize,cellsize);
	pen.drawImage(Trophy,23,20,cellsize,cellsize);
	pen.fillStyle="black";
	pen.font="30px Roboto";
	pen.fillText(score,50,50);
};
function update(){
	snake.updateSnake();
};

function getRandomFood(){
	var foodX =Math.round(Math.random()*(W-cellsize)/cellsize);
	var foodY =Math.round(Math.random()*(H-cellsize)/cellsize);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food
};
function gameloop(){
	if(game_over==true || collison == true){
		clearInterval(f);
		
		dead.play();
		alert("Gameover");
	}
	draw();
    update();
}; 

init();

var f = setInterval(gameloop,150);











