<template>
  <section id="signup" class="section green">
    <div class="container">
      <div class="blankdivider30">
      </div>
      <div class="row">
        <div class="cform" id="contact-form">
          <form v-on:submit.prevent="submit()">
            <h4>Signup</h4>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="email">
              <input type="email" class="form-control" v-model="name" placeholder="Name">
            </div>
            <div class="email">
              <input type="email" class="form-control" v-model="email" placeholder="Email">
            </div>
            <div class="pasword">
              <input type="password" class="form-control" v-model="password" placeholder="Password">
            </div>
            <div class="passwordc">
              <input type="password" class="form-control" v-model="passwordConfirmation" placeholder="Password Confirmation">
            </div>
            <div class="submit">
              <input type="submit" class="btn btn-primary" value="Submit">
            </div>
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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

