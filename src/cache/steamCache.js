const NodeCache = require('node-cache')
const steamCache = new NodeCache()

//exporting in case i ever need to use this cache over multiple files

module.exports = steamCache