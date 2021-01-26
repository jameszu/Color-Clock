// Main display
function addZero(c) 
{
    let num = c.toString();
    return num.length == 1 ? "0" + num : num;
}

function timeToHex(h, m, s)
{
    return "#" + addZero(h) + addZero(m) + addZero(s);
}

function HexToRgb(hex)
{
    // console.log(hex);
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return "rgb(" + addZero(r) + ","+ addZero(g) + "," + addZero(b) + ")";
}

function RgbToHsl(r, g, b)
{
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

        h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + addZero(h) + "," + addZero(s) + "%," + addZero(l) + "%)";
}

function rgbToCmyk(r, g, b)
{
    let c, m , y, k = 0;

    if (r == 0 && g == 0 && b == 0)
    {
        k = 1;
        return "cmyk(" + addZero(c) + "," + addZero(m) + "," + addZero(y) + "," + addZero(k) + ")";
    }
    c = 1 - (r / 255);
    m = 1 - (g / 255);
    y = 1 - (b / 255);

    let mincmy = (Math.min(c, Math.min(m, y)));

    c = (c - mincmy) / (1 - mincmy);
    m = (m - mincmy) / (1 - mincmy);
    y = (y - mincmy) / (1 - mincmy);
    k = mincmy;
    c = +(c * 100).toFixed(0);
    m = +(m * 100).toFixed(0);
    y = +(y * 100).toFixed(0);
    k = +(k * 100).toFixed();
    return "cmyk(" + addZero(c) + "," + addZero(m) + "," + addZero(y) + "," + addZero(k) + ")";
}


let date, hour, minute, second, colorTime;
let red, green, blue;

function showTime()
{
    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    // console.log(hour, minute, second);
    hexcolor = timeToHex(hour, minute, second);
    document.body.style.background = hexcolor;
    rgbcolor = HexToRgb(hexcolor);



    let bigint = parseInt(hexcolor.substring(1), 16);
    red = (bigint >> 16) & 255;
    green = (bigint >> 8) & 255;
    blue = bigint & 255;

    hslTime = RgbToHsl(red, green, blue);

    colorTime = addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);

    cmykTime = rgbToCmyk(red, green, blue);

    document.getElementById("time").innerHTML = colorTime;
    document.getElementById("hexcolor").innerHTML = hexcolor;
    document.getElementById("rgbcolor").innerHTML = rgbcolor;
    document.getElementById("hslcolor").innerHTML = hslTime;
    document.getElementById("cmykcolor").innerHTML = cmykTime;

    const slide = document.getElementById("slider");

    const ele = document.getElementById("changeColor");

    if (ele.checked)
    {
        slide.style.background = hexcolor;
    }
    else
    {
        slide.style.background = "red";

    }

    setTimeout(showTime, 500);  

}


showTime();


// Toggle Button setting

