let dataStorage2 = [];

function saveData2() {
    let dataForm2 = document.getElementById('dataForm2');
    let data = {
        point: dataForm2.point.value,
        treatment: dataForm2.treatment.value,
        fibers: parseInt(dataForm2.fibers.value),
        fragments: parseInt(dataForm2.fragments.value),
        colors: {
            blue: parseInt(dataForm2.blue.value),
            red: parseInt(dataForm2.red.value),
            green: parseInt(dataForm2.green.value),
            yellow: parseInt(dataForm2.yellow.value),
            black: parseInt(dataForm2.black.value),
            white: parseInt(dataForm2.white.value),
            orange: parseInt(dataForm2.orange.value),
            pink: parseInt(dataForm2.pink.value),
            brown: parseInt(dataForm2.brown.value),
            grey: parseInt(dataForm2.grey.value),
            translucent: parseInt(dataForm2.translucent.value),
        },
        observations: dataForm2.observations.value,
    };
    dataStorage2.push(data);

    displayData2();
}

function displayData2() {
    let dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '';
    dataStorage2.forEach((data, index) => {
        let dataItem = document.createElement('div');
        dataItem.className = 'dataItem';
        dataItem.innerHTML = `<strong>Ponto:</strong> ${data.point}<br><strong>Tratamento:</strong> ${data.treatment}<br><strong>Fibras:</strong> ${data.fibers}<br><strong>Fragmentos:</strong> ${data.fragments}<br><strong>Cores dos Microplásticos:</strong><br>${Object.entries(data.colors).map(([color, count]) => `<span>${color}: ${count}</span>`).join('<br>')}`;
        dataDisplay.appendChild(dataItem);
    });
}

function downloadData2() {
    let blob = new Blob([JSON.stringify(dataStorage2)], { type: 'application/json' });
    saveAs(blob, 'data_page2.json');
}

function generateChart() {
    let chartType = document.getElementById('chartType').value;
    let dataToPlot = document.getElementById('dataToPlot').value;

    let labels = [];
    let data = [];

    if (dataToPlot === 'fibers' || dataToPlot === 'fragments' || dataToPlot === 'total') {
        dataStorage2.forEach((item, index) => {
            labels.push('Data ' + (index + 1));
            if (dataToPlot === 'fibers') {
                data.push(item.fibers);
            } else if (dataToPlot === 'fragments') {
                data.push(item.fragments);
            } else {
                data.push(item.fibers + item.fragments);
            }
        });
    } else {
        let colorData = {
            blue: 0,
            red: 0,
            green: 0,
            yellow: 0,
            black: 0,
            white: 0,
            orange: 0,
            pink: 0,
            brown: 0,
            grey: 0,
            translucent: 0,
        };
        dataStorage2.forEach(item => {
            for (let color in colorData) {
                colorData[color] += item.colors[color];
            }
        });
        labels = Object.keys(colorData);
        data = Object.values(colorData);
    }

    let ctx = document.getElementById('dataChart').getContext('2d');
    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Dados de Coleta',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
