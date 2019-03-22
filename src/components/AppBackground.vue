<template>
    <div id="app-background">
        <svg :viewBox="viewBoxAttrs"
            width="100%" height="100%"
            xmlns="http://www.w3.org/2000/svg">
            <icon-rounded-square v-for="n in numSquares" :key="n"
                :name="`rect_${n}`"
                :position="{ x: ((25 * n) / Math.random()), y: ((25 * n) / Math.random()) }"
                :size="50"
                :opacity="0.6" :colour="'#FFF'" />
        </svg>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import IconRoundedSquare from './icons/IconRoundedSquare.vue'

export default {
    name: 'AppBackground',
    components: {
        IconRoundedSquare
    },
    data: function() {
        return {
            numSquares: 7
        }
    },
    computed: {
        viewBoxAttrs: function() {
            return `0 0 ${window.innerWidth} ${window.innerHeight}`
        },
    }
}
</script>

<style lang="scss" scoped>
    #app-background {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
    }
</style>
