const PIXI = require('pixi.js')
const path = require('path')
const tmx = require('tmx-parser')
PIXI.extras.TiledMap = require('./Tiled/TiledMap')

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

app.stop()
loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .add('map', 'maps/testmap.tmx')
  .add('assets/gfx/Overworld.png')
  .use((resource, next) => {
    if (!(resource.name === 'map')) {
      return next()
    }
    let route = path.dirname(resource.url.replace(this.baseUrl, ''))
    tmx.parse(resource.xhr.responseText, route, function (err, map) {
      if (err) throw err
      resource.data = map
      next()
    })
  })
  .load(function (loader, resources) {
    let tileMap = new PIXI.extras.TiledMap('map')
    app.stage.addChild(tileMap)

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

    app.start()
  })
