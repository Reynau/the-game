let ImageLayer = function (layer, route) {
  PIXI.Container.call(this)

  for (let property in layer) {
    if (layer.hasOwnProperty(property)) {
      this[property] = layer[property]
    }
  }

  this.alpha = parseFloat(layer.opacity)

  if (layer.image && layer.image.source) {
    let sprite = new PIXI.Sprite.fromImage(route + '/' + layer.image.source)
    this.addSprite(sprite)
  }
}

ImageLayer.prototype = Object.create(PIXI.Container.prototype)

ImageLayer.prototype.addSprite = function (sprite) {
  this.addChild(sprite)
}

module.exports = ImageLayer
