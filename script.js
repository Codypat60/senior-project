

const axios = require('axios');

axios.get('https://aviationweather.gov/api/data/metar?ids=KMCI')
    .then(response => {
        console.log(response.data)
    });