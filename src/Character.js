const PIXI = require('pixi.js')
const Rectangle = PIXI.Rectangle

const { Directions } = require('./Constants')

module.exports = class Character {
  constructor (texture, x, y) {
    this.baseTexture = texture

    this.animationTextures = {}
    this.animationTextures.goDown = []
    this.animationTextures.goDown.push(generateTextureFromTileMap(texture, new Rectangle(0, 0, 16, 32)))
    this.animationTextures.goDown.push(generateTextureFromTileMap(texture, new Rectangle(16, 0, 16, 32)))
    this.animationTextures.goDown.push(generateTextureFromTileMap(texture, new Rectangle(32, 0, 16, 32)))
    this.animationTextures.goDown.push(generateTextureFromTileMap(texture, new Rectangle(48, 0, 16, 32)))

    this.animationTextures.goRight = []
    this.animationTextures.goRight.push(generateTextureFromTileMap(texture, new Rectangle(0, 32, 16, 32)))
    this.animationTextures.goRight.push(generateTextureFromTileMap(texture, new Rectangle(16, 32, 16, 32)))
    this.animationTextures.goRight.push(generateTextureFromTileMap(texture, new Rectangle(32, 32, 16, 32)))
    this.animationTextures.goRight.push(generateTextureFromTileMap(texture, new Rectangle(48, 32, 16, 32)))

    this.animationTextures.goUp = []
    this.animationTextures.goUp.push(generateTextureFromTileMap(texture, new Rectangle(0, 64, 16, 32)))
    this.animationTextures.goUp.push(generateTextureFromTileMap(texture, new Rectangle(16, 64, 16, 32)))
    this.animationTextures.goUp.push(generateTextureFromTileMap(texture, new Rectangle(32, 64, 16, 32)))
    this.animationTextures.goUp.push(generateTextureFromTileMap(texture, new Rectangle(48, 64, 16, 32)))

    this.animationTextures.goLeft = []
    this.animationTextures.goLeft.push(generateTextureFromTileMap(texture, new Rectangle(0, 96, 16, 32)))
    this.animationTextures.goLeft.push(generateTextureFromTileMap(texture, new Rectangle(16, 96, 16, 32)))
    this.animationTextures.goLeft.push(generateTextureFromTileMap(texture, new Rectangle(32, 96, 16, 32)))
    this.animationTextures.goLeft.push(generateTextureFromTileMap(texture, new Rectangle(48, 96, 16, 32)))

    this.animation = new PIXI.extras.AnimatedSprite(this.animationTextures.goDown)
    this.animation.anchor.set(0.5)
    this.animation.position.set(x, y)
    this.animation.animationSpeed = 0.1

    this.direction = null
    this.coins = 0
    this.health = 0
  }

  move (direction) {
    if (this.direction !== direction) {
      switch (direction) {
        case Directions.Up:
          this.animation.textures = this.animationTextures.goUp
          this.animation.gotoAndPlay(1)
          break
        case Directions.Down:
          this.animation.textures = this.animationTextures.goDown
          this.animation.gotoAndPlay(1)
          break
        case Directions.Left:
          this.animation.textures = this.animationTextures.goLeft
          this.animation.gotoAndPlay(1)
          break
        case Directions.Right:
          this.animation.textures = this.animationTextures.goRight
          this.animation.gotoAndPlay(1)
          break
        case null:
          this.animation.gotoAndStop(0)
          break
      }
      this.direction = direction
    }
    switch (direction) {
      case Directions.Up:
        this.moveCharacter(0, -1)
        break
      case Directions.Down:
        this.moveCharacter(0, 1)
        break
      case Directions.Left:
        this.moveCharacter(-1, 0)
        break
      case Directions.Right:
        this.moveCharacter(1, 0)
        break
    }
  }

  moveCharacter (dx, dy) {
    let x = this.animation.position.x
    let y = this.animation.position.y

    this.animation.position.set(x + dx, y + dy)
  }

  getAnimation () {
    return this.animation
  }

  getPosition () {
    return this.animation.position
  }

  addCoins (coins) {
    this.coins += coins
    console.log('Coins: ' + this.coins)
  }

  addHealth (health) {
    this.health += health
    console.log('Health: ' + this.health)
  }
}

function generateTextureFromTileMap (tileMap, rectangle) {
  return new PIXI.Texture(tileMap, {
    x: rectangle.x,
    y: rectangle.y,
    width: rectangle.width,
    height: rectangle.height
  })
}
