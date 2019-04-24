<template>
  <div class="home">
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
import axios from "axios";
import Vue from 'vue';
export default {
  data: function() {
    return {
      consumptions: [],
      currentConsumption: {}
    };
  },
  


  created: function() {
    axios.get("/api/consumptions").then(response => {
      this.consumptions = response.data;
    });
  },
  methods: {

    deleteConsumption: function(theConsumption) {
      console.log('deleting the consumption...');
      console.log('api/consumptions/' + theConsumption.id);
      axios.delete('api/consumptions/' + theConsumption.id).then(response => { 
        axios.get("api/consumptions").then(response => {
          this.consumptions = response.data;
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
