const api = require('./src/routes/routes')

const cors = require('cors')

api.use(cors())
api.listen(8000, () =>
    console.log('server listening on port 8000')
)