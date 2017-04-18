let TileSet = require('./Tileset'),
  TileLayer = require('./TileLayer'),
  ImageLayer = require('./ImageLayer'),
  CollisionLayer = require('./CollisionLayer'),
  path = require('path')

function TiledMap (resourceUrl) {
  PIXI.Container.call(this)

  let route = path.dirname(resourceUrl)
  let data = PIXI.loader.resources[resourceUrl].data

  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      this[property] = data[property]
    }
  }

  this.tileSets = []
  this.layers = []

  this.background = new PIXI.Graphics()
  this.background.beginFill(0x000000, 0)
  this.background.drawRect(0, 0, this.width * this.tileWidth, this.height * this.tileHeight)
  this.background.endFill()
  this.addLayer(this.background)

  data.tileSets.forEach(function (tilesetData) {
    this.tileSets.push(new TileSet(route, tilesetData))
  }, this)

  data.layers.forEach(function (layerData) {
    switch (layerData.type) {
      case 'tile':
        switch (layerData.name) {
          case "Collisions":
            let collisionLayer = new CollisionLayer(layerData)
            this.layers['CollisionLayer'] = collisionLayer
            break
          default:
            let tileLayer = new TileLayer(layerData, this.tileSets)
            this.layers[layerData.name] = tileLayer
            this.addLayer(tileLayer)
            break
        }
        break
      case 'image':
        let imageLayer = new ImageLayer(layerData, route)
        this.layers[layerData.name] = imageLayer
        this.addLayer(imageLayer)
        break
      default:
        this.layers[layerData.name] = layerData
    }
  }, this)
}

TiledMap.prototype = Object.create(PIXI.Container.prototype)

TiledMap.prototype.addLayer = function (layer) {
  this.addChild(layer)
}

TiledMap.prototype.getRandWalkablePos = function () {
  let rndX = Math.random() * 800
  let rndY = Math.random() * 600
  while (!this.layers.CollisionLayer.isWalkable(rndX, rndY)) {
    let rndX = Math.random() * 800
    let rndY = Math.random() * 600
  }
  return { x: rndX, y: rndY }
}

module.exports = TiledMap
