<template>
  <div class="home">
     <div id="app">
      <canvas id="nutrientChart"></canvas>
    </div>
    <h1>Your Meals</h1>

    <datetime v-model="date" placeholder="Enter Date"></datetime>
    <button v-on:click="changeDate()">Change Date</button>
    <hr>
    <div v-for="consumption in filteredConsumptions">
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
      filteredConsumptions: [],
      currentConsumption: {},
      nutrientChartData: nutrientChartData,
      dailyValue: [],
      date: "dasdf"
    };
  },
  created: function() {
    axios.get("/api/consumptions").then(response => {
      this.consumptions = response.data;
      this.date = this.getDate;
      this.filterConsumptions();
      this.loadData();
      this.createChart('nutrientChart', this.nutrientChartData);
    });
  },



  computed: {
    getDate() {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}T00:00:00.000Z`;
    },
  },
  
  methods: {

    updateConsumptions() {
      axios.get("api/consumptions").then(response => {
        this.consumptions = response.data;
        this.filterConsumptions;
      });
    },

    filterConsumptions() {
      this.filteredConsumptions = this.consumptions.filter(consumption => consumption.date === this.date);
    },

    changeDate() {
      console.log(this.date);
      this.filteredConsumptions = this.consumptions.filter(consumption => consumption.date === this.date);
      this.loadData();
      this.nutrientChart.update;
    },

    loadData() {
      console.log(this.filteredConsumptions);
      var protein = 0;
      var sodium = 0;
      var energy = 0;
      this.filteredConsumptions.forEach(function(consumption) {
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
          this.filterConsumptions();
          console.log();
        });
      });
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
