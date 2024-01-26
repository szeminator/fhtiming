<template>
    <div>
        <canvas id="myChart" width="600px"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import { countRunnersAtEachSection } from '../insights'


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
  </style>