<template>
  <div>
    <div class="img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in dzx" :key="index">
          <img :src="item.picUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <p>商品列表</p>
    <div class="dzx1">
      <div class="dzx" v-for="(item, index) in dzx1" :key="index">
        <img :src="item.pic" alt="" />
        <p>{{ item.characteristic }}</p>
        <div class="dzx2">
          <div class="dzx3">
            <p>￥1</p>
            <s>￥109</s>
          </div>
          <button>购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sy, sp } from "../api/http";
let dzx = ref([]);
let dzx1 = ref([]);
sy().then((res) => {
  dzx.value = res.data.data;
});
sp({ page: 1, pageSize: 10, token: "" }).then((res) => {
  console.log(res);
  dzx1.value = res.data.data.result;
  console.log(dzx1.value);
});
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
.dzx1 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #faf9fa;
  .dzx {
    width: 48%;
    background-color: #faf9fa;
    border-radius: 10px;
    img {
      width: 100%;
    }
  }
  p {
    width: 100%;

    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dzx2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    button{
        background-color: #fff;
        border: 1px solid green;
        color: green;
    }
    .dzx3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>