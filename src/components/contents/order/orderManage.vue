<template>
    <el-table :data="tableData" :preserve-expanded-content="preserveExpanded">
        <el-table-column type="expand">
            <template #default="props">
                <el-table :data="props.row.orderInfo">
                    <el-table-column label="菜品名称" prop="menuName" />
                    <el-table-column label="数量" prop="quantity" />
                    <el-table-column label="菜品总价" prop="price" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="large" type="primary" @click="openUpdate(scope.$index, scope.row)">
                                修改
                            </el-button>
                            <el-button size="large" type="danger" @click="handleDeleteMenu(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="uName" />
        <el-table-column label="总额" prop="totalAmount" width="100" />
        <el-table-column label="订单时间" prop="orderTime"/>
        <el-table-column label="订单状态" prop="status"/>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="large" type="primary" @click="updateOrderstatus(scope.$index, scope.row)">更新订单状态</el-button>
                <el-button size="large" type="primary" @click="openAddOrderMenu(scope.$index, scope.row)">
                    添加菜品
                </el-button>
                <el-button size="large" type="danger" @click="handleDeleteOrder(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="updateOrderDialog" title="更新订单状态" width="30%">
        <updateOrder :updateOrderForm="updateOrderForm" @onUpdateOrder="onUpdateOrder" ref="updateOrderRef" />
    </el-dialog>
    <el-dialog v-model="addOrderMenuDialog" title="添加订单菜品" width="30%">
        <addOrderMenu :addForm="addForm" @addOrder="addOrder" ref="addOrderRef" />
    </el-dialog>
    <el-dialog v-model="updateOrderMenuDialog" title="更新订单菜品信息" width="30%">
        <updateOrderMenu :updateForm="updateForm" @onUpdateOrderMenu="onUpdateOrderMenu" ref="updateOrderMenuRef" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import updateOrderMenu from './orderManage/updateOrderMenu.vue'
import addOrderMenu from './orderManage/addOrderMenu.vue'
import updateOrder from './orderManage/updateOrder.vue'
import request from '@/utils/request'
const preserveExpanded = ref(false)
const tableData = ref([])
const updateOrderDialog = ref(false)
const updateOrderMenuDialog = ref(false)
const addOrderMenuDialog = ref(false)
const updateOrderForm = reactive({
    orderId: null,
    uId: null,
    uName: "",
    orderTime: "",
    status: "",
});
const updateForm = reactive({
    orderInfoId: null,
    orderId: null,
    menuId: null,
    menuName: "",
    price: 0,
    quantity: 1,
});
const addForm = reactive({
    orderInfoId: null,
    orderId: null,
    menuId: null,
    menuName: "",
    price: 0,
    quantity: 1,
});
const updateOrderRef = ref()
const updateOrderMenuRef = ref()
const addOrderRef = ref()
onMounted(() => {
    loadData()
})
const loadData = () => {
    request.get("/order").then(res => {
        if (res.data.code >= 200 && res.data.code < 300) {
            tableData.value = res.data.data
        } else {
            console.log(res)
            ElMessage({
                message: res.data.message,
                type: "error",
                duration: 2000,
            });
        }
    }).catch(error => {
        ElMessage({
            message: "请求失败，请稍后再试",
            type: "error",
            duration: 2000,
        });
        console.error(error);
    })
}
const openUpdate = async (index: any, row: any) => {
    // 确保传递的数据包含所有必要字段
    Object.assign(updateForm, {
        ...row,
    });
    await nextTick();
    if (updateOrderMenuRef.value) {
        updateOrderMenuRef.value.resetForm();
    }
    updateOrderMenuDialog.value = true;
};
const updateOrderstatus = async(index: any, row: any) => {
    console.log(row)
    Object.assign(updateOrderForm, {
        ...row,
    });
    await nextTick();
    if (updateOrderRef.value) {
        updateOrderRef.value.resetForm();
    }
    updateOrderDialog.value = true;
};
const onUpdateOrder = async () => {
    updateOrderDialog.value = false;
    loadData()
}
const onUpdateOrderMenu = async () => {
    updateOrderMenuDialog.value = false;
    loadData()
}
const openAddOrderMenu = async (index: any, row: any) => {
    Object.assign(addForm, {
        ...row,
    });
    await nextTick();
    if (addOrderRef.value) {
        addOrderRef.value.resetForm();
    }
    addOrderMenuDialog.value = true;
};
const addOrder = async () => {
    addOrderMenuDialog.value = false;
    loadData()
};
const handleDeleteOrder = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        request.delete("/order/" + row.orderId).then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "删除成功",
                    type: "success",
                    duration: 2000,
                });
                loadData()
            } else {
                console.log(res)
                ElMessage({
                    message: res.data.message,
                    type: "error",
                    duration: 2000,
                })
            }
        }).catch(error => {
            ElMessage({
                message: "请求失败，请稍后再试",
                type: "error",
                duration: 2000,
            });
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });

};
const handleDeleteMenu = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        request.delete("/order/menu/" + row.orderInfoId).then(res => {
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "删除成功",
                    type: "success",
                    duration: 2000,
                });
                loadData()
            } else {
                console.log(res)
                ElMessage({
                    message: res.data.message,
                    type: "error",
                    duration: 2000,
                })
            }
        }).catch(error => {
            ElMessage({
                message: "请求失败，请稍后再试",
                type: "error",
                duration: 2000,
            });
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
};
</script>
<style lang="scss" scoped></style>