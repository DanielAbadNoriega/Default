class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.tick = 0;

        this.bg = new Background(ctx);
        this.dragon = new Dragon(ctx)
    }

    start() {
        this.intervalId = setInterval(()=>{
            this.clear();
            this.move();
            this.draw();
            
            
        },1000/60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.bg.draw();
        this.dragon.draw()
    }

    move() {
        this.bg.move();
        this.dragon.move();
    }

    checkCollisions() {

    }

    onKeyEvent(event) {
    }
/*     gameOver() {
        clearInterval(this.intervalId)

        this.ctx.font = "40px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "GAME OVER",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
    } */
}