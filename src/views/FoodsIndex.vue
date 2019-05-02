<template>
  <section id="foodSearch" class="section orange">
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
              <datetime v-model="date" zone="local" value-zone="local"></datetime>
            </div>
            <div class="span2 offset5">
              <input type="submit" class="btn btn-primary" value="search">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="food in foods">
          <div class="span2 animated-fast flyIn">
            <div class="service-box">
              <img src="" alt="" />
              <h5> {{ food.food['desc']['name'] }}</h5>
              <div v-for="label in food.food['nutrients'][0]['measures']">
                <div v-if="label && label.label">
                  <p><button v-on:click="createConsumption(label.label, food)">{{ label.label }}</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      hover: false
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
        var value =  food.food.nutrients.filter(d => d.name === nutrient);
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
        name: food.food.desc.name,
        protein: protien[0].value,
        sodium: sodium[0].value,
        energy: energy[0].value         
      };
      console.log(params);
      axios.post("/api/consumptions", params).then(response => {
        console.log(response.data);
        this.foodSearch = "";
        this.foods = [];
        this.getGroups();
        this.moreInfo();
      }).catch(error => {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
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
