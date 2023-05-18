const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1280
canvas.height = 576

ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.onload = () => {
    animation()
}
image.src = 'img/towerdefensemap.png'

var x = waypoints[0].x
var y = waypoints[0].y
class Enemy{
    constructor() {
        this.position={
            x: waypoints[0].x,
            y: waypoints[0].y
        }
        this.speed={
            x: 0,
            y: 0
        }
        this.health = 5
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 50, 50)
    }
    pathing() {
        for (let i = 0; i < waypoints.length; i++) {
            if (this.position.x === waypoints[i].x && this.position.y === waypoints[i].y) {
                if (waypoints[i].direction == "right") {
                    this.speed.x = 1
                    this.speed.y = 0
                    console.log("right")
                } else if (waypoints[i].direction == "up") {
                    this.speed.y = -1
                    this.speed.x = 0
                    console.log("up")
                } else if (waypoints[i].direction == "left") {
                    this.speed.x = -1
                    this.speed.y = 0
                    console.log("left")
                } else if (waypoints[i].direction == "down") {
                    this.speed.y = 1
                    this.speed.x = 0
                    console.log("down")
                }else if (waypoints[i].direction == "dead") {
                    this.speed.y = 0
                    this.speed.x = 0
                }
            }
        }
    }
    update() {
        this.draw()
        this.pathing()
        this.position.y += this.speed.y
        this.position.x += this.speed.x
    }
}
const enemies=[]
function createEnemies() {
    for (let j = 0; j < waypoints.length; j++) {
        setTimeout(() => {
            enemies.push(new Enemy());
        }, 2000 * j);
    }
}
createEnemies()

function animation(){
    requestAnimationFrame(animation)
    ctx.clearRect(0,0, canvas.width,canvas.height)
    ctx.drawImage(image,0,0)
    

let i = 0


    
    if (i % 100 === 0) {
        i = i/100
        enemies.push(new Enemy())
    }

    
    console.log(i)
    console.log(x,y)
   i++
}
    //animation()



//placement
console.log(placementTilesData)
const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 40) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 40))
}
placementTilesData2D.forEach(row => {
    row.forEach(symbol => {
        if (symbol === 14) {
            //lägg till placementtile här
        }
    })
})
console.log(placementTilesData2D)
