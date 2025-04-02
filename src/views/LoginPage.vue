<template>
    <div class="LoginPage">
        <div class="mask"></div>
        <div class="layout">
            <div class="title">
                <p>欢迎登录</p>
                <div class="sub">点餐小程序后台管理系统</div>
            </div>
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
                :model="formData"
                status-icon
                label-width="auto"
                class="loginForm"
            >
                <el-form-item label="" prop="account">
                    <el-input
                        v-model="formData.account"
                        type="text"
                        autocomplete="off"
                        placeholder="请输入账号"
                        class="input account"
                    />
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input
                        v-model="formData.password"
                        type="password"
                        autocomplete="off"
                        placeholder="请输入密码"
                        show-password
                        class="input password"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login()" class="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import request from "@/utils/request";
import router from "@/router";

const formData = reactive({
    account: "",
    password: "",
});
interface LoginResponse {
    code: number;
    message?: string;
    data?: any;
}

const login = async () => {
    // 表单校验：确保账号和密码不为空
    if (!formData.account || !formData.password) {
        ElMessage({
            message: "账号和密码不能为空",
            type: "warning",
            duration: 2000,
        });
        return;
    }

    try {
        const res = await request.get<LoginResponse>("/admin/login", {
            params: {
                account: formData.account,
                password: formData.password,
            },
        });
        // 检查 res.data.code 是否符合预期
        if (res.data.code >= 200 && res.data.code < 300) {
            localStorage.setItem("token", res.data.data.token);
            ElMessage({
                message: "用户：" + formData.account + " 登录成功",
                type: "success",
                duration: 2000,
            });
            router.push("/index");
        } else {
            ElMessage({
                message: res.data.message,
                type: "error",
                duration: 2000,
            });
        }
    } catch (error) {
        ElMessage({
            message: "请求失败，请稍后再试",
            type: "error",
            duration: 2000,
        });
    }
};
</script>

<style lang="scss" scoped>
.LoginPage {
    height: 100%;
    width: 100%;
    background-color: #bfa;
    .mask {
        background: url(@/assets/back.png) no-repeat center;
        background-size: cover;
        position: fixed;
        z-index: -999;
        height: 100vh;
        width: 100vw;
    }
    .layout {
        background: #fff;
        width: px2rem(450);
        // height: px2rem(550);
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        padding: px2rem(40);
        border-radius: 20px;
        &:hover,
        &:focus-within {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .title {
            font-size: px2rem(30);
            display: flex;
            justify-content: space-between;
            align-items: end;
            color: #333;
            cursor: default;
            .sub {
                font-size: px2rem(20);
                height: fit-content;
                color: #999;
            }
        }
        .loginForm {
            margin-top: px2rem(40);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .input {
                font-size: px2rem(18);
                :deep(.el-input__wrapper) {
                    box-shadow: none;
                    border-bottom: #666 1px solid;
                    border-radius: 0;
                    padding: 0;
                }
                :deep(.el-input__inner) {
                    height: fit-content;
                    font-size: px2rem(20);
                }
                &.account,
                &.password {
                    :deep(.el-input__wrapper)::before {
                        content: "\e652";
                        font-family: "iconfont";
                        font-size: px2rem(22);
                        color: #666;
                        margin-right: 10px;
                    }
                    :deep(.el-input__wrapper:focus-within)::before {
                        color: rgb(0, 150, 136);
                    }
                }
                &.password {
                    margin-top: px2rem(10);
                    :deep(.el-input__wrapper)::before {
                        content: "\e617";
                    }
                }
            }
            :deep(.el-form-item__content) {
                display: flex;
                justify-content: center;
            }
            .login {
                margin-top: px2rem(10);
                padding: 20px;
                background-color: #666;
                font-size: px2rem(18);
                transition: all 0.3s;
                &:hover {
                    background-color: rgb(0, 150, 136);
                    // box-shadow:  0 0 5px rgba(#666,1);
                }
            }
        }
    }
}
</style>
