import * as PIXI from 'pixi.js'

/**
 * Набор методов, реализующих алгоритм который будет рисовать на поле 6x4 (WxH) из 24х квадратов ломанные линии через центры квадратов.
 */
class LinesRenderer {
    /**
     * Создаёт холст, подгоняет его под размер контейнера и инициализирует поля для линий и их цветов.
     */
    constructor() {
        //Create a Pixi Application
        this.app = new PIXI.Application({ 
            width: 600,
            height: 400,
            antialias: true,
            backgroundAlpha: 0,
            resolution: 1
            }
        );

        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;

        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });

        this.lines = [];
        this.colors = [];

        this.resizeCanvas();
    }

    /**
     * Изменяет размеры холста под ширину родительского элемента и перерисовывает его заново.
     */
    resizeCanvas() {
        let newWidth = document.querySelector(".app").clientWidth;
        let newHeight = newWidth / 6 * 4;
        this.app.renderer.resize(newWidth, newHeight);

        this.cellWidth = newWidth / 6;

        this.refresh();
    }

    /**
     * Перерисовывает холст.
     */
    refresh() {
        this.app.stage.removeChildren();
        this.drawSquares(6, 4);
        this.drawLines(this.lines, this.colors);
    }

    /**
     * Рисует квадраты на холсте.
     * @param {number} width Количество квадратов по горизонтали.
     * @param {number} height Количество квадратов по вертикали.
     */
    drawSquares(width, height) {
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                let rectangle = new PIXI.Graphics();
    
                rectangle.lineStyle(2, 0x101010, 1);
                rectangle.drawRect(10 + this.cellWidth * i, 10 + this.cellWidth * j, this.cellWidth - 20, this.cellWidth - 20);
                rectangle.endFill();
    
                this.app.stage.addChild(rectangle);
            }
        }
    }

    /**
     * Рисует одну ломанную линию через центры квадратов.
     * @param {Array} points Одномерный массив вида [0,1,2,..,W], где индекс значения массива говорит о колонке на поле, а значение говорит о строке.
     * @param {number} color Шестнадцатеричное число вида 0x******, задающее цвет линии.
     */
    drawSingleLine(points, color) {
        let line = new PIXI.Graphics();
        line.lineStyle(4, color, 1);
        line.moveTo(this.cellWidth / 2, points[0] * this.cellWidth + this.cellWidth / 2);
        for (let i = 1; i < points.length; i++) {
            line.lineTo(i * this.cellWidth + this.cellWidth / 2, points[i] * this.cellWidth + this.cellWidth / 2);
        }
        line.x = 0;
        line.y = 0;
        this.app.stage.addChild(line);
    }

    /**
     * Рисует множество линий на холсте
     * @param {Array} lines Массив линий.
     * @param {Array} colors Массив цветов.
     */
    drawLines(lines, colors) {
        for (let i = 0; i < lines.length; i++) {
            this.drawSingleLine(lines[i], colors[i]);
        }
    }
}

export default LinesRenderer;