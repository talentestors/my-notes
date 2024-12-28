<template>
    <div class="wait">
        <div class="wait-content">
            <hr />
            <h3>更新中<div class="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </h3>
            <img :src="imgUrl" alt="更新中" photo-swipe style="cursor: zoom-in;" />
        </div>
    </div>
</template>
<script>
export default {
    name: "Waiting",
    components: {},
    props: {
        imgUrl: {
            type: String,
            default: '//www.dmoe.cc/random.php' // 设置默认值
        }
    }
}
</script>
<style>
.loading,
.loading>div {
    position: relative;
    box-sizing: border-box;
}

.loading {
    display: inline-block;
    font-size: 0;
    color: #000;
}

.loading.la-dark {
    color: #333;
}

.loading>div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}

.loading {
    width: 54px;
    height: 18px;
}

.loading>div {
    width: 10px;
    height: 10px;
    margin: 4px;
    border-radius: 100%;
    animation: ball-beat 0.7s -0.15s infinite linear;
}

.loading>div:nth-child(2n-1) {
    animation-delay: -0.5s;
}

@keyframes ball-beat {
    50% {
        opacity: 0.2;
        transform: scale(0.75);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>