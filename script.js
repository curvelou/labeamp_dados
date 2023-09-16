let dataCollection = [];

function saveData() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const data = Object.fromEntries(formData.entries());
    data.colors = {
        azul: data.blue,
        vermelho: data.red,
        verde: data.green,
        amarelo: data.yellow,
        preto: data.black,
        branco: data.white,
        laranja: data.orange,
        rosa: data.pink,
        marrom: data.brown,
        cinza: data.grey,
        translucido: data.translucent,
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
    } else {
        labels = dataCollection.map(item => item.point);
        if (dataToPlot === 'fiberQuantity') {
            data = dataCollection.map(item => parseInt(item.fibers ?? 0));
        } else if (dataToPlot === 'fragmentQuantity') {
            data = dataCollection.map(item => parseInt(item.fragments ?? 0));
        } else if (dataToPlot === 'total') {
            data = dataCollection.map(item => parseInt(item.fibers ?? 0) + parseInt(item.fragments ?? 0));
        }
    }

    const chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade',
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 159, 64)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(201, 203, 207)',
                    'rgb(75, 192, 192)',
                ],
                borderWidth: 1,
            }],
        },
    });
}

function sumProperty(arr, prop) {
    return arr.reduce((sum, item) => sum + parseInt(item[prop] ?? 0), 0);
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
