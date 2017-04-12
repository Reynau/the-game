const PIXI = require('pixi.js')
const Rectangle = PIXI.Rectangle

const { Directions, KeyState, Key } = require('./Constants')

module.exports = class Character {
  constructor (keyboardHandler, texture, x, y, map) {
    this.keyboardHandler = keyboardHandler
    this.baseTexture = texture
    this.map = map

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

    this.lastDirection = null
    this.coins = 0
    this.health = 0
    this.speed = 1
  }

  getDirection () {
    let keyState = this.keyboardHandler.getKeyState()
    let lastKey = this.keyboardHandler.getLastKey()

    if (keyState[Key.W] === KeyState.Down && Key.W === lastKey) return Directions.Up
    if (keyState[Key.A] === KeyState.Down && Key.A === lastKey) return Directions.Left
    if (keyState[Key.S] === KeyState.Down && Key.S === lastKey) return Directions.Down
    if (keyState[Key.D] === KeyState.Down && Key.D === lastKey) return Directions.Right

    if (keyState[Key.W] === KeyState.Down) return Directions.Up
    if (keyState[Key.A] === KeyState.Down) return Directions.Left
    if (keyState[Key.S] === KeyState.Down) return Directions.Down
    if (keyState[Key.D] === KeyState.Down) return Directions.Right

    return null
  }

  move () {
    let newDirection = this.getDirection()

    if (newDirection === null) {
      this.animation.gotoAndStop(0)
      this.lastDirection = null
      return
    }

    if (this.lastDirection !== newDirection) {
      this.changeAnimationDir(newDirection)
      this.lastDirection = newDirection
    }

    let newPos = this.getNextPosition(newDirection)

    if (this.map.layers.CollisionLayer.isWalkable(newPos.x, newPos.y)) {
      this.moveCharacterTo(newPos)
    }
    else {
      console.log('Collision!')
    }
  }

  changeAnimationDir (direction) {
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
    }
  }

  getNextPosition (direction) {
    let pos = this.getActualPosition()
    switch (direction) {
      case Directions.Up:
        pos.y -= this.speed
        break
      case Directions.Down:
        pos.y += this.speed
        break
      case Directions.Left:
        pos.x -= this.speed
        break
      case Directions.Right:
        pos.x += this.speed
        break
    }
    return pos
  }

  moveCharacterTo (pos) {
    this.animation.position.set(pos.x, pos.y)
  }

  getActualPosition () {
    return { x: this.animation.position.x, y: this.animation.position.y }
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
