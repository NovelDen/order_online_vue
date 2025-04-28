<template>
    <div class="header">
        <userInfoHeader @queryData="queryData" @resetform="resetForm"/>
    </div>
    <div class="table">
        <div class="tableHeader">
            <div class="tit">用户信息管理</div>
            <div class="option">
                <el-button type="primary" @click="openAdd">添加用户</el-button>
            </div>
            <el-dialog v-model="addMenuDialog" title="添加用户" width="30%">
                <addUserInfo @addMenu="addMenu" />
            </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="uId" label="ID" width="80" />
            <el-table-column prop="uAvatar" label="头像">
                <template #default="scope">
                    <img :src="scope.row.uAvatar" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="uName" label="用户名称" />
            <el-table-column prop="uAccount" label="用户账户" />
            <!-- <el-table-column prop="uPassword" label="用户密码" /> -->
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
        <el-dialog v-model="updateMenuDialog" title="更新用户" width="30%">
            <updateUserInfo :updateForm="updateForm" @updateMenu="updateMenu" ref="updateDashmenuRef" />
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import addUserInfo from './userInfo/addUserInfo.vue';
import userInfoHeader from './userInfo/userInfoHeader.vue';
import updateUserInfo from './userInfo/updateUserInfo.vue';

// 定义 UpdateForm 类型
interface UpdateForm {
    uId: number | null;
    uName: string;
    uAccount: string;
    // uPassword: string;
    uAvatar: string; // 添加 missing 属性
}

onMounted(() => {
    loadData();
});

const tableData = ref([]);
const addMenuDialog = ref(false);
const updateMenuDialog = ref(false);
const updateDashmenuRef = ref<InstanceType<typeof updateUserInfo> | null>(null);

// 初始化 updateForm，确保包含所有必要字段
const updateForm = reactive<UpdateForm>({
    uId: null,
    uName: "",
    uAccount: "",
    // uPassword: "",
    uAvatar: "",
});

const loadData = async () => {
    try {
        const res = await request.get("/user");
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
            const res = await request.delete("/user/" + row.uId);
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