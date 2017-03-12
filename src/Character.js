const PIXI = require('pixi.js')
const Rectangle = PIXI.Rectangle

const Constants = require('./Constants')

module.exports = class Character {
  constructor (texture, x, y) {
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

    this.animations = {}
    this.animations.goDown = new PIXI.extras.AnimatedSprite(this.animationTextures.goDown)
    this.animations.goRight = new PIXI.extras.AnimatedSprite(this.animationTextures.goRight)
    this.animations.goUp = new PIXI.extras.AnimatedSprite(this.animationTextures.goUp)
    this.animations.goLeft = new PIXI.extras.AnimatedSprite(this.animationTextures.goLeft)

    this.actualAnimation = this.animations.goDown
    this.actualAnimation.anchor.set(0.5)
    this.actualAnimation.position.set(x, y)
    this.actualAnimation.animationSpeed = 0.05
  }

  getActualDirection () {
    return this.direction
  }

  setActualDirection (direction) {
    this.direction = direction
  }

  getAnimation () {
    return this.actualAnimation
  }

  setAnimation (animationId) {
    switch (animationId) {
      case Constants.AnimationIdentifiers.MoveDown:
        this.actualAnimation = this.animations.goDown
        break
      case Constants.AnimationIdentifiers.MoveRight:
        this.actualAnimation = this.animations.goRight
        break
      case Constants.AnimationIdentifiers.MoveUp:
        this.actualAnimation = this.animations.goUp
        break
      case Constants.AnimationIdentifiers.MoveLeft:
        this.actualAnimation = this.animations.goLeft
        break
    }
  }

  playAnimation () {
    this.actualAnimation.play()
  }

  stopAnimation () {
    this.actualAnimation.stop()
  }
}

function generateTextureFromTileMap (tileMap, rectangle) {
  let tempTexture = tileMap.clone()
  tempTexture.frame = rectangle
  return tempTexture
}
