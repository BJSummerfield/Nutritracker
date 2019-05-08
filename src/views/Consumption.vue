<template>
  <section id="blog" class="section">
    <!-- Chart -->
    <div class="chart-container">
      <canvas id="nutrientChart"></canvas>
    </div>
    <!-- datetime search -->
    <h1>Your Meals</h1>
      <label>Date: </label>
        <datetime v-model="date" zone="local" value-zone="local" class="theme-black" style="width:50%; display:inline; margin: 0 auto;"></datetime>

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
            <div class="span2">
              <div class="home-post">
                <div class="entry-content">
                  <h5 v-on:click="moreInfo(consumption)"><strong>{{ consumption.name }}</strong></h5>
                  <div v-if="consumption === currentConsumption">
                    <p>Protein: {{ consumption.protein }}</p>
                    <p>Sodium: {{ consumption.sodium }}</p>
                    <p>Energy: {{ consumption.energy }}</p>
                    <p>Total Fat: {{ consumption.total_fat }}</p>
                    <p>Saturated Fat: {{ consumption.saturated_fat }}</p>
                    <!-- <p>Trans Fat: {{ consumption.trans_fat }}</p> -->
                    <p>Cholesterol: {{ consumption.cholesterol }}</p>
                    <p>Total Carbs: {{ consumption.total_carbs }}</p>
                    <p>Dietary Fiber: {{ consumption.dietary_fiber }}</p>
                    <p>Sugars: {{ consumption.sugars }}</p>
                    <p>Vitamin A: {{ consumption.vitamin_a }}</p>
                    <p>Vitamin C: {{ consumption.vitamin_c }}</p>
                    <p>Calcium: {{ consumption.calcium }}</p>
                    <p>Iron: {{ consumption.iron }}</p>
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
// import Vue from 'vue';
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
      sortTerm: "All",
      diet: [],
      targetValue: [],
    };
  },
  created: function() {
    axios.get("/api/diets").then(response => {
      this.diet = response.data;
      console.log(this.diet);
      // this.loadTarget();
      this.updateConsumptions();
      this.createChart('nutrientChart', this.nutrientChartData);
    });
    
    this.date = this.getDate;

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

    loadTarget() {
      this.targetValue.push(this.diet.energy),
      this.targetValue.push(this.diet.total_fat),
      this.targetValue.push(this.diet.saturated_fat),
      this.targetValue.push(this.diet.trans_fat),
      this.targetValue.push(this.diet.cholesterol),
      this.targetValue.push(this.diet.sodium),
      this.targetValue.push(this.diet.total_carbs),
      this.targetValue.push(this.diet.dietary_fiber),
      this.targetValue.push(this.diet.sugars),
      this.targetValue.push(this.diet.protein),      
      this.targetValue.push(this.diet.vitamin_a),
      this.targetValue.push(this.diet.vitamin_c),
      this.targetValue.push(this.diet.calcium),
      this.targetValue.push(this.diet.iron),      

      this.nutrientChartData.data.datasets[1].data = this.targetValue;
      console.log(this.nutrientChartData.data.datasets[1].data);
    },

    sortFilter(sortWord) {
      this.sortTerm = sortWord;
      console.log(this.sortTerm);
    },

    updateConsumptions() {
      axios.get("/api/consumptions").then(response => {
        this.consumptions = response.data;
        this.filterConsumption();
        this.updateChart();
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
      var totalFat = 0;
      var saturatedFat = 0;
      var transFat = 0;
      var cholesterol = 0;
      var totalCarbs = 0;
      var dietaryFiber = 0;
      var sugars = 0;
      var vitaminA = 0;
      var vitaminC = 0;
      var calcium = 0;
      var iron = 0;
      this.filteredConsumptions.forEach(function(consumption) {
        protein += consumption.protein;
        sodium += consumption.sodium;
        energy += consumption.energy;
        totalFat += consumption.total_fat;
        saturatedFat += consumption.saturated_fat;
        transFat += consumption.trans_fat;
        cholesterol += consumption.cholesterol;
        totalCarbs += consumption.total_carbs;
        dietaryFiber += consumption.dietary_fiber;
        sugars += consumption.sugars;
        vitaminA += consumption.vitamin_a;
        vitaminC += consumption.vitamin_c;
        calcium += consumption.calcium;
        iron += consumption.iron;
      }),
      this.dailyValue.push(energy*100/this.diet.energy),
      this.dailyValue.push(totalFat*100/this.diet.total_fat),
      this.dailyValue.push(saturatedFat*100/this.diet.saturated_fat),
      // this.dailyValue.push(transFat*100/this.diet.trans_fat),
      this.dailyValue.push(cholesterol*100/this.diet.cholesterol),
      this.dailyValue.push(sodium*100/this.diet.sodium),
      this.dailyValue.push(totalCarbs*100/this.diet.total_carbs),
      this.dailyValue.push(dietaryFiber*100/this.diet.dietary_fiber),
      this.dailyValue.push(sugars*100/this.diet.sugars),
      this.dailyValue.push(protein*100/this.diet.protein),      
      this.dailyValue.push(vitaminA*100/this.diet.vitamin_a),
      this.dailyValue.push(vitaminC*100/this.diet.vitamin_c),
      this.dailyValue.push(calcium*100/this.diet.calcium),
      this.dailyValue.push(iron*100/this.diet.iron),      
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


