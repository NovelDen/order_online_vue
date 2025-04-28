<template>
    <el-form :model="updateForm" ref="formRef" class="addForm">
        <el-form-item label="菜品名称：" prop="menuName">
            <el-select v-model="updateForm.menuName" placeholder="选择类型" @Change="menuChange">
                <el-option v-for="item in dashMenu" :key="item.menuId" :label="item.menuName" :value="item.menuId" />
            </el-select>
        </el-form-item>
        <el-form-item label="数量：" prop="quantity">
            <el-input-number v-model="updateForm.quantity" :min="1" @change="quantityChange" />
        </el-form-item>
        <el-form-item label="菜品总价格：" prop="price">
            {{ updateForm.price }}
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
import type { ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 updateForm 的接口
interface UpdateForm {
    orderInfoId: number | null,
    orderId: number | null,
    menuId: number | null,
    menuName: string,
    price: number | null,
    quantity: number,
}
onMounted(() => {
    loadMenu()
})
const dashMenu = ref<any>([]);
const loadMenu = async () => {
    request.get("/dashmenu").then(res => {
        if (res.data.code >= 200 && res.data.code < 300) {
            dashMenu.value = res.data.data;
        } else {
            console.log(res);
            ElMessage({
                message: res.data.message,
                type: "error",
                duration: 2000,
            });
        }

    }).catch(error => {
        ElMessage({
            message: error,
            type: "error",
        });
    });
};
const curMenu = reactive<any>({
    menuId: "",
    menuName: "",
    price: "",
    quantity: "",
});
const orderProps = defineProps({
    updateForm: {
        type: Object as () => UpdateForm,
        default: () => ({
            default: () => ({
            orderInfoId: null,
            orderId: null,
            menuId: null,
            menuName: "",
            price: null,
            quantity: null,
        }),
        }),
    },
});

const emit = defineEmits(['onUpdateOrderMenu']);

const updateForm = reactive<UpdateForm>({
    orderInfoId: orderProps.updateForm.orderInfoId,
    orderId: orderProps.updateForm.orderId,
    menuId: orderProps.updateForm.menuId,
    menuName: orderProps.updateForm.menuName,
    price: orderProps.updateForm.price,
    quantity: orderProps.updateForm.quantity,
});
if(updateForm.price){
    curMenu.price = updateForm.price / updateForm.quantity;
}
const menuChange = (menuId: any) => {
    const selectMenu = dashMenu.value.find((item: any) => item.menuId === menuId);
    Object.assign(curMenu, selectMenu);
    updateForm.menuId = curMenu.menuId;
    updateForm.price = curMenu.price * updateForm.quantity;
};
const quantityChange = (quantity: any) => {
        updateForm.price = curMenu.price * quantity;
};
const updateMenu = async () => {
    console.log(updateForm);
    if (!updateForm.menuId || !updateForm.menuName || !updateForm.price || !updateForm.quantity) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.post("/order/menu", updateForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('onUpdateOrderMenu');
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
    Object.assign(updateForm, orderProps.updateForm);
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