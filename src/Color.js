'use strict';

export default class Color {

    static interpolateLab(col1, col2, ratio = 0.5) {
        return[
            col1[0] + ratio * (col2[0] - col1[0]),
            col1[1] + ratio * (col2[1] - col1[1]),
            col1[2] + ratio * (col2[2] - col1[2])
        ];
    }

    // Via http://www.easyrgb.com/en/math.php
    static labToRgb(lab) {
        var y = (lab[0] + 16) / 116,
            x = lab[1] / 500 + y,
            z = y - lab[2] / 200;

        y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
        x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
        z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);
          
        var r = x *  3.2406 + y * -1.5372 + z * -0.4986,
            g = x * -0.9689 + y *  1.8758 + z *  0.0415,
            b = x *  0.0557 + y * -0.2040 + z *  1.0570;

        r = 255 * ((r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r);
        g = 255 * ((g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g);
        b = 255 * ((b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b);

        return [Math.max(0, Math.min(255, Math.round(r))), Math.max(0, Math.min(255, Math.round(g))), Math.max(0, Math.min(255, Math.round(b)))];
    }

    // Via http://www.easyrgb.com/en/math.php
    static rgbToLab(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;

        r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        var x = ((r * 0.4124) + (g * 0.3576) + (b * 0.1805)) / 0.95047,
            y = ((r * 0.2126) + (g * 0.7152) + (b * 0.0722)),
            z = ((r * 0.0193) + (g * 0.1192) + (b * 0.9505)) / 1.08883;

        x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
        y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
        z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

        return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
    }

    static getColor(x, y, xMin, yMin, xMax, yMax, col1, col2) {
        var xRatio = (x - xMin) / (xMax - xMin),
            yRatio = (y - yMin) / (yMax - yMin),
            ratio = (xRatio + yRatio) / 2;
        return Color.labToRgb(Color.interpolateLab(Color.rgbToLab(col1), Color.rgbToLab(col2), ratio));
    }
}