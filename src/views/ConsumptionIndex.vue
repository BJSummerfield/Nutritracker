<template>
  <div class="home">
    <h1>Your Meals</h1>
    <hr>
    <div v-for="consumption in consumptions">
      <p>Meal: {{ consumption.meal }}</p>
      <p>Name: {{ consumption.name }}</p>
      <p>Protein: {{ consumption.protein }}</p>
      <p>Sodium: {{ consumption.sodium }}</p>
      <p>Calories: {{ consumption.energy }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      consumptions: []
    };
  },
  created: function() {
    axios.get("/api/consumptions").then(response => {
      this.consumptions = response.data;
    });
  },
  methods: {}
};
</script>
