const axios = require('axios')


module.exports = {
    getAll: async function (req, res) {
        const gameData = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
        res.send(gameData.data.applist.apps)
    },
    getById: async function (req, res) {
        const appid = req.params.id
        const gameData = await axios.get('https://store.steampowered.com/api/appdetails?appids='+appid)
        //json doesnt allow numbers as keys. 
        //Trying to avoid possible front end issues by removing the appid key, which is a number. 
        res.send(gameData.data[appid])
    },
}



