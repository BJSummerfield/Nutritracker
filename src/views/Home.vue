<template>
  <div class="home">
    <div id="app">
      <canvas id="planet-chart"></canvas>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Chart from 'chart.js';
import planetChartData from '../chart-data.js';
export default {
  data: function() {
    return {
      planetChartData: planetChartData,
      nutrients: ["protien", "stuff", 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn']
    };
  },
  mounted() {
    this.$router.push("/login");
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }
  }
};
</script>
