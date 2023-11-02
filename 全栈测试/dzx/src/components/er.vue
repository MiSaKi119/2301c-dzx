<template>
  <div class="er">
    <div class="dzx">
      <div class="dzx2">
        <div
          class="dzx1"
          v-for="(item, index) in data"
          :key="index"
          @click="dj(item.userId)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fl, fl2 } from "../api/http";
import { ref } from "vue";
let data = ref([]);

fl().then((res) => {
  console.log(res);
  data.value = res.data.data;
});
let dj = (id) => {
  console.log(id);
  fl2({categoryId:id,page:1,pageSize:10,token:''}).then((res) => {
  console.log(res);
 
});
};
</script>

<style lang="scss" scoped>
.dzx {
  width: 100%;
  display: flex;
  display: flex;
  justify-content: space-between;
  .dzx2 {
    width: 30%;
    .dzx1 {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>