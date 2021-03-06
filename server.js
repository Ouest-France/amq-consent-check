var express = require('express')
var cors = require('cors')
var app = express()

var whitelist = ['https://amp-ouest--france-fr.cdn.ampproject.org',
  'https://amp-ouest--france-fr.amp.cloudflare.com',
  'https://amp-ouest--france-fr.bing-amp.com',
  'https://amp.ouest-france.fr',
  'https://qualamp.ouest-france.fr'
]

var corsOptions = {
  credentials:true,
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE'.split(','),
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/', function(req, res, next) {
  res.json({
    "hello": "world"
  });
})

app.post('/', cors(corsOptions), function(req, res, next) {
  res.json({
    "promptIfUnknown": true
  });
})

app.options('*', cors(corsOptions), function(req, res, next) {
  res.json({
    "promptIfUnknown": true
  });
})

app.listen(8080, function() {
  console.log('CORS-enabled web server listening on port 80')
})
