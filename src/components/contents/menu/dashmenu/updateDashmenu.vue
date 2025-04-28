<template>
    <el-form :model="updateForm" ref="formRef" class="addForm">
        <el-upload class="avatar-uploader" action="http://localhost:9090/files/dashimg" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <el-form-item label="菜品名称" prop="menuName">
            <el-input v-model="updateForm.menuName" />
        </el-form-item>
        <el-form-item label="菜品种类" prop="categoryId">
            <el-select v-model="updateForm.categoryId" placeholder="请选择菜品种类">
                <el-option v-for="item in dashType" :key="item.categoryId" :label="item.categoryName"
                    :value="item.categoryId" />
            </el-select>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
            <el-input v-model="updateForm.price" />
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
            <el-input v-model="updateForm.description" />
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="updateMenu">更新</el-button>
        <el-button @click="resetForm">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ref, defineProps, reactive, defineEmits, defineExpose } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 dashType 的接口
interface DashType {
    categoryId: string | number;
    categoryName: string;
}

// 定义 updateForm 的接口
interface UpdateForm {
    menuId: number | null;
    menuName: string;
    description: string; // 添加 missing 属性
    price: number | null;
    imagePath: string;
    categoryId: number | null; // 添加 missing 属性
}

// 使用 withDefaults 设置默认值
const dashTypeProps = defineProps({
    dashType: {
        type: Array as () => DashType[],
        default: () => [],
    },
    updateForm: {
        type: Object as () => UpdateForm,
        default: () => ({
            menuId: "",
            menuName: "",
            description: "",
            categoryId: "",
            price: "",
            imagePath: "",
        }),
    },
});

const emit = defineEmits(['updateMenu']);

const updateForm = reactive<UpdateForm>({
    menuId: dashTypeProps.updateForm.menuId,
    menuName: dashTypeProps.updateForm.menuName,
    description: dashTypeProps.updateForm.description,
    categoryId: dashTypeProps.updateForm.categoryId,
    price: dashTypeProps.updateForm.price,
    imagePath: dashTypeProps.updateForm.imagePath,
});

const imageUrl = ref(updateForm.imagePath);

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    const res = response as any;
    updateForm.imagePath = res.message;
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(rawFile.type)) {
        ElMessage.error('头像图片必须是 JPG 或 PNG 格式!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
    }
    return true;
};

const updateMenu = async () => {
    console.log(updateForm);
    if (!updateForm.menuName || !updateForm.categoryId || !updateForm.price || !updateForm.description) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.post("/dashmenu", updateForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('updateMenu');
            } else {
                console.log(res);
                ElMessage({
                    message: res.data.message,
                    type: "error",
                });
            }
        }).catch(error => {
            ElMessage({
                message: error,
                type: "error",
            });
        });
    }
};

const formRef = ref<FormInstance>();

const resetForm = () => {
    Object.assign(updateForm, dashTypeProps.updateForm);
    imageUrl.value = updateForm.imagePath;
    // formRef.value?.resetFields();
};

// 显式暴露 resetForm 方法
defineExpose({
    resetForm
});
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