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
	            	<input type="text" class="form-control" v-model="diet.energy">
								<p>Total Fat</p>
								<input type="text" class="form-control" v-model="diet.total_fat">
							</div>
							<div class="span3">
								<p>Saturated Fat</p>
								<input type="text" class="form-control" v-model="diet.saturated_fat">
								<p>Trans Fat</p>
								<input type="text" class="form-control" v-model="diet.trans_fat">
							</div>
							<div class="span3">
								<p>Cholesterol</p>
								<input type="text" class="form-control" v-model="diet.cholesterol">
								<p>Sodium</p>
								<input type="text" class="form-control" v-model="diet.sodium">
							</div>
							<div class="span3">
								<p>Total Carbs</p>
								<input type="text" class="form-control" v-model="diet.total_carbs">
								<p>Dietary Fiber</p>
								<input type="text" class="form-control" v-model="diet.dietary_fiber">
							</div>
							<div class="span3">
								<p>Sugars</p>
								<input type="text" class="form-control" v-model="diet.sugars">
								<p>Protein</p>
								<input type="text" class="form-control" v-model="diet.protein">
							</div>
							<div class="span3">
								<p>Vitamin A</p>
								<input type="text" class="form-control" v-model="diet.vitamin_a">
								<p>Vitamin C</p>
								<input type="text" class="form-control" v-model="diet.vitamin_c">
							</div>
							<div class="span3">
								<p>Calcium</p>
								<input type="text" class="form-control" v-model="diet.calcium">
								<p>Iron</p>
								<input type="text" class="form-control" v-model="diet.iron">
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
    	diet: {
    		id: "",
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
      },
      errors: {}
    };
  },

  created: function() {
  	axios.get("api/diets").then(response => {
  		console.log(response.data);
  		this.diet = response.data;
  	});
  },

  methods: {
    submit: function() {
      var params = {
        energy: this.diet.energy,
        total_fat: this.diet.total_fat,
        saturated_fat: this.diet.saturated_fat,
        trans_fat: this.diet.trans_fat,
        cholesterol: this.diet.cholesterol,
        sodium: this.diet.sodium, 
        total_carbs: this.diet.total_carbs, 
        dietary_fiber: this.diet.dietary_fiber,
        sugars: this.diet.sugars, 
        protein: this.diet.protein, 
        vitamin_a: this.diet.vitamin_a, 
        vitamin_c: this.diet.vitamin_c,   
        calcium: this.diet.calcium, 
        iron: this.diet.iron
      };
      console.log(params);
      axios
        .patch("/api/diets", params).then(response => {
          this.$router.push("/consumptions");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    }
  }
};
</script>

