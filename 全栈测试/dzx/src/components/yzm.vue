<template>
  <div class="dzx">
    <h2>免费注册</h2>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="中国+86"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        label=""
        placeholder="请设置8-25位（数字+字母）密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      ></van-field>
      <van-field
        v-model="password"
        type="password"
        label=""
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      ></van-field>
      <div style="margin: 16px">
        <van-button type="primary" size="large">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { yzm } from "../api/http";
import { reactive } from "vue";
let query = reactive({
  key: new Date().getTime(),
  token: "",
});
yzm(query).then((res) => {
  console.log();
  console.log(res);
});
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