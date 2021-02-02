"use strict";
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;
let c = canvas.getContext('2d');
let circleNumber=0;
let cost = 0;
let speedcost=10;
let money = 0;
let speed = 1;
let dmoney = 1;
let worthcost=20;

function upgradeSpeed() {
    if (money >=speedcost) {
        money-=speedcost;
        speed*=1.2;
        speedcost*=1.5;
        for (let i = 0; i<circleArray.length; i++) {
            circleArray[i].dx*=1.2;
            circleArray[i].dy*=1.2;
        }
        document.getElementById("speed").innerText = "Upgrade ball speed by 20%\nCost: " + (Math.round(speedcost*10)/10) + "\n current speed increase: x" + (Math.round(speed*10)/10);
        document.getElementById("money").innerText = "Money: " + Math.round(money);
    }
    
}

function upgradeWorth() {
    if (money>=worthcost) {
        dmoney++;
        money-=worthcost;
        worthcost*=2;
        document.getElementById("worth").innerText = "Upgrade bounce worth by 1.\nCost: " + worthcost + "\nCurrent value: " + dmoney;
        document.getElementById("money").innerText = "Money: " + Math.round(money);
    }


}

function Circle(x,y,dx,dy,radius,color1,color2,color3) {
    this.x=x;
    this.y=y;
    this.dx=dx*speed;
    this.dy=dy*speed;
    this.radius=radius;

    this.drawCircle = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle=`rgb(${color1},${color2},${color3})`;
        c.stroke();
        c.fillStyle=`rgb(${color1},${color2},${color3})`;
        c.fill();
    }

    this.updateCircle = function() {
        if (this.x+this.radius>window.innerWidth*0.8 || this.x-this.radius<0) {
            this.dx=-this.dx;
            money+=dmoney;
            document.getElementById("money").innerText = "Money: " + Math.round(money);
        }
        if (this.y+this.radius>window.innerHeight*0.8 || this.y-this.radius<0) {
            this.dy=-this.dy;
            money+=dmoney;
            document.getElementById("money").innerText = "Money: " + Math.round(money);
        }
        this.x+=this.dx;   
        this.y+=this.dy;
        this.drawCircle();
    }
}

function move() {
    requestAnimationFrame(move);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for (let i = 0; i<circleArray.length; i++) {
        circleArray[i].updateCircle();
    }
}
let circleArray = [];
function spawnCircle() {
    let radius = (Math.random()+0.5)*100;
    let x = Math.random() * (window.innerWidth*0.8-radius*2)+radius;
    let y = Math.random() * (window.innerHeight*0.8-radius*2)+radius;
    let dx = (Math.random()-0.5)*10;
    let dy = (Math.random()-0.5)*10;
    let color1 = Math.random()*255;
    let color2 = Math.random()*255;
    let color3 = Math.random()*255;
    if (money>=cost) {
        circleArray.push(new Circle(x,y,dx,dy,radius,color1,color2,color3));
        money=money-cost;
        document.getElementById("money").innerText = "Money: " + money;
    circleNumber++;
    cost+=5*circleNumber;
    document.getElementById("spawn").innerText = "Spawn circle \n Current circles: " + circleNumber + "\n Cost:" + cost;
    }
}

move();