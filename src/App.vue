<template>
  <div id="app-container">
    <div id="header">
      <img class="logo" src="../static/logo.png" alt="">
      <router-link :to="{ path: '/search' }" tag="div" class="search">
          <img src="../static/search.png" alt="">
      </router-link>
    </div>
    <SmallPlayer></SmallPlayer>
    <router-view></router-view>
    
  </div>
    
</template>

<script>
import SmallPlayer from './components/SmallPlayer.vue'
export default {
  components: {
    SmallPlayer
  }
}
</script>

<style>
  body,html,#app,#app-container {
    height: 100%;
  }
  #header {
    width: 100%;
    height: 1.333333rem;
    background-color: #2CA2F9;
  }
  #header .logo {
    float: left;
    margin-left: 0.266667rem;
    margin-top: 0.346667rem;
    height: 0.626667rem;
  }
  #header .search {
    float: right;
    margin-top: 0.44rem;
    margin-right: 0.666667rem;
    height: 0.453333rem;
  }
  #header .search img {
    height: 0.453333rem;
  }
</style>
