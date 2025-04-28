<<<<<<< HEAD
<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold?'63px':'240px'">
        <menuBar :isFold="isFold"></menuBar>
      </el-aside>
      <el-container>
        <el-header>
          <headerBar @foldClick="foldClick"></headerBar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import menuBar from '@/components/menuBar.vue';
import headerBar from '@/components/headerBar.vue';
import { ref } from 'vue';
let isFold = ref(false);
const foldClick = (value) => {
  isFold.value = value;
};
</script>
<style lang="scss" scoped>
.main{
  height: 100%;
}
:deep(.el-container){
  height: 100vh;
}
:deep(.el-aside){
  background: #bfa;
  transition: width 0.2s ease;
  &::-webkit-scrollbar{
        display: none;
    }
}
// :deep(.el-header){
//   background: #fba;
// }
:deep(.el-main){
  background: #f2f2f6;
}
=======
<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold?'63px':'240px'">
        <menuBar :isFold="isFold"></menuBar>
      </el-aside>
      <el-container>
        <el-header>
          <headerBar @foldClick="foldClick"></headerBar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import menuBar from '@/components/menuBar.vue';
import headerBar from '@/components/headerBar.vue';
import { ref } from 'vue';
let isFold = ref(false);
const foldClick = (value) => {
  isFold.value = value;
};
</script>
<style lang="scss" scoped>
.main{
  height: 100%;
}
:deep(.el-container){
  height: 100vh;
}
:deep(.el-aside){
  background: #bfa;
  transition: width 0.2s ease;
  &::-webkit-scrollbar{
        display: none;
    }
}
// :deep(.el-header){
//   background: #fba;
// }
:deep(.el-main){
  background: #f2f2f6;
}
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
</style>