
function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cellsize = 66;
	score = 5;
	snake = {
		init_len:5,
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
			this.cells.pop();
			var headX =this.cells[0].x;
			var headY =this.cells[0].y;
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
			
		}

	};
	
	snake.createSnake();
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		else if(e.key=="ArrowUp"){
			snake.direction="up";
		}
	};
	document.addEventListener('keydown',keyPressed);
}
function draw(){
	pen.clearRect(0,0,W,H);
    snake.drawSnake();
}
function update(){
	snake.updateSnake();
}
function gameloop(){
	draw();
    update();
}; 

init();

var f = setInterval(gameloop,100);











