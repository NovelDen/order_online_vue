<template>
    <el-form :model="formData" class="menu-header" ref="formRef">
        <div class="input">
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="formData.type" placeholder="选择类型">
                    <el-option :label="'所有'" :value="null"></el-option>
                    <el-option v-for="item in dashType" :label="item.categoryName" :value="item.categoryId"
                        :key="item.categoryId"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="option">
            <el-button type="primary" @click="queryType">查询</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
        </div>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits } from 'vue';
import { ElMessage } from 'element-plus'
import type { ElForm, FormInstance } from 'element-plus'
import request from '@/utils/request';
const formData = reactive({
    name: '',
    type: null,
});
const props = defineProps({
    dashType: {
        type: Array as () => any[],
        default: () => [],
    },
});
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    emit("resetForm")
}
const emit = defineEmits(["queryData","resetForm"]);

const queryType = () => {
    request.post("/dashmenu/dash", formData).then(res => {
        console.log(res);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "查询成功",
                    type: "success",
                    duration: 2000,
                });
                emit("queryData", res.data.data);
            } else {
                console.log(res);
                ElMessage({
                    message: res.data.message,
                    type: "error",
                });
            }
    }).catch(error => {
        ElMessage({
            message: "请求失败，请稍后再试",
            type: "error",
            duration: 2000,
        });
    });
}
</script>
<style lang="scss" scoped>
.menu-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;

    .input {
        width: 50%;
        display: flex;

        :deep(.el-form-item) {
            margin-bottom: 0;
            width: 50%;

            &:nth-child(n+1) {
                margin-right: 20px;
            }
        }
    }
}
</style>