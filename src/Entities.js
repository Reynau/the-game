const Rectangle = PIXI.Rectangle

class Heart {
  constructor (texture, x, y) {
    this.animationTextures = []
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(0, 48, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(16, 48, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(32, 48, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(48, 48, 16, 16)))

    this.animation = new PIXI.extras.AnimatedSprite(this.animationTextures)
    this.animation.anchor.set(0.5)
    this.animation.position.set(x, y)
    this.animation.animationSpeed = 0.1
  }

  getAnimation () {
    return this.animation
  }

  playAnimation () {
    this.animation.play()
  }

  stopAnimation () {
    this.animation.stop()
  }
}

class Coin {
  constructor (texture, x, y) {
    this.animationTextures = []
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(0, 64, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(16, 64, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(32, 64, 16, 16)))
    this.animationTextures.push(generateTextureFromTileMap(texture, new Rectangle(48, 64, 16, 16)))

    this.animation = new PIXI.extras.AnimatedSprite(this.animationTextures)
    this.animation.anchor.set(0.5)
    this.animation.position.set(x, y)
    this.animation.animationSpeed = 0.1
  }

  getAnimation () {
    return this.animation
  }

  playAnimation () {
    this.animation.play()
  }

  stopAnimation () {
    this.animation.stop()
  }
}

function generateTextureFromTileMap (tileMap, rectangle) {
  let tempTexture = tileMap.clone()
  tempTexture.frame = rectangle
  return tempTexture
}

module.exports = {
  Heart,
  Coin,
}