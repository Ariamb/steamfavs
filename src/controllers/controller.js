const axios = require('axios')

const steamCache = require('./../cache/steamCache')
const detailsCache = require('../cache/detailsCache')
module.exports = {
    getAll: async function (req, res) {
        const cachedData = steamCache.get(0)
        if (cachedData == undefined){
            console.log('nothing on cache')
            const gameData = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
            steamCache.set(0, gameData.data.applist.apps)
            res.send(gameData.data.applist.apps)
        } else res.send(cachedData)
        //caching the getAll to increase performance on multiple requests
        //infinite TTL on purpose
        //still slow though. A lot of data to send as response.
        //decided to not use the limiter route sent by email. 
        //This caching alone was good enough to improve my local performance
        
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
        //gameData.data[appid].data is just to reduce amount of useless data. formatting, if you will        
    }
}




