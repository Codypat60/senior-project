let metarData;

async function getMetarData() {
  try {
    const response = await fetch('http://localhost:3025/api/data/metar?ids=KMCI');
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

let tafData;

const getTafData = async () => {
  try {
    const response = await fetch('http://localhost:3025/api/data/taf?ids=KMCI');
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

let sigmetData;

const getSigmetData = async () => {
  try {
    const response = await fetch('http://localhost:3025/api/data/airport?ids=KHUF&format=json');
    const data = await response.json();

    sigmetData = data;

    console.log('Data:', sigmetData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const sigButton = document.getElementById('sigButton');
sigButton.addEventListener('click', () => {
  getSigmetData()
})