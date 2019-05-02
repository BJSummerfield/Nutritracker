<template>
<section id="login" class="section green">
  <div class="container">
    <div class="blankdivider30">
    </div>  
    <div class="blankdivider30">
    </div>  
      <div class="row">
        <div class="cform" id="contact-form">
          <form v-on:submit.prevent="submit()">
            <h4>Login</h4>
            <div class="Email">
              <input type="email" class="form-control" v-model="email" placeholder="Email">
                  <div class="validation"></div>
            </div>
            <div class="password">
              <input type="password" class="form-control" v-model="password"placeholder="Password">
              <div class="validation"></div>
            </div>
            <div class="submit">
              <input type="submit" class="btn btn-primary" value="Submit">
            </div>
          </form>
        </div>
      </div>
      <div class="blankdivider30">
      </div> 
      <div class="blankdivider30">
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/consumptions");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>