/**
 * Привет! Перед тобой довольно интересное задание :)
 * По времени ты не ограничен, но его надо будет зафиксировать.
 * Время выполнения никак не скажется на результате оценки.
 * Желательно результат работы выложить на github.
 * 
 * Задание:
 * 
 * - Создать поле 6x4 (WxH) из 24х квадратов используя PixiJS (https://www.pixijs.com/)
 * - Написать алгоритм который будет рисовать на этом поле  (!) ломанные линии (!) через центры квадратов
 * - На вход можно подать как одну линию так и набор, все должны быть отрисованы разными цветами
 * - Вся сцена должна быть адаптивной и должна реагировать на resize окна
 * - Линии должны задаваться одномерным массивом вида [0,1,2,..,W], где 
 *      индекс значения массива говорит о колонке на поле, 
 *      а значение говорит о строке
 * 
 * Примеры входящих параметров и подсветка тех квадратов, через которые должны пройти отдельные линии на поле:
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │  ▆ ▆ ▆ ▆ ▆ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▆ ▆ ▆ ▆ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▢ ▆ ▢ ▆ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▆ ▆ ▆ ▆ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▢ ▆ ▢ ▆  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▆ ▆ ▆ ▆ ▆   ▢ ▢ ▢ ▢ ▢ ▢  │
 * ├───────────────────────────────────────────────────────────────────────┤
 * │  ▆ ▢ ▆ ▢ ▆ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▢ ▆ ▢ ▆   ▢ ▢ ▢ ▢ ▢ ▢  │
 * │  ▢ ▆ ▢ ▆ ▢ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▢ ▆ ▢ ▆   ▆ ▢ ▆ ▢ ▆ ▢   ▢ ▢ ▢ ▢ ▢ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▢ ▆ ▢ ▆ ▢   ▆ ▢ ▆ ▢ ▆ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▢ ▆ ▢ ▆  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▢ ▆ ▢ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▢ ▆ ▢ ▆ ▢  │
 * ├───────────────────────────────────────────────────────────────────────┤
 * │  ▆ ▢ ▢ ▢ ▢ ▆   ▢ ▆ ▆ ▆ ▆ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▆ ▆ ▢ ▢  │
 * │  ▢ ▆ ▆ ▆ ▆ ▢   ▆ ▢ ▢ ▢ ▢ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▢ ▢ ▢ ▢ ▆   ▢ ▆ ▆ ▆ ▆ ▢   ▢ ▢ ▢ ▢ ▢ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▆ ▆ ▆ ▆ ▢   ▆ ▢ ▢ ▢ ▢ ▆   ▆ ▆ ▢ ▢ ▆ ▆  │
 * ├───────────────────────────────────────────────────────────────────────┤
 * │  ▆ ▆ ▢ ▢ ▆ ▆   ▆ ▆ ▢ ▢ ▆ ▆   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▆ ▆ ▢ ▢  │
 * │  ▢ ▢ ▆ ▆ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▆ ▢ ▢ ▢ ▢ ▆   ▢ ▆ ▢ ▢ ▆ ▢  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▆ ▆ ▢ ▢   ▢ ▆ ▢ ▢ ▆ ▢   ▆ ▢ ▢ ▢ ▢ ▆  │
 * │  ▢ ▢ ▢ ▢ ▢ ▢   ▢ ▢ ▆ ▆ ▢ ▢   ▆ ▆ ▢ ▢ ▆ ▆   ▢ ▢ ▆ ▆ ▢ ▢   ▢ ▢ ▢ ▢ ▢ ▢  │
 * └───────────────────────────────────────────────────────────────────────┘
 * 
 * const lines = [
 *     [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2], [3, 3, 3, 3, 3, 3],
 *     [1, 2, 1, 2, 1, 2], [0, 1, 0, 1, 0, 1], [2, 3, 2, 3, 2, 3], [2, 1, 2, 1, 2, 1],
 *     [1, 0, 1, 0, 1, 0], [3, 2, 3, 2, 3, 2], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1],
 *     [2, 3, 3, 3, 3, 2], [3, 2, 2, 2, 2, 3], [3, 3, 0, 0, 3, 3], [0, 0, 1, 1, 0, 0],
 *     [0, 0, 3, 3, 0, 0], [3, 3, 2, 2, 3, 3], [1, 2, 3, 3, 2, 1], [2, 1, 0, 0, 1, 2]
 * ]
 * 
 * Пиши аккуратно, перед коммитом перечитай еще раз свой код ;)
 * 
 * Желаю удачи!
 */

import LinesRenderer from './test.js';

import './scss/style.scss';

document.addEventListener("DOMContentLoaded", () => {
    let linesRenderer = new LinesRenderer();
    linesRenderer.refresh();

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector(".app").appendChild(linesRenderer.app.view);

    let linesInput = document.getElementById("linesInput");
    let submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", () => {
        try {
            let lines = JSON.parse(linesInput.value);

            if(typeof lines[0] !== "object") {
                linesRenderer.lines = [lines];
                linesRenderer.colors = [Math.random() * 0xFFFFFF];
            } else {
                linesRenderer.lines = lines;
                linesRenderer.colors = [];
                for (let i = 0; i < lines.length; i++) {
                    linesRenderer.colors[i] = Math.random() * 0xFFFFFF;
                }
            }
            linesRenderer.refresh();
        } catch (error) {
            alert("Ошибка. Не удалось преобразовать JSON.");
        }
    });
});