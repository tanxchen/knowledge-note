const fs = require('fs')
const http = require('http')
const path = require('path')
const crypto = require('crypto')

http.createServer(function (req, res) {
  const file = path.join(__dirname, req.url)

  fs.stat(file, function (err, stat) {
    if (err) {
      sendError(err, req, res, file, stat)
    } else {
      // modified(req, res, file, stat)
      etag(req, res, file, stat)
    }
  })
}).listen(8888, function () {
  console.log('server start at http://localhost:8888/index.html')
})

function modified (req, res, file, stat) {
  const IfModifiedSince = req.headers['if-modified-since']
  if (IfModifiedSince) {
    if (IfModifiedSince === stat.ctime.toGMTString()) {
      res.statusCode = 304
      res.end()
    } else {
      send(req, res, file, stat)
    }
  } else {
    send(req, res, file, stat)
  }
}

function etag (req, res, file, stat) {
  const IfNoneMatch = req.headers['if-none-match'];
  const etag = crypto.createHash('sha1').update(stat.ctime.toGMTString() + stat.size).digest('hex');
  if (IfNoneMatch) {
    if (IfNoneMatch === etag) {
      res.statusCode = 304
      res.end()
    } else {
      send(req, res, file, etag);
    }
  } else {
    send(req, res, file, etag)
  }
}

function readFile (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function send (req, res, file, statOfEtag) {
  // 20000 毫秒后过期
  // res.setHeader('Expires',new Date(Date.now() + 20000).toGMTString())

  // 4 秒后过期
  // res.setHeader('Cache-Control','max-age=4')

  // res.setHeader('Last-Modified', statOfEtag.ctime.toGMTString())

  res.setHeader('ETag', statOfEtag)

  res.end(readFile(file))
}

function sendError (err, req, res, file, etag) {
  res.writeHead(400, { 'Content-Type': 'text/html' })
  res.end(err ? err.toString() : 'Not Found')
}
