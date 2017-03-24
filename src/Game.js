
module.exports = class Game {
  constructor (character, entities) {
    this.character = character
    this.entities = entities

    // Temporal lines
    this.character.playAnimation()
    this.entities.hearts.forEach((heart) => heart.playAnimation())
    this.entities.coins.forEach((coin) => coin.playAnimation())
  }

  update (dir) {
    this.character.move(dir)
  }
}
