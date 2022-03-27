<template>
    <div class="anime-live">
        <div class="anime-base"></div>
        <div class="anime-base middle"></div>
        <div class="anime-base end"></div>
    </div>
</template>
<script>
import vue from 'vue';

export default {
    name: 'LiveRecommendAnime',
};
</script>

<style lang="less">
@keyframes  stretch{
    0% {
        height: 13px;
    }
    50% {
        height: 6px;
    }
    100% {
        height: 13px;
    }
}

.anime-base {
    width: 3px;
    height: 6px;
    border-radius: 1px;
    background: #fe3666;
    animation-name: stretch;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    &.middle {
        animation-delay: 0.3s;
    }
    &.end {
        animation-delay: 0.6s;
    }
}

.anime-live {
    display: flex;
    width: 13px;
    height: 18px;
    justify-content: space-between;
    align-items: flex-end;
}
</style>
