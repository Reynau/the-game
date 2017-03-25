const PIXI = require('pixi.js')

const Character = require('./Character')
const Entities = require('./Entities')
const Game = require('./Game')
const { Directions, Key, KeyState } = require('./Constants')

const keyState = {
  [Key.W]: KeyState.Up,
  [Key.A]: KeyState.Up,
  [Key.S]: KeyState.Up,
  [Key.D]: KeyState.Up
}

let lastKey = null

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
    character = new Character(resources.character.texture, 32, 32)
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

    initListeners()

    // character.setAnimation(AnimationIdentifiers.MoveRight)
    let game = new Game(character, entities)

    app.ticker.add(function () {
      let dir = getDirection()
      game.update(dir, keyState)
    })
  })

function getDirection () {
  if (keyState[Key.W] === KeyState.Down && Key.W === lastKey) return Directions.Up
  if (keyState[Key.A] === KeyState.Down && Key.A === lastKey) return Directions.Left
  if (keyState[Key.S] === KeyState.Down && Key.S === lastKey) return Directions.Down
  if (keyState[Key.D] === KeyState.Down && Key.D === lastKey) return Directions.Right

  if (keyState[Key.W] === KeyState.Down) return Directions.Up
  if (keyState[Key.A] === KeyState.Down) return Directions.Left
  if (keyState[Key.S] === KeyState.Down) return Directions.Down
  if (keyState[Key.D] === KeyState.Down) return Directions.Right

  return null
}

function initListeners () {
  document.addEventListener('keydown', (e) => {
    let state = keyState[e.keyCode]
    if (state !== null && state === KeyState.Up) {
      keyState[e.keyCode] = KeyState.Down
      lastKey = e.keyCode
    }
  })

  document.addEventListener('keyup', (e) => {
    let state = keyState[e.keyCode]
    if (state !== null && state === KeyState.Down) keyState[e.keyCode] = KeyState.Up
  })
}
