<template>
    <div class="header">
        <userCommentHeader @queryData="queryData" @resetForm="resetForm"/>
    </div>
    <div class="table">
        <div class="tableHeader">
            <div class="tit">用户评论管理</div>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="commentId" label="ID" width="80" />
            <el-table-column prop="uName" label="用户名称" />
            <el-table-column prop="menuName" label="菜品名称" />
            <el-table-column prop="rating" label="评分" />
            <el-table-column prop="commentText" label="评论" />
            <el-table-column prop="commentTime" label="评论时间" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import userCommentHeader from './userComment/userCommentHeader.vue';
const tableData = ref([]);

onMounted(async () => {
    loadData();
});
const queryData = (value: any) => {
    tableData.value = value;
};
const resetForm = () => {
    loadData();
};
const loadData = async () => {
    try {
        const res = await request.get("/comment");
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
const handleDelete = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        try {
            const res = await request.delete("/comment/" + row.uId);
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