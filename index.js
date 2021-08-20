const api = require('./src/routes/routes.js')

api.listen(8000, () =>
    console.log('server on')
)