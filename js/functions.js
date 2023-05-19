function pathing() {
    for (let i = 0; i < waypoints.length; i++) {
        if (enemy.position.x === waypoints[i].x && enemy.position.y === waypoints[i].y) {
            if (waypoints[i].direction == "right") {
                enemy.speed.x = 1
                enemy.speed.y = 0
                
                
            } else if (waypoints[i].direction == "up") {
                enemy.speed.y = -1
                enemy.speed.x = 0
                
                
            } else if (waypoints[i].direction == "left") {
                enemy.speed.x = -1
                enemy.speed.y = 0
                
                
            } else if (waypoints[i].direction == "down") {
                enemy.speed.y = 1
                enemy.speed.x = 0
                
                
            }else if (waypoints[i].direction == "dead") {
                enemy.speed.y = 0
                enemy.speed.x = 0
            }
        }
    }
    //return(enemy.speed)
}
function spawn_enemy(){
    
}