export class Terrain {
    constructor(game, height, tile_size, height_column, frame, image){
        this.width = game.width * 1.1;
        this.height = height;
        this.tile_size = tile_size;

        this.columns = Math.floor(this.width / this.tile_size);
        this.rows = Math.floor(this.height / this.tile_size);

        this.x = 0;
        this.y = game.height - this.height * height_column;

        this.frame = frame;
        this.image = image;
    }

    draw(context) {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                context.drawImage( this.image, 16 * this.frame, 0, 16, 16, this.x + i * this.tile_size, this.y + j * this.tile_size, this.tile_size, this.tile_size);
            }
        }
    }
}