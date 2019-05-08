<template>
  <section id="services" class="section orange">
    <div class="container">
      <div class="blankdivider30">
      </div>
      <h4>Search Food</h4>
      <form v-on:submit.prevent="searchFood()">
        <div class="form-group">
          <div class="row">
            <div class="span4 offset4">
            <label>Name:</label> 
            <input type="search" style="text-align:center;" v-model="foodSearch" placeholder="Search food">
            <label for="group">Groups: </label>
            <select name="group" v-model="group">
              <option v-for="group in groups" :value="group.value">{{ group.name }}</option>
            </select>
            <label for="meals">Meal: </label>
            <select name="meal" v-model="meal">
              <option v-for="meal in meals" :value="meal">{{meal}}</option>
            </select>
            </div>
            <div class="span2 offset 5">
              <label>Date: </label>
              <datetime v-model="date" zone="local" value-zone="local" class="theme-black"></datetime>
            </div>
            <div class="span2 offset5">
              <input type="submit" class="btn btn-primary" value="search">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-for="error in errors">
      <h3>{{error}}</h3>
    </div>
    <div class="container">
      <transition-group class="row" appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-for="(food, theKey) in foods" :key="theKey">
          <div class="span2">
            <div class="service-box">
              <h2> {{ food.food['desc']['name'] }}</h2>
              <div v-for="label in food.food['nutrients'][0]['measures']">
                <div v-if="label && label.label">
                  <p><button v-on:click="createConsumption(label.label, food)">{{ label.label }}</button></p>
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
import axios from "axios";
export default {
  data: function() {
    return {
      foodSearch: "",
      groups: [],
      foods: [],
      errors: [],
      group: "",
      meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
      meal: "",
      date: null,
    };
  },

  created: function() {
    this.date = this.getDate;
    this.getGroups();
  },
  computed: {
    getDate() {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate() + 1);
      return `${year}-${month}-${day}T00:00:00.000Z`;
    }
  },

  methods: {

    getGroups() {
      axios.get("/api/groups").then(response => {
        this.groups = response.data;
        console.log(this.groups);
      });
    },
    
    createConsumption: function(label, food) {
      console.log("Creating Consumption");
      console.log(label);
      console.log(food.food['desc']['name']);
  
      var nutrientGrab = (nutrient) => {
        try {
          var value =  food.food.nutrients.filter(d => d.name === nutrient);
          return valueGrab(value);
        } catch (error) {
          return "0";
        }
      };

      var valueGrab = (nutrient) => {
        var value = nutrient[0].measures.filter(d => d && d.label === label);
        return value[0].value;
      };

      var protein = nutrientGrab("Protein");
      console.log(protein);

      var sodium = nutrientGrab('Sodium, Na');
      console.log(sodium);

      var energy = nutrientGrab('Energy');
      console.log(energy);

      var totalFat = nutrientGrab('Total lipid (fat)');
      console.log(totalFat);

      var saturatedFat = nutrientGrab('Fatty acids, total saturated');
      console.log(saturatedFat);

      var transFat = nutrientGrab('Fatty acids, total trans');
      console.log(transFat);

      var cholesterol = nutrientGrab('Cholesterol');
      console.log(cholesterol);

      var totalCarbs = nutrientGrab('Carbohydrate, by difference');
      console.log(totalCarbs);

      var dietaryFiber = nutrientGrab('Fiber, total dietary');
      console.log(dietaryFiber);

      var sugars = nutrientGrab('Sugars, total');
      console.log(sugars);

      var vitaminA = nutrientGrab('Vitamin A, IU');
      console.log(vitaminA);

      var vitaminC = nutrientGrab('Vitamin C, total ascorbic acid');
      console.log(vitaminC);

      var calcium = nutrientGrab('Calcium, Ca');
      console.log(calcium);

      var iron = nutrientGrab('Iron, Fe');
      console.log(iron);

      var params = {
        meal: this.meal,
        date: this.date,
        name: food.food.desc.name,
        energy: energy,
        total_fat: totalFat,
        saturated_fat: saturatedFat,
        trans_fat: transFat,
        cholesterol: cholesterol, 
        sodium: sodium, 
        total_carbs: totalCarbs, 
        dietary_fiber: dietaryFiber, 
        sugars: sugars, 
        protein: protein, 
        vitamin_a: vitaminA, 
        vitamin_c: vitaminC, 
        calcium: calcium, 
        iron: iron          
      };
      console.log(params);
      axios.post("/api/consumptions", params).then(response => {
        console.log(response.data);
        this.foodSearch = "";
        this.foods = [];
        this.getGroups();
        this.moreInfo();
      }).catch(error => {
        this.errors = error.response.data.messages;
        console.log(this.errors);
      });
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

