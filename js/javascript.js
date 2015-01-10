function arrayForBar(size) {
    this.getRandom = function (minEl, maxEl) {
        return Math.random() * (maxEl - minEl) + minEl;
    }

    this.value = size;

    this.mas = new Array(size);
    this.masPercent = new Array(size);

    this.FullArray = function () {
        for (var j = 0; j < size; j++) {
            this.mas[j] = this.getRandom(20, 40).toFixed(2);
        }
    }

    this.getPercent = function (off, newmas) {
        off = off || false;
        newmas = newmas || 0;
        if (off == false) {
            var ceilMax = Math.ceil(this.maxElement());
            if (ceilMax < 100)
                ceilMax = (Math.round((ceilMax / 10)) + 1) * 10;
            else if (ceilMax >= 100)
                ceilMax = (Math.round((ceilMax / 100)) + 1) * 100;

            for (var u = 0; u < size; u++) {
                this.masPercent[u] = this.mas[u] / ceilMax;
            }
        }
        else {
            var ceilMax = Math.ceil(this.maxElement(true, newmas));
            if (ceilMax < 100)
                ceilMax = (Math.round((ceilMax / 10)) + 1) * 10;
            else if (ceilMax >= 100)
                ceilMax = (Math.round((ceilMax / 100)) + 1) * 100;

            for (var u = 0; u < size; u++) {
                this.masPercent[u] = this.mas[u] / ceilMax;
            }
        }

    }

    this.maxElement = function (on, newMax) {
        on = on || false;
        newMax = newMax || 0;
        var maxEl = this.mas[0];
        if (on == false) {
            for (var i = 0; i < size; i++) {
                if (maxEl <= parseInt(this.mas[i]))
                    maxEl = this.mas[i];
            }
        }
        else {
            for (var i1 = 0; i1 < size; i1++) {
                if (maxEl <= parseInt(this.mas[i1]))
                    maxEl = this.mas[i1];
            }
            if (maxEl <= newMax) maxEl = newMax;
        }
        return maxEl;
    }
}


var canvas = document.getElementById("GraphBarFirst"),
    ctx = canvas.getContext('2d');
canvas.width = 650;
canvas.height = 358;

var arr = new arrayForBar(6);
var arrTwo = new arrayForBar(6);
arr.FullArray();
arrTwo.FullArray();
arr.getPercent(true, arrTwo.maxElement());
arrTwo.getPercent(true, arr.maxElement());

function DrawLines() {
    ctx.beginPath();
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.moveTo(2, 348);
    ctx.lineTo(640, 348);

    ctx.moveTo(25, 332);
    ctx.lineTo(650, 332);
    ctx.stroke();

    ctx.moveTo(10, 356);
    ctx.lineTo(10, 10);

    ctx.moveTo(25, 332);  // Draw Axis
    ctx.lineTo(25, 0);
    ctx.stroke();

    ctx.moveTo(25, 0); // Draw splitter
    ctx.lineTo(10, 10);
    ctx.lineTo(2, 10);
    ctx.moveTo(24, 0);
    ctx.lineTo(650, 0);
    ctx.moveTo(650, 0);
    ctx.lineTo(650, 334);
    ctx.stroke();

    ctx.moveTo(25, 87); // Draw splitter
    ctx.lineTo(10, 97);
    ctx.moveTo(10, 97);
    ctx.lineTo(2, 97);
    ctx.moveTo(24, 87);
    ctx.lineTo(650, 87);
    ctx.stroke();

    ctx.moveTo(25, 174); // Draw splitter
    ctx.lineTo(10, 184);
    ctx.moveTo(10, 184);
    ctx.lineTo(2, 184);
    ctx.moveTo(25, 174);
    ctx.lineTo(650, 174);
    ctx.stroke();

    ctx.moveTo(25, 261); // Draw splitter
    ctx.lineTo(10, 271);
    ctx.moveTo(10, 271);
    ctx.lineTo(2, 271);
    ctx.moveTo(25, 261);
    ctx.lineTo(650, 261);
    ctx.stroke();

    ctx.moveTo(25, 332); // Draw splitter
    ctx.lineTo(10, 348);
    ctx.stroke();

    ctx.fillStyle = "#dcddde";
    ctx.moveTo(25, 332); // Draw splitter
    ctx.lineTo(10, 348);
    ctx.lineTo(640, 348);
    ctx.lineTo(650, 332);
    ctx.lineTo(25, 332);
    ctx.fill();

    ctx.moveTo(640, 348);
    ctx.lineTo(650, 332);
    ctx.stroke();

    ctx.closePath();
}

var yFill = 0, kol = 0;
var DrawBox = function (obj, offset, color) {
    var distance = 650 / obj.value;

    function Animate(d, distance, offset) {
        ctx.beginPath();
        var linearGradient = ctx.createLinearGradient(d * distance + offset, 348, d * distance + offset + 30, 348 + yFill);
        linearGradient.addColorStop(0, color);
        linearGradient.addColorStop(0.2, color);
        linearGradient.addColorStop(1, "#f4f4eb");
        ctx.fillStyle = linearGradient;
        ctx.strokeStyle = color;

        yFill--;
        ctx.fillRect(d * distance + offset, 348, 30, yFill);
        ctx.strokeRect(d * distance + offset, 348, 30, yFill);
        ctx.closePath();
        if (yFill < -obj.masPercent[d] * 318) {
            clearInterval(int[d]);
            if (kol == 0) {
                DrawText(arr, 30, "#636465");
                DrawText(arrTwo, 65, "#636465");
                kol++;
            }
        }
    }

    var int = new Array(6);
    for (var i = 0; i < obj.value; i++) {
        int[i] = setInterval(Animate, 100, i, distance, offset);
    }

}

var DrawDigit = function (obj) {
    var Maxceil = Math.ceil(obj.maxElement());
    if (Maxceil < 100)
        Maxceil = (Math.ceil((Maxceil / 10)) + 1) * 10;
    else if (Maxceil >= 100)
        Maxceil = (Math.ceil((Maxceil / 100)) + 1) * 100;
    var middle = Math.ceil(obj.maxElement() / 3);

    var parent = document.getElementById('barFirst');

    for (var l = 0; l < 4; l++) {
        var div = document.createElement('div');
        div.className = 'class';
        div.innerHTML = String(middle * (l + 1));
        div.style.top = String(528 - l * 88) + 'px';
        parent.appendChild(div);
    }
    var divNull = document.createElement('div');
    divNull.className = 'class';
    divNull.innerHTML = String(0);
    divNull.style.top = String(604) + 'px';
    parent.appendChild(divNull);


}


var DrawText = function (obj, offset, color) {
    var distance = 650 / obj.value;

    ctx.strokeStyle = color;
    ctx.font = "11px Verdana";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#636465";

    for (var d = 0; d < obj.value; d++) {
        ctx.fillText(obj.mas[d], d * distance + offset, 348 - obj.masPercent[d] * 318 - 20);
        if (d != 0) {
            ctx.beginPath();
            ctx.moveTo(d * distance + 10, 332);
            ctx.lineTo(d * distance, 348);
            ctx.moveTo(d * distance, 348);
            ctx.lineTo(d * distance, 358);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.fillText("Period " + String(d + 1), d * distance + 30, 358);
    }

    ctx.fillText("justo, fringilla vel, aliquet nec, vulputate eget, arcu.", 350, 20);
    ctx.fillText("In enim justo, rhoncut", 350, 40);
}


//------------------------------------End Draw box---------------------------------------------------//

var canvasGraph = document.getElementById("GraphBarSecond"),
    context = canvasGraph.getContext('2d');
canvasGraph.width = 660;
canvasGraph.height = 570;

var CreateAxis = function () {
    context.beginPath();
    context.strokeStyle = "#999999";
    context.lineWidth = 1;
    context.moveTo(30, 500); //y
    context.lineTo(30, 10);

    context.moveTo(650, 490);  //x
    context.lineTo(20, 490);
    context.stroke();
    var iteration = 10;
    for (var y = 0; y < 10; y++) {
        iteration--;
        context.moveTo(30, y * 48.18 + 10);
        context.lineTo(22, y * 48.18 + 10);
        context.stroke();

        context.font = "11px Verdana";
        context.lineWidth = 1;
        context.fillStyle = "#636465";
        context.fillText(iteration + 1, 3, y * 48.18 + 14);
    }

    iteration = 10;
    for (var x = 0; x < 15; x++) {
        context.moveTo((x + 1) * 42 + 20, 490);
        context.lineTo((x + 1) * 42 + 20, 498);
        context.stroke();

        context.font = "11px Verdana";
        context.lineWidth = 1;
        context.fillStyle = "#636465";
        context.fillText(x + 1, (x + 1) * 42 + 15, 514);
    }

    context.fillText(0, 5, 493);
    context.fillText(0, 25, 515);
    context.closePath();
}


var matrix = [
    [0, 7.7],
    [1, 6.9],
    [2, 6.20],
    [3, 6],
    [4, 5.70],
    [5, 5.61],
    [6, 5.52],
    [7, 5.20],
    [8, 5.30],
    [9, 5.20],
    [10, 5],
    [11, 5.11],
    [12, 5],
    [13, 4.90],
    [14, 4.60],
    [15, 4.11]
];
var matrix1 = [
    [0, 7.3],
    [1, 6.2],
    [2, 6],
    [3, 6.08],
    [4, 5.40],
    [5, 5.21],
    [6, 5.32],
    [7, 5.20],
    [8, 5],
    [9, 5.10],
    [10, 4.80],
    [11, 4.20],
    [12, 4],
    [13, 3.90],
    [14, 3.60],
    [15, 3.11]
];
var matrix2 = [
    [0, 5.3],
    [1, 5.2],
    [2, 5.4],
    [3, 5.08],
    [4, 4.90],
    [5, 4.81],
    [6, 4.52],
    [7, 4.30],
    [8, 4.11],
    [9, 4],
    [10, 3.80],
    [11, 3.60],
    [12, 3.50],
    [13, 3.20],
    [14, 3.30],
    [15, 3]
];

function DrawGraph(mat, colorGraph) {
    var relation = new Array(16);
    for (var rel = 0; rel < 16; rel++) {
        relation[rel] = new Array(2);
    }

    for (var m = 0; m < 16; m++) {
        relation[m][1] = 490 - (mat[m][1] * 48.18);
    }
    for (var n = 0; n < 16; n++) {
        relation[n][0] = (mat[n][0]) * 42 + 30;
    }

    context.beginPath();
    context.strokeStyle = colorGraph;
    context.lineWidth = 3;
    for (var m1 = 0; m1 < 16; m1++) {
        context.moveTo(relation[m1][0], relation[m1][1]);
        if (m1 != 15) context.lineTo(relation[m1 + 1][0], relation[m1 + 1][1]);
        context.stroke();
    }

    context.closePath();

    context.beginPath();
    context.strokeStyle = colorGraph;
    context.lineWidth = 2;
    for (var m1 = 0; m1 < 16; m1++) {

        context.moveTo(relation[m1][0], relation[m1][1] - 10);
        context.lineTo(relation[m1][0], relation[m1][1] + 10);
        context.stroke();

        context.moveTo(relation[m1][0] - 5, relation[m1][1] - 10);
        context.lineTo(relation[m1][0] + 5, relation[m1][1] - 10);
        context.stroke();

        context.moveTo(relation[m1][0] - 5, relation[m1][1] + 10);
        context.lineTo(relation[m1][0] + 5, relation[m1][1] + 10);
        context.stroke();
    }

    context.closePath();

}


var clientWidth = 30;
function AnimatedGraph() {
    clientWidth = clientWidth + 4;
    DrawGraph(matrix, "#77787b");
    DrawGraph(matrix1, "#9e508b");
    DrawGraph(matrix2, "#99a048");
    context.clearRect(clientWidth, 0, 660, 480);

    if (clientWidth >= 660) {
        clearInterval(interval, 1);
        context.beginPath();
        context.fillStyle = "#999999";
        for (var point = 10; point < 490; point++) {
            if (point % 2 == 0) continue;
            context.fillRect(146, point, 1, 1);
        }

        context.closePath();
    }
}


function DrawAdditional() {
    context.beginPath();
    context.strokeStyle = "#9e508a";
    context.lineWidth = 1;

    context.moveTo(30, 525);
    context.lineTo(30, 540);
    context.stroke();

    context.moveTo(30, 532.5);
    context.lineTo(58, 532.5);
    context.stroke();

    context.moveTo(144, 525);
    context.lineTo(144, 540);
    context.stroke();

    context.moveTo(144, 532.5);
    context.lineTo(115, 532.5);
    context.stroke();

    context.moveTo(115, 532.5);
    context.lineTo(358, 532.5);
    context.stroke();

    context.moveTo(433, 532.5);
    context.lineTo(651, 532.5);
    context.stroke();

    context.moveTo(651, 525);
    context.lineTo(651, 540);
    context.stroke();
    context.closePath();


    context.beginPath();
    context.font = "11px Verdana";
    context.fillStyle = "#3f3f3f";
    context.fillText("First time", 60, 536);
    context.fillText("Second time", 360, 536);
    context.closePath();

    context.beginPath();
    context.font = "bold 18px Arial";
    context.fillStyle = "#666666";
    context.fillText("Period", 280, 560);
    context.closePath();
}


var imageCloseSecond = document.getElementById("imageCloseSecond");
imageCloseSecond.onclick = function (e) {

    var barSecond = document.getElementById("barSecond"),
        opacity = 1;

    var interval = setInterval(function () {

        barSecond.style.opacity = opacity;
        opacity = opacity - 0.1;

        if (opacity <= 0) {
            clearInterval(interval);
            barSecond.style.left = "-1000px";
            barSecond.style.display = "none";
        }
    }, 100);

}

var imageCloseFirst = document.getElementById("imageCloseFirst");
imageCloseFirst.onclick = function (e) {

    var barFirst = document.getElementById("barFirst");
    var opacity = 1;

    var interval = setInterval(function () {

        barFirst.style.opacity = opacity;
        opacity = opacity - 0.1;

        if (opacity <= 0) {
            clearInterval(interval);
            barFirst.style.left = "-1000px";
            barFirst.style.display = "none";
        }
    }, 100);

}

var drawBarFirst = document.getElementById("drawBarFirst");
drawBarFirst.onclick = function (e) {
    var barFirst = document.getElementById("barFirst");
    var position = -1000;
    var intpos = setInterval(function () {

        position = position + 40;
        barFirst.style.display = "block";
        barFirst.style.left = position + "px";
        barFirst.style.opacity = 1;

        if (position > 298) {
            barFirst.style.left = position - 22 + "px";
            clearInterval(intpos);
            ctx.clearRect(0, 0, 650, 358);
            yFill = 0, kol = 0;
            var delElement = document.getElementsByClassName('class');
            for (var de = 0; de < 10; de++)
                for (var delem = 0; delem < 10; delem++) {
                    if (delElement[delem]) {
                        delElement[delem].parentNode.removeChild(delElement[delem]);
                    }
                    ;
                }
            DrawLines();
            DrawBox(arr, 30, "#9aa14a");
            DrawBox(arrTwo, 65, "#9e518b");
            DrawDigit(arr);
        }
    }, 1);

}

var interval;
var drawBarSecond = document.getElementById("drawBarSecond");
drawBarSecond.onclick = function (e) {
    var barSecond = document.getElementById("barSecond");
    var position1 = -1000;
    var intpos1 = setInterval(function () {

        position1 = position1 + 40;
        barSecond.style.display = "block";
        barSecond.style.left = position1 + "px";
        barSecond.style.opacity = 1;

        if (position1 > 298) {
            barSecond.style.left = position1 - 22 + "px";
            clearInterval(intpos1);
            clientWidth = 30;
            context.clearRect(0, 0, 660, 570);
            CreateAxis();
            DrawAdditional();
            interval = setInterval(AnimatedGraph, 1);
        }
    }, 1);

}

var drawBarThird = document.getElementById("drawBarThird");
drawBarThird.onclick = function (e) {
    var barThree = document.getElementById("barThird");
    var position2 = -1000;
    var intpos2 = setInterval(function () {

        position2 = position2 + 40;
        barThree.style.display = "block";
        barThree.style.left = position2 + "px";
        barThree.style.opacity = 1;

        if (position2 > 298) {
            barThree.style.left = position2 - 22 + "px";
            clearInterval(intpos2);
        }
    }, 1);
    tampering();

}

var imageCloseThird = document.getElementById("imageCloseThird");
imageCloseThird.onclick = function (e) {

    var barThird = document.getElementById("barThird"), op = 1;

    var opacforThree = setInterval(function () {

        barThird.style.opacity = op;
        op = op - 0.1;

        if (op <= 0) {
            clearInterval(opacforThree);
            barThird.style.left = "-1000px";
            barThird.style.display = "none";
        }
    }, 100);

}

function tampering() {
    var listOne = document.getElementById('listOne');
    var listTwo = document.getElementById('listTwo');
    var listThree = document.getElementById('listThree');

    listOne.style.opacity = 0;
    listTwo.style.opacity = 0;
    listThree.style.opacity = 0;

    var opList = 0;

    function showListOne() {

        opList = opList + 0.3;
        listOne.style.opacity = opList;
        if (opList <= 1)
            setTimeout(function () {
                showListOne();
            }, 200);
    }

    setTimeout(showListOne, 3000);

    var opListTwo = 0;

    function showListTwo() {

        opListTwo = opListTwo + 0.3;
        listTwo.style.opacity = opListTwo;
        if (opListTwo <= 1)
            setTimeout(function () {
                showListTwo();
            }, 200);
    }

    setTimeout(showListTwo, 5000);

    var opListThree = 0;

    function showListThree() {

        opListThree = opListThree + 0.3;
        listThree.style.opacity = opListThree;
        if (opListThree <= 1)
            setTimeout(function () {
                showListThree();
            }, 200);
    }

    setTimeout(showListThree, 7000);
}
