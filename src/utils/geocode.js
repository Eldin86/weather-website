//request je npm paket koji sluzi za http requests
const request = require('request')

const geocode = (address, callback) => {
    //encodeURIComponent(address) funkcija koja vraca string npr ? postaje %3F
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWR5ODYiLCJhIjoiY2sycWs4YmV2MGVxNjNocWxzc2l5ZmdjYSJ9.kOHR2MXj13qkF0AC7Vmy-w&limit=1`
    //Morali smo postaviti kao defaultnu vrijednost prazan objekat, jer bez toga program se crush, kad nemamo interneta i kad error treba izbaciti
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            /*drugi argument smo proslijedili undefined, jer imamo error, tako da nemamo data koji 
            ocekuje callback funkcija, a mogli smo samo error poslijediti, bez undefind*/
            callback('Unable to connect to location services', undefined)
            //Ako imamo message property koji nam vrati JSON, tako je konfigurisan API, u slucaju da nema trazenog pojma vrati nam message property
            //ili ako je features niz prazan, ako je prazan takodjer znaci da nema trazenog pojma, jer svi podaci su u features propertiju
        }else if(body.message || body.features.length === 0){
            callback('Location not found, try another location', undefined)
        }else{
            //Ako je sve u redu vratimo objekat sa latitude, longitude i location
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode