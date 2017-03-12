const PIXI = require('pixi.js')

// PIXI constants
const app = new PIXI.Application()
const loader = PIXI.loader
const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle

// Game constants
const characterTextures = []
const sprites = {}

document.body.appendChild(app.view)

loader
  .add('character', 'assets/gfx/character.png')
  .add('objects', 'assets/gfx/objects.png')
  .load(function (loader, resources) {
    let charText = resources.character.texture
    let heartText = resources.objects.texture

    characterTextures.push(generateTextureFromTileMap(charText, new Rectangle(0, 0, 16, 32)))
    characterTextures.push(generateTextureFromTileMap(charText, new Rectangle(16, 0, 16, 32)))
    characterTextures.push(generateTextureFromTileMap(charText, new Rectangle(32, 0, 16, 32)))
    characterTextures.push(generateTextureFromTileMap(charText, new Rectangle(64, 0, 16, 32)))

    heartText.frame = new Rectangle(5*16, 0, 16, 16)

    sprites.character = new PIXI.extras.AnimatedSprite(characterTextures)
    sprites.character.anchor.set(0.5)
    sprites.character.position.set(32, 32)
    sprites.character.animationSpeed = 0.5
    sprites.character.play()

    sprites.heart = new Sprite(heartText)
    sprites.heart.anchor.set(0.5, 0.5)
    sprites.heart.position.set(64, 64)
    sprites.heart.animate = function () {
      let d = new Date();
      sprites.heart.rotation += 0.1
      sprites.heart.scale.x = Math.sin(d.getMilliseconds() / 300)
      sprites.heart.scale.y = Math.sin(d.getMilliseconds() / 300)
    }

    app.stage.addChild(sprites.character)
    app.stage.addChild(sprites.heart)
    app.ticker.add(sprites.heart.animate)
  })

function generateTextureFromTileMap (tileMap, rectangle) {
  tileMap.frame = rectangle
  return tileMap
}
