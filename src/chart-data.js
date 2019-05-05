export const nutrientChartData = {
  type: 'bar',
  data: {
    labels: [
      "Calories - kcal",
      "Total - Fat g",
      "Saturated - Fat g",
      "Trans - Fat g",
      "Cholesterol - mg",
      "Sodium - mg",
      "Total - Carbs g",
      "Dietary - Fiber g",
      "Sugars - g",
      "Protein - g",
      "Vitamin A - mg",
      "Vitamin C - mg",
      "Calcium - mg",
      "Iron - mg"],
    datasets: [
      { // one line graph
        label: 'Current Values',
        data: [],
        backgroundColor: [
          'rgba(54,73,93,.5)', // Blue
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)'
        ],
        borderColor: [
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
        ],
        borderWidth: 3
      },
      { // another line graph
        label: 'Target Values',
        data: [2000, 65, 22, 2, 300, 2300, 300, 30, 33, 50, 900, 90, 1000, 8],
        backgroundColor: [
          // 'rgba(71, 183,132,.5)',
          // 'rgba(71, 183,132,.5)',
          // 'rgba(71, 183,132,.5)' // Green
        ],
        borderColor: [
          // '#47b784',
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25,
        }
      }]
    }
  }
};

export default nutrientChartData;