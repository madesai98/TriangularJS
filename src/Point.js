'use strict';

export default class Point {
    constructor(x, y, settings, pinned = false) {
        this.x0 = x;
        this.y0 = y;
        this.dx = Math.floor(Math.random() * settings.animationRangeX * 2) - settings.animationRangeX;
        this.dy = Math.floor(Math.random() * settings.animationRangeY * 2) - settings.animationRangeY;
        this.x = (!pinned) ? this.x0 + this.dx : this.x0;
        this.y = (!pinned) ? this.y0 + this.dy : this.y0;
        this.animModX = 0;
        this.animModY = 0;
        this.speedMultiplier = 2 * Math.random() + 1;
        this.rangeMultiplierX = 2 * Math.random() - 1;
        this.rangeMultiplierY = 2 * Math.random() - 1;
    }

    getX() {
        return this.x + this.animModX;
    }

    getY() {
        return this.y + this.animModY;
    }
}