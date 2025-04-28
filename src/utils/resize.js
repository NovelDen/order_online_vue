<<<<<<< HEAD
// 防抖
function myDebounce(fun, delay = 500) {
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => { // 使用箭头函数
            timer = null;
            fun.apply(this, args); // 直接使用 this
        }, delay);
    };
}
// 响应式调整
function _resetSize() {
    var size;
    var winW = window.innerWidth;
    if (winW <= 1600 && winW > 1200) {
        size = Math.round(winW / 16);
    } else if (winW <= 1200 && winW > 960) {
        size = 65
    } else if (winW <= 960 ){
        size = 90
    } else {
        size = 100;
    }
    document.querySelector("html").style.fontSize = size + 'px';
}
const resetSize = myDebounce(_resetSize,10);
=======
// 防抖
function myDebounce(fun, delay = 500) {
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => { // 使用箭头函数
            timer = null;
            fun.apply(this, args); // 直接使用 this
        }, delay);
    };
}
// 响应式调整
function _resetSize() {
    var size;
    var winW = window.innerWidth;
    if (winW <= 1600 && winW > 1200) {
        size = Math.round(winW / 16);
    } else if (winW <= 1200 && winW > 960) {
        size = 65
    } else if (winW <= 960 ){
        size = 90
    } else {
        size = 100;
    }
    document.querySelector("html").style.fontSize = size + 'px';
}
const resetSize = myDebounce(_resetSize,10);
>>>>>>> 1c15f16ed4ec227176339327f962eaf1df58175f
export default resetSize;