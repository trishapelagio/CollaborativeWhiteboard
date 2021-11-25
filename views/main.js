const socket = io();
const can = document.querySelector('#c');
const ctx = can.getContext('2d');
const clr = document.querySelector('.clrpicker');
const clear = document.querySelector('#clear');
const brushThickness = document.querySelector('#drop');

// const joinSound = new Audio("./join.mp3");
// joinSound.crossOrigin = "anonymous";
// const leaveSound = new Audio("./leave.mp3");
// leaveSound.crossOrigin = "anonymous";\

var isEraser = false;

var canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: true,
    hoverCursor: 'pointer',
    imageSmoothingEnabled: false
});
canvas.backgroundColor = "#ffffff";
// canvas.setWidth(0.98 * (window.innerWidth));
// canvas.setHeight(0.87 * (window.innerHeight));
canvas.setWidth(1200);
canvas.setHeight(600);

// Not working...
canvas.hoverCursor = 'default';

// canvas.style.background = 'rgb(255,255,255)';

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Create Room

// canvas.selection = false;

// Join WhiteBoard
socket.emit('joinRoom', { username, room });

let timeout;
const syncSpeed = 41;


canvas.on({ 'mouse:up': sendData });

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
canvas.on("path:created", function(opt){
    opt.path.id = makeid(10)
    console.log("object?")
    console.log(canvas.getObjects())
});


// canvas.on('path:created', function(e){
    
    
//     e.id = makeid(10);
// })
// canvas.on({ 'selection:created': function(){
    
//     canvas.getActiveObjects().forEach((obj) => {
//         /*
//         var clone = fabric.util.object.clone(obj);
//         clone2 = clone;
//         clone2.set({left: obj.left, top: obj.top, stroke:'white', selectable: false });
//         // clone.fill = "FFFFFF"
//         // clone.set({color: "000232"});
        
//         canvas.add(clone2); 
//         // canvas.bringForward(clone);
//         canvas.renderAll();
//         */
//        obj.clone(function (clone){
//            for (let i = 0; i < 100; i++){
//                 canvas.add(clone.set({
//                     left: obj.left,
//                     top: obj.top, 
//                     stroke:'white', 
//                     selectable: false
//                 }));
//             }
//        });

//        canvas.requestRenderAll();
//        canvas.bringToFront(obj);
//     });
//     // canvas.discardActiveObject().renderAll()
// } });

// canvas.on({ 'selection:updated': function(){
//     canvas.getActiveObjects().forEach((obj) => {
//         /*
//         var clone = fabric.util.object.clone(obj);
//         clone2 = clone;
//         clone2.set({left: obj.left, top: obj.top, stroke:'white', selectable: false });
//         // clone.fill = "FFFFFF"
//         // clone.set({color: "000232"});
        
//         canvas.add(clone2); 
//         // canvas.bringForward(clone);
//         canvas.renderAll();
//         */
//        obj.clone(function (clone){
//            for (let i = 0; i < 100; i++){
//                 canvas.add(clone.set({
//                     left: obj.left,
//                     top: obj.top, 
//                     stroke:'white', 
//                     selectable: false
//                 }));
//             }
//        });

//        canvas.requestRenderAll();
//        canvas.bringToFront(obj);
//     });
//     // canvas.discardActiveObject().renderAll()
// } });

// canvas.on({ 'selection:updated': function(){
//     canvas.getActiveObjects().forEach((obj) => {
//         var clone = fabric.util.object.clone(obj);
//         var clone1 = clone
//         clone1.set({obj: obj.left,top: obj.top, stroke:'white'});
//         // clone.fill = "FFFFFF"
//         // clone.set({color: "000232"});
//         canvas.add(clone1); 
//         canvas.renderAll();
//     });
//     // canvas.discardActiveObject().renderAll()
// } });
/*
This is from previous Canvas method

// last known position

let pos = { x: 0, y: 0, tx: 0, ty: 0 };

//window.addEventListener('resize', resize);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);

// For mobile
canvas.addEventListener('touchstart', setPosMobile);
canvas.addEventListener('touchmove', drawMobile);


clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

// For Mobile

function setPosMobile(e) {
    //console.log(e.touches[0]);
    e.preventDefault();
    let touch = e.touches[0];
    pos.tx = touch.clientX - canvas.offsetLeft;
    pos.ty = touch.clientY - canvas.offsetTop;
}

function drawMobile(e) {
    e.preventDefault();
    ctx.beginPath();

    ctx.lineWidth = brushThickness.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = clr.value;

    // from
    ctx.moveTo(pos.tx, pos.ty);
    setPosMobile(e);
    // to
    ctx.lineTo(pos.tx, pos.ty);
    ctx.stroke();

    if (timeout != undefined) clearTimeout(timeout);
    timeout = setTimeout(() => {
        let base64ImageData = canvas.toDataURL("image/png");
        socket.emit('canvas-image', base64ImageData);
    }, syncSpeed);
}

// new position from mouse event
function setPosition(e) {
    pos.x = e.pageX - canvas.offsetLeft;
    pos.y = e.pageY - canvas.offsetTop;
    // console.log(pos)
}

ctx.canvas.width = 0.98 * (window.innerWidth);

ctx.canvas.height = 0.87 * (window.innerHeight);


function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = brushThickness.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = clr.value;

    // from
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    // to
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    if (timeout != undefined) clearTimeout(timeout);
    timeout = setTimeout(() => {
        let base64ImageData = canvas.toDataURL("image/png");
        socket.emit('canvas-image', base64ImageData);
    }, syncSpeed);

}*/

const dbc = document.querySelector(".dropdown-content");

const dp = document.querySelector(".dropdown");
dp.addEventListener('click', () => {
    $('.dropdown-content').toggle();
});


// // resize canvas
// let sizeChange = false;

// function resize() {
//     // ctx.canvas.width = 0.75 * (window.innerWidth);
//     // ctx.canvas.height = 0.75 * (window.innerHeight);
//     if (!sizeChange) {
//         canvas.setWidth(1920);
//         canvas.setHeight(1280);
//         sizeChange = true;
//     } else {
//         canvas.setWidth(0.98 * (window.innerWidth));
//         canvas.setHeight(0.87 * (window.innerHeight));
//         sizeChange = false;
//     }

// }

// let clrw = true;

// function changeClr() {
//     // ctx.globalCompositeOperation = 'destination-over';
//     if (canvas.backgroundColor == "#333333") {
//         canvas.backgroundColor = "#ffffff";
//         clrw = true;
//     } else {
//         canvas.backgroundColor = "#333333";
//         clrw = false;
//     }
//     // ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // ctx.globalCompositeOperation = 'source-over';
//     canvas.renderAll();
// }

// Fabric js

function start() {
    var id = function (id) { return document.getElementById(id) };

    fabric.Object.prototype.transparentCorners = false;

    var drawingModeEl = id('drawing-mode'),
        // drawingOptionsEl = id('drawing-mode-options'),
        drawingColorEl = id('drawing-color'),
        // drawingShadowColorEl = id('drawing-shadow-color'),
        drawingLineWidthEl = id('drop'),
        // drawingShadowWidth = id('drawing-shadow-width'),
        // drawingShadowOffset = id('drawing-shadow-offset'),
        clearEl = id('clear');

    clearEl.onclick = function () {
        canvas.clear();
        canvas.backgroundColor = "#ffffff";
        socket.emit('canvas-clear', canvas.toDataURL("image/png"));
    };

    drawingModeEl.onclick = function () {
        if(isEraser){
            isEraser = false;
            $("#eraser-btn").addClass("btn-outline-dark");
            $("#eraser-btn").removeClass("btn-dark");
            // if(canvas.isDrawingMode)
            // canvas.isDrawingMode = !canvas.isDrawingMode;
            // canvas.freeDrawingBrush.color= "#ffffff";
            canvas.freeDrawingBrush.color= $("#drawing-color").val();
        }
        else
            canvas.isDrawingMode = !canvas.isDrawingMode;

        
        if (canvas.isDrawingMode) {
            // drawingModeEl.innerHTML = 'Select Tool';

            $("#tool-select").removeClass("fas");
            $("#tool-select").removeClass("fa-pen");
            
            $("#tool-select").addClass("far");
            $("#tool-select").addClass("fa-object-ungroup");
            
            // $("#eraser-btn").addClass("disabled");
        
            // drawingOptionsEl.style.display = '';
        }
        else {
            // drawingModeEl.innerHTML = 'Enter Drawing Mode';
            $("#tool-select").removeClass("far");
            $("#tool-select").removeClass("fa-object-ungroup");

            $("#tool-select").addClass("fas");
            $("#tool-select").addClass("fa-pen");

            // $("#eraser-btn").removeClass("disabled");
            
            // drawingOptionsEl.style.display = 'none';
        }
    };

    if (fabric.PatternBrush) {
        var vLinePatternBrush = new fabric.PatternBrush(canvas);
        vLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');
            // patternCanvas.hoverCursor = 'default'
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var hLinePatternBrush = new fabric.PatternBrush(canvas);
        hLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var squarePatternBrush = new fabric.PatternBrush(canvas);
        squarePatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };

        var diamondPatternBrush = new fabric.PatternBrush(canvas);
        diamondPatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };

        var img = new Image();
        img.src = './retina_wood.png';

        var texturePatternBrush = new fabric.PatternBrush(canvas);
        texturePatternBrush.source = img;

    }
    canvas.freeDrawingBrush.width = 5;
    
    // id('drawing-mode-selector').onchange = function () {
    //     canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas); 
    //     if (canvas.freeDrawingBrush) {
    //         var brush = canvas.freeDrawingBrush;
    //         brush.color = drawingColorEl.value;
    //         if (brush.getPatternSrc) {
    //             brush.source = brush.getPatternSrc.call(brush);
    //         }
    //         brush.width = parseInt(drawingLineWidthEl.value, 10) || 5;
    //         brush.shadow = new fabric.Shadow({
    //             blur: parseInt(drawingShadowWidth.value, 10) || 0,
    //             offsetX: 0,
    //             offsetY: 0,
    //             affectStroke: true,
    //             color: drawingShadowColorEl.value,
    //         });
    //     }
    // };

    drawingColorEl.onchange = function () {
        var brush = canvas.freeDrawingBrush;
        brush.color = this.value;
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
        if(isEraser){
            // isEraser = false;
            // $("#eraser-btn").addClass("btn-outline-dark");
            // $("#eraser-btn").removeClass("btn-dark");
            // canvas.isDrawingMode = !isDrawingMode;
            canvas.freeDrawingBrush.color= "#ffffff";
        }
    };
    // drawingShadowColorEl.onchange = function () {
    //     canvas.freeDrawingBrush.shadow.color = this.value;
    // };
    drawingLineWidthEl.onchange = function () {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 0;
        this.previousSibling.innerHTML = this.value;
    };
    // drawingShadowWidth.onchange = function () {
    //     canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    //     this.previousSibling.innerHTML = this.value;
    // };
    // drawingShadowOffset.onchange = function () {
    //     canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    //     canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    //     this.previousSibling.innerHTML = this.value;
    // };

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        //canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 5;
        // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        //     blur: parseInt(drawingShadowWidth.value, 10) || 0,
        //     offsetX: 0,
        //     offsetY: 0,
        //     affectStroke: true,
        //     color: drawingShadowColorEl.value,
        // });
    }

}

function sendData(object) {
    // console.log("sending Data")
    if (timeout != undefined) clearTimeout(timeout);
    timeout = setTimeout(() => {
        let base64ImageData = canvas.toDataURL("image/png");

        let objects = canvas.getObjects(); //return Array<objects>
        // let canvas_image = [];
        var m = {};
        var id = [];
        objects.forEach(object=>{
            id.push(object.id)
            // console.log(object.path.id)
            // if(object.id==undefined)
        });
        m.id = id
        m.object = objects
        console.log("send ")
        console.log( objects)
        
        socket.emit('canvas-image', m);
    }, syncSpeed);
}

start();
canvas.renderAll();

function deleteObject() {
    if(!isEraser){
        isEraser = true;
        $("#eraser-btn").removeClass("btn-outline-dark");
        $("#eraser-btn").addClass("btn-dark");
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color= "#ffffff";
        $("#tool-select").removeClass("far");
        $("#tool-select").removeClass("fa-object-ungroup");

        $("#tool-select").addClass("fas");
        $("#tool-select").addClass("fa-pen");
    }
    // canvas.getActiveObjects().forEach((obj) => {
    //     canvas.remove(obj)
    //   });
    // canvas.discardActiveObject().renderAll()
}

// Socket io

const context = canvas.getContext('2d');

socket.on("canvas-draw", data => {
    // let image = new Image();
    // image.onload = function () {

    //     var f_img = new fabric.Image(image);
    //     canvas.setBackgroundImage(f_img);
    //     canvas.renderAll();
    //     // context.drawImage(image, 0, 0);
    // };
    // image.src = data;
    // canvas.clear();
    // canvas.backgroundColor = "#ffffff";
    
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = "white";
    // context.fill()
    console.log("received")
    console.log(data)
    fabric.util.enlivenObjects(data.object, function(objects) {
        var origRenderOnAddRemove = canvas.renderOnAddRemove;
        canvas.renderOnAddRemove = false;

        let thisCanvas = canvas.getObjects()

        let i = 0 ;
        objects.forEach(function(o) {
            let add = true;
            thisCanvas.forEach(object=>{
                if(object.id == data.id[i]){
                    add = false
                    canvas.remove(object)
                    // object = o
                }
                // if(object.id==undefined)
            });

            o.id = data.id[i]
            canvas.add(o);
        
            i++ 
        });

        canvas.renderOnAddRemove = origRenderOnAddRemove;
        canvas.renderAll();
    });
});

socket.on("canvas-wipe", data => {
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fill()
    
});

socket.on('disconnect', () => {
    alert('Host disconnected, redirecting you to homepage.');
    setTimeout(() => {window.location.replace('/')}, 5000);
})

socket.on('roomUsers', ({ room, users, status }) => {
    console.log(room, users, status);
    outputRoomName(room);
    outputUsers(users, status);
});

function outputRoomName(room) {
    // $('.dropbtn').html(`Active Users (${room}) (<span id="numb"></span>) <i class="fas fa-caret-down"></i>`);
    $("#room-name").text(`(${room} Board)`);
    console.log(room);
}
function outputUsers(users, status) {

    //Remove previous users
    let n = Object.keys(users).length;

    //Joined
    // if (status) {
    //     let join = joinSound.play();
    // } else {  // Left
    //     let leave = leaveSound.play();
    // }

    $('#n').text("("+n+")");
    console.log(n);
    // dbc.innerHTML = '';
    $("#active-users").empty();

    users.forEach(user => {
        // const a = document.createElement('a');
        // a.innerText = user.username;
        // a.addClass("dropdown-item");
        // dbc.appendChild(a);
        console.log(user.username);
        $("#active-users").append(`<li><a class="dropdown-item" href="#"> ` + user.username + `</a></li>`);
    });
}

// function undo() {
//     alert('Functionality not available yet!!');
// }

socket.on('wrong_Room', check => {
    window.location = '/'
    alert("You tried to login in an un-registered room")
});

function Save() {
    var w = canvas.width;
    var h = canvas.height;

    var data = ctx.getImageData(0, 0, w, h);

    var compositeOperation = ctx.globalCompositeOperation;

    ctx.globalCompositeOperation = "destination-over";

    // Transparent
    // ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

    if (clrw) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    } else {
        ctx.fillStyle = canvas.backgroundColor;
    }

    ctx.fillRect(0, 0, w, h);

    var imageData = canvas.toDataURL("image/png");

    ctx.clearRect(0, 0, w, h);
    ctx.putImageData(data, 0, 0);
    ctx.globalCompositeOperation = compositeOperation;

    var a = document.createElement('a');
    a.href = imageData;
    a.download = 'WhiteBoard.png';
    a.click();
    // ctx.globalCompositeOperation = 'source-over';
}


