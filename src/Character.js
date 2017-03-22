const PIXI = require('pixi.js')
const Rectangle = PIXI.Rectangle

const { Directions, AnimationIdentifiers } = require('./Constants')

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
    this.animation.animationSpeed = 0.05
  }

  getActualDirection () {
    return this.direction
  }

  setActualDirection (direction) {
    this.direction = direction
    switch (direction) {
      case Directions.Up:
        this.animation.stop()
        this.animation.textures = this.animationTextures.goUp
        this.animation.play()
        this.moveAnimation(0, -1)
        break
      case Directions.Down:
        this.animation.stop()
        this.animation.textures = this.animationTextures.goDown
        this.animation.play()
        this.moveAnimation(0, 1)
        break
      case Directions.Left:
        this.animation.stop()
        this.animation.textures = this.animationTextures.goLeft
        this.animation.play()
        this.moveAnimation(-1, 0)
        break
      case Directions.Right:
        this.animation.stop()
        this.animation.textures = this.animationTextures.goRight
        this.animation.play()
        this.moveAnimation(1, 0)
        break
      case null:
        this.animation.gotoAndStop(0)
        break
    }
  }

  moveAnimation (dx, dy) {
    let x = this.animation.position.x
    let y = this.animation.position.y

    this.animation.position.set(x + dx, y + dy)
  }

  getAnimation () {
    return this.animation
  }

  setAnimation (animationId) {
    switch (animationId) {
      case AnimationIdentifiers.MoveDown:
        this.animation.texture = this.animationTextures.goDown
        break
      case AnimationIdentifiers.MoveRight:
        this.animation.texture = this.animationTextures.goRight
        break
      case AnimationIdentifiers.MoveUp:
        this.animation.texture = this.animationTextures.goUp
        break
      case AnimationIdentifiers.MoveLeft:
        this.animation.texture = this.animationTextures.goLeft
        break
    }
  }

  playAnimation () {
    this.animation.play()
  }

  stopAnimation () {
    this.animation.stop()
  }
}

function generateTextureFromTileMap (tileMap, rectangle) {
  return new PIXI.Texture(tileMap, {
    x: rectangle.x,
    y: rectangle.y,
    width: rectangle.width,
    height: rectangle.height
  });
}
