const api = require('./src/routes/routes')





api.listen(8000, () =>
    console.log('server listening on port 8000')
)