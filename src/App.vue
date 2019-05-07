<template>
  <div id="app">
    <div class="navbar-wrapper">
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
          <div class="container">
            <!-- Responsive navbar -->
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
          </a>
            <h1 class="brand"><a href="index.html">Nutri-Tracker</a></h1>
            <!-- navigation -->
            <nav class="pull-right nav-collapse collapse">
              <ul id="menu-main" class="nav">
                <li><a title="signup" href="/signup">Signup</a></li>
                <li><a title="login" href="/login">Login</a></li>
                <li><a title="logout" href="/logout">Logout</a></li>
                <li><a title="foods" href="/diet">Diet Customization</a></li>
                <li><a title="foods" href="/foods">Foods Search</a></li>    
                <li><a title="consumptions" href="/consumptions">Your Values</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  <router-view/>
  <footer>
    <div class="container"></div>
    <!-- ./container -->
  </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
