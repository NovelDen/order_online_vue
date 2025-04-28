<<<<<<< HEAD
<template>
    <el-form :model="updateForm" ref="formRef" class="addForm">
        <el-form-item label="用户名称：" prop="uName">{{ updateForm.uName }}</el-form-item>
        <el-form-item label="订单时间：" prop="orderTime">{{ updateForm.orderTime }}</el-form-item>
        <el-form-item label="订单状态：" prop="status">
            <el-select v-model="updateForm.status" placeholder="选择类型" @Change="statusChange">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="updateMenu">更新</el-button>
        <el-button @click="resetForm">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits, defineExpose, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import type { FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 updateForm 的接口
interface UpdateForm {
    orderId: number|null,
    uId: number|null,
    uName: string,
    orderTime: string,
    status: string,
}

const status = ref<any>([{
    value: 1,
    label: '待支付'
}, {
    value: 2,
    label: '已支付'
}, {
    value: 3,
    label: '已完成'
},{
    value: 4,
    label: '已取消'
}]);

const orderProps = defineProps({
    updateOrderForm: {
        type: Object as () => UpdateForm,
        default: () => ({
            default: () => ({
                orderId: null,
                uId: null,
                uName: "",
                orderTime: "",
                status: "",
            }),
        }),
    },
});

const emit = defineEmits(['onUpdateOrder']);

const updateForm = reactive<UpdateForm>({
    orderId: orderProps.updateOrderForm.orderId,
    uId: orderProps.updateOrderForm.uId,
    uName: orderProps.updateOrderForm.uName,
    orderTime: orderProps.updateOrderForm.orderTime,
    status: orderProps.updateOrderForm.status,
});

const statusChange = (label: any) => {
    updateForm.status = label
};

const updateMenu = async () => {
    console.log(updateForm);
    if (!updateForm.orderId || !updateForm.uId || !updateForm.uName || !updateForm.orderTime || !updateForm.status) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.post("/order", updateForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('onUpdateOrder');
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
    Object.assign(updateForm, orderProps.updateOrderForm);
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
=======
<template>
    <el-form :model="updateForm" ref="formRef" class="addForm">
        <el-form-item label="用户名称：" prop="uName">{{ updateForm.uName }}</el-form-item>
        <el-form-item label="订单时间：" prop="orderTime">{{ updateForm.orderTime }}</el-form-item>
        <el-form-item label="订单状态：" prop="status">
            <el-select v-model="updateForm.status" placeholder="选择类型" @Change="statusChange">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="updateMenu">更新</el-button>
        <el-button @click="resetForm">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits, defineExpose, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import type { FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 updateForm 的接口
interface UpdateForm {
    orderId: number|null,
    uId: number|null,
    uName: string,
    orderTime: string,
    status: string,
}

const status = ref<any>([{
    value: 1,
    label: '待支付'
}, {
    value: 2,
    label: '已支付'
}, {
    value: 3,
    label: '已完成'
},{
    value: 4,
    label: '已取消'
}]);

const orderProps = defineProps({
    updateOrderForm: {
        type: Object as () => UpdateForm,
        default: () => ({
            default: () => ({
                orderId: null,
                uId: null,
                uName: "",
                orderTime: "",
                status: "",
            }),
        }),
    },
});

const emit = defineEmits(['onUpdateOrder']);

const updateForm = reactive<UpdateForm>({
    orderId: orderProps.updateOrderForm.orderId,
    uId: orderProps.updateOrderForm.uId,
    uName: orderProps.updateOrderForm.uName,
    orderTime: orderProps.updateOrderForm.orderTime,
    status: orderProps.updateOrderForm.status,
});

const statusChange = (label: any) => {
    updateForm.status = label
};

const updateMenu = async () => {
    console.log(updateForm);
    if (!updateForm.orderId || !updateForm.uId || !updateForm.uName || !updateForm.orderTime || !updateForm.status) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.post("/order", updateForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('onUpdateOrder');
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
    Object.assign(updateForm, orderProps.updateOrderForm);
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
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
</style>