class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("snake");
    this.context = this.canvas.getContext("2d");
    document.addEventListener("keydown", this.onKeyPress.bind(this));
    document.addEventListener("click", this.onClick.bind(this));
  }

  init() {
    this.positionX = this.positionY = 10;
    this.foodX = 2;
    this.foodY = 10;
    this.tailSize = 1;
    this.trail = [];
    this.gridSize = this.tileCount = 20;
    this.velocityX = this.velocityY = 0;
    this.playIt = true;

    this.timer = setInterval(this.loop.bind(this), 1000 / 10);

    this.brrr = new Audio("./media/sounds/brrr.mp3");
    this.fired = new Audio("./media/sounds/fired.mp3");
    this.uhm = new Audio("./media/sounds/uhm.mp3");

    this.left = document.getElementById("left");
    this.right = document.getElementById("right");
    this.up = document.getElementById("up");
    this.down = document.getElementById("down");
  }

  gameOver() {
    this.fired.play();
    alert(`Game ova...\r\nScore: ${this.tailSize}`);
    clearInterval(this.timer);
    this.setGameOver = false;
    game.init();
  }

  loop() {
    this.multi = false;
    this.update();
    this.draw();
  }

  setFood() {
    this.foodX = Math.floor(Math.random() * this.tileCount);
    this.foodY = Math.floor(Math.random() * this.tileCount);
    this.trail.forEach((t) => {
      if (this.foodX === t.positionX && this.foodY == t.positionY) {
        this.setFood();
      }
    });
  }

  update() {
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    if (this.positionX < 0) {
      this.positionX = this.tileCount - 1;
    }
    if (this.positionY < 0) {
      this.positionY = this.tileCount - 1;
    }
    if (this.positionX > this.tileCount - 1) {
      this.positionX = 0;
    }
    if (this.positionY > this.tileCount - 1) {
      this.positionY = 0;
    }

    this.trail.forEach((t) => {
      if (this.positionX === t.positionX && this.positionY === t.positionY) {
        if (this.setGameOver) {
          this.gameOver();
        }
      }
    });

    this.trail.push({
      positionX: this.positionX,
      positionY: this.positionY,
    });

    while (this.trail.length > this.tailSize) {
      this.trail.shift();
    }

    if (this.foodX === this.positionX && this.foodY === this.positionY) {
      this.tailSize++;
      this.uhm.play();
      this.foodX = Math.floor(Math.random() * this.tileCount);
      this.foodY = Math.floor(Math.random() * this.tileCount);
      this.trail.forEach((t) => {
        if (this.foodX === t.positionX && this.foodY == t.positionY) {
          this.setFood();
        }
      });
    }

    if (this.trail.length > 10) {
      clearInterval(this.timer);
      this.timer = setInterval(this.loop.bind(this), 1000 / 15);
    }

    if (
      this.trail.length > 10 &&
      this.trail.length <= 11 &&
      this.playIt === true
    ) {
      this.brrr.play();
      this.playIt = false;
    }
  }

  draw() {
    this.context.fillStyle = "hsl(180, 100%, 10%)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "white";
    this.context.font = "20px Arial";
    this.context.fillText(this.tailSize, 20, 40);

    this.context.fillStyle = "wheat";
    this.trail.forEach((t) => {
      this.context.fillRect(
        t.positionX * this.gridSize,
        t.positionY * this.gridSize,
        this.gridSize - 5,
        this.gridSize - 5
      );
    });

    this.context.fillStyle = "thistle";
    this.context.fillRect(
      this.foodX * this.gridSize,
      this.foodY * this.gridSize,
      this.gridSize - 5,
      this.gridSize - 5
    );
  }

  onClick() {
    this.left.onclick = () => {
      if (this.velocityX !== 1) {
        this.velocityX = -1;
        this.velocityY = 0;
        this.multi = true;
        this.setGameOver = true;
      }
    };
    this.up.onclick = () => {
      if (this.velocityY !== 1) {
        this.velocityX = 0;
        this.velocityY = -1;
        this.multi = true;
        this.setGameOver = true;
      }
    };
    this.right.onclick = () => {
      if (this.velocityX !== -1) {
        this.velocityX = 1;
        this.velocityY = 0;
        this.multi = true;
        this.setGameOver = true;
      }
    };
    this.down.onclick = () => {
      if (this.velocityY !== -1) {
        this.velocityX = 0;
        this.velocityY = 1;
        this.multi = true;
        this.setGameOver = true;
      }
    };
  }

  onKeyPress(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40 && !this.multi) {
      if (e.keyCode === 37 && this.velocityX !== 1) {
        this.velocityX = -1;
        this.velocityY = 0;
        this.multi = true;
        this.setGameOver = true;
      }
      if (e.keyCode === 38 && this.velocityY !== 1) {
        this.velocityX = 0;
        this.velocityY = -1;
        this.multi = true;
        this.setGameOver = true;
      }
      if (e.keyCode === 39 && this.velocityX !== -1) {
        this.velocityX = 1;
        this.velocityY = 0;
        this.multi = true;
        this.setGameOver = true;
      }
      if (e.keyCode === 40 && this.velocityY !== -1) {
        this.velocityX = 0;
        this.velocityY = 1;
        this.multi = true;
        this.setGameOver = true;
      }
    }
  }
}
const game = new SnakeGame();
window.onload = () => {
  game.init();
};
