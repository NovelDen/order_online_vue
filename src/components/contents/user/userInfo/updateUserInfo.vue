<template>
    <el-form :model="updateForm" ref="formRef" class="addForm">
        <el-upload class="avatar-uploader" action="http://localhost:9090/files/userimg" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="uAvatar" :src="uAvatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
        <el-form-item label="用户名称" prop="uName">
            <el-input v-model="updateForm.uName" />
        </el-form-item>
        <el-form-item label="用户账号" prop="uAccount">
            <el-input v-model="updateForm.uAccount" />
        </el-form-item>
        <!-- <el-form-item label="用户密码" prop="uPassword">
            <el-input v-model="updateForm.uPassword" />
        </el-form-item> -->
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

// 定义 updateForm 的接口
interface UpdateForm {
    uId: number | null;
    uName: string;
    uAccount: string;
    // uPassword: string;
    uAvatar: string; // 添加 missing 属性
}

// 使用 withDefaults 设置默认值
const dashTypeProps = defineProps({
    updateForm: {
        type: Object as () => UpdateForm,
        default: () => ({
            uId: "",
            uName: "",
            uAccount: "",
            // uPassword: "",
            uAvatar: "",
        }),
    },
});

const emit = defineEmits(['updateMenu']);

const updateForm = reactive<UpdateForm>({
    uId: dashTypeProps.updateForm.uId,
    uName: dashTypeProps.updateForm.uName,
    uAccount: dashTypeProps.updateForm.uAccount,
    // uPassword: dashTypeProps.updateForm.uPassword,
    uAvatar: dashTypeProps.updateForm.uAvatar,
});

const uAvatar = ref(updateForm.uAvatar);

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    uAvatar.value = URL.createObjectURL(uploadFile.raw!);
    const res = response as any;
    updateForm.uAvatar = res.message;
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
    if (!updateForm.uName || !updateForm.uAccount || !updateForm.uAvatar) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.post("/user", updateForm).then(async (res) => {
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
    uAvatar.value = updateForm.uAvatar;
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