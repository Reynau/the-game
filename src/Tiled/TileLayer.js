let Tile = require('./Tile')

function findTileset(gid, tilesets) {
  let tileset
  for (let i = tilesets.length - 1; i >= 0; i--) {
    tileset = tilesets[i]
    if (tileset.firstGid <= gid) {
      break
    }
  }
  return tileset
}

let TileLayer = function (layer, tileSets) {
  PIXI.Container.call(this)

  for (let property in layer) {
    if (layer.hasOwnProperty(property)) {
      this[property] = layer[property]
    }
  }

  this.alpha = parseFloat(layer.opacity)
  this.tiles = []

  for (let y = 0; y < layer.map.height; y++) {
    for (let x = 0; x < layer.map.width; x++) {
      let i = x + (y * layer.map.width)

      if (layer.tiles[i] && layer.tiles[i].gid && layer.tiles[i].gid !== 0) {
        let tileset = findTileset(layer.tiles[i].gid, tileSets)
        let tile = new Tile(layer.tiles[i], tileset, layer.horizontalFlips[i], layer.verticalFlips[i], layer.diagonalFlips[i])

        tile.x = x * layer.map.tileWidth
        tile.y = y * layer.map.tileHeight + (layer.map.tileHeight - tile.textures[0].height)

        tile._x = x
        tile._y = y

        if (tileset.tileOffset) {
          tile.x += tileset.tileOffset.x
          tile.y += tileset.tileOffset.y
        }

        if (tile.textures.length > 1) {
          tile.animationSpeed = 1000 / 60 / tile.animations[0].duration
          tile.gotoAndPlay(0)
        }

        this.tiles.push(tile)

        this.addTile(tile)
      }
    }
  }
}

TileLayer.prototype = Object.create(PIXI.Container.prototype)

TileLayer.prototype.addTile = function (tile) {
  this.addChild(tile)
}

module.exports = TileLayer
