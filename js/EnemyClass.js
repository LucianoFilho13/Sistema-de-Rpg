class EnemyClass {
    constructor(typeEnemy){
        this.enemyType = typeEnemy

        this.randomLife();
        this.lifeHud();
        this.setElementPosition();
        this.setElementsStyle();

        this.randomEnemyRound = Math.round(random(1,3))

        this.enemyLife = this.lifeRandom
        this.enemySprite = createSprite(600,200,50,90)
        this.enemySprite.shapeColor = "Pink"
        
        //this.enemySprite.shapeColor = 'green'

        this.enemyWalkingSide = 'right'
        this.enemyArea = createSprite(this.enemySprite.x, this.enemySprite.y, 260, 140)
        this.enemyArea.shapeColor = 'purple'
        //this.enemyArea.visible = 0

        //this.coin.setCollider('rectangle') //Setar colisão, suas props são (forma:'rectangle ou circle', x, y, width, height)
    }

    randomLife(){
        this.lifeRandom = Math.round(random(10, 15))
    }

    lifeHud(){
        this.lifeText = createElement("h4"); 
        var lifeCounterEnemy = this.lifeRandom 
        this.lifeText.html("Vida do Inimigo: " + lifeCounterEnemy);
    }

    npcWalking(){
        this.enemyArea.y = this.enemySprite.y
        switch (this.enemyType) {
            case "Rapido":
                if (this.enemyWalkingSide === 'right'){
                    this.enemySprite.x += 6
                    this.enemyArea.x = this.enemySprite.x +155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'left'
                    }, 2000);
                }
                if (this.enemyWalkingSide === 'left'){
                    this.enemySprite.x -= 6
                    this.enemyArea.x = this.enemySprite.x -155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'right'
                    }, 2000);
                }
                break;

            case "Padrão":
                if (this.enemyWalkingSide === 'right'){
                    this.enemySprite.x += 3
                    this.enemyArea.x = this.enemySprite.x +155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'left'
                    }, 2000);
                }
                if (this.enemyWalkingSide === 'left'){
                    this.enemySprite.x -= 3
                    this.enemyArea.x = this.enemySprite.x -155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'right'
                    }, 2000);
                }
                break;

            case "Lento":
                if (this.enemyWalkingSide === 'right'){
                    this.enemySprite.x += 1
                    this.enemyArea.x = this.enemySprite.x +155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'left'
                    }, 2000);
                }
                if (this.enemyWalkingSide === 'left'){
                    this.enemySprite.x -= 1
                    this.enemyArea.x = this.enemySprite.x -155
                    setTimeout(() => {
                        this.enemyWalkingSide = 'right'
                    }, 2000);
                }
                break;
        }
    }

    npcVision(){
        if (knight.playerSprite.isTouching(this.enemySprite)){
            setInterval(() => {
                knight.playerLife -= 1
            }, 1000);
        }

    }

    setElementsStyle(){
        this.lifeText.class("lifeEnemyText")
    }

    setElementPosition(){
        //this.lifeText.position(this.enemySprite_X, this.enemySprite_Y)
    }

    display(){
        
        
    }
}