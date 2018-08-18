"use strict";

import Color from "./Color"
import Point from "./Point"
import Triangle from "./Triangle"

export default class Triangular
{
	constructor(canvas, options = {})
	{
		this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.points = [];
        this.triangles = [];
        
        this.defaults = {
            widthMultiplier: 1.2,
            heightMultiplier: 1.2,
            horizontalDivisions: 10,
            verticalDivisions: 7,
            animationRangeX: 90,
            animationRangeY: 30,
            animationSpeed: 2000,
            color1: [53, 92,125],
            color2: [192, 108, 132],
            strokeModR: 1,
            strokeModG: 1,
            strokeModB: 1
        };

        this.settings = {};
        Object.keys(this.defaults).forEach(key => this.settings[key] = this.defaults[key]);
        Object.keys(options).forEach(key => this.settings[key] = options[key]);
		
        this.trackWindowSize();
        this.init();
        this.nextFrame();
	}
	
	nextFrame(currentTime)
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.update(currentTime);
		requestAnimationFrame(this.nextFrame.bind(this));
    }
    
    update(currentTime) {
        var x, y;
        for (x = 1; x < this.points.length - 1; x++) {
            for (y = 1; y < this.points[x].length - 1; y++) {
                var point = this.points[x][y];

                point.animModX = (
                    point.rangeMultiplierX * this.settings.animationRangeX * 
                    Math.sin(currentTime / (this.settings.animationSpeed * point.speedMultiplier))
                );
                point.animModY = (
                    point.rangeMultiplierY * this.settings.animationRangeY * 
                    Math.cos(currentTime / (this.settings.animationSpeed * point.speedMultiplier))
                );
            }
        }

        var t;
        for (t = 0; t < this.triangles.length; t++) {
            var triangle = this.triangles[t];
            this.context.beginPath();
            this.context.moveTo(triangle.a.getX(), triangle.a.getY());
            this.context.lineTo(triangle.b.getX(), triangle.b.getY());
            this.context.lineTo(triangle.c.getX(), triangle.c.getY());
            this.context.closePath();
            this.context.strokeStyle = `rgb(\
                ${Math.max(0, Math.min(255, Math.round(triangle.color[0] * this.settings.strokeModR)))},\
                ${Math.max(0, Math.min(255, Math.round(triangle.color[1] * this.settings.strokeModG)))},\
                ${Math.max(0, Math.min(255, Math.round(triangle.color[2] * this.settings.strokeModB)))}\
            )`;
            this.context.fillStyle = `rgb(${triangle.color[0]}, ${triangle.color[1]}, ${triangle.color[2]})`;
            this.context.stroke();
            this.context.fill();
        }
    }

	init()
	{
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.points = [];
        this.triangles = [];

        var x, y;
        
        for (x = 0; x <= this.settings.horizontalDivisions; x++) {
            this.points.push([]);
            for (y = 0; y <= this.settings.verticalDivisions; y++) {
                this.points[x].push(new Point(
                    x * (this.canvas.width / this.settings.horizontalDivisions),
                    y * (this.canvas.height / this.settings.verticalDivisions),
                    this.settings,
                    (x == 0 || x == this.settings.horizontalDivisions || y == 0 || y == this.settings.verticalDivisions)
                ));
            }
        }

        for (x = 0; x < this.settings.horizontalDivisions; x++) {
            for (y = 0; y < this.settings.verticalDivisions; y++) {
                var tri1 = new Triangle(this.points[x][y], this.points[x][y + 1], this.points[x + 1][y]),
                    tri2 = new Triangle(this.points[x + 1][y + 1], this.points[x][y + 1], this.points[x + 1][y]);

                tri1.color = Color.getColor(
                    tri1.getCenterX(), tri1.getCenterY(), 
                    0, 0, this.canvas.width, this.canvas.height, 
                    this.settings.color1, this.settings.color2
                );

                tri2.color = Color.getColor(
                    tri2.getCenterX(), tri2.getCenterY(), 
                    0, 0, this.canvas.width, this.canvas.height, 
                    this.settings.color1, this.settings.color2
                );

                this.triangles.push(tri1, tri2);
            }
        }

        var t;
        for (t = 0; t < this.triangles.length; t++) {
            var triangle = this.triangles[t];
            this.context.lineWidth = 1;
            this.context.lineCap = "butt";
            this.context.beginPath();
            this.context.moveTo(triangle.a.getX(), triangle.a.getY());
            this.context.lineTo(triangle.b.getX(), triangle.b.getY());
            this.context.lineTo(triangle.c.getX(), triangle.c.getY());
            this.context.closePath();
            this.context.strokeStyle = `rgb(\
                ${triangle.color[0] * this.settings.strokeModR},\
                ${triangle.color[1] * this.settings.strokeModG},\
                ${triangle.color[2] * this.settings.strokeModB}\
            )`;
            this.context.fillStyle = `rgb(${triangle.color[0]}, ${triangle.color[1]}, ${triangle.color[2]})`;
            this.context.stroke();
            this.context.fill();
        }
    }
	
	matchWindowSize() {
		this.canvas.width = this.canvas.parentElement.clientWidth * this.settings.widthMultiplier;
        this.canvas.height = this.canvas.parentElement.clientHeight * this.settings.heightMultiplier;

        var offsetX = (this.canvas.width - this.canvas.parentElement.clientWidth) / 2;
        var offsetY = (this.canvas.height - this.canvas.parentElement.clientHeight) / 2;

        this.canvas.style.position = 'absolute';
        this.canvas.style.left = -offsetX + 'px';
        this.canvas.style.top = -offsetY + 'px';

        this.init();
	}
	
	trackWindowSize() {
		this.matchWindowSize();
		window.addEventListener("resize", this.matchWindowSize.bind(this));
	}
}