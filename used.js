window.onload = function () {
  getMetarData();
  getTafData();
  getAirportData();
};

// METAR information function
let metarData;

const getMetarData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3250/api/data/metar?ids=KHUF&format=json"
    );
    const data = await response.json();

    metarData = data;

    let prec = metarData[0].precip;

    if (prec != null) {
      document.getElementById(
        "second-bottom-p"
      ).innerText = `Precipitation is in the area`;
    }

    let snow = metarData[0].snow;

    if (snow != null) {
      document.getElementById(
        "second-bottom-p-2"
      ).innerText = `Snow is in the area`;
    }

    let tmp = (metarData[0].temp * 1.8 + 32).toFixed(2);
    let dew = (metarData[0].dewp * 1.8 + 32).toFixed(2);

    document.getElementById("second-top-p").innerText = `Currently ${tmp}°F`;
    document.getElementById("second-top-p-2").innerText = `Dew Point: ${dew}°F`;

    let pres = (metarData[0].altim * 0.02953).toFixed(2);
    let bari = metarData[0].altim;

    document.getElementById("third-top-p").innerText = `${pres} inHg`;
    document.getElementById("third-top-p-2").innerText = `${bari} mb`;

    let vis = metarData[0].visib;

    if (vis == "10+" || (vis < 10 && vis >= 6)) {
      document.getElementById("fourth-top-p-2").innerText = `Clear`;
      document.getElementById("fourth-top-p-3").innerText = `VFR`;
    } else if (vis <= 5 && vis >= 4) {
      document.getElementById("fourth-top-p-2").innerText = `Not As Clear`;
      document.getElementById("fourth-top-p-3").innerText = `MVFR`;
    } else if (vis <= 3 && vis >= 2) {
      document.getElementById("fourth-top-p-2").innerText = `Non-Clear`;
      document.getElementById("fourth-top-p-3").innerText = `IFR`;
    } else if (vis <= 1) {
      document.getElementById(
        "fourth-top-p-2"
      ).innerText = `Completely Non-Clear`;
      document.getElementById("fourth-top-p-3").innerText = `LIFR`;
    }

    document.getElementById("fourth-top-p").innerText = `${vis} Miles`;

    const now = new Date();

    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();

    let time = `${hours}:${minutes} UTC`;

    document.getElementById("first-bottom-p").innerText = time;

    let dir = "";

    if (metarData[0].wdir >= 341 && metarData[0].wdir <= 360 || metarData[0].wdir >= 0 && metarData[0].wdir <= 29) {
      dir = "N";
    } else if (metarData[0].wdir >= 20 && metarData[0].wdir <= 30) {
      dir = "NNE"
    } else if (metarData[0].wdir >=31 && metarData[0].wdir <= 59) {
      dir = "NE"
    } else if (metarData[0].wdir >= 60 && metarData[0].wdir <= 70) {
      dir = "ENE"
    } else if (metarData[0].wdir >= 71 && metarData[0].wdir <= 109) {
      dir = "E"
    } else if (metarData[0].wdir >= 110 && metarData[0].wdir <= 120) {
      dir = "ESE"
    } else if (metarData[0].wdir >= 121 && metarData[0].wdir <= 149) {
      dir = "SE"
    } else if (metarData[0].wdir >= 150 && metarData[0].wdir <= 160) {
      dir = "SSE"
    } else if (metarData[0].wdir >= 161 && metarData[0].wdir <= 199) {
      dir = "S"
    } else if (metarData[0].wdir >= 200 && metarData[0].wdir <= 210) {
      dir = "SSW"
    } else if (metarData[0].wdir >= 211 && metarData[0].wdir <= 239) {
      dir = "SW"
    } else if (metarData[0].wdir >= 240 && metarData[0].wdir <= 250) {
      dir = "WSW"
    } else if (metarData[0].wdir >= 251 && metarData[0].wdir <= 289) {
      dir = "W"
    } else if (metarData[0].wdir >= 290 && metarData[0].wdir <= 300) {
      dir = "WNW"
    } else if (metarData[0].wdir >= 301 && metarData[0].wdir <= 329) {
      dir = "NW"
    } else if (metarData[0].wdir >= 330 && metarData[0].wdir <= 340) {
      dir = "NWN"
    }

    document.getElementById(
      "third-bottom-p"
    ).innerText = `${metarData[0].wdir}° ${dir}`;

    let wind = metarData[0].wspd;

    document.getElementById("third-bottom-p-2").innerText = `${wind} Knots`;

    console.log("METAR Data:", metarData);
  } catch (error) {
    console.error("Error:", error);
  }
};

// const fetchButton = document.getElementById('metarButton');
// fetchButton.addEventListener('click', () => {
//   getMetarData();
// });

// TAF information function
let tafData;

const getTafData = async () => {
  try {
    const response = await fetch("http://localhost:3250/api/data/taf?ids=KMCI");
    const data = await response.json();

    tafData = data;

    console.log("TAF Data:", tafData);
  } catch (error) {
    console.error("Error:", error);
  }
};

// const testButton = document.getElementById('tafButton');
// testButton.addEventListener('click', () => {
//   getTafData();
// });

// Airport information function
let airportData;

const getAirportData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3250/api/data/airport?ids=KHUF&format=json"
    );
    const data = await response.json();

    airportData = data;

    let runway1 = airportData[0].runways[0].id;
    let runway2 = airportData[0].runways[1].id;

    let rw = `Runways: ${runway1} & ${runway2}`;

    let frequency1 = airportData[0].freqs[0].freq;
    let frequency2 = airportData[0].freqs[1].freq;

    let fq = `ATIS: ${frequency1} & Tower: ${frequency2}`;

    document.getElementById("first-top-p-4").innerText = fq;

    document.getElementById("first-top-p-3").innerText = rw;

    document.getElementById("first-top-p-2").innerText = airportData[0].state;
    document.getElementById("first-top-p").innerText = airportData[0].id;

    console.log("Airport Data:", airportData);
  } catch (error) {
    console.error("Error:", error);
  }
};

// const airButton = document.getElementById('airportButton');
// airButton.addEventListener('click', () => {
//   getAirportData()
// })

// All information is verified coming through as should, next steps are sorting
// and parsing data into usable formats.
