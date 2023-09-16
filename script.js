const dataCollection = [];

function sumProperty(arr, prop) {
    return arr.reduce((sum, item) => sum + parseInt(item[prop] ?? 0), 0);
}

function saveData() {
    const point = document.getElementById('point').value;
    const fibers = document.getElementById('fibers').value;
    const fragments = document.getElementById('fragments').value;
    const colors = {
        azul: document.getElementById('blue').value,
        vermelho: document.getElementById('red').value,
        verde: document.getElementById('green').value,
        amarelo: document.getElementById('yellow').value,
        preto: document.getElementById('black').value,
        branco: document.getElementById('white').value,
        laranja: document.getElementById('orange').value,
        rosa: document.getElementById('pink').value,
        marrom: document.getElementById('brown').value,
        cinza: document.getElementById('grey').value,
        translucido: document.getElementById('translucent').value,
    };
    const observations = document.getElementById('observations').value;
    const treatmentType = document.getElementById('treatmentType').value;

    const data = {
        point,
        fibers,
        fragments,
        colors,
        observations,
        treatmentType,
    };

    dataCollection.push(data);
    document.getElementById('dataDisplay').innerText = JSON.stringify(dataCollection, null, 2);
}

function generateChart() {
    const ctx = document.getElementById('dataChart').getContext('2d');
    const chartType = document.getElementById('chartType').value;
    const dataToPlot = document.getElementById('dataToPlot').value;

    let labels = [];
    let data = [];

    if (dataToPlot === 'colors') {
        labels = ['Azul', 'Vermelho', 'Verde', 'Amarelo', 'Preto', 'Branco', 'Laranja', 'Rosa', 'Marrom', 'Cinza', 'Translucido'];
        data = labels.map(color => sumProperty(dataCollection, color.toLowerCase()));
    } else if (dataToPlot === 'fibers') {
        labels = dataCollection.map(item => item.point);
        data = dataCollection.map(item => parseInt(item.fibers ?? 0));
    } else if (dataToPlot === 'fragments') {
        labels = dataCollection.map(item => item.point);
        data = dataCollection.map(item => parseInt(item.fragments ?? 0));
    } else if (dataToPlot === 'totalFibersFragments') {
        labels = dataCollection.map(item => item.point);
        data = dataCollection.map(item => parseInt(item.fibers ?? 0) + parseInt(item.fragments ?? 0));
    } else if (dataToPlot === 'mostFoundColor') {
        labels = dataCollection.map(item => item.point);
        data = dataCollection.map(item => {
            const colors = Object.values(item.colors);
            return Math.max(...colors.map(color => parseInt(color ?? 0)));
        });
    }

    const chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade',
                data: data,
                backgroundColor: [
                    'blue',
                    'red',
                    'green',
                    'yellow',
                    'black',
                    'white',
                    'orange',
                    'pink',
                    'brown',
                    'grey',
                    'lightgrey',
                ],
            }],
        },
    });
}

function downloadData() {
    const blob = new Blob([JSON.stringify(dataCollection, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');
}

function downloadChart() {
    const link = document.createElement('a');
    link.href = document.getElementById('dataChart').toDataURL();
    link.download = 'chart.png';
    link.click();
}
