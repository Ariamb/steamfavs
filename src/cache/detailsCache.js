const NodeCache = require('node-cache')
const detailsCache = new NodeCache()

//yes, i made two separated caches. Since each has a different purpose,
//it'll be easier to make modifications (like turning into a file cache)

module.exports = detailsCache