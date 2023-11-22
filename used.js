// METAR information function
let metarData;

const getMetarData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/metar?ids=KMCI');
    const data = await response.json();

    metarData = data;

    console.log('Data:', metarData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const fetchButton = document.getElementById('metarButton');
fetchButton.addEventListener('click', () => {
  getMetarData();
});

// TAF information function
let tafData;

const getTafData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/taf?ids=KMCI');
    const data = await response.json();

    tafData = data;

    console.log('Data:', tafData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const testButton = document.getElementById('tafButton');
testButton.addEventListener('click', () => {
  console.log('test');

  getTafData();
});


// Airport information function
let airportData;

const getAirportData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/airport?ids=KHUF&format=json');
    const data = await response.json();

    airportData = data;

    console.log('Data:', airportData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const airButton = document.getElementById('airportButton');
airButton.addEventListener('click', () => {
  getAirportData()
})

// All information is verified coming through as should, next steps are sorting 
// and parsing data into usable formats.