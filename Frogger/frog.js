export class Frog {
    constructor(game, size, speed, image) {
        this.game = game;
        
        this.size = size;
        this.speed = speed;

        this.width = this.size;
        this.height = this.size;

        this.x = (this.game.width - this.size) / 2; // Always appear centered horizontally
        this.y = this.game.height - this.size; // Always appear totally visible at the bottom

        this.dying = false;
        this.is_moving = false;
        this.is_key_pressed = false;
        this.movement_limit = this.size;
        
        this.rotation = 0;
        this.frame_coords = 0;
        this.image = image;
        
        this.hop_sound = new Audio("Hop.wav");
        this.hop_sound.loop = false;
        this.squash_sound = new Audio("Squash.wav");
        this.squash_sound.loop = false;
        this.plunk_sound = new Audio("Plunk.wav");
        this.plunk_sound.loop = false;
        this.win_sound = new Audio("Win.wav");
        this.win_sound.loop = false;

        window.addEventListener("keypress", this.handleKeyPress.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyPress(e) {
        if (this.is_moving || this.is_key_pressed || this.dying) return;
        
        const { x, y, size, movement_limit } = this;

        let new_x = x;
        let new_y = y;

        switch (e.key) {
            case "w":
                if (y > movement_limit / 4) {
                    new_y -= size;
                    this.rotation = 0;
                }
                break;
            case "a":
                if (x > movement_limit / 4) {
                    new_x -= size;
                    this.rotation = -Math.PI / 2;
                }
                break;
            case "s":
                if (y < canvas.height - movement_limit) {
                    new_y += size;
                    this.rotation = Math.PI;
                }
                break;
            case "d":
                if (x < canvas.width - movement_limit) {
                    new_x += size;
                    this.rotation = Math.PI / 2;
                }
                break;
        }

        if (new_x !== this.x || new_y !== this.y) {
            this.target_x = new_x;
            this.target_y = new_y;
            this.is_moving = true;
            this.is_key_pressed = true;

            this.hop_sound.currentTime = 0;
            this.hop_sound.play();

            this.frame_coords = 16;
        }
    }

    handleKeyUp(e) {
        switch (e.key) {
            case "w":
            case "a":
            case "s":
            case "d":
                this.is_key_pressed = false;
                break;
        }
    }

    checkCollision(obj, multiplier) {
        return (
            this.x + this.size * multiplier >= obj.x &&
            this.x + this.size * Math.abs(1 - multiplier) <= obj.x + obj.width &&
            this.y + this.size * multiplier >= obj.y &&
            this.y + this.size * Math.abs(1 - multiplier) <= obj.y + obj.height
        );
    }

    handleCollision(sound) {
        this.dying = true;
        sound.play();
        sound.addEventListener("ended", () => {
            window.location.reload();
        });
    }
    
    update() {
        if (this.dying) return;

        const carCollision = this.game.cars.some(car => this.checkCollision(car, 0.65));
        if (carCollision) {
            this.handleCollision(this.squash_sound);
            return;
        }
        const CollidedLog = this.game.logs.find(log => this.checkCollision(log, 0.65));
        if (this.checkCollision(this.game.water, 0.35) && !CollidedLog) {
            this.handleCollision(this.plunk_sound);
            return;
        } else if (CollidedLog) {
            this.x += CollidedLog.speed;
            this.target_x += CollidedLog.speed;
        }
        if (this.checkCollision(this.game.end, 0.35)) {
            this.handleCollision(this.win_sound);
            return;
        }

        
        if (!this.is_moving) return;
    
        const { x, y, target_x, target_y } = this;
    
        const incrementX = Math.sign(target_x - x) * this.speed;
        const incrementY = Math.sign(target_y - y) * this.speed;
    
        this.x += incrementX;
        this.y += incrementY;
    
        if (Math.abs(incrementX) > Math.abs(this.x - target_x)) this.x = target_x;
        if (Math.abs(incrementY) > Math.abs(this.y - target_y)) this.y = target_y;
    
        if (this.x === target_x && this.y === target_y) {
            this.is_moving = false;
            this.frame_coords = 0;
        }
    }
  
    draw(context) {
        context.save();
        context.translate(this.x + this.size / 2, this.y + this.size / 2);
        context.rotate(this.rotation);
        context.drawImage(this.image, this.frame_coords, 0, 16, 16, -this.size / 2, -this.size / 2, this.size, this.size);
        context.restore();
    }
}