<template>
  <div class="home">
     <div id="app">
      <canvas id="nutrient-chart"></canvas>
    </div>
    <h1>Your Meals</h1>
    <hr>
    <div v-for="consumption in consumptions">
      <p>Meal: {{ consumption.meal }}</p>
      <p>Name: {{ consumption.name }}</p>
      
      <button v-on:click="moreInfo(consumption)">Values</button>
        <div v-if="consumption === currentConsumption">
          <p>Protein: {{ consumption.protein }}</p>
          <p>Sodium: {{ consumption.sodium }}</p>
          <p>Calories: {{ consumption.energy }}</p>
          <button v-on:click="deleteConsumption(consumption)">Remove</button>
        </div>
      <hr>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import nutrientChartData from '../chart-data.js';
import axios from "axios";
import Vue from 'vue';
export default {
  data: function() {
    return {
      consumptions: [],
      currentConsumption: {},
      nutrientChartData: nutrientChartData,
      dailyValue: []
    };
  },
  created: function() {
    axios.get("/api/consumptions").then(response => {
      this.consumptions = response.data;
      this.loadData();
      this.createChart('nutrient-chart', this.nutrientChartData);
    });
  },
  methods: {

    loadData() {
      console.log(this.consumptions);
      var protein = 0;
      var sodium = 0;
      var energy = 0;
      this.consumptions.forEach(function(consumption) {
        console.log(consumption.protein)
        protein += consumption.protein;
        sodium += consumption.sodium;
        energy += consumption.energy;
      }),
      this.dailyValue.push(protein),
      this.dailyValue.push(sodium),
      this.dailyValue.push(energy),
      this.nutrientChartData.data.datasets[0].data = this.dailyValue;
    },

    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
    deleteConsumption: function(theConsumption) {
      console.log('deleting the consumption...');
      console.log('api/consumptions/' + theConsumption.id);
      axios.delete('api/consumptions/' + theConsumption.id).then(response => { 
        axios.get("api/consumptions").then(response => {
          this.consumptions = response.data;
        });
      });
      this.created()
    },
  
    moreInfo: function(theConsumption) {
      if (this.currentConsumption === theConsumption) {
        this.currentConsumption = {};
      } else {
        this.currentConsumption = theConsumption;
      }
    },
  }
};
</script>
