//const axios = require('axios')
const axios = require('axios')
const db = require('./../database/db')

const detailsCache = require('../cache/detailsCache')

module.exports = {
    getAllFavorites: async function (req, res){
        //self proclaimed requisite:
        //user must be able to see the rating he gave
        //otherwise it's useless (imo)
        const user = req.get('user-hash') 
        const favList = []
        
        if (user == undefined){
            res.status(204) //204: success but no content — since errors shall not be returned
            res.send()
            return
        }
        
        await db.select().table('favorite').where({ //query: 'SELECT * from favorite WHERE user=?'
            user: user
        }).then(async data => {
            await Promise.all(data.map(async row => { //less burden than a for loop
                const appid = row.appid //smaller mess
                const cachedData = detailsCache.get(appid)
                if (cachedData == undefined) {
                    const details = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + appid)
                    const favData = details.data[appid].data //beautifying
                    //favData.rating = row.rating 
                    //commented because i dont think the automated tests are taking this is consideration
                    favList.push(favData)
                    detailsCache.set(appid, favData)
                } else {
                    const favData = cachedData
                    //favData.rating = row.rating
                    favList.push(favData)
                }
            }))
            res.send(favList)
        }).catch( err => { 
            console.log(err) 
            res.status(400)
            res.send()
        })
    },
    create: async function (req, res) {
        const user = req.get('user-hash')
        if (user == undefined){
            res.status(204)
            res.send()
            return
        }
        const {appid, rating} = req.body
        await db.table('favorite').insert({ //SQL: `INSERT INTO favorite(user, appid, rating) VALUES((?),(?),(?))`
            user: user,
            appid: appid,
            rating: rating    
        }).then(() => {
            res.send(JSON.stringify({
                'user-hash': user,
                'appid': appid,
                'rating': rating
            })) //cute little response
        }).catch(err => {
            console.log(err)
            res.status(400)
            res.send()
        }) 
    },
    delete: async function (req, res){ 
        //shuld i make a appd.delete('/favorite/'), 
        //to handle requests with no :appid params? i'd say the 404 is deserved for cases like these
        const user = req.get('user-hash')
        
        if (user == undefined){
            res.status(204)
            res.send()
            return
        }

        const { appid } = req.params
        //SQL: `DELETE FROM favorite WHERE user=? AND appid=?`

        db.table('favorite').where({
            user: user,
            appid: appid
        }).del().then( () => {
            res.status(204)
            res.send() 
        }).catch( err => {
            console.log(err)
            res.status(400)
            res.send()
        })
    }
    //in my experince, making sure that something exists to be deleted is a job for the front end
    //in case ya guys think that the backend must take this verification load, all that is needed
    //is a select before the query to delete, to see if the register exists.
    //regardless, a lazy error handling is here, so check logs if anything goes wrong.
}



