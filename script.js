import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

axios.get('https://aviationweather.gov/api/data/metar?ids=KHUF')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });