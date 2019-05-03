<template>
  <section id="blog" class="section">
    <!-- Chart -->
    <div class="chart-container">
      <canvas id="nutrientChart"></canvas>
    </div>
    <!-- datetime search -->
    <h1>Your Meals</h1>
    <div class="row">
      <label>Date: </label>
      <div class="span3 offset8">
        <datetime v-model="date" zone="local" value-zone="local" class="theme-black" style="width:50%; display:block; margin: 0 auto;"></datetime>
      </div>
    </div>
        <!-- Consumption cards -->
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
  </section>
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
      date: "",
      chart: null
    };
  },
  created: function() {
    this.date = this.getDate;
    this.updateConsumptions();
    console.log(this.date);
  },

  watch: {
    date: function(val) {
      this.changeDate();
    }
  },

  computed: {
    getDate() {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate() + 1);
      return `${year}-${month}-${day}T00:00:00.000Z`;
    },
  },
  
  methods: {
    updateConsumptions() {
      axios.get("/api/consumptions").then(response => {
        this.consumptions = response.data;
        this.filterConsumptions();
        this.loadData();
        this.createChart('nutrientChart', this.nutrientChartData);
      });
    },

    filterConsumptions() {
      this.filteredConsumptions = this.consumptions.filter(consumption => consumption.date === this.date);
    },

    changeDate() {
      if (this.consumptions !== []) {
        this.filterConsumptions();
      }
      if (this.chart !== null) {
        this.updateChart();
      }
    },

    loadData() {
      console.log(this.filteredConsumptions);
      this.dailyValue = [];
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

    updateChart() {
      this.loadData();
      this.chart.update();
    },

    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.chart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
    
    deleteConsumption: function(theConsumption) {
      console.log('deleting the consumption...');
      console.log('api/consumptions/' + theConsumption.id);
      axios.delete('api/consumptions/' + theConsumption.id).then(response => {
        this.updateConsumptions();
        this.updateChart();
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


