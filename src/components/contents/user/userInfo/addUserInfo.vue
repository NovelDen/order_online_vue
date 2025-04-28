<template>
    <el-form :model="addFormData" ref="formRef" class="addForm">
        <el-upload class="avatar-uploader" action="http://localhost:9090/files/userimg" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <el-form-item label="用户名称" prop="uName">
            <el-input v-model="addFormData.uName" />
        </el-form-item>
        <el-form-item label="用户账号" prop="uAccount">
            <el-input v-model="addFormData.uAccount" />
        </el-form-item>
        <el-form-item label="用户密码" prop="uPassword">
            <el-input v-model="addFormData.uPassword" />
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="addMenu">添加</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ref, defineProps, reactive, defineEmits } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';
const addFormData = reactive({
    uName: "",
    uAccount: "",
    uPassword: "",
    uAvatar: "",
});
const imageUrl = ref('')
const props = defineProps({
    dashType: {
        type: Array as () => any[],
        default: () => [],
    },
});
const emit = defineEmits(['addMenu'])
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    const res = response as any
    addFormData.uAvatar = res.message
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
const addMenu = async () => {
    if (!addFormData.uName || !addFormData.uAccount || !addFormData.uPassword) {
        ElMessage.error("请填写完整信息")
        return
    } else {
        request.put("/user", addFormData).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields()
                imageUrl.value = ''
                emit('addMenu')
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
    // console.log(addFormData);
}

</script>
<style lang="scss" scoped>
.addForm {
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