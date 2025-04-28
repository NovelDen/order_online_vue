<template>
    <div class="header">
        <dashMenuHeader :dashType="dashType" @queryData="queryData" @resetForm="resetForm"/>
    </div>
    <div class="table">
        <div class="tableHeader">
            <div class="tit">菜品菜单管理</div>
            <div class="option">
                <el-button type="primary" @click="openAdd">添加菜品</el-button>
            </div>
            <el-dialog v-model="addMenuDialog" title="添加菜品" width="30%">
                <addDashMenu :dashType="dashType" @addMenu="addMenu"></addDashMenu>
            </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="menuId" label="ID" width="80" />
            <el-table-column prop="imagePath" label="图片">
                <template #default="scope">
                    <img :src="scope.row.imagePath" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="menuName" label="菜品名称" />
            <el-table-column prop="categoryName" label="种类" />
            <el-table-column prop="menuDescription" label="描述" />
            <el-table-column prop="price" label="价格" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="large" type="primary" @click="openUpdate(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-button size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="updateMenuDialog" title="更新菜品" width="30%">
            <updateDashmenu :updateForm="updateForm" :dashType="dashType" @updateMenu="updateMenu" ref="updateDashmenuRef">
            </updateDashmenu>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import dashMenuHeader from './dashmenu/dashMenuHeader.vue';
import addDashMenu from './dashmenu/addDashMenu.vue';
import updateDashmenu from './dashmenu/updateDashmenu.vue';

// 定义 UpdateForm 类型
interface UpdateForm {
    menuId: number | null;
    menuName: string;
    categoryName: string;
    description: string; // 添加 missing 属性
    price: number | null;
    imagePath: string;
    categoryId: number | null; // 添加 missing 属性
}

onMounted(() => {
    loadData();
    loadType();
});

const tableData = ref([]);
const dashType = ref([]);
const addMenuDialog = ref(false);
const updateMenuDialog = ref(false);
const updateDashmenuRef = ref<InstanceType<typeof updateDashmenu> | null>(null);

// 初始化 updateForm，确保包含所有必要字段
const updateForm = reactive<UpdateForm>({
    menuId: null,
    menuName: "",
    categoryName: "",
    description: "", // 初始化 description
    price: null,
    imagePath: "",
    categoryId: null // 初始化 categoryId
});

const loadData = async () => {
    try {
        const res = await request.get("/dashmenu");
        if (res.data.code >= 200 && res.data.code < 300) {
            tableData.value = res.data.data;
        } else {
            console.log(res);
            ElMessage({
                message: res.data.message,
                type: "error",
                duration: 2000,
            });
        }
    } catch (error) {
        ElMessage({
            message: "请求失败，请稍后再试",
            type: "error",
            duration: 2000,
        });
        console.error(error);
    }
};

const loadType = async () => {
    try {
        const res = await request.get("/dashtype");
        if (res.data.code >= 200 && res.data.code < 300) {
            dashType.value = res.data.data;
        } else {
            console.log(res);
            ElMessage({
                message: res.data.message,
                type: "error",
                duration: 2000,
            });
        }
    } catch (error) {
        ElMessage({
            message: "请求失败，请稍后再试",
            type: "error",
            duration: 2000,
        });
        console.error(error);
    }
};

const queryData = (value: any) => {
    tableData.value = value;
};
const resetForm = () => {
    loadData();
};
const openAdd = () => {
    addMenuDialog.value = true;
};

const addMenu = () => {
    addMenuDialog.value = false;
    loadData();
};

const openUpdate = async (index: any, row: any) => {
    // 确保传递的数据包含所有必要字段
    Object.assign(updateForm, {
        ...row,
        description: row.menuDescription || "", // 兼容可能不存在的字段
        categoryId: row.categoryId || null // 兼容可能不存在的字段
    });

    // 确保 updateDashmenu 组件已经挂载
    await nextTick();
    if (updateDashmenuRef.value) {
        updateDashmenuRef.value.resetForm();
    }
    updateMenuDialog.value = true;
};

const updateMenu = () => {
    updateMenuDialog.value = false;
    loadData();
};

const handleDelete = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        try {
            const res = await request.delete("/dashmenu/" + row.menuId);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "删除成功",
                    type: "success",
                    duration: 2000,
                });
                loadData();
            } else {
                console.log(res);
                ElMessage({
                    message: res.data.message,
                    type: "error",
                    duration: 2000,
                });
            }
        } catch (error) {
            ElMessage({
                message: "请求失败，请稍后再试",
                type: "error",
                duration: 2000,
            });
            console.error(error);
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
};
</script>
<style lang="scss" scoped>
.header {
    background: #fff;
    margin-bottom: 20px;
}

.table {
    background: #fff;

    .tableHeader {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
}
</style>