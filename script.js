var hero = {
  top : 550,
  left : 640,
}

var missiles = []

var enemies = [
  { left: 500, top: 30},
  { left: 600, top: 55},
  { left: 700, top: 55},
  { left: 800, top: 30},
  { left: 500, top: 100},
  { left: 600, top: 100},
  { left: 700, top: 100},
  { left: 800, top: 100},
 
 
  { left: 400, top: 175},
  { left: 500, top: 175},
  { left: 600, top: 175},
  { left: 700, top: 175},
  { left: 800, top: 175},
  { left: 900, top: 175},
 
  
]

var outScore = document.getElementById('score')
var shoot = new Audio()
var backsound = new Audio()
backsound.src = 'Blue_Dot_Sessions_-_07_-_Softly_Villainous.mp3'
shoot.src = 'explosion_1.mp3'


document.onkeydown = function(e){
  
  if (e.keyCode === 37){
    // console.log("LEFT");
    if (hero.left >= 10){
      hero.left = hero.left - 10
    }
    moveHero()
  } 
  else if (e.keyCode === 39){
    // console.log("RIGHT");
    if (hero.left < 1300 ){
      hero.left = hero.left + 10
    }
    moveHero()
  } 
  else if (e.keyCode === 32){
    // console.log("FIRE");
    missiles.push({
      left : hero.left + 15,
      top : hero.top
    })
    drawMissiles()
    
  } 
}

function moveHero(){
  document.getElementById('hero').style.left = hero.left + 'px'
}

function drawMissiles() {
  document.getElementById('missiles').innerHTML = ""
  for (var missile = 0; missile<missiles.length; missile++){
    document.getElementById('missiles').innerHTML += `<div class='missile' style='left:${missiles[missile].left}px; top:${ missiles[missile].top}px;'></div>`
   
    
  }
}

function moveMissiles() {
  for (var missile = 0; missile<missiles.length; missile++){
    missiles[missile].top = missiles[missile].top - 5
  }
}

function drawEnemies (){
  document.getElementById('enemies').innerHTML = ""
  for (var enemy = 0; enemy<enemies.length; enemy++){
    document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>` 
  }
}

function moveEnemies() {
  flag = false
  for (var enemy = 0; enemy<enemies.length; enemy++){

    enemies[enemy].top += 1
    if (enemies[enemy].top === 500){
      enemies.splice(enemy)
      shoot.play()
      
    }
    
  }
  if (enemies.length === 0){
    alert('GAME OVER', onclick(location.reload()) )
  }
 
}
var currentScore = 0


function collisionDetection(){
   
  for (var enemy = 0; enemy<enemies.length; enemy++){
    for (var missile = 0; missile<missiles.length; missile++){
      if (
        (missiles[missile].top <= enemies[enemy].top + 50) && 
        (missiles[missile].top >= enemies[enemy].top) && 
        (missiles[missile].left >= enemies[enemy].left) && 
        (missiles[missile].left <= enemies[enemy].left + 50)
        )
      {
        enemies.splice(enemy, 1)
        missiles.splice(missile, 1)
        
        currentScore += 1
      }
    }
  }
  // console.log(currentScore);
}
function drawScore(){
  outScore.innerHTML = currentScore

    // currentScore = score


}
function gameLoop() {
  setTimeout(gameLoop, 30)
  moveMissiles()
  drawMissiles()
  collisionDetection()
}
function gameLoop2(){
  setTimeout(gameLoop2, 320)
  moveEnemies()
  drawEnemies()
}

function startButton(){
  backsound.play()
  gameLoop()
  gameLoop2()
  drawScore()
  
}



  
