<template>
  <div @click="logout">退出登录</div>
</template>
<script setup>
import router from '@/router';
import { ElMessage } from "element-plus";

  let logout = () => {
    localStorage.removeItem("token");
    router.push('/');
    ElMessage({
      message: "退出登录成功",
      type: "success",
      duration: 2000,
    });
  }
</script>
<style lang="scss" scoped>

</style>