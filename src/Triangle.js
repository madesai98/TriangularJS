'use strict';

export default class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = [0, 0, 0];
    }

    getCenterX() {
        return (this.a.getX() + this.b.getX() + this.c.getX()) / 3;
    }

    getCenterY() {
        return (this.a.getY() + this.b.getY() + this.c.getY()) / 3;
    }
}