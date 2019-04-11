<template>
  <div class="home">
    <h1>Search Food</h1>
    <hr>
    <form v-on:submit.prevent="searchFood()">
      <p>Name: <input type="text" v-model="foodSearch"></p>
      <input type="submit" value="search">
    </form>
    <!-- <div v-for="consumption in consumptions">
      <p>Meal: {{ consumption.meal }}</p>
      <p>Name: {{ consumption.name }}</p>
      <p>Protein: {{ consumption.protein }}</p>
      <p>Sodium: {{ consumption.sodium }}</p>
      <p>Calories: {{ consumption.energy }}</p>
      <hr>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      foodSearch: "",
      group: "",
      foods: []
    };
  },
  created: function() {
    axios.get("/api/foods").then(response => {
      console.log(response.data);
      this.foods = response.data;
    });
  },
  methods: {
    searchFood: function(theFood) {
      console.log('searching database');
      var params = {
        food: this.foodSearch,
        group: "0100"
      };
      console.log(params);

      axios.get("/api/foods?food=" + params.food + "&group=" + params.group, params).then(response => {
        console.log(this.foodSearch);
        console.log(response.data);
      });
    }
  }
};
</script>