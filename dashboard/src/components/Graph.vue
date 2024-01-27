<template>
    <div>
        <canvas id="myChart" width="600px"></canvas>
        <div id="detailTable" class="detail-table"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import { countRunnersAtEachSection } from '../insights'

  function displayDetailTable(dataIndex) {
  // Fetch or generate data for the selected bar
  const details = getDetailsForBar(dataIndex); // Implement this function based on your data

  // Update the HTML of the detail table
  const detailTableDiv = document.getElementById('detailTable');
  detailTableDiv.innerHTML = generateTableHTML(details); // Implement this function to generate HTML
}

function getDetailsForBar(index) {
  // Implement logic to fetch or generate detailed data for the given index
  // This will depend on your data structure and what you want to show
}

function generateTableHTML(details) {
  // Generate and return HTML string based on the details data
  // Example:
  return `<table>${details.map(detail => `<tr><td>${detail.name}</td></tr>`).join('')}</table>`;
}


  onMounted(() => {
    let rawData = countRunnersAtEachSection();
    let offset = 0;
    let data = rawData.map((value) => {
      console.log(value);
      let start = offset;
      let end = offset + value;
      offset = end;
      return [start, end];
    });
    let differences = data.map((value) => {
        return value[1] - value[0];
    });

    console.log(data);
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
    data: {
      labels: ['START - TURN1', 'TURN1 - TURN2', 'TURN2 - FINISH', 'FINISHED'],
      datasets: [{
        label: '# of Teilnehmer',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
        }
      },
      onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const chartElement = activeElements[0];
        // Assuming your data set includes an identifier to fetch detailed information
        const dataIndex = chartElement.index;
        displayDetailTable(dataIndex);
      }
    },
      plugins: {
        title: {
        display: true,
        text: '# of Participants per Section',
        padding: {
          top: 10,
          bottom: 30
        },
        font: {
          size: 18
        }
      },
      legend: {
        display: false // This hides the legend
      },
      tooltip: {
          callbacks: {
              label: function(context) {
                  let index = context.dataIndex;
                  let difference = differences[index];
                  return `Teilnehmer: ${difference}`;
              }
          }
      }
  }
}
    });
}
});

  </script>
  
  <style scoped>
  #myChart {
    display: flex;
  }

  .detail-table {
  /* Add styling for your detail table here */
}
  </style>