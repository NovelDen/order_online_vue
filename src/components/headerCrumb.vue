<<<<<<< HEAD
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="breadcrumb.url">{{
            breadcrumb.suptit
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumb.subtit }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const menuData: any = ref([]);

const route = useRoute();
onMounted(async () => {
    const response = await import("@/utils/menuData.json");
    menuData.value = response.default;
});
const menuMap = (menu: any, path: any) => {
    const menutit = reactive({
        suptit: "",
        subtit: "",
        url: "",
    });
    menu.value.forEach((item: any) => {
        item.sub.forEach((subItem: any) => {
            if (item.route + subItem.route === path) {
                let firstSub = item.sub[0];
                menutit.suptit = item.title;
                menutit.subtit = subItem.title;
                menutit.url = item.route + firstSub.route;
            }
        });
    });
    return menutit;
}
const breadcrumb = computed(() => menuMap(menuData, route.path));

</script>
=======
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="breadcrumb.url">{{
            breadcrumb.suptit
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumb.subtit }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const menuData: any = ref([]);

const route = useRoute();
onMounted(async () => {
    const response = await import("@/utils/menuData.json");
    menuData.value = response.default;
});
const menuMap = (menu: any, path: any) => {
    const menutit = reactive({
        suptit: "",
        subtit: "",
        url: "",
    });
    menu.value.forEach((item: any) => {
        item.sub.forEach((subItem: any) => {
            if (item.route + subItem.route === path) {
                let firstSub = item.sub[0];
                menutit.suptit = item.title;
                menutit.subtit = subItem.title;
                menutit.url = item.route + firstSub.route;
            }
        });
    });
    return menutit;
}
const breadcrumb = computed(() => menuMap(menuData, route.path));

</script>
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
<style lang="scss" scoped></style>