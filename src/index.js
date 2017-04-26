const PIXI = require('pixi.js')
const path = require('path')
const tmx = require('tmx-parser')
PIXI.extras.TiledMap = require('./Tiled/TiledMap')

const Character = require('./Character')
const Entities = require('./Entities')
const Game = require('./Game')
const KeyboardHandler = require('./KeyboardHandler')

const spriteSheetParser = require('./SpriteSheetParser')

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader

// Game constants
let character = {}
let entities = {}

let map = {}

let maxHearts = 10
let maxCoins = 10

document.body.appendChild(app.view)

app.stop()
loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .add('TestMap', 'maps/testmap.tmx')
  .add('assets/gfx/Overworld.png')

  .use(spriteSheetParser)
  .load(function (loader, resources) {
    map = new PIXI.extras.TiledMap('TestMap')
    app.stage.addChild(map)

    character = new Character(new KeyboardHandler(), resources.character.texture, 64, 32, map)
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

    let game = new Game(map, character, entities)

    app.ticker.add(function () {
      game.update()
      game.updateCamera(app.stage, app.renderer)
    })

    app.start()
  })