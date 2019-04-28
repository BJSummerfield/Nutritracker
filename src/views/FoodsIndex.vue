<template>
  <div class="home">
    <h1>Search Food</h1>
    <hr>
    <form v-on:submit.prevent="searchFood()">
      <p>Date: <datetime type="date" v-model="date"></datetime></p>
       <div class="form-group">
            <label for="meals">Meal: </label>
              <select name="meal" v-model="meal">
                <option v-for="meal in meals" :value="meal">{{meal}}</option>
              </select>
        </div>
      <p>Name: <input type="text" v-model="foodSearch"></p>
      <div class="form-group">
            <label for="group">Groups: </label>
              <select name="group" v-model="group">
                <option v-for="group in groups" :value="group.value">{{ group.name }}</option>
              </select>
        </div>
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
      groups: [],
      foods: [],
      currentFood: {},
      errors: [],
      group: "",
      meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
      meal: "",
      date: ""
    };
  },

  created: function() {
    axios.get("/api/groups").then(response => {
      this.groups = response.data;
      console.log(this.groups)
    });
  },

  methods: {
    createConsumption: function(label) {
      console.log("Creating Consumption");
      console.log(label);
  
      var nutrientGrab = (nutrient) => {
        var value =  this.currentFood.food.nutrients.filter(d => d.name === nutrient);
        return valueGrab(value);
      };

      var valueGrab = (nutrient) => {
        return nutrient[0].measures.filter(d => d && d.label === label);
      };

      var energy = nutrientGrab("Energy");
      console.log(energy);

      var protien = nutrientGrab("Protein");
      console.log(protien);

      var sodium = nutrientGrab("Sodium, Na");
      console.log(sodium);
    
      var params = {
        meal: this.meal,
        date: this.date,
        name: this.currentFood.food.desc.name,
        protein: protien[0].value,
        sodium: sodium[0].value,
        energy: energy[0].value         
      };
      console.log(params);
      axios.post("/api/consumptions", params).then(response => {
        console.log(response.data);
        this.$router.push("/consumptions");
      }).catch(error => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
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
        group: this.group
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