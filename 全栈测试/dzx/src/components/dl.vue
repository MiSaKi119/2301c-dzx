<template>
  <div class="dzx">
    <h2>账号密码登录</h2>
    <p class="p1">为了你的安全，请用手机号登录</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="中国+86"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        label=""
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      ></van-field>
      <div style="margin: 16px">
        <van-button type="primary" size="large" @click="dl1">登录</van-button>
      </div>
    </van-form>
    <div class="dzx1">
      <p class="p2">验证码登录</p>
      <div class="dzx2">
        <p class="p2">忘记密码</p>
        <p class="p3" @click="dl2">免费注册</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { dl } from "../api/http";
let router = useRouter();
let dl2 = () => {
  router.push("/yzm");
};
let dl1 = () => {
  dl({mobile:'123',pwd:'123456',deviceId:16983106199973322818,deviceName:'pc'}).then((res) => {
    console.log(res);
  })
};
</script>

<style lang="scss" scoped>
.dzx {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  h2 {
    text-align: left;
  }
  .p1 {
    margin-top: 0;
    text-align: left;
    color: #aea69b;
  }
  .dzx1 {
    p {
      font-size: 14px;
      color: #75adda;
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dzx2 {
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.van-button:before {
  border: 0ch;
}
</style>