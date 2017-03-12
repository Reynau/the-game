const PIXI = require('pixi.js')

const Character = require('./Character')
const Entities = require('./Entities')

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader
const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle

// Game constants
const sprites = {}

let character = {}
let entities = {}

document.body.appendChild(app.view)

loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .load(function (loader, resources) {
    character = new Character(resources.character.texture, 32, 32)
    character.playAnimation()

    entities.heart = new Entities.Heart(resources.objects.texture, 64, 64)
    entities.heart.playAnimation()

    entities.coin = new Entities.Coin(resources.objects.texture, 128, 128)
    entities.coin.playAnimation()

    app.stage.addChild(character.getAnimation())
    app.stage.addChild(entities.heart.getAnimation())
    app.stage.addChild(entities.coin.getAnimation())
  })


