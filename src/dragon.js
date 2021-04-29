class Dragon {
    constructor(ctx) {
        this.ctx = ctx;
        this.tick = 0;

        this.x = 300
        this.y = 200

        this.vx = 0
        this.vy = 0
        this.ay = 0
        this.ax = 0
        this.g = 0.1

        this.w = 200;
        this.h = 80;

        this.img = new Image();
        this.img.src = "./Images/dragon.png"
        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.setListeners();
        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false,
            shoot: false
        }
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.width * this.img.frameIndex / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h,
        )
    }

    isLimit() {
        if (this.y + this.h >= this.ctx.canvas.height) {
            this.y = 420;
            this.vy = 0; //hay que igualar a 0 para que deje de acumularse
        }
        if (this.x + this.w >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w;
        }
        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
    }

    //se anima el pj, se pasan las acciones
    move() {
        this.animate();
        this.applyActions();
        // this.weapon.move();

        this.vx += this.ax;
        this.vy += this.ay;
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
        this.isLimit()
    }

    animate() {
        //necesitamos los ticks para medir el tiempo que cambiamos los frames y reset.
        if (this.tick++ >= 10) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        //resetamos los frames
        if (this.img.frameIndex >= 3) {
            this.img.frameIndex = 0;
        }
    }

    //Recogemos las teclas pulsadas de la clase Index.js
    setListeners() {
        document.onkeydown = e => this.onKeyEvent(e.keyCode, true)
        document.onkeyup = e => this.onKeyEvent(e.keyCode, false)
    }

    //Pasamos el code de las teclas pulsadas y "true" si se ha pulsado
    onKeyEvent(keyCode, action) {
        switch (keyCode) {
            case LEFT:
                this.actions.left = action
                break;

            case RIGHT:
                this.actions.right = action
                break;

            case UP:
                this.actions.up = action
                break;

            case DOWN:
                this.actions.down = action
                break;

            case SPACE:
                this.actions.shoot = action
                break;
        }
    }

    //Si se pulsa aumentamos o reducimos el avance y disparamos, lo pasamos a move()
    applyActions() {
        this.ay = this.actions.up ? -0.2 : 0;

        if (this.actions.left) {
            this.ax = -0.05;
        } else if (this.actions.right) {
            this.ax = 0.05;
        } else {
            this.vx *= 0.5;
        }

        if (this.actions.down) {
            this.x = 300;
            this.y = 350;
        }

        /*if(this.actions.shoot) {
            this.weapon.shoot();
        } */
    }
}