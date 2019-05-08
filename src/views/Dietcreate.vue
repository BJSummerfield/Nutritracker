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
	            	<input type="text" class="form-control" v-model="energy">
								<p>Total Fat - g</p>
								<input type="text" class="form-control" v-model="total_fat">
							</div>
							<div class="span3">
								<p>Saturated Fat - g</p>
								<input type="text" class="form-control" v-model="saturated_fat">
								<p>Trans Fat - g</p>
								<input type="text" class="form-control" v-model="trans_fat">
							</div>
							<div class="span3">
								<p>Cholesterol - mg</p>
								<input type="text" class="form-control" v-model="cholesterol">
								<p>Sodium - mg</p>
								<input type="text" class="form-control" v-model="sodium">
							</div>
							<div class="span3">
								<p>Total Carbs - g</p>
								<input type="text" class="form-control" v-model="total_carbs">
								<p>Dietary Fiber - g</p>
								<input type="text" class="form-control" v-model="dietary_fiber">
							</div>
							<div class="span3">
								<p>Sugars - g</p>
								<input type="text" class="form-control" v-model="sugars">
								<p>Protein - g</p>
								<input type="text" class="form-control" v-model="protein">
							</div>
							<div class="span3">
								<p>Vitamin A - mg</p>
								<input type="text" class="form-control" v-model="vitamin_a">
								<p>Vitamin C - mg</p>
								<input type="text" class="form-control" v-model="vitamin_c">
							</div>
							<div class="span3">
								<p>Calcium - mg</p>
								<input type="text" class="form-control" v-model="calcium">
								<p>Iron - mg</p>
								<input type="text" class="form-control" v-model="iron">
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
      energy: "2000",
      total_fat: "65",
      saturated_fat: "22",
      trans_fat: "2",
      cholesterol: "300", 
      sodium: "2300", 
      total_carbs: "300", 
      dietary_fiber: "30", 
      sugars: "33", 
      protein: "50", 
      vitamin_a: "900", 
      vitamin_c: "90", 
      calcium: "1000", 
      iron: "8",
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
