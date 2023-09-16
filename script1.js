let dataStorage1 = [];
let map;
let markerGroup;

function initMap() {
    map = L.map('map').setView([0, 0], 2);
    markerGroup = L.layerGroup().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function saveData1() {
    let dataForm1 = document.getElementById('dataForm1');
    let data = {
        point: dataForm1.point.value,
        latitude: parseFloat(dataForm1.latitude.value),
        longitude: parseFloat(dataForm1.longitude.value),
        tideCondition: dataForm1.tideCondition.value,
        waterCondition: dataForm1.waterCondition.value,
        date: dataForm1.date.value,
        time: dataForm1.time.value,
    };
    dataStorage1.push(data);

    let marker = L.marker([data.latitude, data.longitude]).addTo(markerGroup);
    marker.bindPopup(`Ponto: ${data.point}<br>Latitude: ${data.latitude}<br>Longitude: ${data.longitude}`).openPopup();
}

function downloadData1() {
    let blob = new Blob([JSON.stringify(dataStorage1)], { type: 'application/json' });
    saveAs(blob, 'data_page1.json');
}

window.onload = initMap;
