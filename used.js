window.onload = function() {
  getMetarData();
  getTafData();
  getAirportData();
};


// METAR information function
let metarData;

const getMetarData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/metar?ids=KHUF&format=json');
    const data = await response.json();

    metarData = data;

    let tmp = ((metarData[0].temp) * 1.8 + 32).toFixed(2)

    document.getElementById('second-top-p').innerText = `${tmp}°F`;
    

    let pres = ((metarData[0].altim) * 0.02953).toFixed(2)
    let bari = metarData[0].altim
    
    document.getElementById('third-top-p').innerText = `${bari} mb`;
    document.getElementById('third-top-p-2').innerText = `${pres} inHg`;
    
    let vis = metarData[0].visib

    if (vis == '10+' || vis < 10 && vis >= 6) {
      document.getElementById('fourth-top-p-2').innerText = `Clear`;
      document.getElementById('fourth-top-p-3').innerText = `VFR`;
    } else if (vis <= 5 && vis >= 4) {
      document.getElementById('fourth-top-p-2').innerText = `Not As Clear`;
      document.getElementById('fourth-top-p-3').innerText = `MVFR`;
    } else if (vis <= 3 && vis >= 2) {
      document.getElementById('fourth-top-p-2').innerText = `Non-Clear`;
      document.getElementById('fourth-top-p-3').innerText = `IFR`;
    } else if (vis <= 1) {
      document.getElementById('fourth-top-p-2').innerText = `Completely Non-Clear`;
      document.getElementById('fourth-top-p-3').innerText = `LIFR`;
    }
    
    document.getElementById('fourth-top-p').innerText = `${vis} Miles`
    
    const now = new Date();
    
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    
    let time = `${hours}:${minutes} UTC`
  
    document.getElementById('first-bottom-p').innerText = time;

    console.log('METAR Data:', metarData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// const fetchButton = document.getElementById('metarButton');
// fetchButton.addEventListener('click', () => {
//   getMetarData();
// });

// TAF information function
let tafData;

const getTafData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/taf?ids=KMCI');
    const data = await response.json();

    tafData = data;

    console.log('TAF Data:', tafData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// const testButton = document.getElementById('tafButton');
// testButton.addEventListener('click', () => {
//   getTafData();
// });


// Airport information function
let airportData;

const getAirportData = async () => {
  try {
    const response = await fetch('http://localhost:3250/api/data/airport?ids=KHUF&format=json');
    const data = await response.json();

    airportData = data;


    let runway1 = airportData[0].runways[0].id
    let runway2 = airportData[0].runways[1].id

    let rw = `Runways: ${runway1} & ${runway2}`

    let frequency1 = airportData[0].freqs[0].freq
    let frequency2 = airportData[0].freqs[1].freq


    let fq = `ATIS: ${frequency1} & Tower: ${frequency2}`

    document.getElementById('first-top-p-4').innerText = fq;

    document.getElementById('first-top-p-3').innerText = rw;

    document.getElementById('first-top-p-2').innerText = airportData[0].state;
    document.getElementById('first-top-p').innerText = airportData[0].id;
    

    console.log('Airport Data:', airportData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// const airButton = document.getElementById('airportButton');
// airButton.addEventListener('click', () => {
//   getAirportData()
// })

// All information is verified coming through as should, next steps are sorting 
// and parsing data into usable formats.