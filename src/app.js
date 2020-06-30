const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths fpr Express config
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handle Bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful Text',
        title: 'Help',
        name: 'Jay'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location}={}) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
              forecast: forecastData,
              location,
              address: req.query.address
        
            })
    })
    
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error404', {
        title: '404',
        name: 'Jay',
        errormsg: 'Help Article not found',
    })
})

app.get('*', (req, res) =>{
    res.render('error404', {
        title: '404',
        name: 'Jay',
        errormsg: 'Page not found',
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})