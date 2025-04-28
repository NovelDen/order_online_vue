<template>
    <div class="aside">
        <div class="logo">
            <img
                src="@/assets/logo.png"
                alt=""
                v-bind:class="isFold ? 'foldlogo' : ''"
            />
            <div class="tit" v-show="!isFold">
                <p>点餐小程序</p>
                <p>后台管理系统</p>
            </div>
        </div>
        <div class="menu">
            <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                :collapse="isFold"
                :collapse-transition="false"
                background-color="#0f1f36"
                active-text-color="#fff"
                text-color="#aaa"
                active-bg-color="#265fbf"
            >
                >
                <el-sub-menu
                    v-for="menu in menuData"
                    :key="menu.id"
                    :index="menu.id"
                >
                    <template #title>
                        <el-icon>
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <span>{{ menu.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="sub in menu.sub"
                        :key="sub.id"
                        :index="sub.id"
                        @click="routeTo(menu.route, sub.route)"
                        >{{ sub.title }}</el-menu-item
                    >
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps, computed } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

const menuData: any = ref([]);
const route = useRoute();

onMounted(async () => {
    const response = await import("@/utils/menuData.json");
    menuData.value = response.default;
});
const menuMap = (menu: any, path: any) => {
    let defaultActive = "1-1"
    menu.value.forEach((item: any) => {
        item.sub.forEach((subItem: any) => {
            if (item.route + subItem.route === path) {
                defaultActive = subItem.id
            }
        });
    });
    return defaultActive
}
const defaultActive = computed(()=>menuMap(menuData, route.path));


const props = defineProps({
    isFold: {
        type: Boolean,
        default: false,
    },
});
const routeTo = (menu: any, sub: any) => {
    router.push(menu + sub);
};
</script>
<style lang="scss" scoped>
.aside {
    // padding: px2rem(10);
    background: #0f1f36;
    height: 100%;
}
.logo {
    display: flex;
    justify-content: center;
    padding: px2rem(10);
    img {
        width: px2rem(44);
    }
    .tit {
        margin-left: px2rem(20);
        color: #fff;
    }
}
.menu {
    :deep(.el-menu) {
        border: none;
    }
    :deep(.el-menu-item.is-active) {
        background: #265fbf;
        color: #fff;
    }
}
</style>