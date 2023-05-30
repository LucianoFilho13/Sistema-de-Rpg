// Kit Inicial Visual Studio Code
// y0kata(Tragictx) / LucianoFilho13
// Variaveis

var knight, enemy;
var fieldAttack;
const urlImageBackground = 'https://miro.medium.com/v2/resize:fit:1200/1*vIKR4AtyQxcIDVYOd6IdsQ.png';
let imagePreLoad, imageSprite, lifeEnemySk;
let collisionSolo, collisionSky;
let soundDamagePlayer;
let cam;


function preload(){ // Carregar imagens, gifs, sons/musica e videos
  imagePreLoad = loadImage(urlImageBackground)
  soundDamagePlayer = loadSound("./assets/damageSound.mp3")
}

function setup(){ // Setar valores iniciais
  createCanvas(800,400,WEBGL);
  //collisionSolo = createSprite(10,10) 
  imageSprite = createSprite(400,150,100,100)
  imageSprite.addImage(imagePreLoad)
  imageSprite.scale = 0.8;

  //Objeto do personagem
  knight = {
    playerLife: 5,
    inventory: [],
    playerState : 'idle',
    playerSprite: null,
    sideCharacterSprite: 'right',
    isJumping: false,
    isAttack: false,
    isStanding: true,
    maxJump: 1,
    damage: Math.round(random(1,2)), //Já iniciar com um número aleatório
  };

  knight.playerSprite = createSprite(400,200,50,90) //Y: 200
  collisionSolo = createSprite(400,360,2800,30)
  collisionSky = createSprite(knight.playerSprite.x, 0, 90, 50)

  cam = createCamera()
  cam.setPosition(knight.playerSprite.x, knight.playerSprite.y,340)

  enemyClass = new EnemyClass("Rapido")
  lifeEnemySk = this.enemyClass.enemyLife

}

function draw(){ // Aparecer as informações na tela
  background("black"); // Cor do fundo
  allFunction(); //Função de todas as funções

  this.enemyClass.setElementPosition()
  
  knight.playerSprite.velocityY += 1 //Gravidade
  this.enemyClass.enemySprite.velocityY += 1 //Gravidade

  collisionSky.x = knight.playerSprite.x

  cam.setPosition(knight.playerSprite.x, 200,340) //Fazer a camera seguir o personagem


  knight.playerSprite.collide(collisionSolo)
  this.enemyClass.enemySprite.collide(collisionSolo)
  knight.playerSprite.collide(collisionSky)

  if (knight.playerSprite.collide(collisionSky)){
    knight.isJumping = false
  }

  enemyClass.npcWalking()
  enemyClass.npcVision();
  console.log(knight.playerLife)

  // console.log("Vida do Inimigo: " + this.enemyClass.enemyLife)
  // console.log("Dano do Personagem: " + knight.damage)

  // console.log(knight.playerSprite.velocityY)

  drawSprites(); //Responsavel em renderizar o jogo(sprites)
}

//Funções
function allFunction(){
  //Insira as funções aqui
  function keyBoard(){
    if (keyDown("a")) {
      knight.playerSprite.x -= 5 //Andar para a esquerda
      knight.sideCharacterSprite = 'left' //Mudar o lado do personagem no objeto dele para a Esquerda
      knight.playerSprite.shapeColor = 'red'
    } else if (keyDown('d')){ //Fim da Função andar para a esquerda e começo da Função andar para a direita
      knight.playerSprite.x += 5 //Andar para a direita
      knight.sideCharacterSprite = 'right' //Mudar o lado do personagem no objeto dele para a Direita
      knight.playerSprite.shapeColor = 'yellow'
    } //Fim da Função andar para a direita

    if (keyDown('space') && knight.isJumping === false){ 
      if (knight.playerSprite.velocityY === 0 || knight.playerSprite.velocityY === 1){ 
        //knight.maxJump -= 1
        knight.isJumping = true
        if (knight.isJumping === true){ 
          knight.playerSprite.velocityY -= 15
          knight.isJumping = false 
        }
      }
    } //Fim da função pulo

    if (keyDown("s") || keyDown("shift") && knight.isStanding === true){
      knight.isStanding = false
      knight.playerSprite.height = 60
      //knight.playerSprite.velocityY = 100
    } else {
      knight.isStanding = true
      knight.playerSprite.height = 90
      setTimeout(() => {
        //knight.playerSprite.velocityY = 100
      }, 0);
    }

    //Se aperta a tecla "E" e o personagem não tiver atacando. Atacar!
    if (keyDown('e') && knight.isAttack == false){
        fieldAttack = createSprite(knight.playerSprite.x+90, knight.playerSprite.y, 140, 70) //Definir a variável criada no início do código como sprite e definir suas propriedades
        fieldAttack.shapeColor = 'blue' //Adicionar uma cor a area de ataque para facilitar a enxegar
        knight.isAttack = true //Definir o personagem como atacando
        knight.damage = Math.round(random(1,2)) //Ficar trocando o dano do personagem
        fieldAttack.debug = true;
        //Criar um intervalo para destruir a area de ataque
        setTimeout(() => {
          fieldAttack.destroy() //Destruir a area de ataque
          //Criar um cooldown para atacar novamente
          setTimeout(() => {
            knight.isAttack = false //Definir o personagem como não atacando
          }, 500);
        }, 1); 

      //Diminuir a vida do inimigo de acordo com o dano tomado  
      if(fieldAttack.collide(this.enemyClass.enemySprite)){
        this.enemyClass.enemyLife -= knight.damage //Vida do inimigo - dano do personagem
        soundDamagePlayer.play()
      }
        /*function enemyDeath(){
          if(enemy.enemySprite.x === fieldAttack.x){
            enemy.enemySprite.destroy()
          }
        }
        enemyDeath();  */

      //Trocar a area de ataque de acordo com o lado
      if (knight.sideCharacterSprite === 'right'){
        fieldAttack.x = knight.playerSprite.x+90 //X da Area de ataque vai ser igual o X do personagem +90 para não ficar dentro do player
        fieldAttack.y = knight.playerSprite.y //Y da Area de ataque vai ser igual o Y do personagem
        fieldAttack.setCollider("rectangle", fieldAttack.x - knight.playerSprite.x -90, fieldAttack.y - knight.playerSprite.y, 140, 70) //Manter a colisão de acordo com a posição
      } else {
        fieldAttack.x = knight.playerSprite.x-90 //X da Area de ataque vai ser igual o X do personagem +90 para não ficar dentro do player
        fieldAttack.y = knight.playerSprite.y //Y da Area de ataque vai ser igual o Y do personagem
        fieldAttack.setCollider("rectangle", fieldAttack.x - knight.playerSprite.x +90, fieldAttack.y - knight.playerSprite.y, 140, 70) //Manter a colisão de acordo com a posição
      }

    }//Fim da função ataque


  } //Fim da função

  //Função para verificar se o inimigo já morreu
  function enemyDeath(){
    if (this.enemyClass.enemyLife <= 0){ //Se a vida do inimigo for menor ou igual a zero então:
      // enemyClass = null
    }
  }

  //Chamar Funções
  keyBoard();
  enemyDeath();
}