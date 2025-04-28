<<<<<<< HEAD
<template>
    <el-form :model="addForm" ref="formRef" class="addForm">
        <el-form-item label="菜品名称" prop="menuName">
            <el-select v-model="addForm.menuName" placeholder="选择类型" @Change="menuChange">
                <el-option v-for="item in dashMenu" :key="item.menuId" :label="item.menuName" :value="item.menuId" />
            </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
            <el-input-number v-model="addForm.quantity" :min="1" @change="quantityChange" />
        </el-form-item>
        <el-form-item label="菜品总价格" prop="price">
            {{ addForm.price }}
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="addMenu">添加</el-button>
        <el-button @click="resetForm">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits, defineExpose, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import type { ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 updateForm 的接口
interface AddForm {
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
// 使用 withDefaults 设置默认值
const orderProps = defineProps({
    addForm: {
        type: Object as () => AddForm,
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

const emit = defineEmits(['addOrder']);

const addForm = reactive<AddForm>({
    orderInfoId: orderProps.addForm.orderInfoId,
    orderId: orderProps.addForm.orderId,
    menuId: orderProps.addForm.menuId,
    menuName: orderProps.addForm.menuName,
    price: orderProps.addForm.price,
    quantity: orderProps.addForm.quantity,
});

const menuChange = (menuId: any) => {
    const selectMenu = dashMenu.value.find((item: any) => item.menuId === menuId);
    Object.assign(curMenu, selectMenu);
    addForm.menuId = curMenu.menuId;
    addForm.price = curMenu.price * addForm.quantity;
};
const quantityChange = (quantity: any) => {
        addForm.price = curMenu.price * quantity;
};
const addMenu = async () => {
    console.log(addForm);
    if (!addForm.menuId || !addForm.menuName || !addForm.price || !addForm.quantity) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.put("/order/menu", addForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('addOrder');
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
    Object.assign(addForm, orderProps.addForm);
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
    <el-form :model="addForm" ref="formRef" class="addForm">
        <el-form-item label="菜品名称" prop="menuName">
            <el-select v-model="addForm.menuName" placeholder="选择类型" @Change="menuChange">
                <el-option v-for="item in dashMenu" :key="item.menuId" :label="item.menuName" :value="item.menuId" />
            </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
            <el-input-number v-model="addForm.quantity" :min="1" @change="quantityChange" />
        </el-form-item>
        <el-form-item label="菜品总价格" prop="price">
            {{ addForm.price }}
        </el-form-item>
    </el-form>
    <div class="option">
        <el-button type="primary" @click="addMenu">添加</el-button>
        <el-button @click="resetForm">重置</el-button>
    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits, defineExpose, onMounted } from 'vue';
import { ElMessage } from "element-plus";
import type { ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';

// 定义 updateForm 的接口
interface AddForm {
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
// 使用 withDefaults 设置默认值
const orderProps = defineProps({
    addForm: {
        type: Object as () => AddForm,
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

const emit = defineEmits(['addOrder']);

const addForm = reactive<AddForm>({
    orderInfoId: orderProps.addForm.orderInfoId,
    orderId: orderProps.addForm.orderId,
    menuId: orderProps.addForm.menuId,
    menuName: orderProps.addForm.menuName,
    price: orderProps.addForm.price,
    quantity: orderProps.addForm.quantity,
});

const menuChange = (menuId: any) => {
    const selectMenu = dashMenu.value.find((item: any) => item.menuId === menuId);
    Object.assign(curMenu, selectMenu);
    addForm.menuId = curMenu.menuId;
    addForm.price = curMenu.price * addForm.quantity;
};
const quantityChange = (quantity: any) => {
        addForm.price = curMenu.price * quantity;
};
const addMenu = async () => {
    console.log(addForm);
    if (!addForm.menuId || !addForm.menuName || !addForm.price || !addForm.quantity) {
        ElMessage.error("请填写完整信息");
        return;
    } else {
        request.put("/order/menu", addForm).then(async (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                formRef.value?.resetFields();
                emit('addOrder');
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
    Object.assign(addForm, orderProps.addForm);
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