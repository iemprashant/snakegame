
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
				pen.fillRect(this.cells[i].x*cellsize,this.cells[i].y*cellsize,cellsize-3,cellsize-3);
			}
        }

	};

	snake.createSnake();
}
// function update(){

// };
function gameloop(){
    snake.drawSnake();
    update;
}; 
init();
var f = setInterval(gameloop,1000);











