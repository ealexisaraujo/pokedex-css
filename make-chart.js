const context = document.querySelector('#chart').getContext('2d')

function makeChart(data, name, labels) {
  return new Chart(context, {
    type: 'radar',
      data: {
          labels: labels,
          datasets: [{
            label: name,
            data: data,
            backgroundColor: 'rgba(221, 8, 47, .5)'
          }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
  })
}

export default makeChart