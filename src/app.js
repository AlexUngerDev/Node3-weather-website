const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Setup handlbars engine and views locations
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('/help', (req, res)=> {
    res.render('help', {
        helpMessage: 'Help yourself, mother fucker!',
        name: 'Alex Unger',
        title: 'Help page!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Alex Unger'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex',

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term.'
        })
    }
    res.send({
        products: []
    })
})


app.get ('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'Alex Unger',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'Alex Unger',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})