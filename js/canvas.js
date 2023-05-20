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

const enemies=[]

const placementTilesData2D = []
const placementTiles = []
placementTilesMake()

var x = waypoints[0].x
var y = waypoints[0].y

const towers = []
let activeTile = undefined

let playerLives = 10
let playerCoins = 100
let spawnAmount = 5
let waveCount = 0

function animation(){
    const animationId = requestAnimationFrame(animation)
    ctx.clearRect(0,0, canvas.width,canvas.height)
    ctx.drawImage(image,0,0)

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i]
        enemy.update()
        document.querySelector("#Lives").innerHTML = `${playerLives} Lives`
        if (playerLives <= 0) {
            cancelAnimationFrame(animationId)
            document.querySelector("#gameOver").style.display = "flex"
        }
    }

    if (enemies.length === 0) {
        spawnEnemies(spawnAmount)
        spawnAmount += 2
        waveCount++
        document.querySelector("#waveCount").innerHTML = `Wave ${waveCount}`
    }
    
    placementTiles.forEach(tile => {
        tile.update(mouse)
    });

    towers.forEach((tower) => {
        tower.update()
        tower.target = null
        const validEnemies = enemies.filter(enemy => {
            const xDiff = enemy.center.x - tower.position.x
            const yDiff = enemy.center.y - tower.position.y
            const distance = Math.hypot(xDiff, yDiff)
            return distance < tower.range
        })
        tower.target = validEnemies[0]

        for (let i = tower.projectiles.length - 1; i >= 0; i--) {
            const projectile = tower.projectiles[i]
            projectile.update()

            const xDiff = projectile.enemy.center.x - projectile.position.x
            const yDiff = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDiff, yDiff)
            if (distance < 5) {
                projectile.enemy.health -= 5
                tower.projectiles.splice(i, 1)
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1)
                        playerCoins += 25
                        document.querySelector("#coins").innerHTML = `${playerCoins} Coins`
                    }
                }
            }
        }
    })
}
    
canvas.addEventListener("click", (event) =>{
    if (activeTile && activeTile.occupied === false && playerCoins >= 50) {
        playerCoins -= 50
        document.querySelector("#coins").innerHTML = `${playerCoins} Coins`
        towers.push(
            new Tower({
                position: {
                    x: activeTile.position.x,
                    y: activeTile.position.y
            }
        }))
        activeTile.occupied = true
    }
})

window.addEventListener("mousemove",(event)=>{
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        } 
    }
})

