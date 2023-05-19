class Sprite {
    constructor({imageSrc, frames = {max: 1}}){
        this.position = {
            x: waypoints[0].x,
            y: waypoints[0].y
        }
        this.image = new Image()
        this.image.src = imageSrc
        this.frames = {
            max: frames.max, 
            current: 0,
            elapsed: 0,
            hold: 10
        }
    }
    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        ctx.drawImage(
            this.image, 
            crop.position.x, 
            crop.position.y, 
            crop.width, 
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height)
        
        this.frames.elapsed++
        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++
            if (this.frames.current > this.frames.max - 1) {
                this.frames.current = 0
            }
        }
    }
}

class Enemy extends Sprite{
    constructor() {
        super({
            imageSrc: 'img/Walk.png', 
            frames: {max: 3}})
        this.position={
            x: waypoints[0].x,
            y: waypoints[0].y
        }
        this.center = {
            x: this.position.x + 16,
            y: this.position.y + 16
        }
        this.speed={
            x: 0,
            y: 0
        }
        this.health = 5 * waveCount
        this.lives = true
    }

    draw() {
        super.draw()
    }
    pathing() {
        for (let i = 0; i < waypoints.length; i++) {
            if (this.position.x === waypoints[i].x && this.position.y === waypoints[i].y) {
                if (waypoints[i].direction == "right") {
                    this.speed.x = 1
                    this.speed.y = 0
                } else if (waypoints[i].direction == "up") {
                    this.speed.y = -1
                    this.speed.x = 0
                } else if (waypoints[i].direction == "left") {
                    this.speed.x = -1
                    this.speed.y = 0
                } else if (waypoints[i].direction == "down") {
                    this.speed.y = 1
                    this.speed.x = 0
                }else if (waypoints[i].direction == "finish") {
                    enemies.shift()
                }
            }
        }
    }
    update() {
        if (this.lives = true) {
            this.draw()
            this.pathing()
            this.position.y += this.speed.y
            this.position.x += this.speed.x
            this.center.y += this.speed.y
            this.center.x += this.speed.x
        } 
    }
}



class Tower extends Sprite{
    constructor({position={x:0,y:0}}){
        super({
            imageSrc: 'img/Pink_Monster_Throw_4.png', 
            frames: {max: 4}})
        this.position = position
        this.range = 250
        this.target
        this.projectiles = []   
    }

    draw() {
        super.draw()
    }

    update() {
        this.draw()

        if (this.frames.current === 2 && 
            this.target && 
            this.frames.elapsed % this.frames.hold === 0) {
            this.shoot()
        }
    }

    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.position.x + 25,
                    y: this.position.y + 15
                },
                enemy: this.target
        }))
    }
}

const mouse ={
    x:undefined,
    y:undefined
}

class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
      this.position = position
      this.size = 32
      this.occupied = false
    }
  
    draw() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
  
    update(mouse) {
        this.draw()

        if (
            mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size
        ) {
            this.color = 'white'
        } else {
            this.color = 'rgba(255, 255, 255, 0.35)'
        }
    }
  }

class Projectile extends Sprite{
    constructor({position = {x: 0, y: 0}, enemy}) {
        super({
            imageSrc: 'img/Tower 04 - Level 01 - Projectile.png', 
            frames: {max: 6}
        })
        this.position = position
        this.speed = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
    }

    draw() {
        super.draw()
    }

    update() {
        this.draw()

        const angle = Math.atan2(
            this.enemy.center.y - this.position.y, 
            this.enemy.center.x - this.position.x)
        
        this.speed.x = Math.cos(angle) *2
        this.speed.y = Math.sin(angle) *2 

        this.position.x += this.speed.x 
        this.position.y += this.speed.y 
    }
}