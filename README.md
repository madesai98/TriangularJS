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
        new Triangular(document.getElementById("triangular"));
    </script>
</html>
```

## Built With

* [NPM](https://www.npmjs.com/) - The web framework used
* [Babel](https://babeljs.io/) - Dependency Management
* [Gulp](https://gulpjs.com/) - Used to generate RSS Feeds

## Authors

* **Mihir Desai** - *Initial work* - [madesai98](https://github.com/madesai98)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details