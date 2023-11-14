let metarData;

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3025/api/data/metar?ids=KMCI');
    const data = await response.json();

    metarData = data;

    console.log('Data:', metarData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', () => {
  fetchData();
});

let tafData;

async function testData() {
  try {
    const response = await fetch('http://localhost:3025/api/data/taf?ids=KMCI');
    const data = await response.json();

    tafData = data;

    console.log('Data:', tafData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const testButton = document.getElementById('testButton');
testButton.addEventListener('click', () => {
  console.log('test');

  testData();
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