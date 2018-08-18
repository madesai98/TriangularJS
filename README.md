# TriangularJS

A canvas powered background generator. Triangles are randomly generated using Delaunay triangulation and animated via customizable parameters.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

First, clone or download the repository however you'd like.

```
git clone https://github.com/madesai98/TriangularJS
```

Enter the directory where the project was cloned to and install the required dependencies.

```
npm install
```

By this point everything should be installed correctly, so you can start up Gulp which will watch for any changes in the source files and build automatically.

```
npm start
```

All related source files to the plugin are in the src/ directory while the built file ends up in the build/ directory.


### Usage

Simply grab the Triangular.js file from the build/ directory and link it in your desired HTML file. Check out the [demo](https://github.com/madesai98/TriangularJS/blob/master/demo/Triangular.html) or the following code for more information.

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Triangular Demo</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas id="triangular"></canvas>
    </body>
    <script src="../build/Triangular.js"></script>
    <script>
        new Triangular(document.getElementById("triangular"), {
            widthMultiplier: 1.2,
            heightMultiplier: 1.2,
            horizontalDivisions: 10,
            verticalDivisions: 7,
            animationRangeX: 90,
            animationRangeY: 30,
            animationSpeed: 2000,
            color1: [53, 92, 125],
            color2: [192, 108, 132],
            strokeModR: 1,
            strokeModG: 1,
            strokeModB: 1
        });
    </script>
</html>
```

### Options

Canvas setup:

```
widthMultiplier: Multiplied by the width of the parent object's width to determine the width of the canvas. This is done to ensure the triangles have enough room to animate without showing blank spots. (Default is 1.2)

heightMultiplier: Multiplied by the height of the parent object's width to determine the height of the canvas. This is done to ensure the triangles have enough room to animate without showing blank spots. (Default is 1.2)
```

Triangle sizing:

```
horizontalDivisions: The number of columns of vertices used in the triangulation process. The higher the number, the more triangles there will be, but each one will get smaller on the horizontal axis. (Default is 10)

verticalDivisions: The number of rows of vertices used in the triangulation process. The higher the number, the more triangles there will be, but each one will get smaller on the vertical axis. (Default is 7)
```

Animation:

```
animationRangeX: How far each vertex can move on the horizontal axis from its starting position. The higher the number, the more it can move. (Default is 90)

animationRangeY: How far each vertex can move on the vertical axis from its starting position. The higher the number, the more it can move. (Default is 30)

animationSpeed: How fast the points move while animating. The higher the number, the slower the animation. (Default is 2000)
```

Triangle color (Uses LAB color space to make a linear gradient between the top left triangle and the bottom right triangle):

```
color1: The color of the top left triangle on the canvas in RGB. (Default is [53, 92, 125])

color2: The color of the bottom right triangle on the canvas in RGB. (Default is [192, 108, 132])
```

Stroke color (Derives its color from the triangle the line is a part of):

```
strokeModR: Multiplied by the R channel of the RGB color value for the triangle the line is a part of. (Default is 1)

strokeModG: Multiplied by the G channel of the RGB color value for the triangle the line is a part of. (Default is 1)

strokeModB: Multiplied by the B channel of the RGB color value for the triangle the line is a part of. (Default is 1)
```

## Built With

* [NPM](https://www.npmjs.com/) - Dependency management
* [Babel](https://babeljs.io/) - JS compiling
* [Gulp](https://gulpjs.com/) - Build automation

## Authors

* **Mihir Desai** - *Initial work* - [madesai98](https://github.com/madesai98)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details