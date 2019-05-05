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
      <div class="span3 offset5">
        <datetime v-model="date" zone="local" value-zone="local" class="theme-black" style="width:50%; display:block; margin: 0 auto;"></datetime>
      </div>
    </div>
        <!-- Consumption cards -->
    <div class="container">
      <div class="row">
        <div id="filters" class="span12">
          <ul class="clearfix">
            <li>
              <a href="#!" v-on:click="sortFilter('All')">
                <h5>All</h5>
              </a>
            </li>
            <li>
              <a href="#!" v-on:click="sortFilter('Breakfast')">
                <h5>Breakfast</h5>
              </a>
            </li>
            <li>
              <a href="#!" v-on:click="sortFilter('Lunch')">
                <h5>Lunch</h5>
              </a>
            </li>
            <li>
              <a href="#!" v-on:click="sortFilter('Dinner')">
                <h5>Dinner</h5>
              </a>
            </li>
            <li>
              <a href="#!" v-on:click="sortFilter('Snack')">
                <h5>Snacks</h5>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
  
   
      <!-- Three columns -->
        <transition-group class="row" appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <div v-for="consumption, index in filteredConsumptions" :key="index">
            <div class="span3">
              <div class="home-post">
                <div class="entry-content">
                  <h5 v-on:click="moreInfo(consumption)"><strong>{{ consumption.name }}</strong></h5>
                  <div v-if="consumption === currentConsumption">
                    <p>Protein: {{ consumption.protein }}</p>
                    <p>Sodium: {{ consumption.sodium }}</p>
                    <p>Calories: {{ consumption.energy }}</p>
                    <button v-on:click="deleteConsumption(consumption)">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
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
      chart: null,
      sortTerm: "All"
    };
  },
  created: function() {
    this.date = this.getDate;
    this.updateConsumptions();
    console.log(this.date);
  },

  watch: {
    date: function(val) {
      this.changeFilter();
    },

    sortTerm:function(val) {
      this.changeFilter();
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
    sortFilter(sortWord) {
      this.sortTerm = sortWord;
      console.log(this.sortTerm);
    },

    updateConsumptions() {
      axios.get("/api/consumptions").then(response => {
        this.consumptions = response.data;
        this.filterConsumption();
        this.loadData();
        this.createChart('nutrientChart', this.nutrientChartData);
      });
    },

    filterConsumption() {
      this.filteredConsumptions = this.consumptions.filter(consumption => consumption.date === this.date);
      if (this.sortTerm !== "All") {
        this.filteredConsumptions = this.filteredConsumptions.filter(consumption => consumption.meal === this.sortTerm);
      }
    },

    changeFilter() {
      if (this.consumptions !== []) {
        this.filterConsumption();
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


