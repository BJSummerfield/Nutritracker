import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Consumption from './views/Consumption.vue';
import Home from './views/Home.vue';
import Foods from './views/Foods.vue';
import Dietcreate from './views/Dietcreate.vue';
import Dietupdate from './views/Dietupdate.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { 
      path: "/signup",
      name: "signup",
      component: Signup  
    },
    { 
      path: "/login",
      name: "login",
      component: Login  
    },
    { 
      path: "/logout",
      name: "logout",
      component: Logout  
    },
    { 
      path: "/consumptions",
      name: "index",
      component: Consumption  
    },
    { 
      path: "/foods",
      name: "foods",
      component: Foods  
    },    
    { 
      path: "/diet/create",
      name: "diet",
      component: Dietcreate       
    }, 
    {
      path: "/diet",
      name: "dietupdate",
      component: Dietupdate  
    },  
    { 
      path: "/",
      name: "home",
      component: Home  
    }
  ]
});
