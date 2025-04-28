<template>
    <div class="updateAdminInfo">
        <div class="form">
            <el-form :model="updateFormData" ref="formRef" class="updateForm">
                <el-upload class="avatar-uploader" action="http://localhost:9090/files/userimg" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="updateFormData.account" />
                </el-form-item>
            </el-form>
            <div class="option">
                <el-button type="primary" @click="updateAdmin">更新</el-button>
                <el-button @click="resetForm(formRef)">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ref, reactive, watch,defineEmits } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import { useStore } from "vuex";
import request from '@/utils/request';
const store = useStore();
const user = store.getters.user;
const emit = defineEmits(['onUpdateAdmin'])
const updateFormData = reactive({
    id: user.id,
    account: user.account,
    token: user.token,
    password: "",
    avatar: user.avatar,
});
const imageUrl = ref(user.avatar)
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    const res = response as any
    updateFormData.avatar = res.message
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(rawFile.type)) {
        ElMessage.error('头像图片必须是 JPG 或 PNG 格式!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const updateAdmin = async () => {
    if (!updateFormData.account || !updateFormData.avatar) {
        ElMessage.error("请填写完整信息")
        return
    } else {
        request.post("/admin", updateFormData).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                store.commit(
                    "setUser",
                    {
                        id: res.data.data.userId,
                        account: res.data.data.userName,
                        avatar: res.data.data.avatar,
                    }
                );
                emit("onUpdateAdmin")
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
    }
}
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
watch(
    () => store.getters.user,
    (newUser: any) => {
        updateFormData.id = newUser.id;
        updateFormData.account = newUser.account;
        updateFormData.avatar = newUser.avatar;
        imageUrl.value = newUser.avatar;
    },
    { immediate: true }
);
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