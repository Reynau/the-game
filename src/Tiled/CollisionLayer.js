
module.exports = class CollisionLayer {

  constructor (layer) {
    this.constructCollisionsMap(layer.tiles)
    this.width = layer.map.width
    this.height = layer.map.height
  }

  isWalkable (x, y) {
    let posx = Math.floor(x / 16)
    let posy = Math.floor(y / 16)
    return this.collisionsMap[posx + posy * this.width]
  }

  constructCollisionsMap (tilesMap) {
    this.collisionsMap = new Array(tilesMap.length)

    for (let i = 0; i < tilesMap.length; ++i) {
      let tile = tilesMap[i]

      this.collisionsMap[i] = (tile === undefined)
    }
  }
}