import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import ConsumptionIndex from './views/ConsumptionIndex.vue';
import Home from './views/Home.vue';
import FoodsIndex from './views/FoodsIndex.vue';

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
      component: ConsumptionIndex  
    },
    { 
      path: "/foods",
      name: "foods",
      component: FoodsIndex  
    },  
    { 
      path: "/",
      name: "home",
      component: Home  
    }
  ]
});
