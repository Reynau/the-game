
module.exports = class CollisionLayer {
  constructor(layer) {
    this.tiles = layer.tiles
    this.width = layer.map.width
    this.height = layer.map.height
  }

  isWalkable (x, y) {
    return (this.tiles[x + y * this.width] === 0)
  }
}