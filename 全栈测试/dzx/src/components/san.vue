<template>
  <div>
    <van-empty description="登录后才能看到您的购物车" />
    <button @click="dl">去登录</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
let router = useRouter();
let dl = () => {
  router.push('/dl')
};
</script>

<style lang="scss" scoped>
button {
  width: 80px;
  height: 35px;
  border-radius: 20px;
  border: 0;
  background-color: #1ba783;
  color: #fff;
}
</style>