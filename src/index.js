const PIXI = require('pixi.js')

const Character = require('./Character')
const Entities = require('./Entities')
const { Directions, Key, KeyState, AnimationIdentifiers } = require('./Constants')

let lastKey = null

const keyState = {
  [Key.W]: KeyState.Up,
  [Key.A]: KeyState.Up,
  [Key.S]: KeyState.Up,
  [Key.D]: KeyState.Up
}

const dirForKey = {
  [Key.W]: Directions.Up,
  [Key.A]: Directions.Left,
  [Key.S]: Directions.Down,
  [Key.D]: Directions.Right
}

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader

// Game constants
let character = {}
let entities = {}

document.body.appendChild(app.view)

loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .load(function (loader, resources) {
    character = new Character(resources.character.texture, 32, 32)

    entities.heart = new Entities.Heart(resources.objects.texture, 64, 64)
    entities.coin = new Entities.Coin(resources.objects.texture, 128, 128)

    app.stage.addChild(character.getAnimation())
    app.stage.addChild(entities.heart.getAnimation())
    app.stage.addChild(entities.coin.getAnimation())

    character.playAnimation()
    entities.heart.playAnimation()
    entities.coin.playAnimation()

    initListeners()

    // character.setAnimation(AnimationIdentifiers.MoveRight)

    app.ticker.add(function () {
      let dir = getCharacterDir()
      character.setActualDirection(dir)
    })
  })

function getCharacterDir () {
  if (keyState[Key.W] === KeyState.Down) return Directions.Up
  if (keyState[Key.A] === KeyState.Down) return Directions.Left
  if (keyState[Key.S] === KeyState.Down) return Directions.Down
  if (keyState[Key.D] === KeyState.Down) return Directions.Right
  return null
}

function initListeners () {
  document.addEventListener('keydown', (e) => {
    let state = keyState[e.keyCode]
    if (state != null && state === KeyState.Up) keyState[e.keyCode] = KeyState.Down
  })

  document.addEventListener('keyup', (e) => {
    let state = keyState[e.keyCode]
    if (state != null && state === KeyState.Down) keyState[e.keyCode] = KeyState.Up
  })
}
