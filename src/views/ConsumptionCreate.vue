<template>
  <div class="home">
    <h1>Search Food</h1>
    <hr>
    <form v-on:submit.prevent="searchFood()">
      <p>Name: <input type="text" v-model="foodSearch"></p>
      <input type="submit" value="search">
    </form>
    <hr>
    <div v-for="food in foods">
      <p> {{ food.food['desc']['name'] }}</p>
      <button v-on:click="moreInfo(food)">Measures</button>
      <div v-if="food === currentFood">
        <div v-for="label in food.food['nutrients'][0]['measures']">
          <div v-if="label && label.label">
            <button v-on:click="createConsumption(label.label)">{{ label.label }}</button> <!--Work here measure button -->
          </div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      foodSearch: "",
      group: "",
      foods: [],
      currentFood: {}
    };
  },
  // created: function() {
  //   axios.get("/api/foods").then(response => {
  //     console.log(response.data);
  //     this.foods = response.data;
  //   });
  // },
  methods: {
    createConsumption: function(label) {
      console.log("Creating Consumption");
      console.log(label);
      console.log(this.currentFood.food.ndbno);

      var params = {
          
      };

    },
    moreInfo: function(theFood) {
      if (this.currentFood === theFood) {
        this.currentFood = {};
      } else {
        this.currentFood = theFood;
      }
    },

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
        this.foods = response.data;
      });
    }
  }
};
</script>