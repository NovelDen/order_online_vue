<template>
    <el-form :model="addFormData" ref="formRef" class="addForm">
        <el-upload class="avatar-uploader" action="http://localhost:9090/files/dashimg" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <el-form-item label="菜品名称" prop="menuName">
            <el-input v-model="addFormData.menuName" />
        </el-form-item>
        <el-form-item label="菜品种类" prop="categoryId">
            <el-select v-model="addFormData.categoryId" placeholder="请选择菜品种类">
                <el-option v-for="item in dashType" :key="item.categoryId" :label="item.categoryName"
                    :value="item.categoryId" />
            </el-select>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
            <el-input v-model="addFormData.price" />
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
            <el-input v-model="addFormData.description" />
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="addMenu">添加</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ref, defineProps, reactive,defineEmits } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';
const addFormData = reactive({
    menuName: "",
    description: "",
    categoryId: "",
    price: "",
    imagePath: "",
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
    addFormData.imagePath = res.message
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
    console.log(addFormData);
    if (!addFormData.menuName || !addFormData.categoryId || !addFormData.price || !addFormData.description) {
        ElMessage.error("请填写完整信息")
        return
    } else {
        request.put("/dashmenu", addFormData).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields()
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