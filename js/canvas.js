const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1280
canvas.height = 576

ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)




const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 40) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 40))
}

const placementTiles = []

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 114) {
      // add building placement tile here
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 32,
            y: y * 32
          }
        })
      )
    }
  })
})





const image = new Image()
image.onload = () => {
    animation()
}
image.src = 'img/towerdefensemap.png'

var x = waypoints[0].x
var y = waypoints[0].y

const enemies=[]
function spawnEnemies(spawnAmount) {
    for (let j = 0; j < spawnAmount; j++) {
        setTimeout(() => {
            enemies.push(new Enemy());
        }, 1500 * j);
    }
}

const towers = []
let activeTile = undefined

let spawnAmount = 5
let waveCount = 0
function animation(){
    requestAnimationFrame(animation)
    ctx.clearRect(0,0, canvas.width,canvas.height)
    ctx.drawImage(image,0,0)

    if (enemies.length === 0) {
        spawnEnemies(spawnAmount)
        spawnAmount += 2
        waveCount++
    }
  
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update()
        if (enemies[i].lives === false) {
            enemies.splice(i, 1)
        }
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
                projectile.enemy.health -= 1
                tower.projectiles.splice(i, 1)
                if (projectile.enemy.health <= 0) {
                    projectile.enemy.lives = false
                }
            }
        }
    })
}
    
canvas.addEventListener("click", (event) =>{
    if (activeTile && activeTile.occupied === false) {
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
    console.log(activeTile)
})
    
