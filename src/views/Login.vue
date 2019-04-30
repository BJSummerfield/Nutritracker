<template>
<section id="contact" class="section green">
    <div class="container">
      <h4>Login</h4>
      <div class="blankdivider30">
      </div>
      <div class="row">
        <div class="span12">
          <div class="cform" id="contact-form">
            <form v-on:submit.prevent="submit()">
              <div class="row">
                <div class="span6">
                  <div class="Email">
                     <input type="email" class="form-control" v-model="email" placeholder="Email">
                    <div class="validation"></div>
                  </div>
                  <div class="password">
                    <input type="password" class="form-control" v-model="password"placeholder="Password">
                    <div class="validation"></div>
                  </div>
                  <input type="submit" class="btn btn-primary" value="Submit">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>












<!--     <div class="row">
      <div class="span12">
        <form v-on:submit.prevent="submit()">
          <div class="row">
            <div class="span6">
              <div class="cform" id="contact-form">
                <h1>Login</h1>
                <ul>
                  <li class="text-danger" v-for="error in errors">{{ error }}</li>
                </ul>
                <div class="form-group">
                  <label>Email:</label>
                  <input type="email" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <label>Password:</label>
                  <input type="password" class="form-control" v-model="password"placeholder="Password">
                </div>
                <div id="container">
                  <input type="submit" class="btn btn-primary" value="Submit">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div> -->
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