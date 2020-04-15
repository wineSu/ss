var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var milliseconds = 0;
var minutes = 0;
var hour = 0;
var date = "";
var ctxBack = canvas.getContext("2d");
var numBack = canvas.getContext("2d");
ctxBack.lineWidth = 2;
function pageInit() {
    showTime();
    showBack();
    drawSecPin();
    drawMinPin();
    drawHouPin();
    setPoint();
    setNum();
}
function setNum() {
    numBack.save();
    numBack.translate(250, 250);
    numBack.beginPath();
    numBack.fillStyle = '#00baf1';
    numBack.font = "30px Helvetica";
    for (var i = 0; i < 60; i++) {
        if (i % 5 == 0) {
            numBack.lineWidth = 5;
            var xPoint = Math.sin(i * 6 * 2 * Math.PI / 360) * 195;
            var yPoint = -Math.cos(i * 6 * 2 * Math.PI / 360) * 195;
            numBack.fillText(i == 0 ? 12 : i / 5, i == 0 ? -15 : xPoint - 10, i == 0 ? -185 : i <= 30 ? yPoint + 5 : yPoint + 10);
        }
    }
    numBack.stroke();
    numBack.closePath();
    numBack.restore();
}
function drawSecPin() {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(milliseconds / 60 * 2 * Math.PI);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#00baf1';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 30);
    ctxBack.lineTo(3, -175);
    ctxBack.lineTo(13, -165);
    ctxBack.lineTo(0, -210);
    ctxBack.lineTo(-13, -165);
    ctxBack.lineTo(-3, -175);
    ctxBack.lineTo(0, 30);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
}
function drawMinPin() {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(minutes * 6 * Math.PI / 180);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#00baf1';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 20);
    ctxBack.lineTo(3, -145);
    ctxBack.lineTo(10, -135);
    ctxBack.lineTo(0, -180);
    ctxBack.lineTo(-10, -135);
    ctxBack.lineTo(-3, -145);
    ctxBack.lineTo(0, 20);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
}
function drawHouPin() {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(hour * 30 * Math.PI / 180);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#87CEFA';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 20);
    ctxBack.lineTo(3, -110);
    ctxBack.lineTo(10, -100);
    ctxBack.lineTo(0, -150);
    ctxBack.lineTo(-10, -100);
    ctxBack.lineTo(-3, -110);
    ctxBack.lineTo(0, 20);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
}
function setPoint() {
    ctxBack.beginPath();
    ctxBack.fillStyle = 'black';
    ctxBack.arc(250, 250, 4, 0, 2 * Math.PI);
    ctxBack.stroke();
}
function showBack() {
    for (var i = 0; i < 60; i++) {
        ctxBack.save();
        ctxBack.translate(250, 250);
        ctxBack.rotate(i / 60 * 2 * Math.PI);
        ctxBack.beginPath();
        ctxBack.strokeStyle = '#00baf1';
        ctxBack.moveTo(0, -250);
        ctxBack.lineWidth = i % 5 == 0 ? 5 : 2; ctxBack.lineTo(0, -230);
        ctxBack.stroke(); ctxBack.closePath(); ctxBack.restore();
    }
    // ctxBack.beginPath();
    // ctxBack.arc(250, 250, 230, 0, 2 * Math.PI);
    // ctxBack.stroke();
}
function degToRad(degree) {
    var result;
    var factor = Math.PI / 180;
    if (degree == 0) {
        result = 270 * factor;
    } else {
        result = degree * factor;
    }
    return result;
}
function showTime() {
    var now = new Date();
    var today = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    var day = now.getDay();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);
    var hours = hrs + (smoothmin / 60);
    milliseconds = smoothsec;
    minutes = smoothmin;
    hour = hours;
    switch (day) {
        case 1: date = '一'
            break; case 2: date = '二'
            break; case 3: date = '三'
            break; case 4: date = '四'
            break; case 5: date = '五'
            break; case 6: date = '六'
            break; case 0: date = '日'
            break;
    }
    gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 220);
    gradient.addColorStop(0, "#00baf1");
    gradient.addColorStop(1, "#00090b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);
    // ctx.beginPath();
    // ctx.strokeStyle = '#8dedf1';
    // ctx.arc(250, 250, 215, degToRad(0), degToRad((hours * 30) - 90));
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.strokeStyle = '#0c587f';
    // ctx.arc(250, 250, 220, degToRad(0), degToRad(smoothmin * 6 - 90));
    // ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#AFEEEE';
    ctx.arc(250, 250, 225, degToRad(0), degToRad(smoothsec * 6 - 90));
    ctx.stroke();
    ctx.font = "25px Helvetica Bold";
    ctx.fillStyle = '#AFEEEE';
    ctx.fillText(today + "/星期" + date, 150, 230);
    ctx.font = "23px Helvetica Bold";
    ctx.fillStyle = '#AFEEEE';
    ctx.fillText(time, 190, 280);
}
setInterval(pageInit, 50);


/**
 * @Author   SuZhe
 * @DateTime 2019-03-15
 * @desc     兼容 requestAnimFrame
 * @return   {[Function]}    requestAnimFrame不兼容的浏览器使用定时器代替
 */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
})();

/**
* @Author   SuZhe
* @DateTime 2019-03-15
* @desc     椭圆动画效果  star运动
* @param    {[Object]}   canvasId [画布布id]
*/
function CanvasAnimation(param){
    if(param.ele){
        this.canvas = param.ele;
        this.cxt = this.canvas.getContext('2d');
        this.param = param;
        if(param.type){
            //star
            this.starArr = [[],[],[],[],[]];  //star数量集合
            this.step = [80,-140,40,260,-60];  //步长位置集合
            this.color = ['30,16,82','80,238,207','235,149,89','68,192,240','68,112,240']; //颜色集合
        }else{
            // arc
            this.a = 168; //长 半 径
            this.b = 53;  //短 半 径
            this.posi = []; //位置集合
            this.posiNext = [];
            this.radius = 2;
            this.time = 0; //步长
        }
        this.animation();
    }
}
CanvasAnimation.prototype = {
    animation: function(){
        var that = this;
        if(this.param.type){
            //star
            this.starAni();
        }else{
            //arc
            this.draw();
            this.drawNext();
        }
        window.requestAnimFrame(function(){
          that.animation();
        });
    },
    draw: function(){
        var y = 56,
        posi = this.posi;
        this.cxt.clearRect(0,0,340,160);
        this.trail(y,posi);
        this.time+=0.02;
    },
    drawNext: function(){
        var y = 106,
        posi = this.posiNext;
        this.trail(y,posi,true);
    },
    trail: function(y,posi,next){
        var context = this.cxt,
            x = 170,a,b,
            param = {};
        if(next){
            a = -this.a;
            b = -this.b;
        }else{
            a = this.a;
            b = this.b;
        }
        //圆弧坐标
        param.arcX = x + a*Math.cos(this.time),
        param.arcY = y + b*Math.sin(this.time);
        posi.push(param);
        if(posi.length > 25){
            posi.shift();
        }
        for(var i = 0, len = posi.length; i < len; i++){
            var alphar = 1;
            if(i < len-1){
                alphar = i/30;
            }
            if(next){
                context.fillStyle="rgba(255, 204, 0, "+alphar+")";
            }else{
                context.fillStyle="rgba(0, 246, 255, "+alphar+")";
            }
            context.beginPath();
            context.arc(posi[i].arcX,posi[i].arcY,this.radius,0,2*Math.PI);
            context.closePath();
            context.fill();
        }
    },
    starAni: function(){
        var context = this.cxt,
        posi = this.starArr,
        starNum = [{},{},{},{},{}];
        context.clearRect(0,0,1100,800);
        for(var k = 0, lens = starNum.length; k < lens; k++){
            starNum[k].x = 120 * k * 2 + 100;
            starNum[k].y = 700 - this.step[k];
            if(starNum[k].y < 0){
              this.step[k] = 0;
            }
            posi[k].push(starNum[k]);
            if(posi[k].length > 45){
                posi[k].shift();
            }
            for(var j = 0, len = posi[k].length; j < len; j++){
                var alphar = 1,
                    redius = 2.5;
                if(j < len - 1){
                    alphar = j/50;
                    redius = j/48 *2 ;
                }
                if(j == len-1){
                    context.shadowOffsetY=-2;
                    context.shadowOffsetX=0;
                    context.shadowBlur=10;
                    context.shadowColor="rgb("+this.color[k]+")";
                }
                context.fillStyle="rgba("+this.color[k]+", "+alphar+")";
                context.beginPath();
                context.arc(posi[k][j].x,posi[k][j].y,redius,0,2*Math.PI);
                context.closePath();
                context.fill();
            }
            this.step[k] += 2;
        }
    }
}
