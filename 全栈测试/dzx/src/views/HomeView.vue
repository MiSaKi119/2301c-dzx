<template>
  <div>
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/yi" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/er" icon="search">分类</van-tabbar-item>
      <van-tabbar-item replace to="/san" icon="home-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/si" icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>