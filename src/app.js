//nodemon src/app.js -e js,hbs Monitoring za js i hbs
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//spremamo port iz env varijable, ili defaultno 3000 za localhost ako nema env varijable
const port = process.env.PORT || 3000

const publicDirectoyPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoyPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Wather',
        name: 'Eldin Maslesa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eldin Maslesa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help message',
        title: 'Help',
        name: 'Eldin Maslesa'
    })
})

//weather page
//poslali smo u browser objekat sa podacima, objekat automatski pretvori u JSON
app.get('/weather', (req, res) => {
    //Ako nemamo query http://localhost:3000/weather?address=, odnosno ako nism unijeli address u url poslji error kao json u browser
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    /* ** assignment ** */
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({
                        error: error
                    })
                } else {
                    //Ako je sve u redu vratimo JSON u http://localhost:3000/weather?address=Mostar npr
                    //Odnosno krajnji endpoint
                    res.send({
                        forecast: forecastData.weather_description,
                        location: location,
                        address: req.query.address
                    })
                }
            })

        }
        /* ** end assignment ** */
    })
})

//informacije o query string su u req
app.get('/products', (req, res) => {
    /* Ne mozemo da respond na reqest dva puta (error:  Cannot set headers after they are sent to the client) */
    //if uslov koji se aktivira ako query "search" nije prosljedjen u url
    if(!req.query.search){
        res.send({
            error: 'You Must provide search term'
        })
        return
    }
    //pomocu req.query dohvatimo query iz url-a
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//404 error za page koji nema poslije /help, matchira svaki page koji nije match do sad za /help/
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Specific help article not found',
        name: 'Eldin Maslesa',
        title: '404 Help not found'
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found, or URL is not correct',
        name: 'Eldin Maslesa',
        title: '404'
    })
})


//startamo server, tako sto proslijedimo port, drugi argument je funkcija koja se aktivira kad je server aktivan
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})