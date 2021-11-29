const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for express config
const publicDirectoryPaths = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to serve
app.use(express.static(publicDirectoryPaths));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vaska',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Vaska',
    title: 'About Page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Help page!!!',
    title: 'Help',
    name: 'Vaska',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404',
    name: 'Vaska',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    title: '404',
    name: 'Vaska',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port:3000');
});
