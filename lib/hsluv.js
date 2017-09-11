const imagePal = require('image-pal/lib/hsluv');
const getColors = require('./shared/get-colors');

module.exports = (options, cb) => {
  getColors(imagePal, options, cb);
}
