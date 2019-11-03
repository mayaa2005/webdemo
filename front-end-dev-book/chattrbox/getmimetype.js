var mime = require('mime');

var getMimeType = function(url) {
  var fileName = 'index.html';

  if (url.length > 1) {
    fileName = url.substr(url.lastIndexOf('/')+1);
  }

  var type = mime.getType(fileName);
  console.log(fileName+ " mime is " + type);
  return type;
};

module.exports = getMimeType;
