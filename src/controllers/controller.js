const axios = require('axios')

const steamCache = require('./../cache/steamCache')
const detailsCache = require('../cache/detailsCache')

module.exports = {
    getAll: async function (req, res) {
        const cachedData = steamCache.get(0)
        if (cachedData == undefined){
            const gameData = await axios.get('https://simple-api-selection.herokuapp.com/list-games/?title=race')
            steamCache.set(0, gameData.data.applist.apps.app)
            res.send(gameData.data.applist.apps.app)
        } else res.send(cachedData)
        //using the given API to reduce calls. I'd use ?title=winter so i get even less results (369)
        //but by using the given "race" i know it will be cached on your end.
        
    },
    getById: async function (req, res) {
        const appid = req.params.id
        const cachedData = detailsCache.get(appid)
        if (cachedData == undefined){
            const gameData = await axios.get('https://store.steampowered.com/api/appdetails?appids='+appid)
            detailsCache.set(appid, gameData.data[appid].data)
            res.send(gameData.data[appid].data)
        } else res.send(cachedData)
        
        //json doesnt allow numbers as keys. 
        //Trying to avoid possible front end issues by removing the appid key, which is a number. 
        //gameData.data[appid].data is just to reduce amount of useless json attribs. formatting, if you will        
    }
}




