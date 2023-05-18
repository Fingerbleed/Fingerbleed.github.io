export class Log {
    constructor(game, width, height, speed, width_row, height_column, frame, can_rotate, image){
        this.game = game;

        this.speed = speed;
        
        this.width = width;
        this.height = height;

        this.x = -this.width + this.width * width_row;
        this.y = game.height - this.height * height_column;

        this.rotation = speed < 0 ? Math.PI : 0;
        if (!can_rotate) this.rotation = 0
        this.frame = frame;
        this.image = image;
    }

    update(){
        if (this.speed == 0) return;

        this.x += this.speed;
        if (this.x > this.game.width + this.width) this.x = -this.width;
        else if (this.x < -this.width) this.x = this.game.width + this.width;
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.rotation);
        context.drawImage(this.image, 16 * this.frame, 32, 16 * (this.width / this.height), 16, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}