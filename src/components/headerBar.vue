<template>
    <div class="header">
        <div class="left">
            <div class="menu" @click="foldClick">
                <div class="icon">
                    <el-icon color="#333" size="24">
                        <!-- <component :is="isFold? 'Fold': 'Expand' " /> -->
                        <Fold v-show="!isFold" />
                        <Expand v-show="isFold" />
                    </el-icon>
                </div>
                <div class="tit">
                    <p v-show="!isFold">关闭菜单</p>
                    <p v-show="isFold">展开菜单</p>
                </div>
            </div>
            <div class="path">
                <headerCrumb></headerCrumb>
            </div>
        </div>
        <div class="right">
            <div class="user">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                        <el-avatar :size="45" :src="user.avatar" class="avatar" />
                        <span class="name">{{ user.account }}</span>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            <el-dropdown-item divided @click="updateAdmin">个人信息</el-dropdown-item>
                            <el-dropdown-item @click="updatePassword">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <el-dialog v-model="updateAdminDialog" title="更新管理员信息" width="30%">
            <adminInfo @onUpdateAdmin="onUpdateAdmin" />
        </el-dialog>
        <el-dialog v-model="updatePasswordDialog" title="修改密码" width="30%">
            <adminPassword @onUpdatePassword="onUpdatePassword" />
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { ElMessage } from "element-plus";
import { ref, defineEmits, watch } from "vue";
import { useStore } from "vuex";
import headerCrumb from "@/components/headerCrumb.vue";
import adminInfo from "@/components/contents/admin/adminInfo.vue";
import adminPassword from "./contents/admin/adminPassword.vue";
const store = useStore();
const user = store.getters.user;
let isFold = ref(false);
const updateAdminDialog = ref(false);
const updatePasswordDialog = ref(false);
const emit = defineEmits(["foldClick"]);
let foldClick = () => {
    isFold.value = !isFold.value;
    emit("foldClick", isFold.value);
};
let logout = () => {
    localStorage.removeItem("token");
    store.commit(
        "setUser",
        {
            id: "",
            account: "",
            token: "",
            avatar: "",
        }
    );
    router.push("/login");
    ElMessage({
        message: "退出登录成功",
        type: "success",
        duration: 2000,
    });
};
const updateAdmin = () => {
    updateAdminDialog.value = true;
};
const onUpdateAdmin = () => {
    updateAdminDialog.value = false;
};
const updatePassword = () => {
    updatePasswordDialog.value = true;
};
const onUpdatePassword = () => {
    updatePasswordDialog.value = false;
};
watch(
    () => store.getters.user,
    (newUser: any) => {
        user.id = newUser.id;
        user.account = newUser.account;
        user.avatar = newUser.avatar;
    },
    { immediate: true }
);
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .left {
        display: flex;
        align-items: center;

        .menu {
            display: flex;
            align-items: center;
            cursor: pointer;

            .icon {
                padding-right: 10px;
                display: flex;
                align-items: center;
            }
        }

        .path {
            margin-left: 10px;
            display: flex;
            align-items: center;
            height: 100%;
        }
    }

    .right {
        display: flex;
        align-items: center;
        padding-right: px2rem(40);

        .user {
            display: flex;
            align-items: center;

            .el-dropdown-link {
                cursor: pointer;
                display: flex;
                align-items: center;
                outline: none;

                .avatar {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>