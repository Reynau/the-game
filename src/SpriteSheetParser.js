const path = require('path')
const tmx = require('tmx-parser')

module.exports = function (resource, next) {
  if (!(resource.extension === 'tmx')) return next()

  let route = path.dirname(resource.url.replace(this.baseUrl, ''))
  tmx.parse(resource.xhr.responseText, route, function (err, map) {
    if (err) throw err
    resource.data = map
    next()
  })
}