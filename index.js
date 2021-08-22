require('dotenv').config()

const api = require('./src/routes/routes')

const cors = require('cors')

api.use(cors())
api.listen(process.env.PORT || 8000, () =>
    console.log('server listening on port 8000')
)