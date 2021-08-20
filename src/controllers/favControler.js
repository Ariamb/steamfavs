const axios = require('axios')


module.exports = {
    getAll: async function (req, res) {
        //pega todos os favoritos
    },
    create: async function (req, res) {
        console.log(req.body)
        const {appid, nota} = req.body


    },
    delete: async function (req, res){
        console.log(req.params.appid)
    }
}



