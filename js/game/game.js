
var KEY     = { ESC:27, SPACE:32, LEFT:37, UP:38, RIGHT:39, DOWN:40  },
    DIR     = { UP:0, DOWN:1, LEFT:2, RIGHT:3, OPPOSITE:[1, 0, 3, 2] },
    canvas  = document.getElementById('canvas'),
    width   = canvas.width  = canvas.offsetWidth,
    height  = canvas.height = canvas.offsetHeight,
    ctx     = canvas.getContext('2d'),
    nx      = 44,
    ny      = 33,
    dx      = width  / nx,
    dy      = height / ny,
    playing = false,
    dstep, dt, length, moves, dir, growth, head, tail, food, currentDir, stage, visAid;
    
var worldMap = {
	stage1: {
		name: "forest", 	
		up:2, down:4, left:3, right:5
	},
	stage2: {
		name: "tall twins", 
		up:1, down:6, left:5, right:3
	},
	stage3: {
		name: "4 diamonds", 
		up:1, down:6, left:2, right:4
	},
	stage4: {
		name: "arrows", 	
		up:1, down:6, left:3, right:5
	},
	stage5: {
		name: "frogger", 	
		up:1, down:6, left:4, right:2
	},
	stage6: {
		name: "D.C.", 		
		up:2, down:4, left:5, right:3
	}
}    

var sides = {
    T:   0,
    R:   43,
    B:   32,
    L:   0
 };


function reset() {
  dstep  = 0.06,  //the speed of the snake (seconds per step)
  dt     = 0; //seconds since the last update.
  moves  = []; //an array allows multiple moves in a single frame.
  dir    = DIR.LEFT; //the current direction of the snakes head.
  head   = tail = { x: 40, y: 5 }; //the snakes head. and tail
  length = 1; //the length of the snake (we use this as the current score).
  growth = 10; //the amount to grow after eating some food.
  food = unoccupied();
  currentDir = dir;
  stage = worldMap.stage4;
  visAid = document.getElementById("stage4");
  visAid.style.backgroundColor="yellow";
};

//Our game loop is a traditional update/draw loop using setTimeout
function timestamp() { return new Date().getTime(); };

var start, last = timestamp();
function frame() {
  start = timestamp();
  update((start - last) / 1000.0);
  draw(ctx);
  last = start;
  requestAnimationFrame(frame);
  //setTimeout(frame, 1);
}

reset(); // reset the game state
frame(); // and start the loop


/*
We allow user input via keyboard by binding a global key down event handler that 
allows us to stop and start the game and also record any snake moves to be used 
during our update method.

For keydown events that we want to handle ourselves, we must ensure we 
preventDefault to stop the default action from, for example, scrolling the 
page up and down when we change the snakes direction up or down.
*/

document.addEventListener('keydown', onkeydown, false);

function onkeydown(ev) {
  var handled = false;
  if (playing) {
    switch(ev.keyCode) {
      case KEY.LEFT:   move(DIR.LEFT);  handled = true; break;
      case KEY.RIGHT:  move(DIR.RIGHT); handled = true; break;
      case KEY.UP:     move(DIR.UP);    handled = true; break;
      case KEY.DOWN:   move(DIR.DOWN);  handled = true; break;
      case KEY.ESC:    lose();          handled = true; break;
    }
  }
  else if (ev.keyCode == KEY.SPACE) {
    play();
    handled = true;
  }
  if (handled)
    ev.preventDefault(); // prevent arrow keys from scrolling the page
};

function move(where) {
  var previous = moves.length ? moves[moves.length-1] : dir;
  if ((where != previous) && (where != DIR.OPPOSITE[previous]))
    moves.push(where); currentDir = where;
};

function play() { reset(); playing = true;  };
function lose() {          playing = false; };

/*
Updating the Game

Our update method increments dt and if past dstep it will move 
the snake by increasing its head (potentially in a different 
direction) and decreasing its tail.

Once the snake has moved, if the new head is a cell that is 
occupied by the snake then the game is over, otherwise if the 
cell contains food then the snake grows and a new food item is placed.
*/

function update(idt) {
  if (playing) {
    dt = dt + idt;
    if (dt > dstep) {
      dt = dt - dstep;
      increase(moves.shift());
      decrease();
			snakeExits(head);
      if (snakeOccupies(head, true)) {
        lose();
      }
      else if (foodOccupies(head)) {
        growth += 10;
        food = unoccupied();
      } 
    }
  }
};

/*
Rendering the Game

Our draw method consists of simple canvas drawing commands 
to render the food, the snake head, all of the snake body 
segments and the ‘score’.

Rendering everything, for each frame at 60fps can be a performance 
problem. In this simple case, with a few hundred snake segments, 
the draw method can take about 4 or 5ms which is less than the 16ms 
limit (1000/60) we need to hit for a 60fps game. So this looks like 
it should be ok.
*/
function draw(ctx) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = playing ? 1.0 : 0.5;
  ctx.fillStyle = 'green';
  ctx.fillRect(food.x * dx, food.y * dy, dx, dy);
  ctx.fillStyle = 'black';
  ctx.fillRect(head.x * dx, head.y * dy, dx, dy);
  var segment = head, n = 0;
  while(segment = segment.next) {
    ctx.fillStyle = '#1080F0';
    ctx.fillRect(segment.x * dx + 1, segment.y * dy + 1, dx - 2, dy - 2);
  }
  ctx.fillStyle = 'green';
  ctx.font = 'bold 18pt arial';
  ctx.fillText(length.toString(), 10, 30);
};

/*
Managing Snake Growth

We manage snake growth by using a simple queue data structure with push and pop methods.
We made the snake 'step' during update by increasing its head and decreasing its tail.
*/

function push(segment) {
  length++;
  if (head) {
    head.prev = segment;
    segment.next = head;
  }
  head = segment;
};

function pop() {
  length--;
  if (tail.prev) {
    tail = tail.prev;
    tail.next = null;
  }
};

/*
Increasing the head, we need to account for change of direction, 
and some simple math to allow the snake to wrap around to the 
other side of the play field.
*/

function increase(changeDir) {
  dir  = (typeof changeDir != 'undefined') ? changeDir : dir;
  switch(dir) {
    case DIR.LEFT:  push({x: head.x == 0    ? nx-1 : head.x-1, y: head.y                           }); break;
    case DIR.RIGHT: push({x: head.x == nx-1 ? 0    : head.x+1, y: head.y                           }); break;
    case DIR.UP:    push({x: head.x,                           y: head.y == 0    ? ny-1 : head.y-1 }); break;
    case DIR.DOWN:  push({x: head.x,                           y: head.y == ny-1 ? 0    : head.y+1 }); break;
  }
};

/*
Decreasing the tail is trivial, if we are growing then do nothing, 
otherwise pop off the tail.
*/
function decrease() {
  if (growth)
    growth--;
  else
    pop();
};

/*
Collision Detection

The remaining code is some simple collision detection logic.

 if head equal side && movement is happening && directions not changging 
 the if direction == up then checkStage() updateMapLocation() 
* 
*/

function occupies(a, b) {
  return a && b && (a.x == b.x) && (a.y == b.y);
};

function foodOccupies(pos) {
  return occupies(food, pos);
};

function snakeOccupies(pos, ignoreHead) {
  var segment = ignoreHead ? head.next : head;
  do {
    if (occupies(segment, pos))
      return true;
  } while (segment = segment.next);
  return false;
};

function snakeExits(pos){
	if (pos.y === sides.T && currentDir === 0) {
		console.log("exited at top");
		changeStage(stage.up);
		console.log('now in the: '+stage.name);
	}
	if (pos.x === sides.R && currentDir === 3) {
		console.log("exited at right");
		changeStage(stage.right);
		console.log('now in the: '+stage.name);
	}
	if (pos.y === sides.B && currentDir === 1) {
		console.log("exited at bottom");
		changeStage(stage.down);
		console.log('now in the: '+stage.name);
	}
	if (pos.x === sides.L && currentDir === 2) {
		console.log("exited at left");
		changeStage(stage.left)
		console.log('now in the: '+stage.name);
	}
	
	function changeStage(dir){
		visAid.style.backgroundColor="#6f9440";
		visAid = document.getElementById("stage"+dir);
  	visAid.style.backgroundColor="yellow";
		stage = worldMap["stage"+dir];
	}
}

function unoccupied() {
  var pos = {};
  do {
    pos.x = Math.round(random(0, nx-1));
    pos.y = Math.round(random(0, ny-1));
  } while (foodOccupies(pos) || snakeOccupies(pos));
  return pos;
};

function random(min, max) {
  return (min + (Math.random() * (max - min)));
};
