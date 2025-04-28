<<<<<<< HEAD
<template>
    <div class="table">
        <div class="tableHeader">
            <div class="tit">菜品种类管理</div>
            <div class="option">
                <el-button type="primary" @click="openAdd">添加种类</el-button>
            </div>
            <el-dialog v-model="addTypeDialog" title="添加种类" width="30%">
                <el-form :model="addFormData" ref="formRef" class="addForm">
                    <el-form-item label="种类名称" prop="categoryName">
                        <el-input v-model="addFormData.categoryName" />
                    </el-form-item>
                    <el-form-item label="种类描述" prop="description">
                        <el-input v-model="addFormData.description" />
                    </el-form-item>
                </el-form>
                <div class="option">
                    <el-button type="primary" @click="addType">添加</el-button>
                    <el-button @click="resetForm(formRef)">重置</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="categoryId" label="ID" />
            <el-table-column prop="categoryName" label="种类" />
            <el-table-column prop="description" label="描述" />
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
        <el-dialog v-model="updateTypeDialog" title="更新菜品" width="30%">
            <el-form :model="updateFormData" ref="formRef" class="addForm">
                <el-form-item label="种类名称" prop="categoryName">
                    <el-input v-model="updateFormData.categoryName" />
                </el-form-item>
                <el-form-item label="种类描述" prop="description">
                    <el-input v-model="updateFormData.description" />
                </el-form-item>
            </el-form>
            <div class="option">
                <el-button type="primary" @click="updateType">更新</el-button>
                <el-button @click="uResetForm()">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import { ca } from 'element-plus/es/locale';
const tableData = ref([]);
const addTypeDialog = ref(false);
const updateTypeDialog = ref(false);
const addFormData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
const updateFormData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
const updateData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
onMounted(() => {
    loadType();
});
const openAdd = () => {
    addTypeDialog.value = true;
};
const loadType = async () => {
    try {
        const res = await request.get("/dashtype");
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
const addType = async () => {
    if (!addFormData.categoryName || !addFormData.description) {
        ElMessage({
            message: "请填写完整",
            type: "error",
            duration: 2000,
        });
    } else {
        try {
            const res = await request.put("/dashtype", addFormData);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
                addTypeDialog.value = false;
                formRef.value?.resetFields();
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
        }
    }
};
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const openUpdate = async (index: any, row: any) => {
    // console.log(row);
    updateTypeDialog.value = true;
    Object.assign(updateFormData, {
        ...row,
    });
    Object.assign(updateData, {
        ...row,
    });
};
const updateType = async () => {
    if (!updateFormData.categoryName || !updateFormData.description) {
        ElMessage({
            message: "请填写完整",
            type: "error",
            duration: 2000,
        });
    } else {
        try {
            const res = await request.post("/dashtype", updateFormData);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
                updateTypeDialog.value = false;
                formRef.value?.resetFields();
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
        }
    }
}
const uResetForm = () => {
    Object.assign(updateFormData, updateData);
}
const handleDelete = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        try {
            const res = await request.delete("/dashtype/" + row.categoryId);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "删除成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
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
.table {
    background: #fff;

    .tableHeader {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
}
=======
<template>
    <div class="table">
        <div class="tableHeader">
            <div class="tit">菜品种类管理</div>
            <div class="option">
                <el-button type="primary" @click="openAdd">添加种类</el-button>
            </div>
            <el-dialog v-model="addTypeDialog" title="添加种类" width="30%">
                <el-form :model="addFormData" ref="formRef" class="addForm">
                    <el-form-item label="种类名称" prop="categoryName">
                        <el-input v-model="addFormData.categoryName" />
                    </el-form-item>
                    <el-form-item label="种类描述" prop="description">
                        <el-input v-model="addFormData.description" />
                    </el-form-item>
                </el-form>
                <div class="option">
                    <el-button type="primary" @click="addType">添加</el-button>
                    <el-button @click="resetForm(formRef)">重置</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="categoryId" label="ID" />
            <el-table-column prop="categoryName" label="种类" />
            <el-table-column prop="description" label="描述" />
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
        <el-dialog v-model="updateTypeDialog" title="更新菜品" width="30%">
            <el-form :model="updateFormData" ref="formRef" class="addForm">
                <el-form-item label="种类名称" prop="categoryName">
                    <el-input v-model="updateFormData.categoryName" />
                </el-form-item>
                <el-form-item label="种类描述" prop="description">
                    <el-input v-model="updateFormData.description" />
                </el-form-item>
            </el-form>
            <div class="option">
                <el-button type="primary" @click="updateType">更新</el-button>
                <el-button @click="uResetForm()">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import request from "@/utils/request";
import type { UploadProps, ElForm, FormInstance } from 'element-plus'
import { ca } from 'element-plus/es/locale';
const tableData = ref([]);
const addTypeDialog = ref(false);
const updateTypeDialog = ref(false);
const addFormData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
const updateFormData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
const updateData = reactive({
    categoryId: "",
    categoryName: "",
    description: "",
});
onMounted(() => {
    loadType();
});
const openAdd = () => {
    addTypeDialog.value = true;
};
const loadType = async () => {
    try {
        const res = await request.get("/dashtype");
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
const addType = async () => {
    if (!addFormData.categoryName || !addFormData.description) {
        ElMessage({
            message: "请填写完整",
            type: "error",
            duration: 2000,
        });
    } else {
        try {
            const res = await request.put("/dashtype", addFormData);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
                addTypeDialog.value = false;
                formRef.value?.resetFields();
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
        }
    }
};
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const openUpdate = async (index: any, row: any) => {
    // console.log(row);
    updateTypeDialog.value = true;
    Object.assign(updateFormData, {
        ...row,
    });
    Object.assign(updateData, {
        ...row,
    });
};
const updateType = async () => {
    if (!updateFormData.categoryName || !updateFormData.description) {
        ElMessage({
            message: "请填写完整",
            type: "error",
            duration: 2000,
        });
    } else {
        try {
            const res = await request.post("/dashtype", updateFormData);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "更新成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
                updateTypeDialog.value = false;
                formRef.value?.resetFields();
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
        }
    }
}
const uResetForm = () => {
    Object.assign(updateFormData, updateData);
}
const handleDelete = (index: any, row: any) => {
    ElMessageBox.confirm('您确定删除此菜品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        try {
            const res = await request.delete("/dashtype/" + row.categoryId);
            if (res.data.code >= 200 && res.data.code < 300) {
                ElMessage({
                    message: "删除成功",
                    type: "success",
                    duration: 2000,
                });
                loadType();
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
.table {
    background: #fff;

    .tableHeader {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
}
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
</style>