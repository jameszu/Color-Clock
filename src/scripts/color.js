
function componentToHex(c) 
{
    let hex = c.toString();
    return hex.length == 1 ? "0" + hex : hex;
}

function timeToHex(h, m, s)
{
    return "#" + componentToHex(h) + componentToHex(m) + componentToHex(s);
}

function HexToRgb(hex)
{
    // console.log(hex);
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return "rgb(" + r + ","+ g + "," + b + ")";
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

    return "hsl(" + h + "," + s + "%," + l + "%)";
}
let date, hour, minute, second, color, colorTime;
let red, green, blue;

function showTime()
{
    date = new Date();
    hour    = date.getHours();
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

    if (hour<=9) hour = '0' + hour;
    if (minute<=9) minute = '0' + minute;
    if (second<=9) second = '0' + second;
    colorTime = hour + ":" + minute + ":" + second;


    document.getElementById("time").innerHTML = colorTime;
    document.getElementById("hexcolor").innerHTML = hexcolor;
    document.getElementById("rgbcolor").innerHTML = rgbcolor;
    document.getElementById("hslcolor").innerHTML = hslTime;
    setTimeout(showTime, 500);

}


// function initColorPicker() 
// {
//     var canvas = document.getElementById('colorCanvas');
//     var canvasContext = canvas.getContext('2d');
  
//     let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0)
//     gradient.addColorStop(0, '#ff0000')
//     gradient.addColorStop(1 / 6, '#ffff00')
//     gradient.addColorStop((1 / 6) * 2, '#00ff00')
//     gradient.addColorStop((1 / 6) * 3, '#00ffff')
//     gradient.addColorStop((1 / 6) * 4, '#0000ff')
//     gradient.addColorStop((1 / 6) * 5, '#ff00ff')
//     gradient.addColorStop(1, '#ff0000')
//     canvas.getContext('2d').fillStyle = gradient
//     canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
  
//     gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
//     gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
//     gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
//     gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
//     canvas.getContext('2d').fillStyle = gradient
//     canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
  
//     gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
//     gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
//     gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
//     gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
//     canvas.getContext('2d').fillStyle = gradient
//     canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
  
  
//     canvas.onclick = function(e) {
//         console.log()
//       var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1)
//       var rgba = imgData.data;
//       var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
//       console.log("%c" + color, "color:" + color)
//     }
// }
  
// initColorPicker()
showTime();