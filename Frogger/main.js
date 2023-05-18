import { Frog } from "./frog.js";
import { Terrain } from "./terrain.js";
import { Car } from "./car.js";
import { Log } from "./log.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    this.music = new Audio("Music.mp3");
    this.music.volume = 0.25;
    this.music.loop = true;
    this.music.play(); 

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;

            this.spritesheet = document.getElementById("spritesheet");

            this.frog = new Frog(this, 40, 2.75, this.spritesheet);

            // game, height, tile_size, height_column, frame, image
            this.water = new Terrain(this, 160, 40, 2.75, 5, this.spritesheet)
            this.end = new Terrain(this, 40, 40, 13, 4, this.spritesheet),
            this.terrains = [
                this.water,
                new Terrain(this, 40, 40, 2, 2, this.spritesheet),
                new Terrain(this, 40, 40, 7, 2, this.spritesheet),
                new Terrain(this, 40, 40, 12, 3, this.spritesheet),
                this.end,
            ]
            
            // game, width, height, speed, width_row, height_column, frame, image
            this.car_row1_speed = -1;
            this.car_row2_speed = 1.2;
            this.car_row3_speed = -0.9;
            this.car_row4_speed = 0.8;
            this.cars = [
                new Car(this, 40, 40, this.car_row1_speed, 0, 3, 0, this.spritesheet),
                new Car(this, 40, 40, this.car_row1_speed, 3, 3, 0, this.spritesheet),
                new Car(this, 40, 40, this.car_row1_speed, 6, 3, 0, this.spritesheet),
                new Car(this, 40, 40, this.car_row1_speed, 9, 3, 0, this.spritesheet),
                new Car(this, 40, 40, this.car_row1_speed, 12, 3, 0, this.spritesheet),

                new Car(this, 40, 40, this.car_row2_speed, 0, 4, 1, this.spritesheet),
                new Car(this, 40, 40, this.car_row2_speed, 4, 4, 1, this.spritesheet),
                new Car(this, 40, 40, this.car_row2_speed, 8, 4, 1, this.spritesheet),
                new Car(this, 40, 40, this.car_row2_speed, 12, 4, 1, this.spritesheet),

                new Car(this, 80, 40, this.car_row3_speed, 0, 5, 4, this.spritesheet),
                new Car(this, 80, 40, this.car_row3_speed, 2, 5, 4, this.spritesheet),
                new Car(this, 80, 40, this.car_row3_speed, 3.5, 5, 4, this.spritesheet),
                new Car(this, 80, 40, this.car_row3_speed, 6, 5, 4, this.spritesheet),

                new Car(this, 40, 40, this.car_row4_speed, 0, 6, 2, this.spritesheet),
                new Car(this, 40, 40, this.car_row4_speed, 2.5, 6, 2, this.spritesheet),
                new Car(this, 40, 40, this.car_row4_speed, 5, 6, 2, this.spritesheet),
                new Car(this, 40, 40, this.car_row4_speed, 8, 6, 2, this.spritesheet),
                new Car(this, 40, 40, this.car_row4_speed, 10.5, 6, 2, this.spritesheet),
            ];

            // game, width, height, speed, width_row, height_column, frame, can_rotate, image
            // can_rotate es una mecanica no utilizada para otros posibles elementos aquaticos como las tortugas
            this.log_row1_speed = 0.8;
            this.log_row2_speed = -5;
            this.log_row3_speed = 1.5;
            this.log_row4_speed = -0.5;
            this.logs = [
                new Log(this, 120, 40, this.log_row1_speed, 0, 8, 0, false, this.spritesheet),
                new Log(this, 120, 40, this.log_row1_speed, 2, 8, 0, false, this.spritesheet),
                new Log(this, 120, 40, this.log_row1_speed, 4, 8, 0, false, this.spritesheet),

                new Log(this, 120, 40, this.log_row2_speed, 0, 9, 0, false, this.spritesheet),
                new Log(this, 120, 40, this.log_row2_speed, 3, 9, 0, false, this.spritesheet),

                new Log(this, 80, 40, this.log_row3_speed, 0, 10, 3, false, this.spritesheet),
                new Log(this, 80, 40, this.log_row3_speed, 3, 10, 3, false, this.spritesheet),
                new Log(this, 80, 40, this.log_row3_speed, 6, 10, 3, false, this.spritesheet),
                new Log(this, 80, 40, this.log_row3_speed, 9, 10, 3, false, this.spritesheet),

                new Log(this, 120, 40, this.log_row4_speed, 0, 11, 0, false, this.spritesheet),
            ];
        }
        update(){
            this.frog.update();
            if (this.frog.dying) return;

            for (const car of this.cars) {
                car.update();
            }

            for (const log of this.logs) {
                log.update();
            }
        }

        draw(context){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = false;

            for (const terrain of this.terrains) {
                terrain.draw(context)
            }

            for (const log of this.logs) {
                log.draw(context)
            }

            this.frog.draw(context);
            
            for (const car of this.cars) {
                car.draw(context)
            }

        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate(){
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});