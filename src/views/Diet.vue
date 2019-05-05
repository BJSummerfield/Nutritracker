<template>
  <section id="signup" class="section green">
    <div class="container">
      <div class="row">
        <div class="cform" id="contact-form">
          <form v-on:submit.prevent="submit()">
            <h4>Diet Customization</h4>
            <div class="row">
            	<div class="span3">
	            	<p>Calories</p>
	            	<input type="text" class="form-control" v-model="energy" value="2000">
								<p>Total Fat</p>
								<input type="text" class="form-control" v-model="total_fat" value="65">
							</div>
							<div class="span3">
								<p>Saturated Fat</p>
								<input type="text" class="form-control" v-model="saturated_fat" value="22">
								<p>Trans Fat</p>
								<input type="text" class="form-control" v-model="trans_fat" value="2">
							</div>
							<div class="span3">
								<p>Cholesterol</p>
								<input type="text" class="form-control" v-model="cholesterol" value="300">
								<p>Sodium</p>
								<input type="text" class="form-control" v-model="sodium" value="2300">
							</div>
							<div class="span3">
								<p>Total Carbs</p>
								<input type="text" class="form-control" v-model="total_carbs" value="300">
								<p>Dietary Fiber</p>
								<input type="text" class="form-control" v-model="dietary_fiber" value="30">
							</div>
							<div class="span3">
								<p>Sugars</p>
								<input type="text" class="form-control" v-model="sugars" value="33">
								<p>Protein</p>
								<input type="text" class="form-control" v-model="protein" value="50">
							</div>
							<div class="span3">
								<p>Vitamin_a</p>
								<input type="text" class="form-control" v-model="vitamin_a" value="900">
								<p>Vitamin_c</p>
								<input type="text" class="form-control" v-model="vitamin_c" value="90">
							</div>
							<div class="span3">
								<p>Calcium</p>
								<input type="text" class="form-control" v-model="calcium" value="1000">
								<p>Iron</p>
								<input type="text" class="form-control" v-model="iron" value="8">
							</div>
						</div>
						<input type="submit" class="btn btn-primary" value="Submit">
          </form>
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
      energy: "",
      total_fat: "",
      saturated_fat: "",
      trans_fat: "",
      cholesterol: "", 
      sodium: "", 
      total_carbs: "", 
      dietary_fiber: "", 
      sugars: "", 
      protein: "", 
      vitamin_a: "", 
      vitamin_c: "", 
      calcium: "", 
      iron: ""
    };
  },
  methods: {
    submit: function() {
      var params = {
        energy: this.energy,
        total_fat: this.total_fat,
        saturated_fat: this.saturated_fat,
        trans_fat: this.trans_fat,
        cholesterol: this.cholesterol,
        sodium: this.sodium, 
        total_carbs: this.total_carbs, 
        dietary_fiber: this.dietary_fiber, 
        sugars: this.sugars, 
        protein: this.protein, 
        vitamin_a: this.vitamin_a, 
        vitamin_c: this.vitamin_c,   
        calcium: this.calcium, 
        iron: this.iron,
      };
      axios
        .post("/api/diets", params)
        .then(response => {
          this.$router.push("/consumptions");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
