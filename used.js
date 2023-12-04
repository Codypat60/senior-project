

let input = ""

const enter = (event) => {
  if (event.keyCode === 13) {
    location.reload();
  }
}

document.getElementById("nav-box").addEventListener("keydown", enter);

document.addEventListener("DOMContentLoaded", () => {

  var inputElement = document.getElementById("nav-box");

  input = inputElement.value;
  
  let ident = input.toUpperCase();

  if (ident == "") {
    ident = "KHUF"
  }
  
  window.onload = function () {
    getMetarData(ident);
    getAirportData(ident);
  };
});
  
// METAR information function
let metarData;

const getMetarData = async (ident) => {
  try {
    const response = await fetch(
      `http://localhost:3250/api/data/metar?ids=${ident}&format=json`
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
      document.getElementById("fourth-top-p-2").innerText = `Less Clear`;
      document.getElementById("fourth-top-p-3").innerText = `MVFR`;
    } else if (vis <= 3 && vis >= 2) {
      document.getElementById("fourth-top-p-2").innerText = `Non-Clear`;
      document.getElementById("fourth-top-p-3").innerText = `IFR`;
    } else if (vis <= 1) {
      document.getElementById("fourth-top-p-2").innerText = `Completely Non-Clear`;
      document.getElementById("fourth-top-p-3").innerText = `LIFR`;
    }

    document.getElementById("fourth-top-p").innerText = `${vis} Miles`;

    const now = new Date();

    const hours = now.getUTCHours();
    let minutes = String(now.getUTCMinutes());

    if (minutes.length == 1) {
      minutes = `0${minutes}`
    }

    let time = `${hours}:${minutes} UTC`;

    document.getElementById("top-time-p").innerText = time;

    document.getElementById("first-bottom-p").innerText = metarData[0].rawOb

    let dir = "";

    if (metarData[0].wdir >= 341 && metarData[0].wdir <= 360 || metarData[0].wdir >= 0 && metarData[0].wdir <= 19) {
      dir = "N";
    } else if (metarData[0].wdir >= 20 && metarData[0].wdir <= 30) {
      dir = "NNE"
    } else if (metarData[0].wdir >= 31 && metarData[0].wdir <= 59) {
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

    document.getElementById("third-bottom-p").innerText = `${metarData[0].wdir}° ${dir}`;

    let wind = metarData[0].wspd;

    document.getElementById("third-bottom-p-2").innerText = `${wind} Knots`;

    let clouds = metarData[0].clouds

    for (let i = 0; i < clouds.length; i++) {
      
      const id = `fourth-bottom-p-${i + 1}`;

      if (clouds[i].cover == "FEW") {
        clouds[i].cover = "Few"
      } else if (clouds[i].cover == "OVC") {
        clouds[i].cover = "Overcast"
      } else if (clouds[i].cover == "BKN") {
        clouds[i].cover = "Broken"
      } else if (clouds[i].cover == "CLR") {
        clouds[i].cover = "Clear"
      } else if (clouds[i].cover == "SCT") {
        clouds[i].cover = "Scattered"
      } else if (clouds[i].cover == "OVX") {
        clouds[i].cover = "Sky Obscured"
      }

      const ele = document.getElementById(id)
      
      if (clouds[i].cover == "Clear") {
        ele.innerText = `${clouds[i].cover}`
      } else {
        ele.innerText = `${clouds[i].cover} @ ${clouds[i].base}ft`
      }
      
    }

  } catch (error) {
    console.error("Error:", error);
  }
};

// Airport information function
let airportData;

const getAirportData = async (ident) => {
  try {
    const response = await fetch(
      `http://localhost:3250/api/data/airport?ids=${ident}&format=json`
    );
    const data = await response.json();

    airportData = data;

    let runways = airportData[0].runways

    let frequency = airportData[0].freqs

    let ele = ""

    ele = document.getElementById("first-top-p-4")

    let freqText = ""

    for (let i = 0; i < frequency.length; i ++) {
      if (i > 0) {
        freqText += " & "
      }
      freqText += `${frequency[i].freq}`;
    }

    if (freqText == "undefined") {
      ele.innerText = "No Frequencies Listed"
    } else {
      ele.innerText = `Frequencies: ${freqText}`
    }
    
    document.getElementById("first-top-p-2").innerText = airportData[0].state;
    document.getElementById("first-top-p-1").innerText = airportData[0].id;
    
    const id = `first-top-p-3`;
    ele = document.getElementById(id);
    
    let runwaysText ="";
    
    for (let i = 0; i < runways.length; i++) {
      if (i > 0) {
        runwaysText += " & ";
      }
      runwaysText += `${runways[i].id}`;
    }
    
    ele.innerText = `Runways: ${runwaysText}`;

  } catch (error) {
    console.error("Error:", error);
  }
};

// All information is verified coming through as should, next steps are sorting
// and parsing data into usable formats.
