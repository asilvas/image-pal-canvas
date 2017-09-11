const imagePal = require('image-pal/lib/rgb');
const getColors = require('./shared/get-colors');

module.exports = (options, cb) => {
  getColors(imagePal, options, cb);
}
