//const axios = require('axios')
const axios = require('axios')
const db = require('./../database/db')

const detailsCache = require('../cache/detailsCache')

module.exports = {
    getAllFavorites: async function (req, res){
        const user = req.get('user-hash')
        const sql = 'SELECT * from favorite WHERE user=?'
        const favList = []

        db.all(sql, user, async (err, result) => {
            if (err) {
                res.status(400)
                res.send()
                console.log(err)
            }
            for(let i = 0; i<result.length; i++) {
                const appid = result[i].appid //smaller mess
                const cachedData = detailsCache.get(appid)
                if (cachedData == undefined) {
                    const details = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + appid)
                    favList.push(details.data[appid].data)
                    detailsCache.set(appid, details.data[appid].data)
                } else favList.push(cachedData)

                if(i == result.length-1){
                    res.send(favList)
                }
            }
            if(result.length == 0){
                res.status(204)
                res.send()
            }
            /*  ok, so sqlite3 apparently does't have good support for async/await or promises in general.
                Meaning? callback hell. To reduce callback hell, I used this custom for loop 
                (I'd have to do a huge callback hell to work with a .forEach loop, not worth it)
                Therefore, I went with the K.I.S.S. principle. I should've used Knex, though. 
            */
        })
    },
    create: async function (req, res) {
        const user = req.get('user-hash')
        const {appid, rating} = req.body
        db.run(`INSERT INTO favorite(user, appid, rating) VALUES((?),(?),(?))`, [user, appid, rating], function(err) {
            if (err) return console.log(err.message)
        })
        res.send(
        JSON.stringify({
            'user-hash': user,
            'appid': appid,
            'rating': rating
        })) //cute little response
        
    },
    delete: async function (req, res){
        const user = req.get('user-hash')
        const { appid } = req.params
        db.run(`DELETE FROM favorite WHERE user=? AND appid=?`, [user, appid], function(err) {
            if (err) return console.log(err.message)
        })
        res.status(204)
        res.send()   
    }
    //in my experince, making sure that something exists to be deleted is a job for the front end
    //in case ya guys think that the backend must take this verification load, all that is needed
    //is a select before the query to delete, to see if the register exists.
}



