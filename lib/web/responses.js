var basicAuth = require('basic-auth')
  , cfg       = require('../config')

exports.badRequest = function (cep, res) {
  if (cep) return false
  else {
    res.sendStatus(400)
    return true
  }
}

exports.internalError = function (err, res) {
  if (err) {
    console.error(err)
    res.sendStatus(500)
    return true
  } else return false
}

exports.noContent = function (endereco, res) {
  if (endereco) return false
  else {
    res.sendStatus(204)
    return true
  }
}

exports.ok = function (endereco, res) {
  delete endereco._id
  delete endereco.data
  res.json(endereco)
}

exports.unauthorized = function (req, res) {
  if (!cfg.auth) return false

  var credentials = basicAuth(req)
  if (credentials) {
    var auth = credentials.name + ':' + credentials.pass
    if (auth === cfg.auth) return false
  }

  res.sendStatus(401)
  return true
}

