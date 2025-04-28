<template>
    <router-view />
</template>

<script>
import resetSize from "./utils/resize.js";
export default {
    name: "App",
    mounted() {
        resetSize();
        window.addEventListener("resize", resetSize);
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}
</style>
