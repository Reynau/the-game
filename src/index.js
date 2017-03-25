const PIXI = require('pixi.js')

const Character = require('./Character')
const Entities = require('./Entities')
const Game = require('./Game')
const KeyboardHandler = require('./KeyboardHandler')

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader

// Game constants
let character = {}
let entities = {}

let maxHearts = 10
let maxCoins = 10

document.body.appendChild(app.view)

loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .load(function (loader, resources) {
    let keyboardHandler = new KeyboardHandler()
    character = new Character(keyboardHandler, resources.character.texture, 32, 32)
    app.stage.addChild(character.getAnimation())

    entities.hearts = []
    for (let i = 0; i < maxHearts; ++i) {
      let rndX = Math.random() * 800
      let rndY = Math.random() * 600
      let tmpHeart = new Entities.Heart(resources.objects.texture, rndX, rndY)
      entities.hearts.push(tmpHeart)
      app.stage.addChild(tmpHeart.getAnimation())
      tmpHeart.visible = false
    }

    entities.coins = []
    for (let i = 0; i < maxCoins; ++i) {
      let rndX = Math.random() * 800
      let rndY = Math.random() * 600
      let tmpCoin = new Entities.Coin(resources.objects.texture, rndX, rndY)
      entities.coins.push(tmpCoin)
      app.stage.addChild(tmpCoin.getAnimation())
      tmpCoin.visible = false
    }

    let game = new Game(character, entities)

    app.ticker.add(function () {
      game.update()
    })
  })
