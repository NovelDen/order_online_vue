<template>
    <el-form :model="updateFormData" ref="ruleFormRef" class="updateForm" :rules="rules" label-width="auto" status-icon>
        <el-form-item label="密码：" prop="password">
            <el-input type="password" show-password v-model="updateFormData.password" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" show-password v-model="updateFormData.checkPass" />
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="updateAdmin(ruleFormRef)">修改密码</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive,defineEmits } from 'vue';
import { ElMessage } from "element-plus";
import type { ElForm, FormInstance, FormRules } from 'element-plus'
import { useStore } from "vuex";
import request from '@/utils/request';
const ruleFormRef = ref<FormInstance>()
const store = useStore();
const user = store.getters.user;
const emit = defineEmits(['onUpdatePassword'])
const updateFormData = reactive({
    id: user.id,
    account: user.account,
    token: user.token,
    password: "",
    checkPass: '',
    avatar: user.avatar,
});
function isConsecutiveDigits(password: any) {
    // 检查是否为纯数字
    if (!/^\d+$/.test(password)) {
        return false; // 不是纯数字，直接返回false
    }

    // 将密码转换为字符串数组
    const digits = password.split('');

    // 检查是否为连续数字
    for (let i = 1; i < digits.length; i++) {
        const current = parseInt(digits[i], 10);
        const previous = parseInt(digits[i - 1], 10);

        // 检查是否为递增或递减的连续数字
        if (current !== previous + 1 && current !== previous - 1) {
            return false; // 不是连续数字
        }
    }

    return true; // 是连续数字
}
const validatePass = (rule: any, value: any, callback: any) => {
    const regex = /^(?![!@#$%^&*()_+])[A-Za-z0-9\W]{8,24}$/;
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        if (!regex.test(value)) {
            callback(new Error('请输入不包含!@#$%^&*()_+特殊字符的8到24位密码'));
        } else {
            if (isConsecutiveDigits(value)) {
                callback(new Error('密码过于简单'));
            } else {
                if (updateFormData.checkPass !== '') {
                    // 使用同步方式调用 validateField
                    ruleFormRef.value?.validateField('checkPass', (errorMessage: any) => {
                        if (!errorMessage) {
                            callback(new Error(errorMessage));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            }
        }
    }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== updateFormData.password) {
        callback(new Error("两次密码不相同！"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof updateFormData>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})
const updateAdmin = async (formRef: any) => {
    if (!formRef) return
    formRef.validate((valid: any) => {
        if (valid) {
            request.post("/admin", updateFormData).then(async (res) => {
                if (res.data.code >= 200 && res.data.code < 300) {
                    ElMessage({
                        message: "更新成功",
                        type: "success",
                        duration: 2000,
                    });
                    ruleFormRef.value?.resetFields()
                    emit("onUpdatePassword")
                } else {
                    console.log(res);
                    ElMessage({
                        message: res.data.message,
                        type: "error",
                    })
                }
            }).catch(error => {
                ElMessage({
                    message: error,
                    type: "error",
                })
            });
        } else {
            ElMessage.error("请填写完整信息")
            return
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.updateAdminInfo {
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;

    .form {
        width: px2rem(400);
        height: fit-content;
        padding: 20px;

        .updateForm {
            .avatar-uploader {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;

                .avatar {
                    width: px2rem(180);
                    height: px2rem(180);
                    display: block;
                }
            }
        }

        .option {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>